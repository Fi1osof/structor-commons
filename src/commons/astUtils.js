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

import {findIndex} from 'lodash';
import {traverse, traverseWithResult} from './utils.js';

export function findDefaultExportsNode(ast) {
	let exports = null;
	traverse(ast, node => {
		if(node.type === 'ExportDefaultDeclaration'){
			exports = node.declaration;
		}
	});
	return exports;
}

export function findExportsNode(ast) {
	let exports = null;
	traverse(ast, node => {
		if(node.type === 'ExportDeclaration'){
			exports = node.declaration;
		}
	});
	return exports;
}

export function getImportsObject(ast){
	let imports = {};
	traverse(ast, node => {
		if(node.type === 'ImportDeclaration'){
			const {specifiers, source} = node;
			if(specifiers && specifiers.length > 0 && source){
				specifiers.forEach(specifier => {
					const {type, local} = specifier;
					const {value} = source;
					if((type === 'ImportNamespaceSpecifier')
						&& local
						&& local.type === 'Identifier'
						&& value){
						imports[local.name] = { source: value };
					} else if((type === 'ImportDefaultSpecifier')
						&& local
						&& local.type === 'Identifier'
						&& value){
						imports[local.name] = { source: value };
					} else if((type === 'ImportSpecifier')
						&& local
						&& local.type === 'Identifier'
						&& value){
						imports[local.name] = { source: value, member: true };
					}
				});
			}
		}
	});
	return imports;
}

export function getExportObject(astNode) {
	let resultObject = {};
	traverseWithResult(astNode, (node, object) => {
		const {type, key, value} = node;
		if (value && key && type === 'Property') {
			if (key.type === 'Identifier') {
				if (value.type === 'Identifier') {
					object[key.name] = value.name;
					return object;
				} else if (value.type === 'ObjectExpression') {
					object[key.name] = object[key.name] || {};
					return object[key.name];
				}
			} else if (key.type === 'Literal') {
				if (value.type === 'Identifier') {
					object[key.value] = value.name;
					return object;
				} else if (value.type === 'ObjectExpression') {
					object[key.value] = object[key.name] || {};
					return object[key.name];
				}
			}
		}
		return object;
	}, resultObject);
	return resultObject;
}

export function getNamedExportObject(ast) {
	let resultObject = undefined;
	traverse(ast, node => {
		if(node.type === 'ExportNamedDeclaration' && node.specifiers){
			resultObject = {};
			const {specifiers} = node;
			specifiers.forEach(specifier => {
				const {type, exported, local} = specifier;
				if (exported && exported.name && local && local.name) {
					resultObject[exported.name] = local.name;
				}
			});
		}
	});
	return resultObject;
}

export function addNamespaceImport(ast, name, path) {
	ast.body = ast.body || [];
	if (ast.body.length > 0) {
		let foundIndex = 0;
		while (foundIndex >= 0) {
			foundIndex = findIndex(ast.body, item => {
				const {type, specifiers, source} = item;
				if (type === 'ImportDeclaration' && specifiers && source) {
					const {type: specifierType, local} = specifiers[0];
					const {value} = source;
					if (specifierType === 'ImportNamespaceSpecifier' && local && value) {
						return local.name === name || value === path;
					}
				}
				return false;
			});
			if (foundIndex >= 0) {
				ast.body.splice(foundIndex, 1);
			}
		}
	}
	let injectIndex = -1;
	for(let i = 0; i < ast.body.length; i++){
		const {type} = ast.body[i];
		if(type === 'ImportDeclaration'){
			injectIndex = i;
		}
	}
	ast.body.splice(injectIndex >= 0 ? injectIndex + 1 : 0, 0, {
		type: "ImportDeclaration",
		specifiers: [
			{
				type: "ImportNamespaceSpecifier",
				local: {
					type: "Identifier",
					name: name
				}
			}
		],
		source: {
			type: "Literal",
			value: path,
			raw: `'${path}'`
		}
	});
	return ast;
}

export function addDefaultImport(ast, name, path) {
	ast.body = ast.body || [];
	if (ast.body.length > 0) {
		let foundIndex = 0;
		while (foundIndex >= 0) {
			foundIndex = findIndex(ast.body, item => {
				const {type, specifiers, source} = item;
				if (type === 'ImportDeclaration' && specifiers && source) {
					const {type: specifierType, local} = specifiers[0];
					const {value} = source;
					if (specifierType === 'ImportDefaultSpecifier' && local && value) {
						return local.name === name || value === path;
					}
				}
				return false;
			});
			if (foundIndex >= 0) {
				ast.body.splice(foundIndex, 1);
			}
		}
	}
	let injectIndex = -1;
	for(let i = 0; i < ast.body.length; i++){
		const {type} = ast.body[i];
		if(type === 'ImportDeclaration'){
			injectIndex = i;
		}
	}
	ast.body.splice(injectIndex >= 0 ? injectIndex + 1 : 0, 0, {
		type: "ImportDeclaration",
		specifiers: [
			{
				type: "ImportDefaultSpecifier",
				local: {
					type: "Identifier",
					name: name
				}
			}
		],
		source: {
			type: "Literal",
			value: path,
			raw: `'${path}'`
		}
	});
	return ast;
}

