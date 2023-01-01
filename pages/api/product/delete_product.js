import axios from 'axios';
//import Cookies from 'universal-cookie';

export default async function Delete_Product(payload) {
	const env = process.env.NODE_ENV
    console.log(env)
    if(env == "development"){
        const result = await axios.post("http://localhost:5000/api/delete_product",payload)
    	return result
    }
    else if (env == "production"){
    	const result = await axios.post(`https://prokemia-clientserver-production.up.railway.app/api/delete_product`,payload)
    	return result
    }
}