import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://dev6.dansmultipro.com/api/recruitment/'
})

instance.defaults.headers.post['Accept'] = 'application/json';
instance.defaults.timeout = 60000;