
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

import _ from 'lodash';
import path from 'path';

export function resolveFromProjectPerspective(projectDataObj){

    let indexFileDirPath = path.dirname(projectDataObj.indexFilePath);
    let absoluteDirPath = projectDataObj.outputDirPath;
    projectDataObj.pages.forEach( (pageObj, index) => {

        if(pageObj.imports && pageObj.imports.length > 0){
            pageObj.imports.forEach( (variable, index) => {
                if(variable.source.substr(0, 6) === '../../'){
                    let absoluteSourcePath = path.resolve(indexFileDirPath, variable.source).replace(/\\/g, '/');
                    variable.relativeSource = repairPath(path.relative(absoluteDirPath, absoluteSourcePath)).replace(/\\/g, '/');
                } else {
                    variable.relativeSource = variable.source;
                }
            });
        }
        if(pageObj.resources){
            pageObj.resources.requires.forEach( (variable, index) => {

                if(variable.source.substr(0, 6) === '../../'){
                    let absoluteSourcePath = path.resolve(indexFileDirPath, variable.source).replace(/\\/g, '/');
                    variable.relativeSource = repairPath(path.relative(absoluteDirPath, absoluteSourcePath)).replace(/\\/g, '/');
                } else {
                    variable.relativeSource = variable.source;
                }
            });
        }

    });
    return projectDataObj;
}


export function replaceInPath(path, options){
    let result = path;
    _.forOwn(options, (value, prop) => {
        result = result.replace('{' + prop + '}', value);
    });
    return result;
}

function repairPath(path){
    if(path.substr(0, 1) !== '.'){
        path = './' + path;
    }
    return path;
}
