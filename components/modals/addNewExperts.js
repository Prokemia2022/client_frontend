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
import Add_New_Expert from '../../pages/api/auth/distributor/add_new_expert.js'
import Add_New_Expert_Manufacturer from '../../pages/api/auth/manufacturer/add_new_expert.js'

function AddNewExpertsModal({isaddnewexpertModalvisible,setisaddNewExpertModalvisible,id,acc_type}){
    const { isOpen, onOpen, onClose } = useDisclosure();

    const HandleModalOpen=()=>{
      if(isaddnewexpertModalvisible !== true){
      }else{
        onOpen();
        setisaddNewExpertModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isaddnewexpertModalvisible])

    const [name,set_name]=useState('')
    const [mobile,set_mobile]=useState('')
    const [email,set_email]=useState('')
    const [role,set_role]=useState('');
    const [description,set_description]=useState('');

    const payload = {
      _id: id,
      name,
      mobile,
      email,
      description,
      role
    }

    const handle_add_new_expert=()=>{
      console.log(payload)
      if(acc_type === 'distributor')
        Add_New_Expert(payload).then(()=>{
          alert('success')
          setisaddNewExpertModalvisible(false)
        })
      else{
        Add_New_Expert_Manufacturer(payload).then(()=>{
          alert('success')
          setisaddNewExpertModalvisible(false)
        })
      }
      onClose()
    }
    return (
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Text>Add new Expert</Text>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing={4}>
                  <Flex direction='column'>
                    <Text>Name</Text>
                    <Input type='text' placeholder='Name of Expert' variant='filled' onChange={((e)=>{set_name(e.target.value)})}/>
                  </Flex>
                  <Flex direction='column'>
                    <Text>Email:</Text>
                    <Input type='Email' placeholder='Email' variant='filled' onChange={((e)=>{set_email(e.target.value)})}/>
                  </Flex>
                  <Flex direction='column'>
                    <Text>Position/Role</Text>
                    <Input type='text' placeholder='Position' variant='filled' onChange={((e)=>{set_role(e.target.value)})}/>
                  </Flex>
                  <Flex direction='column'>
                    <Text>Description</Text>
                    <Textarea type='text' placeholder='Position' variant='filled' onChange={((e)=>{set_description(e.target.value)})}/>
                  </Flex>
                  <Flex direction='column'>
                    <Text>Mobile</Text>
                    <Input type='tel' placeholder='Mobile' variant='filled' onChange={((e)=>{set_mobile(e.target.value)})}/>
                  </Flex>
                  <Button bg='#009393' borderRadius='0' color='#fff' onClick={handle_add_new_expert}>Add new Expert</Button>
                </Stack>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )
}   

export default AddNewExpertsModal;