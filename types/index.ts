export type Role = 'SUPERADMIN' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export type MessageStatus = 'UNREAD' | 'READ' | 'ARCHIVED' | 'DELETED';

export interface ContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone?: string | null;
  subject: string;
  message: string;
  status: MessageStatus;
  createdAt: Date;
}

export interface BlogEntry {
  id: string;
  type: 'news' | 'external';
  title?: string | null;
  excerpt?: string | null;
  content?: string | null;
  url?: string | null;
  coverImageUrl?: string | null;
  tags?: string | null;
  status: 'draft' | 'published';
  publishedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
