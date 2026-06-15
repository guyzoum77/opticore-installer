export interface IEnvVariable {
    dbName: string; 
    dbUser: string;
    dbPwd: string; 
    dbHost: string; 
    dbPort: number;
    argDBConn?: number;
}