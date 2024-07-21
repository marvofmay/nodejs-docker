const winston = require('winston');
const path = require('path');

class Logger {
    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
            ),
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.simple()
                    )
                }),
                new winston.transports.File({
                    filename: path.join(__dirname, '../logs', 'error.log'),
                    level: 'error'
                }),
                new winston.transports.File({
                    filename: path.join(__dirname, '../logs', 'combined.log')
                })
            ]
        });
    }
    info(message) {
        this.logger.info(message);
    }
    error(message) {
        this.logger.error(message);
    }
}

module.exports = new Logger();