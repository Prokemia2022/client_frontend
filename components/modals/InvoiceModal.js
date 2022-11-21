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

function CreateInvoiceModal({iscreateinvoiceModalvisible,setiscreateinvoiceModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();

    const HandleModalOpen=()=>{
      if(iscreateinvoiceModalvisible !== true){
      }else{
        onOpen();
        setiscreateinvoiceModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[iscreateinvoiceModalvisible])

    const [body,setBody]=useState('')

    return (
          <>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  <Text>Create a new Sale</Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Stack spacing={4}>
                    <Flex direction='column'>
                      <Text>Name of Client</Text>
                      <Input type='text' placeholder='Name of Client' variant='filled'/>
                    </Flex>
                    <Flex direction='column'>
                      <Text>Email of Client:</Text>
                      <Input type='Email' placeholder='Email of Client' variant='filled'/>
                    </Flex>
                    <Flex direction='column'>
                      <Text>Name of Product:</Text>
                      <Input type='text' placeholder='Name of product' variant='filled'/>
                    </Flex>
                    <Flex direction='column'>
                      <Text>Volume of Items</Text>
                      <Input type='number' placeholder='Volume/amount' variant='filled'/>
                    </Flex>
                    <Flex direction='column'>
                      <Text>Unit Price</Text>
                      <Input type='number' placeholder='Enter Price per item' variant='filled'/>
                    </Flex>
                    <Flex direction='column'>
	                    <Text fontSize='14px'>- by creating this invoice you acknowledge that Prokemia will formally trade on behalf </Text>
	                    <Text fontSize='14px'>- a 2% service fee will be charged for this process.</Text>
                    </Flex>
                    <Button bg='#009393' borderRadius='0' color='#fff'>Create Sale Invoice</Button>
                  </Stack>
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
      )
}   

export default CreateInvoiceModal;

