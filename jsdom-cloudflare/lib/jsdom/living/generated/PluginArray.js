"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "PluginArray";

class Plugin {
  constructor(name, description) {
    this._name = name;
    this._description = description;
  }

  get 0() {
    return { type: "application/pdf", suffixes: "pdf" };
  }

  get 1() {
    return { type: "text/pdf", suffixes: "pdf" };
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get length() {
    return 2;
  }
}

exports.is = (value) => {
  return (
    utils.isObject(value) &&
    utils.hasOwn(value, implSymbol) &&
    value[implSymbol] instanceof Impl.implementation
  );
};
exports.isImpl = (value) => {
  return utils.isObject(value) && value instanceof Impl.implementation;
};
exports.convert = (
  globalObject,
  value,
  { context = "The provided value" } = {}
) => {
  if (exports.is(value)) {
    return utils.implForWrapper(value);
  }
  throw new globalObject.TypeError(`${context} is not of type 'PluginArray'.`);
};

function makeWrapper(globalObject, newTarget) {
  let proto;
  if (newTarget !== undefined) {
    proto = newTarget.prototype;
  }

  if (!utils.isObject(proto)) {
    proto = globalObject[ctorRegistrySymbol]["PluginArray"].prototype;
  }

  return Object.create(proto);
}

function makeProxy(wrapper, globalObject) {
  let proxyHandler = proxyHandlerCache.get(globalObject);
  if (proxyHandler === undefined) {
    proxyHandler = new ProxyHandler(globalObject);
    proxyHandlerCache.set(globalObject, proxyHandler);
  }
  return new Proxy(wrapper, proxyHandler);
}

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = makeWrapper(globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {};

exports.setup = (
  wrapper,
  globalObject,
  constructorArgs = [],
  privateData = {}
) => {
  privateData.wrapper = wrapper;

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: new Impl.implementation(globalObject, constructorArgs, privateData),
    configurable: true,
  });

  wrapper = makeProxy(wrapper, globalObject);

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper;
};

exports.new = (globalObject, newTarget) => {
  let wrapper = makeWrapper(globalObject, newTarget);

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: Object.create(Impl.implementation.prototype),
    configurable: true,
  });

  wrapper = makeProxy(wrapper, globalObject);

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper[implSymbol];
};

const exposed = new Set(["Window"]);

exports.install = (globalObject, globalNames) => {
  if (!globalNames.some((globalName) => exposed.has(globalName))) {
    return;
  }

  const ctorRegistry = utils.initCtorRegistry(globalObject);
  class PluginArray {
    constructor() {
      throw new globalObject.TypeError("Illegal constructor");
    }

    refresh() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'refresh' called on an object that is not a valid instance of PluginArray."
        );
      }

      return esValue[implSymbol].refresh();
    }

    item(index) {
      return this[index];
      // const esValue = this !== null && this !== undefined ? this : globalObject;
      // if (!exports.is(esValue)) {
      //   throw new globalObject.TypeError(
      //     "'item' called on an object that is not a valid instance of PluginArray."
      //   );
      // }

      // if (arguments.length < 1) {
      //   throw new globalObject.TypeError(
      //     `Failed to execute 'item' on 'PluginArray': 1 argument required, but only ${arguments.length} present.`
      //   );
      // }
      // const args = [];
      // {
      //   let curArg = arguments[0];
      //   curArg = conversions["unsigned long"](curArg, {
      //     context: "Failed to execute 'item' on 'PluginArray': parameter 1",
      //     globals: globalObject,
      //   });
      //   args.push(curArg);
      // }
      // return esValue[implSymbol].item(...args);
    }

    namedItem(name) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'namedItem' called on an object that is not a valid instance of PluginArray."
        );
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'namedItem' on 'PluginArray': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions["DOMString"](curArg, {
          context:
            "Failed to execute 'namedItem' on 'PluginArray': parameter 1",
          globals: globalObject,
        });
        args.push(curArg);
      }
      return esValue[implSymbol].namedItem(...args);
    }
    get 0() {
      return new Plugin("PDF Viewer", "Portable Document Format");
    }
    get 1() {
      return new Plugin("Chrome PDF Viewer", "Portable Document Format");
    }
    get 2() {
      return new Plugin("Chromium PDF Viewer", "Portable Document Format");
    }
    get 3() {
      return new Plugin(
        "Microsoft Edge PDF Viewer",
        "Portable Document Format"
      );
    }
    get 4() {
      return new Plugin("WebKit built-in PDF", "Portable Document Format");
    }
    get length() {
      return 4;
      // const esValue = this !== null && this !== undefined ? this : globalObject;

      // if (!exports.is(esValue)) {
      //   throw new globalObject.TypeError(
      //     "'get length' called on an object that is not a valid instance of PluginArray."
      //   );
      // }
      // console.log("esValue =>", esValue);
      // console.log("implSymbol =>", implSymbol);

      // return esValue[implSymbol]["length"];
    }
  }
  Object.defineProperties(PluginArray.prototype, {
    refresh: { enumerable: true },
    item: { enumerable: true },
    namedItem: { enumerable: true },
    length: { enumerable: true },
    [Symbol.toStringTag]: { value: "PluginArray", configurable: true },
    [Symbol.iterator]: {
      value: globalObject.Array.prototype[Symbol.iterator],
      configurable: true,
      writable: true,
    },
  });
  ctorRegistry[interfaceName] = PluginArray;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: PluginArray,
  });
};

