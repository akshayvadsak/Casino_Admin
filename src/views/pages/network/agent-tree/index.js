import { useState, useEffect } from 'react';
import { IconButton, Box, Typography, Button, InputLabel, OutlinedInput, FormControl, Grid, Tooltip } from '@mui/material';
import { IconCaretRight as NextIcon, IconInfoCircle as ViewInfoIcon, IconCaretLeft as PrevIcon } from '@tabler/icons';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import DataTable from 'components/DataTable';

import { useTheme } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { getAgentTreeData, viewAgentData } from 'store/thunk/network/agentTree.thunk';
import AlertComponent from 'components/Alert';
import Modal from 'components/Modal';
import handlePermissions from 'functions/handlePermissions';

function AgentTree() {
    const dispatch = useDispatch();
    const agentTree = useSelector((state) => state.agentTree);
    const [pageNo, setPageNo] = useState(0);
    const [pageLimit, setPageLimit] = useState(10);
    const [openModal, setOpenModal] = useState(false);

    const [requestData, setRequestData] = useState({ pageno: pageNo, limit: pageLimit });
    const [prevRequestData, setPrevRequestData] = useState([]);

    const [menuPermissions, setMenuPermissions] = useState([]);

    useEffect(() => {
        const { agentPermissions, menuPermissions } = handlePermissions({ url: window.location.href, isSubMenu: true });
        setMenuPermissions(menuPermissions);
    }, []);

    const handleNext = (parentAgentId) => {
        prevRequestData.push(requestData);
        dispatch(getAgentTreeData({ ...requestData, roleId: parentAgentId }));
        setRequestData({ ...requestData, roleId: parentAgentId });
    };

    const handlePrevious = () => {
        if (prevRequestData.length > 0) {
            dispatch(getAgentTreeData(prevRequestData[prevRequestData.length - 1]));
            prevRequestData.pop();
        }
    };

    const handleView = (agentId) => {
        setOpenModal(!openModal);
        dispatch(viewAgentData({ agentId: agentId }));
    };

    const options = {
        filter: false,
        print: false,
        download: false,
        search: false,
        selectableRows: false,
        rowsPerPage: pageLimit,
        pagination: true,
        rowsPerPageOptions: [10, 20, 30],
        serverSide: true,
        count: agentTree.totalRecords,
        jumpToPage: true,
        onChangeRowsPerPage: (page) => {
            setPageLimit(page);
        },
        onChangePage: (page) => {
            setPageNo(page);
        }
    };

    const columns = [
        {
            name: 'dataindex',
            label: 'SR NO',
            options: {
                filter: false,
                sort: true,
                customBodyRenderLite: (dataIndex) => {
                    const val = dataIndex + 1 + pageLimit * pageNo;
                    return val;
                }
            }
        },
        {
            name: 'ROLE_NAME',
            label: 'ROLE',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => {
                    return <Typography>{value}</Typography>;
                }
            }
        },
        {
            name: 'AGENT_USERNAME',
            label: 'USERNAME',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => {
                    return <Typography>{value}</Typography>;
                }
            }
        },
        {
            name: 'PLAYERS',
            label: 'PLAYERS',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => <Typography>0</Typography>
            }
        },
        {
            name: 'MAGESTIC_COINS',
            label: 'MAJESTIC COINS',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => <Typography>0</Typography>
            }
        },
        {
            name: 'MAGESTIC_POINTS',
            label: 'MAJESTIC DIAMONDS',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => <Typography>0</Typography>
            }
        },
        {
            name: 'action',
            label: 'Action',
            options: {
                filter: false,
                sort: true,
                customBodyRenderLite: (dataIndex) => {
                    return (
                        <>
                            <Tooltip title="View Info">
                                <IconButton onClick={() => handleView(agentTree.data[dataIndex].AGENT_ID)}>
                                    <ViewInfoIcon />
                                </IconButton>
                            </Tooltip>
                            {prevRequestData.length > 0 && (
                                <Tooltip title="Previous">
                                    <IconButton>
                                        <PrevIcon onClick={handlePrevious} />
                                    </IconButton>
                                </Tooltip>
                            )}
                            <Tooltip title="Next">
                                <IconButton onClick={() => handleNext(agentTree.data[dataIndex].AGENT_ID)}>
                                    <NextIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    );
                }
            }
        }
    ];

    useEffect(() => {
        dispatch(getAgentTreeData(requestData));
    }, []);

    return (
        <Box>
            <MainCard title="Agent Tree">
                <Box>
                    {prevRequestData.length > 0 && menuPermissions.ISVIEW ? (
                        <Button startIcon={<PrevIcon />} style={{ marginBottom: 10 }} onClick={handlePrevious}>
                            Previous Data
                        </Button>
                    ) : (
                        <Box />
                    )}
                    <DataTable title="Agent Types" data={agentTree.data} columns={columns} options={options} />
                </Box>
            </MainCard>

            {agentTree.status === 'failed' && <AlertComponent status="false" message={agentTree.msg} />}
            {agentTree.status === 'success' && <AlertComponent status="true" message={agentTree.msg} />}

            <Modal title="Agent Data" open={openModal} onClose={() => setOpenModal(!openModal)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <InputLabel htmlFor="name" style={{ marginLeft: 5 }}>
                            Name
                        </InputLabel>
                        <OutlinedInput fullWidth id="name" label="Name" disabled value={agentTree.agentData.AGENT_NAME} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <InputLabel htmlFor="phone" style={{ marginLeft: 5 }}>
                            Phone No
                        </InputLabel>
                        <OutlinedInput fullWidth id="phone" label="Phone No" disabled value={agentTree.agentData.AGENT_PHONE} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <InputLabel htmlFor="email" style={{ marginLeft: 5 }}>
                            Email
                        </InputLabel>
                        <OutlinedInput fullWidth id="email" label="Email" disabled value={agentTree.agentData.AGENT_EMAIL} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <InputLabel htmlFor="address" style={{ marginLeft: 5 }}>
                            Address
                        </InputLabel>
                        <OutlinedInput fullWidth id="address" disabled value={agentTree.agentData.ADDRESS} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Button
                            style={{ display: 'flex', justifyContent: 'right', float: 'right' }}
                            onClick={() => setOpenModal(!openModal)}
                            variant="contained"
                            color="secondary"
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Modal>
        </Box>
    );
}

export default AgentTree;
