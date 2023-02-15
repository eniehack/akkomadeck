import Ajv, { type JTDSchemaType } from "ajv/dist/jtd";
const ajv = new Ajv();

interface UserStorageItem {
    server_url: string
    token: string
    oauth_code: string
}

export const UserStorageItemSchema: JTDSchemaType<UserStorageItem> = {
    properties: {
        server_url: {type: "string"},
        token: {type: "string"},
        oauth_code: {type: "string"},
    },
}

export const UserStorageItemSerializer = (data : any) => {
    let serialize = ajv.compileSerializer(UserStorageItemSchema)
    return serialize(data);
}

export const UserStorageItemParse = (data: string) => {
    let parse = ajv.compileParser(UserStorageItemSchema)
    return parse(data);
}

interface ClientStorageItem {
    server_url: string
    client_secret: string
    client_id: string
}

export const ClientStorageItemSchema: JTDSchemaType<ClientStorageItem> = {
    properties: {
        server_url: {type: "string"},
        client_id: {type: "string"},
        client_secret: {type: "string"}
    }
}

export const ClientStorageItemSerializer = (data :any) => {
    let serialize = ajv.compileSerializer(ClientStorageItemSchema)
    return serialize(data);
}

export const ClientStorageItemParse = (data: string) => {
    let parse = ajv.compileParser(ClientStorageItemSchema)
    return parse(data);
}