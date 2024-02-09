import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from '@chakra-ui/react';
import React from 'react';
import { useUserContext} from '../../Providers/userContext';
import UseLogOut from '../../../hooks/useLogOut.hook';
import { useRouter } from 'next/router'
import { useState } from 'react';
import { DeleteAccount } from '../../../pages/api/auth/route.api';


export default function DeleteUserAccount({delete_account_disclosure}) {
    const toast = useToast();
    const router = useRouter()
    const { isOpen, onOpen, onClose } = delete_account_disclosure;
    const cancelRef = React.useRef();
    const {user,set_user_handler} = useUserContext();
    const payload = {
      account_type: user?.account_type,
      email_of_company: user?.email_of_company || user?.email_of_salesperson
    }

    const [is_deleting_acc,set_is_deleting_acc]=useState(false)
    const handleDelete=async()=>{
      set_is_deleting_acc(true)
      await DeleteAccount(payload).then((response)=>{
        toast({ title: 'Account deleted successfully', description: '', status: 'success', variant:'left-accent', position:'top-left', isClosable: true, });
        setTimeout(()=>{
          UseLogOut();
          set_user_handler(payload?.email_of_company)
          router.push('/');
        },2000)
      }).catch((err)=>{
        onClose();
        console.log(err)
        toast({ title: 'Error in deleting your account', description: '', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
      }).finally(()=>{
        set_is_deleting_acc(false)
      })
    }
    return (
      <>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Account
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Are you sure? You cant undo this action afterwards.
                By deleting this account, You will not have access to use the service and/or the platform.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                {is_deleting_acc? <Button isLoading loadingText='Deleting...' colorScheme='red' isDisabled ml='2'/> :
                <Button colorScheme='red' onClick={handleDelete} ml={3}>
                  Delete
                </Button>}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
}