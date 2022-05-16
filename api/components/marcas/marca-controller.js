const {nanoid} = require('nanoid');
const auth = require('../auth');

const TABLA = 'marcas'



module.exports = (injectedStore) => {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }
    const list = () => {
        return injectedStore.list(TABLA)
    }

    const get = (id) => {
        return injectedStore.get(TABLA, id)
    }
    
    const upsert = async (body) => {
        const marca = {
            nombre: body.nombre,
        }

        if(body.id){
            user.id = body.id
        }

        return injectedStore.upsert(TABLA, marca)


    }

    const remove = (id) => {
        return injectedStore.get(TABLA, id)
    }

    return {
        list,
        get,
        upsert,
    }
    
}

