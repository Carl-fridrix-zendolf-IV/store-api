module.exports = (app, routes) => {
    /**
     * @api {get} /api/public/v0/store/categories Get categories list [DEPRECATED]
     * @apiName Categories list [DEPRECATED]
     * @apiGroup Store
     *
     * @apiHeader {String} Authorization User authorization token.
     *
     * @apiParam {String} [page] Filter by page.
     * @apiParam {String} [page_limit] Maximum elements by page (Default - 10, Max: 50).
     *
     * @apiUse ResponseSuccess
     * @apiSuccess {String} total Total count of category items.
     * @apiSuccess {Object} data Data object
     * @apiSuccess {String} data._id Category id.
     * @apiSuccess {String} data.name Category name.
     *
     * @apiUse ResponseError
     */
    app.get('/api/public/v0/store/categories', routes.views.api.categories);

    /**
     * @api {get} /api/public/v0/store/skills Get skills list
     * @apiName Skills list
     * @apiGroup Store
     *
     * @apiHeader {String} Authorization User authorization token.
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
    app.get('/api/public/v0/store/skills', routes.views.api.products);
};