export function addNamedExport(ast, name) {
	let exportNamedNode;
	traverse(ast, node => {
		if(node.type === 'ExportNamedDeclaration'){
			exportNamedNode = node;
		}
	});
	if (exportNamedNode) {
		exportNamedNode.specifiers = exportNamedNode.specifiers || [];
		if (exportNamedNode.specifiers.length > 0) {
			const foundIndex = findIndex(exportNamedNode.specifiers, item => {
				const {type, exported, local} = item;
				if (type === 'ExportSpecifier' && exported && local) {
					return exported.name === name;
				}
			});
			if (foundIndex >= 0) {
				exportNamedNode.specifiers.splice(foundIndex, 1);
			}
		}
		exportNamedNode.specifiers.push(
			{
				type: 'ExportSpecifier',
				exported: {
					type: 'Identifier',
					name,
				},
				local: {
					type: 'Identifier',
					name,
				}
			}
		);
	} else {
		ast.body = ast.body || [];
		ast.body.push({
			type: 'ExportNamedDeclaration',
			declaration: null,
			specifiers: [
				{
					type: 'ExportSpecifier',
					exported: {
						type: 'Identifier',
						name,
					},
					local: {
						type: 'Identifier',
						name,
					}
				}
			]
		});
	}
	return ast;
}

export function createObjectExpressionNode() {
	return {
		type: 'ObjectExpression',
		properties: []
	}
}

export function addPropertyToObjectNode(astNode, propKey, propValue) {
	if (astNode.type === 'ObjectExpression') {
		astNode.properties = astNode.properties || [];
		let newProperty = {
			type: "Property",
			key: {
				type: "Identifier",
				name: propKey
			},
			value: {
				type: "Identifier",
				name: propValue
			},
			computed: false,
			kind: "init",
			method: false,
			shorthand: false
		};
		if (propKey === propValue) {
			newProperty.shorthand = true;
		}
		astNode.properties.push(newProperty);
	}
	return astNode;
}

export function deletePropertyFromObjectNode(astNode, propKey, propValue) {
	if (astNode.type === 'ObjectExpression') {
		astNode.properties = astNode.properties || [];
		let validProps = [];
		astNode.properties.forEach(prop => {
			const {type, key, value} = prop;
			if (type === 'Property' && key && value) {
				if (key.name !== propKey && value.name !== propValue) {
					validProps.push(prop);
				}
			}
		});
		astNode.properties = validProps;
	}
	return astNode;
}

export function findPropertyInObjectNode(astNode, propKey) {
	let filtered;
	if (astNode.type === 'ObjectExpression' && astNode.properties) {
		filtered = astNode.properties.find(prop => {
			const {type, key, value} = prop;
			if (type === 'Property' && key && value) {
				return key.name === propKey;
			}
			return false;
		});
	}
	return filtered;
}

export function findPropertyByValueInObjectNode(astNode, propValue) {
	let filtered;
	if (astNode.type === 'ObjectExpression' && astNode.properties) {
		filtered = astNode.properties.find(prop => {
			const {type, key, value} = prop;
			if (type === 'Property' && key && value) {
				return value.name === propValue;
			}
			return false;
		});
	}
	return filtered;
}

export function addSpreadElementToArrayNode(astNode, name) {
	if (astNode && astNode.type === 'ArrayExpression') {
		astNode.elements = astNode.elements || [];
		astNode.elements.push({
			type: "SpreadElement",
			argument: {
				type: "Identifier",
				name: name
			}
		});
	}
	return astNode;
}

export function deleteSpreadElementFromArrayNode(astNode, name) {
	if (astNode && astNode.type === 'ArrayExpression') {
		let validElements = [];
		const {elements} = astNode;
		if (elements && elements.length > 0) {
			elements.forEach(item => {
				const {type, argument: elementArg} = item;
				if (type === 'SpreadElement' && elementArg) {
					if (elementArg.name !== name) {
						validElements.push(item);
					}
				}
			});
		}
		astNode.elements = validElements;
	}
	return astNode;
}

export function findDefaultImport(ast, filePath) {
	let foundIdentifier = undefined;
	for (let i = 0; i < ast.body.length; i++) {
		const {type, source, specifiers} = ast.body[i];
		if (type === 'ImportDeclaration')
			if (source && source.value === filePath) {
				if (specifiers && specifiers.length > 0) {
					let importDefaultSpecifier =
						specifiers.find(i =>
						i.type &&
						i.type === 'ImportDefaultSpecifier'
						&& i.local);
					if (importDefaultSpecifier) {
						foundIdentifier = importDefaultSpecifier.local.name;
					}
				}
				break;
			}
	}
	return foundIdentifier;
}
