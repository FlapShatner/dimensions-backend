
# Dimensions Backend
 
 The backend node server for dimensions, a shopify theme app extension. 



## Installation

### Requirements
running postgresql database,
prisma installed,
node and npm


Clone this repository

```bash
git clone https://github.com/FlapShatner/dimensions-backend.git
```

Install dimensions-backend with npm

```bash
  npm install 
  cd dimensions-backend
```
Create .env file with database url

```
DATABASE_URL="postgresql://*******:********ep-steep-bonus-123456-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require&pgbouncer=true"
DIRECT_URL="postgresql://*******:********ep-steep-bonus-123456-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

Generate prisma client
```bash
npx prisma generate 
```

Start dev server
```bash
npm run dev
```





