function err(message, code){
    let e = new Error(mesasge)

    if(code){
        e.statusCode = code
    }
    return e
}

module.exports = err