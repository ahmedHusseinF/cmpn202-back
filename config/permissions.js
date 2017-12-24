module.exports = {
    actions_routes:
    [

        /**
         * custom actions
         */
        {
            action: 'sudo mode',
            routes: [] // this action include all routes in the system only for heaven admins
        },

        {
            action: 'default',
            routes: [
                `/verify/token`,
                `/user/updatePassword`
            ]
        },

        /**
         * Users
         */
        {
            action: `create users`,
            routes: [
                `/user/create`,
                `/user/getChildRoles`
            ],
        },

        {
            action: `edit users`,
            routes: [
                `/user/update`,
                `/role_tree/getChildRoles`
            ],
        },

        {
            action: `list users`,
            routes: [
                `/user/list`,
            ],
        },

        /**
         * Banks
         */

        {
            action: 'create banks',
            routes: [
                `/user/validate`,
                `/banks/validate`,
                `/banks/create`
            ]
        },
        {
            action: `edit banks`,
            routes: [
                `/banks/update`
            ]
        },

        /**
         * Schemes
         */

        {
            action: `create schemes`,
            routes: [
                `/user/validate`,
                `/scheme/listbanks`,
                `/scheme/validate`,
                `/scheme/create`
            ]
        },
        {
            action: 'delete schemes',
            routes: [
                `/scheme/delete`
            ]
        },

        /**
         * roles
         */
        {
            action: `create roles`,
            routes: [
                `/roles/create`,
                `/roles/getActionsAndCheckers`,
            ]
        },
        {
            action: `edit roles`,
            routes: [
                `/roles/update`,
                `/roles/getRoleActions`,
                `/role_tree/getChildRoles`
            ]
        },
        {
            action: `list roles`,
            routes: [
                `/role_tree/getChildRoles`
            ]
        }
    ]
};