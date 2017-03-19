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

import {cloneDeep, forOwn, isEmpty} from 'lodash';
import commons from '../commons';

export const combineAllModuleComponents = (componentTree, namespace) => {
	let resultModel = {
		type: "div",
		props: {},
		children: []
	};
	if (componentTree && componentTree.modules[namespace]) {
		const {components} = componentTree.modules[namespace];
		if (components && !isEmpty(components)) {
			forOwn(components, (value, prop) => {
				if (value.defaults) {
					resultModel.children = resultModel.children.concat(value.defaults);
				} else {
					resultModel.children.push({
						type: prop,
						props: {},
						children: []
					});
				}
			});
		}
	}
	return resultModel;
};

export const getModelComponentList = (componentTree, model) => {
	const modelComponentList = commons.traverseModelWithResult(model, ((node, result) => {
		let component;
		if (node.type) {
			if (node.namespace && node.namespace.length > 0 && componentTree.modules) {
				let module = componentTree.modules[node.namespace];
				if (module && module.components) {
					let componentDef = module.components[node.type];
					if (componentDef) {
						component = {
							name: node.type,
							namespace: node.namespace,
							importPath: componentDef.importPath,
							namespaceImportPath: module.importPath,
							isLibMember: componentDef.isLibMember,
						};
					}
				}
			} else {
				if (componentTree.components) {
					let componentDef = componentTree.components[node.type];
					if (componentDef) {
						component = {
							name: node.type,
							importPath: componentDef.importPath,
							isLibMember: componentDef.isLibMember,
						}
					}
				}
			}
		}
		if (component) {
			let sameComponents =
				result.filter(
					item =>
					item.name === component.name &&
					item.namespace === component.namespace
				);
			if (!sameComponents || sameComponents.length === 0) {
				result.push(component);
			}
		}
		return result;
	}), []);
	return modelComponentList;
};

export const prepareModelWithImports = (componentTree, model, srcNamespace) => {

	const modelComponentList = commons.traverseModelWithResult(model, ((node, result) => {
		let component;
		if (node.type) {
			if (node.namespace && node.namespace.length > 0 && componentTree.modules) {
				let module = componentTree.modules[node.namespace];
				if (module && module.components) {
					let componentDef = module.components[node.type];
					if (componentDef) {
						component = {
							name: node.type,
							namespace: node.namespace,
							importPath: componentDef.importPath,
							namespaceImportPath: module.importPath,
							isLibMember: componentDef.isLibMember,
						};
					}
				}
			} else {
				if (componentTree.components) {
					let componentDef = componentTree.components[node.type];
					if (componentDef) {
						component = {
							name: node.type,
							importPath: componentDef.importPath,
							isLibMember: componentDef.isLibMember,
						}
					}
				}
			}
		}
		if (component) {
			let sameComponents =
				result.filter(
					item =>
					item.name === component.name &&
					item.namespace === component.namespace
				);
			if (!sameComponents || sameComponents.length === 0) {
				result.push(component);
			}
		}
		return result;
	}), []);

	const imports = commons.traverseModelWithResult(model, ((node, result) => {
		if (node.type) {
			let foundComponents = modelComponentList.filter(item => item.name === node.type);
			if (foundComponents && foundComponents.length > 0) {
				if (foundComponents.length === 1) {
					// there is only one component in model with such a name
					let componentDef = foundComponents[0];
					if (componentDef.namespace && componentDef.namespace === srcNamespace) {
						result[componentDef.name] = {
							relativeSource: componentDef.importPath,
						};
					} else if (componentDef.namespace && componentDef.namespace.length > 0) {
						result[componentDef.name] = {
							member: true,
							relativeSource: componentDef.namespaceImportPath,
						}
					} else {
						result[componentDef.name] = {
							relativeSource: componentDef.importPath,
							member: componentDef.isLibMember,
						}
					}
				} else {
					// there are many components with the same name
					foundComponents.forEach(componentDef => {
						if (componentDef.namespace && componentDef.namespace.length > 0) {
							result[componentDef.namespace] = {
								relativeSource: componentDef.namespaceImportPath,
								namespace: true,
							};
						} else {
							result[componentDef.name] = {
								relativeSource: componentDef.importPath,
								member: componentDef.isLibMember,
							}
						}
					});
				}
			}
		}
		return result;
	}), {});

	let resultModel = cloneDeep(model);
	commons.traverseModel(resultModel, node => {
		if (node.type) {
			let foundImport = imports[node.type];
			if (foundImport) {
				if (node.namespace && node.namespace.length > 0) {
					let namespaceImport = imports[node.namespace];
					if (namespaceImport) {
						let foundComponents = modelComponentList.filter(item => item.name === node.type);
						if (foundComponents && foundComponents.length > 1) {
							node.type = `${node.namespace}.${node.type}`;
						}
					}
				}
			}
		}
	});

	let resultImports = [];
	forOwn(imports, (value, prop) => {
		resultImports.push(Object.assign({}, value, {name: prop}));
	});

	return {imports: resultImports, model: resultModel};
};
