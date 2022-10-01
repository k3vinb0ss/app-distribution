# App Distribution

Migrate command:

```shell
DATABASE_URL="postgresql://postgres:123456@localhost:5432/app?schema=public" npx prisma migrate dev --name init

DATABASE_URL="postgresql://postgres:123456@postgres/app?connect_timeout=300" npx prisma migrate dev --name init
```

I have to upgrade ad_server to nodejs 18 to work normally with above command in container
or add *?connect_timeout=300* to work in nodejs-16-lts
