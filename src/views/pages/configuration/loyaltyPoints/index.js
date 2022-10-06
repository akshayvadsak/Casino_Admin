import { useState, useEffect, use } from 'react';
import { Tooltip, Box, Button, useTheme, useMediaQuery, Divider, Typography, IconButton } from '@mui/material';
import { IconCirclePlus as AddIcon, IconPencil as UpdateIcon, IconTrash as DeleteIcon } from '@tabler/icons';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

// Components
import DataTable from 'components/DataTable';
import ModalComponent from 'components/ResponsiveModal';
import MainCard from '../../../../ui-component/cards/MainCard';
import NotFoundCard from 'components/NotFoundCard';
import CreateLoyaltyPack from './components/Forms/CreateLoyaltyPack';
import UpdateLoyaltyPack from './components/Forms/UpdateLoyaltyPack';
import DeleteConfirmation from './components/Dialog/DeleteConfirmation';
import { getLoyaltyPack } from 'store/thunk/configuration/loyaltyPack.thunk';
import { setDataIndex } from 'store/reducers/configuration/loyaltyPack.reducer';
import AlertComponent from 'components/Alert';
import fetchPermissions from 'functions/fetchPermissions';
import handlePermissions from 'functions/handlePermissions';

function LoyaltyPoints() {
    const dispatch = useDispatch();
    const loyaltyPack = useSelector((state) => state.loyaltyPack);
    const [openModal, setOpenModal] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    const [loyaltyPackId, setLoyaltyPackId] = useState();
    const [loyaltyPackIdx, setLoyaltyPackIdx] = useState();
    const [pageLmit, setpageLmit] = useState(10);
    const [pageNo, setPageNo] = useState(0);

    const [menuPermissions, setMenuPermissions] = useState([]);
    const [agentPermissions, setAgentPermissions] = useState([]);

    function handleUpdateModal(idx) {
        setLoyaltyPackIdx(idx);
        setUpdateModal(!updateModal);
    }

    const columns = [
        {
            name: 'dataindex',
            label: 'LEVEL NO',
            options: {
                filter: false,
                sort: false,
                customBodyRenderLite: (dataIndex) => {
                    const val = dataIndex + 1 + pageLmit * pageNo;
                    return val;
                }
            }
        },
        {
            name: 'LOYALTY_NAME',
            label: 'LOYALTY NAME',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => <Typography>{value}</Typography>
            }
        },
        {
            name: 'POINTS_RANGE',
            label: 'POINTS RANGE',
            options: {
                filter: true,
                sort: false,
                customBodyRenderLite: (dataIndex) => (
                    <Typography>
                        {loyaltyPack.data[dataIndex].LOYALTY_START_POINTS} - {loyaltyPack.data[dataIndex].LOYALTY_END_POINTS}
                    </Typography>
                )
            }
        },
        {
            name: 'LOYALTY_MULTIPLIER',
            label: 'MULTIPLIER',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) => <Typography>{value}</Typography>
            }
        },
        // {
        //     name: 'LOYALTY_MULTIPLIER',
        //     label: 'WAGERING VALUE',
        //     options: {
        //         filter: false,
        //         sort: false,
        //         customBodyRender: (value, tableMeta, updateValue) => (
        //             <Typography>
        //                 ${1} = {1 * tableMeta.rowData[3]} Loyalty Points
        //             </Typography>
        //         )
        //     }
        // },
        {
            name: 'LOYALTY_MULTIPLIER',
            label: 'POINTS EARNED PER $1000 WEGERED',
            options: {
                filter: false,
                sort: false,
                customBodyRenderLite: (dataIndex) => (
                    <Typography>
                        If player spent $
                        {Math.abs(loyaltyPack.data[dataIndex].LOYALTY_END_POINTS - loyaltyPack.data[dataIndex].LOYALTY_START_POINTS)} then
                        player will get{' '}
                        {parseInt(
                            (loyaltyPack.data[dataIndex].LOYALTY_END_POINTS - loyaltyPack.data[dataIndex].LOYALTY_START_POINTS) *
                                loyaltyPack.data[dataIndex].LOYALTY_MULTIPLIER
                        )}{' '}
                        points
                    </Typography>
                )
            }
        },
        {
            name: 'UPDATE_DATE',
            label: 'LAST UPDATED',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) => <Typography>{moment(value).format('DD/MM/YYYY HH:MM A')}</Typography>
            }
        },
        {
            name: 'action',
            label: 'Actions',
            options: {
                filter: false,
                sort: false,
                customBodyRenderLite: (dataIndex) => (
                    <>
                        {menuPermissions.ISUPDATE ? (
                            <Tooltip title="Update">
                                <IconButton
                                    color="primary"
                                    onClick={() => {
                                        dispatch(setDataIndex(dataIndex));
                                        handleUpdateModal(dataIndex);
                                    }}
                                >
                                    <UpdateIcon />
                                </IconButton>
                            </Tooltip>
                        ) : null}
                        {menuPermissions.ISDELETE ? (
                            <Tooltip title="Delete">
                                <IconButton
                                    color="error"
                                    onClick={() => {
                                        setOpenDialog(!openDialog);
                                        setLoyaltyPackId(loyaltyPack.data[dataIndex].LOYALTY_ID);
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        ) : null}
                    </>
                )
            }
        }
    ];

    const options = {
        filter: true,
        print: false,
        download: false,
        search: false,
        selectableRows: false,
        rowsPerPage: pageLmit,
        pagination: true,
        rowsPerPageOptions: [10, 20, 30],
        serverSide: true,
        count: loyaltyPack.totalRecords,
        sortThirdClickReset: true,
        jumpToPage: true,
        onChangeRowsPerPage: (page) => {
            setpageLmit(page);
        },
        onChangePage: (page) => {
            setPageNo(page);
        }
    };

    useEffect(() => {
        dispatch(getLoyaltyPack({ pageno: pageNo, limit: pageLmit }));
    }, [pageLmit, pageNo]);

    useEffect(() => {
        const { agentPermissions, menuPermissions } = handlePermissions({ url: window.location.href, isSubMenu: true });
        setMenuPermissions(menuPermissions);
        setAgentPermissions(agentPermissions);
    }, []);

    return (
        <>
            <Box>
                <MainCard
                    title={!isMobileDevice && 'Loyalty Points'}
                    secondary={
                        menuPermissions.ISNEW ? (
                            <Tooltip title="Add New Loyalty Level">
                                <Button
                                    startIcon={<AddIcon />}
                                    onClick={() => setOpenModal(!openModal)}
                                    variant="contained"
                                    color="secondary"
                                    id="add-new-loyalty-level"
                                >
                                    Add Loyalty Level
                                </Button>
                            </Tooltip>
                        ) : null
                    }
                >
                    {isMobileDevice && menuPermissions.ISNEW && (
                        <>
                            <Button
                                startIcon={<AddIcon />}
                                fullWidth
                                style={{ marginBottom: 15 }}
                                onClick={() => setOpenModal(!openModal)}
                                variant="contained"
                                color="secondary"
                            >
                                Add Loyalty Level
                            </Button>
                            <Divider />
                        </>
                    )}
                    <Box>
                        {loyaltyPack.data.length > 0 && menuPermissions.ISVIEW ? (
                            <DataTable title="Loyalty Levels List" data={loyaltyPack.data} columns={columns} options={options} />
                        ) : (
                            <NotFoundCard msg="Sorry, No data found" />
                        )}
                    </Box>
                </MainCard>

                {loyaltyPack.status === 'failed' && <AlertComponent status="false" message={loyaltyPack.msg} />}
                {loyaltyPack.status === 'success' && <AlertComponent status="true" message={loyaltyPack.msg} />}

                <ModalComponent title="Add New Loyalty Level" open={openModal} onClose={() => setOpenModal(!openModal)}>
                    <CreateLoyaltyPack
                        dispatch={dispatch}
                        isMobileDevice={isMobileDevice}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        theme={theme}
                    />
                </ModalComponent>
                <ModalComponent title="Update Loyalty Level" open={updateModal} onClose={() => setUpdateModal(!updateModal)}>
                    <UpdateLoyaltyPack
                        loyaltyPack={loyaltyPack}
                        dispatch={dispatch}
                        isMobileDevice={isMobileDevice}
                        openModal={updateModal}
                        setOpenModal={setUpdateModal}
                        theme={theme}
                        loyaltyPackIndex={loyaltyPackIdx}
                    />
                </ModalComponent>
            </Box>

            {/* Delete confirmation dialog */}
            <Box>
                <DeleteConfirmation
                    loyaltyPack={loyaltyPack}
                    dispatch={dispatch}
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    loyaltyPackId={loyaltyPackId}
                />
            </Box>
        </>
    );
}

export default LoyaltyPoints;
