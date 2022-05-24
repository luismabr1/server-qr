const bcrypt = require('bcrypt')
const {nanoid} = require('nanoid');
const auth = require('../../../auth')
const TABLA = 'auth'

module.exports = (injectedStore) => {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }
    const list = () => {
        return injectedStore.list(TABLA)
    }

    async function login(username, password) {
        const data = await injectedStore.queryLogin(TABLA, { username: username })
         console.log(data.id) 
        return bcrypt.compare(password, data.password)
        .then(sonIguales=>{
            if(sonIguales === true){
                //generar token
                return auth.sign(data)
            }else{
                throw new Error('Informacion invalida en login')
            }
        })
    }
  async function upsert(data){
      console.log(`estoy en auth ${data.is_active}`)

        const authData = {
            id_usuario: data.id_usuario
        }

        if(data.id){
            authData.id = data.id
        }else{
            authData.id = nanoid()
        }

        if(data.username){
            authData.username = data.username
        }
        if(data.password){
            authData.password = await bcrypt.hash(data.password, 5)
        }
        console.log(authData)
        if(data.is_active){
        return injectedStore.upsert(TABLA, data)
        } 
        return injectedStore.upsert(TABLA, authData)
    }
  
    return {
        list,
        upsert,
        login,
    }
    
}
