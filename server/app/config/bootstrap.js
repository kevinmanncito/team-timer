module.exports = function (env) {

  var config = {};

  /******************************************
           Bootstraped data config
   ******************************************/

  config.api_version = 'v0.1';

  // WARNING:  Anything put into client is visible in the browser
  // ONLY ADD STUFF HERE YOU WANT EVERYONE TO SEE!!!
  config.client = {};



  /******************************************
     Put Environment Specific Settings Here
   ******************************************/

  if (typeof env == 'undefined') {
    env = process.env.ENV_STATE;
  }

  switch(env) {
    case 'production':
      config.client.staticRoot = '/static/';
      config.staticWeb = '/static/';
      config.appDir = 'build/';
    break;
    case 'development':
      config.client.staticRoot = '/static/';
      config.staticWeb = '/static/';
      config.appDir = 'build/';
    break;
  }

  return config;
}
