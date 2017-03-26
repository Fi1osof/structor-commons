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

import commons from '../commons';

export function getReducerPropertyName(sourceCode, filePath){
    let reducerPropertyName;
    let ast = commons.parse(sourceCode);
    let defaultNode = commons.findDefaultExportsNode(ast);
    if (defaultNode) {
        const importName = commons.findDefaultImport(ast, filePath);
        if (importName) {
            let attempt1 = commons.findPropertyInObjectNode(defaultNode, importName);
            let attempt2 = commons.findPropertyByValueInObjectNode(defaultNode, importName);
            if (!attempt1 && !attempt2) {
                throw Error('There is no a reducer imported from the module reducer file ' + filePath);
            } else {
                if (attempt1 && attempt1.key) {
                    reducerPropertyName = attempt1.key.name;
                } else if (attempt2 && attempt2.key) {
					reducerPropertyName = attempt2.key.name;
                }
            }
        } else {
            throw Error(`Could not find import from ${filePath} in global reducers file.`);
        }
    } else {
        throw Error('Could not find default export in global reducers file.');
    }
    return reducerPropertyName;
}

export function injectModuleReducer(sourceCode, name, importName, filePath) {
    let ast = commons.parse(sourceCode);
    let defaultNode = commons.findDefaultExportsNode(ast);
    if (defaultNode) {
        const {callee, arguments: callArgs} = defaultNode;
        if (callee && callee.name === 'combineReducers') {
            if (callArgs && callArgs.length > 0) {
                let existing = commons.findPropertyInObjectNode(defaultNode.arguments[0], name);
                if (existing) {
                    throw Error('There is already a reducer with name ' + name + ' in module reducer file');
                }
                const deleteImportName = commons.findDefaultImport(ast, filePath);
                commons.deletePropertyFromObjectNode(defaultNode.arguments[0], name, deleteImportName);
                commons.deletePropertyFromObjectNode(defaultNode.arguments[0], name, importName);
                commons.addPropertyToObjectNode(defaultNode.arguments[0], name, importName);
            } else {
                let objectExpression = commons.createObjectExpressionNode();
                commons.addPropertyToObjectNode(objectExpression, name, importName);
                defaultNode.arguments = [objectExpression];
            }
            commons.addDefaultImport(ast, importName, filePath);
        } else {
            throw Error('Could not find "combineReducers" method in the default export in module reducer file.');
        }
    } else {
        throw Error('Could not find default export in module reducer file.');
    }
    return commons.generate(ast);
}

export function injectReducer(sourceCode, name, importName, filePath) {
    let ast = commons.parse(sourceCode);
    let defaultNode = commons.findDefaultExportsNode(ast);
    if (defaultNode) {
		const importName = commons.findDefaultImport(ast, filePath);
		if (importName) {
			let attempt1 = commons.findPropertyInObjectNode(defaultNode, importName);
			let attempt2 = commons.findPropertyByValueInObjectNode(defaultNode, importName);
			if (!attempt1 && !attempt2) {
				commons.addPropertyToObjectNode(defaultNode, name, importName);
				commons.addDefaultImport(ast, importName, filePath);
			}
		} else {
			commons.addPropertyToObjectNode(defaultNode, name, importName);
			commons.addDefaultImport(ast, importName, filePath);
		}
        // if (!existing) {
			// const deleteImportName = commons.findDefaultImport(ast, filePath);
			// commons.deletePropertyFromObjectNode(defaultNode, name, deleteImportName);
			// commons.deletePropertyFromObjectNode(defaultNode, name, importName);
			// commons.addPropertyToObjectNode(defaultNode, name, importName);
			// commons.addDefaultImport(ast, importName, filePath);
        // }
    } else {
        throw Error('Could not find default export in global reducers file.');
    }
    return commons.generate(ast);
}