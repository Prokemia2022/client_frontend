import Body from "../../../components/ui/Dashboard/body.ui";
import { dashboardContext } from "../../../components/Providers/dashboardContext";
import { useEffect, useState } from "react";
import Content from "./content";
import { MdManageAccounts, MdSpaceDashboard } from "react-icons/md";
import useFetchToken from "../../../hooks/useFetchToken.hook";
import { useRouter } from "next/router";
import { Text, useToast } from "@chakra-ui/react";
import { FaFolderOpen } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdFactory } from "react-icons/md";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { Notification } from "../../../components/ui/Dashboard/status_notification";

export default function Index(){
    const [signed_in,set_signed]=useState(useFetchToken())
    const [page,set_page]=useState('Home');
    const [active_page,set_active_page]=useState(page);
    const [product_page_data,set_product_page_data]=useState({});
    const [refetch_products,set_refetch_products]=useState('')
    const router = useRouter();
    const toast = useToast()
    
    useEffect(()=>{
        set_active_page(page);
        if(!signed_in){
            toast({ title: 'Authentication required to access dashboard', description: '', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
            router.back('/');
            return ;
        }
    },[page,signed_in]);
    return(
        <dashboardContext.Provider value={{active_page,page,set_page,navigation,product_page_data,set_product_page_data,refetch_products,set_refetch_products}}>
			<Body>
                <Notification/>
                <Content/>
            </Body>
		</dashboardContext.Provider>
    ) 
}

const navigation = [
    {
        title:  'Home',
        icon:   MdSpaceDashboard
    },
    {
        title:  'Inventory',
        icon:   FaFolderOpen
    },
    {
        title:  'Experts',
        icon:   BsFillPeopleFill
    },
    {
        title:  'Manufacturers',
        icon:   MdFactory
    },
    {
        title:  'Settings',
        icon:   MdManageAccounts
    },
    {
        title:  'Upgrade',
        icon:   MdOutlineWorkspacePremium
    }
]