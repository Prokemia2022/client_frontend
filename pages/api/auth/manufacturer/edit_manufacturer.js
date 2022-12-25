import axios from 'axios';

export default async function Edit_Manufacturer(payload) {
    const result = await axios.post("http://localhost:5000/api/edit_manufacturer_account",payload)
    return result
}