require('dotenv').config()

const { tryAndGetEnvAsString } = require('../utils/utils')

const chains = {
  ethereum: {
    scanUrl: tryAndGetEnvAsString('ETHERSCAN_API_URL'),
    scanKey: tryAndGetEnvAsString('ETHERSCAN_API_KEY')
  },
  arbitrum: {
    scanUrl: tryAndGetEnvAsString('ARBISCAN_API_URL'),
    scanKey: tryAndGetEnvAsString('ARBISCAN_API_KEY')
  },
  binance: {
    scanUrl: tryAndGetEnvAsString('BSC_SCAN_API_URL'),
    scanKey: tryAndGetEnvAsString('BSC_SCAN_API_KEY')
  },
  polygon: {
    scanUrl: tryAndGetEnvAsString('POLYGON_SCAN_URL'),
    scanKey: tryAndGetEnvAsString('POLYGONSCAN_API_KEY')
  }
}

module.exports = {
  chains
}
