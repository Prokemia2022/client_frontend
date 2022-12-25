import axios from 'axios';

export default async function Add_New_Expert(payload) {
    const result = await axios.post("http://localhost:5000/api/add_new_expert_distributor",payload)
    return result
}