import axios from 'axios';

export default async function Un_Feature_Product(payload){
	const env = process.env.NODE_ENV
    //console.log(env)
    if(env == "development"){
        const result = await axios.post("http://localhost:5000/api/un_feature_product",payload)
    	return result
    }
    else if (env == "production"){
    	const result = await axios.post(`https://prokemia-clientserver-production.up.railway.app/api/un_feature_product`,payload)
    	return result
    }
}