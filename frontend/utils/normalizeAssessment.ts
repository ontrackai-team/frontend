export const normalizeAssessment = (item: any) => {
  if (typeof item === "string") {
    return {
      id: item,
      title: item,
      course: "",
      due_date: "",
      weight: 0,
      description: "",
      status: "pending",
      created_at: "",
    };
  }

  return {
    id: item.id || "",
    title: item.title || "",
    course: item.course || "",
    due_date: item.due_date || "",
    weight: item.weight || 0,
    description: item.description || "",
    status: item.status || "pending",
    created_at: item.created_at || "",
  };
};