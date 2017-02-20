'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.injectComponent = injectComponent;
exports.getFile = getFile;

var _lodash = require('lodash');

var _structorCommons = require('structor-commons');

function injectImport(ast, identifier, sourcePath) {
    var foundIndex = -1;
    var injectIndex = -1;
    for (var i = 0; i < ast.body.length; i++) {
        var _ast$body$i = ast.body[i],
            type = _ast$body$i.type,
            specifiers = _ast$body$i.specifiers,
            source = _ast$body$i.source;

        if (type === 'ImportDeclaration') {
            injectIndex = i;
            if (source && source.value === sourcePath) {
                foundIndex = i;
            }
        }
    }
    if (foundIndex < 0) {
        ast.body.splice(injectIndex >= 0 ? injectIndex + 1 : 0, 0, {
            type: 'ImportDeclaration',
            specifiers: [{
                type: "ImportDefaultSpecifier",
                local: {
                    type: "Identifier",
                    name: identifier
                }
            }],
            source: {
                type: "Literal",
                value: sourcePath,
                raw: '\'' + sourcePath + '\''
            }
        });
        return true;
    }
    return false;
}

function findDefaultExportNode(ast) {
    var exports = null;
    _structorCommons.commons.traverse(ast, function (node) {
        if (node.type === 'ExportDefaultDeclaration') {
            exports = node.declaration;
        }
    });
    return exports;
}

function appendToNode(node, variableString) {
    var newAst = _structorCommons.commons.parse('var c = {' + variableString + '}');
    var newPart = null;
    _structorCommons.commons.traverse(newAst, function (node) {
        if (node.type === 'VariableDeclarator' && node.id.name === 'c') {
            newPart = node.init.properties[0];
        }
    });
    if (node.properties) {
        var index = -1;
        if (node.properties.length > 0) {
            index = (0, _lodash.findIndex)(node.properties, function (o) {
                return o.key && o.key.type === 'Identifier' && o.key.name === newPart.key.name;
            });
        }
        if (index >= 0) {
            node.properties[index] = newPart;
        } else {
            node.properties.push(newPart);
        }
    }
}

function injectComponent(ast, componentGroup, componentName) {
    var defaultNodeAst = findDefaultExportNode(ast);
    if (defaultNodeAst) {
        var identifier = componentName;
        var sourcePath = 'containers/' + componentGroup + '/' + componentName;
        if (injectImport(ast, identifier, sourcePath)) {
            var groupNode = null;
            _structorCommons.commons.traverse(defaultNodeAst, function (node) {
                if (node.type === 'Property' && node.key.type === 'Identifier') {
                    if (node.value.type === 'ObjectExpression' && node.key.name === componentGroup) {
                        groupNode = node.value;
                    }
                }
            });
            if (!groupNode) {
                appendToNode(defaultNodeAst, componentGroup + ': {' + componentName + '}');
            } else {
                appendToNode(groupNode, componentName);
            }
        }
    } else {
        throw Error('Could not find default export in "components.js" file.');
    }
    return _structorCommons.commons.generate(ast);
}

function getFile(dataObject, dependencies) {
    var index = dataObject.index,
        model = dataObject.model,
        metadata = dataObject.metadata,
        project = dataObject.project,
        groupName = dataObject.groupName,
        componentName = dataObject.componentName;


    if (!(0, _lodash.has)(project, 'paths.deskIndexFilePath')) {
        throw Error('Wrong project configuration. "deskIndexFilePath" field is missing.');
    }

    var ast = _structorCommons.commons.parse(project.sources['deskIndexFile']);

    return {
        outputFilePath: project.paths.deskIndexFilePath,
        sourceCode: injectComponent(ast, groupName, componentName)
    };
}