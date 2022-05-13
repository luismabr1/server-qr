/* const fetch = require("node-fetch");

exports.createRemoteDB = (host, port) => {
    const URL = `http://${host}:${port}`;

    async function get(TABLE, param) {
        fetch(`${URL}/${TABLE}/${param}`)
            .then(response => {
                return response.json();
            })
            .then(json => {
                return json;
            })
            .catch(err => {
                return err.message;
            })
    }

    //otras funciones...

    return {
        get,
    }
}
 */


/*  const request = require('request')

class RemoteDB{
    constructor(host, port) {
        this.URL = `https://${host}:${port}`
    }
//Platzi no me deja hacer el comentario con solo http xd

list(table) {
    return request('GET', table)
}
request(method, table, data) {
    let url = `${URL}/${table}`
    let body = ''

    return new Promise((resolve, reject) => {
        request({
            method,
            headers: {
                'content-type': 'application/json'
            },
            url,
            body,
        }, (err, req, body) => {
            if (err) {
                console.error('Error con la base de datos remota', err)
                return reject(err.message)
            }

            const response = JSON.parse(body)
            return resolve(response.body)
        })
    })
}

    // function get(table, id){}
    // function upsert (table, data){}
    // function query(table, dataForQuery, join){}


}


module.exports = RemoteDB 
  */

 const request = require('request');

function createRemoteDB(host, port) {
    const URL = 'http://'+ host + ':' + port;

    function list(table) {
        return req('GET', table);
    }

	function get(table, id) {
		return req('GET', table, id);
	}

	function insert(table, data) {
		return req('POST', table, data);
	}

	function update(table, data) {
		return req('PUT', table, data);
	}

	function upsert(table, data) {
		if (data.id) {
			return update(table, data);
		}

		return insert(table, data);
	}

	function query(table, query, join) {
		return req('POST', table + '/query', { query, join });
	}

    function req(method, table, data) {
        let url = URL + '/' + table;
        body = '';

        if (method === 'GET' && data) {
			url += '/'+ data;
		} else if (data) {
			body = JSON.stringify(data);
		}

        return new Promise((resolve, reject) => {
            request({
                method,
                headers: {
                    'content-type': 'application/json'
                },
                url,
                body,
            }, (err, req, body) => {
                if (err) {
                    console.error('Error con la base de datos remota', err);
                    return reject(err.message);
                }

                const resp = JSON.parse(body);
                return resolve(resp.body);
            })
        })
    }

    return {
        list,
    }
}

module.exports = createRemoteDB;