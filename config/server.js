// config/server.js
module.exports = ({ env }) => ({
  // Define el host y el puerto (esencial para que Render sepa dónde iniciar el servidor)
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),

  // Configuración de las claves de la aplicación (se obtienen de variables de entorno)
  app: {
    keys: env.array('APP_KEYS'),
  },

  // Define la URL pública que Strapi usará para generar enlaces (CLAVE para el panel de administración)
  url: env('PUBLIC_URL', 'https://strapi-moralisimo.onrender.com'),

  // Configuración de Webhooks (opcional, pero incluido por defecto)
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },

  // *** ESTE ES EL BLOQUE QUE SOLUCIONA EL ERROR "Blocked request" ***
  // Lista los hosts autorizados para recibir solicitudes del servidor.
  server: {
    allowedHosts: [
      // 1. El dominio de Render: CLAVE para el despliegue
      'strapi-moralisimo.onrender.com',

      // 2. Tu dominio si usas uno personalizado (ej. 'api.tudominio.com')
      // 'api.tudominio.com',

      // 3. Dominios de desarrollo local
      'localhost',
      '127.0.0.1',
    ],
  },
  // *****************************************************************
});