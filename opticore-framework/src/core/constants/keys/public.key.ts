import {path, fs, appRootPath} from "opticore-core-module";

/**
 * Returning the public key RSA generated to encrypt or decrypt data
 *
 * @constructor
 */
export default function PublicKey() {
    const pathToPublicKey: string = path.join(appRootPath.path, "src/core/constants/keypair/id_rsa_pub.pem");
    const PUBLIC_KEY: string = fs.readFileSync(pathToPublicKey, 'utf8');

    return PUBLIC_KEY;
}
