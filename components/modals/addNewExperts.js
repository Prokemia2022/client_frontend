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

function AddNewExpertsModal({isaddnewexpertModalvisible,setisaddNewExpertModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();

    const HandleModalOpen=()=>{
      if(isaddnewexpertModalvisible !== true){
      }else{
        onOpen();
        setisaddNewExpertModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isaddnewexpertModalvisible])

    const [body,setBody]=useState('')

    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>
              	<Text>Add new Expert</Text>
              </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Stack spacing={4}>
                <Flex direction='column'>
					<Text>Name</Text>
					<Input type='text' placeholder='Name of Expert' variant='filled'/>
				</Flex>
				<Flex direction='column'>
					<Text>Email:</Text>
					<Input type='Email' placeholder='Email' variant='filled'/>
				</Flex>
        <Flex direction='column'>
          <Text>Position/Role</Text>
          <Input type='text' placeholder='Position' variant='filled'/>
        </Flex>
				<Flex direction='column'>
					<Text>Mobile</Text>
					<Input type='tel' placeholder='Mobile' variant='filled'/>
				</Flex>
                <Button bg='#009393' borderRadius='0' color='#fff'>Add new Expert</Button>
			</Stack>
                        </ModalBody>
                    </ModalContent>
                    </Modal>
                </>
      )
}   

export default AddNewExpertsModal;