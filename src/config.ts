export const getEnv = (envName: string, defaultValue = "") =>
  process.env[envName] || defaultValue;
