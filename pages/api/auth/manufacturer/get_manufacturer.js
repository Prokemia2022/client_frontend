import axios from 'axios';

export default async function Get_Manufacturer(payload) {
    const result = await axios.post("http://localhost:5000/api/get_manufacturer_account",payload)
    return result
}