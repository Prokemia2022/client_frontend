import React, { useEffect, useState } from 'react'
import { Box, Collapse, Divider, Flex, Grid, Heading, Icon, Image, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Product_Card from '../../components/ui/Category/Product_Card.ui';
import { Get_Supplier } from '../api/supplier/manufacturer/route.api';
import { Get_Products_By_Lister } from '../api/product/route.api';
import { Get_Supplier_Distributor } from '../api/supplier/distributor/route.api'

export default function Index() {
    const router = useRouter()
    const {id, supplier} = router.query;
    const [data,set_data]=useState('');
    const [is_pending,set_is_pending]=useState(false);
    const [show, setShow] = useState(false)

    const handleToggle = () => setShow(!show);

    const [products_data, set_products_data]=useState([]);
    const [industries,set_industries]=useState([]) //filtered industry data
	const [technologies,set_technologies]=useState([]); //filtered technology data

    useEffect(()=>{
        HandleFetchData();
    },[id]);
    const HandleFetchData=async()=>{
        set_is_pending(true)
        if(supplier === 'distributor'){
            await Get_Supplier_Distributor(id).then((res)=>{
                set_data(res?.data)
                get_Products_Data()
            }).catch((err)=>{
                console.log(err)
            }).finally(()=>{
                set_is_pending(false)
            })
        }else if(supplier === 'manufacturer'){
            await Get_Supplier(id).then((res)=>{
                set_data(res?.data)
                get_Products_Data()
            }).catch((err)=>{
                console.log(err)
            }).finally(()=>{
                set_is_pending(false)
            })
        }
    }
    async function get_Products_Data(){
		const data = await Get_Products_By_Lister(id);
		set_products_data(data.data);
        const industry_values = data?.data.map(item=>item?.industry);
        set_industries([...new Set(industry_values)]);
        const technology_values = data?.data.map(item=>item?.technology);
        set_technologies([...new Set(technology_values)]);
	}
    return (
        <Box p={{base:'2',md:'6'}}>
            <Flex gap='2' flexDirection={{md:'row',base:'column'}}>
				<Image src={data?.profile_photo_url || '../../Pro.png'} alt='image' boxSize={200} objectFit={'cover'} borderRadius={5} boxShadow={'sm'}/>
				<Flex flexDirection={'column'} px='2' flex='1' >
					<Heading as={'h2'}>{data?.company_name}</Heading>
					<Collapse startingHeight={100} in={show}>
						{data?.description}
					</Collapse>
					<Text fontSize='sm' onClick={handleToggle} mt='1rem' bg='#eee' p='2' w='110px' borderRadius={'5'} cursor={'pointer'}>
						Show {show ? 'Less' : 'More'} {show ? <Icon as={IoIosArrowUp} boxSize={3}/> : <Icon as={IoIosArrowDown} boxSize={3}/>}
					</Text>
				</Flex>
			</Flex>
            <Flex direction='column' gap='2' my='4'>
				<Text fontSize='16px'>Industries</Text>
				{industries?.length === 0 ? null :
                    <Flex gap='1' flexWrap={'wrap'}> 
                        {industries?.map((item,id)=>{
                            return(
                                <Text px='1' key={id} borderLeft='2px solid #eee'>{item}</Text>
                            )
                        })}
                    </Flex>
                }
			</Flex>
			<Flex direction='column' gap='2' my='4'>
				<Text fontSize='16px'>Technologies</Text>
				{technologies?.length === 0 ? null :
                    <Flex gap='1' flexWrap={'wrap'}> 
                        {technologies?.map((item,id)=>{
                            return(
                                <Text px='1' key={id} borderLeft='2px solid #eee'>{item}</Text>
                            )
                        })}
                    </Flex>
                }
			</Flex>
            <Flex direction='column' gap='2'>
				<Text fontSize='24px' mt='2'>Products </Text>
				<Divider/>
				{products_data?.length !== 0 ?
					<Grid templateColumns={{base:'repeat(1, 1fr)',md:'repeat(2, 1fr)',lg:'repeat(3, 1fr)'}} gap={'2'} mt='1'>
						{products_data?.map((item)=>{
							return(
								<Product_Card item={item} key={item?._id}/>
							)
						})}
					</Grid>
					:
					<Flex bg='#eee' p='2' justify='center' align='center' h='40vh' boxShadow='lg'>
						<Text>No products have been listed by this supplier</Text>
					</Flex>
				}
			</Flex>
        </Box>
    )
}