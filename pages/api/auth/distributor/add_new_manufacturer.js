import axios from 'axios';

export default async function Add_New_Manufacturer(payload) {
    const result = await axios.post("http://localhost:5000/api/add_new_manufacturer_distributor",payload)
    return result
}