import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { IconEdit as SaveIcon, IconRefresh as ResetIcon, IconEye as PreviewIcon } from '@tabler/icons';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { updateSettings } from 'store/thunk/configuration/settings.thunk';

// Components
import MainCard from '../../../../ui-component/cards/MainCard';
import Form from 'components/Form';
import NotFoundCard from 'components/NotFoundCard';
import handlePermissions from 'functions/handlePermissions';

function TermsAndConditions() {
    const dispatch = useDispatch();
    const settings = useSelector((state) => state.settings);
    const navigate = useNavigate();
    const [pageTitle, setPageTitle] = useState('Terms and Conditions');

    const [menuPermissions, setMenuPermissions] = useState([]);
    const [agentPermissions, setAgentPermissions] = useState([]);

    useEffect(() => {
        const { agentPermissions, menuPermissions } = handlePermissions({ url: window.location.href, isSubMenu: true });
        setMenuPermissions(menuPermissions);
        setAgentPermissions(agentPermissions);
    }, []);

    const handleUpdate = () => {
        dispatch(
            updateSettings({
                title: settings.updatedData.TITLE,
                description: settings.updatedData.DESCRIPTION,
                pageTitle,
                id: settings.updatedData.SETTING_ID
            })
        );
    };

    const handlePreview = () => {
        navigate('/cms/preview', { state: settings.updatedData ? settings.updatedData : settings.data });
    };

    return (
        <Box>
            <MainCard
                title="Terms and Conditions"
                secondary={
                    <Box>
                        {menuPermissions.ISUPDATE ? (
                            <>
                                <Button startIcon={<ResetIcon />} color="error" variant="contained">
                                    Reset
                                </Button>
                                <Button
                                    startIcon={<SaveIcon />}
                                    color="primary"
                                    variant="contained"
                                    sx={{ mr: 3, ml: 3 }}
                                    onClick={() => handleUpdate()}
                                >
                                    Update
                                </Button>
                            </>
                        ) : null}
                        {menuPermissions.ISVIEW ? (
                            <Button startIcon={<PreviewIcon />} color="secondary" variant="contained" onClick={() => handlePreview()}>
                                Preview
                            </Button>
                        ) : null}
                    </Box>
                }
            >
                <Box>
                    {menuPermissions.ISVIEW ? (
                        <Form pageTitle={pageTitle} hasUpdatePermission={menuPermissions.ISUPDATE} />
                    ) : (
                        <NotFoundCard msg="No Data Available" />
                    )}
                </Box>
            </MainCard>
        </Box>
    );
}

export default TermsAndConditions;
