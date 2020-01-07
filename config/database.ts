const config = {
    database: {
        mode: 'in-memory', // in-memory / typeorm
        typeorm: {
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        },
    },
};

export default () => config;
