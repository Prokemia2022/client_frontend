import { Alert, AlertDescription, AlertIcon, AlertTitle, Badge, Box, Collapse, Text, useDisclosure } from "@chakra-ui/react"
import Script from "next/script";
import { UsedashboardContext } from "../../../../../components/Providers/dashboardContext";

export const Notification=()=>{
    const {sales_data} = UsedashboardContext()
    if (sales_data?.order_status === 'rejected'){
        return (
            <Alert_Card status={'error'} Title={'Your sale has been rejected!'} Description={'contact our support at help@prokemia.com for any assistance.'}/>
        )
    }
    if (sales_data?.order_status === 'review'){
        return (
            <Alert_Card status={'success'} Title={'Success!'} Description={'Your sale has been received and is under review and respond to you within the next 48 hours.'}/>
        )
    }
    if (sales_data?.order_status === 'pending' && sales_data?.publish_status){
        return (
            <Alert_Card status={'warning'} Title={'Pending!'} Description={'Please wait as your sale is currently waiting to be be assigned to a sales expert, you can edit or remove the sale before it is received by our sales team.'}/>
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
            <Badge onMouseEnter={() => onToggle()} onMouseLeave={() => onToggle()} mb='1'  onClick={onToggle} colorScheme='gray' variant={'outline'} display={'flex'} align='center' transition={'.3s ease-in-out'} p='2' borderRadius={'md'} _hover={{color:'orange'}} cursor={'pointer'}>
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