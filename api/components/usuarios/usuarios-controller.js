const {nanoid} = require('nanoid');
const auth = require('../auth');

const TABLA = 'usuarios'



module.exports = (injectedStore, injectedCache) => {
    let store = injectedStore;
    let cache = injectedCache;
    if (!store) {
        store = require('../../../store/dummy');
    }
    else if (!cache) {
        cache = require('../../../store/mysql');
    }
    const list = async () => {
        let usuarios = await cache.list(TABLA)
        console.log(usuarios)

        if(!usuarios){
            console.log('No estabe en cache. Buscando en DB')
            usuarios = await injectedStore.list(TABLA)
            cache.upsert(TABLA, usuarios)
        }else{
            console.log('Nos traemos datos de cache')
        }
        return usuarios
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
        if (body.is_active) {
            const result = injectedStore.upsert(TABLA, {
                id:body.id,
                nombre: body.nombre,
                apellido: body.apellido,
                cedula: body.cedula,
                sexo: body.sexo,
                departamento_id:body.departamento_id,
                equipo_id: body.equipo_id,
                cargo_id: body.cargo_id,
                is_active:body.is_active
                })

                let usuario_id = result.insertId
                usuarioCargo(usuario_id, body.cargo_id)
                usuarioDepartamento(usuario_id, body.departamento_id)
                usuarioEquipo(usuario_id, body.equipo_id)

        }else{
            let result = await injectedStore.upsert(TABLA, usuario)
            let usuario_id = result.insertId
            usuarioCargo(usuario_id, body.cargo_id)
            usuarioDepartamento(usuario_id, body.departamento_id)
            usuarioEquipo(usuario_id, body.equipo_id)
        }


        }


    

    const remove = (id) => {
        return injectedStore.get(TABLA, id)
    }

    const usuarioCargo = (usuario, cargo) => {
        injectedStore.upsert(TABLA + '_cargos', {
            id_usuario: usuario,
            id_cargo: cargo,
        })
    }
    
    const usuarioDepartamento = (usuario, departamento) => {
        injectedStore.upsert(TABLA + '_departamentos', {
            id_usuario: usuario,
            id_departamento: departamento,
        })
    }
    
    const usuarioEquipo = (usuario, equipo) => {
        injectedStore.upsert('equipos_' + TABLA, {
            id_usuario: usuario,
            id_equipo: equipo,
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

