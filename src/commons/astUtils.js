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

import {traverse, traverseWithResult} from './utils.js';

export function findExportsNode(ast) {
	let exports = null;
	traverse(ast, node => {
		if(node.type === 'ExportDefaultDeclaration'){
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
					if((type === 'ImportDefaultSpecifier')
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