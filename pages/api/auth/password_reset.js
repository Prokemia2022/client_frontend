import axios from 'axios';

export default async function Password_Reset(payload) {
	const env = process.env.NODE_ENV
    //console.log(env)
    if(env == "development"){
	    const result = await axios.post("http://localhost:5000/api/password_reset",payload)
	    return result
    }
    else if (env == "production"){
	    const result = await axios.post(`https://prokemia-clientserver-production.up.railway.app/api/password_reset`,payload)
	  	//console.log(result.data)
    }
}