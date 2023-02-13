//modules import
import React,{useState,useEffect} from 'react'
import {Flex,Image,Text,Input,Button,Select,Textarea,useToast} from '@chakra-ui/react'
//components import
import Loading from '../../components/Loading.js'
//utils
import {useRouter} from 'next/router'
//api calls
import Create_Order from '../api/auth/salesperson/create_order.js'
//icons
import DoneAllIcon from '@mui/icons-material/DoneAll';

export default function Sale_Form({setCurrentValue,salesperson_data}){
	//utils
	const toast = useToast();

	//states
	const [issubmitting,set_issubmitting]=useState(false); //handles up-loading state
	const [is_verified,set_isverified]=useState(false); //handles up-loading state

	/*client_information*/
    const [name_of_client,set_name_of_client]=useState('');
    const [company_name_of_client,set_company_name_of_client]=useState('');
    const [mobile_of_client,set_mobile_of_client]=useState('');    
    const [email_of_client,set_email_of_client]=useState('');
    const [location_of_client,set_location_of_client]=useState('');
    /*product information*/
    const [name_of_product,set_name_of_product]=useState('');
    const [volume_of_items,set_volume_of_items]=useState('');
    const [unit_price,set_unit_price]=useState('');
    const total = volume_of_items * unit_price
    /*payment & delivery info*/
    const [delivery_terms,set_delivery_terms]=useState('');
    const [payment_terms,set_payment_terms]=useState('');
    const [delivery_date,set_delivery_date]=useState('');

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
      total,
      //payment&delivery
      delivery_date,
      delivery_terms,
      payment_terms
    }

    //functions
    const verify_input_fields=()=>{
    	set_isverified(true)
    	/***verifies the main input fields are correct.***/
    	if (!name_of_product || !name_of_client || !email_of_client || !volume_of_items || !unit_price){
    		toast({
				title: '',
				description: 'All required inputs must be filled',
				status: 'info',
				isClosable: true,
			});
			set_isverified(false)
		}else if(salesperson_data?.verification_status == false){
			toast({
				title: 'Account has not been approved',
				description: 'only verified salesperson accounts can create a new sale.',
				status: 'info',
				isClosable: true,
			});
			set_isverified(false)
		}else if (name_of_product && name_of_client && email_of_client && volume_of_items && unit_price){
			set_issubmitting(true)
			Create_Sale()
		}else{
			console.log('error')
		}
    }
    const Create_Sale=async()=>{
      await Create_Order(payload).then(()=>{
      	
        toast({
			title: 'Success',
			description: `Sale:${name_of_product} has created successfuly.`,
			status: 'success',
			isClosable: true,
		});
      }).then(()=>{
      		set_issubmitting(false)
      		set_isverified(false)
      		setCurrentValue("dashboard")
      }).catch((err)=>{
	      	toast({
				title: '',
				description: `${err.response.data}`,
				status: 'error',
				isClosable: true,
			});
      })
    }
	return(
		<>
			{issubmitting?
				<Loading/>
				:
				<Flex direction='column' gap='3' p='4' w='100%' overflowY='scroll' h='100vh'>
					<Text fontSize='28px' fontWeight='bold'>New Sale</Text>
					<Flex direction='column'>
					  <Text>Company Name</Text>
					  <Input type='text' placeholder='Company Name' variant='filled' onChange={((e)=>{set_company_name_of_client(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
					  <Text>Address of company</Text>
					  <Input type='text' placeholder='location of Client' variant='filled' onChange={((e)=>{set_location_of_client(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
					  <Text>Mobile of Client</Text>
					  <Input type='text' placeholder='Mobile of Client' variant='filled' onChange={((e)=>{set_mobile_of_client(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
					  <Text>Email of Client:</Text>
					  <Input type='Email' placeholder='Email of Client' variant='filled' onChange={((e)=>{set_email_of_client(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
					  <Text>Contact person name</Text>
					  <Input type='text' placeholder='Name of Client' variant='filled' onChange={((e)=>{set_name_of_client(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
					  <Text>Name of Product:</Text>
					  <Input type='text' placeholder='Name of product' variant='filled' onChange={((e)=>{set_name_of_product(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
					  <Text>Quantity of Items</Text>
					  <Input type='number' placeholder='Quantity/amount' variant='filled' onChange={((e)=>{set_volume_of_items(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
					  <Text>Unit Price</Text>
					  <Input type='number' placeholder='Enter Price per item' variant='filled' onChange={((e)=>{set_unit_price(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
					  <Text>Delivery_terms:</Text>
					  <Input variant='filled' placeholder='Define The terms for delivery of the items' onChange={((e)=>{set_delivery_terms(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
					  <Text>Delivery_date</Text>
					  <Input type='date' variant='filled' placeholder='date product to be delivered' onChange={((e)=>{set_delivery_date(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
					  <Text>Payment_terms:</Text>
					  <Input variant='filled' placeholder='Enter mode of payment' onChange={((e)=>{set_payment_terms(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
					    <Text fontSize='14px'>- by creating this invoice you acknowledge that Prokemia will formally trade on behalf </Text>
					    <Text fontSize='14px'>- a 2% service fee will be charged for this process.</Text>
					</Flex>
					<Flex gap='2'>
						<Button flex='1' bg='#009393' p='4' color='#fff' onClick={verify_input_fields} disabled={is_verified?true:false}>Create Sale</Button>
						<Button flex='1' bg='#fff' border='1px solid red' p='4' color='#000' onClick={(()=>{setCurrentValue('dashboard')})}>Cancel</Button>
					</Flex>
				</Flex>
			}
		</>
	)
}