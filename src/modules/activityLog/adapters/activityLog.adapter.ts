import { ActivityLog } from "@/common/models/ActivityLog";

export const activityLogAdapter = (raw: any): ActivityLog => {
  return {
    id: raw.id,
    actorId: raw.actor_id ?? null,
    actorName: raw.actor_name ?? null,
    action: raw.action,
    entity: raw.entity,
    entityId: raw.entity_id ?? null,
    details: raw.details ?? null,
    metadata: raw.metadata ?? null,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
};
