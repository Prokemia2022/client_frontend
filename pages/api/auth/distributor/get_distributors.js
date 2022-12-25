import axios from 'axios';

export default async function Get_Distributors() {
    const result = await axios.get("http://localhost:5000/api/get_distributors")
    return result
}