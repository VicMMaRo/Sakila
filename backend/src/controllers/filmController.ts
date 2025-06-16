import { Request, Response } from 'express';
import { getDbPool } from '../database/db';


//Lógica de getFilms
export const getFilms = async (_req: Request, res: Response) => {
  try {
    //Llamamos a getDbPool para comprobar conexion
    const db = getDbPool();
    const [rows] = await db.query('SELECT film_id, title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating FROM film');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener films:', error);
    res.status(500).json({ message: 'Error al obtener films', error });
  }
};

//Lógica de de getAvailable
export const getAvailable = async (_req: Request, res: Response) => {
  //Llamamos a getDbPool para comprobar conexion
    const db = getDbPool();
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
  } catch (error) {
    res.status(500).json({ message: 'Error al consultar datos', error });
  }
}
