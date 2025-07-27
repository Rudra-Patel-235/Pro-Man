import Activity from "../models/activityModel.js";

export const logActivity = async (
  userId,
  action,
  resourceType,
  resourceId,
  details
) => {
  try {
    await Activity.create({
      user: userId,
      action,
      resourceType,
      resourceId,
      details,
    });
  } catch (error) {
    console.log("Error logging activity:", error);
  }
};

