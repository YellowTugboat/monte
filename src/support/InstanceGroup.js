import { MonteError } from './MonteError';
import { flattenDeep } from '../external/lodash';
import { isFunc } from '../tools/is';

export class InstanceGroup {
  constructor(instances, proxyMethodSet, ...additionalMethodsToProxy) {
    this._instances = [];
    this._methodsToProxy = proxyMethodSet.concat(flattenDeep(...additionalMethodsToProxy));

    this._methodsToProxy.forEach((m) => this.addProxyMethod(m));
    instances.forEach((instance) => this.addInstance(instance));
  }

  addProxyMethod(methodName) {
    this[methodName] = this.invokeProxyMethod.bind(this, methodName);
  }

  removeProxyMethod(methodName) {
    const index = this._methodsToProxy.indexOf(methodName);

    if (index > -1) { this._methodsToProxy.splice(index, 1); }
  }

  addInstance(instance) {
    if (instance) {
      this._instances.push(instance);
    }
  }

  removeChart(instance) {
    const index = this._instances.indexOf(instance);

    if (index > -1) { this._instances.splice(index, 1); }
  }

  invokeProxyMethod(methodName, ...args) {
    this._instances.forEach((instance) => {
      if (instance && instance[methodName] && isFunc(instance[methodName])) {
        instance[methodName](...args);
      }
      else {
        throw new MonteError(`Cannot invoke ${methodName} on ${instance}`);
      }
    });

    return this;
  }

  getProxiedMethods() {
    return this._methodsToProxy;
  }

  destroy(...args) {
    this._instances.forEach((instance) => {
      if (instance && instance['destroy'] && isFunc(instance['destroy'])) {
        instance['destroy'](...args);
      }
    });

    this._instances.length = 0;
  }
}
