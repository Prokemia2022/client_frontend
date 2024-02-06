import React, { useRef } from 'react';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from '@chakra-ui/react';
import { useUserContext} from '../../Providers/userContext';
import { UsedashboardContext } from '../../Providers/dashboardContext';
import { Delete_Product } from '../../../pages/api/product/route.api';

export default function DeleteProduct({delete_product_disclosure}) {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = delete_product_disclosure;
    const {set_page,product_page_data,set_refetch_products} = UsedashboardContext();
    const {user} = useUserContext();
    const cancelRef = useRef();

    const payload = {
        _id: product_page_data?._id,
	}

    const handleDelete=async()=>{
        if(user?.suspension_status){
            toast({ title: 'Error!', description: 'Your account is currently suspended', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
        }else if(!user?.verification_status){
            toast({ title: 'Error!', description: 'Your account has not been approved', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
        }else {
            await Delete_Product(payload).then((response)=>{
                toast({ title: 'Product deleted successfully', description: '', status: 'success', variant:'left-accent', position:'top-left', isClosable: true, });
                set_refetch_products(product_page_data?._id)
            }).catch((err)=>{
                console.log(err)
                toast({ title: 'Error in deleting your product', description: err?.response?.data, status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
            }).finally(()=>{
                onClose();
                set_page('Inventory')
            })
        }
    }
    return (
      <>
        <AlertDialog motionPreset='slideInBottom' leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Product
              </AlertDialogHeader>
              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
                By deleting this product, You will not have access to use the product.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={handleDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
}