export const UseFileTypeChecker=(file)=>{
    /**
     * File_Type_Checker: Checks if the uploaded files are of pdf format.
     * Returns:
     *      true if any files are not of the correct format
     *      false if the files are of the right format.
    */
    if (file?.type !== 'application/pdf' && file){
        return true;       
    }else{
        return false;
    }
}