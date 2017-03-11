var path = require('path');
var initEnv = require('../init.js');
var {storage, commons, config} = require('../../distr/index.js');

initEnv()
	.then(() => {
		return storage.getComponentTree();
	})
	.then(tree => {
		console.log(JSON.stringify(tree, null, 4));
	})
	.catch(error => console.error(error));

