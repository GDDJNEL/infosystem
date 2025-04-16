export interface Conversation {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  timestamp: Date;
  status: 'pending' | 'in_progress' | 'completed';
}