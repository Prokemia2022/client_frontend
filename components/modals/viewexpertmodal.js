import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
    Flex,
    Center,
    Textarea,
    Input,Image,
    Select,
    InputGroup,Heading,
    Stack,
    useToast,
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ViewExpertModal({isviewexpertModalvisible,setisViewExpertModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();

    const HandleModalOpen=()=>{
      if(isviewexpertModalvisible !== true){
      }else{
        onOpen();
        setisViewExpertModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isviewexpertModalvisible])

    const [body,setBody]=useState('')

    return (
            <>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>
                    <Text>View Expert</Text>
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Stack spacing={2}>
                        <AccountCircleIcon style={{fontSize:'150px'}}/>
                        <Flex direction='column' gap='2'>
                        <Text fontSize='24px' color='#009393'>Name: Major</Text>
                        <Text>Email: major@prokemia.co.ke</Text>
                        <Text>Mobile: 0759233322</Text>
                        <Text>Company: Sahol Ind</Text>
                        <Text>Industry: Agriculture</Text>
                        <Text>Technology: Agri-films</Text>
                        <Button bg='#000' color='#fff' border='1px solid #000'><CallIcon/>Call</Button>
                        <Button bg='#009393' color='#fff'><EmailIcon/>Email</Button>
                      </Flex>
                    </Stack>
                  </ModalBody>
                </ModalContent>
              </Modal>
              </>
      )
}   

export default ViewExpertModal;
