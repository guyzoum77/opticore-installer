import {AccessEnv} from "opticore-core-module";

/**
 * You need to define an API version.
 * Example: (version = "2" or version = "2.0.1" or version = 2.2 or version = 2);
 */
export enum ApiVersionConstant {
    version = Number(AccessEnv.apiVersion())
}