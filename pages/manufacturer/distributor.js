import React,{useState} from 'react'
import {Flex,Text,Input,Button,useToast} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import AddNewDistributor from '../../components/modals/addNewDistributor.js';
import FindDistributors from '../../components/modals/FindDistributors.js';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Delete_Distributor_Manufacturer from '../api/auth/manufacturer/delete_distributor.js'
import Edit_Distributor_Manufacturer from '../api/auth/manufacturer/edit_distributor.js'

function Distributors({manufacturer_data,set_refresh_data}){
	const router = useRouter();
	const [isaddnewdistributorModalvisible,setisaddnewdistributorModalvisible]=useState(false);
	const [isfinddistributorModalvisible,setisfinddistributorModalvisible]=useState(false);
	const [infoactive,setinfoActive]=useState(true);
	//const [distributors,set_distributors]=useState(manufacturer_data?.distributors)
	const distributors = manufacturer_data?.distributors
	//console.log(distributors)
	const id = manufacturer_data?._id

	return(
		<Flex direction='column' gap='2' p='2' w='100%'  overflowY='scroll' h='100vh'>
			<AddNewDistributor set_refresh_data={set_refresh_data} isaddnewdistributorModalvisible={isaddnewdistributorModalvisible} setisaddnewdistributorModalvisible={setisaddnewdistributorModalvisible} id={id}/>
			<FindDistributors isfinddistributorModalvisible={isfinddistributorModalvisible} setisfinddistributorModalvisible={setisfinddistributorModalvisible} id={id} manufacturer_data={manufacturer_data}/>
			<Text fontSize='32px' fontWeight='bold'>Distributors</Text>
			
			{distributors?.length === 0 ?
					<Flex justify='center' align='center' h='40vh' direction='column' gap='2'>
						<Text>You have not listed any distributors</Text>
						{infoactive? 
							<Flex direction='column'>
								<Text fontSize='12px' fontWeight='bold' color='#009393'>Find Distributors around a specific region to help deliver and market your product</Text>
								<Text fontSize='12px' fontWeight='bold' color='#009393'>Fill out a form and we will help you expand your borders.</Text>
							</Flex>
								 : null}
						<Flex gap='2'>
							<Flex position='relative' align='center' gap='2'> 
								<HelpOutlineOutlinedIcon onClick={(()=>{setinfoActive(!infoactive)})}/>
								<Button onClick={(()=>{setisfinddistributorModalvisible(true)})}>Look for Distributors </Button>
							</Flex>
							<Button flex='1' bg='#009393' color='#fff' onClick={(()=>{setisaddnewdistributorModalvisible(true)})}>Add new Distributor</Button>
						</Flex>
					</Flex>
				:
				<Flex direction='column' p='1' gap='2'>
					{infoactive? 
					<Flex direction='column'>
						<Text fontSize='12px' fontWeight='bold' color='#009393'>Find Distributors around a specific region to help deliver and market your product</Text>
						<Text fontSize='12px' fontWeight='bold' color='#009393'>Fill out a form and we will help you expand your borders.</Text>
					</Flex>
					: null
					}
					<Flex gap='2'>
						<Flex position='relative' align='center' gap='2'> 
							<HelpOutlineOutlinedIcon onClick={(()=>{setinfoActive(!infoactive)})}/>
							<Button onClick={(()=>{setisfinddistributorModalvisible(true)})}>Look for Distributors </Button>
						</Flex>
						<Button flex='1' bg='#009393' color='#fff' onClick={(()=>{setisaddnewdistributorModalvisible(true)})}>Add new Distributor</Button>
					</Flex>
					{distributors?.map((item)=>{
						return(
							<Distributor item={item} key={item._id} id={manufacturer_data._id} set_refresh_data={set_refresh_data}/>
						)
					})}
				</Flex>
			}
		</Flex>
	)
}

export default Distributors;

const Distributor=({item,id,index,set_refresh_data})=>{
	const toast = useToast()
	const [is_verify,set_is_verify]=useState(false);
	const [is_edit,set_is_edit]=useState(false);
	const [u_name,set_u_name]=useState(item?.name)
	const [u_email,set_u_email]=useState(item?.email)
	const [u_mobile,set_u_mobile]=useState(item?.mobile)
	const [u_industry,set_u_industry]=useState(item?.industry);

	const payload = {
		name : item?.name,
		_id : id
	}
	const handle_delete_distributor=async()=>{
		await Delete_Distributor_Manufacturer(payload).then(()=>{
			toast({
				title: '',
				description: `${payload.name} has been removed successfully`,
				status: 'success',
				isClosable: true,
			});
			set_refresh_data(`deleted ${payload.name}`)
		}).catch((err)=>{
			toast({
				title: '',
				description: `${err.response.data}`,
				status: 'error',
				isClosable: true,
			});
		})
	}

	const handle_edit_distributor=async()=>{
		const edit_payload = {
			_id : id,
			prev_name: item?.name,
			name : u_name,
			email: u_email,
			mobile: u_mobile,
			industry: u_industry
		}
		//console.log(edit_payload)
		await Edit_Distributor_Manufacturer(edit_payload).then(()=>{
			toast({
				title: '',
				description: `${payload.name} has been edited successfully`,
				status: 'success',
				isClosable: true,
			});
			set_refresh_data(`edited ${payload.name}`)
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
					<Text color='grey'>Are you sure you want to remove this distributor?</Text>
					<Flex gap='2'>						
						<Button bg='#fff' border='1px solid red' color='red' cursor='pointer' onClick={handle_delete_distributor}>Remove Distributor</Button>
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
								<Text>Industries the distributor specializes in</Text>
								<Input type='text' placeholder={item?.industry} variant='filled' onChange={((e)=>{set_u_industry(e.target.value)})}/>
							</Flex>
							<Flex gap='2' align='center'>
								<Button bg='#009393' color='#fff' onClick={handle_edit_distributor}>Edit Distributor</Button>
								<Button bg='#fff' color='#000' border='1px solid #000' cursor='pointer' onClick={(()=>{set_is_edit(false)})}>Cancel</Button>
						    </Flex>
						</>
					:
						<>
							<Text fontSize='24px' fontWeight='bold'>{item?.name}</Text>
						  	<Text>Email: {item?.email}</Text>
						    <Text>mobile: {item?.mobile}</Text>
						  	<Text>Industry:{item?.industry}</Text>
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