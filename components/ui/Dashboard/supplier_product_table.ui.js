import { AlertDialog, AlertDialogContent, AlertDialogOverlay, Box, Center, Icon, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFolderOpen } from "react-icons/fa";
import { Share_Item } from "../share.ui";
import moment from "moment";
import { RiExternalLinkLine } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { UsedashboardContext } from "../../Providers/dashboardContext";
import DeleteProduct from "./delete_product.ui";

export const Product_Table=({data})=>{
    return(
        <TableContainer bg='#fff' mt='4' borderRadius={5}>
            {data?.length == 0? 
                <Center display={'flex'} flexDirection={'column'} py='10' >
                    <Icon as={FaFolderOpen} boxSize={20} color={'gray.200'}/>
                    <Text color={'gray.300'} textAlign={'center'}>You have not added any products yet.</Text>
                </Center>
            :
                <Table variant='simple'>
                    <Thead bg='#eee' borderRadius={'5'}>
                        <Tr>
                            <Th > Name </Th>
                            <Th > Featured status </Th>
                            <Th > Approval status </Th>
                            <Th > Exipry status  </Th>
                            <Th > Actions   </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.map((item)=>{
                            return(
                                <Product_Card item={item} key={item}/>
                            )
                        })}
                    </Tbody>
                </Table>
            }
        </TableContainer>
    )
}

const Product_Card=(props)=>{
    const { item} = {...props};
    const router = useRouter();
    const toast = useToast();
    const {set_page,set_product_page_data} = UsedashboardContext();
    const delete_product_disclosure = useDisclosure();

    const HandleViewProduct=()=>{
        set_page('ViewProduct');
        set_product_page_data(item)
    }
    const HandleeditProduct=()=>{
        set_page('EditProduct');
        set_product_page_data(item)
    }

    const HandleDeleteProduct=()=>{
        delete_product_disclosure?.onToggle()
        set_product_page_data(item)
    }

    return(
        <Tr>
            <Td color='#009393' _hover={{ textDecoration:'underline dotted', cursor:'pointer'}}>{item?.name_of_product}</Td>
            <Td> {item?.sponsored? 'Featured':'not featured'}</Td>
            <Td> {item?.verification_status? 'Approved':'not approved'}</Td>
            <Td> {item?.short_on_expiry_date ? moment( item?.short_on_expiry_date).format("MMM Do YY") : '-'}</Td>
            <Td>
                <Menu>
                    <MenuButton>
                        <Icon as={BsThreeDotsVertical} boxSize={4}/>
                    </MenuButton>
                    <MenuList>
                        <MenuItem icon={<RiExternalLinkLine />} onClick={HandleViewProduct}>View Product</MenuItem>
                        <MenuItem icon={<BiEdit />} onClick={HandleeditProduct}>Edit Product</MenuItem>
                        <MenuItem>
                            <Share_Item tag='product' title={item?.name_of_product} text={item?.description_of_product} link={`https://prokemia.com/product/${item?._id}`}/>
                        </MenuItem>
                        <MenuItem onClick={HandleDeleteProduct} icon={<MdDeleteOutline />}>Delete Product </MenuItem>
                        <DeleteProduct delete_product_disclosure={delete_product_disclosure}/>
                    </MenuList>
                </Menu>
            </Td>
        </Tr>
    )
}