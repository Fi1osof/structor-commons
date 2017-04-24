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

let prettier = require('prettier');

const testText  = `
/**
 *
 * HomePage
 *
 */

import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

class HomePage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div style={{padding: '1em'}}>
          <h3 
          style={{ textAlign: 'center'}}>
          <span
          >Home Page</span></h3>
          <h3 style={{ textAlign: 'center' }}>
          <Link to="/home-test"> 
          <span>To Home Test</span> </Link></h3>
        </div>
      </div>
      ); // eslint-disable-line
  }
}

export default HomePage;

`;

console.log(prettier.format(testText, {printWidth: 150,}));
