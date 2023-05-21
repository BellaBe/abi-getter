const tryAndGetEnvAsString = envName => {
  const envVar = process.env[envName]
  if (!envVar) {
    throw new Error(`Env var ${envName} is not defined`)
  }
  return envVar
}

module.exports = {
  tryAndGetEnvAsString
}
