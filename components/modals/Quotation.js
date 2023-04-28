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
    useToast
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import Send_Quotation_Email from '../../pages/api/email_handler/quotation_email.js';

function QuotationModal({isquotationModalvisible,setisquotationModalvisible,product_data}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    ////console.log(isaddingreviewgModalvisible);

    const HandleModalOpen=()=>{
      if(isquotationModalvisible !== true){
        ////console.log('damn')
      }else{

        onOpen();
        setisquotationModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isquotationModalvisible])

  const cookies = new Cookies();
  const token = cookies.get('user_token');
  const [user,setuser]=useState('');
  
  useEffect(()=>{
    if(token){
      const details = jwt_decode(token)
//      console.log(details)
      setuser(details?.email)
    }
  },[token])

    const [amount,set_amount]=useState(0);
    const [description_for_use,set_description_for_use]=useState('');
    const [unit,set_unit]=useState('');

    const payload ={
      amount,
      description_for_use,
      unit,
      email_of_lister : product_data?.email_of_lister,
      requester_email : user,
      name_of_product : product_data?.name_of_product
    }

    const handle_submit_quotation_request=async()=>{
      if (!user || user === ''){
          toast({
            title: '',
            description: 'You need to be signed in to request a quotation',
            status: 'info',
            isClosable: true,
          });
          onClose()
      }else{
        if ((amount == 0) || (description_for_use == '') || (unit == '')){
          toast({
              title: '',
              description: 'All inputs are required',
              status: 'info',
              isClosable: true,
            });
        }else{
          await Send_Quotation_Email(payload).then(()=>{
            toast({
              title: 'Your quotation request has been sent',
              description: 'Emails may take a few minutes or may appear in the spam folder.',
              status: 'info',
              isClosable: true,
            });
          }).catch((err)=>{
            toast({
              title: '',
              description: 'We could not create a quotation request.',
              status: 'error',
              isClosable: true,
            });
          }).finally(()=>{
            onClose();
          })
        }
      }
    }
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>Request Quotation</Text>
            <Text fontSize='14px'>Please fill out the form below to prepare your quote</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
            {/* <Text>Confirm Details to start this great journey</Text> */}
            <InputGroup>
              <Input type='text' placeholder='Describe Intended Use for this product' variant='flushed' onChange={((e)=>{set_description_for_use(e.target.value)})}/>
            </InputGroup>
            <InputGroup>
            <Input type='number' placeholder='Expected volume or amount of products' variant='flushed' onChange={((e)=>{set_amount(e.target.value)})}/>
            </InputGroup>
            <Select variant='filled' placeholder='Select Unit' onChange={((e)=>{set_unit(e.target.value)})}>
              <option value='kg'>Kilograms</option>
              <option value='gallons'>Gallons</option>
            </Select>
            <Button bg='#009393' borderRadius='0' color='#fff' onClick={handle_submit_quotation_request}>Submit request</Button>
            </Stack>
          </ModalBody>
        </ModalContent>
        </Modal>
      </>
      )
}   

export default QuotationModal;