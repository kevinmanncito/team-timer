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
      config.client.api_root = '//hubapi.thegameagency.com/rest/' + config.api_version + '/';
      config.client.campaign_set = 2;
      config.client.campaign = 4; // This instance will support CAMPAIGN 4
      config.client.asset_root = '//d1cr3zfg2alap4.cloudfront.net/assets/'; // CDN URL
      config.client.static_root = '//d25k359g16uk7n.cloudfront.net/static/';
      config.client.ga = {
        id: 'UA-50564233-1',
        cookieDomain: 'businesportfolio.intel.com',
        cookieName: 'cte',
        cookieExpires: 20000
      };
      config.port = 8002;
      config.static_web = '/static/';
      config.app_dir = 'bin/';
    break;
    case 'development':
      config.client.urlRoot = 'http://localhost:3000',
      config.client.staticRoot = '/static/';
      config.staticWeb = '/static/';
      config.appDir = 'build/';
    break;
  }

  return config;
}
