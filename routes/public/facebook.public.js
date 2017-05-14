module.exports = (app, routes) => {
    /**
     * @api {post} /api/public/v0/facebook/auth Auth new user with Facebook ID
     * @apiName Facebook authentication
     * @apiGroup Common
     *
     * @apiParam {String} token Facebook access token.
     *
     * @apiUse ResponseSuccess
     * @apiSuccess {Object} data Data object
     * @apiSuccess {String} data._id User ID.
     * @apiSuccess {String} data.auth-token Authentication token.
     * @apiSuccess {Boolean} data.phone_verified Authentication token.
     *
     * @apiUse ResponseError
     */
    app.post('/api/public/v0/facebook/auth', routes.views.api.facebookAuth);

    /**
     * @api {post} /api/public/v0/facebook/registration Registrate new user with Facebook ID
     * @apiName Facebook registration
     * @apiGroup Common
     *
     * @apiParam {String} token Facebook access token.
     * @apiParam {Boolean} professional User professional property.
     *
     * @apiUse ResponseSuccess
     * @apiSuccess {Object} data Data object
     * @apiSuccess {String} data._id User ID.
     * @apiSuccess {String} data.auth-token Authentication token.
     *
     * @apiUse ResponseError
     */
    app.post('/api/public/v0/facebook/registration', routes.views.api.facebookRegistration);
};