const restrictedModules = [
    'assert',
    'buffer',
    'child_process',
    'cluster',
    'crypto',
    'dgram',
    'dns',
    'domain',
    'freelist',
    'module',
    'net',
    'os',
    'punycode',
    'readline',
    'repl',
    'smalloc',
    'stream',
    'string_decoder',
    'sys',
    'timers',
    'tls',
    'tracing',
    'tty',
    'vm',
    'zlib'
];

module.exports = {
    'env': {
        'es6': true,
        'node': true
    },
    'rules': {
        // Possible Errors
        'no-cond-assign': ['error', 'except-parens'],
        'no-console': ['error', {
            'allow': ['warn', 'error']
        }],
        'no-constant-condition': ['error', {'checkLoops': false}],
        'no-control-regex': 'error',
        'no-debugger': 'error',
        'no-dupe-args': 'error',
        'no-dupe-keys': 'error',
        'no-duplicate-case': 'error',
        'no-empty-character-class': 'error',
        'no-empty': ['error', {'allowEmptyCatch': false}],
        'no-ex-assign': 'error',
        'no-extra-boolean-cast': 'error',
        'no-extra-parens': ['error', 'all', {
            'conditionalAssign': false,
            'returnAssign': false,
            'nestedBinaryExpressions': true
        }],
        'no-extra-semi': 'error',
        'no-func-assign': 'error',
        'no-inner-declarations': ['error', 'both'],
        'no-invalid-regexp': ['error', {'allowConstructorFlags': []}],
        'no-irregular-whitespace': ['error', {
            'skipStrings': true,
            'skipComments': true,
            'skipRegExps': true,
            'skipTemplates': true
        }],
        'no-negated-in-lhs': 'error',
        'no-obj-calls': 'error',
        'no-prototype-builtins': 'error',
        'no-regex-spaces': 'warn',
        'no-sparse-arrays': 'warn',
        'no-unexpected-multiline': 'error',
        'no-unreachable': 'error',
        'no-unsafe-finally': 'error',
        'use-isnan': 'error',
        'valid-jsdoc': ['warn', {
            'prefer': {
                'arg': 'param',
                'argument': 'param',
                'class': 'constructor',
                'return': 'returns',
                'virtual': 'abstract'
            },
            'preferType': {
                'Boolean': 'boolean',
                'Number': 'number',
                'object': 'Object',
                'String': 'string'
            },
            'requireReturn': true,
            'requireReturnType': true,
            'matchDescription': '.+',
            'requireParamDescription': true,
            'requireReturnDescription': true
        }],
        'valid-typeof': 'error',

        // Best Practices
        'accessor-pairs': ['error', {'setWithoutGet': true, 'getWithoutSet': true}],
        'array-callback-return': 'warn',
        'block-scoped-var': 'error',
        'complexity': ['warn', {'max': 3}],
        'consistent-return': ['error', {'treatUndefinedAsUnspecified': false}],
        'curly': ['error', 'all'],
        'default-case': 'error',
        'dot-location': ['error', 'property'],
        'dot-notation': 'error',
        'eqeqeq': ['error', 'always'],
        'guard-for-in': 'warn',
        'no-alert': 'error',
        'no-caller': 'error',
        'no-case-declarations': 'error',
        'no-div-regex': 'warn',
        'no-else-return': 'error',
        'no-empty-function': ['error', {'allow': []}],
        'no-empty-pattern': 'error',
        'no-eq-null': 'error',
        'no-eval': ['error', {'allowIndirect': false}],
        'no-extend-native': ['error', {'exceptions': []}],
        'no-extra-bind': 'error',
        'no-extra-label': 'warn',
        'no-fallthrough': 'error',
        'no-floating-decimal': 'error',
        'no-implicit-coercion': ['error', {
            'boolean': true,
            'number': true,
            'string': true,
            'allow': []
        }],
        'no-implicit-globals': 'error',
        'no-implied-eval': 'error',
        'no-invalid-this': 'error',
        'no-iterator': 'error',
        'no-labels': ['error', {'allowLoop': true, 'allowSwitch': true}],
        'no-lone-blocks': 'error',
        'no-loop-func': 'error',
        'no-magic-numbers': ['error', {
            'ignore': [0, 1],
            'ignoreArrayIndexes': true,
            'enforceConst': true,
            'detectObjects': true
        }],
        'no-multi-spaces': ['error', {'exceptions': {}}],
        'no-multi-str': 'error',
        'no-native-reassign': ['error', {'exceptions': []}],
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-new': 'error',
        'no-octal-escape': 'error',
        'no-octal': 'error',
        'no-param-reassign': ['error', {'props': false}],
        'no-proto': 'error',
        'no-redeclare': ['error', {'builtinGlobals': true}],
        'no-return-assign': ['error', 'except-parens'],
        'no-script-url': 'error',
        'no-self-assign': 'warn',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-throw-literal': 'error',
        'no-unmodified-loop-condition': 'warn',
        'no-unused-expressions': ['error', {
            'allowShortCircuit': false,
            'allowTernary': false
        }],
        'no-unused-labels': 'warn',
        'no-useless-call': 'error',
        'no-useless-concat': 'error',
        'no-useless-escape': 'error',
        'no-void': 'error',
        'no-warning-comments': ['warn', {
            'terms': ['fix', 'todo', 'fixme', 'research'],
            'location': 'start'
        }],
        'no-with': 'error',
        'radix': ['error', 'always'],
        'vars-on-top': 'error',
        'wrap-iife': ['error', 'inside'],
        'yoda': ['error', 'never', {'exceptRange': true}],

        // Strict Mode
        'strict': ['error', 'global'],

        // Variables
        'init-declarations': ['error', 'never', {'ignoreForLoopInit': true}],
        'no-catch-shadow': 'error',
        'no-delete-var': 'error',
        'no-label-var': 'error',
        'no-restricted-globals': ['error'],
        'no-shadow-restricted-names': 'error',
        'no-shadow': ['error', {
            'builtinGlobals': true,
            'hoist': 'all',
            'allow': ['resolve', 'reject', 'done', 'cb', 'callback']
        }],
        'no-undef-init': 'error',
        'no-undef': ['error', {'typeof': true}],
        'no-undefined': 'error',
        'no-unused-vars': ['error', {
            'vars': 'all',
            'args': 'after-used',
            'caughtErrors': 'all'
        }],
        'no-use-before-define': ['error', {
            'functions': true,
            'classes': true
        }],

        // Node.js and CommonJS
        'callback-return': ['error', [
            'done',
            'callback',
            'cb',
            'success',
            'error'
        ]],
        'global-require': 'error',
        'handle-callback-err': ['error', 'error'],
        'no-mixed-requires': ['error', {'grouping': false, 'allowCall': false}],
        'no-new-require': 'error',
        'no-path-concat': 'error',
        'no-process-env': 'error',
        'no-process-exit': 'error',
        'no-restricted-modules': ['error'].concat(restrictedModules),
        'no-sync': 'error',

        // Stylistic Issues
        'array-bracket-spacing': ['error', 'never'],
        'block-spacing': ['error', 'never'],
        'brace-style': ['error', '1tbs'],
        'camelcase': ['error', {'properties': 'always'}],
        'comma-dangle': ['error', 'never'],
        'comma-spacing': ['error', {'before': false, 'after': true}],
        'comma-style': ['error', 'last'],
        'computed-property-spacing': ['error', 'never'],
        'consistent-this': ['error', 'self'],
        'eol-last': ['error', 'unix'],
        'func-names': ['error', 'never'],
        'func-style': ['error', 'declaration', {'allowArrowFunctions': true}],
        'id-length': ['error', {
            'min': 3,
            'properties': 'always',
            'exceptions': ['_', '$', 'i', 'rp']
        }],
        'indent': ['warn', 4, {
            'SwitchCase': 1,
            'VariableDeclarator': 1
        }],
        'jsx-quotes': ['error', 'prefer-double'],
        'key-spacing': ['error', {
            'beforeColon': false,
            'afterColon': true,
            'mode': 'strict'
        }],
        'keyword-spacing': ['error', {
            'before': true,
            'after': true
        }],
        'linebreak-style': ['error', 'unix'],
        'lines-around-comment': ['error', {
            'beforeBlockComment': true,
            'afterBlockComment': false,
            'beforeLineComment': true,
            'afterLineComment': false,
            'allowBlockStart': true,
            'allowBlockEnd': false,
            'allowObjectStart': true,
            'allowObjectEnd': false,
            'allowArrayStart': true,
            'allowArrayEnd': false
        }],
        'max-depth': ['error', {'max': 3}],
        'max-len': ['warn', {
            'code': 80,
            'tabWidth': 4,
            'ignoreComments': false,
            'ignoreTrailingComments': false,
            'ignoreUrls': true
        }],
        'max-lines': ['warn', {
            'max': 300,
            'skipBlankLines': true,
            'skipComments': true
        }],
        'max-nested-callbacks': ['error', {'max': 3}],
        'max-params': ['warn', {'max': 5}],
        'max-statements-per-line': ['error', {'max': 1}],
        'max-statements': ['warn', {'max': 10}],
        'new-cap': ['error', {
            'newIsCap': true,
            'capIsNew': true,
            'newIsCapExceptions': [],
            'capIsNewExceptions': [],
            'properties': true
        }],
        'new-parens': 'error',
        'newline-after-var': ['error', 'always'],
        'newline-before-return': 'error',
        'newline-per-chained-call': ['error', {'ignoreChainWithDepth': 2}],
        'no-array-constructor': 'error',
        'no-bitwise': 'error',
        'no-continue': 'error',
        'no-inline-comments': 'error',
        'no-lonely-if': 'error',
        'no-mixed-operators': ['error', {
            'groups': [
                ['+', '-', '*', '/', '%', '**'],
                ['&', '|', '^', '~', '<<', '>>', '>>>'],
                ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
                ['&&', '||'],
                ['in', 'instanceof']
            ],
            'allowSamePrecedence': true
        }],
        'no-mixed-spaces-and-tabs': 'error',
        'no-multiple-empty-lines': ['error', {
            'max': 1,
            'maxBOF': 1,
            'maxEOF': 1
        }],
        'no-negated-condition': 'error',
        'no-nested-ternary': 'error',
        'no-new-object': 'error',
        'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
        'no-restricted-syntax': ['error', 'FunctionExpression', 'WithStatement'],
        'no-spaced-func': 'error',
        'no-tabs': 'error',
        'no-ternary': 'warn',
        'no-trailing-spaces': ['error', {'skipBlankLines': false}],
        'no-underscore-dangle': ['error', {
            'allowAfterThis': true,
            'allowAfterSuper': true
        }],
        'no-unneeded-ternary': ['error', {'defaultAssignment': true}],
        'no-whitespace-before-property': 'error',
        'object-curly-newline': ['error', {'multiline': true}],
        'object-curly-spacing': ['error', 'never'],
        'object-property-newline': 'error',
        'one-var-declaration-per-line': ['error', 'always'],
        'one-var': ['warn', {
            'var': 'always',
            'let': 'never',
            'const': 'never'
        }],
        'operator-assignment': ['error', 'always'],
        'operator-linebreak': ['error', 'before', {
            'overrides': {
                '?': 'after',
                ':': 'after'
            }
        }],
        'padded-blocks': ['error', 'never'],
        'quote-props': ['error', 'always'],
        'quotes': ['error', 'single', {
            'avoidEscape': true,
            'allowTemplateLiterals': false
        }],
        'require-jsdoc': ['warn', {
            'require': {
                'FunctionDeclaration': true,
                'MethodDefinition': true,
                'ClassDeclaration': true
            }
        }],
        'semi-spacing': ['error', {'before': false, 'after': true}],
        'semi': ['error', 'always'],
        'sort-vars': ['warn', {'ignoreCase': true}],
        'space-before-blocks': ['error', 'always'],
        'space-before-function-paren': ['error', 'never'],
        'space-in-parens': ['error', 'never'],
        'space-infix-ops': 'error',
        'space-unary-ops': ['error', {
            'words': true,
            'nonwords': false
        }],
        'spaced-comment': ['error', 'always', {
            'line': {
                'markers': ['/'],
                'exceptions': ['-', '+']
            },
            'block': {
                'markers': ['!'],
                'exceptions': ['*'],
                'balanced': true
            }
        }],
        'unicode-bom': ['error', 'never'],
        'wrap-regex': 'error',

        // ECMAScript 6
        'arrow-body-style': ['error', 'always'],
        'arrow-parens': ['error', 'always'],
        'arrow-spacing': ['error', {'before': true, 'after': true}],
        'constructor-super': 'error',
        'generator-star-spacing': ['error', {'before': true, 'after': false}],
        'no-class-assign': 'error',
        'no-confusing-arrow': ['error', {'allowParens': false}],
        'no-const-assign': 'error',
        'no-dupe-class-members': 'error',
        'no-duplicate-imports': ['error', {'includeExports': true}],
        'no-new-symbol': 'error',
        'no-restricted-imports': ['error'].concat(restrictedModules),
        'no-this-before-super': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-constructor': 'warn',
        'no-useless-rename': ['error', {
            'ignoreDestructuring': false,
            'ignoreImport': false,
            'ignoreExport': false
        }],
        'no-var': 'error',
        'object-shorthand': ['error', 'always'],
        'prefer-arrow-callback': ['error', {
            'allowNamedFunctions': false,
            'allowUnboundThis': false
        }],
        'prefer-const': ['error', {
            'destructuring': 'any',
            'ignoreReadBeforeAssign': false
        }],
        'prefer-reflect': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'require-yield': 'error',
        'rest-spread-spacing': ['error', 'never'],
        'sort-imports': ['error', {
            'ignoreCase': false,
            'ignoreMemberSort': false,
            'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single']
        }],
        'template-curly-spacing': ['error', 'always'],
        'yield-star-spacing': ['error', 'before']
    }
};
