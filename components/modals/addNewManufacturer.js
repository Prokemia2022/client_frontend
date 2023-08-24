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
import Add_New_Manufacturer from '../../pages/api/auth/distributor/add_new_manufacturer.js'

function AddNewManufacturerModal({isaddnewmanufacturerModalvisible,setisaddnewmanufacturerModalvisible,id,set_refresh_data}){
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const HandleModalOpen=()=>{
      if(isaddnewmanufacturerModalvisible !== true){
      }else{
        onOpen();
        setisaddnewmanufacturerModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isaddnewmanufacturerModalvisible])

    const [name,set_name]=useState('')
    const [mobile,set_mobile]=useState('')
    const [email,set_email]=useState('')

    const payload = {
      _id: id,
      name,
      mobile,
      email,
    }

    const verify_inputs=()=>{
      if (name == '' || mobile == '' || email == ''){
        toast({
            title: '',
            description: `All inputs are required.`,
            status: 'info',
            isClosable: true,
          });
      }else if (name != '' && mobile != '' && email != ''){
        handle_add_new_manufacturer()
      }
    }

    const handle_add_new_manufacturer=()=>{
      console.log(payload)
      Add_New_Manufacturer(payload).then(()=>{
          toast({
            title: '',
            description: `${name} has been added as a manufacturer.`,
            status: 'success',
            isClosable: true,
          });
        }).then(()=>{
          set_refresh_data(`${name} has been added as a manufacturer.`)
          setisaddnewmanufacturerModalvisible(false)
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
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Text>Add new Manufacturer</Text>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing={4}>
                  <Flex direction='column'>
                    <Text>Name</Text>
                    <Input type='text' placeholder='Name of Manufacturer' variant='filled' onChange={((e)=>{set_name(e.target.value)})}/>
                  </Flex>
                  <Flex direction='column'>
                    <Text>Email:</Text>
                    <Input type='Email' placeholder='Email' variant='filled' onChange={((e)=>{set_email(e.target.value)})}/>
                  </Flex>
                  <Flex direction='column'>
                    <Text>Mobile</Text>
                    <Input type='tel' placeholder='Mobile' variant='filled' onChange={((e)=>{set_mobile(e.target.value)})}/>
                  </Flex>
                  <Button bg='#009393' borderRadius='0' color='#fff' onClick={verify_inputs}>Add new Manufacturer</Button>
                </Stack>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )
}   

export default AddNewManufacturerModal;


