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

require('babel-register')({
	presets: ['latest']
});
// require('babel-core/register');

import {
    fulex,
    traverse,
    traverseWithResult,
    traverseModel,
    traverseModelWithResult,
    parse,
    generate,
    formatJs,
    writeErrorFileFor,
} from './commons/utils.js';

import {
    getModelComponentMap
} from './commons/modelParser.js';

import {
	ensureFilePath,
	ensureDirPath,
    readFile,
    writeFile,
    writeBinaryFile,
    placeInPosition,
    copyFiles,
	copyFilesNoError,
    copyFile,
    traverseDirTree,
    isExisting,
	findComponentFilePath,
    readDirectoryTree,
    readDirectory,
    readDirectoryFiles,
    readDirectoryFlat,
    checkDirIsEmpty,
    readJson,
    writeJson,
    removeFile,
	unpackTarGz,
	unpackTar,
	repackTarGzOmitRootDir,
	packTarGz
} from './commons/fileManager.js';

import {
	installPackages,
	installDefault,
	getNpmConfigVariable,
	setNpmConfigVariable,
	getPackageAbsolutePath,
	getPackageVersion
} from './commons/npmUtils.js';

import {
	getReducerProperty
} from './gengine/reducersFileUtils.js';

import {
	findExportsNode,
	findImports,
	getStructure,
	initIndex,
	getComponentsTree,
	getComponentsNames,
	addComponent
} from './gengine/indexManager.js';

import {
	preprocess,
	process
} from './gengine/gEngine.js';


export default {
	fulex,
	traverse,
	traverseWithResult,
	traverseModel,
	traverseModelWithResult,
	parse,
	generate,
	formatJs,
	writeErrorFileFor,
	getModelComponentMap,
	ensureFilePath,
	ensureDirPath,
	readFile,
	writeFile,
	writeBinaryFile,
	placeInPosition,
	copyFiles,
	copyFilesNoError,
	copyFile,
	traverseDirTree,
	isExisting,
	findComponentFilePath,
	readDirectoryTree,
	readDirectory,
	readDirectoryFiles,
	readDirectoryFlat,
	checkDirIsEmpty,
	readJson,
	writeJson,
	removeFile,
	unpackTarGz,
	unpackTar,
	repackTarGzOmitRootDir,
	packTarGz,
	installPackages,
	installDefault,
	getNpmConfigVariable,
	setNpmConfigVariable,
	getPackageAbsolutePath,
	getPackageVersion,

	getReducerProperty,
	findExportsNode,
	findImports,
	getStructure,
	initIndex,
	getComponentsTree,
	getComponentsNames,
	addComponent,
	preprocess,
	process
}