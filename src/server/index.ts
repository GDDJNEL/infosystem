import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import notificationRoutes from './routes/notifications.js';
import webhookRoutes from './routes/webhooks.js';
import { connectToDatabase } from './config/database.js';

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

// Rutas API
app.use('/api', notificationRoutes);
app.use('/webhook', webhookRoutes);

// Ruta de prueba
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Servidor funcionando correctamente' });
});

// Servir archivos estáticos de React desde la carpeta dist
const distPath = join(process.cwd(), 'dist');
console.log('Serving static files from:', distPath);
app.use(express.static(distPath));

// Todas las demás rutas serán manejadas por React Router
app.get('*', (req, res) => {
  res.sendFile(join(distPath, 'index.html'));
});

// Manejo de errores global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error en el servidor:', err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Puerto
const PORT = process.env.PORT || 3001;

// Function to start server
async function startServer() {
  try {
    // Connect to MongoDB first
    await connectToDatabase();
    
    // Start the server with port retry logic
    let currentPort = PORT;
    const maxRetries = 5;
    let retries = 0;
    
    const tryListen = (port) => {
      app.listen(port, () => {
        console.log(`Servidor corriendo en el puerto ${port}`);
      }).on('error', (err) => {
        if (err.code === 'EADDRINUSE' && retries < maxRetries) {
          retries++;
          const nextPort = port + 1;
          console.log(`Puerto ${port} ya está en uso. Intentando con el puerto ${nextPort}`);
          tryListen(nextPort);
        } else {
          console.error('Error al iniciar el servidor:', err);
          process.exit(1);
        }
      });
    };
    
    tryListen(currentPort);
  } catch (error) {
    console.error('Error al iniciar la aplicación:', error);
    process.exit(1);
  }
}

// Start the application
startServer();