import React,{useState,useEffect} from 'react'
import {Flex,Image,Text,Input,Button,Select} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Get_Orders from '../api/auth/salesperson/get_orders.js'
import CreateInvoiceModal from '../../components/modals/InvoiceModal.js';

function Sales({salesperson_data}){
	const router = useRouter();
	const [orders_data,set_orders]=useState([]);
	const [sort_value,set_sort_value]=useState('')
	const [searchquery,set_searchquery]=useState('')
	const [iscreateinvoiceModalvisible,setiscreateinvoiceModalvisible]=useState(false);

	const payload = {
		_id : salesperson_data?._id
	}

	useEffect(()=>{
		if(!payload){
			alert('could not get user_id')
		}else{
			get_Data(payload)
		}
	},[searchquery,sort_value])
	const get_Data=async(payload)=>{
		//console.log(payload)
		await Get_Orders(payload).then((response)=>{
			//console.log(response.data)
			let data = response.data
			const result_data = data.filter((item)=> item.email_of_creator.toLowerCase().includes(salesperson_data?.email_of_salesperson.toLowerCase()))
			const result = result_data.filter((item)=> item.name_of_product?.toLowerCase().includes(searchquery) || item._id?.includes(searchquery))
			set_orders(result)
		})
	}
	return(
		<Flex direction='column' gap='3' p='2' w='100%' overflowY='scroll' h='100vh'>
			<CreateInvoiceModal iscreateinvoiceModalvisible={iscreateinvoiceModalvisible} setiscreateinvoiceModalvisible={setiscreateinvoiceModalvisible} salesperson_data={salesperson_data}/>
			<Text fontSize='32px' fontWeight='bold' textDecoration='3px solid underline #009393'>Sales ({orders_data?.length})</Text>
			<Flex gap='2'>
				<Select w='150px' placeholder='sort' onChange={((e)=>{set_sort_value(e.target.value)})}>
					<option value='pending'>Pending </option>
					<option value='completed'>Completed</option>
					<option value='rejected'>Rejected</option>
				</Select>
				<Input placeholder='search orders by product name, order Id' onChange={((e)=>{set_searchquery(e.target.value)})}/>
			</Flex>
			{orders_data.length === 0?
				<Flex justify='center' align='center' h='40vh' direction='column' gap='2'>
						<Text>You have not Made any sales yet.</Text>
						<Button bg='#009393' color='#fff' onClick={(()=>{setiscreateinvoiceModalvisible(true)})}>Initiate a sale</Button>
				</Flex>
			:
				<>
					{orders_data?.filter((item)=> item.order_status?.includes(sort_value)).map((order)=>{
						return(
							<Item key={order._id} order={order}/>
						)
					})}
				</>
			}
		</Flex>
	)
}

export default Sales;

const Item=({order})=>{
	return(
		<Flex boxShadow='lg' p='2' bg='#fff' borderRadius='5px' direction='column' position='relative' border='2px dashed #009393'>
			<Text fontSize='20px' fontWeight='bold'>Order Id: {order?._id}</Text>
			<Text>Product Name: {order?.name_of_product}</Text>
			<Text>Unit Price: {order?.unit_price}</Text>
			<Text>Volume: {order?.volume_of_items}</Text>	
			<Text>Email of Client: {order?.name_of_client}</Text>	
			<Text>date: {order?.createdAt}</Text>
			<Flex>
				<Text>Order Status:</Text>	
				<Text color={order?.order_status == 'completed'? 'green' : 'orange'}>{order?.order_status}</Text>
			</Flex>
			
		</Flex>
	)
}
