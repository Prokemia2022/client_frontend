import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Text } from '@chakra-ui/react'

export function Item_accordion(props) {
    const {item_no, title, children} = {...props};
    return (
        <Accordion allowToggle defaultIndex={[0]} allowMultiple={item_no > 0 ? true:false}>
            <AccordionItem >
                <AccordionButton >
                    <Box as="span" flex='1' textAlign='left'>
                        {title} - <small>({item_no})</small>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel px='0' >
                    {item_no == 0?
                        <Text color={'gray.300'} textAlign={'center'} py='2' fontFamily={'clearSans-Regular'}>
                            no items matched
                        </Text>
                        :
                        null
                    }
                    {children}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}