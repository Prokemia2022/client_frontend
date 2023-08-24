import React, { useEffect, useState } from 'react';
import Navigation from './navigation';
import { 
  Alert, 
  AlertDescription, 
  AlertIcon, 
  AlertTitle, 
  Box,
  useToast 
} from '@chakra-ui/react';

//sections
import Header from '../../components/Header.js';
import Dashboard from './dashboard';
import Product from './product';
import Expert from './experts'
import Manufacturers from './manufacturers';
import Settings from './settings';
import Pricing from './pricing';
import Inventory from './inventory';
//api
import Get_Distributor from '../api/auth/distributor/get_distributor.js';
import Email_Verification from '../api/email_handler/email_verification.js';
//utils
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import { useRouter } from 'next/router';

export default function index() {
    //utils
    const cookies = new Cookies();
    const toast = useToast();
    const router = useRouter()

    const [current_page,set_current_page]=useState('dashboard');
    const [client_data,set_client_data]=useState('');
    const [refresh_data,set_refresh_data]=useState('')
    const token = cookies.get('user_token');

    const [is_complete_profile,set_is_complete_profile]=useState(false)

    const [product_id,set_product_id]=useState('')

    useEffect(()=>{
      if(token){
        const details = jwt_decode(token)
        const payload = {
          email_of_company : details?.email,
          _id: details?.id,
          acc_type: 'distributor'
        }
        get_Data(payload)
      }else if(token == null){
        router.push('/signin')
        toast({
          title: 'Error while fetching your account',
          description: 'You need to sign in again',
          status: 'error',
          variant: 'left-accent',
          position: 'top-left',
          isClosable: true,
        });
      }
    },[refresh_data,current_page,token]);

    const get_Data=async(payload)=>{
      
      await Get_Distributor(payload).then((response)=>{
        
        set_client_data(response.data);
        if (client_data?.address_of_company?.length === 0 || client_data?.mobile_of_company?.length === 0 || client_data?.contact_person_name?.length === 0 || client_data?.description?.length === 0){
          set_is_complete_profile(true)
        }else{
          set_is_complete_profile(false)
        }
      }).catch((err)=>{
        toast({
          title: 'Error while fetching your account',
          description: err.response.data,
          status: 'error',
          variant: 'subtle',
          isClosable: true,
        });
      })
    }

    const Generate_Code=async()=>{
      /**
       * Generates a random code sent to client.
       * Returns:
       * 			sets the code to cookies.
       * 			returns the code.
       */
        const characters = '0123456789';
        let result = ''
        const charactersLength = characters.length
  
        for (let i = 0;i<6;i++){
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        cookies.set('verification_code', result, { path: '/' });
        return result;
      }
      
    
    const Handle_Email_Verification=async()=>{
      /**
       * Handle_Email_Verification: handles the sending of the code to the client.
       * Props:
       * 		code (string): contains the code sent.
       * 		email_payload (obj): payload sent to the api call.
       */
      const code = await Generate_Code()
      const email_payload={
        email: client_data.email_of_company,
        code: code,
        link: `https://prokemia.com/verify/${'distributor'}/${client_data._id}`
      }
      await Email_Verification(email_payload).then(()=>{
        router.push(`/verify/${'distributor'}/${client_data._id}`)
      }).catch((err)=>{
        
        toast({
          title: '',
          description: `error while verifying your account.`,
          status: 'error',
          isClosable: true,
        });
      });
    }
  return (
    <Box>
      <Header/>
      <Navigation set_current_page={set_current_page} current_page={current_page}>
          {client_data?.suspension_status && client_data?.verification_status ? 
            <Alert status='error' mb='2'>
              <AlertIcon />
              <AlertTitle>Your account has been suspended!</AlertTitle>
              <AlertDescription>contact our support at help@prokemia.com for any assistance.</AlertDescription>
            </Alert>
            :
            null
          }
          {!client_data?.valid_email_status && client_data?.verification_status ? 
            <Box onClick={Handle_Email_Verification}>
              <Alert status='info' mb='2' >
                <AlertIcon />
                <AlertTitle>You have not verified your email!</AlertTitle>
                <AlertDescription>click to verify your email.</AlertDescription>
              </Alert>
            </Box>
            
            :
            null
          }
          {!client_data?.verification_status ?
            <Alert status='warning' mb='2'>
              <AlertIcon />
              <AlertTitle>Your account has been not been approved!</AlertTitle>
              <AlertDescription>contact our support at help@prokemia.com for any assistance.</AlertDescription>
            </Alert>
            :
            null
          }
          {is_complete_profile && client_data?.valid_email_status && client_data?.verification_status && !client_data?.suspension_status?
            <Box>
              <Alert status='info' mb='2' onClick={(()=>{set_current_page('settings')})}>
                <AlertIcon />
                <AlertTitle>You profile seems to be incomplete!</AlertTitle>
                <AlertDescription>click me to complete it</AlertDescription>
              </Alert>
            </Box>
            :
            null
          }
          <Body current_page={current_page} client_data={client_data} set_product_id={set_product_id} product_id={product_id} set_current_page={set_current_page} set_refresh_data={set_refresh_data} is_complete_profile={is_complete_profile}/>
      </Navigation>
    </Box>
  )
}

const Body=(props)=>{
  const {current_page,client_data,product_id,set_current_page,set_product_id,set_refresh_data,is_complete_profile}={...props}
  if (current_page == 'dashboard'){
      return (
        <Dashboard client_data={client_data} set_current_page={set_current_page}/>
      )
  }else if (current_page == 'product'){
      return (
        <Product 
          is_verified={client_data?.verification_status}
          is_subscribed={client_data?.subscribed}
          is_suspended={client_data?.suspension_status}
          lister_id={client_data?._id} 
          product_id={product_id} 
          set_current_page={set_current_page} 
          set_product_id={set_product_id}
        />
      )
  }else if (current_page == 'experts'){
      return (
        <Expert client_data={client_data} set_refresh_data={set_refresh_data} set_current_page={set_current_page}/>
      )
  }else if (current_page == 'manufacturers'){
    return (
      <Manufacturers client_data={client_data} set_refresh_data={set_refresh_data} set_current_page={set_current_page}/>
    )
  }else if (current_page == 'inventory'){
      return(
        <Inventory
          email={client_data?.email_of_company} 
          company_name={client_data?.company_name} 
          lister_id={client_data?._id} 
          set_product_id={set_product_id} 
          set_current_page={set_current_page}
          is_verified={client_data?.verification_status}
          is_suspended={client_data?.suspension_status}
          set_refresh_data={set_refresh_data}
        />
      )
  }else if (current_page == 'settings'){
    return(
      <Settings client_data={client_data} set_refresh_data={set_refresh_data} is_complete_profile={is_complete_profile}/>
    )
  }else if (current_page == 'pricing'){
    return(
      <Pricing />
    )
  }else{
    return(
      <Dashboard client_data={client_data} set_current_page={set_current_page}/>
    )
  }
        
}