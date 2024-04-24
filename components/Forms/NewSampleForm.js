// Utils
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useUserContext } from '../Providers/userContext';
// UI
import { Box, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Icon, Image, Input, Select, Text, Textarea, useToast } from '@chakra-ui/react';
import { CiWarning } from 'react-icons/ci';
// Api
import { UseIndustriesSrt } from '../../hooks/industries/useIndustriesSrt';
import { UseTechnologiesSrt } from '../../hooks/technology/useTechnologiesSrt';
import NewSample from '../../pages/api/call_to_action/sample.api';


export default function NewSampleForm({prod_data,view_drawer_disclosure}) {
    const {user} = useUserContext();
    const toast = useToast();
    const schema = yup.object({
        number_of_samples: yup.number().min(1).required(),
        annual_volume: yup.number().min(1).required(),
        industry: yup.string().required(),
        technology: yup.string().required(),
        description: yup.string().max(200, 'maximum length of 200 characters reached').required(),
        units: yup.string().required(),
        additional_info: yup.string().required().max(200, 'maximum length of 200 characters reached'),
        product_id : yup.string().default(prod_data?._id).required(),
        listed_by_id : yup.string().default(prod_data?.listed_by_id).required(),
        client_id:  yup.string().default(user?._id).required(),
        requester_id: yup.string().default(user?._id).required(),
        supplier_id: yup.string().default(prod_data?.listed_by_id).required(),
        follow_up_date: yup.string().default(''),
        follow_up_remarks: yup.string().default(''),
        follow_up_prospect_status: yup.boolean().default(false),
        follow_up_sampling_period: yup.number().default(0),
        follow_up_sampling_price: yup.number().default(0),
        conversion_client_status: yup.boolean().default(false),
        conversion_client_price: yup.number().default(0),
        conversion_client_date: yup.string().default(''),
        delivery_date: yup.string().default(''),
        delivery_remarks: yup.string().default(''),
        sample_status: yup.boolean().default(true),
        sample_status_stage: yup.string().default('pending'), 
        sample_status_comment: yup.string().default(''), 
        deletion_status: yup.boolean().default(false),
        client_notification_Status: yup.boolean().default(false),
        supplier_notification_Status: yup.boolean().default(false),
    }).required();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [industries_data, set_industries_data]=useState([]);
    const [technologies_data, set_technologies_data]=useState([]);

    useEffect(()=>{
        get_Technologies_Data()
    },[])
    useEffect(()=>{
        get_Industries_Data()
    },[])

	async function get_Industries_Data(){
		let data = await UseIndustriesSrt();
		set_industries_data(data)
	}

	async function get_Technologies_Data(){
		let data = await UseTechnologiesSrt();
		set_technologies_data(data)
	}
    const onSubmit=async(data)=>{
        console.log(data)
        if (!user){
            toast({title:'Warning!',description:'You need to be signed in to request a sample',status:'warning',position:'top-left-accent',variant:'left-accent',isClosable:true})
            return ;
        }
        await NewSample(data).then(()=>{
            toast({title:'Success!',description:'Your request has been sent!',status:'success',position:'top-left-accent',variant:'left-accent',isClosable:true})
            view_drawer_disclosure.onClose();
            return;
        }).catch((err)=>{
            toast({title:'Error!',description:'Something went wrong when submitting your request!',status:'success',position:'top-left-accent',variant:'left-accent',isClosable:true})
            return ;
        })
    }
    return (
        <Box>
            {!user && 
                (
                    <HStack color='red.400' bg='red.200' borderRadius={'md'} p='2' mt='2' align={'center'}>
                        <Icon as={CiWarning} boxSize='4'/>
                        <Text>You need to be signed in to request a sample</Text>
                    </HStack>
                )
            }
            <HStack borderRadius={10} bg='#eee' p='2' my='2'>
                <Image src='../Pro.png' boxSize={'50'} alt='image'/>
                <Text>{prod_data?.name_of_product}</Text>
            </HStack>
            <Divider />
            <form onClick={handleSubmit(onSubmit)}>
                <FormControl mt='2' isRequired>
                    <FormLabel my='2' fontWeight={'bold'}>Number of samples</FormLabel>
                    <Input {...register("number_of_samples")} placeholder='e.g 1' type='number'/>
                    {errors.number_of_samples && (<FormErrorMessage>{errors.number_of_samples.message}</FormErrorMessage>)}
                </FormControl>
                <Flex mt='2' gap='2' flexDirection={{base:'column',md:'row'}}>
                    <FormControl isRequired>
                        <FormLabel my='2' fontWeight={'bold'}>Industry</FormLabel>
                        <Select {...register("industry")} placeholder='Select your market'>
                            {industries_data?.map((item)=>{
                                return(
                                    <option key={item?._id} value={item?.title}>{item?.title}</option>
                                )
                            })}
                        </Select>
                        {errors.industry && (<FormErrorMessage>{errors.industry.message}</FormErrorMessage>)}
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel my='2' fontWeight={'bold'}>Technology</FormLabel>
                        <Select {...register("technology")} placeholder='Select your application'>
                            {technologies_data?.map((item)=>{
                                return(
                                    <option key={item?._id} value={item?.title}>{item?.title}</option>
                                )
                            })}
                        </Select>
                        {errors.technology && (<FormErrorMessage>{errors.technology.message}</FormErrorMessage>)}
                    </FormControl>
                </Flex>
                <Box py='2'>
                    <FormControl isRequired>
                        <FormLabel my='2' fontWeight={'bold'}>Expected Annual Volume</FormLabel>
                        <Text my='2' fontSize={'md'} color='gray.300'>The quantity your business will require annually.</Text>
                        <Flex w='full' gap='2' my='2'>
                            <Input {...register("annual_volume")} type='number' variant='outline' placeholder='Expected Annual Volume e.g 2000' flex='1'/>
                            {errors.annual_volume && (<FormErrorMessage>{errors.annual_volume.message}</FormErrorMessage>)}
                            <Select placeholder='Units' {...register("units")} w='20%'>
                                <option value={'Kg'}>Kg</option>
                                <option value={'Lb'}>Lb</option>
                                <option value={'Gal'}>Gal</option>
                                <option value={'L'}>L</option>
                            </Select>
                            {errors.units && (<FormErrorMessage>{errors.units.message}</FormErrorMessage>)}
                        </Flex>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel my='2' fontWeight={'bold'}>Intended Use</FormLabel>
                        <Textarea my='2' placeholder='How does your business intend to use this product?' {...register("description")} type='text'/>
                        {errors.description && (<FormErrorMessage>{errors.description.message}</FormErrorMessage>)}
                    </FormControl>
                    <FormControl>
                        <FormLabel my='2' fontWeight={'bold'}>Note to supplier</FormLabel>
                        <Textarea my='2' placeholder='Additional infomation for the supplier?' {...register("additional_info")} type='text'/>
                        {errors.additional_info && (<FormErrorMessage>{errors.additional_info.message}</FormErrorMessage>)}
                    </FormControl>
                </Box>
                <HStack spacing='2'>
                    {isSubmitting ? 
                        <Button isLoading loadingText='submitting ...' colorScheme='teal'/> : 
                        <Button isDisabled={isSubmitting} colorScheme='teal' type='submit'> Submit Request</Button> 
                    }
                    <Button ml='2' variant='outline' mr={3} onClick={view_drawer_disclosure?.onClose}>
                        Close
                    </Button>
                </HStack>
            </form>
        </Box>
    )
};