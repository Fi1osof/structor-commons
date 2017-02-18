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

import { parse, traverse } from '../commons/utils.js';

function findDefaultExportNode(ast){
    let exports = null;
    traverse(ast, node => {
        if(node.type === 'ExportDefaultDeclaration'){
            exports = node.declaration;
        }
    });
    return exports;
}

export function getReducerProperty(source, componentGroup, componentName){
    let ast = parse(source);
    const sourcePath = `containers/${componentGroup}/${componentName}/reducer.js`;
    const defaultNode = findDefaultExportNode(ast);
    let foundProperty = undefined;
    if(defaultNode) {
        let foundIndex = -1;
        let foundIdentifier = undefined;
        for(let i = 0; i < ast.body.length; i++){
            const {type, source, specifiers} = ast.body[i];
            if(type === 'ImportDeclaration'){
                if(source && source.value === sourcePath){
                    foundIndex = i;
                    if(specifiers && specifiers.length > 0) {
                        let importDefaultSpecifier =
                            specifiers.find(i =>
                            i.type &&
                            i.type === 'ImportDefaultSpecifier'
                            && i.local);
                        if(importDefaultSpecifier) {
                            foundIdentifier = importDefaultSpecifier.local.name;
                        }
                    }
                    break;
                }
            }
        }
        if(foundIndex >= 0 && foundIdentifier) {
            if(defaultNode.type === 'ObjectExpression'){
                if(defaultNode.properties){
                    if(defaultNode.properties.length > 0) {
                        let foundIndex = -1;
                        for(let i = 0; i < defaultNode.properties.length; i++){
                            const {key, value} = defaultNode.properties[i];
                            if(value && value.name === foundIdentifier){
                                foundProperty = key.name;
                            }
                        }
                    }
                }
            } else {
                throw Error('The default export in "./structor/app/reducers.js" file is not object.');
            }
        }
    } else {
        throw Error('Could not find default export in "./structor/app/reducers.js" file.');
    }
    return foundProperty;
}
