import axios from 'axios';

export default async function Suggest_Technology(payload){
    const result = await axios.post("http://localhost:5000/api/suggest_technology",payload)
    return result
}