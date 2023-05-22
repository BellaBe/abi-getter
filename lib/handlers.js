const { chains } = require('../chainNames')
const { default: axios } = require('axios')
const web3 = require('web3')

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

const home = async (req, res) => {
  res.render('home')
}

const api = {
  contractABI: async (req, res) => {
    const { chainName, contractAddress } = req.body
    if (!web3.utils.isAddress(contractAddress)) {
      throw new Error('Provided contract address is not correct')
    }
    const checksumAddress = web3.utils.toChecksumAddress(contractAddress)
    const chainData = getChainData(chainName, chains)
    if (chainData) {
      const abi = await getABI(chainData, checksumAddress)
      res.send({ result: JSON.stringify(abi) })
    }
  }
}

const notFound = async (req, res) => res.render('404')
// eslint-disable-next-line n/handle-callback-err
const serverError = async (err, req, res, next) => res.render('500')

module.exports = {
  home,
  notFound,
  serverError,
  api
}
