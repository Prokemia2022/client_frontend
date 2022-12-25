import axios from 'axios';

export default async function Delete_Manufacturer(payload) {
    const result = await axios.post("http://localhost:5000/api/delete_manufacturer_account",payload)
    return result
}