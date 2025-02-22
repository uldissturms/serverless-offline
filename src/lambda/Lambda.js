import LambdaFunctionPool from './LambdaFunctionPool.js'

export default class Lambda {
  constructor(provider, options, config) {
    this._lambdas = new Map()
    this._lambdaFunctionNamesKeys = new Map()
    this._lambdaFunctionPool = new LambdaFunctionPool(provider, config, options)
  }

  add(functionKey, functionDefinition) {
    this._lambdas.set(functionKey, functionDefinition)
    this._lambdaFunctionNamesKeys.set(functionDefinition.name, functionKey)
  }

  get(functionKey) {
    const functionDefinition = this._lambdas.get(functionKey)
    return this._lambdaFunctionPool.get(functionKey, functionDefinition)
  }

  getByFunctionName(functionName) {
    const functionKey = this._lambdaFunctionNamesKeys.get(functionName)
    return this.get(functionKey)
  }

  cleanup() {
    return this._lambdaFunctionPool.cleanup()
  }
}
