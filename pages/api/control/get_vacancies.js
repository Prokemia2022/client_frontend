import axios from 'axios';
//import Cookies from 'universal-cookie';

export default async function Get_Careers() {
    const result = await axios.get("http://localhost:5000/api/get_vacancies")
    return result
}