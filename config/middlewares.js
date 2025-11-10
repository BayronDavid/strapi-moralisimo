module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            // Agrega aquí tu dominio de Render para archivos multimedia si los manejas internamente:
            'strapi-moralisimo.onrender.com',
            // Si usas un proveedor como Cloudinary, agrégalo también:
            'res.cloudinary.com',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'strapi-moralisimo.onrender.com',
            'res.cloudinary.com',
          ],
          'upgradeInsecureRequests': null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: [
        'http://localhost:1337', // Para desarrollo local
        'http://localhost:3000', // Para tu frontend local
        'https://strapi-moralisimo.onrender.com', // **¡ESTE ES CLAVE!**
        // Si tu frontend está en otro dominio de Render o Vercel, agrégalo aquí:
        'https://tu-dominio-frontend.com',
      ],
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];