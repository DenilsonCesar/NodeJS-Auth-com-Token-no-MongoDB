const express = require('express');
const routes = express.Router();

const ControllerUser = require('../controllers/userAuthRegister');
const ControllerMain = require('../controllers/ControllerDashboard');
const authMiddleware = require('../middleware/auth')

routes.post('/user', ControllerUser.register);
routes.post('/auth', ControllerUser.auth);
routes.get('/main', ControllerMain.main);
routes.get('/', authMiddleware, (req, res) => {
    res.send({ ok: true })
})


module.exports = routes;