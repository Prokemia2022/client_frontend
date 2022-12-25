import axios from 'axios';

export default async function Get_Distributor(payload) {
    const result = await axios.post("http://localhost:5000/api/get_distributor_account",payload)
    return result
}