module.exports = app => {
  const controller = require('./controller');

  /**
   * Rute bi normalno izgledale /api/v<version>/<route>
   * Za potrebe zadatka bih rekao da je ovako OK
   */

  app
    .route('/me')
    .get(controller.getAddress);

  app
    .route('/balance/:address?')
    .get(controller.getBalance);

  app
    .route('/create-account')
    // ne saljem nikakve podatke u requestu, nema potrebe za POST
    .get(controller.createAccount);

  app
    .route('/set-address/:newAddress?')
    .get(controller.editAddress);
};
