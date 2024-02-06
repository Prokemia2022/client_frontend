import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useUserContext} from '../../../../../components/Providers/userContext';
import { UsedashboardContext } from '../../../../../components/Providers/dashboardContext';
import {Delete_Sale} from '../../../../api/clients/salesperson/route.api';

export default function DeleteSale({delete_sale_disclosure}) {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = delete_sale_disclosure;
    const {set_page,sales_data} = UsedashboardContext();
    const {user} = useUserContext();
    const cancelRef = useRef();

    const handleDelete=async()=>{
        if(user?.suspension_status){
            toast({ title: 'Error!', description: 'Your account is currently suspended', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
        }else if(!user?.verification_status){
            toast({ title: 'Error!', description: 'Your account has not been approved', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
        }else {
            if ((sales_data?.order_status !== 'under-review' || sales_data?.order_status !== 'completed' || sales_data?.order_status !== 'rejected' || sales_data?.order_status === 'pending') && !sales_data?.publish_status){
              await Delete_Sale(sales_data?._id).then((response)=>{
                  toast({ title: 'Sale deleted successfully', description: '', status: 'success', variant:'left-accent', position:'top-left', isClosable: true, });
              }).catch((err)=>{
                  console.log(err)
                  toast({ title: 'Error in deleting your sale', description: err?.response?.data, status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
                  return ;
              }).finally(()=>{
                  onClose();
                  set_page('Sales')
              })
            }
            if (sales_data?.order_status === 'pending' && sales_data?.publish_status){
              await Delete_Sale(sales_data?._id).then((response)=>{
                  toast({ title: 'Sale deleted successfully', description: '', status: 'success', variant:'left-accent', position:'top-left', isClosable: true, });
              }).catch((err)=>{
                  console.log(err)
                  toast({ title: 'Error in deleting your sale', description: err?.response?.data, status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
                  return ;
              }).finally(()=>{
                  onClose();
                  set_page('Sales')
              })
            }
            if ((sales_data?.order_status === 'under-review' || sales_data?.order_status === 'completed' || sales_data?.order_status === 'rejected') && sales_data?.publish_status){
                toast({title:'Error!',description:`This sale is published and either has been reviewed,completed or rejected and is not available for deletion. contact support by emailing us at @support@prokemia.com`,status:'error',position:'top-left',variant:'left-accent',isClosable:true})
                return ;
            }
        }
    }
    return (
      <>
        <AlertDialog motionPreset='slideInBottom' leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Sale
              </AlertDialogHeader>
              <AlertDialogBody>
                Are you sure? You cant undo this action afterwards.
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