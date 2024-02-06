import axios from 'axios';
import Handler from '../../routehandler';

let base_url = Handler();

export async function Get_Client(email) {
    const result = axios.get(`${base_url}/api/client/user?query=${email}`)
    return result;
}

export async function Update_Client(payload) {
    const result = axios.put(`${base_url}/api/client/update`,payload)
    return result;
}