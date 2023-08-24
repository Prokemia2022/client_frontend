import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  SkeletonText,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {Receipt,Widgets,Inventory} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';

import { useEffect, useState } from "react";

function Navigation_Tab({children,current_page,set_current_page}){
  const sidebar = useDisclosure();
  const [is_loading,set_is_loading] = useState(true);

  useEffect(()=>{
    set_is_loading(true)
    setTimeout(()=>{
      set_is_loading(false)
    },1000)
  },[current_page])
  return(
      <Box
          as="section"
          bg="gray.50"
          _dark={{
          bg: "gray.700",
          }}
          minH="100vh"
      >
      <SidebarContent
        display={{
          base: "none",
          md: "unset",
        }}
        current_page={current_page}
        set_current_page={set_current_page}
      />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent 
            w="full" 
            borderRight="none"
            current_page={current_page}
            set_current_page={set_current_page}
          />
        </DrawerContent>
      </Drawer>
      <Box
        ml={{
          base: 0,
          md: 60,
        }}
        transition=".3s ease"
      >
        <Flex
          as="header"
          align="center"
          w="full"
          px="4"
          bg="white"
          display={{
              base: "inline-flex",
              md: "none",
            }}
          _dark={{
            bg: "gray.800",
          }}
          borderBottomWidth="1px"
          color="inherit"
          h="14"
          gap='2'
        >
          <IconButton
            aria-label="Menu"
            display={{
              base: "inline-flex",
              md: "none",
            }}
            onClick={sidebar.onOpen}
            icon={<MenuIcon />}
            size="sm"
          />
          <Text
          display={{
            base: "inline-flex",
            md: "none",
          }}
          >Navigation</Text>
        </Flex>
        <Box as="main" p="4">
          {/* Add content here, remove div below  */}
          {is_loading?
              <Box padding='6' boxShadow='lg' bg='white' gap='2' borderRadius='5'>
                  <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
              </Box>
          :
              <Box p='4' rounded="md">
                  {children}
              </Box>
          }
        </Box>
      </Box>
    </Box>
  )
}

export default Navigation_Tab;

const NavItem = (props) => {
  const { icon, children, ...rest } = props;
  return (
    <Flex
      align="center"
      m='2'
      px="4"
      pl="4"
      py="3"
      cursor="pointer"
      color="inherit"
      _dark={{ color: "gray.400" }}
      _hover={{
        bg: "gray.100",
        _dark: { bg: "gray.900" },
        color: "gray.900",
        borderRadius:5
      }}
      role="group"
      fontWeight="regular"
      fontSize={'md'}
      transition=".3s ease"
      {...rest}
    >
      {icon && (
        <Icon
          mx="2"
          boxSize="5"
          _groupHover={{
            color: "gray.900",
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

const SidebarContent = (props) => {
const {current_page,set_current_page}={...props};
return(
  <Box
    as="nav"
    pos="fixed"
    top={{ 
      base: "70px", 
      md: "70px" }}
    left="0"
    zIndex="sticky"
    h="full"
    pb="10"
    overflowX="hidden"
    overflowY="auto"
    bg="white"
    _dark={{
      bg: "gray.800",
    }}
    bordercolor="inherit"
    borderRightWidth="1px"
    w="60"
    {...props}
  >
    <Flex
      direction="column"
      as="nav"
      fontSize="sm"
      color="gray.600"
      aria-label="Main Navigation"
      gap='1'
    >
      <NavItem bg={current_page == 'dashboard'? 'teal.100' : ''} borderRadius={current_page == 'dashboard'? 'md' : ''} icon={AutoAwesomeMosaicIcon} onClick={(()=>{set_current_page("dashboard")})}>
          Dashboard
      </NavItem>
      <NavItem bg={current_page == 'inventory'? 'teal.100' : ''} borderRadius={current_page == 'inventory'? 'md' : ''} icon={Inventory} onClick={(()=>{set_current_page("inventory")})}>
          Inventory 
      </NavItem>
      <NavItem bg={current_page == 'experts'? 'teal.100' : ''} borderRadius={current_page == 'experts'? 'md' : ''} icon={Receipt} onClick={(()=>{set_current_page("experts")})}>
          Experts
      </NavItem>
      <NavItem bg={current_page == 'distributors'? 'teal.100' : ''} borderRadius={current_page == 'distributors'? 'md' : ''} icon={AccountBoxIcon} onClick={(()=>{set_current_page("distributors")})}>
          Distributors
      </NavItem>
      <NavItem bg={current_page == 'settings'? 'teal.100' : ''} borderRadius={current_page == 'settings'? 'md' : ''} icon={ManageAccountsIcon} onClick={(()=>{set_current_page("settings")})}>
        Settings
      </NavItem>
      <NavItem bg={current_page == 'pricing'? 'teal.100' : ''} borderRadius={current_page == 'pricing'? 'md' : ''} icon={WorkspacePremiumOutlinedIcon} onClick={(()=>{set_current_page("pricing")})}>
        Upgrade
      </NavItem>
    </Flex>
  </Box>
)};