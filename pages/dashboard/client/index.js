import Body from "../../../components/ui/Dashboard/body.ui";
import { dashboardContext } from "../../../components/Providers/dashboardContext";
import { useEffect, useState } from "react";
import { Content } from "./content";
import { MdManageAccounts, MdSpaceDashboard } from "react-icons/md";
import useFetchToken from "../../../hooks/useFetchToken.hook";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { Notification } from "../../../components/ui/Dashboard/status_notification";
import { TbFileInvoice } from "react-icons/tb";

export default function Index(){
    const [signed_in,set_signed]=useState(useFetchToken())
    const [page,set_page]=useState('Home');
    const [active_page,set_active_page]=useState(page);
    const router = useRouter();
    const toast = useToast()
    
    useEffect(()=>{
        set_active_page(page);
        if(!signed_in){
            toast({ title: 'Authentication is required', description: '', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
            router.push('/');
            return ;
        }
    },[page,signed_in]);
    return(
        <dashboardContext.Provider value={{active_page,page,set_page,navigation}}>
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
        title:  'Quotes',
        icon:   TbFileInvoice
    },
    {
        title:  'Samples',
        icon:   TbFileInvoice
    },
    {
        title:  'Settings',
        icon:   MdManageAccounts
    }
]