const store = require('../../../store/dummy')
const ctrl = require('./user-controller')

//inyectamos el store en el controlador
module.exports = ctrl(store)