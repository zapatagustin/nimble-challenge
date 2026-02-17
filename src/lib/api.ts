import type { ApplyPayload, Candidate, Job } from "../types/interfaces";

const BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net'; 

async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    let errorMessage = 'Error';
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorMessage;
    } catch {}
    throw new Error(errorMessage);
  }

  return res.json();
}

export async function getCandidate(email: string): Promise<Candidate> {
  return apiFetch<Candidate>(`${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`);
}

export async function getJobs(): Promise<Job[]> {
  return apiFetch<Job[]>(`${BASE_URL}/api/jobs/get-list`);
}

export async function applyToJob(payload: ApplyPayload): Promise<{ ok: boolean }> {
  return apiFetch<{ ok: boolean }>(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}