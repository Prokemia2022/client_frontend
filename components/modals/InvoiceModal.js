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
import Create_Order from '../../pages/api/auth/salesperson/create_order.js'

function CreateInvoiceModal({iscreateinvoiceModalvisible,setiscreateinvoiceModalvisible,salesperson_data}){
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

    //client_information
    const [name_of_client,set_name_of_client]=useState('');
    const [company_name_of_client,set_company_name_of_client]=useState('');
    const [mobile_of_client,set_mobile_of_client]=useState('');    
    const [email_of_client,set_email_of_client]=useState('');
    const [location_of_client,set_location_of_client]=useState('');
    //product information
    const [name_of_product,set_name_of_product]=useState('');
    const [volume_of_items,set_volume_of_items]=useState('');
    const [unit_price,set_unit_price]=useState('');
    const total = volume_of_items * unit_price

    const salesperson_name = salesperson_data?.first_name + ' ' + salesperson_data?.last_name
    const payload = {
      //creator-info
      creator_id: salesperson_data?._id,
      creator_name: salesperson_name,
      email_of_creator: salesperson_data?.email_of_salesperson,
      mobile_of_creator: salesperson_data?.mobile_of_salesperson,
      //client-info
      name_of_client,
      company_name_of_client,
      mobile_of_client,
      email_of_client,
      location_of_client,
      //product info
      name_of_product,
      volume_of_items,
      unit_price,
      total
    }

    const create_order=async()=>{
      console.log(payload)
      await Create_Order(payload).then(()=>{
        alert('order created successfully')
      })
      onClose()
    }
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
                      <Input type='text' placeholder='Name of Client' variant='filled' onChange={((e)=>{set_name_of_client(e.target.value)})}/>
                    </Flex>
                    <Flex direction='column'>
                      <Text>Email of Client:</Text>
                      <Input type='Email' placeholder='Email of Client' variant='filled' onChange={((e)=>{set_email_of_client(e.target.value)})}/>
                    </Flex>
                    <Flex direction='column'>
                      <Text>Mobile of Client</Text>
                      <Input type='text' placeholder='Mobile of Client' variant='filled' onChange={((e)=>{set_mobile_of_client(e.target.value)})}/>
                    </Flex>
                    <Flex direction='column'>
                      <Text>Company location of Client</Text>
                      <Input type='text' placeholder='company location of Client' variant='filled' onChange={((e)=>{set_location_of_client(e.target.value)})}/>
                    </Flex>
                    <Flex direction='column'>
                      <Text>Company Name of Client</Text>
                      <Input type='text' placeholder='Company Name of Client' variant='filled' onChange={((e)=>{set_company_name_of_client(e.target.value)})}/>
                    </Flex>

                    <Flex direction='column'>
                      <Text>Name of Product:</Text>
                      <Input type='text' placeholder='Name of product' variant='filled' onChange={((e)=>{set_name_of_product(e.target.value)})}/>
                    </Flex>
                    <Flex direction='column'>
                      <Text>Volume of Items</Text>
                      <Input type='number' placeholder='Volume/amount' variant='filled' onChange={((e)=>{set_volume_of_items(e.target.value)})}/>
                    </Flex>
                    <Flex direction='column'>
                      <Text>Unit Price</Text>
                      <Input type='number' placeholder='Enter Price per item' variant='filled' onChange={((e)=>{set_unit_price(e.target.value)})}/>
                    </Flex>
                    <Flex direction='column'>
	                    <Text fontSize='14px'>- by creating this invoice you acknowledge that Prokemia will formally trade on behalf </Text>
	                    <Text fontSize='14px'>- a 2% service fee will be charged for this process.</Text>
                    </Flex>
                    <Button bg='#009393' borderRadius='0' color='#fff' onClick={create_order}>Create Sale Invoice</Button>
                  </Stack>
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
      )
}   

export default CreateInvoiceModal;

