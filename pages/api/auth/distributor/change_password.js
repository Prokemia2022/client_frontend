import axios from 'axios';

export default async function Change_Password(payload) {
    const result = await axios.post("http://localhost:5000/api/change_distributor_password",payload)
    return result
}