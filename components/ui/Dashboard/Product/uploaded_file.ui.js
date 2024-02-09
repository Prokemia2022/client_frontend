import { HStack, Icon, Text } from "@chakra-ui/react"
import { IoCloudDone } from "react-icons/io5"

export const Uploaded_File=({name})=>{
	return(
		<HStack mt='2' justify='space-between' border='1px' borderColor='#eee' borderStyle='solid' p='2' borderRadius='md'>
            <Text>{name} {name? 'has been uploaded' : 'no document found:status saved'}</Text>
            <Icon as={IoCloudDone} color="green" boxSize={4}/>
        </HStack>
	)
}