var Encore = require('@symfony/webpack-encore');

Encore
// directory where all compiled assets will be stored
	.setOutputPath('public/build/')
	// what's the public path to this directory (relative to your project's document root dir)
	.setPublicPath('/build')
	// empty the outputPath dir before each build
	.cleanupOutputBeforeBuild()
	// will output as web/build/app.js
	.addEntry('app', ['babel-polyfill', './assets/js/entryPoint.js'])
	// will output as web/build/app.css
	.addStyleEntry('css/main', './assets/sass/main.scss')
	.addStyleEntry('css/login', './assets/sass/login.scss')
	// allow sass/scss files to be processed
	.enableSassLoader()
	// allow legacy applications to use $/jQuery as a global variable
	.autoProvidejQuery()
	// create hashed filenames (e.g. app.abc123.css)
	.enableVersioning(Encore.isProduction())
	.enableSourceMaps(!Encore.isProduction());

// export the final configuration
module.exports = Encore.getWebpackConfig();
