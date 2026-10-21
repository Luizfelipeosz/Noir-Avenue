const ACTIVITIES_KEY = "noiravenue_activities";
const NOTIFICATIONS_EVENT = "noiravenue:notification";
const MAX_ACTIVITIES = 100;

export function readActivities() {
  try {
    const stored = JSON.parse(
      localStorage.getItem(ACTIVITIES_KEY) || "[]"
    );

    if (!Array.isArray(stored)) {
      return [];
    }

    return stored.filter(
      (item) =>
        item &&
        item.id != null &&
        typeof item.message === "string"
    );
  } catch (error) {
    console.error("Não foi possível ler as atividades:", error);
    return [];
  }
}

function notifySubscribers() {
  window.dispatchEvent(new Event(NOTIFICATIONS_EVENT));
}

export function addNotification(message, type = "activity") {
  if (typeof message !== "string" || !message.trim()) {
    return null;
  }

  const activity = {
    id:
      globalThis.crypto?.randomUUID?.() ||
      `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    message: message.trim(),
    type,
    createdAt: new Date().toISOString(),
    read: false,
  };

  try {
    const activities = [
      activity,
      ...readActivities(),
    ].slice(0, MAX_ACTIVITIES);

    localStorage.setItem(
      ACTIVITIES_KEY,
      JSON.stringify(activities)
    );

    notifySubscribers();

    return activity;
  } catch (error) {
    console.error(
      "Não foi possível registrar a atividade:",
      error
    );

    return null;
  }
}

export function markAllNotificationsAsRead() {
  try {
    const activities = readActivities().map((item) => ({
      ...item,
      read: true,
    }));

    localStorage.setItem(
      ACTIVITIES_KEY,
      JSON.stringify(activities)
    );

    notifySubscribers();
  } catch (error) {
    console.error(
      "Não foi possível marcar as notificações como lidas:",
      error
    );
  }
}

export function subscribeToNotifications(callback) {
  const handleUpdate = () => {
    callback(readActivities());
  };

  window.addEventListener(
    NOTIFICATIONS_EVENT,
    handleUpdate
  );

  // Atualiza também quando outra aba altera o localStorage.
  window.addEventListener("storage", handleUpdate);

  return () => {
    window.removeEventListener(
      NOTIFICATIONS_EVENT,
      handleUpdate
    );

    window.removeEventListener("storage", handleUpdate);
  };
}