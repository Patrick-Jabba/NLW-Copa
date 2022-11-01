npm i prisma -D

npm i @prisma/client

npx prisma init --datasource-provider SQLite (podem ser outros bancos)

<!--Versionamento das entidades e tabelas do banco -->
npx prisma migrate dev

<!--Para visualizar e editar suas tabelas através de uma interface -->
npx prisma studio

<!-- Para criar o Diagrama Entidade Relacionamento dinamicamente ERD-->
npm i prisma-erd-generator @mermaid-js/mermaid-cli -D 

<!--Gera o Diagrama através de um SVG -->
npx prisma generate

npm i @fastify/cors