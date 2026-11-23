# dCoder — Inglés técnico para developers

Live: https://noemifagerstromlinck.github.io/syntax-english-platform/

Professional English development workspace for IT professionals: student dashboard, sprint workspace, competency profile, tutor sessions, interview lab and student profile.

Dark-first TanStack Start + React + Tailwind prototype. All content lives in `src/data/platform.ts` as fictional sample data; there is no auth, database or external integration yet.

Two themes ship together, switched from the sidebar: **Obsidian** (near-black + neon) and **Paper** (bone + ink, no colour). The choice is stored in `localStorage`.

`/` is the public landing page. The student app lives under `/dashboard`, `/sprint`, `/learning-pad`, `/competencies`, `/sessions`, `/interview-lab` and `/profile`.

## Local development

```sh
bun install
bun run dev      # http://localhost:5173
bun run build
bun run test
```

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
