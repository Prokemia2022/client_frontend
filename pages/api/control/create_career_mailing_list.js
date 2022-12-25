import axios from 'axios';
//import Cookies from 'universal-cookie';

export default async function Create_Career_mailing_list(payload) {
    const result = await axios.post("http://localhost:5000/api/create_career_mailing_list",payload)
    return result
}