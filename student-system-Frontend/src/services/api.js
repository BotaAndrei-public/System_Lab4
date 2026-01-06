const API_URL = "http://localhost:8082/api";

// Funcție helper pentru a normaliza răspunsurile API ca array-uri
function normalizeArray(data, key) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (key && Array.isArray(data[key])) return data[key];
  if (Array.isArray(data.items)) return data.items;
  if (Array.isArray(data.data)) return data.data;
  return [];
}

// Wrapper principal pentru fetch, cu managementul erorilor
async function fetchJson(url, opts = {}) {
  const response = await fetch(url, opts);

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    let msg = `HTTP ${response.status}`;
    try {
      const j = JSON.parse(text);
      if (j.message) msg += ` - ${j.message}`;
      else if (text) msg += ` - ${text}`;
    } catch (e) {
      if (text) msg += ` - ${text}`;
    }
    throw new Error(msg);
  }

  const txt = await response.text();
  if (!txt) return null;

  try {
    const testul = await JSON.parse(txt);
    console.log(testul);
    return JSON.parse(txt);
  } catch (e) {
    throw new Error("Răspuns invalid JSON");
  }
}

// Obține header-ele pentru request, incluzând un client ID
function getHeaders(clientId) {
  return {
    "Content-Type": "application/json",
    "X-Client-ID": clientId || "anonymous",
  };
}

// Funcții API
export const api = {
  // Obține toți studenții
  async getAllStudents(clientId) {
    const data = await fetchJson(`${API_URL}/students`, {
      headers: getHeaders(clientId),
    });
    return normalizeArray(data, "students");
  },

  // Obține toate cursurile
  async getAllCourses(clientId) {
    const data = await fetchJson(`${API_URL}/courses`, {
      headers: getHeaders(clientId),
    });
    return normalizeArray(data, "courses");
  },

  // Obține studenții înregistrați la un curs
  async getRegisteredStudents(courseId, clientId) {
    const data = await fetchJson(
      `${API_URL}/courses/${encodeURIComponent(courseId)}/registered-students`,
      { headers: getHeaders(clientId) }
    );
    return normalizeArray(data, "students");
  },

  // Obține cursurile la care un student este înregistrat
  async getRegisteredCourses(studentId, clientId) {
    const data = await fetchJson(
      `${API_URL}/students/${encodeURIComponent(studentId)}/registered-courses`,
      { headers: getHeaders(clientId) }
    );
    return normalizeArray(data, "courses");
  },

  // Obține cursurile finalizate de un student
  async getCompletedCourses(studentId, clientId) {
    const data = await fetchJson(
      `${API_URL}/students/${encodeURIComponent(studentId)}/completed-courses`,
      { headers: getHeaders(clientId) }
    );
    return normalizeArray(data, "courses");
  },

  // Înregistrează un student la un curs
  async registerStudent(studentId, courseId, clientId) {
    const data = await fetchJson(`${API_URL}/register`, {
      method: "POST",
      headers: getHeaders(clientId),
      body: JSON.stringify({ studentId, courseId }),
    });
    return data;
  },
};
