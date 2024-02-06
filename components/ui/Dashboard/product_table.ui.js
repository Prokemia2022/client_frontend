import { AlertDialog, AlertDialogContent, AlertDialogOverlay, Box, Center, Icon, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFolderOpen, FaStore } from "react-icons/fa";
import { Share_Item } from "../share.ui";
import { useGetLocalStorage, useRemoveItemLocalStorage } from "../../../hooks/useLocalStorage.hook";
import { RiExternalLinkLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";

export const Product_Table=()=>{
    const [data, set_data]=useState([])
    useEffect(()=>{
        fetchdata()
    },[])
    async function fetchdata(){
        const data= await useGetLocalStorage('products');
        set_data(data)
    }
    return(
        <TableContainer bg='#fff' mt='4' borderRadius={5}>
            <Text p='4' fontSize={'sm'}> Saved products</Text>
            {data?.length == 0? 
                <Center display={'flex'} flexDirection={'column'} py='10' >
                    <Icon as={FaFolderOpen} boxSize={20} color={'gray.200'}/>
                    <Text color={'gray.300'} textAlign={'center'}>You have not saved any products,<br/> <span style={{textDecoration:'1px solid underline'}}>start browing</span> to start saving products</Text>
                </Center>
            :
                <Table variant='simple'>
                    <Thead bg='#eee' borderRadius={'5'}>
                        <Tr>
                            <Th > Name </Th>
                            <Th > Industry </Th>
                            <Th > Technology </Th>
                            <Th > Supplier  </Th>
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

    const handle_remove=async()=>{
        const data={
            _id: item?._id
        }
        const examplePromise = new Promise((resolve, reject) => {
            useRemoveItemLocalStorage('products', data).then((res)=>{
                resolve()
            }).catch((err)=>{
                reject(err)
            })
        })
        toast.promise(examplePromise, {
            success: { title: 'Product removed from library', description: '',position:'top-left',variant:'left-accent'},
            error: { title: 'Something went wrong', description: 'Could not remove this product',position:'top-left',variant:'left-accent' },
            loading: { title: 'Removing product from your library', description: 'Please wait',position:'top-left',variant:'left-accent' },
        })
        router.reload()
    }
    return(
        <Tr>
            <Td color='#009393' _hover={{ textDecoration:'underline dotted', cursor:'pointer'}} onClick={(()=>{router.push(`/products/product?pid=${item._id}`)})}>{item?.name_of_product}</Td>
            <Td> {item?.industry}</Td>
            <Td> {item?.technology}</Td>
            <Td> {item?.distributed_by}</Td>
            <Td>
                <Menu>
                    <MenuButton>
                        <Icon as={BsThreeDotsVertical} boxSize={4}/>
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={(()=>{router.push(`/products/product?pid=${item._id}`)})} icon={<RiExternalLinkLine />}>View Product</MenuItem>
                        {!item?.supplier_link ? 
                            <MenuItem icon={<FaStore/>} color='gray.300'>Visit Supplier</MenuItem>
                            :
                            <MenuItem icon={<FaStore/>}  onClick={(()=>{ router.push(item?.supplier_link) })}> Visit Supplier</MenuItem>
                        }
                        <MenuItem>
                            <Share_Item tag='product' title={item?.name_of_product} text={item?.description_of_product} link={`https://prokemia.com/product/${item?._id}`}/>
                        </MenuItem>
                        <MenuItem onClick={handle_remove} icon={<MdDeleteOutline />}>Remove Product </MenuItem>
                    </MenuList>
                </Menu>
            </Td>
        </Tr>
    )
}