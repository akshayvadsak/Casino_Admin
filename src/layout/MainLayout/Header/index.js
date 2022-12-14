import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Fab, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router';

// project imports
import LogoSection from '../LogoSection';
import ProfileSection from './ProfileSection';

// assets
import { IconMenu2, IconUsers as AgentIcon, IconUser as PlayerIcon } from '@tabler/icons';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();
    const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const { agentpermission, menupermission } = JSON.parse(localStorage.getItem('MAJESTIC_CASINO'));
    const menuPermissions = menupermission.filter((permission) => permission.MENU_SLUG === `/player`)[0];
    const agentPermissions = agentpermission.map((permission) => permission.AGENT_PERMISSION_KEY);

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            <Box style={{ marginLeft: 5 }}>
                {agentPermissions.includes('REGISTER_PLAYER') && menuPermissions.ISNEW && (
                    <Fab
                        variant="extended"
                        size="medium"
                        color="secondary"
                        sx={{ mr: 1 }}
                        onClick={() => navigate('/player', { state: { status: true } })}
                    >
                        <PlayerIcon style={{ marginRight: 5 }} />
                        {!isMobileDevice && <Typography>Create Player</Typography>}
                    </Fab>
                )}

                <Fab
                    variant="extended"
                    size="medium"
                    color="secondary"
                    sx={{ mr: 1 }}
                    onClick={() => navigate('/network/agents', { state: { status: true } })}
                >
                    <AgentIcon style={{ marginRight: 5 }} />
                    {!isMobileDevice && <Typography>Create Agent</Typography>}
                </Fab>
            </Box>

            <ProfileSection />
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
