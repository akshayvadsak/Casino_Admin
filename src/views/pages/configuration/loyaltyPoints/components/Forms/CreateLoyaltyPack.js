import { Box, Button, Typography, OutlinedInput, FormHelperText, InputLabel, FormControl, Grid } from '@mui/material';
import { IconDeviceFloppy as SaveIcon, IconRefresh as ResetIcon, IconX as CancelIcon } from '@tabler/icons';
import { useFormik } from 'formik';
import loyaltyPointsSchema from 'schema/loyaltyPoints.schema';
import { createLoyaltyPack } from 'store/thunk/configuration/loyaltyPack.thunk';

function CreateLoyaltyPack({ dispatch, isMobileDevice, openModal, setOpenModal, theme, loyaltyPackIndex }) {
    const formik = useFormik({
        initialValues: { level: '', pointsStart: '', pointsEnd: '', multiplier: '' },
        validationSchema: loyaltyPointsSchema,
        onSubmit: (values) => {
            dispatch(createLoyaltyPack(values));
            setOpenModal(!openModal);
        }
    });

    return (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <FormControl fullWidth error={formik.touched.level && Boolean(formik.errors.level)}>
                    <InputLabel htmlFor="level">Level</InputLabel>
                    <OutlinedInput
                        value={formik.values.level}
                        id="level"
                        type="text"
                        label="Level"
                        name="level"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        required
                    />
                    {formik.touched.level && formik.errors.level && (
                        <FormHelperText error id="level-error">
                            {formik.errors.level}
                        </FormHelperText>
                    )}
                </FormControl>
                <Grid container spacing={2}>
                    <Grid item sm={6}>
                        <FormControl
                            fullWidth
                            error={formik.touched.pointsStart && Boolean(formik.errors.pointsStart)}
                            style={{ marginTop: 10, marginBottom: 10 }}
                        >
                            <InputLabel htmlFor="points-needed">Point Start Value</InputLabel>
                            <OutlinedInput
                                value={formik.values.pointsStart}
                                type="text"
                                id="points-needed"
                                name="pointsStart"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                variant="outlined"
                                label="Point Start Value"
                            />
                            {formik.touched.pointsStart && formik.errors.pointsStart && (
                                <FormHelperText error id="pointsStart-error">
                                    {formik.errors.pointsStart}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl
                            fullWidth
                            error={formik.touched.pointsEnd && Boolean(formik.errors.pointsEnd)}
                            style={{ marginTop: 10, marginBottom: 10 }}
                        >
                            <InputLabel htmlFor="points-needed">Point End Value</InputLabel>
                            <OutlinedInput
                                value={formik.values.pointsEnd}
                                type="text"
                                id="points-needed"
                                name="pointsEnd"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                variant="outlined"
                                label="Point End Value"
                            />
                            {formik.touched.pointsEnd && formik.errors.pointsEnd && (
                                <FormHelperText error id="pointsStart-error">
                                    {formik.errors.pointsEnd}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                </Grid>
                <FormControl fullWidth error={formik.touched.multiplier && Boolean(formik.errors.multiplier)}>
                    <InputLabel htmlFor="multiplier">Multiplier</InputLabel>
                    <OutlinedInput
                        value={formik.values.multiplier}
                        type="text"
                        id="multiplier"
                        name="multiplier"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        label="Multiplier"
                    />
                    {formik.touched.multiplier && formik.errors.multiplier && (
                        <FormHelperText error id="multiplier-error">
                            {formik.errors.multiplier}
                        </FormHelperText>
                    )}
                </FormControl>

                {formik.values.multiplier && (
                    <Box
                        className="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-wb57ya-MuiFormControl-root-MuiTextField-root"
                        sx={{
                            marginTop: 2,
                            padding: 2,
                            border: '1px solid black',
                            alignItems: 'center'
                        }}
                    >
                        <Typography style={{ color: theme.palette.primary.dark, fontWeight: 'bold' }} id="calculations-title">
                            * CALCULATIONS AS PER ENTERED DATA *
                        </Typography>
                        <Typography>Loyalty Points: {formik.values.multiplier ? formik.values.multiplier : 0} /1$</Typography>
                        <Typography color="error">
                            If player wagered $1000 then he will get {Math.round(1000 * formik.values.multiplier)} loyalty points
                        </Typography>
                    </Box>
                )}

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

export default CreateLoyaltyPack;
