import axios from 'axios';

export default async function Get_Client(payload) {
    const result = await axios.post("http://localhost:5000/api/get_client_account",payload)
    return result
}