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
		const sourceCode = tree.modules['TestGroup'].sagasSourceCode;
		// console.log(JSON.stringify(tree, null, 4));
		const newSourceCode = gengine.injectModuleSaga(
			sourceCode,
			'testSaga',
			'./containers/Test/sagas.js'
		);
		console.log(newSourceCode);

		const sagasSourceCode = tree.sagasSourceCode;
		// console.log(reducersSourceCode);
		const newSagasCode = gengine.injectSaga(sagasSourceCode, 'TestGroup', 'modules/TestGroup/sagas.js');
		console.log(newSagasCode);

	})
	.catch(error => console.error(error));
