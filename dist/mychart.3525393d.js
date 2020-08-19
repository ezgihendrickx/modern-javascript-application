// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"jsmodules/getResults.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getResults = getResults;

var _calcLonLat = require("./calcLonLat.js");

var _displayResults = require("./displayResults.js");

var api = {
  key: "254457a64f43903cef73c88f6d1f45fa",
  base: "https://api.openweathermap.org/data/2.5/"
};

function getResults(location) {
  // console.log(latitude);
  fetch("".concat(api.base, "onecall?lat=").concat(_calcLonLat.latitude, "&lon=").concat(_calcLonLat.longitude, "&exlude=hourly&units=metric&APPID=").concat(api.key) //getting the weather
  ).then(function (weather) {
    return weather.json(); //from json file
  }).then(_displayResults.displayResults);
}
},{"./calcLonLat.js":"jsmodules/calcLonLat.js","./displayResults.js":"jsmodules/displayResults.js"}],"jsmodules/calcLonLat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcLonLat = calcLonLat;
exports.longitude = exports.latitude = exports.locationName = void 0;

var _getResults = require("./getResults.js");

//import { searchbox } from "./setQuery.js";
var searchbox = document.querySelector(".search");
var locationName = searchbox.value;
exports.locationName = locationName;
var latitude;
exports.latitude = latitude;
var longitude;
exports.longitude = longitude;

function calcLonLat(items) {
  //check it out above link  line 2
  exports.latitude = latitude = items.items[0].position.lat;
  exports.longitude = longitude = items.items[0].position.lng;
  exports.locationName = locationName = items.items[0].title;
  (0, _getResults.getResults)(latitude, longitude);
}
},{"./getResults.js":"jsmodules/getResults.js"}],"jsmodules/dateBuilder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateBuilder = dateBuilder;

function dateBuilder(d) {
  var months = ["January", "February", "March", "April", "May", "june", "July", "August", "September", "November", "December"];
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var day = days[d.getDay()];
  var date = d.getDate();
  var month = months[d.getMonth()];
  var year = d.getFullYear();
  return "".concat(day, " ").concat(date, " ").concat(month, " ").concat(year);
}
},{}],"jsmodules/applyIcon.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyIcon = applyIcon;

function applyIcon(icon) {
  //choose the correct icon
  var selectedIcon;

  switch (icon) {
    case "01d":
      selectedIcon = "wi-day-sunny";
      break;

    case "01n":
      selectedIcon = "wi-night-clear";
      break;

    case "02d":
    case "02n":
      selectedIcon = "wi-cloudy";
      break;

    case "03d":
    case "03n":
    case "04d":
    case "04n":
      selectedIcon = "wi-night-cloudy";
      break;

    case "09d":
    case "09n":
      selectedIcon = "wi-showers";
      break;

    case "10d":
    case "10n":
      selectedIcon = "wi-rain";
      break;

    case "11d":
    case "11n":
      selectedIcon = "wi-thunderstorm";
      break;

    case "13d":
    case "13n":
      selectedIcon = "wi-snow";
      break;

    case "50d":
    case "50n":
      selectedIcon = "wi-fog";
      break;

    default:
      selectedIcon = "wi-meteor";
  }

  return selectedIcon;
}
},{}],"jsmodules/getLocation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocation = getLocation;

var _calcLonLat = require("./calcLonLat.js");

var hereAPIKey = "HY42AIbJoZSVlGRz0Dn-eea-HjU-Kj1GWDLq3pp1GH4"; // heremaps for the location

function getLocation(city) {
  document.getElementById("spinner").style.display = "block";
  fetch("https://geocode.search.hereapi.com/v1/geocode?q=".concat(city, "&apiKey=").concat(hereAPIKey) //getting the location of the city
  ).then(function (items) {
    document.getElementById("spinner").style.display = "none";
    return items.json();
  }).then(_calcLonLat.calcLonLat); // console.log(calcLonLat());
}
},{"./calcLonLat.js":"jsmodules/calcLonLat.js"}],"jsmodules/setQuery.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setQuery = setQuery;
exports.searchbox = exports.FORECAST = void 0;

