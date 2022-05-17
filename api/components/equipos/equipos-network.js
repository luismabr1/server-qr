const express = require('express')

const secure =require('./secure')
const response = require('../../../network/response')
const Controller = require('./index')

const router = express.Router()

//Routes
router.get('/', list)
router.get('/info/:id', equipoInfo)
router.get('/:id', get)
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
        .then((equipo) => {
            response.success(req, res, equipo, 200)
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

function equipoInfo(req, res, next){
    Controller.info(req.params.id)
    .then((equipo) => {
        response.success(req, res, equipo, 200)
    })
    .catch(next)
}

function upsert(req, res, next){
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201)
        })
        .catch(next)
}

module.exports = router;