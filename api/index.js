const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')


const swaggerUI = require('swagger-ui-express')

const config =require('../config.js')
const user = require('./components/user/user-network')
const auth = require('./components/auth/auth-network')
const equipos = require('./components/equipos/equipos-network')
const cargos = require('./components/cargos/cargos-network')
const departamentos = require('./components/departamentos/departamento-network')
const marcas = require('./components/marcas/marca-network')
const modelos = require('./components/modelos/modelo-network')
const registros = require('./components/registros/registros-network')
const tipos = require('./components/tipos/tipos-network')

const errors = require('../network/errors')

const app= express()
app.use(cors())
app.use(bodyParser.json())


const swaggerDoc = require('./swagger.json')

//router
app.use('/api/user', user)
app.use('/api/equipos', equipos)
app.use('/api/registros', registros)
app.use('/api/cargos', cargos)
app.use('/api/departamentos', departamentos)
app.use('/api/marcas', marcas)
app.use('/api/modelos', modelos)
app.use('/api/tipos', tipos)
app.use('/api/auth', auth)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

app.use(errors)

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port)
})