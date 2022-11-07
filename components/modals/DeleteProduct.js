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

function DeleteProductModal({isdeleteproductModalvisible,setisdeleteProductModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();

    const HandleModalOpen=()=>{
      if(isdeleteproductModalvisible !== true){
      }else{
        onOpen();
        setisdeleteProductModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isdeleteproductModalvisible])

    const [body,setBody]=useState('')
    const HandleDelete=()=>{
		onClose();    	
    	alert('deleting')
    }
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>
              	<Text>Delete Product</Text>
              </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Stack spacing={2}>
            	<Text>Are you sure you want to remove this product?</Text>
            	<Text>By clicking <span style={{color:'red',fontSize:'20px'}}>Delete</span> you Confirm to delete this product.</Text>
            	<Text>Deleted Products will be permanently be removed.</Text>
                <Flex gap='2' w='100%'>
					<Button bg='red' w='50%' color='#fff' onClick={HandleDelete}>Delete</Button>
					<Button flex='1' border='1px solid #009393' bg='#fff' onClick={(()=>{onClose()})}>Cancel</Button>
				</Flex>
			</Stack>
                        </ModalBody>
                    </ModalContent>
                    </Modal>
                </>
      )
}   

export default DeleteProductModal;


