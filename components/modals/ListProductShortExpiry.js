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
    Input,
    Select,
    InputGroup,Heading,
    Stack,
    useToast,
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import TextField from '@mui/material/TextField';

function ShortExpiryProductModal({isshortexpproductModalvisible,setisshortexpproductModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [value, setValue] =useState('');

    const HandleModalOpen=()=>{
      if(isshortexpproductModalvisible !== true){
      }else{
        onOpen();
        setisshortexpproductModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isshortexpproductModalvisible])

    const [body,setBody]=useState('');

    const HandleSubmit=()=>{
		onClose();    	
    	alert('submitting')
    }
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>
              	<Text>List Product on Short Expiry</Text>
              </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Stack spacing={2}>
            	<Text>Select Expiry Date</Text>
			  <Input type='date' />
              <Text>Select Volume of Products</Text>
              <Input type='number' placeholder='enter volume of items on Expiry'/>
                <Flex gap='2' w='100%'>
        					<Button bg='#009393' w='50%' color='#fff' onClick={HandleSubmit}>Submit</Button>
        					<Button flex='1' border='1px solid #009393' bg='#fff' onClick={(()=>{onClose()})}>Cancel</Button>
        				</Flex>
			</Stack>
                        </ModalBody>
                    </ModalContent>
                    </Modal>
                </>
      )
}   

export default ShortExpiryProductModal;



