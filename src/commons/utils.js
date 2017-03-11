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
import esformatter from 'esformatter';
import esformatterOptions from './esformatterUtils.js';
import esprima from 'esprima';
import escodegen from 'escodegen';

export function fulex(obj2) {
    let obj1 = null;
    if (_.isArray(obj2)) {
        obj1 = [];
        for (let i = 0; i < obj2.length; i++) {
            obj1.push(fulex(obj2[i]));
        }
    } else if (_.isObject(obj2)) {
        obj1 = {};
        for (let item in obj2) {
            if (obj2.hasOwnProperty(item)) {
                obj1[item] = fulex(obj2[item]);
            }
        }
    } else {
        obj1 = obj2;
    }
    return obj1;
}

// Executes visitor on the object and its children (recursively).
export function traverse(object, visitor) {

    visitor(object);

    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            let child = object[key];
            if (typeof child === 'object' && child !== null) {
                traverse(child, visitor);
            }
        }
    }
}

export function traverseWithResult(object, visitor, result) {

    let _result = visitor(object, result);

    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            let child = object[key];
            if (typeof child === 'object' && child !== null) {
                traverseWithResult(child, visitor, _result);
            }
        }
    }
}

export function traverseModel(node, visitor){
    visitor(node);

    if(node.props){
        _.forOwn(node.props, (prop, propName) => {
            if (_.isObject(prop) && !_.isEmpty(prop)) {
                traverseModel(prop, visitor);
            }
        });
    }

    if(node.children && node.children.length > 0){
        node.children.forEach( child => {
            traverseModel(child, visitor);
        });
    }
}

export function traverseModelWithResult(node, visitor, result){
    let _result = visitor(node, result);

    if(node.props){
        _.forOwn(node.props, (prop, propName) => {
            if (_.isObject(prop) && !_.isEmpty(prop)) {
                _result = traverseModelWithResult(prop, visitor, _result);
            }
        });
    }

    if(node.children && node.children.length > 0){
        node.children.forEach( child => {
            _result = traverseModelWithResult(child, visitor, _result);
        });
    }

    return _result;
}

export function parse(inputData, options = {tolerant: true, range: false, comment: true, jsx: true}){
    return esprima.parse(inputData, options);
}

export function generate(ast){
    return escodegen.generate(ast, {comment: true});
}

export function formatJs(jsData) {
    try {
        return esformatter.format(jsData, esformatterOptions);
    } catch (e) {
        console.error(e);
        throw Error(e.message);
    }
}

export function writeErrorFileFor(outputFilePath, fileData){
    const errorDirPath = path.dirname(outputFilePath);
    const errorFilePath = path.join(errorDirPath, '$errorParsingFile.js');
    writeFile(errorFilePath, fileData);
    return errorFilePath;
}

export function repairPath(srcPath) {
    if (srcPath && srcPath.length > 0) {
        return srcPath.replace(/\\/g, '/');
    }
    return srcPath;
}
