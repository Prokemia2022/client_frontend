import { AbsoluteCenter, Avatar, Box, Button, Center, Divider, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { BsShopWindow } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import Script from "next/script"
import { useUserContext } from "../../Providers/userContext";
import UseLogOut from "../../../hooks/useLogOut.hook";
import { useUserDashboardroute } from "../../../hooks/useUserDashboardroute.hook";

export const MenuComponent = ()=>{
    const router = useRouter();
    const {user,set_user_handler} = useUserContext();
    const handleClick = ()=>{
        UseLogOut();
        router.push('/');
        set_user_handler(`${user?._id} logged out `)
    }
    const dashboard_route = useUserDashboardroute(user?.account_type,user?._id);
    return(
        <Menu display={{md:'none',base:''}}>
            <MenuButton title='menu' as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0} pt='1' color='#000'>
                <Icon as={IoMenu} boxSize={8} display={{base:'inline-block',md:'none'}} cursor={'pointer'}/>
            </MenuButton>
            <MenuList alignItems={'center'} p='2' boxShadow='md'>
                {user !== null?
                    <>
                        <Flex justify={'center'} w='100%' align={'center'} gap='2' my='4'>
                            <Avatar src={user?.profile_photo_url} name={user?.first_name || user?.company_name} size='lg'/>
                            <Text>{user?.first_name || user?.company_name}</Text>
                        </Flex>
                        <Divider/>
                        <MenuItem py='3' gap='2' onClick={(()=>{router.push(dashboard_route)})}>
                            <Icon as={VscAccount} />
                            Go to dashboard
                        </MenuItem>
                    </>
                    : 
                    <Center alignItems={'center'} align='center' gap='2'>
                        <Script src="https://cdn.lordicon.com/xdjxvujz.js"></Script>
                        <lord-icon src="https://cdn.lordicon.com/dklbhvrt.json" trigger="loop" delay="7000" style={{marginTop:'20px',width:'70px',height:"70px",}} >
                        </lord-icon>
                        <Text mt='2' fontSize={'sm'}>sign in to <br/> view profile</Text>
                    </Center>
                }
                {user !== null?
                    null :
                    <MenuItem minH='48px' mt='2' onClick={(()=>{router.push('/account/2')})}>
                        <span>Sell products</span>
                    </MenuItem>
                }
                <Divider/>
                <MenuItem minH='48px' onClick={(()=>{router.push('/Industries/all')})}>
                    <span>Explore industries</span>
                </MenuItem>
                <Divider/>
                {user !== null?
                    <MenuItem minH='48px' onClick={(()=>{router.push('/market')})} gap='2'>
                        <Icon as={BsShopWindow}/>
                        <span>Market</span>
                    </MenuItem>:
                    null
                }
                {user !== null? 
                    <Flex w='100%' px='2' py='2'>
                        <Button flex='1' fontSize={'sm'} bg={'#343838'} color='#fff' onClick={handleClick}>LogOut</Button>
                    </Flex>
                    :
                    <Flex direction={'column'} gap='2'>
                        <Button bg='#343838' color={'#fff'} onClick={(()=>{router.push('/signin')})}>Sign In</Button>
                        <Box position='relative' padding='2'>
                            <Divider />
                            <AbsoluteCenter bg='white' px='4'>
                                or
                            </AbsoluteCenter>
                        </Box>
                        <Button bg={'#009393'} color='#fff' onClick={(()=>{router.push('/account/1')})}>Sign Up for free</Button>
                    </Flex>
                }
            </MenuList>
        </Menu>
    )
}