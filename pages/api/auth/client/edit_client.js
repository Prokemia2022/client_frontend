import axios from 'axios';

export default async function Edit_Client(payload) {
	const env = process.env.NODE_ENV
    //sconsole.log(env)
    if(env == "development"){
        const result = await axios.post("http://localhost:5000/api/edit_client_account",payload)
    	return result
    }
    else if (env == "production"){
    	const result = await axios.post(`https://prokemia-clientserver-production.up.railway.app/api/edit_client_account`,payload)
    	return result
    }
}