import axios from 'axios';

export default async function Suggest_Industry(payload){
    const result = await axios.post("http://localhost:5000/api/suggest_industry",payload)
    return result
}