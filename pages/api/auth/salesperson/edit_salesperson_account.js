import axios from 'axios';

export default async function Edit_Salesperson(payload) {
    const result = await axios.post("http://localhost:5000/api/edit_salesperson_account",payload)
    return result
}