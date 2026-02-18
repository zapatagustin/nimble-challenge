import { useState, useEffect } from "react";
import JobCard from "./components/JobsCards";
import { getCandidate, getJobs } from "./lib/api";
import type { Candidate, Job } from "./types/interfaces";
import LoadingSpinner from "./components/LoadingSpinner";

const MY_EMAIL = "zapatagustin4@gmail.com";
export default function App() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const candidateData = await getCandidate(MY_EMAIL);
        setCandidate(candidateData);

        const jobsData = await getJobs();
        setJobs(jobsData);
      } catch (err: any) {
        setError(err.message || "No pudimos cargar los datos iniciales");
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gruvbox-red mb-4">Error</h1>
        <p className="text-lg">{error}</p>
        <p className="mt-4">Por favor revisa la consola o intenta más tarde.</p>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="text-center py-12 text-xl">
        No se encontraron datos del candidato
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gruvbox-bg text-gruvbox-fg">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold ">Challenge Nimble Gravity</h1>
          <p className="text-xl">
            Bienvenid@,{" "}
            <span className="font-semibold">
              {candidate.firstName} {candidate.lastName}
            </span>
          </p>
          <div className="mt-4 text-sm text-gray-600 space-x-4">
            <span>
              UUID:{" "}
              <code className="px-2 py-1 rounded">
                {candidate.uuid}
              </code>
            </span>
            <span>
              Candidate ID:{" "}
              <code className="px-2 py-1 rounded">
                {candidate.candidateId}
              </code>
            </span>
          </div>
        </header>

        <main>
          <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">
            Posiciones abiertas
          </h2>

          {jobs.length === 0 ? (
            <p className="text-center py-8">
              No hay posiciones disponibles en este momento.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  uuid={candidate.uuid}
                  candidateId={candidate.candidateId}
                  applicationId={candidate.applicationId}
                />
              ))}
            </div>
          )}
        </main>

        <footer className="mt-16 text-center text-sm">
          Repositorio:
          <a
            href="https://github.com/zapatagustin/nimble-challenge"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gruvbox-blue hover:underline ml-1"
          >
            https://github.com/zapatagustin/nimble-challenge
          </a>
        </footer>
      </div>
    </div>
  );
}
