const fs = require('fs')
const yaml = require('js-yaml')

async function readFile (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })
  })
}

function replaceEnvironmentVariables (rawConfig) {
  return rawConfig.replace(/\$\{([^\}]+)\}/g, (match, key) => {
    return process.env[key.trim()]
  })
}

function processFile (rawConfig) {
  // preprocess config file, replace environment variables
  const processedConfig = replaceEnvironmentVariables(rawConfig)
  return yaml.safeLoad(processedConfig)
}

exports.load = async function load (configFilePath) {
  try {
    const rawConfig = await readFile(configFilePath)
    return processFile(rawConfig)
  } catch (err) {
    throw new Error(`Error loading config: ${err}`)
  }
}

exports.loadSync = function loadSync (configFilePath) {
  try {
    const rawConfig = fs.readFileSync(configFilePath, 'utf8')
    return processFile(rawConfig)
  } catch (err) {
    throw new Error(`Error loading config: ${err}`)
  }
}
