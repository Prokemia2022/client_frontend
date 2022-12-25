import axios from 'axios';

export default async function Add_New_Distributor(payload) {
    const result = await axios.post("http://localhost:5000/api/add_new_distributor_manufacturer",payload)
    return result
}