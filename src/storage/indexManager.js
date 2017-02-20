/*
 * Copyright 2015 Alexander Pustovalov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {findIndex, forOwn} from 'lodash';
import path from 'path';
import esprima from 'esprima';
import escodegen from 'escodegen';
import * as fileManager from '../commons/fileManager.js';
import {traverse, parse} from '../commons/utils.js';
import {findExportsNode, findImports} from '../commons/astUtils.js';
import * as config from '../configuration.js';

function appendToNode(node, variableString) {
    var newAst = esprima.parse('var c = {' + variableString + '}');
    var newPart = null;
    traverse(newAst, node => {
        if (node.type === 'VariableDeclarator' && node.id.name === 'c') {
            newPart = node.init.properties[0];
        }
    });
    if (node.properties) {
        let index = -1;
        if (node.properties.length > 0) {
            index = findIndex(node.properties, (o) => {
                return (o.key && o.key.type === 'Identifier' && o.key.name === newPart.key.name);
            });
        }
        if (index >= 0) {
            node.properties[index] = newPart;
        } else {
            node.properties.push(
                newPart
            );
        }
    }
}

function memberExpressionToString(node, result) {
    let resultString = result || '';
    if (node.type === 'MemberExpression') {
        resultString += memberExpressionToString(node.object, resultString);
        if (resultString && resultString.length > 0) {
            resultString += '.' + node.property.name;
        } else {
            resultString = node.property.name;
        }
    }
    return resultString;
}


function parseIndexFile(deskIndexFilePath) {
    return fileManager.readFile(deskIndexFilePath)
        .then(data => {
            if (!data) {
                throw Error('Index file is empty.');
            }
            try {
                return parse(data);
            } catch (e) {
                throw Error(e.message + '. File path: ' + deskIndexFilePath);
            }
        });
}

export function getStructure(ast) {

    let structure = {
        imports: findImports(ast),
        groups: {}
    };

    let exportsNode = findExportsNode(ast);
    if (exportsNode) {
        let properties = exportsNode.properties;
        if (properties && properties.length > 0) {
            properties.forEach(property => {
                let group = structure.groups[property.key.name] = {
                    components: []
                };
                let values = property.value.properties;
                if (values && values.length > 0) {
                    values.forEach(value => {
                        let component = {
                            group: property.key.name,
                            name: value.key.name
                        };
                        let from = structure.imports[component.name];
                        if(from){
                            component.source = from.source;
                            component.member = from.member;
                        }
                        group.components.push(component);
                    });
                }
            });
        }
    }
    return structure;
}

function resolveAbsoluteSourcePath(indexObj, appDirPath) {
    let groups = indexObj.groups;
    let tasks = [];
    if (groups) {
        forOwn(groups, (group, prop) => {
            if (group.components && group.components.length > 0) {
                group.components.forEach(component => {
                    if(component.source){
                        tasks.push(
                            fileManager.findComponentFilePath(path.join(appDirPath, component.source))
                                .then(componentFilePath => {
                                    if(componentFilePath){
                                        component.absoluteSource = componentFilePath.replace(/\\/g, '/');
                                    }
                                })
                                .catch(error => {
                                })
                        );
                    }
                });
            }
        });
    }
    return Promise.all(tasks).then(() => {
        return indexObj;
    });
}

function getComponentsNamesFromTree(componentsTree) {
    let componentsNames = [];
    forOwn(componentsTree, (group, groupName) => {
        forOwn(group, (component, componentName) => {
            componentsNames.push(componentName);
        });
    });
    return componentsNames;
}

export function initIndex() {

    return parseIndexFile(config.deskIndexFilePath())
        .then((ast) => {
            return resolveAbsoluteSourcePath(getStructure(ast), config.appDirPath());
        })
        .then(indexObject => {
            return indexObject;
        });
}

export function getComponentsTree() {
    return initIndex()
        .then(indexObj => {
            let result = {};
            if (indexObj && indexObj.groups) {
                forOwn(indexObj.groups, (group, prop) => {
                    result[prop] = {};
                    if (group.components && group.components.length > 0) {
                        group.components.forEach(component => {
                            result[prop][component.name] = {
                                name: component.name,
                                absoluteSource: component.absoluteSource
                            };
                        });
                    }
                });
            }
            return result;
        });
}

export function getComponentsNames(deskIndexFilePath, appDirPath) {
    return getComponentsTree(deskIndexFilePath, appDirPath)
        .then(componentsTree => {
            return getComponentsNamesFromTree(componentsTree);
        });
}

export function addComponent(groupName, componentName, source, deskIndexFilePath, appDirPath) {

    return parseIndexFile(deskIndexFilePath)
        .then(ast => {

            let exportsNode = findExportsNode(ast);
            if (exportsNode) {
                let groupNode = null;

                traverse(exportsNode, node => {

                    if (node.type === 'Property' && node.key.type === 'Identifier') {
                        if (node.value.type === 'ObjectExpression' && node.key.name === groupName) {
                            groupNode = node.value;
                        }

                    }
                });

                if (!groupNode) {
                    appendToNode(exportsNode, groupName + ': {' + componentName + ': require("' + source + '")}');
                } else {
                    appendToNode(groupNode, componentName + ': require("' + source + '")');
                }
            }

            return escodegen.generate(ast);

        }).then(fileData => {
            return fileManager.writeFile(deskIndexFilePath, fileData, true);
        }).then(() => {
            return initIndex(deskIndexFilePath, appDirPath);
        });
}

