//modules import
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalCloseButton,useDisclosure,InputGroup,
		Button,Text,Flex,Center,Input,Stack,useToast} from '@chakra-ui/react';
import { useEffect,useState} from 'react';
//utils
import {useRouter} from 'next/router';
import Cookies from 'universal-cookie';
//api calls
import Delete_Client from '../../../pages/api/auth/client/delete_client_account.js';
import Delete_Distributor from '../../../pages/api/auth/distributor/delete_distributor_account.js';
import Delete_Manufacturer from '../../../pages/api/auth/manufacturer/delete_manufacturer_account.js';
import Delete_SalesPerson from '../../../pages/api/auth/salesperson/delete_salesperson_account.js';

export default function Delete_Account_Modal({
		is_delete_account_Modalvisible,
		set_is_delete_account_Modalvisible,
		distributor_data,
	    manufacturer_data,
	    client_data,
	    salesperson_data,
	    acc_type,
	    id
	}){

	//utils
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const router = useRouter();
	const cookies = new Cookies();
	//states
    const [confirm_name,set_confirm_name]=useState('')
    const [name,set_name]=useState('');
    const [uid,set_uid]=useState('');
    const [verify,set_verify]=useState(false)


    const payload = {
    	_id: uid
    }
	//functions
	//api_calls
	//useEffects
	useEffect(()=>{
		console.log(client_data)
      	HandleModalOpen();
	    if (acc_type === 'client'){
		  	set_uid(client_data?._id)
		    set_name(client_data?.first_name)
	    }
	    if (acc_type === 'distributors'){
	    	set_uid(distributor_data?._id)
	        set_name(distributor_data?.company_name)
	    }
	    if (acc_type === 'manufacturers'){
	    	set_uid(manufacturer_data?._id)
	        set_name(manufacturer_data?.company_name)
	    }
	    if (acc_type === 'salesperson'){
	      	set_uid(salesperson_data?._id)
	        set_name(salesperson_data?.first_name)
	    }
    },[is_delete_account_Modalvisible,acc_type])
    
    const HandleModalOpen=()=>{
      if(is_delete_account_Modalvisible !== true){
      }else{
        onOpen();
        set_is_delete_account_Modalvisible(false)
      }
    }

    const handle_deletion=async()=>{
      if (confirm_name === name){  
        if (acc_type === 'client'){
          await Delete_Client(payload).then(()=>{
            toast({
				title: '',
				description: `${name} has deleted this account.`,
				status: 'success',
				isClosable: true,
			});
          })
        }else if (acc_type === 'distributors'){
          await Delete_Distributor(payload).then(()=>{
            toast({
				title: '',
				description: `${name} has deleted this account.`,
				status: 'success',
				isClosable: true,
			});
          })
        }else if (acc_type === 'manufacturers'){
          await Delete_Manufacturer(payload).then(()=>{
            toast({
				title: '',
				description: `${name} has deleted this account.`,
				status: 'success',
				isClosable: true,
			});
          })
        }else if (acc_type === 'salesperson'){
          await Delete_SalesPerson(payload).then(()=>{
            toast({
				title: '',
				description: `${name} has deleted this account.`,
				status: 'success',
				isClosable: true,
			});
          });
        }
        cookies.remove('user_token', { path: '/' });
        router.push('/');
      }else{
	        toast({
				title: '',
				description: `the input tags do not match,try again.`,
				status: 'info',
				isClosable: true,
			});
      }
      onClose()
    }

    const initiate_account_deletion=()=>{
    	if (confirm_name === name){  
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
						<Text fontSize='24px' color='red'>Delete Account</Text>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack spacing={4}>
							{verify?
								<Flex direction='column' gap='4'>
									<Text fontSize='24px'>We are sad to see you leave!!</Text>
									<Text fontSize='20px' color='grey'>Are you sure you want to delete your account?</Text>
									<Flex gap='2'>
										<Button flex='1' bg='red' color='#fff' onClick={handle_deletion}> Yes, I want to delete my account< /Button>
										<Button border='1px solid #000' onClick={(()=>{set_is_delete_account_Modalvisible(false)})} > Cancel </Button>
									</Flex>
								</Flex>
							:
								<Flex direction='column' gap='2'>
									<Text>By deleting this account, You will not have access to use the service and/or the platform.</Text>
									<Text>Enter the name higlighted: <span style={{color:'red',backgroundColor:'#eee',padding:'5px'}}> {name} </span> in the input below, to delete this account.</Text>
									<InputGroup>
										<Input type='text' placeholder='name' variant='filled' onChange={((e)=>{set_confirm_name(e.target.value)})}/>
									</InputGroup>
									<Flex gap='2'>
										<Button flex='1' bg='red' color='#fff' onClick={initiate_account_deletion}>Proceed to delete</Button>
										<Button flex='1' bg='#fff' color='#000' border='1px solid #000' onClick={(()=>{set_is_delete_account_Modalvisible(false)})}>Cancel</Button>
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