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

import path from 'path';
import {readFile} from '../commons/fileManager';
import {template} from 'lodash';

export function preProcess(currentDir, dataObject) {

    let metahelpFile = '';
    let metadataFile = '{}';

    return Promise.resolve()
        .then(() => {
            return readFile(path.join(currentDir, 'metahelp.json'))
                .catch(e => {
                    return '{}';
                })
                .then(fileData => {
                    let preparedFileData = fileData;
                    try {
                        preparedFileData = template(preparedFileData)({
                            groupName: dataObject.groupName || 'NewGroup',
                            componentName: dataObject.componentName || 'NewComponent'
                        });
                    } catch (e) {
                        console.log('Error generating prepared metahelp object.', e);
                    }
                    try {
                        metahelpFile = JSON.parse(preparedFileData);
                    } catch (e) {
                        throw Error('Parsing metahelp error. ' + e);
                    }
                });
        })
        .then(() => {
            return readFile(path.join(currentDir, 'metadata.json'))
                .catch(e => {
                    return '{}';
                })
                .then(fileData => {
                    let preparedFileData = fileData;
                    try {
                        preparedFileData = template(preparedFileData)({
                            groupName: dataObject.groupName || 'NewGroup',
                            componentName: dataObject.componentName || 'NewComponent'
                        });
                    } catch (e) {
                        console.log('Error generating prepared metadata object.', e);
                    }
                    try {
                        metadataFile = JSON.parse(preparedFileData);
                    } catch (e) {
                        throw Error('Parsing metadata error. ' + e);
                    }
                });
        })
        .then(() => {
            return {
                metaData: metadataFile,
                metaHelp: metahelpFile
            };
        });
}

export function process(currentDir, dataObject, templateNames, mergeScripts) {

    const templateDatas = {};
    let templateReaders = [];

    templateNames.forEach(name => {
        templateReaders.push(
            readFile(path.join(currentDir, 'templates', name + '.tpl')).then(fileData => {
                templateDatas[name] = fileData;
            })
        );
    });
    return Promise.all(templateReaders)
        .then(() => {
            let files = [];
            let file;
            templateNames.forEach(name => {
                const generatorModule = require(path.join(currentDir, 'scripts', name + '.js'));
                file = generatorModule.getFile(dataObject, templateDatas[name]);
                if (file.outputFilePath) {
                    file.outputFileName = path.basename(file.outputFilePath);
                    files.push(file);
                }
            });
            return readFile(path.join(currentDir, 'dependencies.json'))
                .then(fileData => {
                    let dependencies = {};
                    try {
                        dependencies = JSON.parse(fileData);
                    } catch (e) {
                        throw Error('Parsing dependencies error. ' + e);
                    }
                    mergeScripts.forEach(script => {
                        const mergeModule = require(path.join(currentDir, 'merge', script + '.js'));
                        file = mergeModule.getFile(dataObject, dependencies);
                        if (file.outputFilePath) {
                            file.outputFileName = path.basename(file.outputFilePath);
                            files.push(file);
                        }
                    });
                    return {files, dependencies};
                });
        });
}
