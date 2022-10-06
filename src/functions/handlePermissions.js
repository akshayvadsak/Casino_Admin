const { default: fetchPermissions } = require('./fetchPermissions');

// USER PERMISSIONS VALIDATION

const handlePermissions = ({ url, isSubMenu }) => {
    // USER PERMISSIONS VALIDATION

    let user = '';
    user = JSON.parse(localStorage.getItem('MAJESTIC_CASINO'));
    const pageUrl = url.split('/');
    fetchPermissions({
        roleId: user.userdata.ROLE_ID,
        agentId: user.userdata.AGENT_ID,
        slug: `/${pageUrl[pageUrl.length - 2]}/${pageUrl[pageUrl.length - 1]}`
    });

    user = JSON.parse(localStorage.getItem('MAJESTIC_CASINO'));

    const agentPermissions = user.agentpermission.map((permission) => permission.AGENT_PERMISSION_KEY);
    let menuPermissions = '';

    if (isSubMenu) {
        const pageUrl = url.split('/');
        menuPermissions = user.menupermission.filter(
            (permission) => permission.MENU_SLUG === `/${pageUrl[pageUrl.length - 2]}/${pageUrl[pageUrl.length - 1]}`
        )[0];
    } else {
        const pageUrl = url.split('/')[url.split('/').length - 1];
        menuPermissions = user.menupermission.filter(
            (permission) => permission.MENU_SLUG === `/${pageUrl.split('/')[pageUrl.split('/').length - 1]}`
        )[0];
    }
    return { agentPermissions, menuPermissions };
};

export default handlePermissions;
