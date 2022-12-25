import axios from 'axios';

export default async function Get_Manufacturers() {
    const result = await axios.get("http://localhost:5000/api/get_manufacturers")
    return result
}