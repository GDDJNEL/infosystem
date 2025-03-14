import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import notificationRoutes from './routes/notifications.js';
import webhookRoutes from './routes/webhooks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar variables de entorno
const envPath = join(process.cwd(), '.env');
const envLocalPath = join(process.cwd(), '.env.local');

// Intentar cargar .env primero
dotenv.config({ path: envPath });
// Luego cargar .env.local para sobrescribir valores si existen
dotenv.config({ path: envLocalPath });

console.log('Directorio actual:', process.cwd());
console.log('Ruta del .env:', envPath);
console.log('Ruta del .env.local:', envLocalPath);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos de React desde la carpeta dist
app.use(express.static(join(__dirname, '../../dist')));

// Rutas API
app.use('/api', notificationRoutes);
app.use('/webhook', webhookRoutes);

// Ruta de prueba
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Servidor funcionando correctamente' });
});

// Todas las demás rutas serán manejadas por React Router
app.get('*', (req: Request, res: Response) => {
  res.sendFile(join(__dirname, '../../dist/index.html'));
});

// Manejo de errores global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Puerto
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
}); 