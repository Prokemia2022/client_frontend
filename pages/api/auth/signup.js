import axios from 'axios';
import Cookies from 'universal-cookie';

export default async function SignUp(payload) {
    const env = process.env.NODE_ENV
    if(env == "development"){
        const cookies = new Cookies();
        const result = await axios.post("http://localhost:5000/api/signup",payload);
        //console.log(result)
        if(result.status === 201){
            //console.log('201',result)
            return result
        }else{
            //console.log('200',result);
            cookies.set('user_token', result?.data, { path: '/' });
            return result
        }
    }
    else if (env == "production"){
        const cookies = new Cookies();
        const result = await axios.post(`https://prokemia-clientserver-production.up.railway.app/api/signup`,payload)
        //console.log(result)
        if(result.status === 201){
            //console.log('201',result)
            return result
        }else{
            //console.log('200',result);
            cookies.set('user_token', result?.data, { path: '/' });
            return result
        }
    }
	
}