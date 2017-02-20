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
var _ = require('lodash');
var path = require('path');
var {commons, gengine, config} = require('../../distr/index.js');
var init = require('../init');
var htmlList = require('./html');

const template = {
	"variant": "default",
	"props": {},
	"children": []
};


init()
	.then(() => {
		let tasks = [];
		_.forOwn(htmlList, (value, prop) => {
			let filePath = path.join(config.componentDefaultsDirPath(), '#html', prop + '.json');
			tasks.push(
				commons.ensureFilePath(filePath)
					.then(() => {
						return commons.writeJson(
							filePath,
							[_.assign({}, {namespace: '#html', type: prop}, template, value)]
						);
					})
			)
		});
		return Promise.all(tasks);
	})
	.then(() => {
		console.log('Done.');
	})
	.catch(error => {
		console.error(error);
	});

// commons.readJson(filePath)
// 	.then(jsonObj => {
// 		return gengine.process('/Users/ipselon/Development/projects/structor/test/.structor/gengine/scaffolds/react-component');
// 	})
// 	.then(resultData => {
// 		console.log(JSON.stringify(resultData, null, 4));
// 	})
// 	.catch(error => {
// 		console.error(error);
// 	});
