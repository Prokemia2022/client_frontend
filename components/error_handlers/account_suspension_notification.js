import {Flex,Text,Link} from '@chakra-ui/react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function Suspension_Notification(){
    return(
        <Flex m='1' bg='red' p='2' color='#fff' borderRadius={'5'} fontSize={'12px'} align='center' h='45px' >
            <InfoOutlinedIcon/>
            <Text> Your account has been suspended, please contact our support <Link external="true" href='mailto: help@prokemia.com' fontWeight={'bold'}>help@prokemia.com</Link></Text>
        </Flex>
    )
}