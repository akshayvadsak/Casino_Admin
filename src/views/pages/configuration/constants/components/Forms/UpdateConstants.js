import { Box, Button, OutlinedInput, FormHelperText, InputLabel, FormControl } from '@mui/material';
import { IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';
import { useFormik } from 'formik';
import ConstantsSchema from 'schema/constants.schema';
import { updateConstants } from 'store/thunk/configuration/constants.thunk';

function UpdateConstants({ constants, dispatch, isMobileDevice, openModal, setOpenModal, theme, constantsIdx }) {
    const formik = useFormik({
        initialValues: {
            name: constants.data[constantsIdx].CONST_NAME || '',
            value: constants.data[constantsIdx].CONST_VALUE || '',
            id: constants.data[constantsIdx].CONST_ID
        },
        validationSchema: ConstantsSchema,
        onSubmit: (values) => {
            dispatch(updateConstants(values));
            setOpenModal(!openModal);
        }
    });

    console.log(formik);

    return (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <form noValidate onSubmit={formik.handleSubmit}>
                <FormControl fullWidth style={{ margin: '10px 0' }} error={formik.touched.name && Boolean(formik.errors.name)}>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <OutlinedInput
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        label="Name"
                        id="name"
                    />
                    {formik.touched.name && formik.errors.name && <FormHelperText id="question-error">{formik.errors.name}</FormHelperText>}
                </FormControl>
                <FormControl fullWidth style={{ margin: '10px 0' }} error={formik.touched.value && Boolean(formik.errors.value)}>
                    <InputLabel htmlFor="value">Value</InputLabel>
                    <OutlinedInput
                        value={formik.values.value}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        multiline
                        rows={4}
                        variant="outlined"
                        label="Value"
                        id="value"
                        name="value"
                    />
                    {formik.touched.value && formik.errors.value && (
                        <FormHelperText id="answer-error">{formik.errors.value}</FormHelperText>
                    )}
                </FormControl>
                <Box style={{ display: 'flex', justifyContent: 'right', float: 'right' }}>
                    <Button
                        type="reset"
                        onClick={() => setOpenModal(!openModal)}
                        variant="contained"
                        color={theme.palette.secondary.light[800]}
                        style={{
                            margin: 10,
                            color: 'white'
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
                        // disabled={!(formik.isValid && formik.dirty)}
                    >
                        Submit
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

export default UpdateConstants;
