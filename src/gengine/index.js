import {
	getReducerProperty,
	injectModuleReducer,
	injectReducer
} from './reducerUtils.js';

import {
	injectModuleSaga,
	injectSaga
} from './sagasUtils.js';

import {
	injectModuleComponent,
	injectNamespaceComponent
} from './componentsUtils.js';

import {
	prepareModelWithImports
} from './modelUtils.js';

export default {
	getReducerProperty,
	injectModuleReducer,
	injectReducer,
	injectModuleSaga,
	injectSaga,
	injectModuleComponent,
	injectNamespaceComponent,
	prepareModelWithImports
};