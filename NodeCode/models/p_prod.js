var sequelize = new Sequelize('EjerciciosJonathan','sa','aitva',{
    host: 'serveravattia\avattia',
    dialect: 'mssql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
