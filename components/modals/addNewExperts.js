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
    Textarea,
    Input,
    Select,
    InputGroup,Heading,
    Stack,
    useToast,
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import Add_New_Expert from '../../pages/api/auth/distributor/add_new_expert.js'
import Add_New_Expert_Manufacturer from '../../pages/api/auth/manufacturer/add_new_expert.js';
import {useRouter} from 'next/router';

export default function AddNewExpertsModal({isaddnewexpertModalvisible,setisaddNewExpertModalvisible,id,acc_type,set_refresh_data}){
    const toast = useToast();
    const router = useRouter();
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

    const verify_inputs=()=>{
      if (name == '' || mobile == '' || email == '' || role == ''){
        toast({
            title: '',
            description: `All inputs are required.`,
            status: 'info',
            isClosable: true,
          });
      }else if (name !== '' && mobile !== '' && email !== '' && role !== ''){
        handle_add_new_expert()
      }
    }
    const handle_add_new_expert=async()=>{
      //console.log(payload)
      if(acc_type === 'distributor')
        await Add_New_Expert(payload).then(()=>{
          toast({
            title: '',
            description: `${name} has been added as an expert.`,
            status: 'success',
            isClosable: true,
          });
        }).then(()=>{
          set_refresh_data(`${name} has been added as an expert.`)
          setisaddNewExpertModalvisible(false)
        }).catch((err)=>{
          toast({
            title: '',
            description: err.response.data,
            status: 'error',
            isClosable: true,
          });
        })
      else{
        await Add_New_Expert_Manufacturer(payload).then(()=>{
          toast({
            title: '',
            description: `${name} has been added as an expert.`,
            status: 'success',
            isClosable: true,
          });
        }).then(()=>{
          set_refresh_data(`${name} has been added as an expert.`)
          setisaddNewExpertModalvisible(false)
        }).catch((err)=>{
          toast({
            title: '',
            description: err.response.data,
            status: 'error',
            isClosable: true,
          });
        })
      }
      onClose()
    }
    return (
        <>
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Text>Add new Expert</Text>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing={4}>
                  <Flex direction='column'>
                    <Text>Name </Text>
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
                    <Textarea type='text' placeholder='Description' variant='filled' onChange={((e)=>{set_description(e.target.value)})}/>
                  </Flex>
                  <Flex direction='column'>
                    <Text>Mobile</Text>
                    <Input type='tel' placeholder='Mobile' variant='filled' onChange={((e)=>{set_mobile(e.target.value)})}/>
                  </Flex>
                  <Button bg='#009393' borderRadius='0' color='#fff' onClick={verify_inputs}>Add new Expert</Button>
                </Stack>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )
}
