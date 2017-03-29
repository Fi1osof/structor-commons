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

export function injectModuleSaga(sourceCode, importName, filePath) {
    let ast = commons.parse(sourceCode);
    let defaultNode = commons.findDefaultExportsNode(ast);
    if (defaultNode) {
        const deleteImportName = commons.findDefaultImport(ast, filePath);
        commons.deleteSpreadElementFromArrayNode(defaultNode, deleteImportName);
        commons.deleteSpreadElementFromArrayNode(defaultNode, importName);
        commons.addSpreadElementToArrayNode(defaultNode, importName);
        commons.addDefaultImport(ast, importName, filePath);
    } else {
        throw Error('Could not find default export in module sagas file.');
    }
    return commons.generate(ast);
}

export function injectSaga(sourceCode, importName, filePath) {
    let ast = commons.parse(sourceCode);
    let defaultNode = commons.findDefaultExportsNode(ast);
    if (defaultNode) {
        const deleteImportName = commons.findDefaultImport(ast, filePath);
        commons.deleteSpreadElementFromArrayNode(defaultNode, deleteImportName);
        commons.deleteSpreadElementFromArrayNode(defaultNode, importName);
        commons.addSpreadElementToArrayNode(defaultNode, importName);
        commons.addDefaultImport(ast, importName, filePath);
    } else {
        throw Error('Could not find default export in global sagas file.');
    }
    return commons.generate(ast);
}