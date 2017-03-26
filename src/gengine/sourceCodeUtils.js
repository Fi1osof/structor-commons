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

export function getModulesImports(componentTree, namespaces) {
    let importObjects = [];
	let tasks = [];
	let moduleDef;
	namespaces.forEach(namespace => {
		moduleDef = componentTree.modules[namespace];
		if (moduleDef) {
			tasks.push(
				commons.readDirectoryFiles(moduleDef.absolutePath)
					.then(found => {
						if (found.files && found.files.length > 0) {
							return found.files.reduce(
								(sequence, filePath) => {
									return sequence
										.then(() => {
											return commons.readFile(filePath)
												.then(fileData => {
													let ast = commons.parse(fileData);
													importObjects.push(commons.getImportsObject(ast));
												});
										}).catch(err => {
											console.error(err.message + '. File path: ' + filePath);
										});
								},
								Promise.resolve()
							);
						}
					})
			)
		}
	});
	return Promise.all(tasks).then(() => {return importObjects;});
}