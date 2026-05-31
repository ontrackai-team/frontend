export interface Assessment {
  id: string;
  title: string;
  course: string;
  due_date: string;
  weight: number;
  description: string;
  status: "pending" | "submitted" | "overdue";
}