"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk7SBMTDYPjs = require('../chunk-7SBMTDYP.js');
require('../chunk-3LFH2WCF.js');


var _chunk5RW2GLTJjs = require('../chunk-5RW2GLTJ.js');
require('../chunk-X3NRJIZW.js');
require('../chunk-G5ORGOKH.js');

// src/presets/browser.ts
var browser_default = [
  new (0, _chunk5RW2GLTJjs.FetchInterceptor)(),
  new (0, _chunk7SBMTDYPjs.XMLHttpRequestInterceptor)()
];


exports.default = browser_default;
