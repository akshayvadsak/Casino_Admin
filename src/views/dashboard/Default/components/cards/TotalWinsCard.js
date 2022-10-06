import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

import { IconCurrencyDollar as DollerIcon } from '@tabler/icons';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeSkeletonCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const TotalWinsCard = ({ isLoading }) => {
    const theme = useTheme();

    return (
        <>
            {isLoading ? (
                <TotalIncomeSkeletonCard />
            ) : (
                <CardWrapper border={false} content={false} elevation={4}>
                    <Box sx={{ p: 2 }}>
                        <Grid container spacing={2} alignItems="center" justifyContent="space-around">
                            <Grid item>
                                <Avatar
                                    variant="rounded"
                                    sx={{
                                        ...theme.typography.commonAvatar,
                                        ...theme.typography.largeAvatar,
                                        backgroundColor: theme.palette.primary[800],
                                        color: '#fff'
                                    }}
                                >
                                    <DollerIcon />
                                </Avatar>
                            </Grid>
                            <Grid item>
                                <ListItemText
                                    sx={{
                                        py: 0,
                                        mt: 0.45,
                                        mb: 0.45
                                    }}
                                    primary={
                                        <Typography variant="h4" sx={{ color: '#fff' }}>
                                            $203k
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="subtitle2" sx={{ color: 'primary.light', mt: 0.25 }}>
                                            Wins
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

TotalWinsCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalWinsCard;
