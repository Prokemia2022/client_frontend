import axios from 'axios';
//import Cookies from 'universal-cookie';

export default async function Create_Request_Demo_Ticket(payload) {
	const env = process.env.NODE_ENV
    //console.log(env)
    if(env == "development"){
        const result = await axios.post("http://localhost:5000/api/create_request_demo_ticket",payload)
    	return result
    }
    else if (env == "production"){
    	const result = await axios.post(`https://prokemia-clientserver-production.up.railway.app/api/create_request_demo_ticket`,payload)
    	return result
    }
}