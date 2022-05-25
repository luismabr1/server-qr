const {nanoid} = require('nanoid');
const auth = require('../auth');

let TABLA = 'equipos'



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
        let equipos = await cache.list(TABLA)
        console.log(equipos)

        if(!equipos){
            console.log('No estabe en cache. Buscando en DB')
            equipos = await injectedStore.list(TABLA)
            cache.upsert(TABLA, equipos)
        }else{
            console.log('Nos traemos datos de cache')
        }
        return equipos
    }

    const get = (id) => {
        return injectedStore.get(TABLA, id)
    }
    
    const upsert = async (body) => {
        const equipo = {
            usuario_id: body.usuario_id,
            marca_id: body.marca_id,
            modelo_id: body.modelo_id,
            serial: body.serial,
            tipo_id: body.tipo_id,
            is_active: body.is_active
        }

        if(body.id){
            equipo.id = body.id
        }

        let result =  await injectedStore.upsert(TABLA, equipo)
        let equipo_id = result.insertId
        if(equipo_id){
            equipoModelo(equipo_id, body.modelo_id)
            equipoTipo(equipo_id, body.tipo_id)
            equipoMarca(equipo_id, body.marca_id)
            usuarioEquipo(equipo_id, body.usuario_id)
        }

        }
    

    const remove = (id) => {
        console.log(`remove controller ${id}`)
        return injectedStore.remove(TABLA, id)
    }

    const equipoTipo = (equipo, tipo) => {
        return injectedStore.upsert(TABLA + '_tipos', {
            id_equipo: equipo,
            id_tipo: tipo,
        })
    }

    const equipoMarca = (equipo, marca) => {
        return injectedStore.upsert(TABLA + '_marcas', {
            id_equipo: equipo,
            id_marca: marca,
        })
    }
    const usuarioEquipo = (equipo, usuario) => {
        return injectedStore.upsert(TABLA + '_usuarios', {
            id_usuario: usuario,
            id_equipo: equipo,
        })
    }

    //si envias una variable a esa constante TABLA te dice que no ojo
    const equipoModelo = (equipo, modelo) => {
        return injectedStore.upsert(TABLA + '_modelos', {
            modelo_id: modelo,
            equipo_id: equipo,
        })
    }

    async function info(id) {
                            //    to,     from
        const join = {marcas: ['marca_id','id'], usuarios: ['usuario_id','id']}
        /* join[TABLA] = ['id', equipo]; // { user: 'user_to' } */
        const query = id;


		
		return await injectedStore.queryAll(query);
	}

    return {
        list,
        get,
        upsert,
        remove,
        equipoTipo,
        equipoMarca,
        usuarioEquipo,
        equipoModelo,
        info
    }
}
