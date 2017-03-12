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

var path = require('path');
var initEnv = require('../init.js');
var {storage, commons, config, gengine} = require('../../distr/index.js');

initEnv()
	.then(() => {
		return storage.getComponentTree();
	})
	.then(tree => {
		const sourceCode = tree.modules['TestGroup'].reducerSourceCode;
		// console.log(JSON.stringify(tree, null, 4));
		const newSourceCode = gengine.injectModuleReducer(
			sourceCode,
			'test',
			'test',
			'./containers/Test/reducer.js'
		);
		console.log(newSourceCode);

		const reducersSourceCode = tree.reducersSourceCode;
		// console.log(reducersSourceCode);
		const newReducersCode = gengine.injectReducer(reducersSourceCode, 'TestGroup', 'TestGroup', 'modules/TestGroup/reducer.js');
		console.log(newReducersCode);

	})
	.catch(error => console.error(error));
