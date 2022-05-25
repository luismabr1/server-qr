const { consoleSandbox } = require('@sentry/utils');
const mysql = require('mysql');

const config = require('../config');

const dbconf = {
    host:  config.mysql.host ||   'localhost',
    user:  config.mysql.user ||  'root',
    password:  config.mysql.password ||   '',
    database:  config.mysql.database || 'modo_qr',
};

let connection;

function handleCon() {
    connection = mysql.createConnection(dbconf);

    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected!');
        }
    });

    connection.on('error', err => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}

handleCon();

function list(table) {
    return new Promise( (resolve, reject) => {
        const queryLista = `SELECT * FROM ${table} WHERE is_active=2`
        console.log(queryLista)
        connection.query(queryLista, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function insert(table, data) {
    console.log(`datos de la relacion en insert ${data}`)
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function update(table, data) {
    console.log(`estoy en update`)
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function remove(table, data) {
    console.log(`estoy en remove mysql ${data}`)
    return new Promise((resolve, reject) => {
        const queryDelete=`UPDATE ${table} SET is_active=1 WHERE id= ? `
        console.log(queryDelete)
        connection.query(queryDelete, [data, data.id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function upsert(table, data) {
    const dataJson= JSON.stringify(data)

    if (data.is_active || data.id) {
        return update(table, data);
    } else {
        return insert(table, data);
    }
}


/* function query(table, query, join) {
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res[0] || null);
        })
    })
} */
function queryAll(query) {
    return new Promise((resolve, reject) => {
        const queryFinal = `SELECT equipos.id AS equipo_id, equipos.serial, marcas.nombre AS marca, modelos.nombre AS modelo, tipos.nombre AS tipo, usuarios.nombre AS usuario, departamentos.nombre AS departamento, cargos.nombre AS cargo FROM equipos, usuarios, marcas, departamentos, cargos, modelos, tipos WHERE usuarios.id = equipos.usuario_id AND equipos.id = ? AND marcas.id = equipos.marca_id AND departamentos.id = usuarios.departamento_id AND cargos.id = usuarios.cargo_id AND tipos.id = equipos.tipo_id AND modelos.id = equipos.modelo_id`
        console.log(queryFinal)
        connection.query(queryFinal, query,  (error, data) => {
            if (error) return reject(error);
            resolve(data);
        })
    });
}

function query(table, query, join = null) {
    let joinQuery = '';
    let dato = query
    if (join) {
        Object.entries(join).forEach(([key, value]) => {
            console.log(key)
            console.log(value)
            const [to, from] = value;
            joinQuery+= ` INNER JOIN ${key} ON ${key}.${from} = ${table}.${to}`;
        })
    }
    return new Promise((resolve, reject) => {
        const queryFinal = `SELECT * FROM ${table}${joinQuery} WHERE ${table}.id=? OR ${table}.username=?`
        console.log(queryFinal)
        console.log(dato)
        connection.query(queryFinal, dato, (error, data) => {
            console.error(error)
            if (error) return(
                reject(error)
                ) 
            resolve(data);
        })
    });
}


    function queryLogin(table, query, join) {
        let joinQuery = '';
        if (join) {
            const key = Object.keys(join)[0];
            const val = join[key];
            joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
        }
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
                if (err) return reject(err);
                resolve(res[0] || null);
            })
        })
    }


module.exports = {
    list,
    get,
    upsert,
    update,
    remove,
    insert,
    query,
    queryAll,
    queryLogin,
};