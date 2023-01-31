import React,{useState,useEffect} from 'react';
import {Flex,Center,Text,Button,Input,InputGroup,InputRightElement,Image,Textarea,useToast} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import Header from '../../../components/Header.js';
import axios from 'axios'
import Cookies from 'universal-cookie';
//import Create_Career_mailing_list from './api/control/create_career_mailing_list.js'
import Verify_Client_Account from '../../api/auth/client/verify_account.js'
import Verify_Distributor_Account from '../../api/auth/distributor/verify_distributor_account.js'
import Verify_Manufacturer_Account from '../../api/auth/manufacturer/verify_manufacturer_account.js'
import Verify_SalesPerson_Account from '../../api/auth/salesperson/verify_salesperson_account.js'

export default function Validating_Email_Account(){
	const cookies = new Cookies();
	const toast = useToast();
  	const router = useRouter();
  	const query = router.query
  	console.log(query);

  	useEffect(()=>{
  		const retrieved_verification_code = cookies.get("verification_code")
  		set_code(retrieved_verification_code)
  	},[])
  	const [active,set_active]=useState(false);
  	const [code,set_code]=useState();
  	const [confirmation_code,set_confirmation_code]=useState();

  	const Compare_Codes=()=>{
  		if (code === confirmation_code){
  			Send_Email().then(()=>{
  				cookies.remove('verification_code', { path: '/' });
  			})
  		}else{
  			console.log(confirmation_code)
  			toast({
          title: '',
          description: `wrong code `,
          status: 'error',
          isClosable: true,
        });
  		}
  	}

  	const Send_Email=async()=>{
  		const acc_type = query.category
  		const payload = {
  			_id: query.id
  			//fetch user details: email and payload id and code
  		}
  		if (acc_type === 'client'){
  			await Verify_Client_Account(payload).then(()=>{
  				//alert('success')
  				toast({
					title: '',
					description: `successfully verified your account.`,
					status: 'success',
					isClosable: true,
				});
				router.back()
  				// axios.post("http://localhost:5001/api/email_verification")
			})
  		}else if(acc_type === 'distributor'){
  			await Verify_Distributor_Account(payload).then(()=>{
  				//alert('success')
  				toast({
					title: '',
					description: `successfully verified your account.`,
					status: 'success',
					isClosable: true,
				});
				router.back()
  				// axios.post("http://localhost:5001/api/email_verification")
			})
  		}else if(acc_type === 'manufacturer'){
  			await Verify_Manufacturer_Account(payload).then(()=>{
  				//alert('success')
  				toast({
					title: '',
					description: `successfully verified your account.`,
					status: 'success',
					isClosable: true,
				});
				router.back()
  				// axios.post("http://localhost:5001/api/email_verification")
			})
  		}else if(acc_type === 'salesperson'){
			await Verify_SalesPerson_Account(payload).then(()=>{
  				//alert('success')
  				toast({
					title: '',
					description: `successfully verified your account.`,
					status: 'success',
					isClosable: true,
				});
				router.back()
  				// axios.post("http://localhost:5001/api/email_verification")
			})
  		}else{
  			alert('Error')
  		}
  	}
	return(
		<Flex direction='column'>
			<Header/>
			<Flex justify='center' align='center' h='100vh' direction='column' gap='2'>
				<Flex direction='column' gap='3'>
					<Text>Use the code sent to your email to verify your account.</Text>
					<Input variant='filled' bg='#eee' required type='Number' placeholder='Enter Code' onChange={((e)=>{set_confirmation_code(e.target.value)})}/>
					<Button bg='#000' color='#fff' onClick={Compare_Codes}>Submit</Button>
				</Flex>
			</Flex>

		</Flex>
	)
}