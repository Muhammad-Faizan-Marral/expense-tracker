// src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // aur agar koi aur env variable hai to yahan add karo
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}