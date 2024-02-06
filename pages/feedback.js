import React,{useEffect, useState} from 'react';
import {Flex,Heading,Text,Button,Input,Textarea,useToast} from '@chakra-ui/react';
import styles from '../styles/Feedback.module.css';
import Create_Feedback from './api/control/create_feedback.js'
import { MdStarRate,MdAccountCircle } from "react-icons/md";
import Get_Feedback from './api/control/get_feedbacks.js'

export default function Feedback(){
	const [active, setActive] = useState(false);
  	const toast = useToast();
  	
  	const [name,setname]=useState('');
  	const [email,setemail]=useState('');
  	const [message,setmessage]=useState('');
  	const [rate,set_rate]=useState(5);
	const [feedback_data,set_feedback_data]=useState([]);

	const payload = {
		name,
		email,
		feedback:message,
		rate
	}

	const Handle_Create_Feedback=async()=>{
		const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  		if (!email.match(validRegex)){
  			toast({
				title: '',
				description: 'Use a valid email format e.g example@company.com',
				status: 'info',
				isClosable: true,
			});
			return;
  		}else if(payload.name === '' || payload.email === '' || payload.feedback === ''){
			toast({
				title: '',
				description: `All inputs are required`,
				status: 'info',
				isClosable: true,
			  });
			  return 0;
		}else{
	  		//console.log(payload)
			await Create_Feedback(payload).then((response)=>{
				toast({
		          title: '',
		          description: `your feedback has been submitted`,
		          status: 'info',
		          isClosable: true,
		        });
				clear_inputs()
				setActive(false)
			}).catch((err)=>{
				toast({
		          title: '',
		          description: `Could not submit your feedback. Try again.`,
		          status: 'error',
		          isClosable: true,
		        });
			})
	  	}
	}
	const clear_inputs=()=>{
		setname('');
		setemail('');
		setmessage('');
		set_rate(5)
	}
	function shuffle(array) {
		let currentIndex = array.length,  randomIndex;
	  
		// While there remain elements to shuffle.
		while (currentIndex != 0) {
	  
		  // Pick a remaining element.
		  randomIndex = Math.floor(Math.random() * currentIndex);
		  currentIndex--;
	  
		  // And swap it with the current element.
		  [array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
		}
	  
		return array;
	  }
	const handle_get_feedbacks=async()=>{
		await Get_Feedback().then((res)=>{
			//console.log(res.data);
			const shuffled_data = shuffle(res.data);
			set_feedback_data(shuffled_data)
		})
	}
	useEffect(()=>{
		handle_get_feedbacks()
	},[])

	
	return(
		<Flex direction='column'>
			<Flex className={styles.feedback_body} gap='2'>
			{active?
				<Flex className={styles.feedback_form_body} >
					<Flex gap='2' direction='column' bg={'#fff'} margin={'auto'} p='4' borderRadius={'5'}>
						<Text fontSize='2.5rem' fontFamily='ClearSans-bold'>Leave us a feedback</Text>
						<Flex direction='column' gap='2'>
							<Text fontWeight='bold'>Full Name</Text>
							<Input type='text' placeholder='name' variant='filled' onChange={((e)=>{setname(e.target.value)})}/>
						</Flex>
						<Flex direction='column' gap='2'>
							<Text fontWeight='bold'>Email</Text>
							<Input type='email' placeholder='Email' variant='filled' onChange={((e)=>{setemail(e.target.value)})}/>
						</Flex>
						<Flex direction='column' gap='2'>
							<Text fontWeight='bold'>Message</Text>
							<Textarea type='text' maxLength="200" placeholder='comment on your message, 200words' variant='filled' onChange={((e)=>{setmessage(e.target.value)})}/>
						</Flex>
						<Flex direction='column' gap='2'>
							<Text fontWeight='bold'>Rate Us</Text>
							<Flex gap='2'>
								<Text fontWeight='bold' w='30px' borderRadius='5' border='1px solid #000' p='2' cursor='pointer' bg={rate === 1? "#009393" : '#fff'} color={rate === 1? "gold" : '#000'} onClick={(()=>{set_rate(1)})}>1</Text>
								<Text fontWeight='bold' w='30px' borderRadius='5' border='1px solid #000' p='2' cursor='pointer' bg={rate === 2? "#009393" : '#fff'} color={rate === 2? "gold" : '#000'} onClick={(()=>{set_rate(2)})}>2</Text>
								<Text fontWeight='bold' w='30px' borderRadius='5' border='1px solid #000' p='2' cursor='pointer' bg={rate === 3? "#009393" : '#fff'} color={rate === 3? "gold" : '#000'} onClick={(()=>{set_rate(3)})}>3</Text>
								<Text fontWeight='bold' w='30px' borderRadius='5' border='1px solid #000' p='2' cursor='pointer' bg={rate === 4? "#009393" : '#fff'} color={rate === 4? "gold" : '#000'} onClick={(()=>{set_rate(4)})}>4</Text>
								<Text fontWeight='bold' w='30px' borderRadius='5' border='1px solid #000' p='2' cursor='pointer' bg={rate === 5? "#009393" : '#fff'} color={rate === 5? "gold" : '#000'} onClick={(()=>{set_rate(5)})}>5</Text>

							</Flex>
						</Flex>
						<Button bg='#009393' color='#fff' onClick={Handle_Create_Feedback}>Submit Feedback</Button>
						<Button border='1px solid red' color='#000' onClick={(()=>{setActive(false);clear_inputs()})}>Cancel</Button>
					</Flex>
				</Flex>	
			:
				<Flex className={styles.feedback_info_body} gap='2'>
					<Flex direction={'column'} className={styles.feedback_title} gap='2'>
						<Heading as='h2'>What Our Clients say<br/> about us</Heading>
						<Text>We value feedback, view experiences and give us your feedback<br/> to help us improve our sevices, and our experiences.</Text>
						<Button bg='#009393' p='2' color='#fff' onClick={(()=>{setActive(true)})}>Give us a Feedback</Button>
					</Flex>
					<Flex className={styles.feedback_content_body} gap='2'>
						{feedback_data?.slice(0,3).map((feedback)=>{
							return(
								<Feedback_Content_Card feedback={feedback} key={feedback?._id}/>
							)
						})}
					</Flex>
				</Flex>
				}	
			</Flex>
		</Flex>
	)
}
const Feedback_Content_Card=({feedback})=>{
	let jsx = [];
	for (let index = 0; index < feedback?.rate; index++) {
        jsx.push('index'+index)
    }
	return(
		<Flex className={styles.feedback_content_card} direction={'column'} w='300px' h='300px'>
			<Flex gap='2' align='center'>
				<MdAccountCircle style={{fontSize:'32px',color:'grey'}}/>
				{jsx.map((index)=>(
					<MdStarRate key={index} style={{fontSize:'14px',color:'gold'}}/>
				))}
			</Flex>
			<Flex p='2' direction={'column'}>
				<Text fontWeight={'bold'} fontSize={'18px'}>{feedback?.name}</Text>
			</Flex>
			<Text p='2' textAlign={'left'} overflow={'hidden'}>"{feedback?.feedback} "</Text>
		</Flex>
	)
}