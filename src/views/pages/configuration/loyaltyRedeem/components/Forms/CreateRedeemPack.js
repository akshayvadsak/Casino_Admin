import { Box, Button, MenuItem, OutlinedInput, FormHelperText, InputLabel, FormControl, Select } from '@mui/material';
import { IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';
import { useFormik } from 'formik';
import gamingPackSchema from 'schema/gamingPack.schema';
import loyaltyRedeemSchema from 'schema/loyaltyRedeem.schema';
import { createLoyaltyRedeemPack } from 'store/thunk/configuration/loyaltyRedeem.thunk';

function CreateRedeemPack({ dispatch, isMobileDevice, openModal, setOpenModal, theme }) {
    const formik = useFormik({
        initialValues: {
            name: '',
            points: '',
            amount: ''
        },
        validationSchema: loyaltyRedeemSchema,
        onSubmit: (values) => {
            dispatch(createLoyaltyRedeemPack(values));
            setOpenModal(!openModal);
        }
    });

    return (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <FormControl fullWidth error={formik.touched.name && Boolean(formik.errors.name)} style={{ marginBottom: 10 }}>
                    <InputLabel htmlFor="name">Pack Name</InputLabel>
                    <OutlinedInput
                        value={formik.values.name}
                        type="text"
                        id="name"
                        label="Pack Name"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        fullWidth
                        required
                    />
                    {formik.touched.name && formik.errors.name && (
                        <FormHelperText error id="pack-name-error">
                            {formik.errors.name}
                        </FormHelperText>
                    )}
                </FormControl>
                <FormControl fullWidth error={formik.touched.points && Boolean(formik.errors.points)} style={{ marginBottom: 10 }}>
                    <InputLabel htmlFor="points">Loyalty Points</InputLabel>
                    <OutlinedInput
                        value={formik.values.points}
                        type="number"
                        label="Loyalty Points"
                        name="points"
                        id="points"
                        min="0"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                    />
                    {formik.touched.points && formik.errors.points && (
                        <FormHelperText id="points-error">{formik.errors.points}</FormHelperText>
                    )}
                </FormControl>
                <FormControl fullWidth error={formik.touched.amount && Boolean(formik.errors.amount)} style={{ marginBottom: 10 }}>
                    <InputLabel htmlFor="amount">amount (in $)</InputLabel>
                    <OutlinedInput
                        value={formik.values.amount}
                        type="number"
                        label="amount (in $)"
                        name="amount"
                        min="0"
                        id="amount"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                    />
                    {formik.touched.amount && formik.errors.amount && (
                        <FormHelperText id="amount-error">{formik.errors.amount}</FormHelperText>
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

export default CreateRedeemPack;
