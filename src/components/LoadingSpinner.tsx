export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3">
      <div className="flex items-center gap-1 text-gruvbox-aqua-bright font-firacode text-xl">
        <span className="animate-bounce">.</span>
        <span className="animate-bounce delay-150">.</span>
        <span className="animate-bounce delay-300">.</span>
      </div>
      <p className="text-gruvbox-gray-2 font-firacode text-sm">
        Cargando datos...
      </p>
    </div>
  );
}