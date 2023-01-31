import axios from 'axios';

export default async function Add_New_Manufacturer(payload) {
	const env = process.env.NODE_ENV
    //console.log(env)
    if(env == "development"){
        const result = await axios.post("http://localhost:5000/api/add_new_manufacturer_distributor",payload)
    	return result
    }
    else if (env == "production"){
    	const result = await axios.post(`https://prokemia-clientserver-production.up.railway.app/api/add_new_manufacturer_distributor`,payload)
    	return result
    }
}