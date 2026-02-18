import { useState } from "react";
import { applyToJob } from "../lib/api";

interface JobCardProps {
  job: {
    id: string;
    title: string;
  };
  uuid: string;
  candidateId: string;
  applicationId: string;
}

export default function JobCard({
  job,
  uuid,
  candidateId,
  applicationId,
}: JobCardProps) {
  const [repoUrl, setRepoUrl] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const trimmedUrl = repoUrl.trim();

    if (!trimmedUrl) {
      setMessage("Por favor ingresá la URL del repositorio");
      setStatus("error");
      return;
    }

    if (!trimmedUrl.startsWith("https://github.com/")) {
      setMessage(
        "La URL debe ser un repositorio válido de GitHub[](https://github.com/...)",
      );
      setStatus("error");
      return;
    }

    setStatus("loading");
    setMessage("");

    const payload = {
      uuid,
      candidateId,
      applicationId,
      jobId: job.id,
      repoUrl: trimmedUrl,
    };

    console.log(
      "Enviando POST con este payload:",
      JSON.stringify(payload, null, 2),
    );

    try {
      const response = await applyToJob(payload);
      console.log("Respuesta exitosa:", response);
      setStatus("success");
      setMessage("¡Postulación enviada con éxito!");
    } catch (err: any) {
      console.error("Error completo en el submit:", err);

      let errorMsg = "Ocurrió un error al enviar la postulación";
      if (err.message) {
        errorMsg = err.message;
      }

      setStatus("error");
      setMessage(errorMsg);
    }
  };

  return (
    <div className="rounded-lg shadow-md p-6 border border-gruvbox-green hover:shadow-xl transition-all">
      <h3 className="text-xl font-semibold mb-3">{job.title}</h3>
      <p className="text-sm mb-5 text-gruvbox-yellow">ID: {job.id}</p>

      {status === "success" ? (
        <div className="p-4 rounded-md">{message}</div>
      ) : (
        <div className="space-y-4">
          <input
            type="url"
            value={repoUrl}
            onChange={(e) => {
              setRepoUrl(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="https://github.com/tu-usuario/tu-repo"
            className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            disabled={status === "loading"}
          />

          <button
            onClick={handleSubmit}
            disabled={status === "loading"}
            className={`
              w-full py-3 px-4 rounded-md font-medium transition-colors
              ${
                status === "loading"
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gruvbox-aqua hover:bg-gruvbox-blue active:bg-gruvbox-blue-bright"
              }
            `}
          >
            {status === "loading" ? "Enviando..." : "Postularme"}
          </button>

          {status === "error" && message && (
            <p className="text-gruvbox-red text-sm text-center mt-2">{message}</p>
          )}
        </div>
      )}
    </div>
  );
}
