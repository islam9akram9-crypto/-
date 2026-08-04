/**
 * Minimal in-process event bus for domain events.
 * Kept dependency-free; can be swapped for Redis pub/sub in a
 * distributed deployment (Phase 5) without changing call sites.
 */

export type DomainEvent<
  TName extends string = string,
  TPayload extends object = object
> = {
  name: TName;
  payload: TPayload;
  occurredAt: Date;
  actorId?: string | null;
  organizationId?: string;
};

type EventHandler<E extends DomainEvent = DomainEvent> = (event: E) => void | Promise<void>;

type HandlerMap = Map<string, Set<EventHandler>>;

class EventBus {
  private handlers: HandlerMap = new Map();

  subscribe<TName extends string, TPayload extends object>(
    name: TName,
    handler: EventHandler<DomainEvent<TName, TPayload>>
  ): () => void {
    const set = this.handlers.get(name) ?? new Set<EventHandler>();
    set.add(handler as EventHandler);
    this.handlers.set(name, set);
    return () => {
      set.delete(handler as EventHandler);
      if (set.size === 0) this.handlers.delete(name);
    };
  }

  async publish<E extends DomainEvent>(event: E): Promise<void> {
    const set = this.handlers.get(event.name);
    if (!set) return;
    await Promise.allSettled(
      [...set].map((handler) => Promise.resolve(handler(event)))
    );
  }
}

export const eventBus = new EventBus();

/** Convenience helper for emitting a domain event. */
export async function emit<
  TName extends string,
  TPayload extends object
>(
  name: TName,
  payload: TPayload,
  context: { actorId?: string | null; organizationId?: string } = {}
): Promise<void> {
  await eventBus.publish<DomainEvent<TName, TPayload>>({
    name,
    payload,
    occurredAt: new Date(),
    ...context,
  });
}