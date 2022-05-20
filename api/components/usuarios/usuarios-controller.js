const {nanoid} = require('nanoid');
const auth = require('../auth');

const TABLA = 'usuarios'



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
        const usuario = {
            nombre: body.nombre,
            apellido: body.apellido,
            cedula: body.cedula,
            sexo: body.sexo,
            departamento_id:body.departamento_id,
            equipo_id: body.equipo_id,
            cargo_id: body.cargo_id,
            
        }

        if(body.id){
            usuario.id = body.id
            return injectedStore.upsert(TABLA, user)
        }
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
    async function info(id) {
        //    to,     from
        const join = {departamentos: ['departamento_id','id'], cargos: ['cargo_id','id']}
        /* join[TABLA] = ['id', equipo]; // { user: 'user_to' } */
        const query = id;

    return await injectedStore.query(TABLA, query, join);
}

    return {
        list,
        get,
        upsert,
        usuarioCargo,
        info
    }
    
}

