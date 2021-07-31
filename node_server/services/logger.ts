import winston from "winston";
import Transport from 'winston-transport'
import { saveLog } from "../controlers/log-controler";

class StatsLog extends Transport {
    constructor(options: any) {
        super(options)
    }

    log(info: any, callback: any) {
        setImmediate(() => {
            this.emit('logged', info)
        })

        saveLog({
            message: info.message,
            level: info.level,
            timestamp: info.timestamp
        }, info.telegramId)
        callback()
    }
}

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}

winston.addColors(colors)

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
)

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
    }),
    new winston.transports.File({ filename: 'logs/all.log' }),
    new StatsLog({
        level: 'info'
    })


]

const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
})

export default Logger