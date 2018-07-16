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
require.register("helpers/unique.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var unique = function unique(arr) {
  var obj = {};
  arr.forEach(function (element) {
    var str = element;
    obj[str] = true; // запомнить строку в виде свойства объекта
  });
  return Object.keys(obj);
};

exports.default = unique;

});

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

require('jquery-validation/dist/additional-methods');

require('./list.js');

var _customFileInput = require('./scripts/customFileInput');

var _customFileInput2 = _interopRequireDefault(_customFileInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// fullpage
(0, _jquery2.default)(document).ready(function () {
  (0, _jquery2.default)('#fullpage').fullpage({
    anchors: ['page-1', 'page-2', 'page-3', 'page-4', 'page-5'],
    menu: '#menu',
    navigation: true
  });
});

if (document.querySelector('.location__map-map')) {
  document.querySelector('.location__map-map').addEventListener('touchstart', function () {
    _jquery2.default.fn.fullpage.setAllowScrolling(false);
  });

  document.querySelector('.location__map-map').addEventListener('touchend', function () {
    _jquery2.default.fn.fullpage.setAllowScrolling(true);
  });
}

var popupButtonClose = (0, _jquery2.default)('.popup-close');
var popupButtonLink = (0, _jquery2.default)('.btn-popup__link'

// validate
);(0, _jquery2.default)("#form").validate({
  rules: {
    form__surname: {
      required: true
    },
    form__file: {
      extension: 'png|jpg|jpeg',
      required: true
    }
  },
  messages: {
    form__surname: {
      required: 'Введите ваше ФИО'
    },

    form__file: {
      required: 'Выберите файл',
      extension: 'расширение должно быть jpg или png'
    }
  },
  submitHandler: function submitHandler(form) {
    var data = new FormData(form);
    var config = { headers: { 'Content-Type': 'multipart/form-data', "Access-Control-Allow-Origin": "*" } };

    (0, _jquery2.default)('.preloader').removeClass('hidden');
    _axios2.default.post('https://pridebeeline.party/register', data, config).then(function (res) {
      (0, _jquery2.default)('.preloader').addClass('hidden');
      if (res.data === 'success') {
        (0, _jquery2.default)('.popup__text').text('Успешно!');
        (0, _jquery2.default)('.popup').addClass('open-popup');
      }
    }).catch(function (err) {
      console.log(err);
    });
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

// file input
);(0, _customFileInput2.default

// next code
)();(0, _jquery2.default)('.container').click(function (evt) {
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
});

});

require.register("list.js", function(exports, require, module) {
'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _jqueryValidation = require('jquery-validation');

var _jqueryValidation2 = _interopRequireDefault(_jqueryValidation);

var _jqueryAutocomplete = require('jquery-autocomplete');

var _jqueryAutocomplete2 = _interopRequireDefault(_jqueryAutocomplete);

var _unique = require('./helpers/unique');

var _unique2 = _interopRequireDefault(_unique);

var _existPost = require('./scripts/existPost');

var _existPost2 = _interopRequireDefault(_existPost);

var _comePost = require('./scripts/comePost');

var _comePost2 = _interopRequireDefault(_comePost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// autocomplete
var autocompleteInput = jQuery('#registration-form .registration__input');
var config = { headers: {
    'Access-Control-Allow-Origin': '*'
  } };
_axios2.default.get('https://pridebeeline.party/fullnames', config).then(function (res) {
  var autocompleteArray = [];
  res.data.forEach(function (element) {
    autocompleteArray.push(element.name);
  });
  var uniqueAutocompleteArray = (0, _unique2.default)(autocompleteArray);

  autocompleteInput.autocomplete({
    source: [uniqueAutocompleteArray],
    limit: 20,
    visibleLimit: 6,
    showHint: false
  }, 4000);
}

// validation
);(0, _jquery2.default)("#registration-form").validate({
  rules: {
    name: {
      required: true
    }
  },
  messages: {
    name: {
      required: 'Введите ваше ФИО'
    }
  },
  submitHandler: function submitHandler(form) {
    var data = new FormData(form);
    var fieldData = data.get('name');
    (0, _jquery2.default)('.preloader').removeClass('hidden');

    _axios2.default.post('https://pridebeeline.party/exist', { 'name': fieldData }, config).then(function (res) {
      (0, _jquery2.default)('.preloader').addClass('hidden');
      if (res.data.exist === 'exist') {
        (0, _existPost2.default)(res);
      }
    }).catch(function (err) {
      console.log(err);
    });
  }
});

(0, _jquery2.default)("#registration-form__come").validate({
  rules: {
    card: {
      required: true
    }
  },
  messages: {
    card: {
      required: ''
    }
  },
  submitHandler: function submitHandler(form) {
    var data = new FormData(form);
    var fieldData = data.get('card');
    (0, _jquery2.default)('.preloader').removeClass('hidden');

    _axios2.default.post('https://pridebeeline.party/come', { 'name': fieldData }, config).then(function (res) {
      (0, _jquery2.default)('.preloader').addClass('hidden');
      (0, _comePost2.default)();
    }).catch(function (err) {
      console.log(err);
    });
  }
}

// popups
);var popupButtonClose = (0, _jquery2.default)('.popup-close');
var popupButtonLink = (0, _jquery2.default)('.btn-popup__link');

popupButtonLink.click(function () {
  (0, _jquery2.default)('.popup').removeClass('open-popup');
});

popupButtonClose.click(function () {
  (0, _jquery2.default)('.popup').removeClass('open-popup');
});

(0, _jquery2.default)('.registration-popup').click(function (evt) {
  var registrationPopup = document.querySelector('.registration-popup');
  if (evt.target === registrationPopup) {
    (0, _jquery2.default)('.popup').removeClass('open-popup');
    (0, _jquery2.default)('.popup-overlay__registration').addClass('hidden');
  }
});

(0, _jquery2.default)('.registration-popup .popup-close').click(function () {
  (0, _jquery2.default)('.popup').removeClass('open-popup');
  (0, _jquery2.default)('.popup-overlay__registration').addClass('hidden');
});

(0, _jquery2.default)('.popup-overlay').click(function (evt) {
  if ((0, _jquery2.default)(evt.target).closest('.popup-container').length == 0) {
    (0, _jquery2.default)('.popup').removeClass('open-popup');
  }
});

});

require.register("scripts/comePost.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var popupBtnComeText = $('.registration-popup__btn-come span');
  if (popupBtnComeText.text() === 'Закрыть') {
    $('.registration-popup').removeClass('open-popup');
    $('.popup-overlay__registration').addClass('hidden');
    document.querySelector('#registration-form .registration__input ').value = '';
  } else {
    $('.registration-popup').removeClass('open-popup');
    $('.popup-overlay__registration').addClass('hidden');
    $('.registration-popup__success').addClass('open-popup');
    document.querySelector('#registration-form .registration__input ').value = '';
  }
};

});

