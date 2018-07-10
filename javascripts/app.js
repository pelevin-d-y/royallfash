(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("initialize.js", function(exports, require, module) {
'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _fullpage = require('fullpage.js');

var _fullpage2 = _interopRequireDefault(_fullpage);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _jqueryValidation = require('jquery-validation');

var _jqueryValidation2 = _interopRequireDefault(_jqueryValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// fullpage
(0, _jquery2.default)(document).ready(function () {
  (0, _jquery2.default)('#fullpage').fullpage({
    anchors: ['page-1', 'page-2', 'page-3', 'page-4', 'page-5'],
    menu: '#menu',
    navigation: true
  });
});

document.querySelector('.location__map-map').addEventListener('touchstart', function () {
  _jquery2.default.fn.fullpage.setAllowScrolling(false);
});

document.querySelector('.location__map-map').addEventListener('touchend', function () {
  _jquery2.default.fn.fullpage.setAllowScrolling(true);
}

// popup

);var formButton = (0, _jquery2.default)('.btn-come');
var popupButtonClose = (0, _jquery2.default)('.popup-close');
var popupButtonLink = (0, _jquery2.default)('.btn-popup__link'

// validate
);(0, _jquery2.default)("#form").validate({
  rules: {
    form__surname: {
      required: true
    },
    form__file: {
      required: true
    }
  },
  messages: {
    form__surname: {
      required: 'Введите ваше ФИО'
    },

    form__file: {
      required: 'Выберите файл'
    }
  },
  submitHandler: function submitHandler(form) {
    // console.log(form)
    // form.submit()
    (0, _jquery2.default)(form).ajaxSubmit();

    // const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    // axios.post('http://localhost:3000/register', config).then((res) => {
    //   console.log(res.data)
    // }).catch((err) => {
    //   console.log(err)
    // })
    (0, _jquery2.default)('.popup').addClass('open-popup');
  }
});

popupButtonLink.click(function () {
  (0, _jquery2.default)('.popup').removeClass('open-popup');
});

popupButtonClose.click(function () {
  (0, _jquery2.default)('.popup').removeClass('open-popup');
});

(0, _jquery2.default)('.popup-overlay').click(function (evt) {
  if ((0, _jquery2.default)(evt.target).closest('.popup-container').length == 0) {
    (0, _jquery2.default)('.popup').removeClass('open-popup');
  }
});

// navigation

(0, _jquery2.default)("#navToggle").click(function (evt) {
  evt.stopPropagation();
  (0, _jquery2.default)(this).toggleClass("active");
  (0, _jquery2.default)(".main-nav-overlay").toggleClass("open");
  (0, _jquery2.default)("body").toggleClass("locked");
});

var links = (0, _jquery2.default)('.main-nav__link');

links.each(function (a, link) {
  link.addEventListener('click', function () {
    (0, _jquery2.default)(".main-nav-overlay").removeClass("open");
    (0, _jquery2.default)("body").removeClass("locked");
    (0, _jquery2.default)("#navToggle").removeClass("active");
  });
}

// next code

);(0, _jquery2.default)('.container').click(function (evt) {
  evt.stopPropagation();
});

(0, _jquery2.default)('.filter').click(function (evt) {
  evt.stopPropagation();
});

(0, _jquery2.default)('.main-nav-overlay').click(function (evt) {
  evt.stopPropagation();
});

(0, _jquery2.default)('#fullpage').click(function (evt) {
  evt.stopPropagation();
});

(0, _jquery2.default)('.popup').click(function (evt) {
  evt.stopPropagation();
}

// file
);(0, _jquery2.default)(function () {
  var wrapper = (0, _jquery2.default)(".file_upload"),
      btn = wrapper.find(".button"),
      lbl = wrapper.find("mark");
  var inp = (0, _jquery2.default)("#form__file");

  // Crutches for the :focus style:
  inp.focus(function () {
    wrapper.addClass("focus");
  }).blur(function () {
    wrapper.removeClass("focus");
  });

  var file_api = window.File && window.FileReader && window.FileList && window.Blob ? true : false;

  inp.change(function () {
    var file_name;
    if (file_api && inp[0].files[0]) file_name = inp[0].files[0].name;else file_name = inp.val().replace("C:\\fakepath\\", '');

    if (!file_name.length) return;

    if (lbl.is(":visible")) {
      lbl.text(file_name);
      btn.text("Выбрать");
    } else btn.text(file_name);
  }).change();
});
(0, _jquery2.default)(window).resize(function () {
  (0, _jquery2.default)(".file_upload input").triggerHandler("change");
});

});

require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map