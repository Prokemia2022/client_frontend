import { useRef, useState } from "react";
import { Button, Divider, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Icon, IconButton, Input, InputGroup, Select, Text, Textarea, useDisclosure, useToast } from "@chakra-ui/react"
import { IoClose } from "react-icons/io5";
import Suggest_Technology from "../../../pages/api/technologies/route.api";
import Suggest_Industry from "../../../pages/api/industries/route.api";

export default function SuggestMarket() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const btnRef = useRef();
    const [input_error, set_input_error]=useState(false);

    const [title,set_title]=useState('');
    const [description,set_description]=useState('');
    const [market,set_market]=useState('');
    const [is_submitting, set_is_submitting]=useState(false);
  
    const payload = {
      title,
      description
    }
    const ClearInputs=()=>{
      set_description('');
      set_title('');
      set_market('');
      set_input_error(false);
      set_is_submitting(false);
      onClose()
    }
    const Handle_Save=async()=>{
      set_is_submitting(true);
      if (title == '' || description == '' || market == ''){
        toast({title:'Warning!',description:'All required inputs need to be filled', status:'warning',variant:'left-accent',position:'top-left',isClosable:true})
        set_is_submitting(false);
        set_input_error(true)
        return;
      }
      if (market == 'Industry'){
        await Suggest_Industry(payload).then(()=>{
          toast({title:'Success!',description:`${payload.title} has been suggested successfully.`, status:'success',variant:'left-accent',position:'top-left',isClosable:true})
        }).catch((err)=>{
          toast({title:'Error!',description:`${err.response.data}`, status:'warning',variant:'left-accent',position:'top-left',isClosable:true})
        }).finally(()=>{
          ClearInputs()
        })
      }
      if (market == 'Technology'){
        await Suggest_Technology(payload).then(()=>{
          toast({title:'Success!',description:`${payload.title} has been suggested successfully.`, status:'success',variant:'left-accent',position:'top-left',isClosable:true})
        }).catch((err)=>{
          toast({title:'Error!',description:`${err.response.data}`, status:'warning',variant:'left-accent',position:'top-left',isClosable:true})
        }).finally(()=>{
          ClearInputs()
        })
      }
      return ;
    }
  
    return (
      <>
        <Button ref={btnRef} colorScheme='teal' onClick={onOpen} mt='2'>
          Suggest a new market
        </Button>
        <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
          <DrawerOverlay />
          <DrawerContent >
            <DrawerBody position="fixed" top={{  base: "70px",  md: "70px" }} right={'0'} zIndex="sticky" h="calc(100vh - 70px)" bg='#fff' w='full'>
              <Flex justify={'space-between'} align='center' my='4'>
                <Heading as={'h2'} fontSize={'xl'}>Suggest a new market</Heading>
                <IconButton aria-label='close' icon={<IoClose />} size={'sm'} onClick={ClearInputs}/>
              </Flex>
              <Divider />
              <FormControl mt='2' isRequired isInvalid={input_error && market == '' ? true : false} onChange={((e)=>{set_market(e.target.value)})}>
                <FormLabel>Select the type of market</FormLabel>
                <Select placeholder='Select type of market' isRequired>
                  <option value='Industry'>Industry</option>
                  <option value='Technology'>Technology</option>
                </Select>
                {input_error && market == '' ? <FormErrorMessage>The type of market is required.</FormErrorMessage>: (null)}
              </FormControl>
              <FormControl mt='2' isRequired isInvalid={input_error && title == '' ? true : false}>
                <FormLabel>Name of the market</FormLabel>
                <Input type='text' placeholder='Name' variant='filled' required onChange={((e)=>{set_title(e.target.value)})}/>
                {input_error && title == '' ? <FormErrorMessage>Name is required.</FormErrorMessage>: (null)}
              </FormControl>
              <FormControl mt='2' isRequired isInvalid={input_error && description == '' ? true : false}>
                <FormLabel>Description</FormLabel>
                <Textarea placeholder='Tell us more about this market' variant={"filled"} required onChange={((e)=>{set_description(e.target.value)})}/>
                {input_error && description == '' ? <FormErrorMessage>This field is required.</FormErrorMessage>: (null)}
              </FormControl>
              <Flex w='full' my='2'>
                <Button variant='outline' mr={3} onClick={ClearInputs}>
                  Cancel
                </Button>
                {is_submitting? <Button isLoading loadingText="Saving..."/> : <Button colorScheme='teal' onClick={Handle_Save}>Save</Button> }
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )
  }