import environments from '../../config/environments.json';

export type EnvironmentName = keyof typeof environments;

const name = (process.env.TEST_ENV ?? 'dev') as EnvironmentName;

const fallback = environments.dev;

export function getEnv(): EnvironmentName {
  return name in environments ? name : 'dev';
}

export function envConfig() {
  const cfg = environments[getEnv()] ?? fallback;
  return {
    ...cfg,
    baseURL: process.env.BASE_URL ?? cfg.baseURL,
    apiBaseURL: process.env.API_BASE_URL ?? cfg.apiBaseURL,
  };
}
