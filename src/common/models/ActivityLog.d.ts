export interface ActivityLog {
  id: string;
  actorId?: string | null;
  actorName?: string | null;
  action: string;
  entity: string;
  entityId?: string | null;
  details?: string | null;
  metadata?: any | null;
  createdAt: string;
  updatedAt: string;
}
