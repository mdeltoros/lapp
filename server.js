require('dotenv').config();
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const webpackDevMiddleware = require('webpack-dev-middleware');
//const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

//const importDataController = require('./api/controllers/tournamentImport');

const app = express();
const cors = require('cors');
const compiler = webpack(webpackConfig);

app.use(cors());

app.use(webpackDevMiddleware(compiler, {
    noInfo: true, 
    publicPath: webpackConfig.output.publicPath, 
    historyApiFallback: true
}));
//app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use('/api', importDataController);


app.get('*', (req, res) => {                       
    res.sendFile(path.resolve(__dirname, './index.html'));                           
});

app.use(express.static(path.join(__dirname, 'client/dist')))
  
app.set('port', process.env.PORT || 9002);
const server =  app.listen(app.get('port'),() => console.log('Express CORS-enabled web server listening on port '+ server.address().port));