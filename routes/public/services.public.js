module.exports = (app, routes) => {
    /**
     * @api {get} /api/public/v0/services/grades Get grades list
     * @apiName Grades list
     * @apiGroup Services
     *
     * @apiUse ResponseSuccess
     * @apiSuccess {Object[]} data Data object
     * @apiSuccess {String} data._id Grade ID.
     * @apiSuccess {String} data.name Grade name.
     * @apiSuccess {Number} data.price Grader price.
     * @apiSuccess {Number} data.index Grader index.
     *
     * @apiUse ResponseError
     */
    app.get('/api/public/v0/services/grades', routes.views.api.gradesList);

    /**
     * @api {get} /api/public/v0/services/languages Get languages list
     * @apiName Languages list
     * @apiGroup Services
     *
     * @apiUse ResponseSuccess
     * @apiSuccess {Object[]} data Data object
     * @apiSuccess {String} data._id Grade ID.
     * @apiSuccess {String} data.name Grade name.
     * @apiSuccess {Number} data.index Grader index.
     *
     * @apiUse ResponseError
     */
    app.get('/api/public/v0/services/languages', routes.views.api.languagesList);

    /**
     * @api {get} /api/public/v0/services/skills Get skills list
     * @apiName Skills list
     * @apiGroup Services
     *
     * @apiParam {String} [skip] Filter for skiping elements.
     * @apiParam {String} [limit] Filter for limiting data array (Default: 999999).
     *
     * @apiUse ResponseSuccess
     * @apiSuccess {String} total Total count of products.
     * @apiSuccess {Object} data Data object
     * @apiSuccess {String} data._id Category id.
     * @apiSuccess {String} data.name Product name.
     * @apiSuccess {String} data.price Product price.
     * @apiSuccess {String} data.description Product description.
     * @apiSuccess {String} data.image Link to product image.
     * @apiSuccess {String} data.icon Link to product icon.
     *
     * @apiUse ResponseError
     */
    app.get('/api/public/v0/services/skills', routes.views.api.products);
};