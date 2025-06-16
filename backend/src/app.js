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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./database/db");
const cors_1 = __importDefault(require("cors"));
const filmRoutes_1 = __importDefault(require("./routes/filmRoutes"));
const path_1 = __importDefault(require("path")); // agregado para el favicon
const app = (0, express_1.default)();
//Esto permite servir favicon.ico, imágenes, etc.
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Ruta de prueba
app.get('/api/films', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.db.query('SELECT film_id, title, `description`, release_year, rental_duration, rental_rate, `length`, replacement_cost, rating, special_features FROM film;');
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al consultar la base de datos', error });
    }
}));
// Usar rutas
app.use('/api/films', filmRoutes_1.default);
// Middleware para archivos estáticos
app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/public'))); // CSS, imágenes, etc.
app.use('/dist', express_1.default.static(path_1.default.join(__dirname, '../../frontend/dist'))); // JS compilado
// Ruta para el frontend (index.html)
app.get('/', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../frontend/public/index.html'));
});
exports.default = app;
