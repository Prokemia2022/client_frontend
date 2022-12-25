import axios from 'axios';
//import Cookies from 'universal-cookie';

export default async function Get_Technologies() {
    const result = await axios.get("http://localhost:5000/api/get_technologies")
    return result
}