const {nanoid} = require('nanoid');
const auth = require('../auth');

const TABLA = 'cargos'



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
        const cargo = {
            nombre: body.nombre,
            departamento_id: body.departamento_id
        }

        if(body.id){
            cargo.id = body.id
        }
        let result =  await injectedStore.upsert(TABLA, cargo)
        let cargo_id = result.insertId

        DepartamentoCargos(body.departamento_id, cargo_id)

    }

    const remove = (id) => {
        return injectedStore.get(TABLA, id)
    }

    const DepartamentoCargos = (departamento, cargo) => {
        return injectedStore.upsert('departamentos_' + TABLA, {
            departamento_id: departamento,
            cargo_id: cargo,
        })
    }

    return {
        list,
        get,
        upsert,
        DepartamentoCargos
    }
    
}

