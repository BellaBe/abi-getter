const { chains } = require('../chainNames')
const { default: axios } = require('axios')
const web3 = require('web3')
const { BadRequestError } = require('../errors/bad-request')

const getABI = async (chainData, contractAddress) => {
  const { scanUrl, scanKey } = chainData
  const result = await axios.get(
    `${scanUrl}?module=contract&action=getabi&address=${contractAddress}&apikey=${scanKey}`
  )

  return JSON.parse(result.data.result)
}

const getChainData = (name, chains) => {
  if (Object.keys(chains).includes(name)) {
    return chains[name]
  }
}

const homeHandler = async (req, res) => {
  res.render('home')
}

const abiHandler = async (req, res) => {
  const { chainName, contractAddress } = req.body
  if (!web3.utils.isAddress(contractAddress)) {
    throw new BadRequestError('Provided contract address is not correct')
  }
  const checksumAddress = web3.utils.toChecksumAddress(contractAddress)
  const chainData = getChainData(chainName, chains)
  if (chainData) {
    const abi = await getABI(chainData, checksumAddress)
    res.send({ result: JSON.stringify(abi) })
  }
}

const errorHandler = (req, res) => {
  res.render('errors', {})
}

module.exports = {
  homeHandler,
  abiHandler,
  errorHandler
}