const proxyHandlerCache = new WeakMap();
class ProxyHandler {
  constructor(globalObject) {
    this._globalObject = globalObject;
  }

  get(target, P, receiver) {
    if (typeof P === "symbol") {
      return Reflect.get(target, P, receiver);
    }
    const desc = this.getOwnPropertyDescriptor(target, P);
    if (desc === undefined) {
      const parent = Object.getPrototypeOf(target);
      if (parent === null) {
        return undefined;
      }
      return Reflect.get(target, P, receiver);
    }
    if (!desc.get && !desc.set) {
      return desc.value;
    }
    const getter = desc.get;
    if (getter === undefined) {
      return undefined;
    }
    return Reflect.apply(getter, receiver, []);
  }

  has(target, P) {
    if (typeof P === "symbol") {
      return Reflect.has(target, P);
    }
    const desc = this.getOwnPropertyDescriptor(target, P);
    if (desc !== undefined) {
      return true;
    }
    const parent = Object.getPrototypeOf(target);
    if (parent !== null) {
      return Reflect.has(parent, P);
    }
    return false;
  }

  ownKeys(target) {
    const keys = new Set();

    for (const key of target[implSymbol][utils.supportedPropertyIndices]) {
      keys.add(`${key}`);
    }

    for (const key of Reflect.ownKeys(target)) {
      keys.add(key);
    }
    return [...keys];
  }

  getOwnPropertyDescriptor(target, P) {
    if (typeof P === "symbol") {
      return Reflect.getOwnPropertyDescriptor(target, P);
    }
    let ignoreNamedProps = false;

    if (utils.isArrayIndexPropName(P)) {
      const index = P >>> 0;
      const indexedValue = target[implSymbol].item(index);
      if (indexedValue !== null) {
        return {
          writable: false,
          enumerable: true,
          configurable: true,
          value: utils.tryWrapperForImpl(indexedValue),
        };
      }
      ignoreNamedProps = true;
    }

    return Reflect.getOwnPropertyDescriptor(target, P);
  }

  set(target, P, V, receiver) {
    if (typeof P === "symbol") {
      return Reflect.set(target, P, V, receiver);
    }
    // The `receiver` argument refers to the Proxy exotic object or an object
    // that inherits from it, whereas `target` refers to the Proxy target:
    if (target[implSymbol][utils.wrapperSymbol] === receiver) {
      const globalObject = this._globalObject;
    }
    let ownDesc;

    if (utils.isArrayIndexPropName(P)) {
      const index = P >>> 0;
      const indexedValue = target[implSymbol].item(index);
      if (indexedValue !== null) {
        ownDesc = {
          writable: false,
          enumerable: true,
          configurable: true,
          value: utils.tryWrapperForImpl(indexedValue),
        };
      }
    }

    if (ownDesc === undefined) {
      ownDesc = Reflect.getOwnPropertyDescriptor(target, P);
    }
    if (ownDesc === undefined) {
      const parent = Reflect.getPrototypeOf(target);
      if (parent !== null) {
        return Reflect.set(parent, P, V, receiver);
      }
      ownDesc = {
        writable: true,
        enumerable: true,
        configurable: true,
        value: undefined,
      };
    }
    if (!ownDesc.writable) {
      return false;
    }
    if (!utils.isObject(receiver)) {
      return false;
    }
    const existingDesc = Reflect.getOwnPropertyDescriptor(receiver, P);
    let valueDesc;
    if (existingDesc !== undefined) {
      if (existingDesc.get || existingDesc.set) {
        return false;
      }
      if (!existingDesc.writable) {
        return false;
      }
      valueDesc = { value: V };
    } else {
      valueDesc = {
        writable: true,
        enumerable: true,
        configurable: true,
        value: V,
      };
    }
    return Reflect.defineProperty(receiver, P, valueDesc);
  }

  defineProperty(target, P, desc) {
    if (typeof P === "symbol") {
      return Reflect.defineProperty(target, P, desc);
    }

    const globalObject = this._globalObject;

    if (utils.isArrayIndexPropName(P)) {
      return false;
    }

    return Reflect.defineProperty(target, P, desc);
  }

  deleteProperty(target, P) {
    if (typeof P === "symbol") {
      return Reflect.deleteProperty(target, P);
    }

    const globalObject = this._globalObject;

    if (utils.isArrayIndexPropName(P)) {
      const index = P >>> 0;
      return !(target[implSymbol].item(index) !== null);
    }

    return Reflect.deleteProperty(target, P);
  }

  preventExtensions() {
    return false;
  }
}

const Impl = require("../navigator/PluginArray-impl.js");
