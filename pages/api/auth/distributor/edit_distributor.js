import axios from 'axios';

export default async function Edit_Distributor(payload) {
    const result = await axios.post("http://localhost:5000/api/edit_distributor_account",payload)
    return result
}