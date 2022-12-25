import axios from 'axios';
//import Cookies from 'universal-cookie';

export default async function Create_Landing_page_mailing_list(payload) {
    const result = await axios.post("http://localhost:5000/api/add_email_to_mailing_list",payload)
    return result
}