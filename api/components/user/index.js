//const store = require('../../../store/mysql')
const store = require('../../../store/remote-mysql')
const ctrl = require('./user-controller')

//inyectamos el store en el controlador
module.exports = ctrl(store)