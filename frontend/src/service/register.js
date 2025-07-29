// src/service/register.service.js

const API_BASE = `${process.env.REACT_APP_SERVER_API}/${process.env.REACT_APP_VERSION}/register`;

const registerService = {
  async createOutEntry(rollNo) {
    console.log("📤 Creating OUT entry for:", rollNo);

    if (!rollNo || typeof rollNo !== "string") {
      console.error("❌ Invalid roll number for OUT entry:", rollNo);
      return { error: "Invalid roll number" };
    }

    try {
      const response = await fetch(`${API_BASE}/create-out-entry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rollNo }),
      });

      return response;
    } catch (error) {
      console.error("❌ Network error during createOutEntry:", error);
      return { error: "Network error" };
    }
  },

  async createInEntry(rollNo) {
    console.log("📥 Creating IN entry for:", rollNo);

    if (!rollNo || typeof rollNo !== "string") {
      console.error("❌ Invalid roll number for IN entry:", rollNo);
      return { error: "Invalid roll number" };
    }

    try {
      const response = await fetch(`${API_BASE}/create-in-entry`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rollNo }),
      });

      return response;
    } catch (error) {
      console.error("❌ Network error during createInEntry:", error);
      return { error: "Network error" };
    }
  },
};

export default registerService;
