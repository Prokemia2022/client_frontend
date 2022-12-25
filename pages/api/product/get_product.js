import axios from 'axios';
//import Cookies from 'universal-cookie';

export default async function Get_Product(payload) {
    const result = await axios.post("http://localhost:5000/api/get_product",payload)
    return result
}