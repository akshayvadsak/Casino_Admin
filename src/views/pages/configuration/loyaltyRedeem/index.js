import { useEffect, useState } from 'react';
import { Box, Button, Grid, useTheme, useMediaQuery } from '@mui/material';
import { IconCirclePlus as AddIcon } from '@tabler/icons';

import { useSelector, useDispatch } from 'react-redux';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import Modal from 'components/ResponsiveModal';
import PackCard from './components/Cards/PackCard';
import CreateRedeemPack from './components/Forms/CreateRedeemPack';
import UpdateRedeemPack from './components/Forms/UpdateRedeemPack';
import NotFoundCard from 'components/NotFoundCard';
import { getCoinPack } from 'store/thunk/configuration/coinPack.thunk';
import AlertComponent from 'components/Alert';
import DeleteConfirmation from './components/Dialog/DeleteConfirmation';
import { setDataIndex } from 'store/reducers/configuration/coinPack.reducer';
import fetchPermissions from 'functions/fetchPermissions';
import handlePermissions from 'functions/handlePermissions';

function GamingPack() {
    const dispatch = useDispatch();
    const loyaltyRedeem = useSelector((state) => state.loyaltyRedeem);
    const [openModal, setOpenModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [loyaltyRedeemPackId, setLoyaltyRedeemPackId] = useState();
    const [dataIdx, setDataIdx] = useState();

    const [menuPermissions, setMenuPermissions] = useState([]);
    const [agentPermissions, setAgentPermissions] = useState([]);

    useEffect(() => {
        const { agentPermissions, menuPermissions } = handlePermissions({ url: window.location.href, isSubMenu: true });
        setMenuPermissions(menuPermissions);
        setAgentPermissions(agentPermissions);
    }, []);

    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        dispatch(getCoinPack({ pageno: 0, limit: 10 }));
    }, []);

    const handleUpdateModal = (idx) => {
        setDataIdx(idx);
        dispatch(setDataIndex(idx));
        setUpdateModal(!updateModal);
    };

    const handleDeleteDialog = (id) => {
        setLoyaltyRedeemPackId(id);
        setOpenDialog(!openDialog);
    };

    return (
        <>
            <Box>
                <MainCard
                    title="Loyalty Points Redeem"
                    secondary={
                        <Button
                            startIcon={<AddIcon />}
                            variant="contained"
                            color="primary"
                            sx={{ mx: 3 }}
                            onClick={() => setOpenModal(!openModal)}
                            id="add-pack"
                        >
                            Create Pack
                        </Button>
                    }
                >
                    <Box>
                        {loyaltyRedeem.data.length > 0 ? (
                            <Grid container spacing={4}>
                                {loyaltyRedeem.data?.map((pack_info, index) => (
                                    <Grid item lg={3} md={3} sm={6} xs={12}>
                                        <PackCard
                                            data={pack_info}
                                            dataIndex={index}
                                            handleEdit={handleUpdateModal}
                                            handleDelete={handleDeleteDialog}
                                            ISDELETE={true}
                                            ISUPDATE={true}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <NotFoundCard msg="Sorry, No data found" />
                        )}
                    </Box>
                </MainCard>

                {loyaltyRedeem.status === 'failed' && <AlertComponent status="false" message={loyaltyRedeem.msg} />}
                {loyaltyRedeem.status === 'success' && <AlertComponent status="true" message={loyaltyRedeem.msg} />}

                <Modal title="Add New Pack" open={openModal} onClose={() => setOpenModal(!openModal)}>
                    <CreateRedeemPack
                        dispatch={dispatch}
                        isMobileDevice={isMobileDevice}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        theme={theme}
                    />
                </Modal>

                <Modal title="Update Pack" open={updateModal} onClose={() => setUpdateModal(!updateModal)}>
                    <UpdateRedeemPack
                        loyaltyRedeem={loyaltyRedeem}
                        dispatch={dispatch}
                        isMobileDevice={isMobileDevice}
                        openModal={updateModal}
                        setOpenModal={setUpdateModal}
                        theme={theme}
                        dataIndex={dataIdx}
                    />
                </Modal>
            </Box>

            {/* Delete confirmation dialog */}
            <Box>
                <DeleteConfirmation
                    loyaltyRedeem={loyaltyRedeem}
                    dispatch={dispatch}
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    loyaltyRedeemPackId={loyaltyRedeemPackId}
                />
            </Box>
        </>
    );
}

export default GamingPack;
