import { Box, Divider, HStack, Icon, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { CiFileOn } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

export const Selected_File=(props)=>{
    const {name,file_type,set_data_sheet,set_formulation_document,set_safety_data_sheet,is_submitting,Title} = {...props}
    const handle_remove_file=()=>{
        switch(file_type) {
            case "data_sheet":
                set_data_sheet('')
              break;
            case "safety_data_sheet":
                set_safety_data_sheet('')
              break;
            case "formulation_document":
                set_formulation_document('')
              break;
            default:
              return ;
          }
    }
	return(
    <Box border='1px' borderColor='#eee' borderStyle='solid' p='2' borderRadius='md' mt='2'>
      <Text fontWeight={'bold'} mb='2'>{Title}</Text>
      <Divider/>
      <HStack justify='space-between' mt='2'>
          <HStack>
              <Icon as={CiFileOn} color={'orange'} boxSize={4}/>
              <Text w='100%' >{name}</Text>
          </HStack>
          <Tooltip label={`Remove ${file_type}`} placement='auto'>
              <IconButton aria-label='Remove File' icon={<IoClose />} onClick={handle_remove_file}/>
          </Tooltip>
      </HStack>
    </Box>
	)
}
