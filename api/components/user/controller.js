const store = require('../../../store/dummy')

const TABLA = 'user'

const list = () => {
    return store.list(TABLA)
}


module.exports = {
    list,
}