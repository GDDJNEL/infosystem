import express from 'express';
import { notificationService } from '../services/NotificationService';
import { conversationService } from '../services/ConversationService';
const router = express.Router();
// Endpoint para recibir nuevas notificaciones de clientes
router.post('/admin/notifications', async (req, res) => {
    try {
        const { type, clientInfo } = req.body;
        if (type === 'new_client') {
            // Guardar la conversación
            await conversationService.saveConversation(clientInfo);
            // Enviar notificaciones
            await notificationService.notifyNewClient(clientInfo);
            res.status(200).json({ message: 'Notificación enviada correctamente' });
        }
        else {
            res.status(400).json({ error: 'Tipo de notificación no soportado' });
        }
    }
    catch (error) {
        console.error('Error al procesar la notificación:', error);
        res.status(500).json({ error: 'Error al procesar la notificación' });
    }
});
// Endpoint para obtener conversaciones
router.get('/conversations', async (req, res) => {
    try {
        const { status, limit } = req.query;
        let conversations;
        if (status === 'pending') {
            conversations = await conversationService.getPendingConversations();
        }
        else {
            conversations = await conversationService.getRecentConversations(Number(limit) || 10);
        }
        res.status(200).json(conversations);
    }
    catch (error) {
        console.error('Error al obtener conversaciones:', error);
        res.status(500).json({ error: 'Error al obtener conversaciones' });
    }
});
// Endpoint para obtener una conversación específica
router.get('/conversations/:id', async (req, res) => {
    try {
        const conversation = await conversationService.getConversation(req.params.id);
        if (!conversation) {
            res.status(404).json({ error: 'Conversación no encontrada' });
            return;
        }
        res.status(200).json(conversation);
    }
    catch (error) {
        console.error('Error al obtener la conversación:', error);
        res.status(500).json({ error: 'Error al obtener la conversación' });
    }
});
// Endpoint para actualizar el estado de una conversación
router.patch('/conversations/:id', async (req, res) => {
    try {
        const { status } = req.body;
        await conversationService.updateConversation(req.params.id, { status });
        res.status(200).json({ message: 'Conversación actualizada correctamente' });
    }
    catch (error) {
        console.error('Error al actualizar la conversación:', error);
        res.status(500).json({ error: 'Error al actualizar la conversación' });
    }
});
export default router;
