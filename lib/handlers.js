const { chains } = require('../data/chains')
const {
  getABI,
  getChainData,
  isValidContractAddress,
  getChecksumAddress
} = require('../utils/utils')

const homeHandler = async (req, res) => {
  res.render('home')
}

const abiHandler = async (req, res) => {
  const { chainName, contractAddress } = req.body

  const isValidAddress = isValidContractAddress(contractAddress)
  if (!isValidAddress) {
    return res.send({
      result: false,
      message: "Contract address didn't pass validation, please double check"
    })
  }

  const checksumAddress = getChecksumAddress(contractAddress)
  const chainData = getChainData(chainName, chains)
  if (chainData) {
    try {
      const abi = await getABI(chainData, checksumAddress)
      res.send({
        result: true,
        data: JSON.stringify(abi)
      })
    } catch (error) {
      res.send({
        result: false,
        message: 'Could not retrieve the requested ABI, please try again later'
      })
    }
    return
  }
  res.send({
    result: false,
    message: 'Could not find chain data, looks like we do not currently support it'
  })
}

const notFoundHandler = async (req, res) => {
  res.render('not-found')
}
// eslint-disable-next-line n/handle-callback-err
const serverErrorHandler = async (err, req, res, next) => {
  res.render('server-error')
}

module.exports = {
  abiHandler,
  homeHandler,
  notFoundHandler,
  serverErrorHandler
}
