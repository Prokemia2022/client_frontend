//modules import
import React, { useContext, useState } from 'react'
import {useRouter} from 'next/router';
import {Flex,Text,Button, SlideFade, useDisclosure, Box} from '@chakra-ui/react'
//components import
import { Search_Input } from './input';
import { MenuComponent } from './menu';
import { ProfileTag } from './profile_tag';
import { useUserContext} from '../../Providers/userContext';
import { Explore_Industries } from './explore.ui';


function Header(){
    const router = useRouter();
    const user = useUserContext();
	return(
		<Flex boxShadow='sm' position='sticky' top='0' zIndex='2000' bg='#fff' fontFamily='ClearSans-Bold' p='4' align={'center'} justify={'space-between'} gap='2'>
            <Text cursor={'pointer'} onClick={(()=>{router.push('/')})} fontSize='28px' color='#009393'>Pro<span style={{color:"#000"}}>Kemia</span></Text>
            <Search_Input/>
            <Flex display={{base:'none',md:'flex'}} align={'center'} gap='3' fontFamily='ClearSans-regular' fontSize={'sm'}>
                {user.user !== null?
                    <>
                        <Explore_Industries/>
                        <Text onClick={(()=>{router.push(`/market`)})} _hover={{bg:'#343838', color: '#fff', p:'2', borderRadius:'sm',transition:'ease-out .5s', boxShadow:'sm'}} cursor={'pointer'}>Market</Text>
                        <ProfileTag/>
                    </>
                    :
                    <Flex align={'center'} gap='2'>
                        <Explore_Industries/>
                        {links?.map((i, index)=>{
                            return(
                                <Text onClick={(()=>{router.push(`${i.link}`)})} _hover={{bg:'#343838', color: '#fff', p:'2', borderRadius:'sm',transition:'ease-out .5s', boxShadow:'sm'}} cursor={'pointer'} key={index}>{i.name}</Text>
                            )
                        })}
                        <Button _hover={{boxShadow:'lg'}} onClick={(()=>{router.push('/account/1')})} bg='#009393' color='#fff'>Free Sign Up</Button>
                    </Flex>
                }
            </Flex>
            <MenuComponent/>
        </Flex>
	)
}

export default Header;

const links = [
    {name:'Sell products',link: '/account/2' },
    {name:'Sign In', link:'/signin'}
]