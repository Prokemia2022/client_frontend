import React,{useState} from 'react'
import {Flex,Text,Input,Button,useToast} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import AddNewManufacturer from '../../components/modals/addNewManufacturer.js';
import Delete_Manufacturer_Distributor from '../api/auth/distributor/delete_manufacturer.js'
import Edit_Manufacturer_Distributor from '../api/auth/distributor/edit_manufacturer.js'

function Manufacturers({distributor_data}){
	const router = useRouter();
	const [isaddnewmanufacturerModalvisible,setisaddnewmanufacturerModalvisible]=useState(false);
	const [manufacturers,set_manufacturers]=useState(distributor_data?.manufacturers)
	const id = distributor_data?._id
	return(
		<Flex direction='column' gap='2' p='2' w='100%'>
			<AddNewManufacturer isaddnewmanufacturerModalvisible={isaddnewmanufacturerModalvisible} setisaddnewmanufacturerModalvisible={setisaddnewmanufacturerModalvisible} id={id}/>
			<Text fontSize='32px' fontWeight='bold'>Manufacturers</Text>
			{manufacturers?.length === 0 ?
					<Flex justify='center' align='center' h='40vh' direction='column' gap='2'>
						<Text>You have not listed any manufacturers</Text>
						<Button bg='#009393' color='#fff' onClick={(()=>{setisaddnewmanufacturerModalvisible(true)})}>Add new Manufacturer</Button>
					</Flex>
				:
				<Flex direction='column' p='1' gap='2' overflowY='scroll' h='85vh'>
					<Button bg='#009393' p='5' color='#fff' onClick={(()=>{setisaddnewmanufacturerModalvisible(true)})}>Add new Manufacturer</Button>
					{manufacturers?.map((item)=>{
						return(
							<Manufacturer key={item?._id} item={item} id={distributor_data?._id}/>
						)
					})}
				</Flex>
			}
		</Flex>
	)
}
 
export default Manufacturers;

const Manufacturer=({item,id})=>{
	const toast = useToast();
	const router = useRouter();
	const [is_verify,set_is_verify]=useState(false);
	const [is_edit,set_is_edit]=useState(false);
	const [u_name,set_u_name]=useState(item?.name)
	const [u_email,set_u_email]=useState(item?.email)
	const [u_mobile,set_u_mobile]=useState(item?.mobile)

	const payload = {
		name : item?.name,
		_id : id
	}
	const handle_delete_manufacturer=async()=>{
		await Delete_Manufacturer_Distributor(payload).then(()=>{
			toast({
				title: '',
				description: `${payload.name} has been removed successfully`,
				status: 'success',
				isClosable: true,
			});
			router.reload()
		}).catch((err)=>{
			toast({
				title: '',
				description: `${err.response.data}`,
				status: 'error',
				isClosable: true,
			});
		})
	}

	const handle_edit_manufacturer=async()=>{
		const edit_payload = {
			_id : id,
			prev_name: item?.name,
			name : u_name,
			email: u_email,
			mobile: u_mobile,
		}
		console.log(edit_payload)
		await Edit_Manufacturer_Distributor(edit_payload).then(()=>{
			toast({
				title: '',
				description: `${payload.name} has been edited successfully`,
				status: 'success',
				isClosable: true,
			});
			router.reload()
		}).catch((err)=>{
			toast({
				title: '',
				description: `${err.response.data}`,
				status: 'error',
				isClosable: true,
			});
		})
		set_is_edit(false)
	}
	return(
		<Flex p='2' bg='#eee' borderRadius='5px' direction='column' boxShadow='lg'>
			{is_verify?
				<Flex direction='column'>
					<Text fontSize='24px' fontWeight='bold'>{item?.name}</Text>
					<Text color='grey'>Are you sure you want to remove this manufacturer?</Text>
					<Flex gap='2'>						
						<Button bg='#fff' border='1px solid red' color='red' cursor='pointer' onClick={handle_delete_manufacturer}>Remove Manufacturer</Button>
						<Button bg='#fff' color='#000' border='1px solid #000' cursor='pointer' onClick={(()=>{set_is_verify(false)})}>Cancel</Button>
					</Flex>
				</Flex>
			:
				<Flex direction='column' gap='2'>
					{is_edit?
						<>
							<Flex direction='column'>
								<Text>Name</Text>
								<Input type='text' placeholder={item?.name} variant='filled' onChange={((e)=>{set_u_name(e.target.value)})}/>
							</Flex>
							<Flex direction='column'>
								<Text>Email:</Text>
								<Input type='Email' placeholder={item?.email} variant='filled' onChange={((e)=>{set_u_email(e.target.value)})}/>
							</Flex>
							<Flex direction='column'>
								<Text>Mobile</Text>
								<Input type='tel' placeholder={item?.mobile} variant='filled' onChange={((e)=>{set_u_mobile(e.target.value)})}/>
							</Flex>
							<Flex gap='2' align='center'>
								<Button bg='#009393' color='#fff' onClick={handle_edit_manufacturer}>Edit Manufacturer</Button>
								<Button bg='#fff' color='#000' border='1px solid #000' cursor='pointer' onClick={(()=>{set_is_edit(false)})}>Cancel</Button>
						    </Flex>
						</>
					:
						<>
							<Text fontSize='24px' fontWeight='bold'>{item?.name}</Text>
						  	<Text>Email: {item?.email}</Text>
						    <Text>mobile: {item?.mobile}</Text>
							<Flex gap='2' align='center'>
								<Button bg='#009393' color='#fff' cursor='pointer' onClick={(()=>{set_is_edit(true)})}>Edit</Button>
								<Button bg='#fff' border='1px solid red' color='red' cursor='pointer' onClick={(()=>{set_is_verify(true)})}>Remove</Button>
						    </Flex>
						</>
					}
				</Flex>
			}
		</Flex>
	)
}