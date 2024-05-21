import RegisterRoute from "../../core/router/register.route";
import {
    corsOrigin,
    DbConnexionConfig,
    dotenv,
    express,
    LoggerFormat,
    ServerEnvConfig,
    serverExecutionTimeUtils
} from "opticore-core-module";

export class AppServer extends ServerEnvConfig {
    public app: express.Application = express();

    private port: number = this.getNumberEnv("APP_PORT");
    static host: string  = String(dotenv.config().parsed!.APP_HOST);
    static env: string   = String(dotenv.config().parsed!.ENV_DEV);

    constructor() {
        super();
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(corsOrigin());
        this.app.set('view engine', 'ejs');

        this.routers();
        this.listen();
    }

    routers (): express.Router[] {
        return new RegisterRoute(this.app).routers();
    }

    async dbConnection () {
        const logger: LoggerFormat = new LoggerFormat();
        return await new DbConnexionConfig(logger).databasePostgresDBConnectionConfig(true);
    }

    public listen () {
        this.app.listen(Number(this.port), AppServer.host, () => {
            this.dbConnection();
            serverExecutionTimeUtils(AppServer.host, AppServer.env, this.port);
        });
    }
}