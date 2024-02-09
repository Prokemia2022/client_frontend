//modules import
import React from 'react';
import {Flex, Image} from '@chakra-ui/react';
import { SignInForm } from '../components/ui/auth/signInform.js';

export default function Page(){

	return(
		<Flex w='full' h='100vh'>
			<Image src='../Auth_Prokemia_Img.png' alt='Banner' w='50%' h='full' objectFit={'cover'} display={{base:'none',md:'block'}}/>
			<Flex w={{base:'100%',md:'50%'}} h='100%' justify={'center'} align={'center'}>
				<SignInForm/>
			</Flex>
		</Flex>
	)
}