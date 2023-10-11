import axios from 'axios';

export default async function Get_Technologies() {
	const env = process.env.NODE_ENV;

	const devbaseurl = process.env.NEXT_PUBLIC_DEV_BASEURL;
	const prodbaseurl = process.env.NEXT_PUBLIC_PROD_BASEURL;
  
	let base_url;
	if(env == "development"){
		base_url = devbaseurl;
	}else if(env == "production"){
		base_url = prodbaseurl;
	}
	const result = axios.get(`${base_url}/api/get_technologies`);
    return result;
    // if(env == "development"){
    //     const result = await axios.get("http://localhost:5000/api/get_technologies")
    // 	return result
    // }
    // else if (env == "production"){
    // 	const result = await axios.get(`https://prokemia-clientserver-production.up.railway.app/api/get_technologies`)
    // 	return result
    // }
}