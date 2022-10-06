import { useEffect } from 'react';
import { Box, Button, MenuItem, OutlinedInput, FormHelperText, InputLabel, FormControl, Select } from '@mui/material';
import { IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';
import { useFormik } from 'formik';
import loyaltyRedeemSchema from 'schema/loyaltyRedeem.schema';
import { updateRedemptionPack } from 'store/thunk/configuration/loyaltyRedeem.thunk';

function UpdateGamePack({ loyaltyRedeem, dispatch, isMobileDevice, openModal, setOpenModal, theme, dataIndex }) {
    const formik = useFormik({
        initialValues: {
            name: loyaltyRedeem.data[dataIndex].PACK_NAME || '',
            points: loyaltyRedeem.data[dataIndex].MAGESTIC_points || '',
            amount: loyaltyRedeem.data[dataIndex].BUY_AMOUNT || '',
            id: loyaltyRedeem.data[dataIndex].PACK_ID
        },
        validationSchema: loyaltyRedeemSchema,
        onSubmit: (values) => {
            dispatch(updateRedemptionPack(values));
            setOpenModal(!openModal);
        }
    });

    useEffect(() => {
        console.log(formik);
    }, [formik]);

    return (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <form noValidate onSubmit={formik.handleSubmit}>
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
                    <InputLabel htmlFor="points">Amount of Majestic points</InputLabel>
                    <OutlinedInput
                        value={formik.values.points}
                        type="number"
                        label="Amount of Majestic points"
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
                {/* <FormControl fullWidth error={formik.touched.discount && Boolean(formik.errors.discount)} style={{ marginBottom: 10 }}>
                    <InputLabel htmlFor="discount">Discount</InputLabel>
                    <Select
                        value={formik.values.discount}
                        select
                        label="Discount"
                        name="discount"
                        id="discount"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        helperText={formik.touched.discount && formik.errors.discount}
                    >
                        <MenuItem value={true.toString()}>Discount</MenuItem>
                        <MenuItem value={false.toString()}>No Discount</MenuItem>
                    </Select>
                </FormControl>
                {formik.values.discount === 'true' && (
                    <FormControl
                        fullWidth
                        error={formik.touched.percentage && Boolean(formik.errors.percentage)}
                        style={{ marginBottom: 10 }}
                    >
                        <InputLabel htmlFor="discount-percentage">Discount Percentage</InputLabel>
                        <OutlinedInput
                            value={formik.values.percentage}
                            type="number"
                            label="Discount Percentage"
                            name="percentage"
                            id="discount-percentage"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            variant="outlined"
                        />
                        {formik.touched.percentage && formik.errors.percentage && (
                            <FormHelperText id="discount-percentage-error">{formik.errors.percentage}</FormHelperText>
                        )}
                    </FormControl>
                )} */}

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

export default UpdateGamePack;
