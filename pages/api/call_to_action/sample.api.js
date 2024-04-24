import axios from 'axios';

export default async function NewSample(payload) {
	const env = process.env.NODE_ENV;

	const devbaseurl = process.env.NEXT_PUBLIC_DEV_BASEURL;
	const prodbaseurl = process.env.NEXT_PUBLIC_PROD_BASEURL;
  
	let base_url;
	if(env == "development"){
		base_url = devbaseurl;
	}else if(env == "production"){
		base_url = prodbaseurl;
	}
	const result = axios.post(`${base_url}/api/sample/new`,payload);
    return result;
}

export async function FetchSamplesByRequester(id) {
	const env = process.env.NODE_ENV;

	const devbaseurl = process.env.NEXT_PUBLIC_DEV_BASEURL;
	const prodbaseurl = process.env.NEXT_PUBLIC_PROD_BASEURL;
  
	let base_url;
	if(env == "development"){
		base_url = devbaseurl;
	}else if(env == "production"){
		base_url = prodbaseurl;
	}
	const result = axios.get(`${base_url}/api/sample/requester?query=${id}`);
    return result;
}
export async function FetchSamplesByLister(id) {
	const env = process.env.NODE_ENV;

	const devbaseurl = process.env.NEXT_PUBLIC_DEV_BASEURL;
	const prodbaseurl = process.env.NEXT_PUBLIC_PROD_BASEURL;
  
	let base_url;
	if(env == "development"){
		base_url = devbaseurl;
	}else if(env == "production"){
		base_url = prodbaseurl;
	}
	const result = axios.get(`${base_url}/api/sample/lister?query=${id}`);
    return result;
}

export async function UPDATE_SAMPLE_REQUEST(data,SAMPLE_ID) {
	const env = process.env.NODE_ENV;

	const devbaseurl = process.env.NEXT_PUBLIC_DEV_BASEURL;
	const prodbaseurl = process.env.NEXT_PUBLIC_PROD_BASEURL;
  
	let base_url;
	if(env == "development"){
		base_url = devbaseurl;
	}else if(env == "production"){
		base_url = prodbaseurl;
	}

	let config = {
		method: 'put',
		maxBodyLength: Infinity,
		url: `${base_url}/api/sample/update?sample_id=${SAMPLE_ID}`,
		headers: { 
		  'Content-Type': 'application/json'
		},
		data : data
	  };
	  
	const result = await axios.request(config).then((response) => {
		return response
	  }).catch((error) => {
		console.log(error);
		return error
	  });
    return result;
}