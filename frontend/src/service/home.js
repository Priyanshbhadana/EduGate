// frontend/src/service/home.js
import conf from "../conf/conf";

export class HomeService {
  async getStudents() {
    try {
      const response = await fetch(`${conf.serverApi}/${conf.version}/home/get-students`);
      const result = await response.json();
      console.log("📥 getStudents result:", result);
      return result.data || [];
    } catch (error) {
      console.error("❌ Error in getStudents:", error);
      return [];
    }
  }

  async getOutStudents() {
    try {
      const response = await fetch(`${conf.serverApi}/${conf.version}/home/get-out-students`);
      const result = await response.json();
      console.log("📤 getOutStudents result:", result);
      return result.data || [];
    } catch (error) {
      console.error("❌ Error in getOutStudents:", error);
      return [];
    }
  }

  async getEntriesByDate(date) {
    try {
      const response = await fetch(`${conf.serverApi}/${conf.version}/home/get-entries-by-date`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date }),
      });

      const result = await response.json();
      console.log("📅 getEntriesByDate result:", result);
      return result.data || [];
    } catch (error) {
      console.error("❌ Error in getEntriesByDate:", error);
      return [];
    }
  }
}

const homeService = new HomeService();
export default homeService;
