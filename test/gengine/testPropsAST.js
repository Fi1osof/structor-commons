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

var {commons, gengine, config} = require('../../distr/index.js');

const testText  = `
Button.propTypes = {
  
  // If true, the button will use the theme's accent color.
  // default: false
  accent: PropTypes.bool,
  
  // Useful to extend the style applied to components.
  classes: PropTypes.object,
  
  // Useful to extend the style applied to components.
  // default: false
  compact: PropTypes.bool,
  
  // The component used for the root node. 
  // Either a string to use a DOM element or a component.
  // default: 'button'
  component: PropTypes.oneOfType([
                 PropTypes.string,
                 PropTypes.func,
               ]),
  
};

`;
const ast = commons.parse(testText);
const properties = commons.getObjectAssignmentPropNames(ast);
console.log(JSON.stringify(ast, null, 4));
console.log(JSON.stringify(properties, null, 4));
