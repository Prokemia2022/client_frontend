import axios from 'axios';
//import Cookies from 'universal-cookie';

export default async function Create_Feedback(payload) {
    const result = await axios.post("http://localhost:5000/api/create_feedback",payload)
    return result
}