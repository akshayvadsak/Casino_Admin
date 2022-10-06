import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    CardActions,
    CardContent,
    Divider,
    FormControl,
    Grid,
    Menu,
    MenuItem,
    TextField,
    Typography
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

import { useSelector, useDispatch } from 'react-redux';
import { getAgentTypeList } from 'store/thunk/network/agent.thunk';
import { getAgentTypesWithIdList } from 'store/thunk/configuration/agentType.thunk';
import TotalDepositCard from './TotalDepositCard';
import TotalBetsCard from './TotalBetsCard';
import TotalWinsCard from './TotalWinsCard';
import TotalWIthdrawCard from './TotalWIthdrawCard';
import NetRevenueCard from './NetRevenueCard';
import MaxWinCard from './MaxWinCard';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const DateCard = ({ isLoading }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const agentType = useSelector((state) => state.agentType);

    const [value, setValue] = useState([null, null]);

    const [anchorEl, setAnchorEl] = useState(null);

    const [isCustomDate, setCustomDate] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDateChange = (dateType) => {
        if (dateType === 'custom') {
            setCustomDate(true);
        } else {
            setCustomDate(false);
        }
        console.log(dateType);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">Transaction Data</Typography>
                                    </Grid>
                                    <Grid item>
                                        <MoreHorizOutlinedIcon
                                            fontSize="small"
                                            sx={{
                                                color: theme.palette.primary[200],
                                                cursor: 'pointer'
                                            }}
                                            aria-controls="menu-popular-card"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        />
                                        <Menu
                                            id="menu-popular-card"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            variant="selectedMenu"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                            <MenuItem onClick={() => handleDateChange('today')}>Today</MenuItem>
                                            <MenuItem onClick={() => handleDateChange('month')}>Month</MenuItem>
                                            <MenuItem onClick={() => handleDateChange('year')}>Year</MenuItem>
                                            <Divider />
                                            <MenuItem onClick={() => handleDateChange('custom')}>Custom</MenuItem>
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                {isCustomDate && (
                                    <FormControl fullWidth style={{ marginBottom: 18 }}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DateRangePicker
                                                startText="Start Date"
                                                fullWidth
                                                endText="End Date"
                                                value={value}
                                                onChange={(newValue) => {
                                                    setValue(newValue);
                                                }}
                                                renderInput={(startProps, endProps) => (
                                                    <>
                                                        <TextField {...startProps} fullWidth />
                                                        <Box sx={{ mx: 2 }}> to </Box>
                                                        <TextField {...endProps} fullWidth />
                                                    </>
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                )}

                                <Grid container spacing={2}>
                                    <Grid xs={12} sm={12} md={6} lg={6} item>
                                        <TotalDepositCard isLoading={isLoading} />
                                    </Grid>
                                    <Grid xs={12} sm={12} md={6} lg={6} item>
                                        <TotalBetsCard isLoading={isLoading} />
                                    </Grid>
                                    <Grid xs={12} sm={12} md={6} lg={6} item>
                                        <TotalWIthdrawCard isLoading={isLoading} />
                                    </Grid>
                                    <Grid xs={12} sm={12} md={6} lg={6} item>
                                        <TotalWinsCard isLoading={isLoading} />
                                    </Grid>
                                    <Grid xs={12} sm={12} md={6} lg={6} item>
                                        <NetRevenueCard isLoading={isLoading} />
                                    </Grid>
                                    <Grid xs={12} sm={12} md={6} lg={6} item>
                                        <MaxWinCard isLoading={isLoading} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    );
};

DateCard.propTypes = {
    isLoading: PropTypes.bool
};

export default DateCard;
