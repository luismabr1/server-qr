const store = require('../../../store/dummy')
const ctrl = require('./auth-controller')

//inyectamos el store en el controlador
module.exports = ctrl(store)