require.register("scripts/customFileInput.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    (0, _jquery2.default)(function () {
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
                btn.text("Прикрепить фото");
            } else btn.text(file_name);
        }).change();
    });
    (0, _jquery2.default)(window).resize(function () {
        (0, _jquery2.default)(".file_upload input").triggerHandler("change");
    });
};

});

require.register("scripts/existPost.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userCard = require('./userCard');

var _userCard2 = _interopRequireDefault(_userCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (res) {
  $(".registration-item__content").remove();
  (0, _userCard2.default)(res.data.currentUserModel);
  var currentUsersCome = $('#registration-form__come .registration-item__content-success ').length;
  var popupBtnComeText = $('.registration-popup__btn-come span');
  if (!currentUsersCome) {
    popupBtnComeText.text('Закрыть');
  } else {
    popupBtnComeText.text('Пришел');
  }

  $('.registration-popup').addClass('open-popup');
  $('.popup-overlay__registration').removeClass('hidden');
};

});

require.register("scripts/userCard.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userCards = function userCards(data) {
  _jquery2.default.each(data, function (index, value) {
    (0, _jquery2.default)('.popup__text-registration').append('<div class="registration-item__content registration-item__content-' + (value.come === false ? 'success' : 'error') + '">\n        <img src="' + value.path + '" class="registration-item__img">\n        <div class="registration-item__text">\n          <label class="registration-item__text-label">\n            <input class="registration-item__text-input ' + (value.come === false ? '' : 'hidden') + '" type="radio" name="card" value="' + value._id + '">\n            <div class="registration-item__text-name">\n              ' + value.name + '\n            </div>\n          </label>\n        </div>\n        <div class="registration-item__status-wrapper">\n          <div class="registration-item__status">\n          ' + (value.come === false ? 'Не пришел' : 'Пришел') + '\n          </div>\n        </div>\n      </div>\n    </div>');
  });
};

exports.default = userCards;

});

require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map