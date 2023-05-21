const { chains } = require('../chainNames')
const { default: axios } = require('axios')

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
  //   const { chainName, contractAddress } = req.query
  //   console.log(chainName)
  //   console.log(contractAddress)
  //   const normalizedName = chainName.toLowerCase()
  //   const chainData = getChainData(normalizedName, chains)
  //   if (chainData) {
  //     const abi = await getABI(chainData, contractAddress)
  //   }
  res.render('home')
}

const api = {
  newsletterSignup: async (req, res) => {
    console.log('Токен CSRF (из скрытого поля формы): ' + req.body._csrf)
    console.log('Имя (из видимого поля формы): ' + req.body.chainName)
    console.log('Email (из видимого поля формы): ' + req.body.contractAddress)
    const chainData = getChainData(req.body.chainName, chains)
    if (chainData) {
      const abi = await getABI(chainData, req.body.contractAddress)
      res.send({ result: JSON.stringify(abi) })
    }
  }
}

const newsletter = async (req, res) => {
  res.render('newsletter', { csrf: 'Here is CSRF token' })
}

const notFound = async (req, res) => res.render('404')
// eslint-disable-next-line n/handle-callback-err
const serverError = async (err, req, res, next) => res.render('500')

module.exports = {
  home,
  notFound,
  serverError,
  newsletter,
  api
}
