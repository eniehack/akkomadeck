import { type Writable, writable } from "svelte/store";

export type OAuthClient = {
    id: string
    secret: string
}

export const oauthClient: Writable<OAuthClient> = writable();

type OAuth2RegisterClientResponse = {
    id: string,
    redirect_uri: string,
    client_id: string,
    client_secret: string,
};

type TokenEntity = {
    access_token: string
    token_type: string
    scope: string
    created_at: string
}

export const create_client = async (host: URL, client_url: URL) => {
    const client_name = "akkomadeck";
    let client_create_body = new URLSearchParams({
        client_name: client_name,
        redirect_uris: client_url.toString() + "signin/callback",
        scopes: "read write push",
        website: "https://github.com/eniehack/akkomadeck",
    });
    let resp = await fetch(host.toString() + "api/v1/apps", {
        method: "POST",
        body: client_create_body,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
    if (!resp.ok || resp.status !== 200) return null;
    return await resp.json() as OAuth2RegisterClientResponse;
}

export const authorize_url = (server: URL, client_id: string, client_url: URL) => {
    let params = new URLSearchParams({
        response_type: "code",
        client_id: client_id,
        redirect_uri: `${client_url.toString()}signin/callback`,
    });
    return new URL(`${server.toString()}oauth/authorize?${params.toString()}`);
}

export const fetch_access_token = async (
        fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>, 
        server_url: URL,
        code: string,
        client: OAuthClient
    ) => {

    let fetch_access_token_body = new URLSearchParams({
        client_id: client.id,
        client_secret: client.secret,
        redirect_uri: `${server_url.toString()}signin/callback`,
        grant_type: "authorization_code",
        code: code,
    });

    let resp = await fetch(`${server_url.toString()}oauth/token`, {
        method: "POST",
        body: fetch_access_token_body,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    return await resp.json() as TokenEntity;
}

export const verify_credentials = async (
        fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>,
        server_url: URL,
        oauth_token: string
    ) => {

    let resp = await fetch(`${server_url.toString()}api/v1/apps/verify_credentials`, {
        headers: {
            "Authorization": `Bearer ${oauth_token}`,
        }
    });
    return resp.ok;
}