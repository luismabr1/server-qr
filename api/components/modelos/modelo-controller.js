const {nanoid} = require('nanoid');
const auth = require('../auth');

const TABLA = 'modelos'



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
        const modelo = {
            nombre: body.nombre,
            marca_id:body.marca_id,
        }

        if(body.id){
            modelo.id = body.id
        }
        let result =  await injectedStore.upsert(TABLA, modelo)
        let modelo_id = result.insertId

        equiposModelos(body.marca_id, modelo_id)

    }

    const remove = (id) => {
        return injectedStore.get(TABLA, id)
    }

    const equiposModelos = (marca, modelo) => {
        return injectedStore.upsert('equipos_' + TABLA, {
            id_marca: marca,
            id_modelo: modelo,
        })
    }

    return {
        list,
        get,
        upsert,
        equiposModelos
    }
    
}

