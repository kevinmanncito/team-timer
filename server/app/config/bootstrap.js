module.exports = function (env) {

  var config = {};

  /******************************************
           Bootstrapped data config
   ******************************************/

  // WARNING:  Anything put into client is visible in the browser
  // ONLY ADD STUFF HERE YOU WANT EVERYONE TO SEE!!!
  config.client = {};


  // Default to the dev settings so I don't have to type
  // --env_state=dev every single time
  config.client.urlRoot = 'http://localhost:3000',
  config.client.staticRoot = '/static/';
  config.client.assetRoot = '/static/assets/';
  config.staticWeb = '/static/';
  config.appDir = 'build/';


  /******************************************
     Put Environment Specific Settings Here
   ******************************************/

  if (typeof env == 'undefined') {
    env = process.env.ENV;
  }

  switch(env) {
    case 'prod':
      config.client.urlRoot = 'http://groupwatch.pw',
      config.client.staticRoot = '/static/';
      config.client.assetRoot = '/static/assets/';
      config.staticWeb = '/static/';
      config.appDir = 'build/';
    break;
    case 'dev':
      config.client.urlRoot = 'http://localhost:3000',
      config.client.staticRoot = '/static/';
      config.client.assetRoot = '/static/assets/';
      config.staticWeb = '/static/';
      config.appDir = 'build/';
    break;
  }

  return config;
}
