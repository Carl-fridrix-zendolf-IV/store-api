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
}