import { Get_Manufacturer_Srt } from "../../pages/api/supplier/manufacturer/route.api";

export const UseManufacturerSrt = async()=>{
    let result = await Get_Manufacturer_Srt().then((response)=>{
        return response?.data;
    }).catch((err)=>{
        throw new Error("error while fetching manufacturers")
    })
    return result;
}