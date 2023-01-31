import axios from 'axios';

export default async function Edit_Expert_Manufacturer(payload) {
	const env = process.env.NODE_ENV
    //console.log(env)
    if(env == "development"){
        const result = await axios.post("http://localhost:5000/api/edit_expert_manufacturer",payload)
    	return result
    }
    else if (env == "production"){
    	const result = await axios.post(`https://prokemia-clientserver-production.up.railway.app/api/edit_expert_manufacturer`,payload)
    	return result
    }
}