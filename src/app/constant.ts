import { environment } from '../environments/environment';

export const CONSTANT = {
    API_DOMAIN: environment.apiDomain,
    ACCESS_TOKEN: 'access_token',
    VALID_TIMESTAMP : 'valid_timestamp',
    PAGE_SIZE: 10,
    USER_PROFILE: "user_profile",
    CURRENT_ROLE : 'current_role',
    ROLES: {
        OWNER: "OWNER",
        MANAGER: "MANAGER",
        SALESMAN: "SALESMAN", 
        WAREHOUSE: "WAREHOUSE"
    },
    EMAIL_PARTERN: "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"

    
}