import axios from 'axios';

export default async function Edit_Client(payload) {
    const result = await axios.post("http://localhost:5000/api/edit_client_account",payload)
    return result
}