import axios from 'axios';

export default async function Create_Feedback(payload) {
	const env = process.env.NODE_ENV;

	const devbaseurl = process.env.NEXT_PUBLIC_DEV_BASEURL;
	const prodbaseurl = process.env.NEXT_PUBLIC_PROD_BASEURL;
  
	let base_url;
	if(env == "development"){
		base_url = devbaseurl;
	}else if(env == "production"){
		base_url = prodbaseurl;
	}
	const result = axios.post(`${base_url}/api/create_feedback`,payload);
    return result;
    // if(env == "development"){
    //     const result = await axios.post("http://localhost:5000/api/create_feedback",payload)
    // 	return result
    // }
    // else if (env == "production"){
    // 	const result = await axios.post(`https://prokemia-clientserver-production.up.railway.app/api/create_feedback`,payload)
    // 	return result
    // }
}