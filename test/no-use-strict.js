var linter = require('eslint').linter,
    ESLintTester = require('eslint-tester'),
    eslintTester = new ESLintTester(linter),
    errorScenarioFactory = require('./error-scenario-factory');

var expectedErrorMessage = 'The statement "use strict" is not required within a program generated by a transpiler.';
var errorScenario = errorScenarioFactory(expectedErrorMessage);

eslintTester.addRuleTest('src/no-use-strict', {
  valid: [
    '',
    '           ',
    'var validVariable = true;',
    '/* comments */',
    'var foo = "use strict";',
    'var foo = function() { return "use strict"; };'
  ],

  invalid: [
    errorScenario('"use strict"'),
    errorScenario('"use strict"; var invalidVariable = true'),
    errorScenario('\'use strict\'; var invalidVariable = true'),
    errorScenario('/* Leading comments */ "use strict"; var invalidVariable = true'),
    errorScenario('(function () { "use strict"; console.log("a"); })()'),
    errorScenario('var foo = function(x) { "use strict"; return x; };')
  ]
});
