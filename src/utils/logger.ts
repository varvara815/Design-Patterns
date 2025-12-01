import pino from 'pino';

// Dual transport: pretty console output + file logging
const transport = pino.transport({
  targets: [
    {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
      level: 'debug',
    },
    {
      target: 'pino/file',
      options: {
        destination: './logs/app.log',
        mkdir: true,
      },
      level: 'info',
    },
  ],
});

export const logger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  transport,
);

logger.info('Logger initialized successfully');
