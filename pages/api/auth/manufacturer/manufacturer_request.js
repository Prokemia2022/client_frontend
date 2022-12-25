import axios from 'axios';

export default async function Manufacturer_request(payload) {
    const result = await axios.post("http://localhost:5000/api/create_request",payload)
    return result
}