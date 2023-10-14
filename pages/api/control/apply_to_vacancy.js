import axios from 'axios';
//import Cookies from 'universal-cookie';

export default async function Apply_To_Vacancy(payload) {
	const env = process.env.NODE_ENV;

	const devbaseurl = process.env.NEXT_PUBLIC_DEV_BASEURL;
	const prodbaseurl = process.env.NEXT_PUBLIC_PROD_BASEURL;
  
	let base_url;
	if(env == "development"){
		base_url = devbaseurl;
	}else if(env == "production"){
		base_url = prodbaseurl;
	}
	const result = axios.post(`${base_url}/api/apply_to_vacancy`,payload);
    return result;
    // if(env == "development"){
    //     const result = await axios.post("http://localhost:5000/api/apply_to_vacancy",payload)
    // 	return result
    // }
    // else if (env == "production"){
    // 	const result = await axios.post(`https://prokemia-clientserver-production.up.railway.app/api/apply_to_vacancy`,payload)
    // }
}