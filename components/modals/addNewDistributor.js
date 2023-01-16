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
import Add_New_Distributor from '../../pages/api/auth/manufacturer/add_new_distributor.js'

function AddNewDistributorModal({isaddnewdistributorModalvisible,setisaddnewdistributorModalvisible,id}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast  =useToast();

    const HandleModalOpen=()=>{
      if(isaddnewdistributorModalvisible !== true){
      }else{
        onOpen();
        setisaddnewdistributorModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isaddnewdistributorModalvisible])

    const [name,set_name]=useState('')
    const [mobile,set_mobile]=useState('')
    const [email,set_email]=useState('');
    const [industry,set_industry]=useState('')

    const payload = {
      _id: id,
      name,
      mobile,
      email,
      industry
    }

    const verify_inputs=()=>{
      if (name == '' || mobile == '' || email == '' || industry == ''){
        toast({
            title: '',
            description: `All inputs are required.`,
            status: 'info',
            isClosable: true,
          });
      }else if (name != '' && mobile != '' && email != '' && industry != ''){
        handle_add_new_distributor()
      }
    }
    
    const handle_add_new_distributor=async()=>{
      console.log(payload)
      await Add_New_Distributor(payload).then(()=>{
          toast({
            title: '',
            description: `${name} has been added as a distributor.`,
            status: 'success',
            isClosable: true,
          });
        }).then(()=>{
          setisaddnewdistributorModalvisible(false)
        }).catch((err)=>{
          toast({
            title: '',
            description: err.response.data,
            status: 'error',
            isClosable: true,
          });
        })
      onClose()
    }
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>Add new distributor</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Flex direction='column'>
                <Text>Name</Text>
                <Input type='text' placeholder='Name of distributor' variant='filled' onChange={((e)=>{set_name(e.target.value)})}/>
              </Flex>
              <Flex direction='column'>
                <Text>Email:</Text>
                <Input type='Email' placeholder='Email' variant='filled' onChange={((e)=>{set_email(e.target.value)})}/>
              </Flex>
              <Flex direction='column'>
                <Text>Mobile</Text>
                <Input type='tel' placeholder='Mobile' variant='filled' onChange={((e)=>{set_mobile(e.target.value)})}/>
              </Flex>
              <Flex direction='column'>
                <Text>Industries the distributor specializes in</Text>
                <Input type='text' placeholder='Use a comma to separate multiple Industries' variant='filled' onChange={((e)=>{set_industry(e.target.value)})}/>
              </Flex>
              <Button bg='#009393' borderRadius='0' color='#fff' onClick={verify_inputs}>Add new Distributor</Button>
            </Stack>
          </ModalBody>
        </ModalContent>
        </Modal>
      </>
      )
}   

export default AddNewDistributorModal;