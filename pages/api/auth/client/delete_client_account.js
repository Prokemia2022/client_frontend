import axios from 'axios';

export default async function Delete_Client(payload) {
    const result = await axios.post("http://localhost:5000/api/delete_client_account",payload)
    return result
}