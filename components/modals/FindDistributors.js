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
    Center,
    Textarea,
    Input,
    Select,
    InputGroup,Heading,
    Stack,
    useToast,
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import Manufacturer_request from '../../pages/api/auth/manufacturer/manufacturer_request.js'

function FindDistributors({isfinddistributorModalvisible,setisfinddistributorModalvisible,manufacturer_data,id}){
    const { isOpen, onOpen, onClose } = useDisclosure();

    const HandleModalOpen=()=>{
      if(isfinddistributorModalvisible !== true){
      }else{
        onOpen();
        setisfinddistributorModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isfinddistributorModalvisible])

    const [industry,set_industry]=useState('')
    const [technology,set_technology]=useState('')
    const [region,set_region]=useState('')
    const [description,set_description]=useState('')

    const payload = {
      _id: id,
      industry,
      technology,
      region,
      description,
      name_of_requester : manufacturer_data.company_name 
    }

    const handle_make_request=()=>{
      console.log(payload)
      Manufacturer_request(payload).then(()=>{
        alert('success')
        setisfinddistributorModalvisible(true)
      })
    }

    return (
			<>
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>
							<Text>Tell us a little bit more of who you are looking for?</Text>
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Stack spacing={4}>
								<Flex direction='column'>
									<Text>Type of Industry</Text>
									<Select variant='filled' placeholder='Select Industry' onChange={((e)=>{set_industry(e.target.value)})}>
										<option value='personalcare'>Personal Care</option>
										<option value='hi&i'>H I & I</option>
										<option value='building&construction'>Building and Construction</option>
										<option value='food&nutrition'>Food and Nutrition</option>
									</Select>
								</Flex>
								<Flex direction='column'>
									<Text>Type of Technology</Text>
									<Select variant='filled' placeholder='Select Technology' onChange={((e)=>{set_technology(e.target.value)})}>
										<option value='pharmaceuticals'>Pharmaceuticals</option>
										<option value='cosmetics'>Cosmetics</option>
									</Select>
								</Flex>
								<Flex direction='column'>
									<Text>Region/Area</Text>
									<Select variant='filled' placeholder='Select Technology' onChange={((e)=>{set_region(e.target.value)})}>
										<option value='eastafrica'>EastAfrica</option>
										<option value='southafrica'>SouthAfrica</option>
									</Select>
								</Flex>
								<Flex direction='column'>
									<Text>Description</Text>
									<Textarea variant='filled' placeholder='describe and leave a note for us' onChange={((e)=>{set_description(e.target.value)})}/>
								</Flex>
								<Button bg='#009393' borderRadius='0' color='#fff' onClick={handle_make_request}>Submit Form</Button>
							</Stack>
						</ModalBody>
					</ModalContent>
				</Modal>
			</>
      )
}   

export default FindDistributors;

