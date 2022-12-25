import axios from 'axios';

export default async function Delete_Distributor(payload) {
    const result = await axios.post("http://localhost:5000/api/delete_distributor_account",payload)
    return result
}