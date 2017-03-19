import {
	getReducerPropertyName,
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
	combineAllModuleComponents,
	getModelComponentList,
	prepareModelWithImports
} from './modelUtils.js';

export default {
	getReducerPropertyName,
	injectModuleReducer,
	injectReducer,
	injectModuleSaga,
	injectSaga,
	injectModuleComponent,
	injectNamespaceComponent,
	combineAllModuleComponents,
	getModelComponentList,
	prepareModelWithImports
};