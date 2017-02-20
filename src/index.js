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

import {
	SERVICE_DIR,
	READY,
	EMPTY,
	getProjectDir,
	reinit,
	init,
	status,
	getDebugMode,
	asObject,
	appDirPath,
	webpackConfigFilePath,
	deskEntryPointFilePath,
	deskDirPath,
	deskModelFilePath,
	deskSourceDirPath,
	deskIndexFilePath,
	deskReducersFilePath,
	deskSagasFilePath,
	nodeModulesDirPath,
	componentDefaultsDirPath,
	docsComponentsDirPath,
	templatesDirPath,
	getProjectConfig,
	projectProxyURL,
	appAssetsDirPath,
	gengineDirPath,
	scaffoldsDirPath
} from './configuration.js';

export const config = {
	SERVICE_DIR,
	READY,
	EMPTY,
	getProjectDir,
	reinit,
	init,
	status,
	getDebugMode,
	asObject,
	appDirPath,
	webpackConfigFilePath,
	deskEntryPointFilePath,
	deskDirPath,
	deskModelFilePath,
	deskSourceDirPath,
	deskIndexFilePath,
	deskReducersFilePath,
	deskSagasFilePath,
	nodeModulesDirPath,
	componentDefaultsDirPath,
	docsComponentsDirPath,
	templatesDirPath,
	getProjectConfig,
	projectProxyURL,
	appAssetsDirPath,
	gengineDirPath,
	scaffoldsDirPath
};

import commonsAPI from './commons/index';
import gengineAPI from './gengine/index';
import storageAPI from './storage/index';

export const commons = commonsAPI;
export const gengine = gengineAPI;
export const storage = storageAPI;
