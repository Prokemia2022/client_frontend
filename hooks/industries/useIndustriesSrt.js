import { Get_Industries_Srt } from "../../pages/api/industries/route.api";


export const useIndustriesSrt = async()=>{
    let result = await Get_Industries_Srt().then((response)=>{
        return response?.data;
    }).catch((err)=>{
        throw new Error("error while fetching industries")
    })
    return result;
}