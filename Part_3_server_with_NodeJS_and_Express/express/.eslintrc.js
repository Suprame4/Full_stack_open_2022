module.exports = {
    "env": {
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    'rules': {
        '@stylistic/js/indent': [
            'error',
            2
        ],
        '@stylistic/js/semi': [
            'error',
            'never'
        ],
    }
}
