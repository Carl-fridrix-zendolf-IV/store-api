module.exports = (app, routes) => {
    /**
     * @api {post} /api/internal/v1/user/auth Authentication
     * @apiName Authentication admin users
     * @apiGroup Internal
     *
     * @apiParam {String} login User login (email).
     * @apiParam {String} password user password.
     *
     * @apiUse ResponseSuccess
     * @apiSuccess {Object} data Data object
     * @apiSuccess {String} data.auth-token Authentication token.
     * @apiSuccess {String} data._id User ID.
     *
     * @apiUse ResponseError
     */
    app.post('/api/internal/v1/user/auth', routes.services.internal.user.auth);

    /**
     * @api {get} /api/internal/v1/user/list Users list
     * @apiName Active users list
     * @apiGroup Internal
     *
     * @apiParam {String} [skip] Skip users in response
     * @apiParam {String} [limit] Limit response length
     *
     * @apiUse ResponseSuccess
     * @apiSuccess {Object[]} data Data object
     * @apiSuccess {Object} data Data object
     * @apiSuccess {String} data._id User id.
     * @apiSuccess {String} data.phone User phone.
     * @apiSuccess {String} data.email User email.
     * @apiSuccess {Boolean} data.phone_verified Status of user phone verification.
     * @apiSuccess {Boolean} data.professional Is user driver or not.
     * @apiSuccess {Object} data.name Name object
     * @apiSuccess {String} data.name.first User firstname.
     * @apiSuccess {String} data.name.last User lastname.
     * @apiSuccess {Boolean} data.reviewed User reviewed property
     *
     * @apiUse ResponseError
     */
    app.get('/api/internal/v1/user/list', routes.services.internal.user.list);
};