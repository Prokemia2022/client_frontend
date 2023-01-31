import axios from 'axios';

export default async function Edit_Manufacturer_Distributor(payload) {
	const env = process.env.NODE_ENV
    //console.log(env)
    if(env == "development"){
        const result = await axios.post("http://localhost:5000/api/edit_manufacturer_distributor",payload)
    	return result
    }
    else if (env == "production"){
    	const result = await axios.post(`https://prokemia-clientserver-production.up.railway.app/api/edit_manufacturer_distributor`,payload)
    	return result
    }
}