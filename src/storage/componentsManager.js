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

import * as config from '../configuration.js';
import * as fileManager from '../commons/fileManager.js';
import {parse} from '../commons/utils.js';

export function getComponentsStructure() {
	return fileManager.readFile(config.deskIndexFilePath())
		.then(fileData => {
			if (!fileData) {
				throw Error('Components file is empty.');
			}
			try {
				return parse(fileData);
			} catch (e) {
				throw Error('Reading components file error. ' + e.message);
			}
		});
}
