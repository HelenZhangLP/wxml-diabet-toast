"use strict";
var __assign = (this && this.__assign) || function () {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("./validator");
var defaultOptions = {
  type: 'success',
  mask: false,
  message: '',
  show: false,
  zIndex: 1000,
  duration: 2000,
  position: 'middle',
  forbidClick: false,
  loadingType: 'circular',
  selector: '#diabet-toast',
};
var queue = [];
var currentOptions = __assign({}, defaultOptions);
function parseOptions(message) {
  return (0, validator_1.isObj)(message) ? message : { message: message };
}
function getContext() {
  var pages = getCurrentPages();
  return pages[pages.length - 1];
}
function DiabetToast(toastOptions) {
  var options = __assign(__assign({}, currentOptions), parseOptions(toastOptions));
  var context = options.context || getContext();
  var toast = context.selectComponent(options.selector);
  if (!toast) {
    console.warn('未找到 toast 节点，请确认 selector 及 context 是否正确');
    return;
  }
  delete options.context;
  delete options.selector;
  toast.clear = function () {
    toast.setData({ show: false });
    if (options.onClose) {
      options.onClose();
    }
  };
  queue.push(toast);
  toast.setData(options);
  clearTimeout(toast.timer);
  if (options.duration != null && options.duration > 0) {
    toast.timer = setTimeout(function () {
      toast.clear();
      queue = queue.filter(function (item) { return item !== toast; });
    }, options.duration);
  }
  return toast;
}
var createMethod = function (type) { return function (options) {
  return DiabetToast(__assign({ type: type }, parseOptions(options)));
}; };
DiabetToast.loading = createMethod('loading');
DiabetToast.success = createMethod('success');
DiabetToast.fail = createMethod('fail');
DiabetToast.clear = function () {
  queue.forEach(function (toast) {
    toast.clear();
  });
  queue = [];
};
DiabetToast.setDefaultOptions = function (options) {
  Object.assign(currentOptions, options);
};
DiabetToast.resetDefaultOptions = function () {
  currentOptions = __assign({}, defaultOptions);
};
exports.default = DiabetToast;
