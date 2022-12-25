import axios from 'axios';
//import Cookies from 'universal-cookie';

export default async function Contact_Support(payload) {
    const result = await axios.post("http://localhost:5000/api/create_support_question",payload)
    return result
}