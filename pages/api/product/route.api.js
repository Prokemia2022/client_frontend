import axios from 'axios';
import Handler from '../routehandler';

let base_url = Handler()

export async function Get_Top_Product() {
	const result = axios.get(`${base_url}/api/products/top`);
    return result;
}

export function Get_Product(id) {
	const result = axios.get(`${base_url}/api/products/product?query=${id}`);
    return result;
}

export async function Edit_Product(payload){
	const result = axios.put(`${base_url}/api/products/product/edit`,payload);
    return result;
}

export async function Add_Product(payload) {
	const result = axios.post(`${base_url}/api/products/product/new`,payload);
    return result;
}

export async function Feature_Product(payload){
	const result = axios.post(`${base_url}/api/products/product/feature`,payload);
    return result;
}

export async function Un_Feature_Product(payload){
    const result = axios.post(`${base_url}/api/products/product/unfeature`,payload)
    return result;
}

export async function Delete_Product(payload) {
	const result = axios.delete(`${base_url}/api/products/product/delete?pid=${payload?._id}`);
    return result;
}

export async function Get_Products_Srt() {
	const result = axios.get(`${base_url}/api/products/srt`);
    return result;
}

export async function Get_Products_By_Lister(lister_id) {
	const result = axios.get(`${base_url}/api/products/lister?query=${lister_id}`);
    return result;
}

export async function Get_Products_By_Search(query_params) {
	const result = axios.get(`${base_url}/api/products/search?query=${query_params?.query}`);
    return result;
}

export async function Get_Products() {
    const result = await axios.get(`${base_url}/api/get_products`)
    return result;
}