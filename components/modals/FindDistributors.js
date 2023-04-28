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
    Textarea,
    Input,
    Stack,
    Select,
    useToast,
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import Manufacturer_request from '../../pages/api/auth/manufacturer/manufacturer_request.js';
import Get_Technologies from '../../pages/api/control/get_technologies'
import Get_Industries from '../../pages/api/control/get_industries';

export default function FindDistributors({isfinddistributorModalvisible,setisfinddistributorModalvisible,manufacturer_data}){
  /**
   * Modal function to submmit requests made by manufacturers looking for distributors in a particular region or one that meet specific requirements.
   * Props:
   *      isfinddistributorModalvisible(Boolean): handles visibility of the modal.
   *      setisfinddistributorModalvisible(Boolean): handles visibility of the modal.
   *      manufacturer_data(object): data from the current manufacturer user. 
   */
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const HandleModalOpen=()=>{
      /**
       * Handles the visibility of the modal.
       * Props:
       *      isfinddistributorModalvisible (boolean): states for handling the visibilty.
       *      setisfinddistributorModalvisible (boolean): states for handling the visibilty.     
       */
      if(isfinddistributorModalvisible === true){
        onOpen();
        setisfinddistributorModalvisible(false);
      }
    }

    useEffect(()=>{
      HandleModalOpen();
      get_Industries_Data();
      get_Technology_Data();
    },[isfinddistributorModalvisible])

    const [industry,set_industry]=useState('')
    const [technology,set_technology]=useState('')
    const [region,set_region]=useState('')
    const [description,set_description]=useState('');
    const [industries_data, set_industries_data]=useState([]);
    const [technologies_data, set_technologies_data]=useState([]);


    const payload = {
      _id: manufacturer_data?._id,
      industry,
      technology,
      region,
      description,
      name_of_requester : manufacturer_data?.company_name 
    }

    const get_Industries_Data=async()=>{
      await Get_Industries().then((response)=>{
        const data = response.data
        const result = data.filter(v => v.verification_status);
        set_industries_data(result)
      })
    }
    const get_Technology_Data=async()=>{
      await Get_Technologies().then((response)=>{
        const data = response.data;
        const result = data.filter(v => v.verification_status);
        set_technologies_data(result);
      })
    }

    const Submit_Request_Handler=async()=>{
      /**
       * Function to submit request.
       * payload (obj): json data for request payload.
       * Returns:
       *        an alert dialog box to show a success otherwise notifies of an error.
       * Finally:
       *        Closes the modal and cleans the input data states.
       */
      if (!industry || !technology || !region || !description) {
        return toast({
          title: 'All inputs are required.',
          description: ``,
          status: 'info',
          isClosable: true,
        });
      }else {
        await Manufacturer_request(payload).then(()=>{
          toast({
            title: '',
            description: `Request has been submitted successfully.`,
            status: 'success',
            isClosable: true,
          });
        }).catch((err)=>{
          toast({
            title: 'Could not submit your request.',
            description: err.response.data,
            status: 'error',
            isClosable: true,
          });
          //console.log(err.response.data);
        }).finally(()=>{
          set_description('');
          set_industry('');
          set_region('');
          set_technology('');
          onClose();
        });
      }
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
              <Flex gap='1'>
							<Flex direction='column' gap='2' flex='1'>
								<Text fontFamily='ClearSans-Bold'>Industry</Text>
								<Select variant='filled' placeholder='Select Industry' onChange={((e)=>{set_industry(e.target.value)})}>
									{industries_data?.map((item)=>{
											return(
												<option key={item?._id} value={item?.title}>{item?.title}</option>

											)
										})}
						        </Select>
							</Flex>
							<Flex direction='column' gap='2' flex='1'>
								<Text fontFamily='ClearSans-Bold'>Technology</Text>
								<Select variant='filled' placeholder='Select Technology' onChange={((e)=>{set_technology(e.target.value)})}>
									{technologies_data?.map((item)=>{
										return(
											<option key={item?._id} value={item?.title}>{item?.title}</option>

										)
									})}
						        </Select>
							</Flex>
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
								<Button bg='#009393' borderRadius='0' color='#fff' onClick={Submit_Request_Handler}>Submit Request</Button>
							</Stack>
						</ModalBody>
					</ModalContent>
				</Modal>
			</>
      )
}

