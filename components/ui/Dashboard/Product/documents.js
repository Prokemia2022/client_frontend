import { Box, Button, FormControl, FormLabel, Input, Text, Tooltip, useToast } from "@chakra-ui/react"
import { Uploaded_File } from "./uploaded_file.ui"
import { Selected_File } from "./selected_file.ui"
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { UseFileTypeChecker } from "../../../../hooks/useFileTypeChecker.hook";
import UseFileUpload from "../../../../hooks/useFileUpload.hook";
import { Edit_Product } from "../../../../pages/api/product/route.api";
//import Edit_Product from "../../../../pages/api/product/edit_product";

export const Upload_documents=({set_isfileupload,handle_add_new_product,uid})=>{
    const toast = useToast()
    const [is_data_sheet_uploaded,set_is_data_sheet_uploaded]=useState(false);
    const [is_safety_data_sheet_uploaded,set_is_safety_data_sheet_uploaded]=useState(false);
    const [is_formulation_document_uploaded,set_is_formulation_document_uploaded]=useState(false);
    
    const [data_sheet,set_data_sheet]=useState(''); //handles the state of data sheet file selection
    const [safety_data_sheet,set_safety_data_sheet]=useState('');  //handles the state of safety data sheet file selection
    const [formulation_document,set_formulation_document]=useState(''); //handles the state of formulation document file selection
    
    const [data_sheet_url,set_data_sheet_url]=useState(''); //handles the state of data sheet file selection
    const [safety_data_sheet_url,set_safety_data_sheet_url]=useState('');  //handles the state of safety data sheet file selection
    const [formulation_document_url,set_formulation_document_url]=useState(''); //handles the state of formulation document file selection
    
    const [is_submitting,set_is_submitting]=useState(false);

    const files ={
        data_sheet_url,
        safety_data_sheet_url,
        formulation_document_url
    }
    const fetch_file_urls=async()=>{
        if (data_sheet){
            const data={
                file: data_sheet,
                file_type: 'data_sheet'
            }
            let file_url = await UseFileUpload(data);
            set_data_sheet_url(file_url);
            files.data_sheet_url = file_url;
        }
        if (safety_data_sheet){
            const data={
                file: safety_data_sheet,
                file_type: 'safety_data_sheet'
            }
            let file_url = await UseFileUpload(data);
            set_safety_data_sheet_url(file_url)
            files.safety_data_sheet_url = file_url;
        }
        if (formulation_document){
            const data={
                file: formulation_document,
                file_type: 'formulation_document'
            }
            let file_url = await UseFileUpload(data);
            set_formulation_document_url(file_url);
            files.formulation_document_url = file_url;
        }
        
    }

    const Handle_Upload_Documents=async()=>{
        /**
         * Handles the process of uploading the documents to the saved product in db.
         * It calls the handle_add_new_product() that awaits the id of the saved product.
         */
        set_is_submitting(true);
        if (!data_sheet && !safety_data_sheet && !formulation_document){
            toast({title: 'Error!', description:'You have not selected any files',position: 'top-left',variant:'left-accent',status:'warning',isClosable:'true'});
            set_is_submitting(false);
            return ;
        }
        let file_checker = UseFileTypeChecker();
        if (file_checker){
            set_is_submitting(false);
            return ;
        }
        if ((!data_sheet) || !safety_data_sheet || !formulation_document){
            /**
             * Checks the existence of all files and asks if the user wishes to upload only the uploaded documents
             * if so the files are uploaded and the product is edited
             * elsewise the user goes to edit the files.
             * 
            */
            let confirmation = prompt("Are you sure you want to upload only the files you have selected? Confirm by typing [ yes ] below.");
            if (confirmation === 'yes'){
                //Create product
                await handle_add_new_product().then((res)=>{
                    if (res.status === 200){
                        fetch_file_urls().then(()=>{
                            Update_Product_Details(res)
                        })
                    }else{
                        set_is_submitting(false)
                    }
                }).catch((err)=>{
                    set_is_submitting(false)
                })
            }else{
                set_is_submitting(false);
                return ;
            }
        }else{
            await handle_add_new_product().then((res)=>{
                if (res.status === 200){
                    fetch_file_urls().then(()=>{
                        Update_Product_Details(res)
                    })
                }else{
                    set_is_submitting(false)
                }
            }).catch((err)=>{
                
                set_is_submitting(false)
            })
        }
    }

    const Update_Product_Details=async(res)=>{
        let payload = {
            data_sheet_url: files?.data_sheet_url,
			safety_data_sheet_url: files?.safety_data_sheet_url,
			formulation_document_url: files?.formulation_document_url,
            _id: res?._id,
            uid
        }
        if (res){
            await Edit_Product(payload).then(()=>{
                /**
                    sends a payload data to server to update the product.
                    payload (object): json obj containing information for the new product.
    
                    Return:
                        alerts user whether function runs successfully or not.
                    catch:
                        alerts user when function fails
                */
                toast({title: 'Success!', description:'file(s) have been added successfully',position: 'top-left',variant:'left-accent',status:'success',isClosable:'true'});
                
                set_is_data_sheet_uploaded(true);
                set_is_safety_data_sheet_uploaded(true);
                set_is_formulation_document_uploaded(true);

                setTimeout(()=>{
                    set_isfileupload(false);
                    Clean_input_data();
                },3000);
            }).catch((err)=>{
                toast({title: 'Error!', description:'Something went wrong: Your product has been been saved however the files could not be added',position: 'top-left',variant:'left-accent',status:'warning',isClosable:'true'});
            }).finally(()=>{
                set_is_submitting(false);
            })
        }

    }
    const Clean_input_data=()=>{
        //clear file urls
        set_data_sheet_url('');
        set_safety_data_sheet_url('');
        set_formulation_document_url('');
        //clear file data
        set_data_sheet('');
        set_safety_data_sheet('');
        set_formulation_document('');
        //clear file selection status
        set_is_data_sheet_uploaded(false);
        set_is_safety_data_sheet_uploaded(false);
        set_is_formulation_document_uploaded(false);
        //clear files obj
        files.data_sheet_url = '';
        files.safety_data_sheet_url = '';
        files.formulation_document_url = '';
    }
    return(
       <Box>
            {is_data_sheet_uploaded?
                <Uploaded_File name={data_sheet?.name}/>
                :
                <>
                    {data_sheet?
                        <Selected_File Title='Technical data sheet' is_submitting={is_submitting} name={data_sheet?.name} file_type='data_sheet' set_data_sheet={set_data_sheet}/>
                    :
                        <FormControl mt='4'>
                            <FormLabel fontWeight={'bold'}>Technical data sheet</FormLabel>
                            <Input type='file' p='1' onChange={((e)=>{set_data_sheet(e.target.files[0])})}/>
                        </FormControl>
                    }
                </>
            }
            {is_safety_data_sheet_uploaded?
                <Uploaded_File name={safety_data_sheet?.name}/>
                :
                <>
                    {safety_data_sheet?
                        <Selected_File Title='Safety data sheet' is_submitting={is_submitting} name={safety_data_sheet?.name} file_type='safety_data_sheet' set_safety_data_sheet={set_safety_data_sheet}/>
                    :
                    <FormControl mt='4'>
                        <FormLabel fontWeight={'bold'}>Safety data sheet</FormLabel>
                        <Input type='file' p='1' onChange={((e)=>{set_safety_data_sheet(e.target.files[0])})}/>
                    </FormControl>
                    }
                </>
            }
            {is_formulation_document_uploaded?
                <Uploaded_File name={formulation_document?.name}/>
                :
                <>
                    {formulation_document?
                        <Selected_File Title='Formulation document' is_submitting={is_submitting} name={formulation_document?.name} file_type='formulation_document' set_formulation_document={set_formulation_document}/>
                    :
                    <FormControl mt='4'>
                        <FormLabel fontWeight={'bold'}>Formulation document</FormLabel>
                        <Input type='file' p='1' onChange={((e)=>{set_formulation_document(e.target.files[0])})}/>
                    </FormControl>
                    }
                </>
            }
            <Box mt='2' align='end' gap='2'>
                <Tooltip hasArrow label='Go back to editing the product details'  placement='auto' >
                    <Button leftIcon={<FaArrowLeft />} onClick={(()=>{set_isfileupload(false)})}>Edit product</Button>
                </Tooltip>
                <Tooltip hasArrow label='Finish and create product. This will save the files too.'  placement='auto'>
                    <Button ml={'2'} bg='#009393' color='#fff' onClick={Handle_Upload_Documents}>Save product</Button>
                </Tooltip>
            </Box>
       </Box>
    )
}