import axios from 'axios';

export default async function Verify_SalesPerson_Account(payload) {
	const env = process.env.NODE_ENV
    console.log(env)
    if(env == "development"){
        const result = await axios.post("http://localhost:5000/api/verify_salesperson_account",payload)
    	return result
    }
    else if (env == "production"){
    	const result = await axios.post(`https://prokemia-clientserver-production.up.railway.app/api/verify_salesperson_account`,payload)
    	return result
    }
}