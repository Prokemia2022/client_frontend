import {storage} from '../components/firebase.js';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import { v4 } from "uuid";
import Cookies from 'universal-cookie';

const useImageUpload=async({profile_photo})=>{
    /**handles uploads profile image functions to firebase storage**/
    const cookies = new Cookies();
    const profile_photo_documentRef = ref(storage, `profile_photo/${profile_photo?.name + v4()}`);
    const snapshot= await uploadBytes(profile_photo_documentRef,profile_photo)
    const image_url = await getDownloadURL(snapshot.ref)
    cookies.set('image_url', image_url, { path: '/' });
    return file_url;
}

export default useImageUpload;