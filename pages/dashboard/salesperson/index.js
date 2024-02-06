import Body from "../../../components/ui/Dashboard/body.ui";
import { dashboardContext } from "../../../components/Providers/dashboardContext";
import { useEffect, useState } from "react";
import { Content } from "./content";
import { MdManageAccounts, MdSpaceDashboard } from "react-icons/md";
import useFetchToken from "../../../hooks/useFetchToken.hook";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { Notification } from "../../../components/ui/Dashboard/status_notification";
import { FaFileInvoice } from "react-icons/fa";

export default function Index(){
    const [signed_in,set_signed]=useState(useFetchToken())
    const [page,set_page]=useState('Home');
    const [sales_data,set_sales_data]=useState({});
    const [active_page,set_active_page]=useState(page);
    const router = useRouter();
    const toast = useToast()
    
    useEffect(()=>{
        set_active_page(page);
        if(!signed_in){
            toast({ title: 'Authentication required to access dashboard', description: '', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
            router.back('/');
            return ;
        }
    },[page]);
    return(
        <dashboardContext.Provider value={{active_page,page,set_page,navigation,sales_data,set_sales_data}}>
			<Body>
                <Notification />
                <Content/>
            </Body>
		</dashboardContext.Provider>
    ) 
}

export const navigation = [
    {
        title:  'Home',
        icon:   MdSpaceDashboard
    },
    {
        title:  'Sales',
        icon:   FaFileInvoice
    },
    {
        title:  'Settings',
        icon:   MdManageAccounts
    }
]