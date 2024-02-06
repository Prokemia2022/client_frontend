import { Get_Industry_data } from "../../pages/api/industries/route.api";

export const useIndustryData= async(title)=>{
    let result = await Get_Industry_data(title).then((response)=>{
        return response?.data;
    }).catch((err)=>{
        throw new Error("error while fetching data")
    })
    return result;
}