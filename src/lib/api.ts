import type { ApplyPayload, Candidate, Job } from "../types/interfaces";

const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    let errorMessage = "Error";
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorMessage;
    } catch {}
    throw new Error(errorMessage);
  }

  return res.json();
}

export async function getCandidate(email: string): Promise<Candidate> {
  return apiFetch<Candidate>(
    `${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`,
  );
}

export async function getJobs(): Promise<Job[]> {
  return apiFetch<Job[]>(`${BASE_URL}/api/jobs/get-list`);
}

export const applyToJob = async (payload: {
  uuid: string;
  candidateId: string;
  applicationId: string;
  jobId: string;
  repoUrl: string;
}) => {
  const res = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let errorBody = "";
    try {
      const data = await res.json(); // ← Intenta parsear JSON
      errorBody = data.message || data.error || JSON.stringify(data);
    } catch {
      errorBody = await res.text(); // ← Si no es JSON, toma texto crudo
    }
    console.error("POST Error:", res.status, errorBody); // ← Esto va a la consola
    throw new Error(errorBody || `HTTP ${res.status} - Bad Request`);
  }

  return res.json();
};
