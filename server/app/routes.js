var path = require('path');

module.exports = function(app) {
  // =====================
  // API endpoints
  // =====================


  // =====================
  // frontend routes
  // =====================
  app.get('*', function(req, res) {
    res.sendFile(path.resolve('../client/build/index.html'));
  });
}
