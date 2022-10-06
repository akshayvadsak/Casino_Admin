import { useState, useEffect } from 'react';
import { Box, Button, useTheme, useMediaQuery, Divider, Tooltip, IconButton, Typography } from '@mui/material';
import { IconCirclePlus as AddIcon, IconPencil as UpdateIcon, IconTrash as DeleteIcon } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import fetchPermissions from 'functions/fetchPermissions';
// Components
import DataTable from 'components/DataTable';
import Modal from 'components/ResponsiveModal';
import MainCard from '../../../../ui-component/cards/MainCard';
import NotFoundCard from 'components/NotFoundCard';
import DeleteConfirmation from './components/Dialog/DeleteConfirmation';

import { setDataIndex } from 'store/reducers/configuration/constants.reducer';
import AlertComponent from 'components/Alert';
import { getConstants, updateConstants } from 'store/thunk/configuration/constants.thunk';
import CreateConstants from './components/Forms/CreateConstants';
import UpdateConstants from './components/Forms/UpdateConstants';
import handlePermissions from 'functions/handlePermissions';

function Constants() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const constants = useSelector((state) => state.constants);

    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    const [openModal, setOpenModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const [pageLmit, setpageLmit] = useState(10);
    const [pageNo, setPageNo] = useState(0);
    const [constantId, setConstantId] = useState();
    const [constantsIdx, setConstantsIdx] = useState();

    const [menuPermissions, setMenuPermissions] = useState([]);
    const [agentPermissions, setAgentPermissions] = useState([]);

    useEffect(() => {
        const { agentPermissions, menuPermissions } = handlePermissions({ url: window.location.href, isSubMenu: true });
        setMenuPermissions(menuPermissions);
        setAgentPermissions(agentPermissions);
    }, []);

    function handleUpdateModal(idx) {
        setConstantsIdx(idx);
        setUpdateModal(!updateModal);
    }

    const columns = [
        {
            name: 'dataindex',
            label: 'SR NO',
            options: {
                filter: false,
                sort: true,
                customBodyRenderLite: (dataIndex) => {
                    const val = dataIndex + 1 + pageLmit * pageNo;
                    return val;
                }
            }
        },
        {
            name: 'CONST_NAME',
            label: 'NAME',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <Typography>{value}</Typography>
            }
        },
        {
            name: 'CONST_VALUE',
            label: 'VALUES',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => <Typography>{value}</Typography>
            }
        },
        {
            name: 'UPDATE_DATE',
            label: 'LAST UPDATED',
            options: {
                filter: false,
                sort: true,
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
        count: constants.totalRecords,
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
        dispatch(getConstants({ pageno: pageNo, limit: pageLmit }));
    }, []);

    return (
        <>
            <Box>
                <MainCard
                    title={!isMobileDevice && 'Keywords List'}
                    secondary={
                        menuPermissions.ISNEW ? (
                            <Button startIcon={<AddIcon />} onClick={() => setOpenModal(!openModal)} variant="contained" color="secondary">
                                Add Constant
                            </Button>
                        ) : null
                    }
                >
                    {isMobileDevice && menuPermissions.ISNEW && (
                        <>
                            <Button
                                startIcon={<AddIcon />}
                                fullWidth
                                onClick={() => setOpenModal(!openModal)}
                                variant="contained"
                                color="secondary"
                                style={{ marginBottom: 15 }}
                            >
                                Add Constant
                            </Button>
                            <Divider />
                        </>
                    )}
                    <Box>
                        {constants.data.length > 0 && menuPermissions.ISVIEW ? (
                            <DataTable title="Keywords List" data={constants.data} columns={columns} options={options} />
                        ) : (
                            <NotFoundCard msg="Sorry, No data found" />
                        )}
                    </Box>
                </MainCard>

                {constants.status === 'failed' && <AlertComponent status="false" message={constants.msg} />}
                {constants.status === 'success' && <AlertComponent status="true" message={constants.msg} />}

                <Modal title="Add New Constant" open={openModal} onClose={() => setOpenModal(!openModal)}>
                    <CreateConstants
                        dispatch={dispatch}
                        isMobileDevice={isMobileDevice}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        theme={theme}
                    />
                </Modal>

                <Modal title="Update FAQ" open={updateModal} onClose={() => setUpdateModal(!updateModal)}>
                    <UpdateConstants
                        constants={constants}
                        dispatch={dispatch}
                        isMobileDevice={isMobileDevice}
                        openModal={updateModal}
                        setOpenModal={setUpdateModal}
                        theme={theme}
                        constantsIdx={constantsIdx}
                    />
                </Modal>
            </Box>
        </>
    );
}

export default Constants;
