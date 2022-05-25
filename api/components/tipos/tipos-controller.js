const {nanoid} = require('nanoid');
const auth = require('../auth');

const TABLA = 'tipos'



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
        const tipos = {
            nombre: body.nombre,
        }

        if(body.id){
            user.id = body.id
        }

        return injectedStore.upsert(TABLA, tipos)
/* 
        if(body.password || body.username){
            return injectedStore.upsert(TABLA, user)
           
        }else{
            await auth.upsert({
                username: body.username,
                password: body.password
            })
        } */
    }
/* 
    const remove = (id) => {
        return injectedStore.get(TABLA, id)
    } */

    const remove = (id) => {
        console.log(`remove controller ${id}`)
        return injectedStore.remove(TABLA, id)
    }

    return {
        list,
        get,
        upsert,
        remove
        
    }
    
}

