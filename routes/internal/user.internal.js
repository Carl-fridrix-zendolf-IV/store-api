module.exports = (app, routes) => {
    app.post('/api/internal/v1/user/auth', routes.services.internal.user.auth);

    app.get('/api/internal/v1/user/list', routes.services.internal.user.list);
};