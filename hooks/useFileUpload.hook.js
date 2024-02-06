import {storage} from '../components/firebase.js';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import { v4 } from "uuid";
import Cookies from 'universal-cookie';

const useFileUpload=async(data)=>{
    /**handles uploads profile image functions to firebase storage**/
    const cookies = new Cookies();
    const documentRef = ref(storage, `${data?.file_type}/${data?.file?.name + v4()}`);
    const snapshot= await uploadBytes(documentRef,data?.file)
    const file_url = await getDownloadURL(snapshot.ref)
    cookies.set(`${data?.file_type}_url`, file_url, { path: '/' });
    return file_url;
}

export default useFileUpload;