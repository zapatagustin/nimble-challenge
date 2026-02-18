# Nimble Gravity - Challenge Junior Fullstack Developer

Mini aplicación en React + TypeScript + Tailwind CSS que consume la API del challenge de Nimble Gravity.

## Descripción

Esta app realiza lo siguiente según los pasos del challenge:

1. Obtiene los datos del candidato por email (`GET /api/candidate/get-by-email`)
2. Lista las posiciones abiertas (`GET /api/jobs/get-list`)
3. Muestra un card por cada posición con:
   - Título del puesto
   - Input para pegar la URL del repositorio GitHub
   - Botón "Postularme" que envía el POST a `/api/candidate/apply-to-job`
4. Maneja estados de carga, errores y éxito con feedback visual
5. Tema visual Gruvbox dark + fuente FiraCode Nerd Font

## Tecnologías utilizadas

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS v4** + tema Gruvbox
- **FiraCode Nerd Font** para tipografía monoespaciada
- Manejo de estados con hooks nativos (`useState`, `useEffect`)

## Requisitos previos

- Node.js ≥ 18
- npm o pnpm

## Instalación y ejecución

1. Clonar el repositorio

```bash
git clone https://github.com/zapatagustin/nimble-challenge.git
cd nimble-challenge
npm install
# o con pnpm
pnpm install

npm run dev
# abre http://localhost:5173

src/
├── components/
│   ├── JobCard.tsx          # Card de cada posición con form y submit
│   └── LoadingSpinner.tsx   # Spinner de carga con tema Gruvbox
├── lib/
│   └── api.ts               # Funciones fetch tipadas
├── types/
│   └── index.ts             # Interfaces Candidate, Job, etc.
├── App.tsx                  # Componente principal
├── main.tsx                 # Entry point
└── index.css                # Tailwind + @font-face + tema Gruvbox