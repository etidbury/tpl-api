require('dotenv').config()

module.exports = {
    'apps': [
        {
            'script': './index.js',
            'name': require('./package').name,
            'watch': [
                './routes'
            ],
            'env': {
                'NODE_ENV': 'development',
                // 'LOG_LEVEL': 'warn'
            },
            'node_args': '-r dotenv/config'
            // 'interpreter': './node_modules/.bin/babel-node'
        }
        // {
        // 	'script': '*',
        // 	'name': 'test-watch',
        // 	'env': {
        // 		'CLIENT_BASE_URL':CLIENT_BASE_URL
        // 	},
        // 	'node_args':'--config jest.config.js -i --no-cache --watch',
        // 	'interpreter': './node_modules/.bin/jest'
        // },
    ]
}