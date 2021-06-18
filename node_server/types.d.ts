declare global{
    namespace NodeJS {
        interface ProcessEnv {
            MONGOURL: string,
            TELEGRAM_ID: string,
            JWT_PRIVATE_SECRET: string,
        }
    }
}



export {}