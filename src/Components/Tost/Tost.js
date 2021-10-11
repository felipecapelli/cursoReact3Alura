import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export default ({open, handleClose, children, severity }) => (
    <Snackbar 
        open={open} 
        onClose={handleClose}
        message='SnackBar funcionando'
        autoHideDuration={2000}
    >
        <Alert 
            variant='filled' 
            severity={severity}> 
                {children}
        </Alert>
    </Snackbar>
)