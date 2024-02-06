import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Button, Text, Flex, Center, Textarea, Input, Select, InputGroup,Heading, Stack, useToast, FormControl, FormLabel,} from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import { UseIndustriesSrt } from '../../hooks/industries/useIndustriesSrt';
import { Add_New_Distributor } from '../../pages/api/supplier/manufacturer/route.api';

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

    //data
    const [industries_data, set_industries_data]=useState([]);
      
    useEffect(()=>{
      get_Industries_Data()
    },[])


    async function get_Industries_Data(){
      let data = await UseIndustriesSrt();
      set_industries_data(data)
    }

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
          toast({title: '',description: `${name} has been added as a distributor.`,status: 'success',isClosable: true,variant:'left-accent',position:'top-left'});
        }).then(()=>{
          setisaddnewdistributorModalvisible(false)
        }).catch((err)=>{
          toast({ title: '', description: err?.response?.data, status: 'error', isClosable: true,variant:'left-accent',position:'top-left'});
        })
      onClose()
    }
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
              <FormControl>
                  <FormLabel>Industry the distributor specializes in</FormLabel>
                  <Select value={industry} placeholder='select industry product will be categorized' onChange={((e)=>{set_industry(e.target.value)})}>
                      {industries_data?.map((item)=>{
                          return(
                              <option key={item?._id} value={item?.title}>{item?.title}</option>
                          )
                      })}
                  </Select>
              </FormControl>
              <Button bg='#009393' borderRadius='0' color='#fff' onClick={verify_inputs}>Add new Distributor</Button>
            </Stack>
          </ModalBody>
        </ModalContent>
        </Modal>
      </>
      )
}   

export default AddNewDistributorModal;