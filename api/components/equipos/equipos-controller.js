const {nanoid} = require('nanoid');
const auth = require('../auth');

let TABLA = 'equipos'



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
        const equipo = {
            usuario_id: body.usuario_id,
            marca_id:body.marca_id,
            modelo_id: body.modelo_id,
            serial: body.serial,
            tipo_id: body.tipo_id,
        }

        if(body.id){
            equipo.id = body.id
        }

        let result =  await injectedStore.upsert(TABLA, equipo)
        let equipo_id = result.insertId

        equipoTipo(equipo_id, body.tipo_id)
        equipoMarca(equipo_id, body.marca_id)
        usuarioEquipo(equipo_id, body.usuario_id)
        equipoModelo(equipo_id, body.modelo_id)

        }
    

    const remove = (id) => {
        return injectedStore.get(TABLA, id)
    }

    const equipoTipo = (equipo, tipo) => {
        return injectedStore.upsert(TABLA + '_tipos', {
            id_equipo: equipo,
            id_tipo: tipo,
        })
    }

    const equipoMarca = (equipo, marca) => {
        injectedStore.upsert(TABLA + '_marcas', {
            id_equipo: equipo,
            id_marca: marca,
        })
    }
    const usuarioEquipo= (equipo, usuario) => {
        injectedStore.upsert(TABLA + '_usuarios', {
            id_usuario: usuario,
            id_equipo: equipo,
        })
    }

    const equipoModelo = (equipo, modelo) =>{
        //si envias una variable a esa constante TABLA te dice que no ojo
        injectedStore.upsert(TABLA = 'equipos_modelos', {
            modelo_id: modelo,
            equipo_id: equipo,
        })
    }

    return {
        list,
        get,
        upsert,
        equipoTipo,
        equipoMarca,
        usuarioEquipo,
        equipoModelo
    }
}
