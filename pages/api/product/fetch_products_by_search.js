import axios from 'axios';
//import Cookies from 'universal-cookie';

export default async function Get_Products_By_Search(query_params) {
	const env = process.env.NODE_ENV
    if(env == "development"){
        const result = await axios.get(`http://localhost:5000/api/fetch_products_by_search?query=${query_params?.query}`)
    	return result
    }
    else if (env == "production"){
    	const result = await axios.get(`https://prokemia-clientserver-production.up.railway.app/api/fetch_products_by_search?${query_params?.query}`)
    	return result
    }
}