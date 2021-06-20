declare global{
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number,
            MONGOURL: string,
            TELEGRAM_ID: string,
            JWT_PRIVATE_SECRET: string,
            JWT_PUBLIC_SECRET: string,
            USER: string
        }
    }
}



export {}