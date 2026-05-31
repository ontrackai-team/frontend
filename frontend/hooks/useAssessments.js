"use client";

import { useEffect, useState } from "react";
import { getAssessments } from "@/services/api";
import { normalizeAssessment } from "@/utils/normalizeAssessment";

export function useAssessments() {
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAssessments()
            .then((res) => {
                const data = Array.isArray(res.data) ? res.data : [];
                setAssessments(data.map(normalizeAssessment));
            })
            .catch((err) => console.log("API Error:", err))
            .finally(() => setLoading(false));
    }, []);

    return { assessments, loading };
}