const fileSystem = require('../utils/file_system');
const decryptToken = require('../middlewares/decrypt_jwt_token');
const debug = require('../utils/debug')
const fs = require('fs')
const path = require('path')
const routers = [];
const routePaths = []

function requireAllRouter(fileName) {
  const requiredFile = './' + fileName;
  if (fileName != 'index') {
    const curRoute = require(requiredFile);
    const path = '/' + fileName;
    routers.push({
      path: path,
      routeProps: curRoute,
    });
    routePaths.push(path);
  }
}
fileSystem.listAllFile(__dirname, '.js', false, requireAllRouter);

debug.logHeader('registered routes')
routers.forEach(route=>{
  route.routeProps.route.stack.forEach(childRoute=>{
    debug.logData(route.path, childRoute.route.path)
  })
})

module.exports = (app) => {
    const packageRaw = fs.readFileSync(path.join(__dirname,'../package.json'));
    const packageJSON = JSON.parse(packageRaw);

    //debug.logData("package",packageJSON)
    /* GET home page. */
    app.get("/", function (req, res, next) {
      // res.status(200).json({
      //   test:"halohalo"
      // });
      res.render("index", {
        title: packageJSON.name,
        env: process.env.NODE_ENV,
        port: process.env.PORT || 3000,
        endPoints: routePaths
    });
  });

  routers.forEach((item, index) => {
    const middlewares = []
    if(item.routeProps.needAuth === true)
    {
      middlewares.push(decryptToken);
    }
    app.use(item.path,middlewares, item.routeProps.route);
  });
};
