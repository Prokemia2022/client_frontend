import { Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const Product_Card=(props)=>{
	const {item, setquery_search, setsearchbaractive} = {...props}
	const router = useRouter();
	function handleClick(){
		router.push(`/products/product?pid=${item._id}`);
		setquery_search('');
		setsearchbaractive(false);
	}
	return(
		<Flex m='1' _hover={{bg:'#eee', boxShadow:'lg'}}   cursor='pointer' gap='2' align='center' bg='#fff' p='1' borderRadius='5' boxShadow='md' onClick={handleClick}>
		    <Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src='../../Pro.png' alt='next'/>
			<Flex direction='column'>
				<Text fontSize='16px' fontFamily='ClearSans-Bold' color='#009393'>{item.name_of_product}</Text>
				<Text fontSize='14px'>{item.distributed_by}</Text>
				<Flex gap='2' fontSize='10px' color='grey'>
					<Text>{item.industry? item.industry : "-"}</Text>
					<Text borderLeft='1px solid grey' paddingLeft='2'>{item.technology? item.technology : "-"}</Text>
				</Flex>
			</Flex>
		</Flex>
	)
}