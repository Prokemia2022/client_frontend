import React,{useState} from 'react'
import {Flex,Text,Input,Button,useToast,Textarea} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import AddNewExpertsModal from '../../components/modals/addNewExperts.js';
import Delete_Expert_Distributor from '../api/auth/distributor/delete_expert.js'
import Edit_Expert_Distributor from '../api/auth/distributor/edit_expert.js'

function Experts({distributor_data,set_refresh_data}){
	const router = useRouter();
	const [isaddnewexpertModalvisible,setisaddNewExpertModalvisible]=useState(false);
	const id = distributor_data?._id
	return (
		<Flex direction='column' gap='3' p='2' w='100%' h='100vh'>
			<AddNewExpertsModal set_refresh_data={set_refresh_data} isaddnewexpertModalvisible={isaddnewexpertModalvisible} setisaddNewExpertModalvisible={setisaddNewExpertModalvisible} id={id} acc_type='distributor'/>
			<Text fontSize='32px' fontWeight='bold'>Experts</Text>
			{distributor_data?.experts?.length === 0 ?
					<Flex justify='center' align='center' h='40vh' direction='column' gap='2'>
						<Text fontWeight={'bold'} >You have not listed any experts</Text>
						<Text fontSize='12px' align='center' fontWeight='bold' color='#009393'>Experts will be available to advice, support<br/> and assist clients about your company and your products. </Text>
						<Button bg='#009393' color='#fff' onClick={(()=>{setisaddNewExpertModalvisible(true)})}>Add a new Expert</Button>
					</Flex>
				:
				<Flex direction='column' p='1' gap='2' overflowY='scroll' h='80vh'>
					<Button bg='#009393' color='#fff' p='5' onClick={(()=>{setisaddNewExpertModalvisible(true)})}>Add a new Expert</Button>
					{distributor_data?.experts?.map((item)=>{
						return(
							<Expert_Item  key={item._id} item={item} id={distributor_data?._id} set_refresh_data={set_refresh_data}/>
						)
					})}
					
				</Flex>
			}
		</Flex>
	)
}

export default Experts;

const Expert_Item=({item,id,set_refresh_data})=>{
	const toast = useToast()
	const [is_verify,set_is_verify]=useState(false);
	const [is_edit,set_is_edit]=useState(false);
	const [u_name,set_u_name]=useState(item?.name)
	const [u_email,set_u_email]=useState(item?.email)
	const [u_mobile,set_u_mobile]=useState(item?.mobile)
	const [u_role,set_u_role]=useState(item?.role)
	const [u_description,set_u_description]=useState(item?.description);

	const payload = {
		name : item?.name,
		_id : id
	}
	const handle_delete_expert=async()=>{
		console.log(payload)
		await Delete_Expert_Distributor(payload).then(()=>{
			toast({
				title: '',
				description: `${payload.name} has been removed successfully`,
				status: 'success',
				isClosable: true,
			});
			set_refresh_data(`${payload.name} has been removed successfully`)
		}).catch((err)=>{
			toast({
				title: '',
				description: `${err.response.data}`,
				status: 'error',
				isClosable: true,
			});
		})
	}

	const handle_edit_expert=async()=>{
		const edit_payload = {
			_id : id,
			prev_name: item?.name,
			name : u_name,
			email: u_email,
			mobile: u_mobile,
			role: u_role,
			description:  u_description
		}
		console.log(edit_payload)
		await Edit_Expert_Distributor(edit_payload).then(()=>{
			toast({
				title: '',
				description: `${payload.name} has been edited successfully`,
				status: 'success',
				isClosable: true,
			});
			set_refresh_data(`${payload.name} has been edited successfully`)
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
		<Flex p='3' bg='#eee' borderRadius='5px' direction='column' boxShadow='lg'>
		{is_verify?
			<Flex direction='column'>
				<Text fontSize='24px' fontWeight='bold'>{item?.name}</Text>
				<Text color='grey'>Are you sure you want to remove this expert?</Text>
				<Flex gap='2'>						
					<Button bg='#fff' border='1px solid red' color='red' cursor='pointer' onClick={handle_delete_expert}>Remove Expert</Button>
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
						<Flex direction='column'>
		                    <Text>Description</Text>
		                    <Textarea type='text'  placeholder={item?.description} variant='filled' onChange={((e)=>{set_u_description(e.target.value)})}/>
		                </Flex>
		                <Flex direction='column'>
		                    <Text>Position/Role</Text>
		                    <Input type='text' placeholder={item?.role} variant='filled' onChange={((e)=>{set_u_role(e.target.value)})}/>
		                </Flex>
						<Flex gap='2' align='center'>
							<Button bg='#009393' color='#fff' onClick={handle_edit_expert}>Edit Expert</Button>
							<Button bg='#fff' color='#000' border='1px solid #000' cursor='pointer' onClick={(()=>{set_is_edit(false)})}>Cancel</Button>
					    </Flex>
					</>
				:
					<>
						<Text fontSize='24px' fontWeight='bold'>{item?.name}</Text>
					  	<Text>Email: {item?.email}</Text>
					    <Text>mobile: {item?.mobile}</Text>
					  	<Text>Role: {item.role}</Text>
						<Text>Description: {item.description}</Text>
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