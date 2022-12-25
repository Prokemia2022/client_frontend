import axios from 'axios';

export default async function Get_Salesperson(payload) {
    const result = await axios.post("http://localhost:5000/api/get_salesperson_account",payload)
    return result
}