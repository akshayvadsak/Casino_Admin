import { Dialog, DialogTitle, DialogContentText, DialogContent, Button, DialogActions } from '@mui/material';
import { deleteRedemptionPack } from 'store/thunk/configuration/loyaltyRedeem.thunk';

function DeleteConfirmation({ dispatch, openDialog, setOpenDialog, loyaltyRedeemPackId }) {
    return (
        <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(!openDialog)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Delete Confirmation Window</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">Are you sure you want to delete?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(!openDialog)}>Disagree</Button>
                <Button
                    onClick={() => {
                        dispatch(deleteRedemptionPack({ id: loyaltyRedeemPackId }));
                        setOpenDialog(!openDialog);
                    }}
                    autoFocus
                >
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteConfirmation;
