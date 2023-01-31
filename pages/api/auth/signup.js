import axios from 'axios';
const jwt = require('jsonwebtoken');
import Cookies from 'universal-cookie';

export default async function SignUp(payload) {
    const env = process.env.NODE_ENV
    if(env == "development"){
        const cookies = new Cookies();
        const result = await axios.post("http://localhost:5000/api/signup",payload)
        if(result.status === 201){
            return result
        }else{
            //console.log(result)
            const email = payload.email_of_company
            const id = result.data._id
            //console.log(result.data)
            const token = jwt.sign(
                    {email,id},
                    'prokemia-2022',
                    {
                        expiresIn: '24'
                    }
            )
            cookies.set('user_token', token, { path: '/' });
            return result
        }
    }
    else if (env == "production"){
        const cookies = new Cookies();
        const result = await axios.post(`https://prokemia-clientserver-production.up.railway.app/api/signup`,payload)
        if(result.status === 201){
            return result
        }else{
            //console.log(result)
            const email = payload.email_of_company
            const id = result.data._id
            //console.log(result.data)
            const token = jwt.sign(
                    {email,id},
                    'prokemia-2022',
                    {
                        expiresIn: '24'
                    }
            )
            cookies.set('user_token', token, { path: '/' });
            return result
        }
    }
	
}