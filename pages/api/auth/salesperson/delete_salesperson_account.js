import axios from 'axios';

export default async function Delete_SalesPerson(payload) {
    const result = await axios.post("http://localhost:5000/api/delete_salesperson_account",payload)
    return result
}