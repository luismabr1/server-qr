const express = require('express')
const secure = require('./secure');
const response = require('../../../network/response')
const Controller = require('./index')

const router = express.Router()

// Routes
router.get('/', list)
router.get('/login', get);
router.post('/', upsert);
router.put('/edit', secure('update'), upsert);

/* router.post('/login', (req, res, next) => {
    Controller.login(req.body.username, req.body.password)
        .then(token => {
            response.success(req, res, token, 200)
        })
        .catch(next)
})

router.post('/', (req, res) => {
    Controller.upsert(req.body)
        .then(user => {
            response.success(req, res, user, 200)
        })
        .catch(err => {
            response.error(req, res, 'Informacion invalida', 400)
        })
})

module.exports = router */

// Internal functions
function list(req, res) {
    Controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
    
}

router.post('/login', (req, res, next) => {
    Controller.login(req.body.username, req.body.password)
        .then(token => {
            response.success(req, res, token, 200)
        })
        .catch(next)
})

function get(req, res) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
    
}

function upsert(req, res) {
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
    
}

module.exports = router;