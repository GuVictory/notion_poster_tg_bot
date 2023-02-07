import winston from 'winston';

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toLocaleUpperCase()}]: ${JSON.stringify(message)}`;
});

export class Logger {
    private static instance: winston.Logger;

    static get i(): winston.Logger {
        if (Logger.instance === undefined) {
            Logger.instance = winston.createLogger({
                level: 'info',
                format: winston.format.combine(
                    winston.format.json(),
                    winston.format.timestamp({
                        format: 'MMM-DD-YYYY HH:mm:ss',
                    }),
                    customFormat,
                ),
                transports: [
                    new winston.transports.Console({
                        level: 'debug',
                        format: winston.format.combine(
                            winston.format.json(),
                            winston.format.timestamp({
                                format: 'MMM-DD-YYYY HH:mm:ss',
                            }),
                            winston.format.prettyPrint(),
                        ),
                    }),
                ],
            });

            if (process.env.NODE_ENV === 'production') {
                Logger.instance.add(
                    new winston.transports.File({ filename: 'logs/errors.log', level: 'error' }),
                );
                Logger.instance.add(new winston.transports.File({ filename: 'logs/combined.log' }));
            }
        }
        return Logger.instance;
    }

    private constructor() {
        // Do nothing
    }
}
