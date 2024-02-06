import { Flex, Icon, Text } from "@chakra-ui/react";
import { RWebShare } from "react-web-share";
import { FaShare } from "react-icons/fa";

export const Share_Item=(props)=>{
    const {text, title, tag, link} = props;
    return(
        <RWebShare
            data={{
                title: `${title}`,
                text: `${text}`,
                url: `${link}`,
            }}>
            <Flex gap='2' mt='2' mb='2' cursor='pointer' align='center'>
                <Text fontSize='16px'>Share this {tag}</Text>
                <Icon as={FaShare} boxSize={4}/>
            </Flex>
        </RWebShare>
    )
}