//modules import
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalCloseButton,useDisclosure,InputGroup,
    Button,Text,Flex,Center,Input,Stack,useToast} from '@chakra-ui/react';
import { useEffect,useState} from 'react';
//utils
import {useRouter} from 'next/router';
import Cookies from 'universal-cookie';
//api calls
import Delete_Product from '../../pages/api/product/delete_product.js';

export default function Delete_Product_Modal({
    is_delete_product_Modalvisible,
    set_is_delete_product_Modalvisible,
    product_data,}){

  //utils
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();
  const cookies = new Cookies();
  const is_suspended = cookies.get('is_suspended');
  //states
    const [confirm_name,set_confirm_name]=useState('')
    //const [name,set_name]=useState();
    const [verify,set_verify]=useState(false);

    const payload = {
      _id: product_data?._id,
      name_of_product: product_data?.name_of_product 
    }
  //functions
  //api_calls
  //useEffects
    useEffect(()=>{
        HandleModalOpen();
    },[is_delete_product_Modalvisible])

    const HandleModalOpen=()=>{
      if(is_delete_product_Modalvisible !== true){
      }else{
        onOpen();
        set_is_delete_product_Modalvisible(false)
      }
    }

    const handle_deletion=async()=>{
      if(is_suspended == 'true'){
        toast({
          title: 'Your account is currently suspended.',
          description: 'reach out to support for guidance by emailing us at help@prokemia.com',
          status: 'error',
          isClosable: true,
        });
        return ;
      }else {
        await Delete_Product(payload).then(()=>{
          toast({
            title: '',
            description: `${product_data?.name_of_product} has been deleted.`,
            status: 'success',
            isClosable: true,
          });
          router.back()
        }).catch((err)=>{
          toast({
            title: '',
            description: err.response?.data,
            status: 'error',
            isClosable: true,
          });
        });
      }
      onClose()
    }

    const initiate_product_deletion=()=>{
      if (confirm_name === product_data?.name_of_product){  
          set_verify(true)
      }else{
          toast({
            title: '',
            description: `the input details do not match,try again.`,
            status: 'info',
            isClosable: true,
          });
      }
  }
    return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize='24px' color='red'>Delete Product</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              {verify?
                <Flex direction='column' gap='4'>
                  <Text fontSize='20px' color='grey'>Are you sure you want to delete this product?</Text>
                  <Flex gap='2'>
                    <Button flex='1' bg='red' color='#fff' onClick={handle_deletion}> Yes, I want to delete it.</Button>
                    <Button border='1px solid #000' onClick={(()=>{set_is_delete_product_Modalvisible(false)})} > Cancel </Button>
                  </Flex>
                </Flex>
              :
                <Flex direction='column' gap='2'>
                  <Text>By deleting this product, It will be removed from the database entirely in the platform.</Text>
                  <Text>Enter the name higlighted: <span style={{color:'red',backgroundColor:'#eee',padding:'5px'}}> {product_data?.name_of_product} </span> in the input below, to delete this product.</Text>
                  <InputGroup>
                    <Input type='text' placeholder='name' variant='filled' onChange={((e)=>{set_confirm_name(e.target.value)})}/>
                  </InputGroup>
                  <Flex gap='2'>
                    <Button flex='1' bg='red' color='#fff' onClick={initiate_product_deletion}>Proceed to delete</Button>
                    <Button flex='1' bg='#fff' color='#000' border='1px solid #000' onClick={(()=>{onClose()})}>Cancel</Button>
                  </Flex>
                </Flex>
              }
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
      )
}