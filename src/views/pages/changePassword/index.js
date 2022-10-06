import {
    Box,
    Button,
    TextField,
    Grid,
    OutlinedInput,
    FormControl,
    InputLabel,
    Typography,
    FormHelperText,
    InputAdornment,
    IconButton
} from '@mui/material';
import { IconLock as ChangePasswordIcon, IconX as CancelIcon } from '@tabler/icons';
import { API_URL, InternalAPI } from 'common/constants';
import AlertComponent from 'components/Alert';
import { useFormik } from 'formik';
import { useState } from 'react';
import changePasswordSchema from 'schema/changePassword.schema';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Components

import MainCard from 'ui-component/cards/MainCard';

function ChangePassword() {
    const { userdata } = JSON.parse(localStorage.getItem('MAJESTIC_CASINO'));

    const [res, setRes] = useState({ status: null, msg: '' });
    const [showPassword, setShowPassword] = useState(false);

    // HANDLE SHOW PASSWORD
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
            password: '',
            confirm_password: ''
        },
        validationSchema: changePasswordSchema,
        onSubmit: (values) => {
            changePassword({ email: userdata.AGENT_EMAIL, password: values.password });
        }
    });

    // CHANGE USER PASSWORD
    const changePassword = async ({ email, password }) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ AGENT_EMAIL: email, AGENT_PASSWORD: password })
        };
        const response = await fetch(`${API_URL}${InternalAPI.PASSWORDCHANGE}`, requestOptions);
        if (response.status === 200) {
            const result = await response.json();
            if (result.status === true) {
                setRes({ ...res, status: 'success', msg: result.msg });
            } else {
                setRes({ status: 'failed', msg: result.msg });
            }
            setTimeout(() => {
                setRes({ status: null, msg: '' });
            }, 2000);
        }
    };
    return (
        <Box>
            <MainCard title="Change Password">
                <Box>
                    <form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleBlur}>
                        <Grid container spacing={2} direction="column">
                            <Grid item>
                                <Grid container spacing={2} direction="column">
                                    <Grid item sm={12}>
                                        <Typography variant="paragraph" style={{ letterSpacing: 1, fontWeight: 900, fontSize: 15 }}>
                                            Email: {userdata.AGENT_EMAIL}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <FormControl fullWidth error={formik.touched.password && Boolean(formik.errors.password)}>
                                            <InputLabel htmlFor="new_password">New Password</InputLabel>
                                            <OutlinedInput
                                                type={showPassword ? 'text' : 'password'}
                                                value={formik.password}
                                                name="password"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                id="new_password"
                                                label="New password"
                                                fullWidth
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            size="large"
                                                        >
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                            {formik.touched.password && formik.errors.password && (
                                                <FormHelperText id="question-error">{formik.errors.password}</FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <FormControl
                                            fullWidth
                                            error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                                        >
                                            <InputLabel htmlFor="confirm_password">Confirm Password</InputLabel>
                                            <OutlinedInput
                                                type={showPassword ? 'text' : 'password'}
                                                value={formik.confirm_password}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                name="confirm_password"
                                                id="confirm_password"
                                                label="Confirm password"
                                                fullWidth
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            size="large"
                                                        >
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                            {formik.touched.confirm_password && formik.errors.confirm_password && (
                                                <FormHelperText id="question-error">{formik.errors.confirm_password}</FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Box style={{ float: 'right', padding: 5 }}>
                                    <Button
                                        type="reset"
                                        startIcon={<CancelIcon />}
                                        variant="contained"
                                        color="error"
                                        style={{ marginRight: 5 }}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        startIcon={<ChangePasswordIcon />}
                                        variant="contained"
                                        color="primary"
                                        style={{ marginLeft: 5 }}
                                        type="submit"
                                    >
                                        Change Password
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </MainCard>

            {res.status === 'failed' && <AlertComponent status="false" message={res.msg} />}
            {res.status === 'success' && <AlertComponent status="true" message={res.msg} />}
        </Box>
    );
}

export default ChangePassword;
