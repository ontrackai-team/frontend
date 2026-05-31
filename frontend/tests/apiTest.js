import { getHealth, getRoot, getAssessments } from "../services/api";

async function testAPI() {
    try {
        console.log("Testing backend connection...");

        const health = await getHealth();
        console.log("HEALTH:", health.data);

        const root = await getRoot();
        console.log("ROOT:", root.data);

        const assessments = await getAssessments();
        console.log("ASSESSMENTS:", assessments.data);

        console.log("✅ ALL TESTS PASSED");
    } catch (err) {
        console.error("❌ API ERROR:", err.message);
    }
}

testAPI();