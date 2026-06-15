import { CDbNameValue } from "@opticore-installer/core/abstractions/enums/constants/dbNameValue.constant";
import { IMdbCredentials } from "@opticore-installer/core/abstractions/interfaces/dbCredentials/mdbCredentials.interface";


/**
 *
 * @param credentials
 */
export function transformDbCredentialsToFusedParams(credentials: IMdbCredentials | string): IMdbCredentials | string {
    if (credentials === CDbNameValue.noDbCredentials) {
        return CDbNameValue.noDbCredentials;
    } else {
        return credentials;
    }
}