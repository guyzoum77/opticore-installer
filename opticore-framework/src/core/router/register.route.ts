import {express} from "opticore-core-module";

/**
 * This is the register where we define all application appRoutes.ts.
 */

export default class RegisterRoute {
    public router: express.Application = express();

    constructor(app: express.Application) {
        this.router = app;
    }

    routers (): express.Router[] {
        return [];
    }
}