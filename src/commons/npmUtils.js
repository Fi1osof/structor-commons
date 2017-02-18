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
import child_process from 'child_process';
import * as fileManager from './fileManager.js';

const exec = child_process.exec;

function execute(cmd, workingDirPath){
    return new Promise( (resolve, reject) => {
        try{
            let child = exec(cmd, {cwd: workingDirPath},
                (error, stdout, stderr) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(stdout);
                    }
                });
        } catch(e){
            reject(e);
        }
    });
}

export function installPackages(pkgNames, workingDirPath){
    let oldProgress;
    return getNpmConfigVariable('progress', workingDirPath)
        .then(result => {
            oldProgress = result;
            return setNpmConfigVariable('progress', 'false', workingDirPath);
        })
        .then(() => {
            return execute(`npm install ${pkgNames} -S -E`, workingDirPath);
        })
        .then(() => {
            return setNpmConfigVariable('progress', oldProgress, workingDirPath);
        });
}

export function installDefault(workingDirPath){
    let oldProgress;
    return getNpmConfigVariable('progress', workingDirPath)
        .then(result => {
            oldProgress = result;
            return setNpmConfigVariable('progress', 'false', workingDirPath);
        })
        .then(() => {
            return execute(`npm install`, workingDirPath);
        })
        .then(() => {
            return setNpmConfigVariable('progress', oldProgress, workingDirPath);
        });
}

export function getNpmConfigVariable(varName, workingDirPath){
    return execute(`npm get ${varName}`, workingDirPath)
        .catch(err => {
            console.error(err);
            return undefined;
        });
}

export function setNpmConfigVariable(varName, varValue, workingDirPath){
    return execute(`npm set ${varName}=${varValue}`, workingDirPath)
        .catch(err => {
            console.error(err);
            return undefined;
        });
}

export function getPackageAbsolutePath(packageName, workingDir){
    return execute(`node -p "require.resolve('${packageName}/package.json')"`, workingDir)
        .then(result => {
            return path.dirname(result);
        })
        .catch(err => {
            // console.error(err);
            return undefined;
        });
}

export function getPackageVersion(packageName, workingDir){
    return execute(`node -p "require.resolve('${packageName}/package.json')"`, workingDir)
        .then(result => {
            if(result){
                return fileManager.readJson(result.trim()).then(jsonData => {
                    return jsonData.version;
                });
            }
            return undefined;
        })
        .catch(err => {
            // console.error(err);
            return undefined;
        });
}
