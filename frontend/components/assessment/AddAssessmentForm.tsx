"use client";

import { useState } from "react";
import { createAssessment } from "@/services/assessmentService";

export default function AddAssessmentForm({ onSuccess }: any) {
  const [form, setForm] = useState({
    title: "",
    subject: "",
    due_date: "",
    priority: "Medium",
    status: "Pending",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createAssessment(form);

      setForm({
        title: "",
        subject: "",
        due_date: "",
        priority: "Medium",
        status: "Pending",
      });

      if (onSuccess) onSuccess(); // refresh list
    } catch (err) {
      console.log("Create error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h2 className="text-xl font-bold">Add Assessment</h2>

      {/* TITLE */}
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      {/* SUBJECT (was course) */}
      <input
        name="subject"
        placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      {/* DUE DATE */}
      <input
        name="due_date"
        type="date"
        value={form.due_date}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      {/* PRIORITY (was weight) */}
      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      {/* STATUS */}
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Adding..." : "Add Assessment"}
      </button>
    </form>
  );
}