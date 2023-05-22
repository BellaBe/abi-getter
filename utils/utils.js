const { default: axios } = require('axios')
const web3 = require('web3')

const tryAndGetEnvAsString = envName => {
  const envVar = process.env[envName]
  if (!envVar) {
    throw new Error(`Env var ${envName} is not defined`)
  }
  return envVar
}

const getChainData = (name, chains) => {
  if (Object.keys(chains).includes(name)) {
    return chains[name]
  }
}

const getABI = async (chainData, contractAddress) => {
  const { scanUrl, scanKey } = chainData
  const result = await axios.get(
    `${scanUrl}?module=contract&action=getabi&address=${contractAddress}&apikey=${scanKey}`
  )

  return JSON.parse(result.data.result)
}

const isValidContractAddress = (contractAddress) => {
  return web3.utils.isAddress(contractAddress)
}

const getChecksumAddress = (contractAddress) => {
  return web3.utils.toChecksumAddress(contractAddress)
}

module.exports = {
  getABI,
  getChainData,
  getChecksumAddress,
  isValidContractAddress,
  tryAndGetEnvAsString

}
