"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const filmController_1 = require("../controllers/filmController");
const db_1 = require("../database/db");
const router = (0, express_1.Router)();
router.get('/', filmController_1.getFilms);
router.get('/available', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.db.query(`
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
        res.status(500).json({ message: 'Error al consultar películas disponibles', error });
    }
}));
exports.default = router;
