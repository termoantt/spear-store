const env = {
    APP: {
        PORT: process.env.PORT || 8080
    },
    DB: {
        EUROPE: {
            authentication: {
                options: {
                    userName: "demo",
                    password: "rootTST123"
                },
                type: "default"
            },
            server: "diss-server-europe.database.windows.net",
            options: {
                database: "diss-db-europe",
                encrypt: true
            }
        },
        US: {
            authentication: {
                options: {
                    userName: "demo",
                    password: "rootTST123"
                },
                type: "default"
            },
            server: "diss-server-us.database.windows.net",
            options: {
                database: "diss-db-us",
                encrypt: true
            }
        },
        ASIA: {
            authentication: {
                options: {
                    userName: "demo",
                    password: "rootTST123"
                },
                type: "default"
            },
            server: "diss-server-asia.database.windows.net",
            options: {
                database: "diss-db-asia",
                encrypt: true
            }
        }
    }
};

module.exports = env;