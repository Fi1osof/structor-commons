var path = require('path');
var initEnv = require('../init.js');
var {storage, commons, config} = require('../../distr/index.js');

initEnv()
	.then(() => {
		return storage.getComponentsTree();
	})
	.then(tree => {
		console.log(JSON.stringify(tree, null, 4));
	})
	.catch(error => console.error(error));

// commons.readFile(filePath)
// 	.then(fileData => {
// 		return commons.parse(fileData);
// 	})
// 	.then(ast => {
// 		return storage.getStructure(ast);
// 	})
// 	.then(structureObject => {
// 		console.log(JSON.stringify(structureObject, null, 4));
// 	})
// 	.catch(error => console.error(error));
