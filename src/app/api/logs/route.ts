import { NextResponse } from 'next/server';
import serverLogger from '@/lib/logger/server';

export async function POST(request: Request) {
  try {
    const logData = await request.json();

    const { level, message, exception, properties, source, timestamp, clientInfo } = logData;

    // PINO log levels mapping
    // 10: trace, 20: debug, 30: info, 40: warn, 50: error, 60: fatal

    // Objeto compuesto a loguear
    const logObj = {
      source: source || 'GesFer-Client-Browser',
      ...properties,
      clientInfo,
      exception,
      clientTimestamp: timestamp,
    };

    // Loggear según el nivel que reportó el cliente
    // El logger de servidor (`serverLogger`) ya filtra si no cumple el nivel del entorno
    if (level >= 60) {
      serverLogger.fatal(logObj, message);
    } else if (level >= 50) {
      serverLogger.error(logObj, message);
    } else if (level >= 40) {
      serverLogger.warn(logObj, message);
    } else if (level >= 30) {
      serverLogger.info(logObj, message);
    } else if (level >= 20) {
      serverLogger.debug(logObj, message);
    } else {
      serverLogger.trace(logObj, message);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    // Si falla el procesamiento del log mismo
    serverLogger.error({ error }, 'Failed to process client log');
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
