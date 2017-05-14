module.exports = (app, routes) => {
    /**
     * @api {get} /api/public/v0/orders/payments Get Payment types
     * @apiName Payment types
     * @apiGroup Orders
     *
     * @apiHeader {String} Authorization User authorization token.
     *
     * @apiUse ResponseSuccess
     * @apiSuccess {Object[]} data Data object
     * @apiSuccess {String} data._id Payment ID.
     * @apiSuccess {String} data.name Payment name.
     * @apiSuccess {Number} data.number Payment number.
     *
     * @apiUse ResponseError
     */
    app.get('/api/public/v0/orders/payments', routes.views.api.paymentsTypes);

    /**
     * @api {get} /api/public/v0/orders/statuses Get statuses list
     * @apiName Statuses list
     * @apiGroup Orders
     *
     * @apiHeader {String} Authorization User authorization token.
     *
     * @apiUse ResponseSuccess
     * @apiSuccess {Object[]} data Data object
     * @apiSuccess {String} data._id Status ID.
     * @apiSuccess {String} data.name Status name.
     * @apiSuccess {Number} data.number Status number.
     *
     * @apiUse ResponseError
     */
    app.get('/api/public/v0/orders/statuses', routes.views.api.statusTypes);

    /**
     * @api {get} /api/public/v0/orders/history Get orders history
     * @apiName Orders history
     * @apiDescription This method filtering orders list for customers and professional automatically. If request from customer you will get all your orders history. If request from professional you will get all your orders history and all orders with status "Active".
     * @apiGroup Orders
     *
     * @apiHeader {String} Authorization User authorization token.
     *
     * @apiParam {String} limit Limit array length.
     * @apiParam {String} skip Skip objects.
     *
     * @apiUse ResponseSuccess
     * @apiUse OrdersListSucces
     *
     * @apiUse ResponseError
     */
    /**
     * @api {get} /api/public/v0/orders/active Get active orders
     * @apiName Active orders
     * @apiDescription This method filtering orders list for customers and professional automatically. If request from customer you will get all your orders history. If request from professional you will get all your orders history and all orders with status "Active".
     * @apiGroup Orders
     *
     * @apiHeader {String} Authorization User authorization token.
     *
     * @apiParam {String} limit Limit array length.
     * @apiParam {String} skip Skip objects.
     *
     * @apiUse ResponseSuccess
     * @apiUse OrdersListSucces
     *
     * @apiUse ResponseError
     */
    /**
     * @api {get} /api/public/v0/orders/pending Get pending orders
     * @apiName Pending orders
     * @apiDescription This method filtering orders list for customers and professional automatically. If request from customer you will get all your orders history. If request from professional you will get all your orders history and all orders with status "Active".
     * @apiGroup Orders
     *
     * @apiHeader {String} Authorization User authorization token.
     *
     * @apiParam {String} limit Limit array length.
     * @apiParam {String} skip Skip objects.
     *
     * @apiUse ResponseSuccess
     * @apiUse OrdersListSucces
     *
     * @apiUse ResponseError
     */
    app.get('/api/public/v0/orders/:status', routes.views.api.ordersList);

    /**
     * @api {get} /api/public/v0/orders/by/:id Get order by id
     * @apiName Order by ID
     *
     * @apiGroup Orders
     *
     * @apiHeader {String} Authorization User authorization token.
     *
     * @apiUse ResponseSuccess
     * @apiUse OrdersListSucces
     *
     * @apiUse ResponseError
     */
    app.get('/api/public/v0/orders/by/:id', routes.views.api.ordersList);

    /**
     * @api {put} /api/public/v0/orders/create Create order
     * @apiName Create order
     * @apiGroup Orders
     *
     * @apiHeader {String} Authorization User authorization token.
     *
     * @apiParam {String[]} skills List of skill ids.
     * @apiParam {Object} addr Delivery address.
     * @apiParam {String} addr.country Country.
     * @apiParam {Number[]} addr.geo Delivery longitude and latitude.
     * @apiParam {String} addr.name Building Name.
     * @apiParam {String} addr.number PO Box / Shop
     * @apiParam {String} addr.postcode Postcode
     * @apiParam {String} addr.state State
     * @apiParam {String} addr.street1 Street Address
     * @apiParam {String} addr.street2 Street Address 2
     * @apiParam {String} addr.suburb Suburb
     * @apiParam {String} payment_type Payment type ID
     * @apiParam {String} note Order note
     * @apiParam {String[]} languages List of language id's
     * @apiParam {String[]} grades List of grade id's
     * @apiParam {Number} duration Order duration
     * @apiParam {Number{1..}} quantity Number of copy orders
     *
     * @apiUse ResponseSuccess
     * @apiSuccess {Object} data Data object
     * @apiSuccess {String} data._id Order id.
     *
     * @apiUse ResponseError
     */
    app.put('/api/public/v0/orders/create', routes.views.api.createOrder);

    /**
     * @api {patch} /api/public/v0/orders/status/:order_id/active Change order status to active
     * @apiName Status to active
     * @apiGroup Orders
     *
     * @apiHeader {String} Authorization User authorization token.
     *
     * @apiUse ResponseSuccess
     *
     * @apiUse ResponseError
     */
    /**
     * @api {patch} /api/public/v0/orders/status/:order_id/pending Change order status to pending
     * @apiName Status to pending
     * @apiGroup Orders
     *
     * @apiHeader {String} Authorization User authorization token.
     *
     * @apiUse ResponseSuccess
     *
     * @apiUse ResponseError
     */
    /**
     * @api {patch} /api/public/v0/orders/status/:order_id/reject Change order status to reject
     * @apiName Status to reject
     * @apiGroup Orders
     *
     * @apiHeader {String} Authorization User authorization token.
     *
     * @apiUse ResponseSuccess
     *
     * @apiUse ResponseError
     */
    /**
     * @api {patch} /api/public/v0/orders/status/:order_id/cancel Change order status to cancel
     * @apiName Status to cancel
     * @apiGroup Orders
     *
     * @apiHeader {String} Authorization User authorization token.
     *
     * @apiUse ResponseSuccess
     *
     * @apiUse ResponseError
     */
    /**
     * @api {patch} /api/public/v0/orders/status/:order_id/complete Change order status to complete
     * @apiName Status to complete
     * @apiGroup Orders
     *
     * @apiHeader {String} Authorization User authorization token.
     *
     * @apiUse ResponseSuccess
     *
     * @apiUse ResponseError
     */
    app.patch('/api/public/v0/orders/status/:order_id/:status', routes.views.api.changeStatus);

    /**
     * @api {patch} /api/public/v0/orders/route/:order_id Change order route
     * @apiName Change order route
     * @apiGroup Orders
     *
     * @apiHeader {String} Authorization User authorization token.
     * @apiParam {Object[]} route User route string
     *
     * @apiUse ResponseSuccess
     *
     * @apiUse ResponseError
     */
    app.patch('/api/public/v0/orders/route/:order_id', routes.views.api.routeChange);
};