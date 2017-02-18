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

const esformatterOptions = {
    // inherit from the default preset
    preset: 'default',
    indent: {
        value: '  '
    },
    lineBreak: {
        before: {
            // at least one line break before BlockStatement
            BlockStatement: '>=1',
            // only one line break before BlockStatement
            DoWhileStatementOpeningBrace: 1,
            // ...
            ObjectExpressionClosingBrace: 1
        },
        after: {
            ObjectExpressionOpeningBrace: 1
        }
    },
    whiteSpace: {
        before: {
            MemberExpressionClosing: 1,
            ObjectExpressionClosingBrace: 1
        },
        after: {
            MemberExpressionOpening: 1,
            ObjectExpressionOpeningBrace: 1
        }
    },
    "plugins": [
        "esformatter-jsx"
    ],
    // this is the section this plugin will use to store the settings for the jsx formatting
    "jsx": {
        // by default is true if set to false it works the same as esformatter-jsx-ignore
        "formatJSX": true,
        // keep the node attributes on the same line as the open tag. Default is true.
        // Setting this to false will put each one of the attributes on a single line
        "attrsOnSameLineAsTag": false,
        // how many attributes should the node have before having to put each
        // attribute in a new line. Default 1
        "maxAttrsOnTag": 1,
        // if the attributes are going to be put each one on its own line, then keep the first
        // on the same line as the open tag
        "firstAttributeOnSameLine": false,
        // default false. if true attributes on multiple lines will close the tag on a new line
        "closingTagOnNewLine": true,
        // align the attributes with the first attribute (if the first attribute was kept on the same line as on the open tag)
        "alignWithFirstAttribute": true,
        // control whether the Expressions are put in a single line or span several lines
        "JSXExpressionsSingleLine": true,
        "formatJSXExpressions": true,
        "spaceInJSXExpressionContainers": '',
        // possible values "single" or "double". Leave it as empty string if you don't want to modify the attributes' quotes
        "JSXAttributeQuotes": "",
        "htmlOptions": { // same as the ones passed to jsbeautifier.html
            "brace_style": "collapse",
            "indent_char": ' ',
            "indent_size": 2,
            "max_preserve_newlines": 2,
            "preserve_newlines": true
        }
    }
};

export default esformatterOptions;