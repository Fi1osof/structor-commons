
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

import {forOwn, isObject} from 'lodash';

// export function cleanModel(model){
//     if(model.props && model.props['data-umyid']){
//         model.props['data-umyid'] = undefined;
//         delete model.props['data-umyid'];
//     }
//     forOwn(model.props, (value, prop) => {
//         if(isObject(value) && value.type){
//             cleanModel(value);
//         }
//     });
//     if(model.children && model.children.length > 0){
//         for(let i = 0; i < model.children.length; i++){
//             cleanModel(model.children[i]);
//         }
//     }
// }

export function getModelComponentMap(model, resultMap = {}){

    resultMap[model.type] = {};

    if(model.props){
        forOwn(model.props, (propValue, prop) => {
            if (isObject(propValue) && propValue.type) {
                getModelComponentMap(propValue, resultMap);
            }
        });
    }
    if(model.children && model.children.length > 0){
        for(let i = 0; i < model.children.length; i++){
            getModelComponentMap(model.children[i], resultMap);
        }
    }
    return resultMap;
}
