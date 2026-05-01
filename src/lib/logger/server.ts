import pino from 'pino';
import path from 'path';

// Determinar el nivel mínimo según el entorno y las reglas de negocio
const getMinLevel = (): pino.Level => {
  const env = process.env.NODE_ENV || 'development';
  // En producción solo error y fatal (error), en desarrollo debug/info
  return env === 'production' ? 'error' : 'info';
};

// Determinar la ruta del log (dentro de src/logs o en la raíz, preferible la raíz del proyecto)
const logFilePath = path.join(process.cwd(), 'logs', 'app.log');

// Configurar transportes
const transport = pino.transport({
  targets: [
    // Consola (Pretty en Dev, JSON estándar en Prod)
    {
      target: process.env.NODE_ENV === 'development' ? 'pino-pretty' : 'pino/file',
      level: getMinLevel(),
      options: process.env.NODE_ENV === 'development' ? {
        colorize: true,
        ignore: 'pid,hostname',
      } : { destination: 1 }, // stdout
    },
    // Archivo
    {
      target: 'pino/file',
      level: getMinLevel(),
      options: {
        destination: logFilePath,
        mkdir: true,
      } as Record<string, unknown>,
    },
  ],
});

// Configuración base del logger de servidor
const loggerConfig: pino.LoggerOptions = {
  level: getMinLevel(),
  base: {
    env: process.env.NODE_ENV || 'development',
    app: 'GesFer-Client-Server',
  },
  timestamp: pino.stdTimeFunctions.isoTime,
};

// Crear el logger de servidor
const serverLogger = pino(loggerConfig, transport);

export default serverLogger;
