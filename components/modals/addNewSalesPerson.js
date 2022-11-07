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

function AddNewSalesPersonModal({isaddnewsalespersonModalvisible,setisaddNewSalesPersonModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();

    const HandleModalOpen=()=>{
      if(isaddnewsalespersonModalvisible !== true){
      }else{
        onOpen();
        setisaddNewSalesPersonModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isaddnewsalespersonModalvisible])

    const [body,setBody]=useState('')

    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>
              	<Text>Add new salesperson</Text>
              </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Stack spacing={4}>
                <Flex direction='column'>
					<Text>Name</Text>
					<Input type='text' placeholder='Name of Salesperson' variant='filled'/>
				</Flex>
				<Flex direction='column'>
					<Text>Email:</Text>
					<Input type='Email' placeholder='Email' variant='filled'/>
				</Flex>
				<Flex direction='column'>
					<Text>Mobile</Text>
					<Input type='tel' placeholder='Mobile' variant='filled'/>
				</Flex>
                <Button bg='#009393' borderRadius='0' color='#fff'>Add new SalesPerson</Button>
			</Stack>
                        </ModalBody>
                    </ModalContent>
                    </Modal>
                </>
      )
}   

export default AddNewSalesPersonModal;

