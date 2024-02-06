import { Get_Distributors_Srt } from "../../pages/api/supplier/distributor/route.api";

export const useDistributorSrt = async()=>{
    let result = await Get_Distributors_Srt().then((response)=>{
        return response?.data;
    }).catch((err)=>{
        throw new Error("error while fetching distributors")
    })
    return result;
}