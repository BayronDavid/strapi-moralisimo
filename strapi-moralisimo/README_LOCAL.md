Run locally (PowerShell)

This project is configured to connect to a Neon Postgres instance. The relevant env vars are already set in `.env`.

Start the app in development (PowerShell):

```powershell
cd strapi-moralisimo
npm install
npm run develop
```

If you need to rebuild the admin after changes to content-types:

```powershell
npm run build
npm run start
```

Notes about Neon / SSL:
- `.env` contains `DATABASE_URL` with Neon connection string and `DATABASE_SSL=true`.
- We set `DATABASE_SSL_REJECT_UNAUTHORIZED=false` to allow the TLS connection to Neon in some environments. For production, review SSL verification settings.
