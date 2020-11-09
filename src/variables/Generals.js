import qs from 'qs';
const axios = require('axios');


function runQuery(url, data, method = "POST"){
    url = "http://localhost:5000"+url
    let options = {
        method: method,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url
    }
    return axios(options);

}

export default runQuery;