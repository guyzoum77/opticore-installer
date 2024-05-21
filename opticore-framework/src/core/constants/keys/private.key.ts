import {path, fs, appRootPath} from "opticore-core-module";

/**
 * Returning the private key RSA generated to encrypt or decrypt data
 *
 * @constructor
 */
export default function PrivateKey() {
    const pathToPrivateKey: string = path.join(appRootPath.path, "src/core/constants/keypair/id_rsa_priv.pem");
    const PRIVATE_KEY: string = fs.readFileSync(pathToPrivateKey, 'utf8');

    return PRIVATE_KEY;
}