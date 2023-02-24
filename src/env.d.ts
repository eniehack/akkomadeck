/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PUBLIC_CLIENT_HOST: string | undefined
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}