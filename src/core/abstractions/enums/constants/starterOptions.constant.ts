import { CGeneralMsg } from "@opticore-installer/core/abstractions/enums/constants/generalMsg.constant";

export const CStarterOptions = [
    // { label: "RestFull API complete project", value: ["complete_restfull_project"], hint: "Everything you'll need to build a server render web project" },
    { label: "Web project", value: ["web_project"], hint: "Everything you'll need to build a server render web project" },
    { label: "Skeleton project", value: ["skeleton_project"], hint: "A lean OptiCoreJS application with the framework core" },
    { label: CGeneralMsg.starterOptionsRestFullLabel, value: [CGeneralMsg.starterOptionsRestFullValue], hint: CGeneralMsg.starterOptionsRestFullHint },
    // { label: "Complete restFull API project", value: ["complete_api_restfull_project"], hint: "OptiCoreJS app tailored to create a complete RestFull APIs" },
    { label: "standard project", value: ["standard_project"], hint: "OptiCoreJS app tailored to create a standard Web project" },
]