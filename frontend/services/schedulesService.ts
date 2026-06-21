import API from "./api";

// =========================
// TYPES
// =========================
export type Schedule = {
  id?: string;
  title: string;
  date: string;
  duration: number;
  status?: "pending" | "completed";
};

export type ScheduleUpdate = Partial<Schedule>;

// =========================
// GET ALL
// =========================
export const getSchedules = async (): Promise<Schedule[]> => {
  const { data } = await API.get("/schedules/");
  return data;
};

// =========================
// CREATE
// =========================
export const createSchedule = async (data: Schedule) => {
  const res = await API.post("/schedules/", data);
  return res.data;
};

// =========================
// UPDATE
// =========================
export const updateSchedule = async (
  id: string,
  data: ScheduleUpdate
) => {
  const res = await API.put(`/schedules/${id}`, data);
  return res.data;
};

// =========================
// DELETE
// =========================
export const deleteSchedule = async (id: string) => {
  const res = await API.delete(`/schedules/${id}`);
  return res.data;
};