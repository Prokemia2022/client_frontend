import axios from 'axios';

export default async function Create_Order(payload) {
    const result = await axios.post("http://localhost:5000/api/create_order",payload)
    return result
}