var _getLocation = require("./getLocation.js");

var _mychart = require("../mychart.js");

var FORECAST = document.getElementsByClassName("component__forecast-box")[0]; // <div class="component__forecast-box"></div> getting this from HTML

exports.FORECAST = FORECAST;
var searchbox = document.querySelector(".search");
exports.searchbox = searchbox;

function setQuery(evt) {
  //if you press the enter
  if (evt.keyCode == 13) {
    FORECAST.innerHTML = ""; //empty the html forecast table

    (0, _getLocation.getLocation)(searchbox.value); // check line 7 for that

    (0, _mychart.myChart)(); // console.log(searchbox.value);
  }
}
},{"./getLocation.js":"jsmodules/getLocation.js","../mychart.js":"mychart.js"}],"jsmodules/displayResults.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayResults = displayResults;
exports.dayArray = exports.tempArray = void 0;

var _calcLonLat = require("./calcLonLat.js");

var _dateBuilder = require("./dateBuilder.js");

var _applyIcon = require("./applyIcon.js");

var _setQuery = require("./setQuery.js");

var tempArray = new Array();
exports.tempArray = tempArray;
var dayArray = new Array();
exports.dayArray = dayArray;

function displayResults(weather) {
  //shows everything in HTML
  //   console.log(weather);
  var city = document.querySelector(".location .city");
  city.innerText = _calcLonLat.locationName;
  var now = new Date(); // console.log(now);

  var date = document.querySelector(".location .date");
  date.innerText = (0, _dateBuilder.dateBuilder)(now); //show the date

  var temp = document.querySelector(".current .temp"); // console.log(temp);

  temp.innerHTML = "".concat(Math.round(weather.current.temp), "<span>\xB0c</span>"); //get the temp from json

  var weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.current.weather[0].main; //weather description

  var hilow = document.querySelector(".hi-low"); //feels like?

  hilow.innerText = "feels like " + Math.round(weather.current.feels_like) + "°c";
  weather.daily.forEach(function (day) {
    //change this later 5 days, this loop gives me 1 week weatherforecast
    // console.log(day);
    var date = new Date(day.dt * 1000); //to get actual date from it you need to calc

    var days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    var name = days[date.getDay()];
    var dayBlock = document.createElement("div");
    dayArray.push(name);
    tempArray.push(day.temp.day);
    console.log(tempArray);
    console.log(dayArray);
    dayBlock.className = "forecast__item"; //for icons temp actions

    dayBlock.innerHTML = "<div class=\"forecast-item__heading\">".concat(name, "</div>\n          <div class=\"forecast-item__info\"><i class=\"wi ").concat((0, _applyIcon.applyIcon)(day.weather[0].icon), "\"></i> <span class=\"degrees\">").concat(Math.round(day.temp.day), "<i class=\"wi wi-degrees\"></i></span></div>");

    _setQuery.FORECAST.appendChild(dayBlock); //puttin in the HTML

  });
}
},{"./calcLonLat.js":"jsmodules/calcLonLat.js","./dateBuilder.js":"jsmodules/dateBuilder.js","./applyIcon.js":"jsmodules/applyIcon.js","./setQuery.js":"jsmodules/setQuery.js"}],"mychart.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.myChart = myChart;

var _displayResults = require("./jsmodules/displayResults.js");

function myChart() {
  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "line",
    // The data for our dataset
    data: {
      labels: _displayResults.dayArray,
      datasets: [{
        label: "Ezgi's Chart",
        backgroundColor: "rgb(132, 99, 255)",
        borderColor: "rgb(132, 99, 255)",
        data: _displayResults.tempArray
      }]
    },
    // Configuration options go here
    options: {}
  });
}
},{"./jsmodules/displayResults.js":"jsmodules/displayResults.js"}],"../../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64025" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","mychart.js"], null)
//# sourceMappingURL=/mychart.3525393d.js.map