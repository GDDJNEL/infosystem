import { MongoClient, Collection } from 'mongodb';
import { config } from '../config/config.js';

interface Conversation {
  userId: string;
  messages: Array<{
    role: string;
    content: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
  status?: 'pending' | 'in-progress' | 'completed';
}

export class ConversationService {
  private client: MongoClient;
  private collection: Collection<Conversation>;

  constructor() {
    this.client = new MongoClient(config.mongodb.uri);
    this.collection = this.client.db().collection('conversations');
    this.initialize();
  }

  private async initialize() {
    try {
      await this.client.connect();
      const db = this.client.db();
      this.collection = db.collection<Conversation>('conversations');
      
      // Crear índices para búsquedas eficientes
      await this.collection.createIndex({ timestamp: -1 });
      await this.collection.createIndex({ status: 1 });
      await this.collection.createIndex({ email: 1 });
      await this.collection.createIndex({ phone: 1 });
      
      console.log('Conexión a MongoDB establecida correctamente');
    } catch (error) {
      console.error('Error al conectar con MongoDB:', error);
      throw error;
    }
  }

  async saveConversation(conversation: Conversation): Promise<string> {
    try {
      const result = await this.collection.insertOne(conversation);
      console.log('Conversación guardada correctamente');
      return result.insertedId.toString();
    } catch (error) {
      console.error('Error al guardar la conversación:', error);
      throw error;
    }
  }

  async updateConversation(id: string, updates: Partial<Conversation>): Promise<void> {
    try {
      await this.collection.updateOne(
        { id },
        { $set: updates }
      );
      console.log('Conversación actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar la conversación:', error);
      throw error;
    }
  }

  async getConversation(id: string): Promise<Conversation | null> {
    try {
      return await this.collection.findOne({ id });
    } catch (error) {
      console.error('Error al obtener la conversación:', error);
      throw error;
    }
  }

  async getRecentConversations(limit: number = 10): Promise<Conversation[]> {
    try {
      return await this.collection
        .find()
        .sort({ timestamp: -1 })
        .limit(limit)
        .toArray();
    } catch (error) {
      console.error('Error al obtener conversaciones recientes:', error);
      throw error;
    }
  }

  async getPendingConversations(): Promise<Conversation[]> {
    try {
      return await this.collection
        .find({ status: 'pending' })
        .sort({ timestamp: 1 })
        .toArray();
    } catch (error) {
      console.error('Error al obtener conversaciones pendientes:', error);
      throw error;
    }
  }
}

export const conversationService = new ConversationService(); 