const {nanoid} = require('nanoid');
const auth = require('../auth');

const TABLA = 'departamentos'



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
        const departamento = {
            nombre: body.nombre,
        }

        if(body.id){
            departamento.id = body.id
        }

        return injectedStore.upsert(TABLA, departamento)

    }

    const remove = (id) => {
        return injectedStore.get(TABLA, id)
    }

    const usuarioCargo = (usuario, cargo) => {
        return injectedStore.upsert(TABLA + '_cargos', {
            id_usuario: usuario,
            id_cargo: cargo,
        })
    }

    return {
        list,
        get,
        upsert,
        usuarioCargo
    }
    
}

