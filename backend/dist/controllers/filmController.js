"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailable = exports.getFilms = void 0;
const db_1 = require("../database/db");
//Lógica de getFilms
const getFilms = async (_req, res) => {
    try {
        //Llamamos a getDbPool para comprobar conexion
        const db = (0, db_1.getDbPool)();
        const [rows] = await db.query('SELECT film_id, title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating FROM film');
        res.json(rows);
    }
    catch (error) {
        console.error('Error al obtener films:', error);
        res.status(500).json({ message: 'Error al obtener films', error });
    }
};
exports.getFilms = getFilms;
//Lógica de de getAvailable
const getAvailable = async (_req, res) => {
    //Llamamos a getDbPool para comprobar conexion
    const db = (0, db_1.getDbPool)();
    try {
        const [rows] = await db.query(`
      SELECT c.first_name, c.last_name, c.email
      FROM customer c
      JOIN address a ON c.address_id = a.address_id
      JOIN city ci ON a.city_id = ci.city_id
      JOIN country co ON ci.country_id = co.country_id
      WHERE co.country = 'Canada';
    `);
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al consultar datos', error });
    }
};
exports.getAvailable = getAvailable;
