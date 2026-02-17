import { useState, useEffect } from 'react';
import JobCard from './components/JobsCards';
import { getCandidate, getJobs } from './lib/api';
import type { Candidate, Job } from './types/interfaces';

const MY_EMAIL = 'tu.email@real.com'; // ← CAMBIAR ESTO

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
        setError(err.message || 'No pudimos cargar los datos iniciales');
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);


  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-lg text-gray-700">{error}</p>
        <p className="mt-4 text-gray-600">Por favor revisa la consola o intenta más tarde.</p>
      </div>
    );
  }

  if (!candidate) {
    return <div className="text-center py-12 text-xl">No se encontraron datos del candidato</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Challenge Nimble Gravity
          </h1>
          <p className="text-xl text-gray-700">
            Bienvenid@, <span className="font-semibold">{candidate.firstName} {candidate.lastName}</span>
          </p>
          <div className="mt-4 text-sm text-gray-600 space-x-4">
            <span>UUID: <code className="bg-gray-200 px-2 py-1 rounded">{candidate.uuid}</code></span>
            <span>Candidate ID: <code className="bg-gray-200 px-2 py-1 rounded">{candidate.candidateId}</code></span>
          </div>
        </header>

        <main>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
            Posiciones abiertas
          </h2>

          {jobs.length === 0 ? (
            <p className="text-center text-gray-600 py-8">No hay posiciones disponibles en este momento.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  uuid={candidate.uuid}
                  candidateId={candidate.candidateId}
                />
              ))}
            </div>
          )}
        </main>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          Repositorio: 
          <a 
            href="https://github.com/TU_USUARIO/TU_REPO" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline ml-1"
          >
            https://github.com/TU_USUARIO/TU_REPO
          </a>
        </footer>
      </div>
    </div>
  );
}