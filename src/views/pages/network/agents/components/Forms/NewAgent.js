import React, { useEffect, useState } from 'react';
import {
    Box,
    MenuItem,
    Grid,
    Button,
    useTheme,
    Chip,
    Select,
    FormControl,
    InputLabel,
    OutlinedInput,
    Checkbox,
    ListItemText,
    useMediaQuery,
    FormHelperText,
    Typography
} from '@mui/material';
import { IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';
import propTypes from 'prop-types';
import { useFormik } from 'formik';
import agentSchema from 'schema/agent.schema';
import { createAgent, getAgentTypeList, getGamesList, getPermissionsList } from 'store/thunk/network/agent.thunk';
import { removeLastAgentType } from 'store/reducers/network/agent.reducer';
import { API_URL, InternalAPI, SubRoutes } from 'common/constants';

function CreateAgent({ onClose, openModal, dispatch, agent }) {
    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    const [agentIndex, setAgentIndex] = useState('');
    const [agentList, setAgentList] = useState({});

    const [cashiorIndex, setCashiorIndex] = useState();

    const formik = useFormik({
        initialValues: {
            username: '',
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            phone_no: '',
            agent: '',
            parent: [],
            address: '',
            game_type_permissions: [],
            permissions: [],
            active: false.toString()
        },
        validationSchema: agentSchema,
        onSubmit: (values) => {
            const data = {};
            console.log(values);
            Object.assign(data, { AGENT_NAME: values.name });
            Object.assign(data, { AGENT_USERNAME: values.username });
            Object.assign(data, { AGENT_EMAIL: values.email });
            Object.assign(data, { PASSWORD: values.password });
            Object.assign(data, { AGENT_PHONE: values.phone_no });
            values.parent !== ''
                ? Object.assign(data, {
                      PARENT_AGENT_ID: values.parent.length > 0 ? values.parent[values.parent.length - 1] : values.parent
                  })
                : Object.assign(data, { PARENT_AGENT_ID: 0 });
            Object.assign(data, { ADDRESS: values.address });
            Object.assign(data, { ROLE_ID: values.agent });
            Object.assign(data, { GAMEGROUP_IDS: values.game_type_permissions.toString() });
            Object.assign(data, { AGENT_PERMISSION_IDS: values.permissions.toString() });
            Object.assign(data, { ISACTIVE: values.active === 'true' ? true : false });
            dispatch(createAgent(data));
            onClose(!openModal);
        }
    });

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        }
    };

    // HANDLE GAME TYPES SELECTION
    const handleGameTypeChange = (event) => {
        const {
            target: { value }
        } = event;
        formik.setFieldValue('game_type_permissions', typeof value === 'string' ? value.split(',') : value);
    };

    // HANDLE PERMISSIONS SELECTION
    const handlePermissionsChange = (event) => {
        const {
            target: { value }
        } = event;
        formik.setFieldValue('permissions', typeof value === 'string' ? value.split(',') : value);
    };

    // HANDLE PARENT SELECTION
    const handleParentChange = (event, role, agent) => {
        // CHECKING IF THE AGENT IS CASHIOR
        if (agent[cashiorIndex]?.AGENT_ID !== undefined) {
            formik.setFieldValue('parent', [...formik.values.parent, agent[cashiorIndex]?.AGENT_ID]);
        } else {
            formik.setFieldValue('parent', [...formik.values.parent, event.target.value]);
        }

        getChildAgentData(role, agent[cashiorIndex] ? agent[cashiorIndex] : agent[0]);
    };

    // GETTING AGENT TYPES AND GAME TYPES LIST ON PAGE RENDER
    useEffect(() => {
        dispatch(getAgentTypeList());
        dispatch(getGamesList({ id: 123 }));
    }, []);

    // GETTING AGENT TYPES AND GAME TYPES LIST ON PAGE RENDER
    useEffect(() => {
        if (typeof agentIndex === 'number') {
            dispatch(removeLastAgentType(agentIndex));
        }
    }, [agentIndex]);

    // GETTING PERMISSIONS LIST AND AGENT DATA AFTER AGENT TYPE SELECTION
    useEffect(() => {
        if (typeof formik.values.agent === 'number') {
            formik.setFieldValue('permissions', []);
            dispatch(getPermissionsList({ id: formik.values.agent }));
            getAgentData();
        }
    }, [formik.values.agent]);

    useEffect(() => {
        const veryfyUsernameTimer = setTimeout(() => {
            if (formik.values.username != '') {
                verifyUsername();
            }
        }, [1000]);
        return () => clearTimeout(veryfyUsernameTimer);
    }, [formik.values.username]);

    // CALLING API TO GET AGENT DATA BASED ON AGENT TYPE
    const getAgentData = async () => {
        if (agent.agentTypesList[[agent.agentTypesList.length - 1]].ROLE_ID !== agent.agentTypesList[agentIndex].ROLE_ID) {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            if (agent.agentTypesList[agentIndex].ROLE_PARENT_ID.split(',').length > 0) {
                const response = await fetch(
                    `${API_URL}${InternalAPI.AGENT}${SubRoutes.AGENTLIST}/${agent.agentTypesList[0].ROLE_ID}`,
                    requestOptions
                );
                if (response.status === 200) {
                    const result = await response.json();
                    if (result.status === true) {
                        setAgentList({ ...agentList, [agent.agentTypesList[0].ROLE_ID]: result.data });
                    }
                }
            } else {
                const response = await fetch(`${API_URL}${InternalAPI.AGENT}${SubRoutes.AGENTLIST}`, requestOptions);
                if (response.status === 200) {
                    const result = await response.json();
                    if (result.status === true) {
                        setAgentList({ ...agentList, [agent.agentTypesList[0].ROLE_ID]: result.data });
                    }
                }
            }
        } else {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch(
                `${API_URL}${InternalAPI.AGENT}${SubRoutes.AGENTLIST}/${agent.agentTypesList[agentIndex - 1].ROLE_ID}`,
                requestOptions
            );
            if (response.status === 200) {
                const result = await response.json();
                if (result.status === true) {
                    setAgentList({ ...agentList, [agent.agentTypesList[agentIndex - 1].ROLE_ID]: result.data });
                }
            }
        }
    };

    // CALLING API TO GET CHILD AGENT DATA BASED ON AGENT TYPE
    const getChildAgentData = async (role, agent) => {
        if (agent !== undefined) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ AGENT_ID: agent.AGENT_ID, ROLE_ID: role.ROLE_ID })
            };
            const response = await fetch(`${API_URL}${InternalAPI.AGENT}${SubRoutes.AGENTS}`, requestOptions);
            if (response.status === 200) {
                const result = await response.json();
                if (result.status === true && result.data.length > 0) {
                    setAgentList({ ...agentList, [role.ROLE_ID]: result.data });
                }
            }
        }
    };

    // CALLING API TO VERIFY USERNAME
    const verifyUsername = async (e) => {
        try {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ AGENT_USERNAME: formik.values.username })
            };
            const response = await fetch(`${API_URL}${InternalAPI.AGENT}${SubRoutes.AGENTS}`, requestOptions);
            if (response.status === 200) {
                const result = await response.json();
                if (result.status === false) {
                    formik.setStatus({ username: 'Username already exists' });
                }
                if (result.status === true) {
                    formik.setStatus(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <Grid container>
                    {/* NAME FIELD */}
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl
                            fullWidth
                            style={{ marginTop: 10, marginBottom: 10, width: '99%' }}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                        >
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <OutlinedInput
                                value={formik.values.name}
                                type="text"
                                id="name"
                                name="name"
                                label="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            />
                            {formik.touched.name && formik.errors.name && <FormHelperText>{formik.errors.name}</FormHelperText>}
                        </FormControl>
                    </Grid>

                    {/* USERNAME FIELD */}
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl
                            fullWidth
                            style={{ marginTop: 10, marginBottom: 10, width: '99%' }}
                            error={(formik.touched.username && Boolean(formik.errors.username)) || Boolean(formik.status)}
                        >
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <OutlinedInput
                                value={formik.values.username}
                                type="text"
                                id="username"
                                name="username"
                                label="Username"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                variant="outlined"
                                required
                            />
                            {formik.touched.username && formik.errors.username && <FormHelperText>{formik.errors.username}</FormHelperText>}
                            {!!formik.status && <FormHelperText>{formik.status.username}</FormHelperText>}
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container>
                    {/* EMAIL FIELD */}
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl
                            fullWidth
                            style={{ marginTop: 10, marginBottom: 10, width: '99%' }}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                        >
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <OutlinedInput
                                value={formik.values.email}
                                type="text"
                                id="email"
                                name="email"
                                label="Email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                variant="outlined"
                                required
                            />
                            {formik.touched.email && formik.errors.email && <FormHelperText>{formik.errors.email}</FormHelperText>}
                        </FormControl>
                    </Grid>

                    {/* PHONE NO FIELD */}
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl
                            fullWidth
                            style={{ marginTop: 10, marginBottom: 10, width: '99%' }}
                            error={formik.touched.phone_no && Boolean(formik.errors.phone_no)}
                        >
                            <InputLabel htmlFor="phone_no">Phone No</InputLabel>
                            <OutlinedInput
                                value={formik.values.phone_no}
                                type="text"
                                id="phone_no"
                                name="phone_no"
                                label="Phone No"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                variant="outlined"
                                required
                            />
                            {formik.touched.phone_no && formik.errors.phone_no && <FormHelperText>{formik.errors.phone_no}</FormHelperText>}
                        </FormControl>
                    </Grid>
                </Grid>

                {/* PASSWORD FIELDS */}
                <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl
                            fullWidth
                            style={{ marginTop: 10, marginBottom: 10, width: '99%' }}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                        >
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                value={formik.values.password}
                                type="password"
                                id="password"
                                name="password"
                                label="Password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                variant="outlined"
                                required
                            />
                            {formik.touched.password && formik.errors.password && <FormHelperText>{formik.errors.password}</FormHelperText>}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl
                            fullWidth
                            style={{ marginTop: 10, marginBottom: 10, width: '99%' }}
                            error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                        >
                            <InputLabel htmlFor="confirm_password">Confirm Password</InputLabel>
                            <OutlinedInput
                                value={formik.values.confirm_password}
                                type="password"
                                id="confirm_password"
                                name="confirm_password"
                                label="Confirm Password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                variant="outlined"
                                required
                            />
                            {formik.touched.confirm_password && formik.errors.confirm_password && (
                                <FormHelperText>{formik.errors.confirm_password}</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                </Grid>

                {/* ADDRESS FIELD */}
                <FormControl
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                >
                    <InputLabel htmlFor="address">Address</InputLabel>
                    <OutlinedInput
                        value={formik.values.address}
                        type="text"
                        id="address"
                        name="address"
                        label="Address"
                        size="small"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        multiline
                        rows={5}
                        required
                    />
                    {formik.touched.address && formik.errors.address && <FormHelperText>{formik.errors.address}</FormHelperText>}
                </FormControl>

                {/* AGENT TYPE DROPDOWN LIST */}
                <FormControl
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={formik.touched.agent_type && Boolean(formik.errors.agent_type)}
                >
                    <InputLabel htmlFor="agent">Select Agent Type</InputLabel>
                    <Select
                        value={formik.values.agent}
                        id="agent"
                        name="agent"
                        label="Select Agent Type"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        required
                    >
                        {agent.agentTypesList.length > 0 ? (
                            agent.agentTypesList?.map((item, index) => (
                                <MenuItem value={item.ROLE_ID} onClick={() => setAgentIndex(index)}>
                                    {item.ROLE_NAME}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>No Agent Types Available</MenuItem>
                        )}
                    </Select>
                    {formik.touched.agent_type && formik.errors.agent_type && <FormHelperText>{formik.errors.agent_type}</FormHelperText>}
                </FormControl>

                {/* AGENTS DROPDOWN GRID */}
                <Grid container>
                    {typeof agentIndex === 'number' &&
                    agent.agentTypesList[[agent.agentTypesList.length - 1]].ROLE_ID === agent.agentTypesList[agentIndex].ROLE_ID ? (
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <FormControl
                                fullWidth
                                style={{ marginTop: 10, marginBottom: 10, width: '99%' }}
                                error={formik.touched.agent_type && Boolean(formik.errors.agent_type)}
                            >
                                <InputLabel htmlFor="agent">Select {agent.agentTypesList[agentIndex - 1].ROLE_NAME}</InputLabel>
                                <Select
                                    value={formik.values.parent[0]}
                                    id="agent"
                                    name="agent"
                                    label={`Select ${agent.agentTypesList[agentIndex - 1].ROLE_NAME}`}
                                    onChange={(e) =>
                                        handleParentChange(
                                            e,
                                            agent.agentTypesList[agentIndex - 1],
                                            agentList[agent.agentTypesList[agentIndex - 1].ROLE_ID]
                                        )
                                    }
                                    onBlur={formik.handleBlur}
                                    variant="outlined"
                                    required
                                >
                                    {agentList[agent.agentTypesList[agentIndex - 1].ROLE_ID]?.length > 0 ? (
                                        agentList[agent.agentTypesList[agentIndex - 1].ROLE_ID]?.map((item, index) => (
                                            <MenuItem key={item.AGENT_ID} value={item.AGENT_ID} onClick={() => setCashiorIndex(index)}>
                                                {item.AGENT_USERNAME}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No Agent Types Available</MenuItem>
                                    )}
                                </Select>
                                {formik.touched.agent_type && formik.errors.agent_type && (
                                    <FormHelperText>{formik.errors.agent_type}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                    ) : (
                        agent?.agentTypesList[agentIndex]?.ROLE_PARENT_ID.length > 0 &&
                        agent?.agentTypesList[agentIndex].ROLE_PARENT_ID.split(',').map((value, index) => (
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl
                                    fullWidth
                                    style={{ marginTop: 10, marginBottom: 10, width: '99%' }}
                                    error={formik.touched.agent_type && Boolean(formik.errors.agent_type)}
                                >
                                    <InputLabel htmlFor="agent">Select {agent.agentTypesList[index].ROLE_NAME}</InputLabel>
                                    <Select
                                        value={formik.values.parent[index]}
                                        id="parent"
                                        name="parent"
                                        label={`Select ${agent.agentTypesList[index].ROLE_NAME}`}
                                        onChange={(e) =>
                                            handleParentChange(
                                                e,
                                                agent.agentTypesList[index + 1],
                                                agentList[agent.agentTypesList[index].ROLE_ID]
                                            )
                                        }
                                        onBlur={formik.handleBlur}
                                        variant="outlined"
                                        required
                                    >
                                        {agentList[agent.agentTypesList[index].ROLE_ID]?.length > 0 ? (
                                            agentList[agent.agentTypesList[index].ROLE_ID]?.map((item) => (
                                                <MenuItem key={item.AGENT_ID} value={item.AGENT_ID}>
                                                    {item.AGENT_USERNAME}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem disabled>No Agent Types Available</MenuItem>
                                        )}
                                    </Select>
                                    {formik.touched.agent_type && formik.errors.agent_type && (
                                        <FormHelperText>{formik.errors.agent_type}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        ))
                    )}

                    {/* GAME PERMISSIONS DROPDOWN */}
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl fullWidth style={{ marginTop: 10, marginBottom: 10 }}>
                            <InputLabel id="demo-multiple-chip-label">Select Game Type Permissions</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                fullWidth
                                value={formik.values.game_type_permissions}
                                style={{ width: '99%' }}
                                onChange={handleGameTypeChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.game_type_permissions && Boolean(formik.errors.game_type_permissions)}
                                helperText={formik.touched.game_type_permissions && formik.errors.game_type_permissions}
                                input={<OutlinedInput id="select-multiple-chip" label="Select Game Type Permissions" />}
                                renderValue={(selected, index) => (
                                    <Chip
                                        key={agent.gamesTypesList[index]?.GAMEGROUP_ID}
                                        label={`${selected.length} Game Types Selected`}
                                    />
                                )}
                                MenuProps={MenuProps}
                            >
                                {agent.gamesTypesList.length > 0 ? (
                                    agent.gamesTypesList?.map(({ GAMEGROUP_ID, GAMEGROUP_NAME }) => (
                                        <MenuItem key={GAMEGROUP_ID} value={GAMEGROUP_ID}>
                                            <Checkbox checked={formik.values.game_type_permissions.includes(GAMEGROUP_ID)} />
                                            <ListItemText primary={GAMEGROUP_NAME} />
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No Game Types Available</MenuItem>
                                )}
                            </Select>
                            {formik.touched.game_type_permissions && Boolean(formik.errors.game_type_permissions) && (
                                <FormHelperText>{formik.errors.game_type_permissions}</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>

                    {/* PERMISSIONS DORPDOWN */}
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl fullWidth style={{ marginTop: 10, marginBottom: 10 }}>
                            <InputLabel id="demo-multiple-chip-label">Select Permissions</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                fullWidth
                                style={{ width: '99%' }}
                                value={formik.values.permissions}
                                onChange={handlePermissionsChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.permissions && Boolean(formik.errors.permissions)}
                                helperText={formik.touched.permissions && formik.errors.permissions}
                                input={<OutlinedInput id="select-multiple-chip" label="Select Permissions" />}
                                renderValue={(selected, index) => (
                                    <Chip
                                        key={agent.permissionsList[index]?.AGENT_PERMISSION_ID}
                                        label={`${selected.length} Permissions Selected`}
                                    />
                                )}
                                MenuProps={MenuProps}
                            >
                                {agent.permissionsList.length > 0 ? (
                                    agent.permissionsList?.map(({ AGENT_PERMISSION_ID, AGENT_PERMISSION_VALUE }, index) => (
                                        <MenuItem key={AGENT_PERMISSION_ID} value={AGENT_PERMISSION_ID}>
                                            <Checkbox checked={formik.values.permissions.includes(AGENT_PERMISSION_ID)} />
                                            <ListItemText primary={AGENT_PERMISSION_VALUE} />
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No Permissions Available</MenuItem>
                                )}
                            </Select>
                            {formik.touched.permissions && Boolean(formik.errors.permissions) && (
                                <FormHelperText>{formik.errors.permissions}</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>

                    {/* APPROVE/DISAPPROVE DORPDOWN */}
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl fullWidth style={{ marginTop: 10, marginBottom: 10 }}>
                            <InputLabel htmlFor="approve-agent">Approve Agent</InputLabel>
                            <Select
                                id="approve-agent"
                                label="Approve Agent"
                                fullWidth
                                name="active"
                                value={formik.values.active}
                                style={{ width: '99%' }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.active && Boolean(formik.errors.active)}
                                helperText={formik.touched.active && formik.errors.active}
                            >
                                <MenuItem value={true.toString()}>APPROVE</MenuItem>
                                <MenuItem value={false.toString()}>DISAPPROVE</MenuItem>
                            </Select>
                            {formik.touched.active && Boolean(formik.errors.active) && (
                                <FormHelperText>{formik.errors.active}</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                </Grid>

                {/* BUTTON GROUP (SUBMIT-RESET-CANCEL) */}
                <Box style={{ display: 'flex', justifyContent: 'right', float: 'right', padding: 0 }}>
                    <Button
                        type="reset"
                        onClick={() => onClose(!openModal)}
                        variant="contained"
                        color={theme.palette.secondary.light[800]}
                        style={{
                            margin: 10,
                            color: 'white',
                            paddingLeft: 20,
                            paddingRight: 20
                        }}
                        startIcon={!isMobileDevice && <CancelIcon />}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        type="reset"
                        color="error"
                        style={{
                            color: '#fff',
                            margin: 10,
                            paddingLeft: 20,
                            paddingRight: 20
                        }}
                        startIcon={!isMobileDevice && <ResetIcon />}
                    >
                        Reset
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        color="secondary"
                        style={{
                            color: '#fff',
                            margin: 10,
                            paddingLeft: 20,
                            paddingRight: 20
                        }}
                        startIcon={!isMobileDevice && <SaveIcon />}
                        disabled={!(formik.isValid && formik.dirty)}
                    >
                        Submit
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

CreateAgent.propTypes = {
    formik: propTypes.object,
    openModal: propTypes.string,
    onClose: propTypes.func
};

export default CreateAgent;
