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
import * as config from '../configuration.js';
import {readJson, writeJson, readFile, writeFile} from '../commons/fileManager.js';

function isFirstCharacterInUpperCase(text){
    if (text && text.length > 0) {
        let firstChar = text.charAt(0);
        let firstCharUpperCase = firstChar.toUpperCase();
        return firstChar === firstCharUpperCase;
    }
    return false;
}

export function writeComponentDefaults(componentName, namespace, defaults) {
    if (!isFirstCharacterInUpperCase(componentName)) {
        namespace = "#html";
    }
    const filePath = namespace && namespace.length > 0 ?
        path.join(config.componentDefaultsDirPath(), namespace, componentName + '.json').replace(/\\/g, '/')
        :
        path.join(config.componentDefaultsDirPath(), componentName + '.json').replace(/\\/g, '/');
    return writeJson(filePath, defaults);
}

export function readComponentDocument(componentName, namespace){
    let componentNoteFilePath;
    if (namespace) {
        componentNoteFilePath =
            path.join(config.docsComponentsDirPath(), namespace, componentName + '.md').replace(/\\/g, '/');
    } else {
        componentNoteFilePath =
            path.join(config.docsComponentsDirPath(), componentName + '.md').replace(/\\/g, '/');
    }
    return readFile(componentNoteFilePath)
        .then( fileData => {
            fileData = fileData || 'Component does not have notes';
            return fileData;
        })
        .catch(e => {
            return 'Component does not have notes';
        });
}

export function readComponentSourceCode(filePath){
    return readFile(filePath);
}

export function writeComponentSourceCode(filePath, sourceCode){
    return writeFile(filePath, sourceCode, false);
}

export function readProjectJsonModel(){
    return readJson(config.deskModelFilePath());
}

export function writeProjectJsonModel(jsonObj){
    return writeJson(config.deskModelFilePath(), jsonObj);
}
