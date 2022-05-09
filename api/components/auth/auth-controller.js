const bcrypt = require('bcrypt')
const auth = require('../../../auth')
const TABLA = 'auth'

module.exports = (injectedStore) => {
    if(!injectedStore) injectedStore = require("../../../store/dummy");
    const list = () => {
        return injectedStore.list(TABLA)
    }

    async function login(username, password) {
        const data = await injectedStore.query(TABLA, { username: username })

        return bcrypt.compare(password, data.password)
        .then(sonIguales=>{
            if(sonIguales === true){
                //generar token
                return auth.sign(data)
            }else{
                throw new Error('Informacion invalida')
            }
        })
    }
  async function upsert(data){
        const authData = {
            id: data.id,
        }
        if(data.username){
            authData.username = data.username
        }
        if(data.password){
            authData.password = await bcrypt.hash(data.password, 5)
        }

        return injectedStore.upsert(TABLA, authData)
    }
  
    return {
        upsert,
        login,
    }
    
}
