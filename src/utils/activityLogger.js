const ACTIVITIES_KEY = "noiravenue_activities";

export function getActivities() {
  try {
    const stored = localStorage.getItem(ACTIVITIES_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addActivity(message) {
  if (!message?.trim()) {
    return null;
  }

  const activity = {
    id:
      typeof crypto !== "undefined" &&
      typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()
            .toString(36)
            .slice(2)}`,
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };

  const activities = getActivities();

  const updatedActivities = [
    activity,
    ...activities,
  ].slice(0, 100);

  localStorage.setItem(
    ACTIVITIES_KEY,
    JSON.stringify(updatedActivities)
  );

  window.dispatchEvent(
    new CustomEvent("noiravenue:activity", {
      detail: activity,
    })
  );

  return activity;
}

export function clearActivities() {
  localStorage.removeItem(ACTIVITIES_KEY);

  window.dispatchEvent(
    new CustomEvent("noiravenue:activity:clear")
  );
}