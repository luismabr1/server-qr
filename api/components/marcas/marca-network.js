const express = require('express')

const secure =require('./secure')
const response = require('../../../network/response')
const Controller = require('./index')

const router = express.Router()

//Routes
router.get('/', list)
router.post('/create/:id', create)
router.get('/:id', get)
router.post('/remove/:id', remove)
router.post('/', upsert)
router.put('/', secure('update'), upsert)

//Internal Functions
function list(req, res, next) {
    Controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200)
        })
        .catch(next)
}

function get(req, res, next){
    //IMPORTANTE ES PARAM'S'
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

function remove(req, res, next) {
    console.log(`estoy en remove network ${req.params.id}`)
    Controller.remove(req.params.id)
        .then((equipo) => {
            response.success(req, res, equipo, 200);
        })
        .catch(next)
    
}

function upsert(req, res, next) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}
function create(req, res, next){
    Controller.usuarioCargo(req.user.id, req.params.id)
    .then(data => {
        response.success(req, res, data, 201);
    })
    .catch(next);
}

function upsert(req, res, next){
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201)
        })
        .catch(next)
}

module.exports = router;