# E-IDWB-Backend

### Instalar dependencias
npm install -g sequelize-cli
npm install

## Aplicar migraciones
sequelize db:migrate

## Aplicar datos semilla
npx sequelize-cli db:seed:all

## Correr la API
npm run dev