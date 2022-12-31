import axios from 'axios';
//import Cookies from 'universal-cookie'; http://localhost:5000/ https://prokemia-client.herokuapp.com/


export default async function Get_Industries() {
    const result = await axios.get("https://prokemia-client.herokuapp.com/api/get_industries")
    return result
}
