export class ConversationService {
    constructor(client) {
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "collection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.client = client;
        this.collection = client.db().collection('conversations');
        this.initialize();
    }
    async initialize() {
        try {
            await this.client.connect();
            const db = this.client.db();
            this.collection = db.collection('conversations');
            // Crear índices para búsquedas eficientes
            await this.collection.createIndex({ timestamp: -1 });
            await this.collection.createIndex({ status: 1 });
            await this.collection.createIndex({ email: 1 });
            await this.collection.createIndex({ phone: 1 });
            console.log('Conexión a MongoDB establecida correctamente');
        }
        catch (error) {
            console.error('Error al conectar con MongoDB:', error);
            throw error;
        }
    }
    async saveConversation(conversation) {
        try {
            const result = await this.collection.insertOne(conversation);
            console.log('Conversación guardada correctamente');
            return result.insertedId.toString();
        }
        catch (error) {
            console.error('Error al guardar la conversación:', error);
            throw error;
        }
    }
    async updateConversation(id, updates) {
        try {
            await this.collection.updateOne({ id }, { $set: updates });
            console.log('Conversación actualizada correctamente');
        }
        catch (error) {
            console.error('Error al actualizar la conversación:', error);
            throw error;
        }
    }
    async getConversation(id) {
        try {
            return await this.collection.findOne({ id });
        }
        catch (error) {
            console.error('Error al obtener la conversación:', error);
            throw error;
        }
    }
    async getRecentConversations(limit = 10) {
        try {
            return await this.collection
                .find()
                .sort({ timestamp: -1 })
                .limit(limit)
                .toArray();
        }
        catch (error) {
            console.error('Error al obtener conversaciones recientes:', error);
            throw error;
        }
    }
    async getPendingConversations() {
        try {
            return await this.collection
                .find({ status: 'pending' })
                .sort({ timestamp: 1 })
                .toArray();
        }
        catch (error) {
            console.error('Error al obtener conversaciones pendientes:', error);
            throw error;
        }
    }
}
