import { Dialog, DialogTitle, DialogContentText, DialogContent, Button, DialogActions } from '@mui/material';
import { blockPlayer } from 'store/thunk/player.thunk';
import PlayerWithdraw from 'views/pages/transaction/Player/components/Forms/PlayerWithdrawForm';

function BlockConfirmation({ dispatch, openDialog, setOpenDialog, playerId, playerStatus }) {
    return (
        <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(!openDialog)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Block Confirmation Window</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">Are you sure you want to block this player?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(!openDialog)}>Disagree</Button>
                <Button
                    onClick={() => {
                        dispatch(blockPlayer({ id: playerId, playerStatus: !playerStatus }));
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

export default BlockConfirmation;
