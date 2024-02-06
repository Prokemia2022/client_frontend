import { Avatar, Button, Divider, Flex, HStack, Icon, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IoMdArrowDropdown } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { useUserContext } from "../../Providers/userContext";
import UseLogOut from "../../../hooks/useLogOut.hook";
import { useUserDashboardroute } from "../../../hooks/useUserDashboardroute.hook";

export const ProfileTag = ()=>{
    const router = useRouter();
    const {user,set_user_handler} = useUserContext();
    const handleClick = ()=>{
        UseLogOut();
        router.push('/');
        set_user_handler(`${user?._id} logged out `)
    }
    const dashboard_route = useUserDashboardroute(user?.account_type,user?._id);
    return(
        <Menu>
            <MenuButton borderRadius={'full'} cursor={'pointer'} bg='#9fd1d1' p='1' px='2' _hover={{boxShadow:'lg',transition:'ease-in-out .3s',outline:'1px solid #009393'}}>
                <Flex align='center' gap='2'>
                    <Avatar src={user?.profile_photo_url} name={user?.first_name || user?.company_name} size='sm'/>
                    <Text>{user?.first_name || user?.company_name}</Text>
                    <Icon as={IoMdArrowDropdown} />
                </Flex>
            </MenuButton>
            <MenuList>
                <Flex justify={'center'} w='100%' align={'center'} gap='2' my='4'>
                    <Avatar src={user?.profile_photo_url} name={user?.first_name || user?.company_name} size='lg'/>
                    <Text>{user?.first_name || user?.company_name}</Text>
                </Flex>
                <Divider/>
                <MenuItem py='3' gap='2' onClick={(()=>{router.push(dashboard_route)})}>
                    <Icon as={VscAccount} />
                    Go to dashboard
                </MenuItem>
                <Divider/>
                <Flex w='100%' px='2' py='2'>
                    <Button flex='1' fontSize={'sm'} bg={'#343838'} color='#fff' onClick={handleClick}>LogOut</Button>
                </Flex>
            </MenuList>
        </Menu>
    )
}