import {
	findExportsNode,
	findImports,
	getStructure,
	initIndex,
	getComponentsTree,
	getComponentsNames,
	addComponent
} from './indexManager.js';

import {
	initGeneratorData,
	invokePreGeneration,
	invokeGeneration,
	installDependencies,
	saveGenerated
} from './generatorManager.js';

import {
	getScaffoldGenerators
} from './scaffoldManager.js';

import {
	readDefaults,
	readComponentDocument,
	readComponentSourceCode,
	writeComponentSourceCode,
	readProjectJsonModel,
	writeProjectJsonModel
} from './storageManager.js';

export default {
	findExportsNode,
	findImports,
	getStructure,
	initIndex,
	getComponentsTree,
	getComponentsNames,
	addComponent,
	initGeneratorData,
	invokePreGeneration,
	invokeGeneration,
	installDependencies,
	saveGenerated,
	getScaffoldGenerators,
	readDefaults,
	readComponentDocument,
	readComponentSourceCode,
	writeComponentSourceCode,
	readProjectJsonModel,
	writeProjectJsonModel
};