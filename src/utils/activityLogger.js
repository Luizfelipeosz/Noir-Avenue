const STORAGE_KEY = "noiravenue_activities";
const MAX_ACTIVITIES = 200;

const getStoredActivities = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch (error) {
    console.error(
      "Erro ao carregar histórico de atividades:",
      error
    );

    return [];
  }
};

const saveActivities = (activities) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(activities)
    );
  } catch (error) {
    console.error(
      "Erro ao salvar histórico de atividades:",
      error
    );
  }
};

export const addActivity = ({
  type = "system",
  action = "completed",
  message,
  metadata = {},
}) => {
  if (!message) {
    return null;
  }

  const activity = {
    id: `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 9)}`,

    type,

    action,

    message,

    metadata,

    createdAt: new Date().toISOString(),
  };

  const activities = getStoredActivities();

  const updatedActivities = [
    activity,
    ...activities,
  ].slice(0, MAX_ACTIVITIES);

  saveActivities(updatedActivities);

  window.dispatchEvent(
    new CustomEvent("noiravenue:activity", {
      detail: activity,
    })
  );

  return activity;
};

export const getActivities = () => {
  return getStoredActivities();
};

export const clearActivities = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);

    window.dispatchEvent(
      new CustomEvent(
        "noiravenue:activity:clear"
      )
    );
  } catch (error) {
    console.error(
      "Erro ao limpar histórico:",
      error
    );
  }
};

export const removeActivity = (activityId) => {
  const activities = getStoredActivities();

  const updatedActivities = activities.filter(
    (activity) => activity.id !== activityId
  );

  saveActivities(updatedActivities);

  window.dispatchEvent(
    new CustomEvent("noiravenue:activity", {
      detail: {
        id: activityId,
        removed: true,
      },
    })
  );
};