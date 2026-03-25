/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_FORM_ENDPOINT?: string;
  readonly VITE_GITHUB_URL?: string;
  readonly VITE_LINKEDIN_URL?: string;
  readonly VITE_X_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
