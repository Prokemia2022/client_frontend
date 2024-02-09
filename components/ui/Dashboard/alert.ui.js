import { Alert, AlertDescription, AlertIcon, AlertTitle, Badge, Box, Button, Collapse, Text, useDisclosure } from "@chakra-ui/react"
import { useUserContext } from "../../Providers/userContext";
import { UsedashboardContext } from "../../Providers/dashboardContext";
import { FaArrowLeft } from "react-icons/fa";

export const Notification=()=>{
    const {user,set_user_handler } = useUserContext();

    if (user?.suspension_status === true){
        return (
            <Alert_Card status={'error'} Title={'Your account has been suspended!'} Description={'you cannot add a product. Contact our support at help@prokemia.com for any assistance.'}/>
        )
    }
    if (user?.verification_status === false){
        return (
            <Alert_Card status={'info'} Title={'Your account is yet to be verified!'} Description={'Your application has been received. We will review your application and respond within the next 48 hours. We appologize for the inconvinence.'}/>
        )
    }
    if(user?.valid_email_status === false){
        return (
            <Alert_Card status={'info'} Title={'You Need to verify your email first!'} Description={''}/>
        )
    }
    return null;
}

const Alert_Card=({
    status,
    Title,
    Description,
})=>{
    const {set_page} = UsedashboardContext()
    return(
        <Alert status={status} mb='2' fontSize={'xs'} borderRadius={'md'}>
            <AlertIcon />
            <Box>
                <AlertTitle>{Title}</AlertTitle>
                <AlertDescription>
                    <Text>
                        {Description}
                    </Text>
                    <Button size={'sm'} bg='#343838' color='white' onClick={(()=>{set_page('Inventory')})} icon={<FaArrowLeft/>}>Go back</Button>
                </AlertDescription>
            </Box>
        </Alert>
    )
}