import axios from 'axios';

export default async function Add_New_Expert(payload) {
    const env = process.env.NODE_ENV;

    const devbaseurl = process.env.NEXT_PUBLIC_DEV_BASEURL;
    const prodbaseurl = process.env.NEXT_PUBLIC_PROD_BASEURL;

    let base_url;
    if(env == "development"){
        base_url = devbaseurl;
    }else if(env == "production"){
        base_url = prodbaseurl;
    }
    const result = axios.post(`${base_url}/api/add_new_expert_distributor`,payload)
    return result;
	// const env = process.env.NODE_ENV
    // //console.log(env)
    // if(env == "development"){
    //     const result = await axios.post("http://localhost:5000/api/add_new_expert_distributor",payload)
    // 	return result
    // }
    // else if (env == "production"){
    // 	const result = await axios.post(`https://prokemia-clientserver-production.up.railway.app/api/add_new_expert_distributor`,payload)
    // 	return result
    // }
}