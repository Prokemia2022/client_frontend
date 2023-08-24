import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Text,
    Button,
    Box,
    Divider,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Textarea,
    Select,
    HStack,
    useToast,
  } from '@chakra-ui/react';

import {storage} from '../firebase';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import { v4 } from "uuid";

import Cookies from 'universal-cookie';

//api
import Apply_To_Vacancy from '../../pages/api/control/apply_to_vacancy';

export default function Apply_to_career_modal({applytoCareer_integrations,career}) {
    const cookies = new Cookies();
    const toast = useToast();
    
    const [name,set_name]=useState('');
    const [address,set_address]=useState('');
    const [gender,set_gender]=useState('');
    const [email,set_email]=useState('');
    const [mobile,set_mobile]=useState('');
    const [cover_head,set_cover_head]=useState('');
    const [resume,set_resume]=useState('');
    const [linkedInUrl,set_linkedInUrl]=useState('');

    const upload_file_function=async()=>{
		/**handles uploads file functions to firebase storage**/
        const pattern="^http(s)?:\/\/(www)?\.linkedin\.com\/in\/.*$";
        if (!linkedInUrl.match(pattern)) {
            toast({
				title: 'Invalid linked in link.',
				description: 'Ensure you use the right format for your linked in profile',
				status: 'info',
				isClosable: true,
			});
            return ;
        }
		if (resume == '' || name == '' || gender == '' || email == '' || cover_head == '' || linkedInUrl == ''){
            set_input_error(true);
			toast({
				title: '',
				description: 'Missing file details',
				status: 'info',
				isClosable: true,
			});
            return ;
		}else{
			await handle_file_upload().then((res)=>{
				if (res == null || res == undefined || !res){
                    set_input_error(true);
					return;
				}else{
					const payload = {
						career_id: career?._id,
                        career_title: career?.title,
                        career_description: career?.description,
                        name,
                        address,
                        gender,
                        email,
                        mobile,
                        cover_head,
                        linkedInUrl,
						resume_url: res
					}
                    
					Apply_To_Vacancy(payload).then(()=>{
						toast({
							title: '',
							description: 'successfuly applied to this career',
							status: 'success',
							isClosable: true,
						});
					}).then(()=>{
                        Clear_Inputs()
                        applytoCareer_integrations.onClose()
						set_input_error(false)
					}).catch((err)=>{
                        console.log(err)
						toast({
							title: '',
							description: `error while applying to this career`,
							status: 'error',
							isClosable: true,
						});
					})
				}
			})
		}
	}

	const handle_file_upload=async()=>{
		/**uploads profile image to firebase storage**/
        console.log(resume?.name)
		if (resume.name == undefined){
			toast({
				title: 'upload process cancelled',
				description: 'could not find file selected',
				status: 'info',
				isClosable: true,
			});
			return;
		}else{
			console.log(resume.name)
			const resume_documentRef = ref(storage, `resume/${resume?.name + v4()}`);
			const snapshot= await uploadBytes(resume_documentRef,resume)
			const file_url = await getDownloadURL(snapshot.ref)
			cookies.set('resume_url', file_url, { path: '/' });
			return file_url
		}
	}

    //input error handlers
    const [input_error,set_input_error]=useState(false);

    const Clear_Inputs=()=>{
        set_name('');
        set_mobile('');
        set_address('');
        set_cover_head('');
        set_email('');
        set_gender('');
        set_resume('');
        set_linkedInUrl('');
    }
  return (
    <Modal 
        isOpen={applytoCareer_integrations?.isOpen}
        onClose={applytoCareer_integrations?.onClose}
        isCentered
    >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                <Text fontWeight={'bold'} fontSize={'lg'} color='#009393'>Personal Information</Text>
                <Divider/>
                <HStack mt='1'>
                    <FormControl isRequired isInvalid={input_error && name == '' ? true : false}>
                        <FormLabel>Name</FormLabel>
                        <Input value={name} placeholder='Your official name' type='text' onChange={((e)=>{set_name(e.target.value)})}/>
                        {input_error && name == '' ? 
                            <FormErrorMessage>You need to provide your name.</FormErrorMessage>
                            : (
                            null
                        )}
                    </FormControl>
                    <FormControl isRequired isInvalid={input_error && mobile == '' ? true : false}>
                        <FormLabel>Mobile</FormLabel>
                        <Input value={mobile} placeholder='Your official mobile' type='tel' onChange={((e)=>{set_mobile(e.target.value)})}/>
                        {input_error && mobile == '' ? 
                            <FormErrorMessage>You need to provide your mobile.</FormErrorMessage>
                            : (
                            null
                        )}
                    </FormControl>
                </HStack>
                <FormControl mt='2' isRequired isInvalid={input_error && email == '' ? true : false}>
                    <FormLabel>Email</FormLabel>
                    <Input value={email} placeholder='Your official email' type='email' onChange={((e)=>{set_email(e.target.value)})}/>
                    {input_error && email == '' ? 
                        <FormErrorMessage>You need to provide your email.</FormErrorMessage>
                        : (
                        null
                    )}
                </FormControl>
                <FormControl mt='2' isRequired isInvalid={input_error && address == '' ? true : false}>
                    <FormLabel>Address</FormLabel>
                    <Input value={address} type='text' placeholder='your address' onChange={((e)=>{set_address(e.target.value)})}/>
                    {input_error && address == '' ? 
                        <FormErrorMessage>An address is required.</FormErrorMessage>
                        : (
                        null
                    )}
                </FormControl>
                <FormControl mt='2' isRequired isInvalid={input_error && gender == '' ? true : false}>
                    <FormLabel>Gender</FormLabel>
                    <Select placeholder='Select your gender' onChange={((e)=>{set_gender(e.target.value)})}>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                        <option value='i would rather not say'>I would rather not say</option>
                    </Select>
                    {input_error && gender == '' ? 
                        <FormErrorMessage>Your gender is required.</FormErrorMessage>
                        : (
                        null
                    )}
                </FormControl>                
                <FormControl mt='2' isRequired isInvalid={input_error && cover_head == '' ? true : false}>
                    <FormLabel>Cover Head</FormLabel>
                    <Textarea value={cover_head} type='text' placeholder='Tell us more about yourself' onChange={((e)=>{set_cover_head(e.target.value)})}/>
                    {input_error && cover_head == '' ? 
                        <FormErrorMessage>A cover_head is required.</FormErrorMessage>
                        : (
                        null
                    )}
                </FormControl>
                <FormControl mt='2' isRequired isInvalid={input_error && linkedInUrl == '' ? true : false}>
                    <FormLabel>Linked in profile link</FormLabel>
                    <Input value={linkedInUrl} type='url' placeholder='your linked in profile' onChange={((e)=>{set_linkedInUrl(e.target.value)})}/>
                    {input_error && linkedInUrl == '' ? 
                        <FormErrorMessage>A valid linkedInUrl is required.</FormErrorMessage>
                        : (
                        null
                    )}
                </FormControl>
                <FormControl mt='2' isRequired isInvalid={input_error && gender == '' ? true : false}>
                    <FormLabel>Upload Your CV/Resume</FormLabel>
                    <Input type='file' p='1' placeholder='your resume' onChange={((e)=>{set_resume(e.target.files[0])})}/>
                    {input_error && gender == '' ? 
                        <FormErrorMessage>Your cv/file is required.</FormErrorMessage>
                        : (
                        null
                    )}
                </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button bg='gray.100' mr={3} onClick={applytoCareer_integrations?.onClose}>
              Close
            </Button>
            <Button colorScheme='teal' onClick={upload_file_function}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}
