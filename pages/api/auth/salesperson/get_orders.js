import axios from 'axios';

export default async function Get_Orders(payload){
	console.log(payload)
    const result = await axios.get("http://localhost:5000/api/get_orders")
    return result
}