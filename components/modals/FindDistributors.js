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

function FindDistributors({isfinddistributorModalvisible,setisfinddistributorModalvisible}){
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

    const [body,setBody]=useState('')

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
									<Select variant='filled' placeholder='Select Industry'>
										<option value='personalcare'>Personal Care</option>
										<option value='hi&i'>H I & I</option>
										<option value='building&construction'>Building and Construction</option>
										<option value='food&nutrition'>Food and Nutrition</option>
									</Select>
								</Flex>
								<Flex direction='column'>
									<Text>Type of Technology</Text>
									<Select variant='filled' placeholder='Select Technology'>
										<option value='pharmaceuticals'>Pharmaceuticals</option>
										<option value='cosmetics'>Cosmetics</option>
									</Select>
								</Flex>
								<Flex direction='column'>
									<Text>Region/Area</Text>
									<Select variant='filled' placeholder='Select Technology'>
										<option value='eastafrica'>EastAfrica</option>
										<option value='southafrica'>SouthAfrica</option>
									</Select>
								</Flex>
								<Button bg='#009393' borderRadius='0' color='#fff'>Submit Form</Button>
							</Stack>
						</ModalBody>
					</ModalContent>
				</Modal>
			</>
      )
}   

export default FindDistributors;

