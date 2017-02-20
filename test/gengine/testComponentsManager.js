var path = require('path');
var initEnv = require('../init.js');
// var {storage, commons, config} = require('../../distr/index.js');
var componentsManager = require('../../distr/storage/componentsManager.js');

initEnv()
	.then(() => {
		return componentsManager.getComponentsStructure();
	})
	.then(response => {
		console.log(JSON.stringify(response, null, 4));
	})
	.catch(error => console.error(error));
