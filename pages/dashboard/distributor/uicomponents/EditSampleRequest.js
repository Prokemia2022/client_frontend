import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useToast } from '@chakra-ui/react';
import Edit_Sample_Request_Form from '../../../../components/Forms/EditSampleForm';

export default function Edit_Sample_Request_Drawer({sample_data,edit_drawer_disclosure}){
    return(
        <Drawer isOpen={edit_drawer_disclosure?.isOpen} placement='right' onClose={edit_drawer_disclosure?.onClose} size='md' >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
                Edit Sample request
            </DrawerHeader>
            <DrawerBody mt='10px' p='4'>
                <Edit_Sample_Request_Form sample_data={sample_data} edit_drawer_disclosure={edit_drawer_disclosure}/>
            </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}