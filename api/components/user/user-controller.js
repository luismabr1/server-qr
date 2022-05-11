const {nanoid} = require('nanoid');
const auth = require('../auth');

const TABLA = 'usuarios'



module.exports = (injectedStore) => {
    if(!injectedStore) injectedStore = require("../../../store/dummy");
    const list = () => {
        return injectedStore.list(TABLA)
    }

    const get = (id) => {
        return injectedStore.get(TABLA, id)
    }
    
    const upsert = async (body) => {
        const user = {
            nombre: body.nombre,
            username:body.username,
            apellido: body.apellido,
            cedula: body.cedula,
            sexo: body.sexo,
            departamento_id:body.departamento_id,
            equipo_id: body.equipo_id,
            cargo_id: body.cargo_id
        }

        if(body.id){
            user.id = body.id
        }

        if(body.password || body.username){
            return injectedStore.upsert(TABLA, user)
           
        }else{
            await auth.upsert({
                username: body.username,
                password: body.password
            })
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

    return {
        list,
        get,
        upsert,
    }
    
}

