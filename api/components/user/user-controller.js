const {nanoid} = require('nanoid');
const auth = require('../auth');

const TABLA = 'user'



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
            name: body.name,
            username: body.username,
        }

        if(body.id){
            user.id = body.id
        }else {
            user.id = nanoid()
        }

        if(body.password || body.username){
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password
            })
        }
        return injectedStore.upsert(TABLA, user)
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

