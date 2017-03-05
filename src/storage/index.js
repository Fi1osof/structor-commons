import {
	findExportsNode,
	findImports,
	getStructure,
	initIndex,
	getComponentsNames,
	addComponent
} from './indexManager.js';

import {
	getComponentTree
} from './indexManagerNew.js';

import {
	initGeneratorData,
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
	getComponentTree,
	getComponentsNames,
	addComponent,
	initGeneratorData,
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