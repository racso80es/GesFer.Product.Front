Contexto: Necesitamos implementar un sistema de logging persistente y estructurado en el frontend, diferenciando el nivel de detalle según el entorno para optimizar el rendimiento y la seguridad en Producción.

Instrucciones para la IA:

1. Triaje y Análisis
Analiza la estructura actual de GesFer.Product.Front.
Identifica la librería de logging más adecuada.
Genera un documento de análisis detallando cómo se interceptarán los logs.

2. Evaluación de Situación
Define la estrategia de configuración por entorno.
Regla de Negocio: * Entorno DEV: Nivel Verbose / Information (Todos los eventos).
Entorno PRO: Nivel Error / Fatal únicamente.


3. Acción
Configura la escritura en ficheros (asegurando que la ruta sea compatible con el entorno de despliegue).
Implementa un LoggingHandler o similar para capturar excepciones globales.
Verifica que no existan errores de sintaxis, rutas duplicadas o malformadas en la configuración de "logs".
