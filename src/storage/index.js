import {
	getComponentTree
} from './indexManagerNew.js';

import {
	installDependencies,
	saveGenerated
} from './generatorManager.js';

import {
	getScaffoldGenerators
} from './scaffoldManager.js';

import {
	writeComponentDefaults,
	readComponentDocument,
	readComponentSourceCode,
	writeComponentSourceCode,
	readProjectJsonModel,
	writeProjectJsonModel
} from './storageManager.js';

export default {
	getComponentTree,
	installDependencies,
	saveGenerated,
	getScaffoldGenerators,
	writeComponentDefaults,
	readComponentDocument,
	readComponentSourceCode,
	writeComponentSourceCode,
	readProjectJsonModel,
	writeProjectJsonModel
};