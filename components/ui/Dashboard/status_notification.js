import { Alert, AlertDescription, AlertIcon, AlertTitle, Badge, Box, Collapse, Text, useDisclosure } from "@chakra-ui/react"
import { useUserContext } from "../../Providers/userContext";
import Script from "next/script";

export const Notification=()=>{
    const {user,set_user_handler } = useUserContext();
    if (user?.suspension_status === true){
        return (
            <Alert_Card status={'error'} Title={'Your account has been suspended!'} Description={'contact our support at help@prokemia.com for any assistance.'}/>
        )
    }
    if (user?.verification_status === false){
        return (
            <Alert_Card status={'success'} Title={'Success!'} Description={'Your application has been received. We will review your application and respond within the next 48 hours.'}/>
        )
    }
    if(user?.valid_email_status === false){
        return (
            <Alert_Card status={'info'} Title={'You are almost done!'} Description={'Your need to verify your email! Head over to settings now!'}/>
        )
    }
    return null;
}

const Alert_Card=({
    status,
    Title,
    Description,
})=>{
    const { isOpen, onToggle } = useDisclosure()
    return(
        <>
            <Badge onMouseEnter={() => onToggle()} onMouseLeave={() => onToggle()} mb='1' colorScheme='gray' onClick={onToggle} variant={'outline'} display={'flex'} align='center' transition={'.3s ease-in-out'} p='2' borderRadius={'md'} _hover={{color:'orange'}} cursor={'pointer'}>
                <Script src="https://cdn.lordicon.com/lordicon.js"></Script>
                <lord-icon
                    src="https://cdn.lordicon.com/lznlxwtc.json"
                    trigger="loop"
                    delay="2000"
                    colors="primary:#e88c30"
                    style={{margintTop:'',width:'20px',height:"20px"}}>
                </lord-icon>
                <a href="https://lordicon.com/" style={{fontSize:'2px',display:'none'}}>Icons by Lordicon.com</a>
                <Text>
                    You have a new Notification
                </Text>
            </Badge>
            <Collapse in={isOpen} animateOpacity>
                <Alert status={status} mb='2' fontSize={'xs'} borderRadius={'md'}>
                    <AlertIcon />
                    <Box>
                        <AlertTitle>{Title}</AlertTitle>
                        <AlertDescription>{Description}</AlertDescription>
                    </Box>
                </Alert>
            </Collapse>
        </>
    )
}