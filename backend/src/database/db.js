"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const promise_1 = require("mysql2/promise");
// Conexión base de datos (Sakila)
exports.db = (0, promise_1.createPool)({
    host: 'localhost',
    user: 'root',
    password: '', // Cambiar según tu config
    database: 'sakila',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
