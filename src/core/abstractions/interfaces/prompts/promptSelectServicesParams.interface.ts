export interface IPromptSelectServicesParams {
    message: string;
    initialValue: any;
    options: Array<{ label: string; value: string[]; }>;
}