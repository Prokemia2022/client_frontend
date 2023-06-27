//modules imports
import React,{useState} from 'react'
import {Flex,Text,Button,Input,useToast} from '@chakra-ui/react'
import {useRouter} from 'next/router'
//components imports
import styles from '../styles/Home.module.css'
import Header from '../components/Header.js';
import Loading from '../components/Loading';
//icon imports
//api calls
import Create_Request_Demo_Ticket from './api/control/create_request_demo_ticket';


export default function Request_Demo(){
	//utils
	const router = useRouter();
	const toast = useToast();
	//states
	const [name, set_name] = useState('');
	const [email, set_email] = useState('');
    const [mobile, set_mobile] = useState('');
    const [job_function, set_job_function] = useState('');

	const [is_submitting,set_is_submitting]=useState(false);

	const payload = {
		name,
		mobile,
		email,
        job_function,
	}
	//functions
	const Verify_Inputs=()=>{
		set_is_submitting(true);
		//check if email format is maintained
		const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		if (name && email && mobile && job_function){
			if (!email.match(validRegex)){
                toast({
                    title: 'Could not create a new ticket.',
                    position: 'top-left',
                    variant:"subtle",
                    description: `Use a valid email format e.g example@company.com`,
                    status: 'info',
                    isClosable: true,
                });
                set_is_submitting(false)
				return;
			}else{
				handle_Create_Ticket()
			}
		}else if(!name || !email || !mobile || !job_function){
			toast({
				title: '',
                position: 'top-left',
                variant:"subtle",
				description: 'All inputs are required',
				status: 'info',
				isClosable: true,
			});
            set_is_submitting(false)
		}
	}
	const handle_Create_Ticket=async()=>{
        console.log(payload)
		await Create_Request_Demo_Ticket(payload).then((response)=>{
            console.log(response)
            toast({
                title: 'Ticket has been successfully created',
                position: 'top-left',
                variant:"subtle",
                description: `Our sales representatives will be contacting you soon.`,
                status: 'success',
                isClosable: true,
            });
            clear_Form()
		}).catch((err)=>{
			toast({
				title: '',
				description: `${err.response.data}`,
				status: 'error',
				isClosable: true,
			});
		}).finally(()=>{
            set_is_submitting(false);
            router.push('/')
        })
	}
	const clear_Form=()=>{
        set_email('');
        set_name('');
        set_job_function('');
        set_mobile('');
        set_is_submitting(false)
    }
	return(
		<Flex direction='column'>
			<Header/>
			<Flex className={styles.SignupBody}>
				<Flex className={styles.authSection} gap='2'>
					<Text w='100%' fontSize='2.5rem' color='#fff' fontFamily='ClearSans-bold' >REQUEST A DEMO</Text>
					<Text w='100%' color='#fff' fontWeight='bold'>Find out how to start selling, get market insights and how prokemia can<br/> help improve your sales with our cutting age platform and data insights</Text>
				</Flex>
				<Flex className={styles.authForm} gap='2' direction='column'>
                    <Text w='100%' textAlign='center' fontSize='2rem' fontFamily='ClearSans-bold'>Get a personalised walkthrough of Prokemia</Text>
                        <Flex direction='column' gap='2'>
                            <Text>Company name</Text>
                            <Input type='text' placeholder='company name' variant='filled' required onChange={((e)=>{set_name(e.target.value)})}/>
                        </Flex>
                        <Flex direction='column' gap='2'>
                            <Text>Email of company</Text>
                            <Input type='email of company' placeholder='Email' variant='filled' required onChange={((e)=>{set_email(e.target.value)})}/>
                        </Flex>
                        <Flex direction='column' gap='2'>
                            <Text>Mobile of company</Text>
                            <Input type='tel' placeholder='Mobile of company' variant='filled' required onChange={((e)=>{set_mobile(e.target.value)})}/>
                        </Flex>
                        <Flex direction='column' gap='2'>
                            <Text>Job Function</Text>
                            <Input type='text' placeholder='job_function' variant='filled' required onChange={((e)=>{set_job_function(e.target.value)})}/>
                        </Flex>
                        {is_submitting? 
                            <Button
                                bg='#009393'
                                borderRadius='0' 
                                
                                color='#fff'
                                align='center'
                                
                            >
                                <Loading width='40px' height='40px' color='#ffffff'/>
                                creating a ticket...
                            </Button>
                            :
                                <Button bg='#009393' color='#fff' onClick={Verify_Inputs}>Create Ticket</Button>					
                        }
                        
				</Flex>
			</Flex>				
		</Flex>
	)
}