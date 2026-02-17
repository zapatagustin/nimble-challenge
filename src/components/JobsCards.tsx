import { useState } from 'react';
import type { Job } from '../types/interfaces';
import { applyToJob } from '../lib/api';

interface JobCardProps {
  job: Job;
  uuid: string;
  candidateId: string;
}

export default function JobCard({ job, uuid, candidateId }: JobCardProps) {
  const [repoUrl, setRepoUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleApply = async () => {
    const trimmedUrl = repoUrl.trim();

    if (!trimmedUrl) {
      setMessage('Por favor ingresa la URL del repositorio');
      setStatus('error');
      return;
    }

    if (!trimmedUrl.includes('github.com')) {
      setMessage('La URL debe ser de un repositorio en GitHub');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      await applyToJob({
        uuid,
        candidateId,
        jobId: job.id,
        repoUrl: trimmedUrl,
      });
      setStatus('success');
      setMessage('¡Postulación enviada exitosamente!');
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Ocurrió un error al enviar la postulación');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
      <p className="text-sm text-gray-600 mb-4">ID: {job.id}</p>

      {status === 'success' ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md">
          {message}
        </div>
      ) : (
        <div className="space-y-4">
          <input
            type="url"
            value={repoUrl}
            onChange={(e) => {
              setRepoUrl(e.target.value);
              if (status !== 'idle') setStatus('idle');
            }}
            placeholder="https://github.com/tu-usuario/tu-repo"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60"
            disabled={status === 'loading'}
          />

          <button
            onClick={handleApply}
            disabled={status === 'loading'}
            className={`
              w-full py-3 px-4 rounded-md font-medium text-white transition-colors
              ${status === 'loading' 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'}
            `}
          >
            {status === 'loading' ? 'Enviando...' : 'Enviar postulación'}
          </button>

          {status === 'error' && message && (
            <p className="text-red-600 text-sm text-center">{message}</p>
          )}
        </div>
      )}
    </div>
  );
}