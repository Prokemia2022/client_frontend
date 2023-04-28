import axios from 'axios';

export default async function Email_Verification(email_payload) {
	const env = process.env.NODE_ENV
    //console.log(env)
    if(env == "development"){
        const result = await axios.post(" http://localhost:5001/api/email_verification",email_payload)
    	return result
    }
    else if (env == "production"){
    	const result = await axios.post(`https://prokemiaemailsmsserver-production.up.railway.app/api/email_verification`,email_payload)
    	return result
    }
}