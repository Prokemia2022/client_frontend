import axios from 'axios';
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';

export default async function SignIn(payload) {
	const env = process.env.NODE_ENV
    console.log(env)
    if(env == "development"){
        const cookies = new Cookies();
	    const result = await axios.post("http://localhost:5000/api/signin",payload)
	  	console.log(result.data)
	    cookies.set('user_token', result.data, { path: '/' });
	    return result
    }
    else if (env == "production"){
    	const cookies = new Cookies();
	    const result = await axios.post(`https://prokemia-clientserver-production.up.railway.app/api/signin`,payload)
	  	console.log(result.data)
	    cookies.set('user_token', result.data, { path: '/' });
	    return result
    }
}