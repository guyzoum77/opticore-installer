import {RSAKeyPairOptions} from "crypto";

export function rsaKeyPairOptionsFunction(): RSAKeyPairOptions<"pem", "pem"> {
    return {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    };
}