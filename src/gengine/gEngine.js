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
import {readFile} from '../commons/fileManager.js';

import * as generator from './generator.js';

export function preprocess(generatorDirPath, data){

    const modulePath = path.join(generatorDirPath, 'generator.json');
    return readFile(modulePath)
        .then(fileData => {
            let test = null;
            try{
                test = JSON.parse(fileData);
                return generator.preProcess(generatorDirPath, data);
            } catch(e) {
                console.error('Generator was not found in ' + generatorDirPath + ' Error: ' + e);
                throw Error('Generator was not found in ' + generatorDirPath);
            }
        });
}

export function process(generatorDirPath, data){

    const modulePath = path.join(generatorDirPath, 'generator.json');
    return readFile(modulePath)
        .then(fileData => {
            let generatorObject;
            try{
                generatorObject = JSON.parse(fileData);
                const {templateNames, mergeScripts, merge} = generatorObject;
                return generator.process(generatorDirPath, data, templateNames, mergeScripts);
            } catch(e) {
                console.error('Generator was not found in ' + generatorDirPath + ' Error: ' + e);
                throw Error('Generator was not found in ' + generatorDirPath);
            }
        });
}
