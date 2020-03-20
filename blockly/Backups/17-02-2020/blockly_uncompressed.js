'use strict';

var $jscomp = $jscomp || {};
$jscomp.scope = {};
var COMPILED = !0,
    goog = goog || {};
goog.global = this || self;
goog.isDef = function(a) {
    return void 0 !== a
};
goog.isString = function(a) {
    return "string" == typeof a
};
goog.isBoolean = function(a) {
    return "boolean" == typeof a
};
goog.isNumber = function(a) {
    return "number" == typeof a
};
goog.exportPath_ = function(a, b, c) {
    a = a.split(".");
    c = c || goog.global;
    a[0] in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
    for (var d; a.length && (d = a.shift());) a.length || void 0 === b ? c = c[d] && c[d] !== Object.prototype[d] ? c[d] : c[d] = {} : c[d] = b
};
goog.define = function(a, b) {
    var c = b;
    if (!COMPILED) {
        var d = goog.global.CLOSURE_UNCOMPILED_DEFINES,
            e = goog.global.CLOSURE_DEFINES;
        d && void 0 === d.nodeType && Object.prototype.hasOwnProperty.call(d, a) ? c = d[a] : e && void 0 === e.nodeType && Object.prototype.hasOwnProperty.call(e, a) && (c = e[a])
    }
    return c
};
goog.FEATURESET_YEAR = 2012;
goog.DEBUG = !1;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.STRICT_MODE_COMPATIBLE = !1;
goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
goog.provide = function(a) {
    if (goog.isInModuleLoader_()) throw Error("goog.provide cannot be used within a module.");
    if (!COMPILED && goog.isProvided_(a)) throw Error('Namespace "' + a + '" already declared.');
    goog.constructNamespace_(a)
};
goog.constructNamespace_ = function(a, b) {
    if (!COMPILED) {
        delete goog.implicitNamespaces_[a];
        for (var c = a;
            (c = c.substring(0, c.lastIndexOf("."))) && !goog.getObjectByName(c);) goog.implicitNamespaces_[c] = !0
    }
    goog.exportPath_(a, b)
};
goog.getScriptNonce = function(a) {
    if (a && a != goog.global) return goog.getScriptNonce_(a.document);
    null === goog.cspNonce_ && (goog.cspNonce_ = goog.getScriptNonce_(goog.global.document));
    return goog.cspNonce_
};
goog.NONCE_PATTERN_ = /^[\w+/_-]+[=]{0,2}$/;
goog.cspNonce_ = null;
goog.getScriptNonce_ = function(a) {
    return (a = a.querySelector && a.querySelector("script[nonce]")) && (a = a.nonce || a.getAttribute("nonce")) && goog.NONCE_PATTERN_.test(a) ? a : ""
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function(a) {
    if ("string" !== typeof a || !a || -1 == a.search(goog.VALID_MODULE_RE_)) throw Error("Invalid module identifier");
    if (!goog.isInGoogModuleLoader_()) throw Error("Module " + a + " has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide.");
    if (goog.moduleLoaderState_.moduleName) throw Error("goog.module may only be called once per module.");
    goog.moduleLoaderState_.moduleName = a;
    if (!COMPILED) {
        if (goog.isProvided_(a)) throw Error('Namespace "' + a + '" already declared.');
        delete goog.implicitNamespaces_[a]
    }
};
goog.module.get = function(a) {
    return goog.module.getInternal_(a)
};
goog.module.getInternal_ = function(a) {
    if (!COMPILED) {
        if (a in goog.loadedModules_) return goog.loadedModules_[a].exports;
        if (!goog.implicitNamespaces_[a]) return a = goog.getObjectByName(a), null != a ? a : null
    }
    return null
};
goog.ModuleType = {
    ES6: "es6",
    GOOG: "goog"
};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function() {
    return goog.isInGoogModuleLoader_() || goog.isInEs6ModuleLoader_()
};
goog.isInGoogModuleLoader_ = function() {
    return !!goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.GOOG
};
goog.isInEs6ModuleLoader_ = function() {
    if (goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.ES6) return !0;
    var a = goog.global.$jscomp;
    return a ? "function" != typeof a.getCurrentModulePath ? !1 : !!a.getCurrentModulePath() : !1
};
goog.module.declareLegacyNamespace = function() {
    if (!COMPILED && !goog.isInGoogModuleLoader_()) throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
    if (!COMPILED && !goog.moduleLoaderState_.moduleName) throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
    goog.moduleLoaderState_.declareLegacyNamespace = !0
};
goog.declareModuleId = function(a) {
    if (!COMPILED) {
        if (!goog.isInEs6ModuleLoader_()) throw Error("goog.declareModuleId may only be called from within an ES6 module");
        if (goog.moduleLoaderState_ && goog.moduleLoaderState_.moduleName) throw Error("goog.declareModuleId may only be called once per module.");
        if (a in goog.loadedModules_) throw Error('Module with namespace "' + a + '" already exists.');
    }
    if (goog.moduleLoaderState_) goog.moduleLoaderState_.moduleName = a;
    else {
        var b = goog.global.$jscomp;
        if (!b || "function" != typeof b.getCurrentModulePath) throw Error('Module with namespace "' +
            a + '" has been loaded incorrectly.');
        b = b.require(b.getCurrentModulePath());
        goog.loadedModules_[a] = {
            exports: b,
            type: goog.ModuleType.ES6,
            moduleId: a
        }
    }
};
goog.setTestOnly = function(a) {
    if (goog.DISALLOW_TEST_ONLY_CODE) throw a = a || "", Error("Importing test-only code into non-debug environment" + (a ? ": " + a : "."));
};
goog.forwardDeclare = function(a) {};
COMPILED || (goog.isProvided_ = function(a) {
    return a in goog.loadedModules_ || !goog.implicitNamespaces_[a] && null != goog.getObjectByName(a)
}, goog.implicitNamespaces_ = {
    "goog.module": !0
});
goog.getObjectByName = function(a, b) {
    for (var c = a.split("."), d = b || goog.global, e = 0; e < c.length; e++)
        if (d = d[c[e]], null == d) return null;
    return d
};
goog.globalize = function(a, b) {
    var c = b || goog.global,
        d;
    for (d in a) c[d] = a[d]
};
goog.addDependency = function(a, b, c, d) {
    !COMPILED && goog.DEPENDENCIES_ENABLED && goog.debugLoader_.addDependency(a, b, c, d)
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.logToConsole_ = function(a) {
    goog.global.console && goog.global.console.error(a)
};
goog.require = function(a) {
    if (!COMPILED) {
        goog.ENABLE_DEBUG_LOADER && goog.debugLoader_.requested(a);
        if (goog.isProvided_(a)) {
            if (goog.isInModuleLoader_()) return goog.module.getInternal_(a)
        } else if (goog.ENABLE_DEBUG_LOADER) {
            var b = goog.moduleLoaderState_;
            goog.moduleLoaderState_ = null;
            try {
                goog.debugLoader_.load_(a)
            } finally {
                goog.moduleLoaderState_ = b
            }
        }
        return null
    }
};
goog.requireType = function(a) {
    return {}
};
goog.basePath = "";
goog.nullFunction = function() {};
goog.abstractMethod = function() {
    throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
    a.instance_ = void 0;
    a.getInstance = function() {
        if (a.instance_) return a.instance_;
        goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
        return a.instance_ = new a
    }
};
goog.instantiatedSingletons_ = [];
goog.LOAD_MODULE_USING_EVAL = !0;
goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
goog.TRANSPILE = "detect";
goog.ASSUME_ES_MODULES_TRANSPILED = !1;
goog.TRANSPILE_TO_LANGUAGE = "";
goog.TRANSPILER = "transpile.js";
goog.hasBadLetScoping = null;
goog.useSafari10Workaround = function() {
    if (null == goog.hasBadLetScoping) {
        try {
            var a = !eval('"use strict";let x = 1; function f() { return typeof x; };f() == "number";')
        } catch (b) {
            a = !1
        }
        goog.hasBadLetScoping = a
    }
    return goog.hasBadLetScoping
};
goog.workaroundSafari10EvalBug = function(a) {
    return "(function(){" + a + "\n;})();\n"
};
goog.loadModule = function(a) {
    var b = goog.moduleLoaderState_;
    try {
        goog.moduleLoaderState_ = {
            moduleName: "",
            declareLegacyNamespace: !1,
            type: goog.ModuleType.GOOG
        };
        if (goog.isFunction(a)) var c = a.call(void 0, {});
        else if ("string" === typeof a) goog.useSafari10Workaround() && (a = goog.workaroundSafari10EvalBug(a)), c = goog.loadModuleFromSource_.call(void 0, a);
        else throw Error("Invalid module definition");
        var d = goog.moduleLoaderState_.moduleName;
        if ("string" === typeof d && d) goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(d,
            c) : goog.SEAL_MODULE_EXPORTS && Object.seal && "object" == typeof c && null != c && Object.seal(c), goog.loadedModules_[d] = {
            exports: c,
            type: goog.ModuleType.GOOG,
            moduleId: goog.moduleLoaderState_.moduleName
        };
        else throw Error('Invalid module name "' + d + '"');
    } finally {
        goog.moduleLoaderState_ = b
    }
};
goog.loadModuleFromSource_ = function(a) {
    eval(a);
    return {}
};
goog.normalizePath_ = function(a) {
    a = a.split("/");
    for (var b = 0; b < a.length;) "." == a[b] ? a.splice(b, 1) : b && ".." == a[b] && a[b - 1] && ".." != a[b - 1] ? a.splice(--b, 2) : b++;
    return a.join("/")
};
goog.loadFileSync_ = function(a) {
    if (goog.global.CLOSURE_LOAD_FILE_SYNC) return goog.global.CLOSURE_LOAD_FILE_SYNC(a);
    try {
        var b = new goog.global.XMLHttpRequest;
        b.open("get", a, !1);
        b.send();
        return 0 == b.status || 200 == b.status ? b.responseText : null
    } catch (c) {
        return null
    }
};
goog.transpile_ = function(a, b, c) {
    var d = goog.global.$jscomp;
    d || (goog.global.$jscomp = d = {});
    var e = d.transpile;
    if (!e) {
        var f = goog.basePath + goog.TRANSPILER,
            g = goog.loadFileSync_(f);
        if (g) {
            (function() {
                (0, eval)(g + "\n//# sourceURL=" + f)
            }).call(goog.global);
            if (goog.global.$gwtExport && goog.global.$gwtExport.$jscomp && !goog.global.$gwtExport.$jscomp.transpile) throw Error('The transpiler did not properly export the "transpile" method. $gwtExport: ' + JSON.stringify(goog.global.$gwtExport));
            goog.global.$jscomp.transpile =
                goog.global.$gwtExport.$jscomp.transpile;
            d = goog.global.$jscomp;
            e = d.transpile
        }
    }
    e || (e = d.transpile = function(a, b) {
        goog.logToConsole_(b + " requires transpilation but no transpiler was found.");
        return a
    });
    return e(a, b, c)
};
goog.typeOf = function(a) {
    var b = typeof a;
    if ("object" == b)
        if (a) {
            if (a instanceof Array) return "array";
            if (a instanceof Object) return b;
            var c = Object.prototype.toString.call(a);
            if ("[object Window]" == c) return "object";
            if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
            if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
        } else return "null";
    else if ("function" == b && "undefined" == typeof a.call) return "object";
    return b
};
goog.isNull = function(a) {
    return null === a
};
goog.isDefAndNotNull = function(a) {
    return null != a
};
goog.isArray = function(a) {
    return "array" == goog.typeOf(a)
};
goog.isArrayLike = function(a) {
    var b = goog.typeOf(a);
    return "array" == b || "object" == b && "number" == typeof a.length
};
goog.isDateLike = function(a) {
    return goog.isObject(a) && "function" == typeof a.getFullYear
};
goog.isFunction = function(a) {
    return "function" == goog.typeOf(a)
};
goog.isObject = function(a) {
    var b = typeof a;
    return "object" == b && null != a || "function" == b
};
goog.getUid = function(a) {
    return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.hasUid = function(a) {
    return !!a[goog.UID_PROPERTY_]
};
goog.removeUid = function(a) {
    null !== a && "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
    try {
        delete a[goog.UID_PROPERTY_]
    } catch (b) {}
};
goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
    var b = goog.typeOf(a);
    if ("object" == b || "array" == b) {
        if ("function" === typeof a.clone) return a.clone();
        b = "array" == b ? [] : {};
        for (var c in a) b[c] = goog.cloneObject(a[c]);
        return b
    }
    return a
};
goog.bindNative_ = function(a, b, c) {
    return a.call.apply(a.bind, arguments)
};
goog.bindJs_ = function(a, b, c) {
    if (!a) throw Error();
    if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
            var c = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(c, d);
            return a.apply(b, c)
        }
    }
    return function() {
        return a.apply(b, arguments)
    }
};
goog.bind = function(a, b, c) {
    Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
    return goog.bind.apply(null, arguments)
};
goog.partial = function(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function() {
        var b = c.slice();
        b.push.apply(b, arguments);
        return a.apply(this, b)
    }
};
goog.mixin = function(a, b) {
    for (var c in b) a[c] = b[c]
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
    return +new Date
};
goog.globalEval = function(a) {
    if (goog.global.execScript) goog.global.execScript(a, "JavaScript");
    else if (goog.global.eval) {
        if (null == goog.evalWorksForGlobals_) {
            try {
                goog.global.eval("var _evalTest_ = 1;")
            } catch (d) {}
            if ("undefined" != typeof goog.global._evalTest_) {
                try {
                    delete goog.global._evalTest_
                } catch (d) {}
                goog.evalWorksForGlobals_ = !0
            } else goog.evalWorksForGlobals_ = !1
        }
        if (goog.evalWorksForGlobals_) goog.global.eval(a);
        else {
            var b = goog.global.document,
                c = b.createElement("script");
            c.type = "text/javascript";
            c.defer = !1;
            c.appendChild(b.createTextNode(a));
            b.head.appendChild(c);
            b.head.removeChild(c)
        }
    } else throw Error("goog.globalEval not available");
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(a, b) {
    if ("." == String(a).charAt(0)) throw Error('className passed in goog.getCssName must not start with ".". You passed: ' + a);
    var c = function(a) {
            return goog.cssNameMapping_[a] || a
        },
        d = function(a) {
            a = a.split("-");
            for (var b = [], d = 0; d < a.length; d++) b.push(c(a[d]));
            return b.join("-")
        };
    d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function(a) {
        return a
    };
    d = b ? a + "-" + d(b) : d(a);
    return goog.global.CLOSURE_CSS_NAME_MAP_FN ? goog.global.CLOSURE_CSS_NAME_MAP_FN(d) : d
};
goog.setCssNameMapping = function(a, b) {
    goog.cssNameMapping_ = a;
    goog.cssNameMappingStyle_ = b
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function(a, b, c) {
    c && c.html && (a = a.replace(/</g, "&lt;"));
    b && (a = a.replace(/\{\$([^}]+)}/g, function(a, c) {
        return null != b && c in b ? b[c] : a
    }));
    return a
};
goog.getMsgWithFallback = function(a, b) {
    return a
};
goog.exportSymbol = function(a, b, c) {
    goog.exportPath_(a, b, c)
};
goog.exportProperty = function(a, b, c) {
    a[b] = c
};
goog.inherits = function(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.superClass_ = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    a.base = function(a, c, f) {
        for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++) d[e - 2] = arguments[e];
        return b.prototype[c].apply(a, d)
    }
};
goog.base = function(a, b, c) {
    var d = arguments.callee.caller;
    if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !d) throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
    if ("undefined" !== typeof d.superClass_) {
        for (var e = Array(arguments.length - 1), f = 1; f < arguments.length; f++) e[f - 1] = arguments[f];
        return d.superClass_.constructor.apply(a, e)
    }
    if ("string" != typeof b && "symbol" != typeof b) throw Error("method names provided to goog.base must be a string or a symbol");
    e = Array(arguments.length - 2);
    for (f = 2; f < arguments.length; f++) e[f - 2] = arguments[f];
    f = !1;
    for (var g = a.constructor.prototype; g; g = Object.getPrototypeOf(g))
        if (g[b] === d) f = !0;
        else if (f) return g[b].apply(a, e);
    if (a[b] === d) return a.constructor.prototype[b].apply(a, e);
    throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(a) {
    if (goog.isInModuleLoader_()) throw Error("goog.scope is not supported within a module.");
    a.call(goog.global)
};
COMPILED || (goog.global.COMPILED = COMPILED);
goog.defineClass = function(a, b) {
    var c = b.constructor,
        d = b.statics;
    c && c != Object.prototype.constructor || (c = function() {
        throw Error("cannot instantiate an interface (no constructor defined).");
    });
    c = goog.defineClass.createSealingConstructor_(c, a);
    a && goog.inherits(c, a);
    delete b.constructor;
    delete b.statics;
    goog.defineClass.applyProperties_(c.prototype, b);
    null != d && (d instanceof Function ? d(c) : goog.defineClass.applyProperties_(c, d));
    return c
};
goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
goog.defineClass.createSealingConstructor_ = function(a, b) {
    if (!goog.defineClass.SEAL_CLASS_INSTANCES) return a;
    var c = !goog.defineClass.isUnsealable_(b),
        d = function() {
            var b = a.apply(this, arguments) || this;
            b[goog.UID_PROPERTY_] = b[goog.UID_PROPERTY_];
            this.constructor === d && c && Object.seal instanceof Function && Object.seal(b);
            return b
        };
    return d
};
goog.defineClass.isUnsealable_ = function(a) {
    return a && a.prototype && a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_ = function(a, b) {
    for (var c in b) Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
    for (var d = 0; d < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; d++) c = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d], Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c])
};
goog.tagUnsealableClass = function(a) {
    !COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES && (a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = !0)
};
goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
!COMPILED && goog.DEPENDENCIES_ENABLED && (goog.inHtmlDocument_ = function() {
        var a = goog.global.document;
        return null != a && "write" in a
    }, goog.isDocumentLoading_ = function() {
        var a = goog.global.document;
        return a.attachEvent ? "complete" != a.readyState : "loading" == a.readyState
    }, goog.findBasePath_ = function() {
        if (void 0 != goog.global.CLOSURE_BASE_PATH && "string" === typeof goog.global.CLOSURE_BASE_PATH) goog.basePath = goog.global.CLOSURE_BASE_PATH;
        else if (goog.inHtmlDocument_()) {
            var a = goog.global.document,
                b = a.currentScript;
            a = b ? [b] : a.getElementsByTagName("SCRIPT");
            for (b = a.length - 1; 0 <= b; --b) {
                var c = a[b].src,
                    d = c.lastIndexOf("?");
                d = -1 == d ? c.length : d;
                if ("base.js" == c.substr(d - 7, 7)) {
                    goog.basePath = c.substr(0, d - 7);
                    break
                }
            }
        }
    }, goog.findBasePath_(), goog.Transpiler = function() {
        this.requiresTranspilation_ = null;
        this.transpilationTarget_ = goog.TRANSPILE_TO_LANGUAGE
    }, goog.Transpiler.prototype.createRequiresTranspilation_ = function() {
        function a(a, b) {
            e ? d[a] = !0 : b() ? (c = a, d[a] = !1) : e = d[a] = !0
        }

        function b(a) {
            try {
                return !!eval(a)
            } catch (h) {
                return !1
            }
        }
        var c = "es3",
            d = {
                es3: !1
            },
            e = !1,
            f = goog.global.navigator && goog.global.navigator.userAgent ? goog.global.navigator.userAgent : "";
        a("es5", function() {
            return b("[1,].length==1")
        });
        a("es6", function() {
            return f.match(/Edge\/(\d+)(\.\d)*/i) ? !1 : b('(()=>{"use strict";class X{constructor(){if(new.target!=String)throw 1;this.x=42}}let q=Reflect.construct(X,[],String);if(q.x!=42||!(q instanceof String))throw 1;for(const a of[2,3]){if(a==2)continue;function f(z={a}){let a=0;return z.a}{function f(){return 0;}}return f()==3}})()')
        });
        a("es7", function() {
            return b("2 ** 2 == 4")
        });
        a("es8", function() {
            return b("async () => 1, true")
        });
        a("es9", function() {
            return b("({...rest} = {}), true")
        });
        a("es_next", function() {
            return !1
        });
        return {
            target: c,
            map: d
        }
    }, goog.Transpiler.prototype.needsTranspile = function(a, b) {
        if ("always" == goog.TRANSPILE) return !0;
        if ("never" == goog.TRANSPILE) return !1;
        if (!this.requiresTranspilation_) {
            var c = this.createRequiresTranspilation_();
            this.requiresTranspilation_ = c.map;
            this.transpilationTarget_ = this.transpilationTarget_ ||
                c.target
        }
        if (a in this.requiresTranspilation_) return this.requiresTranspilation_[a] ? !0 : !goog.inHtmlDocument_() || "es6" != b || "noModule" in goog.global.document.createElement("script") ? !1 : !0;
        throw Error("Unknown language mode: " + a);
    }, goog.Transpiler.prototype.transpile = function(a, b) {
        return goog.transpile_(a, b, this.transpilationTarget_)
    }, goog.transpiler_ = new goog.Transpiler, goog.protectScriptTag_ = function(a) {
        return a.replace(/<\/(SCRIPT)/ig, "\\x3c/$1")
    }, goog.DebugLoader_ = function() {
        this.dependencies_ = {};
        this.idToPath_ = {};
        this.written_ = {};
        this.loadingDeps_ = [];
        this.depsToLoad_ = [];
        this.paused_ = !1;
        this.factory_ = new goog.DependencyFactory(goog.transpiler_);
        this.deferredCallbacks_ = {};
        this.deferredQueue_ = []
    }, goog.DebugLoader_.prototype.bootstrap = function(a, b) {
        function c() {
            d && (goog.global.setTimeout(d, 0), d = null)
        }
        var d = b;
        if (a.length) {
            for (var e = [], f = 0; f < a.length; f++) {
                var g = this.getPathFromDeps_(a[f]);
                if (!g) throw Error("Unregonized namespace: " + a[f]);
                e.push(this.dependencies_[g])
            }
            g = goog.require;
            var h = 0;
            for (f =
                0; f < a.length; f++) g(a[f]), e[f].onLoad(function() {
                ++h == a.length && c()
            })
        } else c()
    }, goog.DebugLoader_.prototype.loadClosureDeps = function() {
        this.depsToLoad_.push(this.factory_.createDependency(goog.normalizePath_(goog.basePath + "deps.js"), "deps.js", [], [], {}, !1));
        this.loadDeps_()
    }, goog.DebugLoader_.prototype.requested = function(a, b) {
        var c = this.getPathFromDeps_(a);
        if (c && (b || this.areDepsLoaded_(this.dependencies_[c].requires))) {
            var d = this.deferredCallbacks_[c];
            d && (delete this.deferredCallbacks_[c], d())
        }
    }, goog.DebugLoader_.prototype.setDependencyFactory =
    function(a) {
        this.factory_ = a
    }, goog.DebugLoader_.prototype.load_ = function(a) {
        if (this.getPathFromDeps_(a)) {
            var b = this,
                c = [],
                d = function(a) {
                    var e = b.getPathFromDeps_(a);
                    if (!e) throw Error("Bad dependency path or symbol: " + a);
                    if (!b.written_[e]) {
                        b.written_[e] = !0;
                        a = b.dependencies_[e];
                        for (e = 0; e < a.requires.length; e++) goog.isProvided_(a.requires[e]) || d(a.requires[e]);
                        c.push(a)
                    }
                };
            d(a);
            a = !!this.depsToLoad_.length;
            this.depsToLoad_ = this.depsToLoad_.concat(c);
            this.paused_ || a || this.loadDeps_()
        } else throw a = "goog.require could not find: " +
            a, goog.logToConsole_(a), Error(a);
    }, goog.DebugLoader_.prototype.loadDeps_ = function() {
        for (var a = this, b = this.paused_; this.depsToLoad_.length && !b;)(function() {
            var c = !1,
                d = a.depsToLoad_.shift(),
                e = !1;
            a.loading_(d);
            var f = {
                pause: function() {
                    if (c) throw Error("Cannot call pause after the call to load.");
                    b = !0
                },
                resume: function() {
                    c ? a.resume_() : b = !1
                },
                loaded: function() {
                    if (e) throw Error("Double call to loaded.");
                    e = !0;
                    a.loaded_(d)
                },
                pending: function() {
                    for (var b = [], c = 0; c < a.loadingDeps_.length; c++) b.push(a.loadingDeps_[c]);
                    return b
                },
                setModuleState: function(a) {
                    goog.moduleLoaderState_ = {
                        type: a,
                        moduleName: "",
                        declareLegacyNamespace: !1
                    }
                },
                registerEs6ModuleExports: function(a, b, c) {
                    c && (goog.loadedModules_[c] = {
                        exports: b,
                        type: goog.ModuleType.ES6,
                        moduleId: c || ""
                    })
                },
                registerGoogModuleExports: function(a, b) {
                    goog.loadedModules_[a] = {
                        exports: b,
                        type: goog.ModuleType.GOOG,
                        moduleId: a
                    }
                },
                clearModuleState: function() {
                    goog.moduleLoaderState_ = null
                },
                defer: function(b) {
                    if (c) throw Error("Cannot register with defer after the call to load.");
                    a.defer_(d,
                        b)
                },
                areDepsLoaded: function() {
                    return a.areDepsLoaded_(d.requires)
                }
            };
            try {
                d.load(f)
            } finally {
                c = !0
            }
        })();
        b && this.pause_()
    }, goog.DebugLoader_.prototype.pause_ = function() {
        this.paused_ = !0
    }, goog.DebugLoader_.prototype.resume_ = function() {
        this.paused_ && (this.paused_ = !1, this.loadDeps_())
    }, goog.DebugLoader_.prototype.loading_ = function(a) {
        this.loadingDeps_.push(a)
    }, goog.DebugLoader_.prototype.loaded_ = function(a) {
        for (var b = 0; b < this.loadingDeps_.length; b++)
            if (this.loadingDeps_[b] == a) {
                this.loadingDeps_.splice(b, 1);
                break
            }
        for (b = 0; b < this.deferredQueue_.length; b++)
            if (this.deferredQueue_[b] == a.path) {
                this.deferredQueue_.splice(b, 1);
                break
            }
        if (this.loadingDeps_.length == this.deferredQueue_.length && !this.depsToLoad_.length)
            for (; this.deferredQueue_.length;) this.requested(this.deferredQueue_.shift(), !0);
        a.loaded()
    }, goog.DebugLoader_.prototype.areDepsLoaded_ = function(a) {
        for (var b = 0; b < a.length; b++) {
            var c = this.getPathFromDeps_(a[b]);
            if (!c || !(c in this.deferredCallbacks_ || goog.isProvided_(a[b]))) return !1
        }
        return !0
    }, goog.DebugLoader_.prototype.getPathFromDeps_ =
    function(a) {
        return a in this.idToPath_ ? this.idToPath_[a] : a in this.dependencies_ ? a : null
    }, goog.DebugLoader_.prototype.defer_ = function(a, b) {
        this.deferredCallbacks_[a.path] = b;
        this.deferredQueue_.push(a.path)
    }, goog.LoadController = function() {}, goog.LoadController.prototype.pause = function() {}, goog.LoadController.prototype.resume = function() {}, goog.LoadController.prototype.loaded = function() {}, goog.LoadController.prototype.pending = function() {}, goog.LoadController.prototype.registerEs6ModuleExports = function(a,
        b, c) {}, goog.LoadController.prototype.setModuleState = function(a) {}, goog.LoadController.prototype.clearModuleState = function() {}, goog.LoadController.prototype.defer = function(a) {}, goog.LoadController.prototype.areDepsLoaded = function() {}, goog.Dependency = function(a, b, c, d, e) {
        this.path = a;
        this.relativePath = b;
        this.provides = c;
        this.requires = d;
        this.loadFlags = e;
        this.loaded_ = !1;
        this.loadCallbacks_ = []
    }, goog.Dependency.prototype.getPathName = function() {
        var a = this.path,
            b = a.indexOf("://");
        0 <= b && (a = a.substring(b + 3), b =
            a.indexOf("/"), 0 <= b && (a = a.substring(b + 1)));
        return a
    }, goog.Dependency.prototype.onLoad = function(a) {
        this.loaded_ ? a() : this.loadCallbacks_.push(a)
    }, goog.Dependency.prototype.loaded = function() {
        this.loaded_ = !0;
        var a = this.loadCallbacks_;
        this.loadCallbacks_ = [];
        for (var b = 0; b < a.length; b++) a[b]()
    }, goog.Dependency.defer_ = !1, goog.Dependency.callbackMap_ = {}, goog.Dependency.registerCallback_ = function(a) {
        var b = Math.random().toString(32);
        goog.Dependency.callbackMap_[b] = a;
        return b
    }, goog.Dependency.unregisterCallback_ =
    function(a) {
        delete goog.Dependency.callbackMap_[a]
    }, goog.Dependency.callback_ = function(a, b) {
        if (a in goog.Dependency.callbackMap_) {
            for (var c = goog.Dependency.callbackMap_[a], d = [], e = 1; e < arguments.length; e++) d.push(arguments[e]);
            c.apply(void 0, d)
        } else throw Error("Callback key " + a + " does not exist (was base.js loaded more than once?).");
    }, goog.Dependency.prototype.load = function(a) {
        if (goog.global.CLOSURE_IMPORT_SCRIPT) goog.global.CLOSURE_IMPORT_SCRIPT(this.path) ? a.loaded() : a.pause();
        else if (goog.inHtmlDocument_()) {
            var b =
                goog.global.document;
            if ("complete" == b.readyState && !goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING) {
                if (/\bdeps.js$/.test(this.path)) {
                    a.loaded();
                    return
                }
                throw Error('Cannot write "' + this.path + '" after document load');
            }
            if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && goog.isDocumentLoading_()) {
                var c = goog.Dependency.registerCallback_(function(b) {
                        goog.DebugLoader_.IS_OLD_IE_ && "complete" != b.readyState || (goog.Dependency.unregisterCallback_(c), a.loaded())
                    }),
                    d = !goog.DebugLoader_.IS_OLD_IE_ && goog.getScriptNonce() ?
                    ' nonce="' + goog.getScriptNonce() + '"' : "";
                d = '<script src="' + this.path + '" ' + (goog.DebugLoader_.IS_OLD_IE_ ? "onreadystatechange" : "onload") + "=\"goog.Dependency.callback_('" + c + '\', this)" type="text/javascript" ' + (goog.Dependency.defer_ ? "defer" : "") + d + ">\x3c/script>";
                b.write(goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createHTML(d) : d)
            } else {
                var e = b.createElement("script");
                e.defer = goog.Dependency.defer_;
                e.async = !1;
                e.type = "text/javascript";
                (d = goog.getScriptNonce()) && e.setAttribute("nonce", d);
                goog.DebugLoader_.IS_OLD_IE_ ?
                    (a.pause(), e.onreadystatechange = function() {
                        if ("loaded" == e.readyState || "complete" == e.readyState) a.loaded(), a.resume()
                    }) : e.onload = function() {
                        e.onload = null;
                        a.loaded()
                    };
                e.src = goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createScriptURL(this.path) : this.path;
                b.head.appendChild(e)
            }
        } else goog.logToConsole_("Cannot use default debug loader outside of HTML documents."), "deps.js" == this.relativePath ? (goog.logToConsole_("Consider setting CLOSURE_IMPORT_SCRIPT before loading base.js, or setting CLOSURE_NO_DEPS to true."),
            a.loaded()) : a.pause()
    }, goog.Es6ModuleDependency = function(a, b, c, d, e) {
        goog.Dependency.call(this, a, b, c, d, e)
    }, goog.inherits(goog.Es6ModuleDependency, goog.Dependency), goog.Es6ModuleDependency.prototype.load = function(a) {
        function b(a, b) {
            var c = b ? '<script type="module" crossorigin>' + b + "\x3c/script>" : '<script type="module" crossorigin src="' + a + '">\x3c/script>';
            d.write(goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createHTML(c) : c)
        }

        function c(a, b) {
            var c = d.createElement("script");
            c.defer = !0;
            c.async = !1;
            c.type = "module";
            c.setAttribute("crossorigin", !0);
            var e = goog.getScriptNonce();
            e && c.setAttribute("nonce", e);
            b ? c.textContent = goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createScript(b) : b : c.src = goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createScriptURL(a) : a;
            d.head.appendChild(c)
        }
        if (goog.global.CLOSURE_IMPORT_SCRIPT) goog.global.CLOSURE_IMPORT_SCRIPT(this.path) ? a.loaded() : a.pause();
        else if (goog.inHtmlDocument_()) {
            var d = goog.global.document,
                e = this;
            if (goog.isDocumentLoading_()) {
                var f =
                    b;
                goog.Dependency.defer_ = !0
            } else f = c;
            var g = goog.Dependency.registerCallback_(function() {
                goog.Dependency.unregisterCallback_(g);
                a.setModuleState(goog.ModuleType.ES6)
            });
            f(void 0, 'goog.Dependency.callback_("' + g + '")');
            f(this.path, void 0);
            var h = goog.Dependency.registerCallback_(function(b) {
                goog.Dependency.unregisterCallback_(h);
                a.registerEs6ModuleExports(e.path, b, goog.moduleLoaderState_.moduleName)
            });
            f(void 0, 'import * as m from "' + this.path + '"; goog.Dependency.callback_("' + h + '", m)');
            var k = goog.Dependency.registerCallback_(function() {
                goog.Dependency.unregisterCallback_(k);
                a.clearModuleState();
                a.loaded()
            });
            f(void 0, 'goog.Dependency.callback_("' + k + '")')
        } else goog.logToConsole_("Cannot use default debug loader outside of HTML documents."), a.pause()
    }, goog.TransformedDependency = function(a, b, c, d, e) {
        goog.Dependency.call(this, a, b, c, d, e);
        this.contents_ = null;
        this.lazyFetch_ = !goog.inHtmlDocument_() || !("noModule" in goog.global.document.createElement("script"))
    }, goog.inherits(goog.TransformedDependency, goog.Dependency), goog.TransformedDependency.prototype.load = function(a) {
        function b() {
            e.contents_ =
                goog.loadFileSync_(e.path);
            e.contents_ && (e.contents_ = e.transform(e.contents_), e.contents_ && (e.contents_ += "\n//# sourceURL=" + e.path))
        }

        function c() {
            e.lazyFetch_ && b();
            if (e.contents_) {
                f && a.setModuleState(goog.ModuleType.ES6);
                try {
                    var c = e.contents_;
                    e.contents_ = null;
                    goog.globalEval(c);
                    if (f) var d = goog.moduleLoaderState_.moduleName
                } finally {
                    f && a.clearModuleState()
                }
                f && goog.global.$jscomp.require.ensure([e.getPathName()], function() {
                    a.registerEs6ModuleExports(e.path, goog.global.$jscomp.require(e.getPathName()),
                        d)
                });
                a.loaded()
            }
        }

        function d() {
            var a = goog.global.document,
                b = goog.Dependency.registerCallback_(function() {
                    goog.Dependency.unregisterCallback_(b);
                    c()
                }),
                d = '<script type="text/javascript">' + goog.protectScriptTag_('goog.Dependency.callback_("' + b + '");') + "\x3c/script>";
            a.write(goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createHTML(d) : d)
        }
        var e = this;
        if (goog.global.CLOSURE_IMPORT_SCRIPT) b(), this.contents_ && goog.global.CLOSURE_IMPORT_SCRIPT("", this.contents_) ? (this.contents_ = null, a.loaded()) : a.pause();
        else {
            var f = this.loadFlags.module == goog.ModuleType.ES6;
            this.lazyFetch_ || b();
            var g = 1 < a.pending().length,
                h = g && goog.DebugLoader_.IS_OLD_IE_;
            g = goog.Dependency.defer_ && (g || goog.isDocumentLoading_());
            if (h || g) a.defer(function() {
                c()
            });
            else {
                var k = goog.global.document;
                h = goog.inHtmlDocument_() && "ActiveXObject" in goog.global;
                if (f && goog.inHtmlDocument_() && goog.isDocumentLoading_() && !h) {
                    goog.Dependency.defer_ = !0;
                    a.pause();
                    var l = k.onreadystatechange;
                    k.onreadystatechange = function() {
                        "interactive" == k.readyState && (k.onreadystatechange =
                            l, c(), a.resume());
                        goog.isFunction(l) && l.apply(void 0, arguments)
                    }
                } else !goog.DebugLoader_.IS_OLD_IE_ && goog.inHtmlDocument_() && goog.isDocumentLoading_() ? d() : c()
            }
        }
    }, goog.TransformedDependency.prototype.transform = function(a) {}, goog.TranspiledDependency = function(a, b, c, d, e, f) {
        goog.TransformedDependency.call(this, a, b, c, d, e);
        this.transpiler = f
    }, goog.inherits(goog.TranspiledDependency, goog.TransformedDependency), goog.TranspiledDependency.prototype.transform = function(a) {
        return this.transpiler.transpile(a, this.getPathName())
    },
    goog.PreTranspiledEs6ModuleDependency = function(a, b, c, d, e) {
        goog.TransformedDependency.call(this, a, b, c, d, e)
    }, goog.inherits(goog.PreTranspiledEs6ModuleDependency, goog.TransformedDependency), goog.PreTranspiledEs6ModuleDependency.prototype.transform = function(a) {
        return a
    }, goog.GoogModuleDependency = function(a, b, c, d, e, f, g) {
        goog.TransformedDependency.call(this, a, b, c, d, e);
        this.needsTranspile_ = f;
        this.transpiler_ = g
    }, goog.inherits(goog.GoogModuleDependency, goog.TransformedDependency), goog.GoogModuleDependency.prototype.transform =
    function(a) {
        this.needsTranspile_ && (a = this.transpiler_.transpile(a, this.getPathName()));
        return goog.LOAD_MODULE_USING_EVAL && void 0 !== goog.global.JSON ? "goog.loadModule(" + goog.global.JSON.stringify(a + "\n//# sourceURL=" + this.path + "\n") + ");" : 'goog.loadModule(function(exports) {"use strict";' + a + "\n;return exports});\n//# sourceURL=" + this.path + "\n"
    }, goog.DebugLoader_.IS_OLD_IE_ = !(goog.global.atob || !goog.global.document || !goog.global.document.all), goog.DebugLoader_.prototype.addDependency = function(a, b, c,
        d) {
        b = b || [];
        a = a.replace(/\\/g, "/");
        var e = goog.normalizePath_(goog.basePath + a);
        d && "boolean" !== typeof d || (d = d ? {
            module: goog.ModuleType.GOOG
        } : {});
        c = this.factory_.createDependency(e, a, b, c, d, goog.transpiler_.needsTranspile(d.lang || "es3", d.module));
        this.dependencies_[e] = c;
        for (c = 0; c < b.length; c++) this.idToPath_[b[c]] = e;
        this.idToPath_[a] = e
    }, goog.DependencyFactory = function(a) {
        this.transpiler = a
    }, goog.DependencyFactory.prototype.createDependency = function(a, b, c, d, e, f) {
        return e.module == goog.ModuleType.GOOG ? new goog.GoogModuleDependency(a,
            b, c, d, e, f, this.transpiler) : f ? new goog.TranspiledDependency(a, b, c, d, e, this.transpiler) : e.module == goog.ModuleType.ES6 ? "never" == goog.TRANSPILE && goog.ASSUME_ES_MODULES_TRANSPILED ? new goog.PreTranspiledEs6ModuleDependency(a, b, c, d, e) : new goog.Es6ModuleDependency(a, b, c, d, e) : new goog.Dependency(a, b, c, d, e)
    }, goog.debugLoader_ = new goog.DebugLoader_, goog.loadClosureDeps = function() {
        goog.debugLoader_.loadClosureDeps()
    }, goog.setDependencyFactory = function(a) {
        goog.debugLoader_.setDependencyFactory(a)
    }, goog.global.CLOSURE_NO_DEPS ||
    goog.debugLoader_.loadClosureDeps(), goog.bootstrap = function(a, b) {
        goog.debugLoader_.bootstrap(a, b)
    });
goog.TRUSTED_TYPES_POLICY_NAME = "";
goog.identity_ = function(a) {
    return a
};
goog.createTrustedTypesPolicy = function(a) {
    var b = null,
        c = goog.global.trustedTypes || goog.global.TrustedTypes;
    if (!c || !c.createPolicy) return b;
    try {
        b = c.createPolicy(a, {
            createHTML: goog.identity_,
            createScript: goog.identity_,
            createScriptURL: goog.identity_,
            createURL: goog.identity_
        })
    } catch (d) {
        goog.logToConsole_(d.message)
    }
    return b
};
goog.TRUSTED_TYPES_POLICY_ = goog.TRUSTED_TYPES_POLICY_NAME ? goog.createTrustedTypesPolicy(goog.TRUSTED_TYPES_POLICY_NAME + "#base") : null;
goog.debug = {};
goog.debug.Error = function(a) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, goog.debug.Error);
    else {
        var b = Error().stack;
        b && (this.stack = b)
    }
    a && (this.message = String(a));
    this.reportErrorToServer = !0
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.dom = {};
goog.dom.NodeType = {
    ELEMENT: 1,
    ATTRIBUTE: 2,
    TEXT: 3,
    CDATA_SECTION: 4,
    ENTITY_REFERENCE: 5,
    ENTITY: 6,
    PROCESSING_INSTRUCTION: 7,
    COMMENT: 8,
    DOCUMENT: 9,
    DOCUMENT_TYPE: 10,
    DOCUMENT_FRAGMENT: 11,
    NOTATION: 12
};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(a, b) {
    goog.debug.Error.call(this, goog.asserts.subs_(a, b));
    this.messagePattern = a
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.DEFAULT_ERROR_HANDLER = function(a) {
    throw a;
};
goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.subs_ = function(a, b) {
    for (var c = a.split("%s"), d = "", e = c.length - 1, f = 0; f < e; f++) d += c[f] + (f < b.length ? b[f] : "%s");
    return d + c[e]
};
goog.asserts.doAssertFailure_ = function(a, b, c, d) {
    var e = "Assertion failed";
    if (c) {
        e += ": " + c;
        var f = d
    } else a && (e += ": " + a, f = b);
    a = new goog.asserts.AssertionError("" + e, f || []);
    goog.asserts.errorHandler_(a)
};
goog.asserts.setErrorHandler = function(a) {
    goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = a)
};
goog.asserts.assert = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertExists = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && null == a && goog.asserts.doAssertFailure_("Expected to exist: %s.", [a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.fail = function(a, b) {
    goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)))
};
goog.asserts.assertNumber = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && "number" !== typeof a && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertString = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && "string" !== typeof a && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertFunction = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertObject = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertArray = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertBoolean = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && "boolean" !== typeof a && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertElement = function(a, b, c) {
    !goog.asserts.ENABLE_ASSERTS || goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertInstanceof = function(a, b, c, d) {
    !goog.asserts.ENABLE_ASSERTS || a instanceof b || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(b), goog.asserts.getType_(a)], c, Array.prototype.slice.call(arguments, 3));
    return a
};
goog.asserts.assertFinite = function(a, b, c) {
    !goog.asserts.ENABLE_ASSERTS || "number" == typeof a && isFinite(a) || goog.asserts.doAssertFailure_("Expected %s to be a finite number but it is not.", [a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertObjectPrototypeIsIntact = function() {
    for (var a in Object.prototype) goog.asserts.fail(a + " should not be enumerable in Object.prototype.")
};
goog.asserts.getType_ = function(a) {
    return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
goog.array.ASSUME_NATIVE_FUNCTIONS = 2012 < goog.FEATURESET_YEAR;
goog.array.peek = function(a) {
    return a[a.length - 1]
};
goog.array.last = goog.array.peek;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.indexOf.call(a, b, c)
} : function(a, b, c) {
    c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
    if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, c);
    for (; c < a.length; c++)
        if (c in a && a[c] === b) return c;
    return -1
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.lastIndexOf.call(a, b, null == c ? a.length - 1 : c)
} : function(a, b, c) {
    c = null == c ? a.length - 1 : c;
    0 > c && (c = Math.max(0, a.length + c));
    if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.lastIndexOf(b, c);
    for (; 0 <= c; c--)
        if (c in a && a[c] === b) return c;
    return -1
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    Array.prototype.forEach.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
};
goog.array.forEachRight = function(a, b, c) {
    var d = a.length,
        e = "string" === typeof a ? a.split("") : a;
    for (--d; 0 <= d; --d) d in e && b.call(c, e[d], d, a)
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.filter.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = [], f = 0, g = "string" === typeof a ? a.split("") : a, h = 0; h < d; h++)
        if (h in g) {
            var k = g[h];
            b.call(c, k, h, a) && (e[f++] = k)
        }
    return e
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.map.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = Array(d), f = "string" === typeof a ? a.split("") : a, g = 0; g < d; g++) g in f && (e[g] = b.call(c, f[g], g, a));
    return e
};
goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function(a, b, c, d) {
    goog.asserts.assert(null != a.length);
    d && (b = goog.bind(b, d));
    return Array.prototype.reduce.call(a, b, c)
} : function(a, b, c, d) {
    var e = c;
    goog.array.forEach(a, function(c, g) {
        e = b.call(d, e, c, g, a)
    });
    return e
};
goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function(a, b, c, d) {
    goog.asserts.assert(null != a.length);
    goog.asserts.assert(null != b);
    d && (b = goog.bind(b, d));
    return Array.prototype.reduceRight.call(a, b, c)
} : function(a, b, c, d) {
    var e = c;
    goog.array.forEachRight(a, function(c, g) {
        e = b.call(d, e, c, g, a)
    });
    return e
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.some.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && b.call(c, e[f], f, a)) return !0;
    return !1
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.every.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && !b.call(c, e[f], f, a)) return !1;
    return !0
};
goog.array.count = function(a, b, c) {
    var d = 0;
    goog.array.forEach(a, function(a, f, g) {
        b.call(c, a, f, g) && ++d
    }, c);
    return d
};
goog.array.find = function(a, b, c) {
    b = goog.array.findIndex(a, b, c);
    return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b]
};
goog.array.findIndex = function(a, b, c) {
    for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && b.call(c, e[f], f, a)) return f;
    return -1
};
goog.array.findRight = function(a, b, c) {
    b = goog.array.findIndexRight(a, b, c);
    return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b]
};
goog.array.findIndexRight = function(a, b, c) {
    var d = a.length,
        e = "string" === typeof a ? a.split("") : a;
    for (--d; 0 <= d; d--)
        if (d in e && b.call(c, e[d], d, a)) return d;
    return -1
};
goog.array.contains = function(a, b) {
    return 0 <= goog.array.indexOf(a, b)
};
goog.array.isEmpty = function(a) {
    return 0 == a.length
};
goog.array.clear = function(a) {
    if (!goog.isArray(a))
        for (var b = a.length - 1; 0 <= b; b--) delete a[b];
    a.length = 0
};
goog.array.insert = function(a, b) {
    goog.array.contains(a, b) || a.push(b)
};
goog.array.insertAt = function(a, b, c) {
    goog.array.splice(a, c, 0, b)
};
goog.array.insertArrayAt = function(a, b, c) {
    goog.partial(goog.array.splice, a, c, 0).apply(null, b)
};
goog.array.insertBefore = function(a, b, c) {
    var d;
    2 == arguments.length || 0 > (d = goog.array.indexOf(a, c)) ? a.push(b) : goog.array.insertAt(a, b, d)
};
goog.array.remove = function(a, b) {
    var c = goog.array.indexOf(a, b),
        d;
    (d = 0 <= c) && goog.array.removeAt(a, c);
    return d
};
goog.array.removeLast = function(a, b) {
    var c = goog.array.lastIndexOf(a, b);
    return 0 <= c ? (goog.array.removeAt(a, c), !0) : !1
};
goog.array.removeAt = function(a, b) {
    goog.asserts.assert(null != a.length);
    return 1 == Array.prototype.splice.call(a, b, 1).length
};
goog.array.removeIf = function(a, b, c) {
    b = goog.array.findIndex(a, b, c);
    return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1
};
goog.array.removeAllIf = function(a, b, c) {
    var d = 0;
    goog.array.forEachRight(a, function(e, f) {
        b.call(c, e, f, a) && goog.array.removeAt(a, f) && d++
    });
    return d
};
goog.array.concat = function(a) {
    return Array.prototype.concat.apply([], arguments)
};
goog.array.join = function(a) {
    return Array.prototype.concat.apply([], arguments)
};
goog.array.toArray = function(a) {
    var b = a.length;
    if (0 < b) {
        for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
        return c
    }
    return []
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function(a, b) {
    for (var c = 1; c < arguments.length; c++) {
        var d = arguments[c];
        if (goog.isArrayLike(d)) {
            var e = a.length || 0,
                f = d.length || 0;
            a.length = e + f;
            for (var g = 0; g < f; g++) a[e + g] = d[g]
        } else a.push(d)
    }
};
goog.array.splice = function(a, b, c, d) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.splice.apply(a, goog.array.slice(arguments, 1))
};
goog.array.slice = function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
};
goog.array.removeDuplicates = function(a, b, c) {
    b = b || a;
    var d = function(a) {
        return goog.isObject(a) ? "o" + goog.getUid(a) : (typeof a).charAt(0) + a
    };
    c = c || d;
    d = {};
    for (var e = 0, f = 0; f < a.length;) {
        var g = a[f++],
            h = c(g);
        Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0, b[e++] = g)
    }
    b.length = e
};
goog.array.binarySearch = function(a, b, c) {
    return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b)
};
goog.array.binarySelect = function(a, b, c) {
    return goog.array.binarySearch_(a, b, !0, void 0, c)
};
goog.array.binarySearch_ = function(a, b, c, d, e) {
    for (var f = 0, g = a.length, h; f < g;) {
        var k = f + (g - f >>> 1);
        var l = c ? b.call(e, a[k], k, a) : b(d, a[k]);
        0 < l ? f = k + 1 : (g = k, h = !l)
    }
    return h ? f : -f - 1
};
goog.array.sort = function(a, b) {
    a.sort(b || goog.array.defaultCompare)
};
goog.array.stableSort = function(a, b) {
    for (var c = Array(a.length), d = 0; d < a.length; d++) c[d] = {
        index: d,
        value: a[d]
    };
    var e = b || goog.array.defaultCompare;
    goog.array.sort(c, function(a, b) {
        return e(a.value, b.value) || a.index - b.index
    });
    for (d = 0; d < a.length; d++) a[d] = c[d].value
};
goog.array.sortByKey = function(a, b, c) {
    var d = c || goog.array.defaultCompare;
    goog.array.sort(a, function(a, c) {
        return d(b(a), b(c))
    })
};
goog.array.sortObjectsByKey = function(a, b, c) {
    goog.array.sortByKey(a, function(a) {
        return a[b]
    }, c)
};
goog.array.isSorted = function(a, b, c) {
    b = b || goog.array.defaultCompare;
    for (var d = 1; d < a.length; d++) {
        var e = b(a[d - 1], a[d]);
        if (0 < e || 0 == e && c) return !1
    }
    return !0
};
goog.array.equals = function(a, b, c) {
    if (!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) return !1;
    var d = a.length;
    c = c || goog.array.defaultCompareEquality;
    for (var e = 0; e < d; e++)
        if (!c(a[e], b[e])) return !1;
    return !0
};
goog.array.compare3 = function(a, b, c) {
    c = c || goog.array.defaultCompare;
    for (var d = Math.min(a.length, b.length), e = 0; e < d; e++) {
        var f = c(a[e], b[e]);
        if (0 != f) return f
    }
    return goog.array.defaultCompare(a.length, b.length)
};
goog.array.defaultCompare = function(a, b) {
    return a > b ? 1 : a < b ? -1 : 0
};
goog.array.inverseDefaultCompare = function(a, b) {
    return -goog.array.defaultCompare(a, b)
};
goog.array.defaultCompareEquality = function(a, b) {
    return a === b
};
goog.array.binaryInsert = function(a, b, c) {
    c = goog.array.binarySearch(a, b, c);
    return 0 > c ? (goog.array.insertAt(a, b, -(c + 1)), !0) : !1
};
goog.array.binaryRemove = function(a, b, c) {
    b = goog.array.binarySearch(a, b, c);
    return 0 <= b ? goog.array.removeAt(a, b) : !1
};
goog.array.bucket = function(a, b, c) {
    for (var d = {}, e = 0; e < a.length; e++) {
        var f = a[e],
            g = b.call(c, f, e, a);
        void 0 !== g && (d[g] || (d[g] = [])).push(f)
    }
    return d
};
goog.array.toObject = function(a, b, c) {
    var d = {};
    goog.array.forEach(a, function(e, f) {
        d[b.call(c, e, f, a)] = e
    });
    return d
};
goog.array.range = function(a, b, c) {
    var d = [],
        e = 0,
        f = a;
    c = c || 1;
    void 0 !== b && (e = a, f = b);
    if (0 > c * (f - e)) return [];
    if (0 < c)
        for (a = e; a < f; a += c) d.push(a);
    else
        for (a = e; a > f; a += c) d.push(a);
    return d
};
goog.array.repeat = function(a, b) {
    for (var c = [], d = 0; d < b; d++) c[d] = a;
    return c
};
goog.array.flatten = function(a) {
    for (var b = [], c = 0; c < arguments.length; c++) {
        var d = arguments[c];
        if (goog.isArray(d))
            for (var e = 0; e < d.length; e += 8192) {
                var f = goog.array.slice(d, e, e + 8192);
                f = goog.array.flatten.apply(null, f);
                for (var g = 0; g < f.length; g++) b.push(f[g])
            } else b.push(d)
    }
    return b
};
goog.array.rotate = function(a, b) {
    goog.asserts.assert(null != a.length);
    a.length && (b %= a.length, 0 < b ? Array.prototype.unshift.apply(a, a.splice(-b, b)) : 0 > b && Array.prototype.push.apply(a, a.splice(0, -b)));
    return a
};
goog.array.moveItem = function(a, b, c) {
    goog.asserts.assert(0 <= b && b < a.length);
    goog.asserts.assert(0 <= c && c < a.length);
    b = Array.prototype.splice.call(a, b, 1);
    Array.prototype.splice.call(a, c, 0, b[0])
};
goog.array.zip = function(a) {
    if (!arguments.length) return [];
    for (var b = [], c = arguments[0].length, d = 1; d < arguments.length; d++) arguments[d].length < c && (c = arguments[d].length);
    for (d = 0; d < c; d++) {
        for (var e = [], f = 0; f < arguments.length; f++) e.push(arguments[f][d]);
        b.push(e)
    }
    return b
};
goog.array.shuffle = function(a, b) {
    for (var c = b || Math.random, d = a.length - 1; 0 < d; d--) {
        var e = Math.floor(c() * (d + 1)),
            f = a[d];
        a[d] = a[e];
        a[e] = f
    }
};
goog.array.copyByIndex = function(a, b) {
    var c = [];
    goog.array.forEach(b, function(b) {
        c.push(a[b])
    });
    return c
};
goog.array.concatMap = function(a, b, c) {
    return goog.array.concat.apply([], goog.array.map(a, b, c))
};
goog.math = {};
goog.math.randomInt = function(a) {
    return Math.floor(Math.random() * a)
};
goog.math.uniformRandom = function(a, b) {
    return a + Math.random() * (b - a)
};
goog.math.clamp = function(a, b, c) {
    return Math.min(Math.max(a, b), c)
};
goog.math.modulo = function(a, b) {
    var c = a % b;
    return 0 > c * b ? c + b : c
};
goog.math.lerp = function(a, b, c) {
    return a + c * (b - a)
};
goog.math.nearlyEquals = function(a, b, c) {
    return Math.abs(a - b) <= (c || 1E-6)
};
goog.math.standardAngle = function(a) {
    return goog.math.modulo(a, 360)
};
goog.math.standardAngleInRadians = function(a) {
    return goog.math.modulo(a, 2 * Math.PI)
};
goog.math.toRadians = function(a) {
    return a * Math.PI / 180
};
goog.math.toDegrees = function(a) {
    return 180 * a / Math.PI
};
goog.math.angleDx = function(a, b) {
    return b * Math.cos(goog.math.toRadians(a))
};
goog.math.angleDy = function(a, b) {
    return b * Math.sin(goog.math.toRadians(a))
};
goog.math.angle = function(a, b, c, d) {
    return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(d - b, c - a)))
};
goog.math.angleDifference = function(a, b) {
    var c = goog.math.standardAngle(b) - goog.math.standardAngle(a);
    180 < c ? c -= 360 : -180 >= c && (c = 360 + c);
    return c
};
goog.math.sign = function(a) {
    return 0 < a ? 1 : 0 > a ? -1 : a
};
goog.math.longestCommonSubsequence = function(a, b, c, d) {
    c = c || function(a, b) {
        return a == b
    };
    d = d || function(b, c) {
        return a[b]
    };
    for (var e = a.length, f = b.length, g = [], h = 0; h < e + 1; h++) g[h] = [], g[h][0] = 0;
    for (var k = 0; k < f + 1; k++) g[0][k] = 0;
    for (h = 1; h <= e; h++)
        for (k = 1; k <= f; k++) c(a[h - 1], b[k - 1]) ? g[h][k] = g[h - 1][k - 1] + 1 : g[h][k] = Math.max(g[h - 1][k], g[h][k - 1]);
    var l = [];
    h = e;
    for (k = f; 0 < h && 0 < k;) c(a[h - 1], b[k - 1]) ? (l.unshift(d(h - 1, k - 1)), h--, k--) : g[h - 1][k] > g[h][k - 1] ? h-- : k--;
    return l
};
goog.math.sum = function(a) {
    return goog.array.reduce(arguments, function(a, c) {
        return a + c
    }, 0)
};
goog.math.average = function(a) {
    return goog.math.sum.apply(null, arguments) / arguments.length
};
goog.math.sampleVariance = function(a) {
    var b = arguments.length;
    if (2 > b) return 0;
    var c = goog.math.average.apply(null, arguments);
    return goog.math.sum.apply(null, goog.array.map(arguments, function(a) {
        return Math.pow(a - c, 2)
    })) / (b - 1)
};
goog.math.standardDeviation = function(a) {
    return Math.sqrt(goog.math.sampleVariance.apply(null, arguments))
};
goog.math.isInt = function(a) {
    return isFinite(a) && 0 == a % 1
};
goog.math.isFiniteNumber = function(a) {
    return isFinite(a)
};
goog.math.isNegativeZero = function(a) {
    return 0 == a && 0 > 1 / a
};
goog.math.log10Floor = function(a) {
    if (0 < a) {
        var b = Math.round(Math.log(a) * Math.LOG10E);
        return b - (parseFloat("1e" + b) > a ? 1 : 0)
    }
    return 0 == a ? -Infinity : NaN
};
goog.math.safeFloor = function(a, b) {
    goog.asserts.assert(void 0 === b || 0 < b);
    return Math.floor(a + (b || 2E-15))
};
goog.math.safeCeil = function(a, b) {
    goog.asserts.assert(void 0 === b || 0 < b);
    return Math.ceil(a - (b || 2E-15))
};
goog.string = {};
goog.string.internal = {};
goog.string.internal.startsWith = function(a, b) {
    return 0 == a.lastIndexOf(b, 0)
};
goog.string.internal.endsWith = function(a, b) {
    var c = a.length - b.length;
    return 0 <= c && a.indexOf(b, c) == c
};
goog.string.internal.caseInsensitiveStartsWith = function(a, b) {
    return 0 == goog.string.internal.caseInsensitiveCompare(b, a.substr(0, b.length))
};
goog.string.internal.caseInsensitiveEndsWith = function(a, b) {
    return 0 == goog.string.internal.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length))
};
goog.string.internal.caseInsensitiveEquals = function(a, b) {
    return a.toLowerCase() == b.toLowerCase()
};
goog.string.internal.isEmptyOrWhitespace = function(a) {
    return /^[\s\xa0]*$/.test(a)
};
goog.string.internal.trim = goog.TRUSTED_SITE && String.prototype.trim ? function(a) {
    return a.trim()
} : function(a) {
    return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
};
goog.string.internal.caseInsensitiveCompare = function(a, b) {
    var c = String(a).toLowerCase(),
        d = String(b).toLowerCase();
    return c < d ? -1 : c == d ? 0 : 1
};
goog.string.internal.newLineToBr = function(a, b) {
    return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>")
};
goog.string.internal.htmlEscape = function(a, b) {
    if (b) a = a.replace(goog.string.internal.AMP_RE_, "&amp;").replace(goog.string.internal.LT_RE_, "&lt;").replace(goog.string.internal.GT_RE_, "&gt;").replace(goog.string.internal.QUOT_RE_, "&quot;").replace(goog.string.internal.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.internal.NULL_RE_, "&#0;");
    else {
        if (!goog.string.internal.ALL_RE_.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(goog.string.internal.AMP_RE_, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(goog.string.internal.LT_RE_,
            "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(goog.string.internal.GT_RE_, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(goog.string.internal.QUOT_RE_, "&quot;")); - 1 != a.indexOf("'") && (a = a.replace(goog.string.internal.SINGLE_QUOTE_RE_, "&#39;")); - 1 != a.indexOf("\x00") && (a = a.replace(goog.string.internal.NULL_RE_, "&#0;"))
    }
    return a
};
goog.string.internal.AMP_RE_ = /&/g;
goog.string.internal.LT_RE_ = /</g;
goog.string.internal.GT_RE_ = />/g;
goog.string.internal.QUOT_RE_ = /"/g;
goog.string.internal.SINGLE_QUOTE_RE_ = /'/g;
goog.string.internal.NULL_RE_ = /\x00/g;
goog.string.internal.ALL_RE_ = /[\x00&<>"']/;
goog.string.internal.whitespaceEscape = function(a, b) {
    return goog.string.internal.newLineToBr(a.replace(/  /g, " &#160;"), b)
};
goog.string.internal.contains = function(a, b) {
    return -1 != a.indexOf(b)
};
goog.string.internal.caseInsensitiveContains = function(a, b) {
    return goog.string.internal.contains(a.toLowerCase(), b.toLowerCase())
};
goog.string.internal.compareVersions = function(a, b) {
    for (var c = 0, d = goog.string.internal.trim(String(a)).split("."), e = goog.string.internal.trim(String(b)).split("."), f = Math.max(d.length, e.length), g = 0; 0 == c && g < f; g++) {
        var h = d[g] || "",
            k = e[g] || "";
        do {
            h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
            k = /(\d*)(\D*)(.*)/.exec(k) || ["", "", "", ""];
            if (0 == h[0].length && 0 == k[0].length) break;
            c = 0 == h[1].length ? 0 : parseInt(h[1], 10);
            var l = 0 == k[1].length ? 0 : parseInt(k[1], 10);
            c = goog.string.internal.compareElements_(c, l) || goog.string.internal.compareElements_(0 ==
                h[2].length, 0 == k[2].length) || goog.string.internal.compareElements_(h[2], k[2]);
            h = h[3];
            k = k[3]
        } while (0 == c)
    }
    return c
};
goog.string.internal.compareElements_ = function(a, b) {
    return a < b ? -1 : a > b ? 1 : 0
};
goog.labs = {};
goog.labs.userAgent = {};
goog.labs.userAgent.util = {};
goog.labs.userAgent.util.getNativeUserAgentString_ = function() {
    var a = goog.labs.userAgent.util.getNavigator_();
    return a && (a = a.userAgent) ? a : ""
};
goog.labs.userAgent.util.getNavigator_ = function() {
    return goog.global.navigator
};
goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_();
goog.labs.userAgent.util.setUserAgent = function(a) {
    goog.labs.userAgent.util.userAgent_ = a || goog.labs.userAgent.util.getNativeUserAgentString_()
};
goog.labs.userAgent.util.getUserAgent = function() {
    return goog.labs.userAgent.util.userAgent_
};
goog.labs.userAgent.util.matchUserAgent = function(a) {
    var b = goog.labs.userAgent.util.getUserAgent();
    return goog.string.internal.contains(b, a)
};
goog.labs.userAgent.util.matchUserAgentIgnoreCase = function(a) {
    var b = goog.labs.userAgent.util.getUserAgent();
    return goog.string.internal.caseInsensitiveContains(b, a)
};
goog.labs.userAgent.util.extractVersionTuples = function(a) {
    for (var b = RegExp("(\\w[\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g"), c = [], d; d = b.exec(a);) c.push([d[1], d[2], d[3] || void 0]);
    return c
};
goog.object = {};
goog.object.is = function(a, b) {
    return a === b ? 0 !== a || 1 / a === 1 / b : a !== a && b !== b
};
goog.object.forEach = function(a, b, c) {
    for (var d in a) b.call(c, a[d], d, a)
};
goog.object.filter = function(a, b, c) {
    var d = {},
        e;
    for (e in a) b.call(c, a[e], e, a) && (d[e] = a[e]);
    return d
};
goog.object.map = function(a, b, c) {
    var d = {},
        e;
    for (e in a) d[e] = b.call(c, a[e], e, a);
    return d
};
goog.object.some = function(a, b, c) {
    for (var d in a)
        if (b.call(c, a[d], d, a)) return !0;
    return !1
};
goog.object.every = function(a, b, c) {
    for (var d in a)
        if (!b.call(c, a[d], d, a)) return !1;
    return !0
};
goog.object.getCount = function(a) {
    var b = 0,
        c;
    for (c in a) b++;
    return b
};
goog.object.getAnyKey = function(a) {
    for (var b in a) return b
};
goog.object.getAnyValue = function(a) {
    for (var b in a) return a[b]
};
goog.object.contains = function(a, b) {
    return goog.object.containsValue(a, b)
};
goog.object.getValues = function(a) {
    var b = [],
        c = 0,
        d;
    for (d in a) b[c++] = a[d];
    return b
};
goog.object.getKeys = function(a) {
    var b = [],
        c = 0,
        d;
    for (d in a) b[c++] = d;
    return b
};
goog.object.getValueByKeys = function(a, b) {
    var c = goog.isArrayLike(b),
        d = c ? b : arguments;
    for (c = c ? 0 : 1; c < d.length; c++) {
        if (null == a) return;
        a = a[d[c]]
    }
    return a
};
goog.object.containsKey = function(a, b) {
    return null !== a && b in a
};
goog.object.containsValue = function(a, b) {
    for (var c in a)
        if (a[c] == b) return !0;
    return !1
};
goog.object.findKey = function(a, b, c) {
    for (var d in a)
        if (b.call(c, a[d], d, a)) return d
};
goog.object.findValue = function(a, b, c) {
    return (b = goog.object.findKey(a, b, c)) && a[b]
};
goog.object.isEmpty = function(a) {
    for (var b in a) return !1;
    return !0
};
goog.object.clear = function(a) {
    for (var b in a) delete a[b]
};
goog.object.remove = function(a, b) {
    var c;
    (c = b in a) && delete a[b];
    return c
};
goog.object.add = function(a, b, c) {
    if (null !== a && b in a) throw Error('The object already contains the key "' + b + '"');
    goog.object.set(a, b, c)
};
goog.object.get = function(a, b, c) {
    return null !== a && b in a ? a[b] : c
};
goog.object.set = function(a, b, c) {
    a[b] = c
};
goog.object.setIfUndefined = function(a, b, c) {
    return b in a ? a[b] : a[b] = c
};
goog.object.setWithReturnValueIfNotSet = function(a, b, c) {
    if (b in a) return a[b];
    c = c();
    return a[b] = c
};
goog.object.equals = function(a, b) {
    for (var c in a)
        if (!(c in b) || a[c] !== b[c]) return !1;
    for (var d in b)
        if (!(d in a)) return !1;
    return !0
};
goog.object.clone = function(a) {
    var b = {},
        c;
    for (c in a) b[c] = a[c];
    return b
};
goog.object.unsafeClone = function(a) {
    var b = goog.typeOf(a);
    if ("object" == b || "array" == b) {
        if (goog.isFunction(a.clone)) return a.clone();
        b = "array" == b ? [] : {};
        for (var c in a) b[c] = goog.object.unsafeClone(a[c]);
        return b
    }
    return a
};
goog.object.transpose = function(a) {
    var b = {},
        c;
    for (c in a) b[a[c]] = c;
    return b
};
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (var f = 0; f < goog.object.PROTOTYPE_FIELDS_.length; f++) c = goog.object.PROTOTYPE_FIELDS_[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
};
goog.object.create = function(a) {
    var b = arguments.length;
    if (1 == b && goog.isArray(arguments[0])) return goog.object.create.apply(null, arguments[0]);
    if (b % 2) throw Error("Uneven number of arguments");
    for (var c = {}, d = 0; d < b; d += 2) c[arguments[d]] = arguments[d + 1];
    return c
};
goog.object.createSet = function(a) {
    var b = arguments.length;
    if (1 == b && goog.isArray(arguments[0])) return goog.object.createSet.apply(null, arguments[0]);
    for (var c = {}, d = 0; d < b; d++) c[arguments[d]] = !0;
    return c
};
goog.object.createImmutableView = function(a) {
    var b = a;
    Object.isFrozen && !Object.isFrozen(a) && (b = Object.create(a), Object.freeze(b));
    return b
};
goog.object.isImmutableView = function(a) {
    return !!Object.isFrozen && Object.isFrozen(a)
};
goog.object.getAllPropertyNames = function(a, b, c) {
    if (!a) return [];
    if (!Object.getOwnPropertyNames || !Object.getPrototypeOf) return goog.object.getKeys(a);
    for (var d = {}; a && (a !== Object.prototype || b) && (a !== Function.prototype || c);) {
        for (var e = Object.getOwnPropertyNames(a), f = 0; f < e.length; f++) d[e[f]] = !0;
        a = Object.getPrototypeOf(a)
    }
    return goog.object.getKeys(d)
};
goog.object.getSuperClass = function(a) {
    return (a = Object.getPrototypeOf(a.prototype)) && a.constructor
};
goog.labs.userAgent.browser = {};
goog.labs.userAgent.browser.matchOpera_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Opera")
};
goog.labs.userAgent.browser.matchIE_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE")
};
goog.labs.userAgent.browser.matchEdgeHtml_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Edge")
};
goog.labs.userAgent.browser.matchEdgeChromium_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Edg/")
};
goog.labs.userAgent.browser.matchOperaChromium_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("OPR")
};
goog.labs.userAgent.browser.matchFirefox_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Firefox") || goog.labs.userAgent.util.matchUserAgent("FxiOS")
};
goog.labs.userAgent.browser.matchSafari_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Safari") && !(goog.labs.userAgent.browser.matchChrome_() || goog.labs.userAgent.browser.matchCoast_() || goog.labs.userAgent.browser.matchOpera_() || goog.labs.userAgent.browser.matchEdgeHtml_() || goog.labs.userAgent.browser.matchEdgeChromium_() || goog.labs.userAgent.browser.matchOperaChromium_() || goog.labs.userAgent.browser.matchFirefox_() || goog.labs.userAgent.browser.isSilk() || goog.labs.userAgent.util.matchUserAgent("Android"))
};
goog.labs.userAgent.browser.matchCoast_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Coast")
};
goog.labs.userAgent.browser.matchIosWebview_ = function() {
    return (goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("iPhone")) && !goog.labs.userAgent.browser.matchSafari_() && !goog.labs.userAgent.browser.matchChrome_() && !goog.labs.userAgent.browser.matchCoast_() && !goog.labs.userAgent.browser.matchFirefox_() && goog.labs.userAgent.util.matchUserAgent("AppleWebKit")
};
goog.labs.userAgent.browser.matchChrome_ = function() {
    return (goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS")) && !goog.labs.userAgent.browser.matchEdgeHtml_()
};
goog.labs.userAgent.browser.matchAndroidBrowser_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Android") && !(goog.labs.userAgent.browser.isChrome() || goog.labs.userAgent.browser.isFirefox() || goog.labs.userAgent.browser.isOpera() || goog.labs.userAgent.browser.isSilk())
};
goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_;
goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_;
goog.labs.userAgent.browser.isEdge = goog.labs.userAgent.browser.matchEdgeHtml_;
goog.labs.userAgent.browser.isEdgeChromium = goog.labs.userAgent.browser.matchEdgeChromium_;
goog.labs.userAgent.browser.isOperaChromium = goog.labs.userAgent.browser.matchOperaChromium_;
goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_;
goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_;
goog.labs.userAgent.browser.isCoast = goog.labs.userAgent.browser.matchCoast_;
goog.labs.userAgent.browser.isIosWebview = goog.labs.userAgent.browser.matchIosWebview_;
goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_;
goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_;
goog.labs.userAgent.browser.isSilk = function() {
    return goog.labs.userAgent.util.matchUserAgent("Silk")
};
goog.labs.userAgent.browser.getVersion = function() {
    function a(a) {
        a = goog.array.find(a, d);
        return c[a] || ""
    }
    var b = goog.labs.userAgent.util.getUserAgent();
    if (goog.labs.userAgent.browser.isIE()) return goog.labs.userAgent.browser.getIEVersion_(b);
    b = goog.labs.userAgent.util.extractVersionTuples(b);
    var c = {};
    goog.array.forEach(b, function(a) {
        c[a[0]] = a[1]
    });
    var d = goog.partial(goog.object.containsKey, c);
    return goog.labs.userAgent.browser.isOpera() ? a(["Version", "Opera"]) : goog.labs.userAgent.browser.isEdge() ? a(["Edge"]) :
        goog.labs.userAgent.browser.isEdgeChromium() ? a(["Edg"]) : goog.labs.userAgent.browser.isChrome() ? a(["Chrome", "CriOS"]) : (b = b[2]) && b[1] || ""
};
goog.labs.userAgent.browser.isVersionOrHigher = function(a) {
    return 0 <= goog.string.internal.compareVersions(goog.labs.userAgent.browser.getVersion(), a)
};
goog.labs.userAgent.browser.getIEVersion_ = function(a) {
    var b = /rv: *([\d\.]*)/.exec(a);
    if (b && b[1]) return b[1];
    b = "";
    var c = /MSIE +([\d\.]+)/.exec(a);
    if (c && c[1])
        if (a = /Trident\/(\d.\d)/.exec(a), "7.0" == c[1])
            if (a && a[1]) switch (a[1]) {
                case "4.0":
                    b = "8.0";
                    break;
                case "5.0":
                    b = "9.0";
                    break;
                case "6.0":
                    b = "10.0";
                    break;
                case "7.0":
                    b = "11.0"
            } else b = "7.0";
            else b = c[1];
    return b
};
goog.dom.asserts = {};
goog.dom.asserts.assertIsLocation = function(a) {
    if (goog.asserts.ENABLE_ASSERTS) {
        var b = goog.dom.asserts.getWindow_(a);
        b && (!a || !(a instanceof b.Location) && a instanceof b.Element) && goog.asserts.fail("Argument is not a Location (or a non-Element mock); got: %s", goog.dom.asserts.debugStringForType_(a))
    }
    return a
};
goog.dom.asserts.assertIsElementType_ = function(a, b) {
    if (goog.asserts.ENABLE_ASSERTS) {
        var c = goog.dom.asserts.getWindow_(a);
        c && "undefined" != typeof c[b] && (a && (a instanceof c[b] || !(a instanceof c.Location || a instanceof c.Element)) || goog.asserts.fail("Argument is not a %s (or a non-Element, non-Location mock); got: %s", b, goog.dom.asserts.debugStringForType_(a)))
    }
    return a
};
goog.dom.asserts.assertIsHTMLAnchorElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLAnchorElement")
};
goog.dom.asserts.assertIsHTMLButtonElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLButtonElement")
};
goog.dom.asserts.assertIsHTMLLinkElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLLinkElement")
};
goog.dom.asserts.assertIsHTMLImageElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLImageElement")
};
goog.dom.asserts.assertIsHTMLAudioElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLAudioElement")
};
goog.dom.asserts.assertIsHTMLVideoElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLVideoElement")
};
goog.dom.asserts.assertIsHTMLInputElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLInputElement")
};
goog.dom.asserts.assertIsHTMLTextAreaElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLTextAreaElement")
};
goog.dom.asserts.assertIsHTMLCanvasElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLCanvasElement")
};
goog.dom.asserts.assertIsHTMLEmbedElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLEmbedElement")
};
goog.dom.asserts.assertIsHTMLFormElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLFormElement")
};
goog.dom.asserts.assertIsHTMLFrameElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLFrameElement")
};
goog.dom.asserts.assertIsHTMLIFrameElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLIFrameElement")
};
goog.dom.asserts.assertIsHTMLObjectElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLObjectElement")
};
goog.dom.asserts.assertIsHTMLScriptElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLScriptElement")
};
goog.dom.asserts.debugStringForType_ = function(a) {
    if (goog.isObject(a)) try {
        return a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a)
    } catch (b) {
        return "<object could not be stringified>"
    } else return void 0 === a ? "undefined" : null === a ? "null" : typeof a
};
goog.dom.asserts.getWindow_ = function(a) {
    try {
        var b = a && a.ownerDocument,
            c = b && (b.defaultView || b.parentWindow);
        c = c || goog.global;
        if (c.Element && c.Location) return c
    } catch (d) {}
    return null
};
goog.functions = {};
goog.functions.constant = function(a) {
    return function() {
        return a
    }
};
goog.functions.FALSE = function() {
    return !1
};
goog.functions.TRUE = function() {
    return !0
};
goog.functions.NULL = function() {
    return null
};
goog.functions.identity = function(a, b) {
    return a
};
goog.functions.error = function(a) {
    return function() {
        throw Error(a);
    }
};
goog.functions.fail = function(a) {
    return function() {
        throw a;
    }
};
goog.functions.lock = function(a, b) {
    b = b || 0;
    return function() {
        return a.apply(this, Array.prototype.slice.call(arguments, 0, b))
    }
};
goog.functions.nth = function(a) {
    return function() {
        return arguments[a]
    }
};
goog.functions.partialRight = function(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function() {
        var b = Array.prototype.slice.call(arguments);
        b.push.apply(b, c);
        return a.apply(this, b)
    }
};
goog.functions.withReturnValue = function(a, b) {
    return goog.functions.sequence(a, goog.functions.constant(b))
};
goog.functions.equalTo = function(a, b) {
    return function(c) {
        return b ? a == c : a === c
    }
};
goog.functions.compose = function(a, b) {
    var c = arguments,
        d = c.length;
    return function() {
        var a;
        d && (a = c[d - 1].apply(this, arguments));
        for (var b = d - 2; 0 <= b; b--) a = c[b].call(this, a);
        return a
    }
};
goog.functions.sequence = function(a) {
    var b = arguments,
        c = b.length;
    return function() {
        for (var a, e = 0; e < c; e++) a = b[e].apply(this, arguments);
        return a
    }
};
goog.functions.and = function(a) {
    var b = arguments,
        c = b.length;
    return function() {
        for (var a = 0; a < c; a++)
            if (!b[a].apply(this, arguments)) return !1;
        return !0
    }
};
goog.functions.or = function(a) {
    var b = arguments,
        c = b.length;
    return function() {
        for (var a = 0; a < c; a++)
            if (b[a].apply(this, arguments)) return !0;
        return !1
    }
};
goog.functions.not = function(a) {
    return function() {
        return !a.apply(this, arguments)
    }
};
goog.functions.create = function(a, b) {
    var c = function() {};
    c.prototype = a.prototype;
    c = new c;
    a.apply(c, Array.prototype.slice.call(arguments, 1));
    return c
};
goog.functions.CACHE_RETURN_VALUE = !0;
goog.functions.cacheReturnValue = function(a) {
    var b = !1,
        c;
    return function() {
        if (!goog.functions.CACHE_RETURN_VALUE) return a();
        b || (c = a(), b = !0);
        return c
    }
};
goog.functions.once = function(a) {
    var b = a;
    return function() {
        if (b) {
            var a = b;
            b = null;
            a()
        }
    }
};
goog.functions.debounce = function(a, b, c) {
    var d = 0;
    return function(e) {
        goog.global.clearTimeout(d);
        var f = arguments;
        d = goog.global.setTimeout(function() {
            a.apply(c, f)
        }, b)
    }
};
goog.functions.throttle = function(a, b, c) {
    var d = 0,
        e = !1,
        f = [],
        g = function() {
            d = 0;
            e && (e = !1, h())
        },
        h = function() {
            d = goog.global.setTimeout(g, b);
            a.apply(c, f)
        };
    return function(a) {
        f = arguments;
        d ? e = !0 : h()
    }
};
goog.functions.rateLimit = function(a, b, c) {
    var d = 0,
        e = function() {
            d = 0
        };
    return function(f) {
        d || (d = goog.global.setTimeout(e, b), a.apply(c, arguments))
    }
};
goog.dom.HtmlElement = function() {};
goog.dom.TagName = function(a) {
    this.tagName_ = a
};
goog.dom.TagName.prototype.toString = function() {
    return this.tagName_
};
goog.dom.TagName.A = new goog.dom.TagName("A");
goog.dom.TagName.ABBR = new goog.dom.TagName("ABBR");
goog.dom.TagName.ACRONYM = new goog.dom.TagName("ACRONYM");
goog.dom.TagName.ADDRESS = new goog.dom.TagName("ADDRESS");
goog.dom.TagName.APPLET = new goog.dom.TagName("APPLET");
goog.dom.TagName.AREA = new goog.dom.TagName("AREA");
goog.dom.TagName.ARTICLE = new goog.dom.TagName("ARTICLE");
goog.dom.TagName.ASIDE = new goog.dom.TagName("ASIDE");
goog.dom.TagName.AUDIO = new goog.dom.TagName("AUDIO");
goog.dom.TagName.B = new goog.dom.TagName("B");
goog.dom.TagName.BASE = new goog.dom.TagName("BASE");
goog.dom.TagName.BASEFONT = new goog.dom.TagName("BASEFONT");
goog.dom.TagName.BDI = new goog.dom.TagName("BDI");
goog.dom.TagName.BDO = new goog.dom.TagName("BDO");
goog.dom.TagName.BIG = new goog.dom.TagName("BIG");
goog.dom.TagName.BLOCKQUOTE = new goog.dom.TagName("BLOCKQUOTE");
goog.dom.TagName.BODY = new goog.dom.TagName("BODY");
goog.dom.TagName.BR = new goog.dom.TagName("BR");
goog.dom.TagName.BUTTON = new goog.dom.TagName("BUTTON");
goog.dom.TagName.CANVAS = new goog.dom.TagName("CANVAS");
goog.dom.TagName.CAPTION = new goog.dom.TagName("CAPTION");
goog.dom.TagName.CENTER = new goog.dom.TagName("CENTER");
goog.dom.TagName.CITE = new goog.dom.TagName("CITE");
goog.dom.TagName.CODE = new goog.dom.TagName("CODE");
goog.dom.TagName.COL = new goog.dom.TagName("COL");
goog.dom.TagName.COLGROUP = new goog.dom.TagName("COLGROUP");
goog.dom.TagName.COMMAND = new goog.dom.TagName("COMMAND");
goog.dom.TagName.DATA = new goog.dom.TagName("DATA");
goog.dom.TagName.DATALIST = new goog.dom.TagName("DATALIST");
goog.dom.TagName.DD = new goog.dom.TagName("DD");
goog.dom.TagName.DEL = new goog.dom.TagName("DEL");
goog.dom.TagName.DETAILS = new goog.dom.TagName("DETAILS");
goog.dom.TagName.DFN = new goog.dom.TagName("DFN");
goog.dom.TagName.DIALOG = new goog.dom.TagName("DIALOG");
goog.dom.TagName.DIR = new goog.dom.TagName("DIR");
goog.dom.TagName.DIV = new goog.dom.TagName("DIV");
goog.dom.TagName.DL = new goog.dom.TagName("DL");
goog.dom.TagName.DT = new goog.dom.TagName("DT");
goog.dom.TagName.EM = new goog.dom.TagName("EM");
goog.dom.TagName.EMBED = new goog.dom.TagName("EMBED");
goog.dom.TagName.FIELDSET = new goog.dom.TagName("FIELDSET");
goog.dom.TagName.FIGCAPTION = new goog.dom.TagName("FIGCAPTION");
goog.dom.TagName.FIGURE = new goog.dom.TagName("FIGURE");
goog.dom.TagName.FONT = new goog.dom.TagName("FONT");
goog.dom.TagName.FOOTER = new goog.dom.TagName("FOOTER");
goog.dom.TagName.FORM = new goog.dom.TagName("FORM");
goog.dom.TagName.FRAME = new goog.dom.TagName("FRAME");
goog.dom.TagName.FRAMESET = new goog.dom.TagName("FRAMESET");
goog.dom.TagName.H1 = new goog.dom.TagName("H1");
goog.dom.TagName.H2 = new goog.dom.TagName("H2");
goog.dom.TagName.H3 = new goog.dom.TagName("H3");
goog.dom.TagName.H4 = new goog.dom.TagName("H4");
goog.dom.TagName.H5 = new goog.dom.TagName("H5");
goog.dom.TagName.H6 = new goog.dom.TagName("H6");
goog.dom.TagName.HEAD = new goog.dom.TagName("HEAD");
goog.dom.TagName.HEADER = new goog.dom.TagName("HEADER");
goog.dom.TagName.HGROUP = new goog.dom.TagName("HGROUP");
goog.dom.TagName.HR = new goog.dom.TagName("HR");
goog.dom.TagName.HTML = new goog.dom.TagName("HTML");
goog.dom.TagName.I = new goog.dom.TagName("I");
goog.dom.TagName.IFRAME = new goog.dom.TagName("IFRAME");
goog.dom.TagName.IMG = new goog.dom.TagName("IMG");
goog.dom.TagName.INPUT = new goog.dom.TagName("INPUT");
goog.dom.TagName.INS = new goog.dom.TagName("INS");
goog.dom.TagName.ISINDEX = new goog.dom.TagName("ISINDEX");
goog.dom.TagName.KBD = new goog.dom.TagName("KBD");
goog.dom.TagName.KEYGEN = new goog.dom.TagName("KEYGEN");
goog.dom.TagName.LABEL = new goog.dom.TagName("LABEL");
goog.dom.TagName.LEGEND = new goog.dom.TagName("LEGEND");
goog.dom.TagName.LI = new goog.dom.TagName("LI");
goog.dom.TagName.LINK = new goog.dom.TagName("LINK");
goog.dom.TagName.MAIN = new goog.dom.TagName("MAIN");
goog.dom.TagName.MAP = new goog.dom.TagName("MAP");
goog.dom.TagName.MARK = new goog.dom.TagName("MARK");
goog.dom.TagName.MATH = new goog.dom.TagName("MATH");
goog.dom.TagName.MENU = new goog.dom.TagName("MENU");
goog.dom.TagName.MENUITEM = new goog.dom.TagName("MENUITEM");
goog.dom.TagName.META = new goog.dom.TagName("META");
goog.dom.TagName.METER = new goog.dom.TagName("METER");
goog.dom.TagName.NAV = new goog.dom.TagName("NAV");
goog.dom.TagName.NOFRAMES = new goog.dom.TagName("NOFRAMES");
goog.dom.TagName.NOSCRIPT = new goog.dom.TagName("NOSCRIPT");
goog.dom.TagName.OBJECT = new goog.dom.TagName("OBJECT");
goog.dom.TagName.OL = new goog.dom.TagName("OL");
goog.dom.TagName.OPTGROUP = new goog.dom.TagName("OPTGROUP");
goog.dom.TagName.OPTION = new goog.dom.TagName("OPTION");
goog.dom.TagName.OUTPUT = new goog.dom.TagName("OUTPUT");
goog.dom.TagName.P = new goog.dom.TagName("P");
goog.dom.TagName.PARAM = new goog.dom.TagName("PARAM");
goog.dom.TagName.PICTURE = new goog.dom.TagName("PICTURE");
goog.dom.TagName.PRE = new goog.dom.TagName("PRE");
goog.dom.TagName.PROGRESS = new goog.dom.TagName("PROGRESS");
goog.dom.TagName.Q = new goog.dom.TagName("Q");
goog.dom.TagName.RP = new goog.dom.TagName("RP");
goog.dom.TagName.RT = new goog.dom.TagName("RT");
goog.dom.TagName.RTC = new goog.dom.TagName("RTC");
goog.dom.TagName.RUBY = new goog.dom.TagName("RUBY");
goog.dom.TagName.S = new goog.dom.TagName("S");
goog.dom.TagName.SAMP = new goog.dom.TagName("SAMP");
goog.dom.TagName.SCRIPT = new goog.dom.TagName("SCRIPT");
goog.dom.TagName.SECTION = new goog.dom.TagName("SECTION");
goog.dom.TagName.SELECT = new goog.dom.TagName("SELECT");
goog.dom.TagName.SMALL = new goog.dom.TagName("SMALL");
goog.dom.TagName.SOURCE = new goog.dom.TagName("SOURCE");
goog.dom.TagName.SPAN = new goog.dom.TagName("SPAN");
goog.dom.TagName.STRIKE = new goog.dom.TagName("STRIKE");
goog.dom.TagName.STRONG = new goog.dom.TagName("STRONG");
goog.dom.TagName.STYLE = new goog.dom.TagName("STYLE");
goog.dom.TagName.SUB = new goog.dom.TagName("SUB");
goog.dom.TagName.SUMMARY = new goog.dom.TagName("SUMMARY");
goog.dom.TagName.SUP = new goog.dom.TagName("SUP");
goog.dom.TagName.SVG = new goog.dom.TagName("SVG");
goog.dom.TagName.TABLE = new goog.dom.TagName("TABLE");
goog.dom.TagName.TBODY = new goog.dom.TagName("TBODY");
goog.dom.TagName.TD = new goog.dom.TagName("TD");
goog.dom.TagName.TEMPLATE = new goog.dom.TagName("TEMPLATE");
goog.dom.TagName.TEXTAREA = new goog.dom.TagName("TEXTAREA");
goog.dom.TagName.TFOOT = new goog.dom.TagName("TFOOT");
goog.dom.TagName.TH = new goog.dom.TagName("TH");
goog.dom.TagName.THEAD = new goog.dom.TagName("THEAD");
goog.dom.TagName.TIME = new goog.dom.TagName("TIME");
goog.dom.TagName.TITLE = new goog.dom.TagName("TITLE");
goog.dom.TagName.TR = new goog.dom.TagName("TR");
goog.dom.TagName.TRACK = new goog.dom.TagName("TRACK");
goog.dom.TagName.TT = new goog.dom.TagName("TT");
goog.dom.TagName.U = new goog.dom.TagName("U");
goog.dom.TagName.UL = new goog.dom.TagName("UL");
goog.dom.TagName.VAR = new goog.dom.TagName("VAR");
goog.dom.TagName.VIDEO = new goog.dom.TagName("VIDEO");
goog.dom.TagName.WBR = new goog.dom.TagName("WBR");
goog.dom.tags = {};
goog.dom.tags.VOID_TAGS_ = {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    command: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
};
goog.dom.tags.isVoidTag = function(a) {
    return !0 === goog.dom.tags.VOID_TAGS_[a]
};
goog.html = {};
goog.html.trustedtypes = {};
goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY = goog.TRUSTED_TYPES_POLICY_NAME ? goog.createTrustedTypesPolicy(goog.TRUSTED_TYPES_POLICY_NAME + "#html") : null;
goog.string.TypedString = function() {};
goog.string.Const = function(a, b) {
    this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = a === goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_ && b || "";
    this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ = goog.string.Const.TYPE_MARKER_
};
goog.string.Const.prototype.implementsGoogStringTypedString = !0;
goog.string.Const.prototype.getTypedStringValue = function() {
    return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_
};
goog.DEBUG && (goog.string.Const.prototype.toString = function() {
    return "Const{" + this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ + "}"
});
goog.string.Const.unwrap = function(a) {
    if (a instanceof goog.string.Const && a.constructor === goog.string.Const && a.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ === goog.string.Const.TYPE_MARKER_) return a.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
    goog.asserts.fail("expected object of type Const, got '" + a + "'");
    return "type_error:Const"
};
goog.string.Const.from = function(a) {
    return new goog.string.Const(goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_, a)
};
goog.string.Const.TYPE_MARKER_ = {};
goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_ = {};
goog.string.Const.EMPTY = goog.string.Const.from("");
goog.html.SafeScript = function() {
    this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = "";
    this.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
};
goog.html.SafeScript.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeScript.fromConstant = function(a) {
    a = goog.string.Const.unwrap(a);
    return 0 === a.length ? goog.html.SafeScript.EMPTY : goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.SafeScript.fromConstantAndArgs = function(a, b) {
    for (var c = [], d = 1; d < arguments.length; d++) c.push(goog.html.SafeScript.stringify_(arguments[d]));
    return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse("(" + goog.string.Const.unwrap(a) + ")(" + c.join(", ") + ");")
};
goog.html.SafeScript.fromJson = function(a) {
    return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(goog.html.SafeScript.stringify_(a))
};
goog.html.SafeScript.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeScriptWrappedValue_.toString()
};
goog.DEBUG && (goog.html.SafeScript.prototype.toString = function() {
    return "SafeScript{" + this.privateDoNotAccessOrElseSafeScriptWrappedValue_ + "}"
});
goog.html.SafeScript.unwrap = function(a) {
    return goog.html.SafeScript.unwrapTrustedScript(a).toString()
};
goog.html.SafeScript.unwrapTrustedScript = function(a) {
    if (a instanceof goog.html.SafeScript && a.constructor === goog.html.SafeScript && a.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeScriptWrappedValue_;
    goog.asserts.fail("expected object of type SafeScript, got '" + a + "' of type " + goog.typeOf(a));
    return "type_error:SafeScript"
};
goog.html.SafeScript.stringify_ = function(a) {
    return JSON.stringify(a).replace(/</g, "\\x3c")
};
goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse = function(a) {
    return (new goog.html.SafeScript).initSecurityPrivateDoNotAccessOrElse_(a)
};
goog.html.SafeScript.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
    this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY ? goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createScript(a) : a;
    return this
};
goog.html.SafeScript.EMPTY = goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse("");
goog.fs = {};
goog.fs.url = {};
goog.fs.url.createObjectUrl = function(a) {
    return goog.fs.url.getUrlObject_().createObjectURL(a)
};
goog.fs.url.revokeObjectUrl = function(a) {
    goog.fs.url.getUrlObject_().revokeObjectURL(a)
};
goog.fs.url.getUrlObject_ = function() {
    var a = goog.fs.url.findUrlObject_();
    if (null != a) return a;
    throw Error("This browser doesn't seem to support blob URLs");
};
goog.fs.url.findUrlObject_ = function() {
    return void 0 !== goog.global.URL && void 0 !== goog.global.URL.createObjectURL ? goog.global.URL : void 0 !== goog.global.webkitURL && void 0 !== goog.global.webkitURL.createObjectURL ? goog.global.webkitURL : void 0 !== goog.global.createObjectURL ? goog.global : null
};
goog.fs.url.browserSupportsObjectUrls = function() {
    return null != goog.fs.url.findUrlObject_()
};
goog.i18n = {};
goog.i18n.bidi = {};
goog.i18n.bidi.FORCE_RTL = !1;
goog.i18n.bidi.IS_RTL = goog.i18n.bidi.FORCE_RTL || ("ar" == goog.LOCALE.substring(0, 2).toLowerCase() || "fa" == goog.LOCALE.substring(0, 2).toLowerCase() || "he" == goog.LOCALE.substring(0, 2).toLowerCase() || "iw" == goog.LOCALE.substring(0, 2).toLowerCase() || "ps" == goog.LOCALE.substring(0, 2).toLowerCase() || "sd" == goog.LOCALE.substring(0, 2).toLowerCase() || "ug" == goog.LOCALE.substring(0, 2).toLowerCase() || "ur" == goog.LOCALE.substring(0, 2).toLowerCase() || "yi" == goog.LOCALE.substring(0, 2).toLowerCase()) && (2 == goog.LOCALE.length ||
    "-" == goog.LOCALE.substring(2, 3) || "_" == goog.LOCALE.substring(2, 3)) || 3 <= goog.LOCALE.length && "ckb" == goog.LOCALE.substring(0, 3).toLowerCase() && (3 == goog.LOCALE.length || "-" == goog.LOCALE.substring(3, 4) || "_" == goog.LOCALE.substring(3, 4)) || 7 <= goog.LOCALE.length && ("-" == goog.LOCALE.substring(2, 3) || "_" == goog.LOCALE.substring(2, 3)) && ("adlm" == goog.LOCALE.substring(3, 7).toLowerCase() || "arab" == goog.LOCALE.substring(3, 7).toLowerCase() || "hebr" == goog.LOCALE.substring(3, 7).toLowerCase() || "nkoo" == goog.LOCALE.substring(3,
    7).toLowerCase() || "rohg" == goog.LOCALE.substring(3, 7).toLowerCase() || "thaa" == goog.LOCALE.substring(3, 7).toLowerCase()) || 8 <= goog.LOCALE.length && ("-" == goog.LOCALE.substring(3, 4) || "_" == goog.LOCALE.substring(3, 4)) && ("adlm" == goog.LOCALE.substring(4, 8).toLowerCase() || "arab" == goog.LOCALE.substring(4, 8).toLowerCase() || "hebr" == goog.LOCALE.substring(4, 8).toLowerCase() || "nkoo" == goog.LOCALE.substring(4, 8).toLowerCase() || "rohg" == goog.LOCALE.substring(4, 8).toLowerCase() || "thaa" == goog.LOCALE.substring(4, 8).toLowerCase());
goog.i18n.bidi.Format = {
    LRE: "\u202a",
    RLE: "\u202b",
    PDF: "\u202c",
    LRM: "\u200e",
    RLM: "\u200f"
};
goog.i18n.bidi.Dir = {
    LTR: 1,
    RTL: -1,
    NEUTRAL: 0
};
goog.i18n.bidi.RIGHT = "right";
goog.i18n.bidi.LEFT = "left";
goog.i18n.bidi.I18N_RIGHT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.LEFT : goog.i18n.bidi.RIGHT;
goog.i18n.bidi.I18N_LEFT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT;
goog.i18n.bidi.toDir = function(a, b) {
    return "number" == typeof a ? 0 < a ? goog.i18n.bidi.Dir.LTR : 0 > a ? goog.i18n.bidi.Dir.RTL : b ? null : goog.i18n.bidi.Dir.NEUTRAL : null == a ? null : a ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR
};
goog.i18n.bidi.ltrChars_ = "A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0900-\u1fff\u200e\u2c00-\ud801\ud804-\ud839\ud83c-\udbff\uf900-\ufb1c\ufe00-\ufe6f\ufefd-\uffff";
goog.i18n.bidi.rtlChars_ = "\u0591-\u06ef\u06fa-\u08ff\u200f\ud802-\ud803\ud83a-\ud83b\ufb1d-\ufdff\ufe70-\ufefc";
goog.i18n.bidi.htmlSkipReg_ = /<[^>]*>|&[^;]+;/g;
goog.i18n.bidi.stripHtmlIfNeeded_ = function(a, b) {
    return b ? a.replace(goog.i18n.bidi.htmlSkipReg_, "") : a
};
goog.i18n.bidi.rtlCharReg_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.ltrCharReg_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.hasAnyRtl = function(a, b) {
    return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
};
goog.i18n.bidi.hasRtlChar = goog.i18n.bidi.hasAnyRtl;
goog.i18n.bidi.hasAnyLtr = function(a, b) {
    return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
};
goog.i18n.bidi.ltrRe_ = new RegExp("^[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.rtlRe_ = new RegExp("^[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.isRtlChar = function(a) {
    return goog.i18n.bidi.rtlRe_.test(a)
};
goog.i18n.bidi.isLtrChar = function(a) {
    return goog.i18n.bidi.ltrRe_.test(a)
};
goog.i18n.bidi.isNeutralChar = function(a) {
    return !goog.i18n.bidi.isLtrChar(a) && !goog.i18n.bidi.isRtlChar(a)
};
goog.i18n.bidi.ltrDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.rtlChars_ + "]*[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.rtlDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.ltrChars_ + "]*[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.startsWithRtl = function(a, b) {
    return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
};
goog.i18n.bidi.isRtlText = goog.i18n.bidi.startsWithRtl;
goog.i18n.bidi.startsWithLtr = function(a, b) {
    return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
};
goog.i18n.bidi.isLtrText = goog.i18n.bidi.startsWithLtr;
goog.i18n.bidi.isRequiredLtrRe_ = /^http:\/\/.*/;
goog.i18n.bidi.isNeutralText = function(a, b) {
    a = goog.i18n.bidi.stripHtmlIfNeeded_(a, b);
    return goog.i18n.bidi.isRequiredLtrRe_.test(a) || !goog.i18n.bidi.hasAnyLtr(a) && !goog.i18n.bidi.hasAnyRtl(a)
};
goog.i18n.bidi.ltrExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "][^" + goog.i18n.bidi.rtlChars_ + "]*$");
goog.i18n.bidi.rtlExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "][^" + goog.i18n.bidi.ltrChars_ + "]*$");
goog.i18n.bidi.endsWithLtr = function(a, b) {
    return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
};
goog.i18n.bidi.isLtrExitText = goog.i18n.bidi.endsWithLtr;
goog.i18n.bidi.endsWithRtl = function(a, b) {
    return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
};
goog.i18n.bidi.isRtlExitText = goog.i18n.bidi.endsWithRtl;
goog.i18n.bidi.rtlLocalesRe_ = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
goog.i18n.bidi.isRtlLanguage = function(a) {
    return goog.i18n.bidi.rtlLocalesRe_.test(a)
};
goog.i18n.bidi.bracketGuardTextRe_ = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g;
goog.i18n.bidi.guardBracketInText = function(a, b) {
    var c = (void 0 === b ? goog.i18n.bidi.hasAnyRtl(a) : b) ? goog.i18n.bidi.Format.RLM : goog.i18n.bidi.Format.LRM;
    return a.replace(goog.i18n.bidi.bracketGuardTextRe_, c + "$&" + c)
};
goog.i18n.bidi.enforceRtlInHtml = function(a) {
    return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=rtl") : "\n<span dir=rtl>" + a + "</span>"
};
goog.i18n.bidi.enforceRtlInText = function(a) {
    return goog.i18n.bidi.Format.RLE + a + goog.i18n.bidi.Format.PDF
};
goog.i18n.bidi.enforceLtrInHtml = function(a) {
    return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=ltr") : "\n<span dir=ltr>" + a + "</span>"
};
goog.i18n.bidi.enforceLtrInText = function(a) {
    return goog.i18n.bidi.Format.LRE + a + goog.i18n.bidi.Format.PDF
};
goog.i18n.bidi.dimensionsRe_ = /:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;
goog.i18n.bidi.leftRe_ = /left/gi;
goog.i18n.bidi.rightRe_ = /right/gi;
goog.i18n.bidi.tempRe_ = /%%%%/g;
goog.i18n.bidi.mirrorCSS = function(a) {
    return a.replace(goog.i18n.bidi.dimensionsRe_, ":$1 $4 $3 $2").replace(goog.i18n.bidi.leftRe_, "%%%%").replace(goog.i18n.bidi.rightRe_, goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_, goog.i18n.bidi.RIGHT)
};
goog.i18n.bidi.doubleQuoteSubstituteRe_ = /([\u0591-\u05f2])"/g;
goog.i18n.bidi.singleQuoteSubstituteRe_ = /([\u0591-\u05f2])'/g;
goog.i18n.bidi.normalizeHebrewQuote = function(a) {
    return a.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_, "$1\u05f4").replace(goog.i18n.bidi.singleQuoteSubstituteRe_, "$1\u05f3")
};
goog.i18n.bidi.wordSeparatorRe_ = /\s+/;
goog.i18n.bidi.hasNumeralsRe_ = /[\d\u06f0-\u06f9]/;
goog.i18n.bidi.rtlDetectionThreshold_ = .4;
goog.i18n.bidi.estimateDirection = function(a, b) {
    for (var c = 0, d = 0, e = !1, f = goog.i18n.bidi.stripHtmlIfNeeded_(a, b).split(goog.i18n.bidi.wordSeparatorRe_), g = 0; g < f.length; g++) {
        var h = f[g];
        goog.i18n.bidi.startsWithRtl(h) ? (c++, d++) : goog.i18n.bidi.isRequiredLtrRe_.test(h) ? e = !0 : goog.i18n.bidi.hasAnyLtr(h) ? d++ : goog.i18n.bidi.hasNumeralsRe_.test(h) && (e = !0)
    }
    return 0 == d ? e ? goog.i18n.bidi.Dir.LTR : goog.i18n.bidi.Dir.NEUTRAL : c / d > goog.i18n.bidi.rtlDetectionThreshold_ ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR
};
goog.i18n.bidi.detectRtlDirectionality = function(a, b) {
    return goog.i18n.bidi.estimateDirection(a, b) == goog.i18n.bidi.Dir.RTL
};
goog.i18n.bidi.setElementDirAndAlign = function(a, b) {
    a && (b = goog.i18n.bidi.toDir(b)) && (a.style.textAlign = b == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT, a.dir = b == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr")
};
goog.i18n.bidi.setElementDirByTextDirectionality = function(a, b) {
    switch (goog.i18n.bidi.estimateDirection(b)) {
        case goog.i18n.bidi.Dir.LTR:
            a.dir = "ltr";
            break;
        case goog.i18n.bidi.Dir.RTL:
            a.dir = "rtl";
            break;
        default:
            a.removeAttribute("dir")
    }
};
goog.i18n.bidi.DirectionalString = function() {};
goog.html.TrustedResourceUrl = function(a, b) {
    this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = a === goog.html.TrustedResourceUrl.CONSTRUCTOR_TOKEN_PRIVATE_ && b || "";
    this.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
};
goog.html.TrustedResourceUrl.prototype.implementsGoogStringTypedString = !0;
goog.html.TrustedResourceUrl.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_.toString()
};
goog.html.TrustedResourceUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.TrustedResourceUrl.prototype.getDirection = function() {
    return goog.i18n.bidi.Dir.LTR
};
goog.html.TrustedResourceUrl.prototype.cloneWithParams = function(a, b) {
    var c = goog.html.TrustedResourceUrl.unwrap(this);
    c = goog.html.TrustedResourceUrl.URL_PARAM_PARSER_.exec(c);
    var d = c[3] || "";
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(c[1] + goog.html.TrustedResourceUrl.stringifyParams_("?", c[2] || "", a) + goog.html.TrustedResourceUrl.stringifyParams_("#", d, b))
};
goog.DEBUG && (goog.html.TrustedResourceUrl.prototype.toString = function() {
    return "TrustedResourceUrl{" + this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ + "}"
});
goog.html.TrustedResourceUrl.unwrap = function(a) {
    return goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(a).toString()
};
goog.html.TrustedResourceUrl.unwrapTrustedScriptURL = function(a) {
    if (a instanceof goog.html.TrustedResourceUrl && a.constructor === goog.html.TrustedResourceUrl && a.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_;
    goog.asserts.fail("expected object of type TrustedResourceUrl, got '" + a + "' of type " + goog.typeOf(a));
    return "type_error:TrustedResourceUrl"
};
goog.html.TrustedResourceUrl.format = function(a, b) {
    var c = goog.string.Const.unwrap(a);
    if (!goog.html.TrustedResourceUrl.BASE_URL_.test(c)) throw Error("Invalid TrustedResourceUrl format: " + c);
    var d = c.replace(goog.html.TrustedResourceUrl.FORMAT_MARKER_, function(a, d) {
        if (!Object.prototype.hasOwnProperty.call(b, d)) throw Error('Found marker, "' + d + '", in format string, "' + c + '", but no valid label mapping found in args: ' + JSON.stringify(b));
        var e = b[d];
        return e instanceof goog.string.Const ? goog.string.Const.unwrap(e) :
            encodeURIComponent(String(e))
    });
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(d)
};
goog.html.TrustedResourceUrl.FORMAT_MARKER_ = /%{(\w+)}/g;
goog.html.TrustedResourceUrl.BASE_URL_ = /^((https:)?\/\/[0-9a-z.:[\]-]+\/|\/[^/\\]|[^:/\\%]+\/|[^:/\\%]*[?#]|about:blank#)/i;
goog.html.TrustedResourceUrl.URL_PARAM_PARSER_ = /^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/;
goog.html.TrustedResourceUrl.formatWithParams = function(a, b, c, d) {
    return goog.html.TrustedResourceUrl.format(a, b).cloneWithParams(c, d)
};
goog.html.TrustedResourceUrl.fromConstant = function(a) {
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a))
};
goog.html.TrustedResourceUrl.fromConstants = function(a) {
    for (var b = "", c = 0; c < a.length; c++) b += goog.string.Const.unwrap(a[c]);
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse = function(a) {
    a = goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY ? goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createScriptURL(a) : a;
    return new goog.html.TrustedResourceUrl(goog.html.TrustedResourceUrl.CONSTRUCTOR_TOKEN_PRIVATE_, a)
};
goog.html.TrustedResourceUrl.stringifyParams_ = function(a, b, c) {
    if (null == c) return b;
    if ("string" === typeof c) return c ? a + encodeURIComponent(c) : "";
    for (var d in c) {
        var e = c[d];
        e = goog.isArray(e) ? e : [e];
        for (var f = 0; f < e.length; f++) {
            var g = e[f];
            null != g && (b || (b = a), b += (b.length > a.length ? "&" : "") + encodeURIComponent(d) + "=" + encodeURIComponent(String(g)))
        }
    }
    return b
};
goog.html.TrustedResourceUrl.CONSTRUCTOR_TOKEN_PRIVATE_ = {};
goog.html.SafeUrl = function(a, b) {
    this.privateDoNotAccessOrElseSafeUrlWrappedValue_ = a === goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_ && b || "";
    this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
};
goog.html.SafeUrl.INNOCUOUS_STRING = "about:invalid#zClosurez";
goog.html.SafeUrl.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeUrl.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeUrlWrappedValue_.toString()
};
goog.html.SafeUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.SafeUrl.prototype.getDirection = function() {
    return goog.i18n.bidi.Dir.LTR
};
goog.DEBUG && (goog.html.SafeUrl.prototype.toString = function() {
    return "SafeUrl{" + this.privateDoNotAccessOrElseSafeUrlWrappedValue_ + "}"
});
goog.html.SafeUrl.unwrap = function(a) {
    if (a instanceof goog.html.SafeUrl && a.constructor === goog.html.SafeUrl && a.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeUrlWrappedValue_;
    goog.asserts.fail("expected object of type SafeUrl, got '" + a + "' of type " + goog.typeOf(a));
    return "type_error:SafeUrl"
};
goog.html.SafeUrl.fromConstant = function(a) {
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a))
};
goog.html.SAFE_MIME_TYPE_PATTERN_ = /^(?:audio\/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-wav|wav|webm)|image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|text\/csv|video\/(?:mpeg|mp4|ogg|webm|quicktime))(?:;\w+=(?:\w+|"[\w;=]+"))*$/i;
goog.html.SafeUrl.isSafeMimeType = function(a) {
    return goog.html.SAFE_MIME_TYPE_PATTERN_.test(a)
};
goog.html.SafeUrl.fromBlob = function(a) {
    a = goog.html.SAFE_MIME_TYPE_PATTERN_.test(a.type) ? goog.fs.url.createObjectUrl(a) : goog.html.SafeUrl.INNOCUOUS_STRING;
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.DATA_URL_PATTERN_ = /^data:([^,]*);base64,[a-z0-9+\/]+=*$/i;
goog.html.SafeUrl.fromDataUrl = function(a) {
    a = a.replace(/(%0A|%0D)/g, "");
    var b = a.match(goog.html.DATA_URL_PATTERN_);
    b = b && goog.html.SAFE_MIME_TYPE_PATTERN_.test(b[1]);
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b ? a : goog.html.SafeUrl.INNOCUOUS_STRING)
};
goog.html.SafeUrl.fromTelUrl = function(a) {
    goog.string.internal.caseInsensitiveStartsWith(a, "tel:") || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.SIP_URL_PATTERN_ = /^sip[s]?:[+a-z0-9_.!$%&'*\/=^`{|}~-]+@([a-z0-9-]+\.)+[a-z0-9]{2,63}$/i;
goog.html.SafeUrl.fromSipUrl = function(a) {
    goog.html.SIP_URL_PATTERN_.test(decodeURIComponent(a)) || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.SafeUrl.fromFacebookMessengerUrl = function(a) {
    goog.string.internal.caseInsensitiveStartsWith(a, "fb-messenger://share") || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.SafeUrl.fromWhatsAppUrl = function(a) {
    goog.string.internal.caseInsensitiveStartsWith(a, "whatsapp://send") || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.SafeUrl.fromSmsUrl = function(a) {
    goog.string.internal.caseInsensitiveStartsWith(a, "sms:") && goog.html.SafeUrl.isSmsUrlBodyValid_(a) || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.SafeUrl.isSmsUrlBodyValid_ = function(a) {
    var b = a.indexOf("#");
    0 < b && (a = a.substring(0, b));
    b = a.match(/[?&]body=/gi);
    if (!b) return !0;
    if (1 < b.length) return !1;
    a = a.match(/[?&]body=([^&]*)/)[1];
    if (!a) return !0;
    try {
        decodeURIComponent(a)
    } catch (c) {
        return !1
    }
    return /^(?:[a-z0-9\-_.~]|%[0-9a-f]{2})+$/i.test(a)
};
goog.html.SafeUrl.fromSshUrl = function(a) {
    goog.string.internal.caseInsensitiveStartsWith(a, "ssh://") || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.SafeUrl.sanitizeChromeExtensionUrl = function(a, b) {
    return goog.html.SafeUrl.sanitizeExtensionUrl_(/^chrome-extension:\/\/([^\/]+)\//, a, b)
};
goog.html.SafeUrl.sanitizeFirefoxExtensionUrl = function(a, b) {
    return goog.html.SafeUrl.sanitizeExtensionUrl_(/^moz-extension:\/\/([^\/]+)\//, a, b)
};
goog.html.SafeUrl.sanitizeEdgeExtensionUrl = function(a, b) {
    return goog.html.SafeUrl.sanitizeExtensionUrl_(/^ms-browser-extension:\/\/([^\/]+)\//, a, b)
};
goog.html.SafeUrl.sanitizeExtensionUrl_ = function(a, b, c) {
    (a = a.exec(b)) ? (a = a[1], -1 == (c instanceof goog.string.Const ? [goog.string.Const.unwrap(c)] : c.map(function(a) {
        return goog.string.Const.unwrap(a)
    })).indexOf(a) && (b = goog.html.SafeUrl.INNOCUOUS_STRING)) : b = goog.html.SafeUrl.INNOCUOUS_STRING;
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.SafeUrl.fromTrustedResourceUrl = function(a) {
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.html.TrustedResourceUrl.unwrap(a))
};
goog.html.SAFE_URL_PATTERN_ = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
goog.html.SafeUrl.SAFE_URL_PATTERN = goog.html.SAFE_URL_PATTERN_;
goog.html.SafeUrl.sanitize = function(a) {
    if (a instanceof goog.html.SafeUrl) return a;
    a = "object" == typeof a && a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
    goog.html.SAFE_URL_PATTERN_.test(a) || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.SafeUrl.sanitizeAssertUnchanged = function(a, b) {
    if (a instanceof goog.html.SafeUrl) return a;
    a = "object" == typeof a && a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
    if (b && /^data:/i.test(a)) {
        var c = goog.html.SafeUrl.fromDataUrl(a);
        if (c.getTypedStringValue() == a) return c
    }
    goog.asserts.assert(goog.html.SAFE_URL_PATTERN_.test(a), "%s does not match the safe URL pattern", a) || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse = function(a) {
    return new goog.html.SafeUrl(goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_, a)
};
goog.html.SafeUrl.ABOUT_BLANK = goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse("about:blank");
goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_ = {};
goog.html.SafeStyle = function() {
    this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = "";
    this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
};
goog.html.SafeStyle.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeStyle.fromConstant = function(a) {
    a = goog.string.Const.unwrap(a);
    if (0 === a.length) return goog.html.SafeStyle.EMPTY;
    goog.asserts.assert(goog.string.internal.endsWith(a, ";"), "Last character of style string is not ';': " + a);
    goog.asserts.assert(goog.string.internal.contains(a, ":"), "Style string must contain at least one ':', to specify a \"name: value\" pair: " + a);
    return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.SafeStyle.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeStyleWrappedValue_
};
goog.DEBUG && (goog.html.SafeStyle.prototype.toString = function() {
    return "SafeStyle{" + this.privateDoNotAccessOrElseSafeStyleWrappedValue_ + "}"
});
goog.html.SafeStyle.unwrap = function(a) {
    if (a instanceof goog.html.SafeStyle && a.constructor === goog.html.SafeStyle && a.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeStyleWrappedValue_;
    goog.asserts.fail("expected object of type SafeStyle, got '" + a + "' of type " + goog.typeOf(a));
    return "type_error:SafeStyle"
};
goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse = function(a) {
    return (new goog.html.SafeStyle).initSecurityPrivateDoNotAccessOrElse_(a)
};
goog.html.SafeStyle.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
    this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = a;
    return this
};
goog.html.SafeStyle.EMPTY = goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse("");
goog.html.SafeStyle.INNOCUOUS_STRING = "zClosurez";
goog.html.SafeStyle.create = function(a) {
    var b = "",
        c;
    for (c in a) {
        if (!/^[-_a-zA-Z0-9]+$/.test(c)) throw Error("Name allows only [-_a-zA-Z0-9], got: " + c);
        var d = a[c];
        null != d && (d = goog.isArray(d) ? goog.array.map(d, goog.html.SafeStyle.sanitizePropertyValue_).join(" ") : goog.html.SafeStyle.sanitizePropertyValue_(d), b += c + ":" + d + ";")
    }
    return b ? goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b) : goog.html.SafeStyle.EMPTY
};
goog.html.SafeStyle.sanitizePropertyValue_ = function(a) {
    if (a instanceof goog.html.SafeUrl) return 'url("' + goog.html.SafeUrl.unwrap(a).replace(/</g, "%3c").replace(/[\\"]/g, "\\$&") + '")';
    a = a instanceof goog.string.Const ? goog.string.Const.unwrap(a) : goog.html.SafeStyle.sanitizePropertyValueString_(String(a));
    if (/[{;}]/.test(a)) throw new goog.asserts.AssertionError("Value does not allow [{;}], got: %s.", [a]);
    return a
};
goog.html.SafeStyle.sanitizePropertyValueString_ = function(a) {
    var b = a.replace(goog.html.SafeStyle.FUNCTIONS_RE_, "$1").replace(goog.html.SafeStyle.FUNCTIONS_RE_, "$1").replace(goog.html.SafeStyle.URL_RE_, "url");
    if (goog.html.SafeStyle.VALUE_RE_.test(b)) {
        if (goog.html.SafeStyle.COMMENT_RE_.test(a)) return goog.asserts.fail("String value disallows comments, got: " + a), goog.html.SafeStyle.INNOCUOUS_STRING;
        if (!goog.html.SafeStyle.hasBalancedQuotes_(a)) return goog.asserts.fail("String value requires balanced quotes, got: " +
            a), goog.html.SafeStyle.INNOCUOUS_STRING;
        if (!goog.html.SafeStyle.hasBalancedSquareBrackets_(a)) return goog.asserts.fail("String value requires balanced square brackets and one identifier per pair of brackets, got: " + a), goog.html.SafeStyle.INNOCUOUS_STRING
    } else return goog.asserts.fail("String value allows only " + goog.html.SafeStyle.VALUE_ALLOWED_CHARS_ + " and simple functions, got: " + a), goog.html.SafeStyle.INNOCUOUS_STRING;
    return goog.html.SafeStyle.sanitizeUrl_(a)
};
goog.html.SafeStyle.hasBalancedQuotes_ = function(a) {
    for (var b = !0, c = !0, d = 0; d < a.length; d++) {
        var e = a.charAt(d);
        "'" == e && c ? b = !b : '"' == e && b && (c = !c)
    }
    return b && c
};
goog.html.SafeStyle.hasBalancedSquareBrackets_ = function(a) {
    for (var b = !0, c = /^[-_a-zA-Z0-9]$/, d = 0; d < a.length; d++) {
        var e = a.charAt(d);
        if ("]" == e) {
            if (b) return !1;
            b = !0
        } else if ("[" == e) {
            if (!b) return !1;
            b = !1
        } else if (!b && !c.test(e)) return !1
    }
    return b
};
goog.html.SafeStyle.VALUE_ALLOWED_CHARS_ = "[-,.\"'%_!# a-zA-Z0-9\\[\\]]";
goog.html.SafeStyle.VALUE_RE_ = new RegExp("^" + goog.html.SafeStyle.VALUE_ALLOWED_CHARS_ + "+$");
goog.html.SafeStyle.URL_RE_ = RegExp("\\b(url\\([ \t\n]*)('[ -&(-\\[\\]-~]*'|\"[ !#-\\[\\]-~]*\"|[!#-&*-\\[\\]-~]*)([ \t\n]*\\))", "g");
goog.html.SafeStyle.ALLOWED_FUNCTIONS_ = "calc cubic-bezier fit-content hsl hsla matrix minmax repeat rgb rgba (rotate|scale|translate)(X|Y|Z|3d)?".split(" ");
goog.html.SafeStyle.FUNCTIONS_RE_ = new RegExp("\\b(" + goog.html.SafeStyle.ALLOWED_FUNCTIONS_.join("|") + ")\\([-+*/0-9a-z.%\\[\\], ]+\\)", "g");
goog.html.SafeStyle.COMMENT_RE_ = /\/\*/;
goog.html.SafeStyle.sanitizeUrl_ = function(a) {
    return a.replace(goog.html.SafeStyle.URL_RE_, function(a, c, d, e) {
        var b = "";
        d = d.replace(/^(['"])(.*)\1$/, function(a, c, d) {
            b = c;
            return d
        });
        a = goog.html.SafeUrl.sanitize(d).getTypedStringValue();
        return c + b + a + b + e
    })
};
goog.html.SafeStyle.concat = function(a) {
    var b = "",
        c = function(a) {
            goog.isArray(a) ? goog.array.forEach(a, c) : b += goog.html.SafeStyle.unwrap(a)
        };
    goog.array.forEach(arguments, c);
    return b ? goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b) : goog.html.SafeStyle.EMPTY
};
goog.html.SafeStyleSheet = function() {
    this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = "";
    this.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
};
goog.html.SafeStyleSheet.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeStyleSheet.createRule = function(a, b) {
    if (goog.string.internal.contains(a, "<")) throw Error("Selector does not allow '<', got: " + a);
    var c = a.replace(/('|")((?!\1)[^\r\n\f\\]|\\[\s\S])*\1/g, "");
    if (!/^[-_a-zA-Z0-9#.:* ,>+~[\]()=^$|]+$/.test(c)) throw Error("Selector allows only [-_a-zA-Z0-9#.:* ,>+~[\\]()=^$|] and strings, got: " + a);
    if (!goog.html.SafeStyleSheet.hasBalancedBrackets_(c)) throw Error("() and [] in selector must be balanced, got: " + a);
    b instanceof goog.html.SafeStyle || (b = goog.html.SafeStyle.create(b));
    c = a + "{" + goog.html.SafeStyle.unwrap(b).replace(/</g, "\\3C ") + "}";
    return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(c)
};
goog.html.SafeStyleSheet.hasBalancedBrackets_ = function(a) {
    for (var b = {
            "(": ")",
            "[": "]"
        }, c = [], d = 0; d < a.length; d++) {
        var e = a[d];
        if (b[e]) c.push(b[e]);
        else if (goog.object.contains(b, e) && c.pop() != e) return !1
    }
    return 0 == c.length
};
goog.html.SafeStyleSheet.concat = function(a) {
    var b = "",
        c = function(a) {
            goog.isArray(a) ? goog.array.forEach(a, c) : b += goog.html.SafeStyleSheet.unwrap(a)
        };
    goog.array.forEach(arguments, c);
    return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.SafeStyleSheet.fromConstant = function(a) {
    a = goog.string.Const.unwrap(a);
    if (0 === a.length) return goog.html.SafeStyleSheet.EMPTY;
    goog.asserts.assert(!goog.string.internal.contains(a, "<"), "Forbidden '<' character in style sheet string: " + a);
    return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.SafeStyleSheet.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_
};
goog.DEBUG && (goog.html.SafeStyleSheet.prototype.toString = function() {
    return "SafeStyleSheet{" + this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ + "}"
});
goog.html.SafeStyleSheet.unwrap = function(a) {
    if (a instanceof goog.html.SafeStyleSheet && a.constructor === goog.html.SafeStyleSheet && a.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;
    goog.asserts.fail("expected object of type SafeStyleSheet, got '" + a + "' of type " + goog.typeOf(a));
    return "type_error:SafeStyleSheet"
};
goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse = function(a) {
    return (new goog.html.SafeStyleSheet).initSecurityPrivateDoNotAccessOrElse_(a)
};
goog.html.SafeStyleSheet.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
    this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = a;
    return this
};
goog.html.SafeStyleSheet.EMPTY = goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse("");
goog.html.SafeHtml = function() {
    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
    this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
    this.dir_ = null
};
goog.html.SafeHtml.ENABLE_ERROR_MESSAGES = goog.DEBUG;
goog.html.SafeHtml.SUPPORT_STYLE_ATTRIBUTE = !0;
goog.html.SafeHtml.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.SafeHtml.prototype.getDirection = function() {
    return this.dir_
};
goog.html.SafeHtml.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeHtml.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_.toString()
};
goog.DEBUG && (goog.html.SafeHtml.prototype.toString = function() {
    return "SafeHtml{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}"
});
goog.html.SafeHtml.unwrap = function(a) {
    return goog.html.SafeHtml.unwrapTrustedHTML(a).toString()
};
goog.html.SafeHtml.unwrapTrustedHTML = function(a) {
    if (a instanceof goog.html.SafeHtml && a.constructor === goog.html.SafeHtml && a.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
    goog.asserts.fail("expected object of type SafeHtml, got '" + a + "' of type " + goog.typeOf(a));
    return "type_error:SafeHtml"
};
goog.html.SafeHtml.htmlEscape = function(a) {
    if (a instanceof goog.html.SafeHtml) return a;
    var b = "object" == typeof a,
        c = null;
    b && a.implementsGoogI18nBidiDirectionalString && (c = a.getDirection());
    a = b && a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.internal.htmlEscape(a), c)
};
goog.html.SafeHtml.htmlEscapePreservingNewlines = function(a) {
    if (a instanceof goog.html.SafeHtml) return a;
    a = goog.html.SafeHtml.htmlEscape(a);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.internal.newLineToBr(goog.html.SafeHtml.unwrap(a)), a.getDirection())
};
goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces = function(a) {
    if (a instanceof goog.html.SafeHtml) return a;
    a = goog.html.SafeHtml.htmlEscape(a);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.internal.whitespaceEscape(goog.html.SafeHtml.unwrap(a)), a.getDirection())
};
goog.html.SafeHtml.from = goog.html.SafeHtml.htmlEscape;
goog.html.SafeHtml.VALID_NAMES_IN_TAG_ = /^[a-zA-Z0-9-]+$/;
goog.html.SafeHtml.URL_ATTRIBUTES_ = {
    action: !0,
    cite: !0,
    data: !0,
    formaction: !0,
    href: !0,
    manifest: !0,
    poster: !0,
    src: !0
};
goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_ = {
    APPLET: !0,
    BASE: !0,
    EMBED: !0,
    IFRAME: !0,
    LINK: !0,
    MATH: !0,
    META: !0,
    OBJECT: !0,
    SCRIPT: !0,
    STYLE: !0,
    SVG: !0,
    TEMPLATE: !0
};
goog.html.SafeHtml.create = function(a, b, c) {
    goog.html.SafeHtml.verifyTagName(String(a));
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(String(a), b, c)
};
goog.html.SafeHtml.verifyTagName = function(a) {
    if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(a)) throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? "Invalid tag name <" + a + ">." : "");
    if (a.toUpperCase() in goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_) throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? "Tag name <" + a + "> is not allowed for SafeHtml." : "");
};
goog.html.SafeHtml.createIframe = function(a, b, c, d) {
    a && goog.html.TrustedResourceUrl.unwrap(a);
    var e = {};
    e.src = a || null;
    e.srcdoc = b && goog.html.SafeHtml.unwrap(b);
    a = goog.html.SafeHtml.combineAttributes(e, {
        sandbox: ""
    }, c);
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", a, d)
};
goog.html.SafeHtml.createSandboxIframe = function(a, b, c, d) {
    if (!goog.html.SafeHtml.canUseSandboxIframe()) throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? "The browser does not support sandboxed iframes." : "");
    var e = {};
    e.src = a ? goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(a)) : null;
    e.srcdoc = b || null;
    e.sandbox = "";
    a = goog.html.SafeHtml.combineAttributes(e, {}, c);
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", a, d)
};
goog.html.SafeHtml.canUseSandboxIframe = function() {
    return goog.global.HTMLIFrameElement && "sandbox" in goog.global.HTMLIFrameElement.prototype
};
goog.html.SafeHtml.createScriptSrc = function(a, b) {
    goog.html.TrustedResourceUrl.unwrap(a);
    var c = goog.html.SafeHtml.combineAttributes({
        src: a
    }, {}, b);
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script", c)
};
goog.html.SafeHtml.createScript = function(a, b) {
    for (var c in b) {
        var d = c.toLowerCase();
        if ("language" == d || "src" == d || "text" == d || "type" == d) throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'Cannot set "' + d + '" attribute' : "");
    }
    c = "";
    a = goog.array.concat(a);
    for (d = 0; d < a.length; d++) c += goog.html.SafeScript.unwrap(a[d]);
    c = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c, goog.i18n.bidi.Dir.NEUTRAL);
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script", b, c)
};
goog.html.SafeHtml.createStyle = function(a, b) {
    var c = goog.html.SafeHtml.combineAttributes({
            type: "text/css"
        }, {}, b),
        d = "";
    a = goog.array.concat(a);
    for (var e = 0; e < a.length; e++) d += goog.html.SafeStyleSheet.unwrap(a[e]);
    d = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(d, goog.i18n.bidi.Dir.NEUTRAL);
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("style", c, d)
};
goog.html.SafeHtml.createMetaRefresh = function(a, b) {
    var c = goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(a));
    (goog.labs.userAgent.browser.isIE() || goog.labs.userAgent.browser.isEdge()) && goog.string.internal.contains(c, ";") && (c = "'" + c.replace(/'/g, "%27") + "'");
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("meta", {
        "http-equiv": "refresh",
        content: (b || 0) + "; url=" + c
    })
};
goog.html.SafeHtml.getAttrNameAndValue_ = function(a, b, c) {
    if (c instanceof goog.string.Const) c = goog.string.Const.unwrap(c);
    else if ("style" == b.toLowerCase())
        if (goog.html.SafeHtml.SUPPORT_STYLE_ATTRIBUTE) c = goog.html.SafeHtml.getStyleValue_(c);
        else throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'Attribute "style" not supported.' : "");
    else {
        if (/^on/i.test(b)) throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'Attribute "' + b + '" requires goog.string.Const value, "' + c + '" given.' : "");
        if (b.toLowerCase() in
            goog.html.SafeHtml.URL_ATTRIBUTES_)
            if (c instanceof goog.html.TrustedResourceUrl) c = goog.html.TrustedResourceUrl.unwrap(c);
            else if (c instanceof goog.html.SafeUrl) c = goog.html.SafeUrl.unwrap(c);
        else if ("string" === typeof c) c = goog.html.SafeUrl.sanitize(c).getTypedStringValue();
        else throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'Attribute "' + b + '" on tag "' + a + '" requires goog.html.SafeUrl, goog.string.Const, or string, value "' + c + '" given.' : "");
    }
    c.implementsGoogStringTypedString && (c = c.getTypedStringValue());
    goog.asserts.assert("string" === typeof c || "number" === typeof c, "String or number value expected, got " + typeof c + " with value: " + c);
    return b + '="' + goog.string.internal.htmlEscape(String(c)) + '"'
};
goog.html.SafeHtml.getStyleValue_ = function(a) {
    if (!goog.isObject(a)) throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof a + " given: " + a : "");
    a instanceof goog.html.SafeStyle || (a = goog.html.SafeStyle.create(a));
    return goog.html.SafeStyle.unwrap(a)
};
goog.html.SafeHtml.createWithDir = function(a, b, c, d) {
    b = goog.html.SafeHtml.create(b, c, d);
    b.dir_ = a;
    return b
};
goog.html.SafeHtml.join = function(a, b) {
    var c = goog.html.SafeHtml.htmlEscape(a),
        d = c.getDirection(),
        e = [],
        f = function(a) {
            goog.isArray(a) ? goog.array.forEach(a, f) : (a = goog.html.SafeHtml.htmlEscape(a), e.push(goog.html.SafeHtml.unwrap(a)), a = a.getDirection(), d == goog.i18n.bidi.Dir.NEUTRAL ? d = a : a != goog.i18n.bidi.Dir.NEUTRAL && d != a && (d = null))
        };
    goog.array.forEach(b, f);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(e.join(goog.html.SafeHtml.unwrap(c)), d)
};
goog.html.SafeHtml.concat = function(a) {
    return goog.html.SafeHtml.join(goog.html.SafeHtml.EMPTY, Array.prototype.slice.call(arguments))
};
goog.html.SafeHtml.concatWithDir = function(a, b) {
    var c = goog.html.SafeHtml.concat(goog.array.slice(arguments, 1));
    c.dir_ = a;
    return c
};
goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse = function(a, b) {
    return (new goog.html.SafeHtml).initSecurityPrivateDoNotAccessOrElse_(a, b)
};
goog.html.SafeHtml.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a, b) {
    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY ? goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createHTML(a) : a;
    this.dir_ = b;
    return this
};
goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse = function(a, b, c) {
    var d = null;
    var e = "<" + a + goog.html.SafeHtml.stringifyAttributes(a, b);
    null == c ? c = [] : goog.isArray(c) || (c = [c]);
    goog.dom.tags.isVoidTag(a.toLowerCase()) ? (goog.asserts.assert(!c.length, "Void tag <" + a + "> does not allow content."), e += ">") : (d = goog.html.SafeHtml.concat(c), e += ">" + goog.html.SafeHtml.unwrap(d) + "</" + a + ">", d = d.getDirection());
    (a = b && b.dir) && (d = /^(ltr|rtl|auto)$/i.test(a) ? goog.i18n.bidi.Dir.NEUTRAL : null);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(e,
        d)
};
goog.html.SafeHtml.stringifyAttributes = function(a, b) {
    var c = "";
    if (b)
        for (var d in b) {
            if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(d)) throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'Invalid attribute name "' + d + '".' : "");
            var e = b[d];
            null != e && (c += " " + goog.html.SafeHtml.getAttrNameAndValue_(a, d, e))
        }
    return c
};
goog.html.SafeHtml.combineAttributes = function(a, b, c) {
    var d = {},
        e;
    for (e in a) goog.asserts.assert(e.toLowerCase() == e, "Must be lower case"), d[e] = a[e];
    for (e in b) goog.asserts.assert(e.toLowerCase() == e, "Must be lower case"), d[e] = b[e];
    if (c)
        for (e in c) {
            var f = e.toLowerCase();
            if (f in a) throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'Cannot override "' + f + '" attribute, got "' + e + '" with value "' + c[e] + '"' : "");
            f in b && delete d[f];
            d[e] = c[e]
        }
    return d
};
goog.html.SafeHtml.DOCTYPE_HTML = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<!DOCTYPE html>", goog.i18n.bidi.Dir.NEUTRAL);
goog.html.SafeHtml.EMPTY = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("", goog.i18n.bidi.Dir.NEUTRAL);
goog.html.SafeHtml.BR = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<br>", goog.i18n.bidi.Dir.NEUTRAL);
goog.html.uncheckedconversions = {};
goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract = function(a, b, c) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(b, c || null)
};
goog.html.uncheckedconversions.safeScriptFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.uncheckedconversions.safeStyleFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.uncheckedconversions.safeStyleSheetFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.uncheckedconversions.trustedResourceUrlFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b)
};
goog.dom.safe = {};
goog.dom.safe.InsertAdjacentHtmlPosition = {
    AFTERBEGIN: "afterbegin",
    AFTEREND: "afterend",
    BEFOREBEGIN: "beforebegin",
    BEFOREEND: "beforeend"
};
goog.dom.safe.insertAdjacentHtml = function(a, b, c) {
    a.insertAdjacentHTML(b, goog.html.SafeHtml.unwrapTrustedHTML(c))
};
goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_ = {
    MATH: !0,
    SCRIPT: !0,
    STYLE: !0,
    SVG: !0,
    TEMPLATE: !0
};
goog.dom.safe.isInnerHtmlCleanupRecursive_ = goog.functions.cacheReturnValue(function() {
    if (goog.DEBUG && "undefined" === typeof document) return !1;
    var a = document.createElement("div"),
        b = document.createElement("div");
    b.appendChild(document.createElement("div"));
    a.appendChild(b);
    if (goog.DEBUG && !a.firstChild) return !1;
    b = a.firstChild.firstChild;
    a.innerHTML = goog.html.SafeHtml.unwrapTrustedHTML(goog.html.SafeHtml.EMPTY);
    return !b.parentElement
});
goog.dom.safe.unsafeSetInnerHtmlDoNotUseOrElse = function(a, b) {
    if (goog.dom.safe.isInnerHtmlCleanupRecursive_())
        for (; a.lastChild;) a.removeChild(a.lastChild);
    a.innerHTML = goog.html.SafeHtml.unwrapTrustedHTML(b)
};
goog.dom.safe.setInnerHtml = function(a, b) {
    if (goog.asserts.ENABLE_ASSERTS) {
        var c = a.tagName.toUpperCase();
        if (goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_[c]) throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of " + a.tagName + ".");
    }
    goog.dom.safe.unsafeSetInnerHtmlDoNotUseOrElse(a, b)
};
goog.dom.safe.setOuterHtml = function(a, b) {
    a.outerHTML = goog.html.SafeHtml.unwrapTrustedHTML(b)
};
goog.dom.safe.setFormElementAction = function(a, b) {
    var c = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
    goog.dom.asserts.assertIsHTMLFormElement(a).action = goog.html.SafeUrl.unwrap(c)
};
goog.dom.safe.setButtonFormAction = function(a, b) {
    var c = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
    goog.dom.asserts.assertIsHTMLButtonElement(a).formAction = goog.html.SafeUrl.unwrap(c)
};
goog.dom.safe.setInputFormAction = function(a, b) {
    var c = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
    goog.dom.asserts.assertIsHTMLInputElement(a).formAction = goog.html.SafeUrl.unwrap(c)
};
goog.dom.safe.setStyle = function(a, b) {
    a.style.cssText = goog.html.SafeStyle.unwrap(b)
};
goog.dom.safe.documentWrite = function(a, b) {
    a.write(goog.html.SafeHtml.unwrapTrustedHTML(b))
};
goog.dom.safe.setAnchorHref = function(a, b) {
    goog.dom.asserts.assertIsHTMLAnchorElement(a);
    var c = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
    a.href = goog.html.SafeUrl.unwrap(c)
};
goog.dom.safe.setImageSrc = function(a, b) {
    goog.dom.asserts.assertIsHTMLImageElement(a);
    if (b instanceof goog.html.SafeUrl) var c = b;
    else c = /^data:image\//i.test(b), c = goog.html.SafeUrl.sanitizeAssertUnchanged(b, c);
    a.src = goog.html.SafeUrl.unwrap(c)
};
goog.dom.safe.setAudioSrc = function(a, b) {
    goog.dom.asserts.assertIsHTMLAudioElement(a);
    if (b instanceof goog.html.SafeUrl) var c = b;
    else c = /^data:audio\//i.test(b), c = goog.html.SafeUrl.sanitizeAssertUnchanged(b, c);
    a.src = goog.html.SafeUrl.unwrap(c)
};
goog.dom.safe.setVideoSrc = function(a, b) {
    goog.dom.asserts.assertIsHTMLVideoElement(a);
    if (b instanceof goog.html.SafeUrl) var c = b;
    else c = /^data:video\//i.test(b), c = goog.html.SafeUrl.sanitizeAssertUnchanged(b, c);
    a.src = goog.html.SafeUrl.unwrap(c)
};
goog.dom.safe.setEmbedSrc = function(a, b) {
    goog.dom.asserts.assertIsHTMLEmbedElement(a);
    a.src = goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(b)
};
goog.dom.safe.setFrameSrc = function(a, b) {
    goog.dom.asserts.assertIsHTMLFrameElement(a);
    a.src = goog.html.TrustedResourceUrl.unwrap(b)
};
goog.dom.safe.setIframeSrc = function(a, b) {
    goog.dom.asserts.assertIsHTMLIFrameElement(a);
    a.src = goog.html.TrustedResourceUrl.unwrap(b)
};
goog.dom.safe.setIframeSrcdoc = function(a, b) {
    goog.dom.asserts.assertIsHTMLIFrameElement(a);
    a.srcdoc = goog.html.SafeHtml.unwrapTrustedHTML(b)
};
goog.dom.safe.setLinkHrefAndRel = function(a, b, c) {
    goog.dom.asserts.assertIsHTMLLinkElement(a);
    a.rel = c;
    goog.string.internal.caseInsensitiveContains(c, "stylesheet") ? (goog.asserts.assert(b instanceof goog.html.TrustedResourceUrl, 'URL must be TrustedResourceUrl because "rel" contains "stylesheet"'), a.href = goog.html.TrustedResourceUrl.unwrap(b)) : a.href = b instanceof goog.html.TrustedResourceUrl ? goog.html.TrustedResourceUrl.unwrap(b) : b instanceof goog.html.SafeUrl ? goog.html.SafeUrl.unwrap(b) : goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitizeAssertUnchanged(b))
};
goog.dom.safe.setObjectData = function(a, b) {
    goog.dom.asserts.assertIsHTMLObjectElement(a);
    a.data = goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(b)
};
goog.dom.safe.setScriptSrc = function(a, b) {
    goog.dom.asserts.assertIsHTMLScriptElement(a);
    a.src = goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(b);
    var c = goog.getScriptNonce();
    c && a.setAttribute("nonce", c)
};
goog.dom.safe.setScriptContent = function(a, b) {
    goog.dom.asserts.assertIsHTMLScriptElement(a);
    a.text = goog.html.SafeScript.unwrapTrustedScript(b);
    var c = goog.getScriptNonce();
    c && a.setAttribute("nonce", c)
};
goog.dom.safe.setLocationHref = function(a, b) {
    goog.dom.asserts.assertIsLocation(a);
    var c = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
    a.href = goog.html.SafeUrl.unwrap(c)
};
goog.dom.safe.assignLocation = function(a, b) {
    goog.dom.asserts.assertIsLocation(a);
    var c = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
    a.assign(goog.html.SafeUrl.unwrap(c))
};
goog.dom.safe.replaceLocation = function(a, b) {
    goog.dom.asserts.assertIsLocation(a);
    var c = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
    a.replace(goog.html.SafeUrl.unwrap(c))
};
goog.dom.safe.openInWindow = function(a, b, c, d, e) {
    a = a instanceof goog.html.SafeUrl ? a : goog.html.SafeUrl.sanitizeAssertUnchanged(a);
    return (b || goog.global).open(goog.html.SafeUrl.unwrap(a), c ? goog.string.Const.unwrap(c) : "", d, e)
};
goog.dom.safe.parseFromStringHtml = function(a, b) {
    return goog.dom.safe.parseFromString(a, b, "text/html")
};
goog.dom.safe.parseFromString = function(a, b, c) {
    return a.parseFromString(goog.html.SafeHtml.unwrapTrustedHTML(b), c)
};
goog.dom.safe.createImageFromBlob = function(a) {
    if (!/^image\/.*/g.test(a.type)) throw Error("goog.dom.safe.createImageFromBlob only accepts MIME type image/.*.");
    var b = goog.global.URL.createObjectURL(a);
    a = new goog.global.Image;
    a.onload = function() {
        goog.global.URL.revokeObjectURL(b)
    };
    goog.dom.safe.setImageSrc(a, goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Image blob URL."), b));
    return a
};
goog.string.DETECT_DOUBLE_ESCAPING = !1;
goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1;
goog.string.Unicode = {
    NBSP: "\u00a0"
};
goog.string.startsWith = goog.string.internal.startsWith;
goog.string.endsWith = goog.string.internal.endsWith;
goog.string.caseInsensitiveStartsWith = goog.string.internal.caseInsensitiveStartsWith;
goog.string.caseInsensitiveEndsWith = goog.string.internal.caseInsensitiveEndsWith;
goog.string.caseInsensitiveEquals = goog.string.internal.caseInsensitiveEquals;
goog.string.subs = function(a, b) {
    for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length;) d += c.shift() + e.shift();
    return d + c.join("%s")
};
goog.string.collapseWhitespace = function(a) {
    return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmptyOrWhitespace = goog.string.internal.isEmptyOrWhitespace;
goog.string.isEmptyString = function(a) {
    return 0 == a.length
};
goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
goog.string.isEmptyOrWhitespaceSafe = function(a) {
    return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(a))
};
goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
goog.string.isBreakingWhitespace = function(a) {
    return !/[^\t\n\r ]/.test(a)
};
goog.string.isAlpha = function(a) {
    return !/[^a-zA-Z]/.test(a)
};
goog.string.isNumeric = function(a) {
    return !/[^0-9]/.test(a)
};
goog.string.isAlphaNumeric = function(a) {
    return !/[^a-zA-Z0-9]/.test(a)
};
goog.string.isSpace = function(a) {
    return " " == a
};
goog.string.isUnicodeChar = function(a) {
    return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a
};
goog.string.stripNewlines = function(a) {
    return a.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function(a) {
    return a.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function(a) {
    return a.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function(a) {
    return a.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.collapseBreakingSpaces = function(a) {
    return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
};
goog.string.trim = goog.string.internal.trim;
goog.string.trimLeft = function(a) {
    return a.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function(a) {
    return a.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = goog.string.internal.caseInsensitiveCompare;
goog.string.numberAwareCompare_ = function(a, b, c) {
    if (a == b) return 0;
    if (!a) return -1;
    if (!b) return 1;
    for (var d = a.toLowerCase().match(c), e = b.toLowerCase().match(c), f = Math.min(d.length, e.length), g = 0; g < f; g++) {
        c = d[g];
        var h = e[g];
        if (c != h) return a = parseInt(c, 10), !isNaN(a) && (b = parseInt(h, 10), !isNaN(b) && a - b) ? a - b : c < h ? -1 : 1
    }
    return d.length != e.length ? d.length - e.length : a < b ? -1 : 1
};
goog.string.intAwareCompare = function(a, b) {
    return goog.string.numberAwareCompare_(a, b, /\d+|\D+/g)
};
goog.string.floatAwareCompare = function(a, b) {
    return goog.string.numberAwareCompare_(a, b, /\d+|\.\d+|\D+/g)
};
goog.string.numerateCompare = goog.string.floatAwareCompare;
goog.string.urlEncode = function(a) {
    return encodeURIComponent(String(a))
};
goog.string.urlDecode = function(a) {
    return decodeURIComponent(a.replace(/\+/g, " "))
};
goog.string.newLineToBr = goog.string.internal.newLineToBr;
goog.string.htmlEscape = function(a, b) {
    a = goog.string.internal.htmlEscape(a, b);
    goog.string.DETECT_DOUBLE_ESCAPING && (a = a.replace(goog.string.E_RE_, "&#101;"));
    return a
};
goog.string.E_RE_ = /e/g;
goog.string.unescapeEntities = function(a) {
    return goog.string.contains(a, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a
};
goog.string.unescapeEntitiesWithDocument = function(a, b) {
    return goog.string.contains(a, "&") ? goog.string.unescapeEntitiesUsingDom_(a, b) : a
};
goog.string.unescapeEntitiesUsingDom_ = function(a, b) {
    var c = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"'
    };
    var d = b ? b.createElement("div") : goog.global.document.createElement("div");
    return a.replace(goog.string.HTML_ENTITY_PATTERN_, function(a, b) {
        var e = c[a];
        if (e) return e;
        if ("#" == b.charAt(0)) {
            var f = Number("0" + b.substr(1));
            isNaN(f) || (e = String.fromCharCode(f))
        }
        e || (goog.dom.safe.setInnerHtml(d, goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Single HTML entity."),
            a + " ")), e = d.firstChild.nodeValue.slice(0, -1));
        return c[a] = e
    })
};
goog.string.unescapePureXmlEntities_ = function(a) {
    return a.replace(/&([^;]+);/g, function(a, c) {
        switch (c) {
            case "amp":
                return "&";
            case "lt":
                return "<";
            case "gt":
                return ">";
            case "quot":
                return '"';
            default:
                if ("#" == c.charAt(0)) {
                    var b = Number("0" + c.substr(1));
                    if (!isNaN(b)) return String.fromCharCode(b)
                }
                return a
        }
    })
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(a, b) {
    return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b)
};
goog.string.preserveSpaces = function(a) {
    return a.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP)
};
goog.string.stripQuotes = function(a, b) {
    for (var c = b.length, d = 0; d < c; d++) {
        var e = 1 == c ? b : b.charAt(d);
        if (a.charAt(0) == e && a.charAt(a.length - 1) == e) return a.substring(1, a.length - 1)
    }
    return a
};
goog.string.truncate = function(a, b, c) {
    c && (a = goog.string.unescapeEntities(a));
    a.length > b && (a = a.substring(0, b - 3) + "...");
    c && (a = goog.string.htmlEscape(a));
    return a
};
goog.string.truncateMiddle = function(a, b, c, d) {
    c && (a = goog.string.unescapeEntities(a));
    if (d && a.length > b) {
        d > b && (d = b);
        var e = a.length - d;
        a = a.substring(0, b - d) + "..." + a.substring(e)
    } else a.length > b && (d = Math.floor(b / 2), e = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(e));
    c && (a = goog.string.htmlEscape(a));
    return a
};
goog.string.specialEscapeChars_ = {
    "\x00": "\\0",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "\t": "\\t",
    "\x0B": "\\x0B",
    '"': '\\"',
    "\\": "\\\\",
    "<": "\\u003C"
};
goog.string.jsEscapeCache_ = {
    "'": "\\'"
};
goog.string.quote = function(a) {
    a = String(a);
    for (var b = ['"'], c = 0; c < a.length; c++) {
        var d = a.charAt(c),
            e = d.charCodeAt(0);
        b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d))
    }
    b.push('"');
    return b.join("")
};
goog.string.escapeString = function(a) {
    for (var b = [], c = 0; c < a.length; c++) b[c] = goog.string.escapeChar(a.charAt(c));
    return b.join("")
};
goog.string.escapeChar = function(a) {
    if (a in goog.string.jsEscapeCache_) return goog.string.jsEscapeCache_[a];
    if (a in goog.string.specialEscapeChars_) return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a];
    var b = a.charCodeAt(0);
    if (31 < b && 127 > b) var c = a;
    else {
        if (256 > b) {
            if (c = "\\x", 16 > b || 256 < b) c += "0"
        } else c = "\\u", 4096 > b && (c += "0");
        c += b.toString(16).toUpperCase()
    }
    return goog.string.jsEscapeCache_[a] = c
};
goog.string.contains = goog.string.internal.contains;
goog.string.caseInsensitiveContains = goog.string.internal.caseInsensitiveContains;
goog.string.countOf = function(a, b) {
    return a && b ? a.split(b).length - 1 : 0
};
goog.string.removeAt = function(a, b, c) {
    var d = a;
    0 <= b && b < a.length && 0 < c && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
    return d
};
goog.string.remove = function(a, b) {
    return a.replace(b, "")
};
goog.string.removeAll = function(a, b) {
    var c = new RegExp(goog.string.regExpEscape(b), "g");
    return a.replace(c, "")
};
goog.string.replaceAll = function(a, b, c) {
    b = new RegExp(goog.string.regExpEscape(b), "g");
    return a.replace(b, c.replace(/\$/g, "$$$$"))
};
goog.string.regExpEscape = function(a) {
    return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = String.prototype.repeat ? function(a, b) {
    return a.repeat(b)
} : function(a, b) {
    return Array(b + 1).join(a)
};
goog.string.padNumber = function(a, b, c) {
    a = void 0 !== c ? a.toFixed(c) : String(a);
    c = a.indexOf("."); - 1 == c && (c = a.length);
    return goog.string.repeat("0", Math.max(0, b - c)) + a
};
goog.string.makeSafe = function(a) {
    return null == a ? "" : String(a)
};
goog.string.buildString = function(a) {
    return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function() {
    return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36)
};
goog.string.compareVersions = goog.string.internal.compareVersions;
goog.string.hashCode = function(a) {
    for (var b = 0, c = 0; c < a.length; ++c) b = 31 * b + a.charCodeAt(c) >>> 0;
    return b
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
    return "goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function(a) {
    var b = Number(a);
    return 0 == b && goog.string.isEmptyOrWhitespace(a) ? NaN : b
};
goog.string.isLowerCamelCase = function(a) {
    return /^[a-z]+([A-Z][a-z]*)*$/.test(a)
};
goog.string.isUpperCamelCase = function(a) {
    return /^([A-Z][a-z]*)+$/.test(a)
};
goog.string.toCamelCase = function(a) {
    return String(a).replace(/\-([a-z])/g, function(a, c) {
        return c.toUpperCase()
    })
};
goog.string.toSelectorCase = function(a) {
    return String(a).replace(/([A-Z])/g, "-$1").toLowerCase()
};
goog.string.toTitleCase = function(a, b) {
    var c = "string" === typeof b ? goog.string.regExpEscape(b) : "\\s";
    return a.replace(new RegExp("(^" + (c ? "|[" + c + "]+" : "") + ")([a-z])", "g"), function(a, b, c) {
        return b + c.toUpperCase()
    })
};
goog.string.capitalize = function(a) {
    return String(a.charAt(0)).toUpperCase() + String(a.substr(1)).toLowerCase()
};
goog.string.parseInt = function(a) {
    isFinite(a) && (a = String(a));
    return "string" === typeof a ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN
};
goog.string.splitLimit = function(a, b, c) {
    a = a.split(b);
    for (var d = []; 0 < c && a.length;) d.push(a.shift()), c--;
    a.length && d.push(a.join(b));
    return d
};
goog.string.lastComponent = function(a, b) {
    if (b) "string" == typeof b && (b = [b]);
    else return a;
    for (var c = -1, d = 0; d < b.length; d++)
        if ("" != b[d]) {
            var e = a.lastIndexOf(b[d]);
            e > c && (c = e)
        }
    return -1 == c ? a : a.slice(c + 1)
};
goog.string.editDistance = function(a, b) {
    var c = [],
        d = [];
    if (a == b) return 0;
    if (!a.length || !b.length) return Math.max(a.length, b.length);
    for (var e = 0; e < b.length + 1; e++) c[e] = e;
    for (e = 0; e < a.length; e++) {
        d[0] = e + 1;
        for (var f = 0; f < b.length; f++) d[f + 1] = Math.min(d[f] + 1, c[f + 1] + 1, c[f] + Number(a[e] != b[f]));
        for (f = 0; f < c.length; f++) c[f] = d[f]
    }
    return d[b.length]
};
goog.labs.userAgent.engine = {};
goog.labs.userAgent.engine.isPresto = function() {
    return goog.labs.userAgent.util.matchUserAgent("Presto")
};
goog.labs.userAgent.engine.isTrident = function() {
    return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE")
};
goog.labs.userAgent.engine.isEdge = function() {
    return goog.labs.userAgent.util.matchUserAgent("Edge")
};
goog.labs.userAgent.engine.isWebKit = function() {
    return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit") && !goog.labs.userAgent.engine.isEdge()
};
goog.labs.userAgent.engine.isGecko = function() {
    return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident() && !goog.labs.userAgent.engine.isEdge()
};
goog.labs.userAgent.engine.getVersion = function() {
    var a = goog.labs.userAgent.util.getUserAgent();
    if (a) {
        a = goog.labs.userAgent.util.extractVersionTuples(a);
        var b = goog.labs.userAgent.engine.getEngineTuple_(a);
        if (b) return "Gecko" == b[0] ? goog.labs.userAgent.engine.getVersionForKey_(a, "Firefox") : b[1];
        a = a[0];
        var c;
        if (a && (c = a[2]) && (c = /Trident\/([^\s;]+)/.exec(c))) return c[1]
    }
    return ""
};
goog.labs.userAgent.engine.getEngineTuple_ = function(a) {
    if (!goog.labs.userAgent.engine.isEdge()) return a[1];
    for (var b = 0; b < a.length; b++) {
        var c = a[b];
        if ("Edge" == c[0]) return c
    }
};
goog.labs.userAgent.engine.isVersionOrHigher = function(a) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), a)
};
goog.labs.userAgent.engine.getVersionForKey_ = function(a, b) {
    var c = goog.array.find(a, function(a) {
        return b == a[0]
    });
    return c && c[1] || ""
};
goog.labs.userAgent.platform = {};
goog.labs.userAgent.platform.isAndroid = function() {
    return goog.labs.userAgent.util.matchUserAgent("Android")
};
goog.labs.userAgent.platform.isIpod = function() {
    return goog.labs.userAgent.util.matchUserAgent("iPod")
};
goog.labs.userAgent.platform.isIphone = function() {
    return goog.labs.userAgent.util.matchUserAgent("iPhone") && !goog.labs.userAgent.util.matchUserAgent("iPod") && !goog.labs.userAgent.util.matchUserAgent("iPad")
};
goog.labs.userAgent.platform.isIpad = function() {
    return goog.labs.userAgent.util.matchUserAgent("iPad")
};
goog.labs.userAgent.platform.isIos = function() {
    return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpad() || goog.labs.userAgent.platform.isIpod()
};
goog.labs.userAgent.platform.isMacintosh = function() {
    return goog.labs.userAgent.util.matchUserAgent("Macintosh")
};
goog.labs.userAgent.platform.isLinux = function() {
    return goog.labs.userAgent.util.matchUserAgent("Linux")
};
goog.labs.userAgent.platform.isWindows = function() {
    return goog.labs.userAgent.util.matchUserAgent("Windows")
};
goog.labs.userAgent.platform.isChromeOS = function() {
    return goog.labs.userAgent.util.matchUserAgent("CrOS")
};
goog.labs.userAgent.platform.isChromecast = function() {
    return goog.labs.userAgent.util.matchUserAgent("CrKey")
};
goog.labs.userAgent.platform.isKaiOS = function() {
    return goog.labs.userAgent.util.matchUserAgentIgnoreCase("KaiOS")
};
goog.labs.userAgent.platform.isGo2Phone = function() {
    return goog.labs.userAgent.util.matchUserAgentIgnoreCase("GAFP")
};
goog.labs.userAgent.platform.getVersion = function() {
    var a = goog.labs.userAgent.util.getUserAgent(),
        b = "";
    goog.labs.userAgent.platform.isWindows() ? (b = /Windows (?:NT|Phone) ([0-9.]+)/, b = (a = b.exec(a)) ? a[1] : "0.0") : goog.labs.userAgent.platform.isIos() ? (b = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, b = (a = b.exec(a)) && a[1].replace(/_/g, ".")) : goog.labs.userAgent.platform.isMacintosh() ? (b = /Mac OS X ([0-9_.]+)/, b = (a = b.exec(a)) ? a[1].replace(/_/g, ".") : "10") : goog.labs.userAgent.platform.isKaiOS() ? (b = /(?:KaiOS)\/(\S+)/i,
        b = (a = b.exec(a)) && a[1]) : goog.labs.userAgent.platform.isAndroid() ? (b = /Android\s+([^\);]+)(\)|;)/, b = (a = b.exec(a)) && a[1]) : goog.labs.userAgent.platform.isChromeOS() && (b = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/, b = (a = b.exec(a)) && a[1]);
    return b || ""
};
goog.labs.userAgent.platform.isVersionOrHigher = function(a) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(), a)
};
goog.reflect = {};
goog.reflect.object = function(a, b) {
    return b
};
goog.reflect.objectProperty = function(a, b) {
    return a
};
goog.reflect.sinkValue = function(a) {
    goog.reflect.sinkValue[" "](a);
    return a
};
goog.reflect.sinkValue[" "] = goog.nullFunction;
goog.reflect.canAccessProperty = function(a, b) {
    try {
        return goog.reflect.sinkValue(a[b]), !0
    } catch (c) {}
    return !1
};
goog.reflect.cache = function(a, b, c, d) {
    d = d ? d(b) : b;
    return Object.prototype.hasOwnProperty.call(a, d) ? a[d] : a[d] = c(b)
};
goog.userAgent = {};
goog.userAgent.ASSUME_IE = !1;
goog.userAgent.ASSUME_EDGE = !1;
goog.userAgent.ASSUME_GECKO = !1;
goog.userAgent.ASSUME_WEBKIT = !1;
goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
goog.userAgent.ASSUME_OPERA = !1;
goog.userAgent.ASSUME_ANY_VERSION = !1;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
    return goog.labs.userAgent.util.getUserAgent()
};
goog.userAgent.getNavigatorTyped = function() {
    return goog.global.navigator || null
};
goog.userAgent.getNavigator = function() {
    return goog.userAgent.getNavigatorTyped()
};
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera();
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE();
goog.userAgent.EDGE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_EDGE : goog.labs.userAgent.engine.isEdge();
goog.userAgent.EDGE_OR_IE = goog.userAgent.EDGE || goog.userAgent.IE;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko();
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit();
goog.userAgent.isMobile_ = function() {
    return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile")
};
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_();
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
    var a = goog.userAgent.getNavigatorTyped();
    return a && a.platform || ""
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = !1;
goog.userAgent.ASSUME_WINDOWS = !1;
goog.userAgent.ASSUME_LINUX = !1;
goog.userAgent.ASSUME_X11 = !1;
goog.userAgent.ASSUME_ANDROID = !1;
goog.userAgent.ASSUME_IPHONE = !1;
goog.userAgent.ASSUME_IPAD = !1;
goog.userAgent.ASSUME_IPOD = !1;
goog.userAgent.ASSUME_KAIOS = !1;
goog.userAgent.ASSUME_GO2PHONE = !1;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD;
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.labs.userAgent.platform.isMacintosh();
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.labs.userAgent.platform.isWindows();
goog.userAgent.isLegacyLinux_ = function() {
    return goog.labs.userAgent.platform.isLinux() || goog.labs.userAgent.platform.isChromeOS()
};
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.isLegacyLinux_();
goog.userAgent.isX11_ = function() {
    var a = goog.userAgent.getNavigatorTyped();
    return !!a && goog.string.contains(a.appVersion || "", "X11")
};
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.isX11_();
goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.labs.userAgent.platform.isAndroid();
goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.labs.userAgent.platform.isIphone();
goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
goog.userAgent.IPOD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIpod();
goog.userAgent.IOS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIos();
goog.userAgent.KAIOS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_KAIOS : goog.labs.userAgent.platform.isKaiOS();
goog.userAgent.GO2PHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_GO2PHONE : goog.labs.userAgent.platform.isGo2Phone();
goog.userAgent.determineVersion_ = function() {
    var a = "",
        b = goog.userAgent.getVersionRegexResult_();
    b && (a = b ? b[1] : "");
    return goog.userAgent.IE && (b = goog.userAgent.getDocumentMode_(), null != b && b > parseFloat(a)) ? String(b) : a
};
goog.userAgent.getVersionRegexResult_ = function() {
    var a = goog.userAgent.getUserAgentString();
    if (goog.userAgent.GECKO) return /rv:([^\);]+)(\)|;)/.exec(a);
    if (goog.userAgent.EDGE) return /Edge\/([\d\.]+)/.exec(a);
    if (goog.userAgent.IE) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
    if (goog.userAgent.WEBKIT) return /WebKit\/(\S+)/.exec(a);
    if (goog.userAgent.OPERA) return /(?:Version)[ \/]?(\S+)/.exec(a)
};
goog.userAgent.getDocumentMode_ = function() {
    var a = goog.global.document;
    return a ? a.documentMode : void 0
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(a, b) {
    return goog.string.compareVersions(a, b)
};
goog.userAgent.isVersionOrHigherCache_ = {};
goog.userAgent.isVersionOrHigher = function(a) {
    return goog.userAgent.ASSUME_ANY_VERSION || goog.reflect.cache(goog.userAgent.isVersionOrHigherCache_, a, function() {
        return 0 <= goog.string.compareVersions(goog.userAgent.VERSION, a)
    })
};
goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher;
goog.userAgent.isDocumentModeOrHigher = function(a) {
    return Number(goog.userAgent.DOCUMENT_MODE) >= a
};
goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher;
goog.userAgent.DOCUMENT_MODE = function() {
    if (goog.global.document && goog.userAgent.IE) return goog.userAgent.getDocumentMode_()
}();
goog.dom.BrowserFeature = {};
goog.dom.BrowserFeature.ASSUME_NO_OFFSCREEN_CANVAS = !1;
goog.dom.BrowserFeature.ASSUME_OFFSCREEN_CANVAS = !1;
goog.dom.BrowserFeature.detectOffscreenCanvas_ = function(a) {
    try {
        return !!(new self.OffscreenCanvas(0, 0)).getContext(a)
    } catch (b) {}
    return !1
};
goog.dom.BrowserFeature.OFFSCREEN_CANVAS_2D = !goog.dom.BrowserFeature.ASSUME_NO_OFFSCREEN_CANVAS && (goog.dom.BrowserFeature.ASSUME_OFFSCREEN_CANVAS || goog.dom.BrowserFeature.detectOffscreenCanvas_("2d"));
goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES = !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9);
goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE = !goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isDocumentModeOrHigher(9) || goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9.1");
goog.dom.BrowserFeature.CAN_USE_INNER_TEXT = goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9");
goog.dom.BrowserFeature.CAN_USE_PARENT_ELEMENT_PROPERTY = goog.userAgent.IE || goog.userAgent.OPERA || goog.userAgent.WEBKIT;
goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT = goog.userAgent.IE;
goog.dom.BrowserFeature.LEGACY_IE_RANGES = goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9);
goog.math.Coordinate = function(a, b) {
    this.x = void 0 !== a ? a : 0;
    this.y = void 0 !== b ? b : 0
};
goog.math.Coordinate.prototype.clone = function() {
    return new goog.math.Coordinate(this.x, this.y)
};
goog.DEBUG && (goog.math.Coordinate.prototype.toString = function() {
    return "(" + this.x + ", " + this.y + ")"
});
goog.math.Coordinate.prototype.equals = function(a) {
    return a instanceof goog.math.Coordinate && goog.math.Coordinate.equals(this, a)
};
goog.math.Coordinate.equals = function(a, b) {
    return a == b ? !0 : a && b ? a.x == b.x && a.y == b.y : !1
};
goog.math.Coordinate.distance = function(a, b) {
    var c = a.x - b.x,
        d = a.y - b.y;
    return Math.sqrt(c * c + d * d)
};
goog.math.Coordinate.magnitude = function(a) {
    return Math.sqrt(a.x * a.x + a.y * a.y)
};
goog.math.Coordinate.azimuth = function(a) {
    return goog.math.angle(0, 0, a.x, a.y)
};
goog.math.Coordinate.squaredDistance = function(a, b) {
    var c = a.x - b.x,
        d = a.y - b.y;
    return c * c + d * d
};
goog.math.Coordinate.difference = function(a, b) {
    return new goog.math.Coordinate(a.x - b.x, a.y - b.y)
};
goog.math.Coordinate.sum = function(a, b) {
    return new goog.math.Coordinate(a.x + b.x, a.y + b.y)
};
goog.math.Coordinate.prototype.ceil = function() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this
};
goog.math.Coordinate.prototype.floor = function() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this
};
goog.math.Coordinate.prototype.round = function() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this
};
goog.math.Coordinate.prototype.translate = function(a, b) {
    a instanceof goog.math.Coordinate ? (this.x += a.x, this.y += a.y) : (this.x += Number(a), "number" === typeof b && (this.y += b));
    return this
};
goog.math.Coordinate.prototype.scale = function(a, b) {
    this.x *= a;
    this.y *= "number" === typeof b ? b : a;
    return this
};
goog.math.Coordinate.prototype.rotateRadians = function(a, b) {
    var c = b || new goog.math.Coordinate(0, 0),
        d = this.x,
        e = this.y,
        f = Math.cos(a),
        g = Math.sin(a);
    this.x = (d - c.x) * f - (e - c.y) * g + c.x;
    this.y = (d - c.x) * g + (e - c.y) * f + c.y
};
goog.math.Coordinate.prototype.rotateDegrees = function(a, b) {
    this.rotateRadians(goog.math.toRadians(a), b)
};
goog.math.Size = function(a, b) {
    this.width = a;
    this.height = b
};
goog.math.Size.equals = function(a, b) {
    return a == b ? !0 : a && b ? a.width == b.width && a.height == b.height : !1
};
goog.math.Size.prototype.clone = function() {
    return new goog.math.Size(this.width, this.height)
};
goog.DEBUG && (goog.math.Size.prototype.toString = function() {
    return "(" + this.width + " x " + this.height + ")"
});
goog.math.Size.prototype.getLongest = function() {
    return Math.max(this.width, this.height)
};
goog.math.Size.prototype.getShortest = function() {
    return Math.min(this.width, this.height)
};
goog.math.Size.prototype.area = function() {
    return this.width * this.height
};
goog.math.Size.prototype.perimeter = function() {
    return 2 * (this.width + this.height)
};
goog.math.Size.prototype.aspectRatio = function() {
    return this.width / this.height
};
goog.math.Size.prototype.isEmpty = function() {
    return !this.area()
};
goog.math.Size.prototype.ceil = function() {
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this
};
goog.math.Size.prototype.fitsInside = function(a) {
    return this.width <= a.width && this.height <= a.height
};
goog.math.Size.prototype.floor = function() {
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this
};
goog.math.Size.prototype.round = function() {
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this
};
goog.math.Size.prototype.scale = function(a, b) {
    this.width *= a;
    this.height *= "number" === typeof b ? b : a;
    return this
};
goog.math.Size.prototype.scaleToCover = function(a) {
    a = this.aspectRatio() <= a.aspectRatio() ? a.width / this.width : a.height / this.height;
    return this.scale(a)
};
goog.math.Size.prototype.scaleToFit = function(a) {
    a = this.aspectRatio() > a.aspectRatio() ? a.width / this.width : a.height / this.height;
    return this.scale(a)
};
goog.dom.ASSUME_QUIRKS_MODE = !1;
goog.dom.ASSUME_STANDARDS_MODE = !1;
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
goog.dom.getDomHelper = function(a) {
    return a ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(a)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper)
};
goog.dom.getDocument = function() {
    return document
};
goog.dom.getElement = function(a) {
    return goog.dom.getElementHelper_(document, a)
};
goog.dom.getElementHelper_ = function(a, b) {
    return "string" === typeof b ? a.getElementById(b) : b
};
goog.dom.getRequiredElement = function(a) {
    return goog.dom.getRequiredElementHelper_(document, a)
};
goog.dom.getRequiredElementHelper_ = function(a, b) {
    goog.asserts.assertString(b);
    var c = goog.dom.getElementHelper_(a, b);
    return c = goog.asserts.assertElement(c, "No element found with id: " + b)
};
goog.dom.$ = goog.dom.getElement;
goog.dom.getElementsByTagName = function(a, b) {
    return (b || document).getElementsByTagName(String(a))
};
goog.dom.getElementsByTagNameAndClass = function(a, b, c) {
    return goog.dom.getElementsByTagNameAndClass_(document, a, b, c)
};
goog.dom.getElementByTagNameAndClass = function(a, b, c) {
    return goog.dom.getElementByTagNameAndClass_(document, a, b, c)
};
goog.dom.getElementsByClass = function(a, b) {
    var c = b || document;
    return goog.dom.canUseQuerySelector_(c) ? c.querySelectorAll("." + a) : goog.dom.getElementsByTagNameAndClass_(document, "*", a, b)
};
goog.dom.getElementByClass = function(a, b) {
    var c = b || document;
    return (c.getElementsByClassName ? c.getElementsByClassName(a)[0] : goog.dom.getElementByTagNameAndClass_(document, "*", a, b)) || null
};
goog.dom.getRequiredElementByClass = function(a, b) {
    var c = goog.dom.getElementByClass(a, b);
    return goog.asserts.assert(c, "No element found with className: " + a)
};
goog.dom.canUseQuerySelector_ = function(a) {
    return !(!a.querySelectorAll || !a.querySelector)
};
goog.dom.getElementsByTagNameAndClass_ = function(a, b, c, d) {
    a = d || a;
    b = b && "*" != b ? String(b).toUpperCase() : "";
    if (goog.dom.canUseQuerySelector_(a) && (b || c)) return a.querySelectorAll(b + (c ? "." + c : ""));
    if (c && a.getElementsByClassName) {
        a = a.getElementsByClassName(c);
        if (b) {
            d = {};
            for (var e = 0, f = 0, g; g = a[f]; f++) b == g.nodeName && (d[e++] = g);
            d.length = e;
            return d
        }
        return a
    }
    a = a.getElementsByTagName(b || "*");
    if (c) {
        d = {};
        for (f = e = 0; g = a[f]; f++) b = g.className, "function" == typeof b.split && goog.array.contains(b.split(/\s+/), c) && (d[e++] = g);
        d.length = e;
        return d
    }
    return a
};
goog.dom.getElementByTagNameAndClass_ = function(a, b, c, d) {
    var e = d || a,
        f = b && "*" != b ? String(b).toUpperCase() : "";
    return goog.dom.canUseQuerySelector_(e) && (f || c) ? e.querySelector(f + (c ? "." + c : "")) : goog.dom.getElementsByTagNameAndClass_(a, b, c, d)[0] || null
};
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.setProperties = function(a, b) {
    goog.object.forEach(b, function(b, d) {
        b && "object" == typeof b && b.implementsGoogStringTypedString && (b = b.getTypedStringValue());
        "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : goog.dom.DIRECT_ATTRIBUTE_MAP_.hasOwnProperty(d) ? a.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[d], b) : goog.string.startsWith(d, "aria-") || goog.string.startsWith(d, "data-") ? a.setAttribute(d, b) : a[d] = b
    })
};
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    colspan: "colSpan",
    frameborder: "frameBorder",
    height: "height",
    maxlength: "maxLength",
    nonce: "nonce",
    role: "role",
    rowspan: "rowSpan",
    type: "type",
    usemap: "useMap",
    valign: "vAlign",
    width: "width"
};
goog.dom.getViewportSize = function(a) {
    return goog.dom.getViewportSize_(a || window)
};
goog.dom.getViewportSize_ = function(a) {
    a = a.document;
    a = goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body;
    return new goog.math.Size(a.clientWidth, a.clientHeight)
};
goog.dom.getDocumentHeight = function() {
    return goog.dom.getDocumentHeight_(window)
};
goog.dom.getDocumentHeightForWindow = function(a) {
    return goog.dom.getDocumentHeight_(a)
};
goog.dom.getDocumentHeight_ = function(a) {
    var b = a.document,
        c = 0;
    if (b) {
        c = b.body;
        var d = b.documentElement;
        if (!d || !c) return 0;
        a = goog.dom.getViewportSize_(a).height;
        if (goog.dom.isCss1CompatMode_(b) && d.scrollHeight) c = d.scrollHeight != a ? d.scrollHeight : d.offsetHeight;
        else {
            b = d.scrollHeight;
            var e = d.offsetHeight;
            d.clientHeight != e && (b = c.scrollHeight, e = c.offsetHeight);
            c = b > a ? b > e ? b : e : b < e ? b : e
        }
    }
    return c
};
goog.dom.getPageScroll = function(a) {
    return goog.dom.getDomHelper((a || goog.global || window).document).getDocumentScroll()
};
goog.dom.getDocumentScroll = function() {
    return goog.dom.getDocumentScroll_(document)
};
goog.dom.getDocumentScroll_ = function(a) {
    var b = goog.dom.getDocumentScrollElement_(a);
    a = goog.dom.getWindow_(a);
    return goog.userAgent.IE && goog.userAgent.isVersionOrHigher("10") && a.pageYOffset != b.scrollTop ? new goog.math.Coordinate(b.scrollLeft, b.scrollTop) : new goog.math.Coordinate(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
};
goog.dom.getDocumentScrollElement = function() {
    return goog.dom.getDocumentScrollElement_(document)
};
goog.dom.getDocumentScrollElement_ = function(a) {
    return a.scrollingElement ? a.scrollingElement : !goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body || a.documentElement
};
goog.dom.getWindow = function(a) {
    return a ? goog.dom.getWindow_(a) : window
};
goog.dom.getWindow_ = function(a) {
    return a.parentWindow || a.defaultView
};
goog.dom.createDom = function(a, b, c) {
    return goog.dom.createDom_(document, arguments)
};
goog.dom.createDom_ = function(a, b) {
    var c = String(b[0]),
        d = b[1];
    if (!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && d && (d.name || d.type)) {
        c = ["<", c];
        d.name && c.push(' name="', goog.string.htmlEscape(d.name), '"');
        if (d.type) {
            c.push(' type="', goog.string.htmlEscape(d.type), '"');
            var e = {};
            goog.object.extend(e, d);
            delete e.type;
            d = e
        }
        c.push(">");
        c = c.join("")
    }
    c = goog.dom.createElement_(a, c);
    d && ("string" === typeof d ? c.className = d : goog.isArray(d) ? c.className = d.join(" ") : goog.dom.setProperties(c, d));
    2 < b.length &&
        goog.dom.append_(a, c, b, 2);
    return c
};
goog.dom.append_ = function(a, b, c, d) {
    function e(c) {
        c && b.appendChild("string" === typeof c ? a.createTextNode(c) : c)
    }
    for (; d < c.length; d++) {
        var f = c[d];
        goog.isArrayLike(f) && !goog.dom.isNodeLike(f) ? goog.array.forEach(goog.dom.isNodeList(f) ? goog.array.toArray(f) : f, e) : e(f)
    }
};
goog.dom.$dom = goog.dom.createDom;
goog.dom.createElement = function(a) {
    return goog.dom.createElement_(document, a)
};
goog.dom.createElement_ = function(a, b) {
    b = String(b);
    "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
    return a.createElement(b)
};
goog.dom.createTextNode = function(a) {
    return document.createTextNode(String(a))
};
goog.dom.createTable = function(a, b, c) {
    return goog.dom.createTable_(document, a, b, !!c)
};
goog.dom.createTable_ = function(a, b, c, d) {
    for (var e = goog.dom.createElement_(a, "TABLE"), f = e.appendChild(goog.dom.createElement_(a, "TBODY")), g = 0; g < b; g++) {
        for (var h = goog.dom.createElement_(a, "TR"), k = 0; k < c; k++) {
            var l = goog.dom.createElement_(a, "TD");
            d && goog.dom.setTextContent(l, goog.string.Unicode.NBSP);
            h.appendChild(l)
        }
        f.appendChild(h)
    }
    return e
};
goog.dom.constHtmlToNode = function(a) {
    var b = goog.array.map(arguments, goog.string.Const.unwrap);
    b = goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Constant HTML string, that gets turned into a Node later, so it will be automatically balanced."), b.join(""));
    return goog.dom.safeHtmlToNode(b)
};
goog.dom.safeHtmlToNode = function(a) {
    return goog.dom.safeHtmlToNode_(document, a)
};
goog.dom.safeHtmlToNode_ = function(a, b) {
    var c = goog.dom.createElement_(a, "DIV");
    goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? (goog.dom.safe.setInnerHtml(c, goog.html.SafeHtml.concat(goog.html.SafeHtml.BR, b)), c.removeChild(goog.asserts.assert(c.firstChild))) : goog.dom.safe.setInnerHtml(c, b);
    return goog.dom.childrenToNode_(a, c)
};
goog.dom.childrenToNode_ = function(a, b) {
    if (1 == b.childNodes.length) return b.removeChild(goog.asserts.assert(b.firstChild));
    for (var c = a.createDocumentFragment(); b.firstChild;) c.appendChild(b.firstChild);
    return c
};
goog.dom.isCss1CompatMode = function() {
    return goog.dom.isCss1CompatMode_(document)
};
goog.dom.isCss1CompatMode_ = function(a) {
    return goog.dom.COMPAT_MODE_KNOWN_ ? goog.dom.ASSUME_STANDARDS_MODE : "CSS1Compat" == a.compatMode
};
goog.dom.canHaveChildren = function(a) {
    if (a.nodeType != goog.dom.NodeType.ELEMENT) return !1;
    switch (a.tagName) {
        case "APPLET":
        case "AREA":
        case "BASE":
        case "BR":
        case "COL":
        case "COMMAND":
        case "EMBED":
        case "FRAME":
        case "HR":
        case "IMG":
        case "INPUT":
        case "IFRAME":
        case "ISINDEX":
        case "KEYGEN":
        case "LINK":
        case "NOFRAMES":
        case "NOSCRIPT":
        case "META":
        case "OBJECT":
        case "PARAM":
        case "SCRIPT":
        case "SOURCE":
        case "STYLE":
        case "TRACK":
        case "WBR":
            return !1
    }
    return !0
};
goog.dom.appendChild = function(a, b) {
    goog.asserts.assert(null != a && null != b, "goog.dom.appendChild expects non-null arguments");
    a.appendChild(b)
};
goog.dom.append = function(a, b) {
    goog.dom.append_(goog.dom.getOwnerDocument(a), a, arguments, 1)
};
goog.dom.removeChildren = function(a) {
    for (var b; b = a.firstChild;) a.removeChild(b)
};
goog.dom.insertSiblingBefore = function(a, b) {
    goog.asserts.assert(null != a && null != b, "goog.dom.insertSiblingBefore expects non-null arguments");
    b.parentNode && b.parentNode.insertBefore(a, b)
};
goog.dom.insertSiblingAfter = function(a, b) {
    goog.asserts.assert(null != a && null != b, "goog.dom.insertSiblingAfter expects non-null arguments");
    b.parentNode && b.parentNode.insertBefore(a, b.nextSibling)
};
goog.dom.insertChildAt = function(a, b, c) {
    goog.asserts.assert(null != a, "goog.dom.insertChildAt expects a non-null parent");
    a.insertBefore(b, a.childNodes[c] || null)
};
goog.dom.removeNode = function(a) {
    return a && a.parentNode ? a.parentNode.removeChild(a) : null
};
goog.dom.replaceNode = function(a, b) {
    goog.asserts.assert(null != a && null != b, "goog.dom.replaceNode expects non-null arguments");
    var c = b.parentNode;
    c && c.replaceChild(a, b)
};
goog.dom.flattenElement = function(a) {
    var b, c = a.parentNode;
    if (c && c.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
        if (a.removeNode) return a.removeNode(!1);
        for (; b = a.firstChild;) c.insertBefore(b, a);
        return goog.dom.removeNode(a)
    }
};
goog.dom.getChildren = function(a) {
    return goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE && void 0 != a.children ? a.children : goog.array.filter(a.childNodes, function(a) {
        return a.nodeType == goog.dom.NodeType.ELEMENT
    })
};
goog.dom.getFirstElementChild = function(a) {
    return void 0 !== a.firstElementChild ? a.firstElementChild : goog.dom.getNextElementNode_(a.firstChild, !0)
};
goog.dom.getLastElementChild = function(a) {
    return void 0 !== a.lastElementChild ? a.lastElementChild : goog.dom.getNextElementNode_(a.lastChild, !1)
};
goog.dom.getNextElementSibling = function(a) {
    return void 0 !== a.nextElementSibling ? a.nextElementSibling : goog.dom.getNextElementNode_(a.nextSibling, !0)
};
goog.dom.getPreviousElementSibling = function(a) {
    return void 0 !== a.previousElementSibling ? a.previousElementSibling : goog.dom.getNextElementNode_(a.previousSibling, !1)
};
goog.dom.getNextElementNode_ = function(a, b) {
    for (; a && a.nodeType != goog.dom.NodeType.ELEMENT;) a = b ? a.nextSibling : a.previousSibling;
    return a
};
goog.dom.getNextNode = function(a) {
    if (!a) return null;
    if (a.firstChild) return a.firstChild;
    for (; a && !a.nextSibling;) a = a.parentNode;
    return a ? a.nextSibling : null
};
goog.dom.getPreviousNode = function(a) {
    if (!a) return null;
    if (!a.previousSibling) return a.parentNode;
    for (a = a.previousSibling; a && a.lastChild;) a = a.lastChild;
    return a
};
goog.dom.isNodeLike = function(a) {
    return goog.isObject(a) && 0 < a.nodeType
};
goog.dom.isElement = function(a) {
    return goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT
};
goog.dom.isWindow = function(a) {
    return goog.isObject(a) && a.window == a
};
goog.dom.getParentElement = function(a) {
    var b;
    if (goog.dom.BrowserFeature.CAN_USE_PARENT_ELEMENT_PROPERTY && !(goog.userAgent.IE && goog.userAgent.isVersionOrHigher("9") && !goog.userAgent.isVersionOrHigher("10") && goog.global.SVGElement && a instanceof goog.global.SVGElement) && (b = a.parentElement)) return b;
    b = a.parentNode;
    return goog.dom.isElement(b) ? b : null
};
goog.dom.contains = function(a, b) {
    if (!a || !b) return !1;
    if (a.contains && b.nodeType == goog.dom.NodeType.ELEMENT) return a == b || a.contains(b);
    if ("undefined" != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);
    for (; b && a != b;) b = b.parentNode;
    return b == a
};
goog.dom.compareNodeOrder = function(a, b) {
    if (a == b) return 0;
    if (a.compareDocumentPosition) return a.compareDocumentPosition(b) & 2 ? 1 : -1;
    if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
        if (a.nodeType == goog.dom.NodeType.DOCUMENT) return -1;
        if (b.nodeType == goog.dom.NodeType.DOCUMENT) return 1
    }
    if ("sourceIndex" in a || a.parentNode && "sourceIndex" in a.parentNode) {
        var c = a.nodeType == goog.dom.NodeType.ELEMENT,
            d = b.nodeType == goog.dom.NodeType.ELEMENT;
        if (c && d) return a.sourceIndex - b.sourceIndex;
        var e = a.parentNode,
            f = b.parentNode;
        return e == f ? goog.dom.compareSiblingOrder_(a, b) : !c && goog.dom.contains(e, b) ? -1 * goog.dom.compareParentsDescendantNodeIe_(a, b) : !d && goog.dom.contains(f, a) ? goog.dom.compareParentsDescendantNodeIe_(b, a) : (c ? a.sourceIndex : e.sourceIndex) - (d ? b.sourceIndex : f.sourceIndex)
    }
    d = goog.dom.getOwnerDocument(a);
    c = d.createRange();
    c.selectNode(a);
    c.collapse(!0);
    d = d.createRange();
    d.selectNode(b);
    d.collapse(!0);
    return c.compareBoundaryPoints(goog.global.Range.START_TO_END, d)
};
goog.dom.compareParentsDescendantNodeIe_ = function(a, b) {
    var c = a.parentNode;
    if (c == b) return -1;
    for (var d = b; d.parentNode != c;) d = d.parentNode;
    return goog.dom.compareSiblingOrder_(d, a)
};
goog.dom.compareSiblingOrder_ = function(a, b) {
    for (var c = b; c = c.previousSibling;)
        if (c == a) return -1;
    return 1
};
goog.dom.findCommonAncestor = function(a) {
    var b, c = arguments.length;
    if (!c) return null;
    if (1 == c) return arguments[0];
    var d = [],
        e = Infinity;
    for (b = 0; b < c; b++) {
        for (var f = [], g = arguments[b]; g;) f.unshift(g), g = g.parentNode;
        d.push(f);
        e = Math.min(e, f.length)
    }
    f = null;
    for (b = 0; b < e; b++) {
        g = d[0][b];
        for (var h = 1; h < c; h++)
            if (g != d[h][b]) return f;
        f = g
    }
    return f
};
goog.dom.isInDocument = function(a) {
    return 16 == (a.ownerDocument.compareDocumentPosition(a) & 16)
};
goog.dom.getOwnerDocument = function(a) {
    goog.asserts.assert(a, "Node cannot be null or undefined.");
    return a.nodeType == goog.dom.NodeType.DOCUMENT ? a : a.ownerDocument || a.document
};
goog.dom.getFrameContentDocument = function(a) {
    return a.contentDocument || a.contentWindow.document
};
goog.dom.getFrameContentWindow = function(a) {
    try {
        return a.contentWindow || (a.contentDocument ? goog.dom.getWindow(a.contentDocument) : null)
    } catch (b) {}
    return null
};
goog.dom.setTextContent = function(a, b) {
    goog.asserts.assert(null != a, "goog.dom.setTextContent expects a non-null value for node");
    if ("textContent" in a) a.textContent = b;
    else if (a.nodeType == goog.dom.NodeType.TEXT) a.data = String(b);
    else if (a.firstChild && a.firstChild.nodeType == goog.dom.NodeType.TEXT) {
        for (; a.lastChild != a.firstChild;) a.removeChild(goog.asserts.assert(a.lastChild));
        a.firstChild.data = String(b)
    } else {
        goog.dom.removeChildren(a);
        var c = goog.dom.getOwnerDocument(a);
        a.appendChild(c.createTextNode(String(b)))
    }
};
goog.dom.getOuterHtml = function(a) {
    goog.asserts.assert(null !== a, "goog.dom.getOuterHtml expects a non-null value for element");
    if ("outerHTML" in a) return a.outerHTML;
    var b = goog.dom.getOwnerDocument(a);
    b = goog.dom.createElement_(b, "DIV");
    b.appendChild(a.cloneNode(!0));
    return b.innerHTML
};
goog.dom.findNode = function(a, b) {
    var c = [];
    return goog.dom.findNodes_(a, b, c, !0) ? c[0] : void 0
};
goog.dom.findNodes = function(a, b) {
    var c = [];
    goog.dom.findNodes_(a, b, c, !1);
    return c
};
goog.dom.findNodes_ = function(a, b, c, d) {
    if (null != a)
        for (a = a.firstChild; a;) {
            if (b(a) && (c.push(a), d) || goog.dom.findNodes_(a, b, c, d)) return !0;
            a = a.nextSibling
        }
    return !1
};
goog.dom.findElement = function(a, b) {
    for (var c = goog.dom.getChildrenReverse_(a); 0 < c.length;) {
        var d = c.pop();
        if (b(d)) return d;
        for (d = d.lastElementChild; d; d = d.previousElementSibling) c.push(d)
    }
    return null
};
goog.dom.findElements = function(a, b) {
    for (var c = [], d = goog.dom.getChildrenReverse_(a); 0 < d.length;) {
        var e = d.pop();
        b(e) && c.push(e);
        for (e = e.lastElementChild; e; e = e.previousElementSibling) d.push(e)
    }
    return c
};
goog.dom.getChildrenReverse_ = function(a) {
    if (a.nodeType == goog.dom.NodeType.DOCUMENT) return [a.documentElement];
    var b = [];
    for (a = a.lastElementChild; a; a = a.previousElementSibling) b.push(a);
    return b
};
goog.dom.TAGS_TO_IGNORE_ = {
    SCRIPT: 1,
    STYLE: 1,
    HEAD: 1,
    IFRAME: 1,
    OBJECT: 1
};
goog.dom.PREDEFINED_TAG_VALUES_ = {
    IMG: " ",
    BR: "\n"
};
goog.dom.isFocusableTabIndex = function(a) {
    return goog.dom.hasSpecifiedTabIndex_(a) && goog.dom.isTabIndexFocusable_(a)
};
goog.dom.setFocusableTabIndex = function(a, b) {
    b ? a.tabIndex = 0 : (a.tabIndex = -1, a.removeAttribute("tabIndex"))
};
goog.dom.isFocusable = function(a) {
    var b;
    return (b = goog.dom.nativelySupportsFocus_(a) ? !a.disabled && (!goog.dom.hasSpecifiedTabIndex_(a) || goog.dom.isTabIndexFocusable_(a)) : goog.dom.isFocusableTabIndex(a)) && goog.userAgent.IE ? goog.dom.hasNonZeroBoundingRect_(a) : b
};
goog.dom.hasSpecifiedTabIndex_ = function(a) {
    return goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9") ? (a = a.getAttributeNode("tabindex"), null != a && a.specified) : a.hasAttribute("tabindex")
};
goog.dom.isTabIndexFocusable_ = function(a) {
    a = a.tabIndex;
    return "number" === typeof a && 0 <= a && 32768 > a
};
goog.dom.nativelySupportsFocus_ = function(a) {
    return "A" == a.tagName && a.hasAttribute("href") || "INPUT" == a.tagName || "TEXTAREA" == a.tagName || "SELECT" == a.tagName || "BUTTON" == a.tagName
};
goog.dom.hasNonZeroBoundingRect_ = function(a) {
    a = !goog.isFunction(a.getBoundingClientRect) || goog.userAgent.IE && null == a.parentElement ? {
        height: a.offsetHeight,
        width: a.offsetWidth
    } : a.getBoundingClientRect();
    return null != a && 0 < a.height && 0 < a.width
};
goog.dom.getTextContent = function(a) {
    if (goog.dom.BrowserFeature.CAN_USE_INNER_TEXT && null !== a && "innerText" in a) a = goog.string.canonicalizeNewlines(a.innerText);
    else {
        var b = [];
        goog.dom.getTextContent_(a, b, !0);
        a = b.join("")
    }
    a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
    a = a.replace(/\u200B/g, "");
    goog.dom.BrowserFeature.CAN_USE_INNER_TEXT || (a = a.replace(/ +/g, " "));
    " " != a && (a = a.replace(/^\s*/, ""));
    return a
};
goog.dom.getRawTextContent = function(a) {
    var b = [];
    goog.dom.getTextContent_(a, b, !1);
    return b.join("")
};
goog.dom.getTextContent_ = function(a, b, c) {
    if (!(a.nodeName in goog.dom.TAGS_TO_IGNORE_))
        if (a.nodeType == goog.dom.NodeType.TEXT) c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue);
        else if (a.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) b.push(goog.dom.PREDEFINED_TAG_VALUES_[a.nodeName]);
    else
        for (a = a.firstChild; a;) goog.dom.getTextContent_(a, b, c), a = a.nextSibling
};
goog.dom.getNodeTextLength = function(a) {
    return goog.dom.getTextContent(a).length
};
goog.dom.getNodeTextOffset = function(a, b) {
    for (var c = b || goog.dom.getOwnerDocument(a).body, d = []; a && a != c;) {
        for (var e = a; e = e.previousSibling;) d.unshift(goog.dom.getTextContent(e));
        a = a.parentNode
    }
    return goog.string.trimLeft(d.join("")).replace(/ +/g, " ").length
};
goog.dom.getNodeAtOffset = function(a, b, c) {
    a = [a];
    for (var d = 0, e = null; 0 < a.length && d < b;)
        if (e = a.pop(), !(e.nodeName in goog.dom.TAGS_TO_IGNORE_))
            if (e.nodeType == goog.dom.NodeType.TEXT) {
                var f = e.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " ");
                d += f.length
            } else if (e.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) d += goog.dom.PREDEFINED_TAG_VALUES_[e.nodeName].length;
    else
        for (f = e.childNodes.length - 1; 0 <= f; f--) a.push(e.childNodes[f]);
    goog.isObject(c) && (c.remainder = e ? e.nodeValue.length + b - d - 1 : 0, c.node = e);
    return e
};
goog.dom.isNodeList = function(a) {
    if (a && "number" == typeof a.length) {
        if (goog.isObject(a)) return "function" == typeof a.item || "string" == typeof a.item;
        if (goog.isFunction(a)) return "function" == typeof a.item
    }
    return !1
};
goog.dom.getAncestorByTagNameAndClass = function(a, b, c, d) {
    if (!b && !c) return null;
    var e = b ? String(b).toUpperCase() : null;
    return goog.dom.getAncestor(a, function(a) {
        return (!e || a.nodeName == e) && (!c || "string" === typeof a.className && goog.array.contains(a.className.split(/\s+/), c))
    }, !0, d)
};
goog.dom.getAncestorByClass = function(a, b, c) {
    return goog.dom.getAncestorByTagNameAndClass(a, null, b, c)
};
goog.dom.getAncestor = function(a, b, c, d) {
    a && !c && (a = a.parentNode);
    for (c = 0; a && (null == d || c <= d);) {
        goog.asserts.assert("parentNode" != a.name);
        if (b(a)) return a;
        a = a.parentNode;
        c++
    }
    return null
};
goog.dom.getActiveElement = function(a) {
    try {
        var b = a && a.activeElement;
        return b && b.nodeName ? b : null
    } catch (c) {
        return null
    }
};
goog.dom.getPixelRatio = function() {
    var a = goog.dom.getWindow();
    return void 0 !== a.devicePixelRatio ? a.devicePixelRatio : a.matchMedia ? goog.dom.matchesPixelRatio_(3) || goog.dom.matchesPixelRatio_(2) || goog.dom.matchesPixelRatio_(1.5) || goog.dom.matchesPixelRatio_(1) || .75 : 1
};
goog.dom.matchesPixelRatio_ = function(a) {
    return goog.dom.getWindow().matchMedia("(min-resolution: " + a + "dppx),(min--moz-device-pixel-ratio: " + a + "),(min-resolution: " + 96 * a + "dpi)").matches ? a : 0
};
goog.dom.getCanvasContext2D = function(a) {
    return a.getContext("2d")
};
goog.dom.DomHelper = function(a) {
    this.document_ = a || goog.global.document || document
};
goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper;
goog.dom.DomHelper.prototype.setDocument = function(a) {
    this.document_ = a
};
goog.dom.DomHelper.prototype.getDocument = function() {
    return this.document_
};
goog.dom.DomHelper.prototype.getElement = function(a) {
    return goog.dom.getElementHelper_(this.document_, a)
};
goog.dom.DomHelper.prototype.getRequiredElement = function(a) {
    return goog.dom.getRequiredElementHelper_(this.document_, a)
};
goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement;
goog.dom.DomHelper.prototype.getElementsByTagName = function(a, b) {
    return (b || this.document_).getElementsByTagName(String(a))
};
goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function(a, b, c) {
    return goog.dom.getElementsByTagNameAndClass_(this.document_, a, b, c)
};
goog.dom.DomHelper.prototype.getElementByTagNameAndClass = function(a, b, c) {
    return goog.dom.getElementByTagNameAndClass_(this.document_, a, b, c)
};
goog.dom.DomHelper.prototype.getElementsByClass = function(a, b) {
    return goog.dom.getElementsByClass(a, b || this.document_)
};
goog.dom.DomHelper.prototype.getElementByClass = function(a, b) {
    return goog.dom.getElementByClass(a, b || this.document_)
};
goog.dom.DomHelper.prototype.getRequiredElementByClass = function(a, b) {
    return goog.dom.getRequiredElementByClass(a, b || this.document_)
};
goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties;
goog.dom.DomHelper.prototype.getViewportSize = function(a) {
    return goog.dom.getViewportSize(a || this.getWindow())
};
goog.dom.DomHelper.prototype.getDocumentHeight = function() {
    return goog.dom.getDocumentHeight_(this.getWindow())
};
goog.dom.DomHelper.prototype.createDom = function(a, b, c) {
    return goog.dom.createDom_(this.document_, arguments)
};
goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom;
goog.dom.DomHelper.prototype.createElement = function(a) {
    return goog.dom.createElement_(this.document_, a)
};
goog.dom.DomHelper.prototype.createTextNode = function(a) {
    return this.document_.createTextNode(String(a))
};
goog.dom.DomHelper.prototype.createTable = function(a, b, c) {
    return goog.dom.createTable_(this.document_, a, b, !!c)
};
goog.dom.DomHelper.prototype.safeHtmlToNode = function(a) {
    return goog.dom.safeHtmlToNode_(this.document_, a)
};
goog.dom.DomHelper.prototype.isCss1CompatMode = function() {
    return goog.dom.isCss1CompatMode_(this.document_)
};
goog.dom.DomHelper.prototype.getWindow = function() {
    return goog.dom.getWindow_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScrollElement = function() {
    return goog.dom.getDocumentScrollElement_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScroll = function() {
    return goog.dom.getDocumentScroll_(this.document_)
};
goog.dom.DomHelper.prototype.getActiveElement = function(a) {
    return goog.dom.getActiveElement(a || this.document_)
};
goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild;
goog.dom.DomHelper.prototype.append = goog.dom.append;
goog.dom.DomHelper.prototype.canHaveChildren = goog.dom.canHaveChildren;
goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren;
goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore;
goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter;
goog.dom.DomHelper.prototype.insertChildAt = goog.dom.insertChildAt;
goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode;
goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode;
goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement;
goog.dom.DomHelper.prototype.getChildren = goog.dom.getChildren;
goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild;
goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild;
goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling;
goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode;
goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode;
goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike;
goog.dom.DomHelper.prototype.isElement = goog.dom.isElement;
goog.dom.DomHelper.prototype.isWindow = goog.dom.isWindow;
goog.dom.DomHelper.prototype.getParentElement = goog.dom.getParentElement;
goog.dom.DomHelper.prototype.contains = goog.dom.contains;
goog.dom.DomHelper.prototype.compareNodeOrder = goog.dom.compareNodeOrder;
goog.dom.DomHelper.prototype.findCommonAncestor = goog.dom.findCommonAncestor;
goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument;
goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument;
goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow;
goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent;
goog.dom.DomHelper.prototype.getOuterHtml = goog.dom.getOuterHtml;
goog.dom.DomHelper.prototype.findNode = goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes;
goog.dom.DomHelper.prototype.isFocusableTabIndex = goog.dom.isFocusableTabIndex;
goog.dom.DomHelper.prototype.setFocusableTabIndex = goog.dom.setFocusableTabIndex;
goog.dom.DomHelper.prototype.isFocusable = goog.dom.isFocusable;
goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent;
goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength;
goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset;
goog.dom.DomHelper.prototype.getNodeAtOffset = goog.dom.getNodeAtOffset;
goog.dom.DomHelper.prototype.isNodeList = goog.dom.isNodeList;
goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
goog.dom.DomHelper.prototype.getAncestorByClass = goog.dom.getAncestorByClass;
goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor;
goog.dom.DomHelper.prototype.getCanvasContext2D = goog.dom.getCanvasContext2D;
goog.dom.vendor = {};
goog.dom.vendor.getVendorJsPrefix = function() {
    return goog.userAgent.WEBKIT ? "Webkit" : goog.userAgent.GECKO ? "Moz" : goog.userAgent.IE ? "ms" : goog.userAgent.OPERA ? "O" : null
};
goog.dom.vendor.getVendorPrefix = function() {
    return goog.userAgent.WEBKIT ? "-webkit" : goog.userAgent.GECKO ? "-moz" : goog.userAgent.IE ? "-ms" : goog.userAgent.OPERA ? "-o" : null
};
goog.dom.vendor.getPrefixedPropertyName = function(a, b) {
    if (b && a in b) return a;
    var c = goog.dom.vendor.getVendorJsPrefix();
    return c ? (c = c.toLowerCase(), c += goog.string.toTitleCase(a), void 0 === b || c in b ? c : null) : null
};
goog.dom.vendor.getPrefixedEventType = function(a) {
    return ((goog.dom.vendor.getVendorJsPrefix() || "") + a).toLowerCase()
};
goog.math.Box = function(a, b, c, d) {
    this.top = a;
    this.right = b;
    this.bottom = c;
    this.left = d
};
goog.math.Box.boundingBox = function(a) {
    for (var b = new goog.math.Box(arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x), c = 1; c < arguments.length; c++) b.expandToIncludeCoordinate(arguments[c]);
    return b
};
goog.math.Box.prototype.getWidth = function() {
    return this.right - this.left
};
goog.math.Box.prototype.getHeight = function() {
    return this.bottom - this.top
};
goog.math.Box.prototype.clone = function() {
    return new goog.math.Box(this.top, this.right, this.bottom, this.left)
};
goog.DEBUG && (goog.math.Box.prototype.toString = function() {
    return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
});
goog.math.Box.prototype.contains = function(a) {
    return goog.math.Box.contains(this, a)
};
goog.math.Box.prototype.expand = function(a, b, c, d) {
    goog.isObject(a) ? (this.top -= a.top, this.right += a.right, this.bottom += a.bottom, this.left -= a.left) : (this.top -= a, this.right += Number(b), this.bottom += Number(c), this.left -= Number(d));
    return this
};
goog.math.Box.prototype.expandToInclude = function(a) {
    this.left = Math.min(this.left, a.left);
    this.top = Math.min(this.top, a.top);
    this.right = Math.max(this.right, a.right);
    this.bottom = Math.max(this.bottom, a.bottom)
};
goog.math.Box.prototype.expandToIncludeCoordinate = function(a) {
    this.top = Math.min(this.top, a.y);
    this.right = Math.max(this.right, a.x);
    this.bottom = Math.max(this.bottom, a.y);
    this.left = Math.min(this.left, a.x)
};
goog.math.Box.equals = function(a, b) {
    return a == b ? !0 : a && b ? a.top == b.top && a.right == b.right && a.bottom == b.bottom && a.left == b.left : !1
};
goog.math.Box.contains = function(a, b) {
    return a && b ? b instanceof goog.math.Box ? b.left >= a.left && b.right <= a.right && b.top >= a.top && b.bottom <= a.bottom : b.x >= a.left && b.x <= a.right && b.y >= a.top && b.y <= a.bottom : !1
};
goog.math.Box.relativePositionX = function(a, b) {
    return b.x < a.left ? b.x - a.left : b.x > a.right ? b.x - a.right : 0
};
goog.math.Box.relativePositionY = function(a, b) {
    return b.y < a.top ? b.y - a.top : b.y > a.bottom ? b.y - a.bottom : 0
};
goog.math.Box.distance = function(a, b) {
    var c = goog.math.Box.relativePositionX(a, b),
        d = goog.math.Box.relativePositionY(a, b);
    return Math.sqrt(c * c + d * d)
};
goog.math.Box.intersects = function(a, b) {
    return a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom
};
goog.math.Box.intersectsWithPadding = function(a, b, c) {
    return a.left <= b.right + c && b.left <= a.right + c && a.top <= b.bottom + c && b.top <= a.bottom + c
};
goog.math.Box.prototype.ceil = function() {
    this.top = Math.ceil(this.top);
    this.right = Math.ceil(this.right);
    this.bottom = Math.ceil(this.bottom);
    this.left = Math.ceil(this.left);
    return this
};
goog.math.Box.prototype.floor = function() {
    this.top = Math.floor(this.top);
    this.right = Math.floor(this.right);
    this.bottom = Math.floor(this.bottom);
    this.left = Math.floor(this.left);
    return this
};
goog.math.Box.prototype.round = function() {
    this.top = Math.round(this.top);
    this.right = Math.round(this.right);
    this.bottom = Math.round(this.bottom);
    this.left = Math.round(this.left);
    return this
};
goog.math.Box.prototype.translate = function(a, b) {
    a instanceof goog.math.Coordinate ? (this.left += a.x, this.right += a.x, this.top += a.y, this.bottom += a.y) : (goog.asserts.assertNumber(a), this.left += a, this.right += a, "number" === typeof b && (this.top += b, this.bottom += b));
    return this
};
goog.math.Box.prototype.scale = function(a, b) {
    var c = "number" === typeof b ? b : a;
    this.left *= a;
    this.right *= a;
    this.top *= c;
    this.bottom *= c;
    return this
};
goog.math.IRect = function() {};
goog.math.Rect = function(a, b, c, d) {
    this.left = a;
    this.top = b;
    this.width = c;
    this.height = d
};
goog.math.Rect.prototype.clone = function() {
    return new goog.math.Rect(this.left, this.top, this.width, this.height)
};
goog.math.Rect.prototype.toBox = function() {
    return new goog.math.Box(this.top, this.left + this.width, this.top + this.height, this.left)
};
goog.math.Rect.createFromPositionAndSize = function(a, b) {
    return new goog.math.Rect(a.x, a.y, b.width, b.height)
};
goog.math.Rect.createFromBox = function(a) {
    return new goog.math.Rect(a.left, a.top, a.right - a.left, a.bottom - a.top)
};
goog.DEBUG && (goog.math.Rect.prototype.toString = function() {
    return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
});
goog.math.Rect.equals = function(a, b) {
    return a == b ? !0 : a && b ? a.left == b.left && a.width == b.width && a.top == b.top && a.height == b.height : !1
};
goog.math.Rect.prototype.intersection = function(a) {
    var b = Math.max(this.left, a.left),
        c = Math.min(this.left + this.width, a.left + a.width);
    if (b <= c) {
        var d = Math.max(this.top, a.top);
        a = Math.min(this.top + this.height, a.top + a.height);
        if (d <= a) return this.left = b, this.top = d, this.width = c - b, this.height = a - d, !0
    }
    return !1
};
goog.math.Rect.intersection = function(a, b) {
    var c = Math.max(a.left, b.left),
        d = Math.min(a.left + a.width, b.left + b.width);
    if (c <= d) {
        var e = Math.max(a.top, b.top),
            f = Math.min(a.top + a.height, b.top + b.height);
        if (e <= f) return new goog.math.Rect(c, e, d - c, f - e)
    }
    return null
};
goog.math.Rect.intersects = function(a, b) {
    return a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height
};
goog.math.Rect.prototype.intersects = function(a) {
    return goog.math.Rect.intersects(this, a)
};
goog.math.Rect.difference = function(a, b) {
    var c = goog.math.Rect.intersection(a, b);
    if (!c || !c.height || !c.width) return [a.clone()];
    c = [];
    var d = a.top,
        e = a.height,
        f = a.left + a.width,
        g = a.top + a.height,
        h = b.left + b.width,
        k = b.top + b.height;
    b.top > a.top && (c.push(new goog.math.Rect(a.left, a.top, a.width, b.top - a.top)), d = b.top, e -= b.top - a.top);
    k < g && (c.push(new goog.math.Rect(a.left, k, a.width, g - k)), e = k - d);
    b.left > a.left && c.push(new goog.math.Rect(a.left, d, b.left - a.left, e));
    h < f && c.push(new goog.math.Rect(h, d, f - h, e));
    return c
};
goog.math.Rect.prototype.difference = function(a) {
    return goog.math.Rect.difference(this, a)
};
goog.math.Rect.prototype.boundingRect = function(a) {
    var b = Math.max(this.left + this.width, a.left + a.width),
        c = Math.max(this.top + this.height, a.top + a.height);
    this.left = Math.min(this.left, a.left);
    this.top = Math.min(this.top, a.top);
    this.width = b - this.left;
    this.height = c - this.top
};
goog.math.Rect.boundingRect = function(a, b) {
    if (!a || !b) return null;
    var c = new goog.math.Rect(a.left, a.top, a.width, a.height);
    c.boundingRect(b);
    return c
};
goog.math.Rect.prototype.contains = function(a) {
    return a instanceof goog.math.Coordinate ? a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height : this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height
};
goog.math.Rect.prototype.squaredDistance = function(a) {
    var b = a.x < this.left ? this.left - a.x : Math.max(a.x - (this.left + this.width), 0);
    a = a.y < this.top ? this.top - a.y : Math.max(a.y - (this.top + this.height), 0);
    return b * b + a * a
};
goog.math.Rect.prototype.distance = function(a) {
    return Math.sqrt(this.squaredDistance(a))
};
goog.math.Rect.prototype.getSize = function() {
    return new goog.math.Size(this.width, this.height)
};
goog.math.Rect.prototype.getTopLeft = function() {
    return new goog.math.Coordinate(this.left, this.top)
};
goog.math.Rect.prototype.getCenter = function() {
    return new goog.math.Coordinate(this.left + this.width / 2, this.top + this.height / 2)
};
goog.math.Rect.prototype.getBottomRight = function() {
    return new goog.math.Coordinate(this.left + this.width, this.top + this.height)
};
goog.math.Rect.prototype.ceil = function() {
    this.left = Math.ceil(this.left);
    this.top = Math.ceil(this.top);
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this
};
goog.math.Rect.prototype.floor = function() {
    this.left = Math.floor(this.left);
    this.top = Math.floor(this.top);
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this
};
goog.math.Rect.prototype.round = function() {
    this.left = Math.round(this.left);
    this.top = Math.round(this.top);
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this
};
goog.math.Rect.prototype.translate = function(a, b) {
    a instanceof goog.math.Coordinate ? (this.left += a.x, this.top += a.y) : (this.left += goog.asserts.assertNumber(a), "number" === typeof b && (this.top += b));
    return this
};
goog.math.Rect.prototype.scale = function(a, b) {
    var c = "number" === typeof b ? b : a;
    this.left *= a;
    this.width *= a;
    this.top *= c;
    this.height *= c;
    return this
};
goog.style = {};
goog.style.setStyle = function(a, b, c) {
    if ("string" === typeof b) goog.style.setStyle_(a, c, b);
    else
        for (var d in b) goog.style.setStyle_(a, b[d], d)
};
goog.style.setStyle_ = function(a, b, c) {
    (c = goog.style.getVendorJsStyleName_(a, c)) && (a.style[c] = b)
};
goog.style.styleNameCache_ = {};
goog.style.getVendorJsStyleName_ = function(a, b) {
    var c = goog.style.styleNameCache_[b];
    if (!c) {
        var d = goog.string.toCamelCase(b);
        c = d;
        void 0 === a.style[d] && (d = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(d), void 0 !== a.style[d] && (c = d));
        goog.style.styleNameCache_[b] = c
    }
    return c
};
goog.style.getVendorStyleName_ = function(a, b) {
    var c = goog.string.toCamelCase(b);
    return void 0 === a.style[c] && (c = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(c), void 0 !== a.style[c]) ? goog.dom.vendor.getVendorPrefix() + "-" + b : b
};
goog.style.getStyle = function(a, b) {
    var c = a.style[goog.string.toCamelCase(b)];
    return "undefined" !== typeof c ? c : a.style[goog.style.getVendorJsStyleName_(a, b)] || ""
};
goog.style.getComputedStyle = function(a, b) {
    var c = goog.dom.getOwnerDocument(a);
    return c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null)) ? c[b] || c.getPropertyValue(b) || "" : ""
};
goog.style.getCascadedStyle = function(a, b) {
    return a.currentStyle ? a.currentStyle[b] : null
};
goog.style.getStyle_ = function(a, b) {
    return goog.style.getComputedStyle(a, b) || goog.style.getCascadedStyle(a, b) || a.style && a.style[b]
};
goog.style.getComputedBoxSizing = function(a) {
    return goog.style.getStyle_(a, "boxSizing") || goog.style.getStyle_(a, "MozBoxSizing") || goog.style.getStyle_(a, "WebkitBoxSizing") || null
};
goog.style.getComputedPosition = function(a) {
    return goog.style.getStyle_(a, "position")
};
goog.style.getBackgroundColor = function(a) {
    return goog.style.getStyle_(a, "backgroundColor")
};
goog.style.getComputedOverflowX = function(a) {
    return goog.style.getStyle_(a, "overflowX")
};
goog.style.getComputedOverflowY = function(a) {
    return goog.style.getStyle_(a, "overflowY")
};
goog.style.getComputedZIndex = function(a) {
    return goog.style.getStyle_(a, "zIndex")
};
goog.style.getComputedTextAlign = function(a) {
    return goog.style.getStyle_(a, "textAlign")
};
goog.style.getComputedCursor = function(a) {
    return goog.style.getStyle_(a, "cursor")
};
goog.style.getComputedTransform = function(a) {
    var b = goog.style.getVendorStyleName_(a, "transform");
    return goog.style.getStyle_(a, b) || goog.style.getStyle_(a, "transform")
};
goog.style.setPosition = function(a, b, c) {
    if (b instanceof goog.math.Coordinate) {
        var d = b.x;
        b = b.y
    } else d = b, b = c;
    a.style.left = goog.style.getPixelStyleValue_(d, !1);
    a.style.top = goog.style.getPixelStyleValue_(b, !1)
};
goog.style.getPosition = function(a) {
    return new goog.math.Coordinate(a.offsetLeft, a.offsetTop)
};
goog.style.getClientViewportElement = function(a) {
    a = a ? goog.dom.getOwnerDocument(a) : goog.dom.getDocument();
    return !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9) || goog.dom.getDomHelper(a).isCss1CompatMode() ? a.documentElement : a.body
};
goog.style.getViewportPageOffset = function(a) {
    var b = a.body;
    a = a.documentElement;
    return new goog.math.Coordinate(b.scrollLeft || a.scrollLeft, b.scrollTop || a.scrollTop)
};
goog.style.getBoundingClientRect_ = function(a) {
    try {
        var b = a.getBoundingClientRect()
    } catch (c) {
        return {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        }
    }
    goog.userAgent.IE && a.ownerDocument.body && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
    return b
};
goog.style.getOffsetParent = function(a) {
    if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(8)) return goog.asserts.assert(a && "offsetParent" in a), a.offsetParent;
    var b = goog.dom.getOwnerDocument(a),
        c = goog.style.getStyle_(a, "position"),
        d = "fixed" == c || "absolute" == c;
    for (a = a.parentNode; a && a != b; a = a.parentNode)
        if (a.nodeType == goog.dom.NodeType.DOCUMENT_FRAGMENT && a.host && (a = a.host), c = goog.style.getStyle_(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth ||
                a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c)) return a;
    return null
};
goog.style.getVisibleRectForElement = function(a) {
    for (var b = new goog.math.Box(0, Infinity, Infinity, 0), c = goog.dom.getDomHelper(a), d = c.getDocument().body, e = c.getDocument().documentElement, f = c.getDocumentScrollElement(); a = goog.style.getOffsetParent(a);)
        if (!(goog.userAgent.IE && 0 == a.clientWidth || goog.userAgent.WEBKIT && 0 == a.clientHeight && a == d) && a != d && a != e && "visible" != goog.style.getStyle_(a, "overflow")) {
            var g = goog.style.getPageOffset(a),
                h = goog.style.getClientLeftTop(a);
            g.x += h.x;
            g.y += h.y;
            b.top = Math.max(b.top,
                g.y);
            b.right = Math.min(b.right, g.x + a.clientWidth);
            b.bottom = Math.min(b.bottom, g.y + a.clientHeight);
            b.left = Math.max(b.left, g.x)
        }
    d = f.scrollLeft;
    f = f.scrollTop;
    b.left = Math.max(b.left, d);
    b.top = Math.max(b.top, f);
    c = c.getViewportSize();
    b.right = Math.min(b.right, d + c.width);
    b.bottom = Math.min(b.bottom, f + c.height);
    return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : null
};
goog.style.getContainerOffsetToScrollInto = function(a, b, c) {
    var d = b || goog.dom.getDocumentScrollElement(),
        e = goog.style.getPageOffset(a),
        f = goog.style.getPageOffset(d),
        g = goog.style.getBorderBox(d);
    d == goog.dom.getDocumentScrollElement() ? (b = e.x - d.scrollLeft, e = e.y - d.scrollTop, goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(10) && (b += g.left, e += g.top)) : (b = e.x - f.x - g.left, e = e.y - f.y - g.top);
    g = goog.style.getSizeWithDisplay_(a);
    a = d.clientWidth - g.width;
    g = d.clientHeight - g.height;
    f = d.scrollLeft;
    d = d.scrollTop;
    c ? (f += b - a / 2, d += e - g / 2) : (f += Math.min(b, Math.max(b - a, 0)), d += Math.min(e, Math.max(e - g, 0)));
    return new goog.math.Coordinate(f, d)
};
goog.style.scrollIntoContainerView = function(a, b, c) {
    b = b || goog.dom.getDocumentScrollElement();
    a = goog.style.getContainerOffsetToScrollInto(a, b, c);
    b.scrollLeft = a.x;
    b.scrollTop = a.y
};
goog.style.getClientLeftTop = function(a) {
    return new goog.math.Coordinate(a.clientLeft, a.clientTop)
};
goog.style.getPageOffset = function(a) {
    var b = goog.dom.getOwnerDocument(a);
    goog.asserts.assertObject(a, "Parameter is required");
    var c = new goog.math.Coordinate(0, 0),
        d = goog.style.getClientViewportElement(b);
    if (a == d) return c;
    a = goog.style.getBoundingClientRect_(a);
    b = goog.dom.getDomHelper(b).getDocumentScroll();
    c.x = a.left + b.x;
    c.y = a.top + b.y;
    return c
};
goog.style.getPageOffsetLeft = function(a) {
    return goog.style.getPageOffset(a).x
};
goog.style.getPageOffsetTop = function(a) {
    return goog.style.getPageOffset(a).y
};
goog.style.getFramedPageOffset = function(a, b) {
    var c = new goog.math.Coordinate(0, 0),
        d = goog.dom.getWindow(goog.dom.getOwnerDocument(a));
    if (!goog.reflect.canAccessProperty(d, "parent")) return c;
    var e = a;
    do {
        var f = d == b ? goog.style.getPageOffset(e) : goog.style.getClientPositionForElement_(goog.asserts.assert(e));
        c.x += f.x;
        c.y += f.y
    } while (d && d != b && d != d.parent && (e = d.frameElement) && (d = d.parent));
    return c
};
goog.style.translateRectForAnotherFrame = function(a, b, c) {
    if (b.getDocument() != c.getDocument()) {
        var d = b.getDocument().body;
        c = goog.style.getFramedPageOffset(d, c.getWindow());
        c = goog.math.Coordinate.difference(c, goog.style.getPageOffset(d));
        !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9) || b.isCss1CompatMode() || (c = goog.math.Coordinate.difference(c, b.getDocumentScroll()));
        a.left += c.x;
        a.top += c.y
    }
};
goog.style.getRelativePosition = function(a, b) {
    var c = goog.style.getClientPosition(a),
        d = goog.style.getClientPosition(b);
    return new goog.math.Coordinate(c.x - d.x, c.y - d.y)
};
goog.style.getClientPositionForElement_ = function(a) {
    a = goog.style.getBoundingClientRect_(a);
    return new goog.math.Coordinate(a.left, a.top)
};
goog.style.getClientPosition = function(a) {
    goog.asserts.assert(a);
    if (a.nodeType == goog.dom.NodeType.ELEMENT) return goog.style.getClientPositionForElement_(a);
    a = a.changedTouches ? a.changedTouches[0] : a;
    return new goog.math.Coordinate(a.clientX, a.clientY)
};
goog.style.setPageOffset = function(a, b, c) {
    var d = goog.style.getPageOffset(a);
    b instanceof goog.math.Coordinate && (c = b.y, b = b.x);
    b = goog.asserts.assertNumber(b) - d.x;
    goog.style.setPosition(a, a.offsetLeft + b, a.offsetTop + (Number(c) - d.y))
};
goog.style.setSize = function(a, b, c) {
    if (b instanceof goog.math.Size) c = b.height, b = b.width;
    else if (void 0 == c) throw Error("missing height argument");
    goog.style.setWidth(a, b);
    goog.style.setHeight(a, c)
};
goog.style.getPixelStyleValue_ = function(a, b) {
    "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
    return a
};
goog.style.setHeight = function(a, b) {
    a.style.height = goog.style.getPixelStyleValue_(b, !0)
};
goog.style.setWidth = function(a, b) {
    a.style.width = goog.style.getPixelStyleValue_(b, !0)
};
goog.style.getSize = function(a) {
    return goog.style.evaluateWithTemporaryDisplay_(goog.style.getSizeWithDisplay_, a)
};
goog.style.evaluateWithTemporaryDisplay_ = function(a, b) {
    if ("none" != goog.style.getStyle_(b, "display")) return a(b);
    var c = b.style,
        d = c.display,
        e = c.visibility,
        f = c.position;
    c.visibility = "hidden";
    c.position = "absolute";
    c.display = "inline";
    var g = a(b);
    c.display = d;
    c.position = f;
    c.visibility = e;
    return g
};
goog.style.getSizeWithDisplay_ = function(a) {
    var b = a.offsetWidth,
        c = a.offsetHeight,
        d = goog.userAgent.WEBKIT && !b && !c;
    return (void 0 === b || d) && a.getBoundingClientRect ? (a = goog.style.getBoundingClientRect_(a), new goog.math.Size(a.right - a.left, a.bottom - a.top)) : new goog.math.Size(b, c)
};
goog.style.getTransformedSize = function(a) {
    if (!a.getBoundingClientRect) return null;
    a = goog.style.evaluateWithTemporaryDisplay_(goog.style.getBoundingClientRect_, a);
    return new goog.math.Size(a.right - a.left, a.bottom - a.top)
};
goog.style.getBounds = function(a) {
    var b = goog.style.getPageOffset(a);
    a = goog.style.getSize(a);
    return new goog.math.Rect(b.x, b.y, a.width, a.height)
};
goog.style.toCamelCase = function(a) {
    return goog.string.toCamelCase(String(a))
};
goog.style.toSelectorCase = function(a) {
    return goog.string.toSelectorCase(a)
};
goog.style.getOpacity = function(a) {
    goog.asserts.assert(a);
    var b = a.style;
    a = "";
    "opacity" in b ? a = b.opacity : "MozOpacity" in b ? a = b.MozOpacity : "filter" in b && (b = b.filter.match(/alpha\(opacity=([\d.]+)\)/)) && (a = String(b[1] / 100));
    return "" == a ? a : Number(a)
};
goog.style.setOpacity = function(a, b) {
    goog.asserts.assert(a);
    var c = a.style;
    "opacity" in c ? c.opacity = b : "MozOpacity" in c ? c.MozOpacity = b : "filter" in c && (c.filter = "" === b ? "" : "alpha(opacity=" + 100 * Number(b) + ")")
};
goog.style.setTransparentBackgroundImage = function(a, b) {
    var c = a.style;
    goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? c.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + b + '", sizingMethod="crop")' : (c.backgroundImage = "url(" + b + ")", c.backgroundPosition = "top left", c.backgroundRepeat = "no-repeat")
};
goog.style.clearTransparentBackgroundImage = function(a) {
    a = a.style;
    "filter" in a ? a.filter = "" : a.backgroundImage = "none"
};
goog.style.showElement = function(a, b) {
    goog.style.setElementShown(a, b)
};
goog.style.setElementShown = function(a, b) {
    a.style.display = b ? "" : "none"
};
goog.style.isElementShown = function(a) {
    return "none" != a.style.display
};
goog.style.installSafeStyleSheet = function(a, b) {
    var c = goog.dom.getDomHelper(b),
        d = c.getDocument();
    if (goog.userAgent.IE && d.createStyleSheet) return c = d.createStyleSheet(), goog.style.setSafeStyleSheet(c, a), c;
    d = c.getElementsByTagNameAndClass("HEAD")[0];
    if (!d) {
        var e = c.getElementsByTagNameAndClass("BODY")[0];
        d = c.createDom("HEAD");
        e.parentNode.insertBefore(d, e)
    }
    e = c.createDom("STYLE");
    goog.style.setSafeStyleSheet(e, a);
    c.appendChild(d, e);
    return e
};
goog.style.uninstallStyles = function(a) {
    goog.dom.removeNode(a.ownerNode || a.owningElement || a)
};
goog.style.setSafeStyleSheet = function(a, b) {
    var c = goog.html.SafeStyleSheet.unwrap(b);
    goog.userAgent.IE && void 0 !== a.cssText ? a.cssText = c : a.innerHTML = c
};
goog.style.setPreWrap = function(a) {
    a = a.style;
    goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? (a.whiteSpace = "pre", a.wordWrap = "break-word") : a.whiteSpace = goog.userAgent.GECKO ? "-moz-pre-wrap" : "pre-wrap"
};
goog.style.setInlineBlock = function(a) {
    a = a.style;
    a.position = "relative";
    goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? (a.zoom = "1", a.display = "inline") : a.display = "inline-block"
};
goog.style.isRightToLeft = function(a) {
    return "rtl" == goog.style.getStyle_(a, "direction")
};
goog.style.unselectableStyle_ = goog.userAgent.GECKO ? "MozUserSelect" : goog.userAgent.WEBKIT || goog.userAgent.EDGE ? "WebkitUserSelect" : null;
goog.style.isUnselectable = function(a) {
    return goog.style.unselectableStyle_ ? "none" == a.style[goog.style.unselectableStyle_].toLowerCase() : goog.userAgent.IE || goog.userAgent.OPERA ? "on" == a.getAttribute("unselectable") : !1
};
goog.style.setUnselectable = function(a, b, c) {
    c = c ? null : a.getElementsByTagName("*");
    var d = goog.style.unselectableStyle_;
    if (d) {
        if (b = b ? "none" : "", a.style && (a.style[d] = b), c) {
            a = 0;
            for (var e; e = c[a]; a++) e.style && (e.style[d] = b)
        }
    } else if (goog.userAgent.IE || goog.userAgent.OPERA)
        if (b = b ? "on" : "", a.setAttribute("unselectable", b), c)
            for (a = 0; e = c[a]; a++) e.setAttribute("unselectable", b)
};
goog.style.getBorderBoxSize = function(a) {
    return new goog.math.Size(a.offsetWidth, a.offsetHeight)
};
goog.style.setBorderBoxSize = function(a, b) {
    var c = goog.dom.getOwnerDocument(a),
        d = goog.dom.getDomHelper(c).isCss1CompatMode();
    if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10") || d && goog.userAgent.isVersionOrHigher("8")) goog.style.setBoxSizingSize_(a, b, "border-box");
    else if (c = a.style, d) {
        d = goog.style.getPaddingBox(a);
        var e = goog.style.getBorderBox(a);
        c.pixelWidth = b.width - e.left - d.left - d.right - e.right;
        c.pixelHeight = b.height - e.top - d.top - d.bottom - e.bottom
    } else c.pixelWidth = b.width, c.pixelHeight =
        b.height
};
goog.style.getContentBoxSize = function(a) {
    var b = goog.dom.getOwnerDocument(a),
        c = goog.userAgent.IE && a.currentStyle;
    if (c && goog.dom.getDomHelper(b).isCss1CompatMode() && "auto" != c.width && "auto" != c.height && !c.boxSizing) return b = goog.style.getIePixelValue_(a, c.width, "width", "pixelWidth"), a = goog.style.getIePixelValue_(a, c.height, "height", "pixelHeight"), new goog.math.Size(b, a);
    c = goog.style.getBorderBoxSize(a);
    b = goog.style.getPaddingBox(a);
    a = goog.style.getBorderBox(a);
    return new goog.math.Size(c.width - a.left -
        b.left - b.right - a.right, c.height - a.top - b.top - b.bottom - a.bottom)
};
goog.style.setContentBoxSize = function(a, b) {
    var c = goog.dom.getOwnerDocument(a),
        d = goog.dom.getDomHelper(c).isCss1CompatMode();
    if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10") || d && goog.userAgent.isVersionOrHigher("8")) goog.style.setBoxSizingSize_(a, b, "content-box");
    else if (c = a.style, d) c.pixelWidth = b.width, c.pixelHeight = b.height;
    else {
        d = goog.style.getPaddingBox(a);
        var e = goog.style.getBorderBox(a);
        c.pixelWidth = b.width + e.left + d.left + d.right + e.right;
        c.pixelHeight = b.height + e.top + d.top + d.bottom +
            e.bottom
    }
};
goog.style.setBoxSizingSize_ = function(a, b, c) {
    a = a.style;
    goog.userAgent.GECKO ? a.MozBoxSizing = c : goog.userAgent.WEBKIT ? a.WebkitBoxSizing = c : a.boxSizing = c;
    a.width = Math.max(b.width, 0) + "px";
    a.height = Math.max(b.height, 0) + "px"
};
goog.style.getIePixelValue_ = function(a, b, c, d) {
    if (/^\d+px?$/.test(b)) return parseInt(b, 10);
    var e = a.style[c],
        f = a.runtimeStyle[c];
    a.runtimeStyle[c] = a.currentStyle[c];
    a.style[c] = b;
    b = a.style[d];
    a.style[c] = e;
    a.runtimeStyle[c] = f;
    return +b
};
goog.style.getIePixelDistance_ = function(a, b) {
    var c = goog.style.getCascadedStyle(a, b);
    return c ? goog.style.getIePixelValue_(a, c, "left", "pixelLeft") : 0
};
goog.style.getBox_ = function(a, b) {
    if (goog.userAgent.IE) {
        var c = goog.style.getIePixelDistance_(a, b + "Left"),
            d = goog.style.getIePixelDistance_(a, b + "Right"),
            e = goog.style.getIePixelDistance_(a, b + "Top"),
            f = goog.style.getIePixelDistance_(a, b + "Bottom");
        return new goog.math.Box(e, d, f, c)
    }
    c = goog.style.getComputedStyle(a, b + "Left");
    d = goog.style.getComputedStyle(a, b + "Right");
    e = goog.style.getComputedStyle(a, b + "Top");
    f = goog.style.getComputedStyle(a, b + "Bottom");
    return new goog.math.Box(parseFloat(e), parseFloat(d), parseFloat(f),
        parseFloat(c))
};
goog.style.getPaddingBox = function(a) {
    return goog.style.getBox_(a, "padding")
};
goog.style.getMarginBox = function(a) {
    return goog.style.getBox_(a, "margin")
};
goog.style.ieBorderWidthKeywords_ = {
    thin: 2,
    medium: 4,
    thick: 6
};
goog.style.getIePixelBorder_ = function(a, b) {
    if ("none" == goog.style.getCascadedStyle(a, b + "Style")) return 0;
    var c = goog.style.getCascadedStyle(a, b + "Width");
    return c in goog.style.ieBorderWidthKeywords_ ? goog.style.ieBorderWidthKeywords_[c] : goog.style.getIePixelValue_(a, c, "left", "pixelLeft")
};
goog.style.getBorderBox = function(a) {
    if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
        var b = goog.style.getIePixelBorder_(a, "borderLeft"),
            c = goog.style.getIePixelBorder_(a, "borderRight"),
            d = goog.style.getIePixelBorder_(a, "borderTop");
        a = goog.style.getIePixelBorder_(a, "borderBottom");
        return new goog.math.Box(d, c, a, b)
    }
    b = goog.style.getComputedStyle(a, "borderLeftWidth");
    c = goog.style.getComputedStyle(a, "borderRightWidth");
    d = goog.style.getComputedStyle(a, "borderTopWidth");
    a = goog.style.getComputedStyle(a,
        "borderBottomWidth");
    return new goog.math.Box(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b))
};
goog.style.getFontFamily = function(a) {
    var b = goog.dom.getOwnerDocument(a),
        c = "";
    if (b.body.createTextRange && goog.dom.contains(b, a)) {
        b = b.body.createTextRange();
        b.moveToElementText(a);
        try {
            c = b.queryCommandValue("FontName")
        } catch (d) {
            c = ""
        }
    }
    c || (c = goog.style.getStyle_(a, "fontFamily"));
    a = c.split(",");
    1 < a.length && (c = a[0]);
    return goog.string.stripQuotes(c, "\"'")
};
goog.style.lengthUnitRegex_ = /[^\d]+$/;
goog.style.getLengthUnits = function(a) {
    return (a = a.match(goog.style.lengthUnitRegex_)) && a[0] || null
};
goog.style.ABSOLUTE_CSS_LENGTH_UNITS_ = {
    cm: 1,
    "in": 1,
    mm: 1,
    pc: 1,
    pt: 1
};
goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_ = {
    em: 1,
    ex: 1
};
goog.style.getFontSize = function(a) {
    var b = goog.style.getStyle_(a, "fontSize"),
        c = goog.style.getLengthUnits(b);
    if (b && "px" == c) return parseInt(b, 10);
    if (goog.userAgent.IE) {
        if (String(c) in goog.style.ABSOLUTE_CSS_LENGTH_UNITS_) return goog.style.getIePixelValue_(a, b, "left", "pixelLeft");
        if (a.parentNode && a.parentNode.nodeType == goog.dom.NodeType.ELEMENT && String(c) in goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_) return a = a.parentNode, c = goog.style.getStyle_(a, "fontSize"), goog.style.getIePixelValue_(a, b == c ? "1em" : b,
            "left", "pixelLeft")
    }
    c = goog.dom.createDom("SPAN", {
        style: "visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"
    });
    goog.dom.appendChild(a, c);
    b = c.offsetHeight;
    goog.dom.removeNode(c);
    return b
};
goog.style.parseStyleAttribute = function(a) {
    var b = {};
    goog.array.forEach(a.split(/\s*;\s*/), function(a) {
        var c = a.match(/\s*([\w-]+)\s*:(.+)/);
        c && (a = c[1], c = goog.string.trim(c[2]), b[goog.string.toCamelCase(a.toLowerCase())] = c)
    });
    return b
};
goog.style.toStyleAttribute = function(a) {
    var b = [];
    goog.object.forEach(a, function(a, d) {
        b.push(goog.string.toSelectorCase(d), ":", a, ";")
    });
    return b.join("")
};
goog.style.setFloat = function(a, b) {
    a.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] = b
};
goog.style.getFloat = function(a) {
    return a.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] || ""
};
goog.style.getScrollbarWidth = function(a) {
    var b = goog.dom.createElement("DIV");
    a && (b.className = a);
    b.style.cssText = "overflow:auto;position:absolute;top:0;width:100px;height:100px";
    a = goog.dom.createElement("DIV");
    goog.style.setSize(a, "200px", "200px");
    b.appendChild(a);
    goog.dom.appendChild(goog.dom.getDocument().body, b);
    a = b.offsetWidth - b.clientWidth;
    goog.dom.removeNode(b);
    return a
};
goog.style.MATRIX_TRANSLATION_REGEX_ = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
goog.style.getCssTranslation = function(a) {
    a = goog.style.getComputedTransform(a);
    return a ? (a = a.match(goog.style.MATRIX_TRANSLATION_REGEX_)) ? new goog.math.Coordinate(parseFloat(a[1]), parseFloat(a[2])) : new goog.math.Coordinate(0, 0) : new goog.math.Coordinate(0, 0)
};
goog.debug.entryPointRegistry = {};
goog.debug.EntryPointMonitor = function() {};
goog.debug.entryPointRegistry.refList_ = [];
goog.debug.entryPointRegistry.monitors_ = [];
goog.debug.entryPointRegistry.monitorsMayExist_ = !1;
goog.debug.entryPointRegistry.register = function(a) {
    goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = a;
    if (goog.debug.entryPointRegistry.monitorsMayExist_)
        for (var b = goog.debug.entryPointRegistry.monitors_, c = 0; c < b.length; c++) a(goog.bind(b[c].wrap, b[c]))
};
goog.debug.entryPointRegistry.monitorAll = function(a) {
    goog.debug.entryPointRegistry.monitorsMayExist_ = !0;
    for (var b = goog.bind(a.wrap, a), c = 0; c < goog.debug.entryPointRegistry.refList_.length; c++) goog.debug.entryPointRegistry.refList_[c](b);
    goog.debug.entryPointRegistry.monitors_.push(a)
};
goog.debug.entryPointRegistry.unmonitorAllIfPossible = function(a) {
    var b = goog.debug.entryPointRegistry.monitors_;
    goog.asserts.assert(a == b[b.length - 1], "Only the most recent monitor can be unwrapped.");
    a = goog.bind(a.unwrap, a);
    for (var c = 0; c < goog.debug.entryPointRegistry.refList_.length; c++) goog.debug.entryPointRegistry.refList_[c](a);
    b.length--
};
goog.debug.errorcontext = {};
goog.debug.errorcontext.addErrorContext = function(a, b, c) {
    a[goog.debug.errorcontext.CONTEXT_KEY_] || (a[goog.debug.errorcontext.CONTEXT_KEY_] = {});
    a[goog.debug.errorcontext.CONTEXT_KEY_][b] = c
};
goog.debug.errorcontext.getErrorContext = function(a) {
    return a[goog.debug.errorcontext.CONTEXT_KEY_] || {}
};
goog.debug.errorcontext.CONTEXT_KEY_ = "__closure__error__context__984382";
goog.debug.LOGGING_ENABLED = goog.DEBUG;
goog.debug.FORCE_SLOPPY_STACKS = !1;
goog.debug.catchErrors = function(a, b, c) {
    c = c || goog.global;
    var d = c.onerror,
        e = !!b;
    goog.userAgent.WEBKIT && !goog.userAgent.isVersionOrHigher("535.3") && (e = !e);
    c.onerror = function(b, c, h, k, l) {
        d && d(b, c, h, k, l);
        a({
            message: b,
            fileName: c,
            line: h,
            lineNumber: h,
            col: k,
            error: l
        });
        return e
    }
};
goog.debug.expose = function(a, b) {
    if ("undefined" == typeof a) return "undefined";
    if (null == a) return "NULL";
    var c = [],
        d;
    for (d in a)
        if (b || !goog.isFunction(a[d])) {
            var e = d + " = ";
            try {
                e += a[d]
            } catch (f) {
                e += "*** " + f + " ***"
            }
            c.push(e)
        }
    return c.join("\n")
};
goog.debug.deepExpose = function(a, b) {
    var c = [],
        d = [],
        e = {},
        f = function(a, g) {
            var h = g + "  ";
            try {
                if (void 0 === a) c.push("undefined");
                else if (null === a) c.push("NULL");
                else if ("string" === typeof a) c.push('"' + a.replace(/\n/g, "\n" + g) + '"');
                else if (goog.isFunction(a)) c.push(String(a).replace(/\n/g, "\n" + g));
                else if (goog.isObject(a)) {
                    goog.hasUid(a) || d.push(a);
                    var k = goog.getUid(a);
                    if (e[k]) c.push("*** reference loop detected (id=" + k + ") ***");
                    else {
                        e[k] = !0;
                        c.push("{");
                        for (var m in a)
                            if (b || !goog.isFunction(a[m])) c.push("\n"),
                                c.push(h), c.push(m + " = "), f(a[m], h);
                        c.push("\n" + g + "}");
                        delete e[k]
                    }
                } else c.push(a)
            } catch (q) {
                c.push("*** " + q + " ***")
            }
        };
    f(a, "");
    for (var g = 0; g < d.length; g++) goog.removeUid(d[g]);
    return c.join("")
};
goog.debug.exposeArray = function(a) {
    for (var b = [], c = 0; c < a.length; c++) goog.isArray(a[c]) ? b.push(goog.debug.exposeArray(a[c])) : b.push(a[c]);
    return "[ " + b.join(", ") + " ]"
};
goog.debug.normalizeErrorObject = function(a) {
    var b = goog.getObjectByName("window.location.href");
    null == a && (a = 'Unknown Error of type "null/undefined"');
    if ("string" === typeof a) return {
        message: a,
        name: "Unknown error",
        lineNumber: "Not available",
        fileName: b,
        stack: "Not available"
    };
    var c = !1;
    try {
        var d = a.lineNumber || a.line || "Not available"
    } catch (f) {
        d = "Not available", c = !0
    }
    try {
        var e = a.fileName || a.filename || a.sourceURL || goog.global.$googDebugFname || b
    } catch (f) {
        e = "Not available", c = !0
    }
    return !c && a.lineNumber && a.fileName &&
        a.stack && a.message && a.name ? a : (b = a.message, null == b && (b = a.constructor && a.constructor instanceof Function ? 'Unknown Error of type "' + (a.constructor.name ? a.constructor.name : goog.debug.getFunctionName(a.constructor)) + '"' : "Unknown Error of unknown type"), {
            message: b,
            name: a.name || "UnknownError",
            lineNumber: d,
            fileName: e,
            stack: a.stack || "Not available"
        })
};
goog.debug.enhanceError = function(a, b) {
    if (a instanceof Error) var c = a;
    else c = Error(a), Error.captureStackTrace && Error.captureStackTrace(c, goog.debug.enhanceError);
    c.stack || (c.stack = goog.debug.getStacktrace(goog.debug.enhanceError));
    if (b) {
        for (var d = 0; c["message" + d];) ++d;
        c["message" + d] = String(b)
    }
    return c
};
goog.debug.enhanceErrorWithContext = function(a, b) {
    var c = goog.debug.enhanceError(a);
    if (b)
        for (var d in b) goog.debug.errorcontext.addErrorContext(c, d, b[d]);
    return c
};
goog.debug.getStacktraceSimple = function(a) {
    if (!goog.debug.FORCE_SLOPPY_STACKS) {
        var b = goog.debug.getNativeStackTrace_(goog.debug.getStacktraceSimple);
        if (b) return b
    }
    b = [];
    for (var c = arguments.callee.caller, d = 0; c && (!a || d < a);) {
        b.push(goog.debug.getFunctionName(c));
        b.push("()\n");
        try {
            c = c.caller
        } catch (e) {
            b.push("[exception trying to get caller]\n");
            break
        }
        d++;
        if (d >= goog.debug.MAX_STACK_DEPTH) {
            b.push("[...long stack...]");
            break
        }
    }
    a && d >= a ? b.push("[...reached max depth limit...]") : b.push("[end]");
    return b.join("")
};
goog.debug.MAX_STACK_DEPTH = 50;
goog.debug.getNativeStackTrace_ = function(a) {
    var b = Error();
    if (Error.captureStackTrace) return Error.captureStackTrace(b, a), String(b.stack);
    try {
        throw b;
    } catch (c) {
        b = c
    }
    return (a = b.stack) ? String(a) : null
};
goog.debug.getStacktrace = function(a) {
    var b;
    goog.debug.FORCE_SLOPPY_STACKS || (b = goog.debug.getNativeStackTrace_(a || goog.debug.getStacktrace));
    b || (b = goog.debug.getStacktraceHelper_(a || arguments.callee.caller, []));
    return b
};
goog.debug.getStacktraceHelper_ = function(a, b) {
    var c = [];
    if (goog.array.contains(b, a)) c.push("[...circular reference...]");
    else if (a && b.length < goog.debug.MAX_STACK_DEPTH) {
        c.push(goog.debug.getFunctionName(a) + "(");
        for (var d = a.arguments, e = 0; d && e < d.length; e++) {
            0 < e && c.push(", ");
            var f = d[e];
            switch (typeof f) {
                case "object":
                    f = f ? "object" : "null";
                    break;
                case "string":
                    break;
                case "number":
                    f = String(f);
                    break;
                case "boolean":
                    f = f ? "true" : "false";
                    break;
                case "function":
                    f = (f = goog.debug.getFunctionName(f)) ? f : "[fn]";
                    break;
                default:
                    f =
                        typeof f
            }
            40 < f.length && (f = f.substr(0, 40) + "...");
            c.push(f)
        }
        b.push(a);
        c.push(")\n");
        try {
            c.push(goog.debug.getStacktraceHelper_(a.caller, b))
        } catch (g) {
            c.push("[exception trying to get caller]\n")
        }
    } else a ? c.push("[...long stack...]") : c.push("[end]");
    return c.join("")
};
goog.debug.getFunctionName = function(a) {
    if (goog.debug.fnNameCache_[a]) return goog.debug.fnNameCache_[a];
    a = String(a);
    if (!goog.debug.fnNameCache_[a]) {
        var b = /function\s+([^\(]+)/m.exec(a);
        goog.debug.fnNameCache_[a] = b ? b[1] : "[Anonymous]"
    }
    return goog.debug.fnNameCache_[a]
};
goog.debug.makeWhitespaceVisible = function(a) {
    return a.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]")
};
goog.debug.runtimeType = function(a) {
    return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
};
goog.debug.fnNameCache_ = {};
goog.debug.freezeInternal_ = goog.DEBUG && Object.freeze || function(a) {
    return a
};
goog.debug.freeze = function(a) {
    return goog.debug.freezeInternal_(a)
};
goog.events = {};
$jscomp.scope.purify = function(a) {
    return {
        valueOf: a
    }.valueOf()
};
goog.events.BrowserFeature = {
    HAS_W3C_BUTTON: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
    HAS_W3C_EVENT_SUPPORT: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
    SET_KEY_CODE_TO_PREVENT_DEFAULT: goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
    HAS_NAVIGATOR_ONLINE_PROPERTY: !goog.userAgent.WEBKIT || goog.userAgent.isVersionOrHigher("528"),
    HAS_HTML5_NETWORK_EVENT_SUPPORT: goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9b") || goog.userAgent.IE && goog.userAgent.isVersionOrHigher("8") ||
        goog.userAgent.OPERA && goog.userAgent.isVersionOrHigher("9.5") || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("528"),
    HTML5_NETWORK_EVENTS_FIRE_ON_BODY: goog.userAgent.GECKO && !goog.userAgent.isVersionOrHigher("8") || goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
    TOUCH_ENABLED: "ontouchstart" in goog.global || !!(goog.global.document && document.documentElement && "ontouchstart" in document.documentElement) || !(!goog.global.navigator || !goog.global.navigator.maxTouchPoints && !goog.global.navigator.msMaxTouchPoints),
    POINTER_EVENTS: "PointerEvent" in goog.global,
    MSPOINTER_EVENTS: "MSPointerEvent" in goog.global && !(!goog.global.navigator || !goog.global.navigator.msPointerEnabled),
    PASSIVE_EVENTS: (0, $jscomp.scope.purify)(function() {
        if (!goog.global.addEventListener || !Object.defineProperty) return !1;
        var a = !1,
            b = Object.defineProperty({}, "passive", {
                get: function() {
                    a = !0
                }
            });
        try {
            goog.global.addEventListener("test", goog.nullFunction, b), goog.global.removeEventListener("test", goog.nullFunction, b)
        } catch (c) {}
        return a
    })
};
goog.disposable = {};
goog.disposable.IDisposable = function() {};
goog.disposable.IDisposable.prototype.dispose = goog.abstractMethod;
goog.disposable.IDisposable.prototype.isDisposed = goog.abstractMethod;
goog.Disposable = function() {
    goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF && (goog.Disposable.INCLUDE_STACK_ON_CREATION && (this.creationStack = Error().stack), goog.Disposable.instances_[goog.getUid(this)] = this);
    this.disposed_ = this.disposed_;
    this.onDisposeCallbacks_ = this.onDisposeCallbacks_
};
goog.Disposable.MonitoringMode = {
    OFF: 0,
    PERMANENT: 1,
    INTERACTIVE: 2
};
goog.Disposable.MONITORING_MODE = 0;
goog.Disposable.INCLUDE_STACK_ON_CREATION = !0;
goog.Disposable.instances_ = {};
goog.Disposable.getUndisposedObjects = function() {
    var a = [],
        b;
    for (b in goog.Disposable.instances_) goog.Disposable.instances_.hasOwnProperty(b) && a.push(goog.Disposable.instances_[Number(b)]);
    return a
};
goog.Disposable.clearUndisposedObjects = function() {
    goog.Disposable.instances_ = {}
};
goog.Disposable.prototype.disposed_ = !1;
goog.Disposable.prototype.isDisposed = function() {
    return this.disposed_
};
goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed;
goog.Disposable.prototype.dispose = function() {
    if (!this.disposed_ && (this.disposed_ = !0, this.disposeInternal(), goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF)) {
        var a = goog.getUid(this);
        if (goog.Disposable.MONITORING_MODE == goog.Disposable.MonitoringMode.PERMANENT && !goog.Disposable.instances_.hasOwnProperty(a)) throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");
        if (goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF &&
            this.onDisposeCallbacks_ && 0 < this.onDisposeCallbacks_.length) throw Error(this + " did not empty its onDisposeCallbacks queue. This probably means it overrode dispose() or disposeInternal() without calling the superclass' method.");
        delete goog.Disposable.instances_[a]
    }
};
goog.Disposable.prototype.registerDisposable = function(a) {
    this.addOnDisposeCallback(goog.partial(goog.dispose, a))
};
goog.Disposable.prototype.addOnDisposeCallback = function(a, b) {
    this.disposed_ ? void 0 !== b ? a.call(b) : a() : (this.onDisposeCallbacks_ || (this.onDisposeCallbacks_ = []), this.onDisposeCallbacks_.push(void 0 !== b ? goog.bind(a, b) : a))
};
goog.Disposable.prototype.disposeInternal = function() {
    if (this.onDisposeCallbacks_)
        for (; this.onDisposeCallbacks_.length;) this.onDisposeCallbacks_.shift()()
};
goog.Disposable.isDisposed = function(a) {
    return a && "function" == typeof a.isDisposed ? a.isDisposed() : !1
};
goog.dispose = function(a) {
    a && "function" == typeof a.dispose && a.dispose()
};
goog.disposeAll = function(a) {
    for (var b = 0, c = arguments.length; b < c; ++b) {
        var d = arguments[b];
        goog.isArrayLike(d) ? goog.disposeAll.apply(null, d) : goog.dispose(d)
    }
};
goog.events.EventId = function(a) {
    this.id = a
};
goog.events.EventId.prototype.toString = function() {
    return this.id
};
goog.events.Event = function(a, b) {
    this.type = a instanceof goog.events.EventId ? String(a) : a;
    this.currentTarget = this.target = b;
    this.defaultPrevented = this.propagationStopped_ = !1;
    this.returnValue_ = !0
};
goog.events.Event.prototype.stopPropagation = function() {
    this.propagationStopped_ = !0
};
goog.events.Event.prototype.preventDefault = function() {
    this.defaultPrevented = !0;
    this.returnValue_ = !1
};
goog.events.Event.stopPropagation = function(a) {
    a.stopPropagation()
};
goog.events.Event.preventDefault = function(a) {
    a.preventDefault()
};
goog.events.getVendorPrefixedName_ = function(a) {
    return goog.userAgent.WEBKIT ? "webkit" + a : goog.userAgent.OPERA ? "o" + a.toLowerCase() : a.toLowerCase()
};
goog.events.EventType = {
    CLICK: "click",
    RIGHTCLICK: "rightclick",
    DBLCLICK: "dblclick",
    AUXCLICK: "auxclick",
    MOUSEDOWN: "mousedown",
    MOUSEUP: "mouseup",
    MOUSEOVER: "mouseover",
    MOUSEOUT: "mouseout",
    MOUSEMOVE: "mousemove",
    MOUSEENTER: "mouseenter",
    MOUSELEAVE: "mouseleave",
    MOUSECANCEL: "mousecancel",
    SELECTIONCHANGE: "selectionchange",
    SELECTSTART: "selectstart",
    WHEEL: "wheel",
    KEYPRESS: "keypress",
    KEYDOWN: "keydown",
    KEYUP: "keyup",
    BLUR: "blur",
    FOCUS: "focus",
    DEACTIVATE: "deactivate",
    FOCUSIN: "focusin",
    FOCUSOUT: "focusout",
    CHANGE: "change",
    RESET: "reset",
    SELECT: "select",
    SUBMIT: "submit",
    INPUT: "input",
    PROPERTYCHANGE: "propertychange",
    DRAGSTART: "dragstart",
    DRAG: "drag",
    DRAGENTER: "dragenter",
    DRAGOVER: "dragover",
    DRAGLEAVE: "dragleave",
    DROP: "drop",
    DRAGEND: "dragend",
    TOUCHSTART: "touchstart",
    TOUCHMOVE: "touchmove",
    TOUCHEND: "touchend",
    TOUCHCANCEL: "touchcancel",
    BEFOREUNLOAD: "beforeunload",
    CONSOLEMESSAGE: "consolemessage",
    CONTEXTMENU: "contextmenu",
    DEVICECHANGE: "devicechange",
    DEVICEMOTION: "devicemotion",
    DEVICEORIENTATION: "deviceorientation",
    DOMCONTENTLOADED: "DOMContentLoaded",
    ERROR: "error",
    HELP: "help",
    LOAD: "load",
    LOSECAPTURE: "losecapture",
    ORIENTATIONCHANGE: "orientationchange",
    READYSTATECHANGE: "readystatechange",
    RESIZE: "resize",
    SCROLL: "scroll",
    UNLOAD: "unload",
    CANPLAY: "canplay",
    CANPLAYTHROUGH: "canplaythrough",
    DURATIONCHANGE: "durationchange",
    EMPTIED: "emptied",
    ENDED: "ended",
    LOADEDDATA: "loadeddata",
    LOADEDMETADATA: "loadedmetadata",
    PAUSE: "pause",
    PLAY: "play",
    PLAYING: "playing",
    PROGRESS: "progress",
    RATECHANGE: "ratechange",
    SEEKED: "seeked",
    SEEKING: "seeking",
    STALLED: "stalled",
    SUSPEND: "suspend",
    TIMEUPDATE: "timeupdate",
    VOLUMECHANGE: "volumechange",
    WAITING: "waiting",
    SOURCEOPEN: "sourceopen",
    SOURCEENDED: "sourceended",
    SOURCECLOSED: "sourceclosed",
    ABORT: "abort",
    UPDATE: "update",
    UPDATESTART: "updatestart",
    UPDATEEND: "updateend",
    HASHCHANGE: "hashchange",
    PAGEHIDE: "pagehide",
    PAGESHOW: "pageshow",
    POPSTATE: "popstate",
    COPY: "copy",
    PASTE: "paste",
    CUT: "cut",
    BEFORECOPY: "beforecopy",
    BEFORECUT: "beforecut",
    BEFOREPASTE: "beforepaste",
    ONLINE: "online",
    OFFLINE: "offline",
    MESSAGE: "message",
    CONNECT: "connect",
    INSTALL: "install",
    ACTIVATE: "activate",
    FETCH: "fetch",
    FOREIGNFETCH: "foreignfetch",
    MESSAGEERROR: "messageerror",
    STATECHANGE: "statechange",
    UPDATEFOUND: "updatefound",
    CONTROLLERCHANGE: "controllerchange",
    ANIMATIONSTART: goog.events.getVendorPrefixedName_("AnimationStart"),
    ANIMATIONEND: goog.events.getVendorPrefixedName_("AnimationEnd"),
    ANIMATIONITERATION: goog.events.getVendorPrefixedName_("AnimationIteration"),
    TRANSITIONEND: goog.events.getVendorPrefixedName_("TransitionEnd"),
    POINTERDOWN: "pointerdown",
    POINTERUP: "pointerup",
    POINTERCANCEL: "pointercancel",
    POINTERMOVE: "pointermove",
    POINTEROVER: "pointerover",
    POINTEROUT: "pointerout",
    POINTERENTER: "pointerenter",
    POINTERLEAVE: "pointerleave",
    GOTPOINTERCAPTURE: "gotpointercapture",
    LOSTPOINTERCAPTURE: "lostpointercapture",
    MSGESTURECHANGE: "MSGestureChange",
    MSGESTUREEND: "MSGestureEnd",
    MSGESTUREHOLD: "MSGestureHold",
    MSGESTURESTART: "MSGestureStart",
    MSGESTURETAP: "MSGestureTap",
    MSGOTPOINTERCAPTURE: "MSGotPointerCapture",
    MSINERTIASTART: "MSInertiaStart",
    MSLOSTPOINTERCAPTURE: "MSLostPointerCapture",
    MSPOINTERCANCEL: "MSPointerCancel",
    MSPOINTERDOWN: "MSPointerDown",
    MSPOINTERENTER: "MSPointerEnter",
    MSPOINTERHOVER: "MSPointerHover",
    MSPOINTERLEAVE: "MSPointerLeave",
    MSPOINTERMOVE: "MSPointerMove",
    MSPOINTEROUT: "MSPointerOut",
    MSPOINTEROVER: "MSPointerOver",
    MSPOINTERUP: "MSPointerUp",
    TEXT: "text",
    TEXTINPUT: goog.userAgent.IE ? "textinput" : "textInput",
    COMPOSITIONSTART: "compositionstart",
    COMPOSITIONUPDATE: "compositionupdate",
    COMPOSITIONEND: "compositionend",
    BEFOREINPUT: "beforeinput",
    EXIT: "exit",
    LOADABORT: "loadabort",
    LOADCOMMIT: "loadcommit",
    LOADREDIRECT: "loadredirect",
    LOADSTART: "loadstart",
    LOADSTOP: "loadstop",
    RESPONSIVE: "responsive",
    SIZECHANGED: "sizechanged",
    UNRESPONSIVE: "unresponsive",
    VISIBILITYCHANGE: "visibilitychange",
    STORAGE: "storage",
    DOMSUBTREEMODIFIED: "DOMSubtreeModified",
    DOMNODEINSERTED: "DOMNodeInserted",
    DOMNODEREMOVED: "DOMNodeRemoved",
    DOMNODEREMOVEDFROMDOCUMENT: "DOMNodeRemovedFromDocument",
    DOMNODEINSERTEDINTODOCUMENT: "DOMNodeInsertedIntoDocument",
    DOMATTRMODIFIED: "DOMAttrModified",
    DOMCHARACTERDATAMODIFIED: "DOMCharacterDataModified",
    BEFOREPRINT: "beforeprint",
    AFTERPRINT: "afterprint",
    BEFOREINSTALLPROMPT: "beforeinstallprompt",
    APPINSTALLED: "appinstalled"
};
goog.events.getPointerFallbackEventName_ = function(a, b, c) {
    return goog.events.BrowserFeature.POINTER_EVENTS ? a : goog.events.BrowserFeature.MSPOINTER_EVENTS ? b : c
};
goog.events.PointerFallbackEventType = {
    POINTERDOWN: goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTERDOWN, goog.events.EventType.MSPOINTERDOWN, goog.events.EventType.MOUSEDOWN),
    POINTERUP: goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTERUP, goog.events.EventType.MSPOINTERUP, goog.events.EventType.MOUSEUP),
    POINTERCANCEL: goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTERCANCEL, goog.events.EventType.MSPOINTERCANCEL, goog.events.EventType.MOUSECANCEL),
    POINTERMOVE: goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTERMOVE, goog.events.EventType.MSPOINTERMOVE, goog.events.EventType.MOUSEMOVE),
    POINTEROVER: goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTEROVER, goog.events.EventType.MSPOINTEROVER, goog.events.EventType.MOUSEOVER),
    POINTEROUT: goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTEROUT, goog.events.EventType.MSPOINTEROUT, goog.events.EventType.MOUSEOUT),
    POINTERENTER: goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTERENTER,
        goog.events.EventType.MSPOINTERENTER, goog.events.EventType.MOUSEENTER),
    POINTERLEAVE: goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTERLEAVE, goog.events.EventType.MSPOINTERLEAVE, goog.events.EventType.MOUSELEAVE)
};
goog.events.PointerTouchFallbackEventType = {
    POINTERDOWN: goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTERDOWN, goog.events.EventType.MSPOINTERDOWN, goog.events.EventType.TOUCHSTART),
    POINTERUP: goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTERUP, goog.events.EventType.MSPOINTERUP, goog.events.EventType.TOUCHEND),
    POINTERCANCEL: goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTERCANCEL, goog.events.EventType.MSPOINTERCANCEL, goog.events.EventType.TOUCHCANCEL),
    POINTERMOVE: goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTERMOVE, goog.events.EventType.MSPOINTERMOVE, goog.events.EventType.TOUCHMOVE)
};
goog.events.PointerAsMouseEventType = {
    MOUSEDOWN: goog.events.PointerFallbackEventType.POINTERDOWN,
    MOUSEUP: goog.events.PointerFallbackEventType.POINTERUP,
    MOUSECANCEL: goog.events.PointerFallbackEventType.POINTERCANCEL,
    MOUSEMOVE: goog.events.PointerFallbackEventType.POINTERMOVE,
    MOUSEOVER: goog.events.PointerFallbackEventType.POINTEROVER,
    MOUSEOUT: goog.events.PointerFallbackEventType.POINTEROUT,
    MOUSEENTER: goog.events.PointerFallbackEventType.POINTERENTER,
    MOUSELEAVE: goog.events.PointerFallbackEventType.POINTERLEAVE
};
goog.events.MouseAsMouseEventType = {
    MOUSEDOWN: goog.events.EventType.MOUSEDOWN,
    MOUSEUP: goog.events.EventType.MOUSEUP,
    MOUSECANCEL: goog.events.EventType.MOUSECANCEL,
    MOUSEMOVE: goog.events.EventType.MOUSEMOVE,
    MOUSEOVER: goog.events.EventType.MOUSEOVER,
    MOUSEOUT: goog.events.EventType.MOUSEOUT,
    MOUSEENTER: goog.events.EventType.MOUSEENTER,
    MOUSELEAVE: goog.events.EventType.MOUSELEAVE
};
goog.events.PointerAsTouchEventType = {
    TOUCHCANCEL: goog.events.PointerTouchFallbackEventType.POINTERCANCEL,
    TOUCHEND: goog.events.PointerTouchFallbackEventType.POINTERUP,
    TOUCHMOVE: goog.events.PointerTouchFallbackEventType.POINTERMOVE,
    TOUCHSTART: goog.events.PointerTouchFallbackEventType.POINTERDOWN
};
goog.events.USE_LAYER_XY_AS_OFFSET_XY = !1;
goog.events.BrowserEvent = function(a, b) {
    goog.events.Event.call(this, a ? a.type : "");
    this.relatedTarget = this.currentTarget = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
    this.key = "";
    this.charCode = this.keyCode = 0;
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.state = null;
    this.platformModifierKey = !1;
    this.pointerId = 0;
    this.pointerType = "";
    this.event_ = null;
    a && this.init(a, b)
};
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.MouseButton = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
};
goog.events.BrowserEvent.PointerType = {
    MOUSE: "mouse",
    PEN: "pen",
    TOUCH: "touch"
};
goog.events.BrowserEvent.IEButtonMap = goog.debug.freeze([1, 4, 2]);
goog.events.BrowserEvent.IE_BUTTON_MAP = goog.events.BrowserEvent.IEButtonMap;
goog.events.BrowserEvent.IE_POINTER_TYPE_MAP = goog.debug.freeze({
    2: goog.events.BrowserEvent.PointerType.TOUCH,
    3: goog.events.BrowserEvent.PointerType.PEN,
    4: goog.events.BrowserEvent.PointerType.MOUSE
});
goog.events.BrowserEvent.prototype.init = function(a, b) {
    var c = this.type = a.type,
        d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
    this.target = a.target || a.srcElement;
    this.currentTarget = b;
    var e = a.relatedTarget;
    e ? goog.userAgent.GECKO && (goog.reflect.canAccessProperty(e, "nodeName") || (e = null)) : c == goog.events.EventType.MOUSEOVER ? e = a.fromElement : c == goog.events.EventType.MOUSEOUT && (e = a.toElement);
    this.relatedTarget = e;
    d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !==
        d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (goog.events.USE_LAYER_XY_AS_OFFSET_XY ? (this.offsetX = void 0 !== a.layerX ? a.layerX : a.offsetX, this.offsetY = void 0 !== a.layerY ? a.layerY : a.offsetY) : (this.offsetX = goog.userAgent.WEBKIT || void 0 !== a.offsetX ? a.offsetX : a.layerX, this.offsetY = goog.userAgent.WEBKIT || void 0 !== a.offsetY ? a.offsetY : a.layerY), this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY =
        a.screenY || 0);
    this.button = a.button;
    this.keyCode = a.keyCode || 0;
    this.key = a.key || "";
    this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
    this.ctrlKey = a.ctrlKey;
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.platformModifierKey = goog.userAgent.MAC ? a.metaKey : a.ctrlKey;
    this.pointerId = a.pointerId || 0;
    this.pointerType = goog.events.BrowserEvent.getPointerType_(a);
    this.state = a.state;
    this.event_ = a;
    a.defaultPrevented && this.preventDefault()
};
goog.events.BrowserEvent.prototype.isButton = function(a) {
    return goog.events.BrowserFeature.HAS_W3C_BUTTON ? this.event_.button == a : "click" == this.type ? a == goog.events.BrowserEvent.MouseButton.LEFT : !!(this.event_.button & goog.events.BrowserEvent.IE_BUTTON_MAP[a])
};
goog.events.BrowserEvent.prototype.isMouseActionButton = function() {
    return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && !(goog.userAgent.WEBKIT && goog.userAgent.MAC && this.ctrlKey)
};
goog.events.BrowserEvent.prototype.stopPropagation = function() {
    goog.events.BrowserEvent.superClass_.stopPropagation.call(this);
    this.event_.stopPropagation ? this.event_.stopPropagation() : this.event_.cancelBubble = !0
};
goog.events.BrowserEvent.prototype.preventDefault = function() {
    goog.events.BrowserEvent.superClass_.preventDefault.call(this);
    var a = this.event_;
    if (a.preventDefault) a.preventDefault();
    else if (a.returnValue = !1, goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT) try {
        if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
    } catch (b) {}
};
goog.events.BrowserEvent.prototype.getBrowserEvent = function() {
    return this.event_
};
goog.events.BrowserEvent.getPointerType_ = function(a) {
    return "string" === typeof a.pointerType ? a.pointerType : goog.events.BrowserEvent.IE_POINTER_TYPE_MAP[a.pointerType] || ""
};
goog.events.Listenable = function() {};
goog.events.Listenable.IMPLEMENTED_BY_PROP = "closure_listenable_" + (1E6 * Math.random() | 0);
goog.events.Listenable.addImplementation = function(a) {
    a.prototype[goog.events.Listenable.IMPLEMENTED_BY_PROP] = !0
};
goog.events.Listenable.isImplementedBy = function(a) {
    return !(!a || !a[goog.events.Listenable.IMPLEMENTED_BY_PROP])
};
goog.events.ListenableKey = function() {};
goog.events.ListenableKey.counter_ = 0;
goog.events.ListenableKey.reserveKey = function() {
    return ++goog.events.ListenableKey.counter_
};
goog.events.Listener = function(a, b, c, d, e, f) {
    goog.events.Listener.ENABLE_MONITORING && (this.creationStack = Error().stack);
    this.listener = a;
    this.proxy = b;
    this.src = c;
    this.type = d;
    this.capture = !!e;
    this.handler = f;
    this.key = goog.events.ListenableKey.reserveKey();
    this.removed = this.callOnce = !1
};
goog.events.Listener.ENABLE_MONITORING = !1;
goog.events.Listener.prototype.markAsRemoved = function() {
    this.removed = !0;
    this.handler = this.src = this.proxy = this.listener = null
};
goog.events.ListenerMap = function(a) {
    this.src = a;
    this.listeners = {};
    this.typeCount_ = 0
};
goog.events.ListenerMap.prototype.getTypeCount = function() {
    return this.typeCount_
};
goog.events.ListenerMap.prototype.getListenerCount = function() {
    var a = 0,
        b;
    for (b in this.listeners) a += this.listeners[b].length;
    return a
};
goog.events.ListenerMap.prototype.add = function(a, b, c, d, e) {
    var f = a.toString();
    a = this.listeners[f];
    a || (a = this.listeners[f] = [], this.typeCount_++);
    var g = goog.events.ListenerMap.findListenerIndex_(a, b, d, e); - 1 < g ? (b = a[g], c || (b.callOnce = !1)) : (b = new goog.events.Listener(b, null, this.src, f, !!d, e), b.callOnce = c, a.push(b));
    return b
};
goog.events.ListenerMap.prototype.remove = function(a, b, c, d) {
    a = a.toString();
    if (!(a in this.listeners)) return !1;
    var e = this.listeners[a];
    b = goog.events.ListenerMap.findListenerIndex_(e, b, c, d);
    return -1 < b ? (e[b].markAsRemoved(), goog.array.removeAt(e, b), 0 == e.length && (delete this.listeners[a], this.typeCount_--), !0) : !1
};
goog.events.ListenerMap.prototype.removeByKey = function(a) {
    var b = a.type;
    if (!(b in this.listeners)) return !1;
    var c = goog.array.remove(this.listeners[b], a);
    c && (a.markAsRemoved(), 0 == this.listeners[b].length && (delete this.listeners[b], this.typeCount_--));
    return c
};
goog.events.ListenerMap.prototype.removeAll = function(a) {
    a = a && a.toString();
    var b = 0,
        c;
    for (c in this.listeners)
        if (!a || c == a) {
            for (var d = this.listeners[c], e = 0; e < d.length; e++) ++b, d[e].markAsRemoved();
            delete this.listeners[c];
            this.typeCount_--
        }
    return b
};
goog.events.ListenerMap.prototype.getListeners = function(a, b) {
    var c = this.listeners[a.toString()],
        d = [];
    if (c)
        for (var e = 0; e < c.length; ++e) {
            var f = c[e];
            f.capture == b && d.push(f)
        }
    return d
};
goog.events.ListenerMap.prototype.getListener = function(a, b, c, d) {
    a = this.listeners[a.toString()];
    var e = -1;
    a && (e = goog.events.ListenerMap.findListenerIndex_(a, b, c, d));
    return -1 < e ? a[e] : null
};
goog.events.ListenerMap.prototype.hasListener = function(a, b) {
    var c = void 0 !== a,
        d = c ? a.toString() : "",
        e = void 0 !== b;
    return goog.object.some(this.listeners, function(a, g) {
        for (var f = 0; f < a.length; ++f)
            if (!(c && a[f].type != d || e && a[f].capture != b)) return !0;
        return !1
    })
};
goog.events.ListenerMap.findListenerIndex_ = function(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
        var f = a[e];
        if (!f.removed && f.listener == b && f.capture == !!c && f.handler == d) return e
    }
    return -1
};
goog.events.LISTENER_MAP_PROP_ = "closure_lm_" + (1E6 * Math.random() | 0);
goog.events.onString_ = "on";
goog.events.onStringMap_ = {};
goog.events.CaptureSimulationMode = {
    OFF_AND_FAIL: 0,
    OFF_AND_SILENT: 1,
    ON: 2
};
goog.events.CAPTURE_SIMULATION_MODE = 2;
goog.events.listenerCountEstimate_ = 0;
goog.events.listen = function(a, b, c, d, e) {
    if (d && d.once) return goog.events.listenOnce(a, b, c, d, e);
    if (goog.isArray(b)) {
        for (var f = 0; f < b.length; f++) goog.events.listen(a, b[f], c, d, e);
        return null
    }
    c = goog.events.wrapListener(c);
    return goog.events.Listenable.isImplementedBy(a) ? (d = goog.isObject(d) ? !!d.capture : !!d, a.listen(b, c, d, e)) : goog.events.listen_(a, b, c, !1, d, e)
};
goog.events.listen_ = function(a, b, c, d, e, f) {
    if (!b) throw Error("Invalid event type");
    var g = goog.isObject(e) ? !!e.capture : !!e;
    if (g && !goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
        if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_FAIL) return goog.asserts.fail("Can not register capture listener in IE8-."), null;
        if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_SILENT) return null
    }
    var h = goog.events.getListenerMap_(a);
    h || (a[goog.events.LISTENER_MAP_PROP_] =
        h = new goog.events.ListenerMap(a));
    c = h.add(b, c, d, g, f);
    if (c.proxy) return c;
    d = goog.events.getProxy();
    c.proxy = d;
    d.src = a;
    d.listener = c;
    if (a.addEventListener) goog.events.BrowserFeature.PASSIVE_EVENTS || (e = g), void 0 === e && (e = !1), a.addEventListener(b.toString(), d, e);
    else if (a.attachEvent) a.attachEvent(goog.events.getOnString_(b.toString()), d);
    else if (a.addListener && a.removeListener) goog.asserts.assert("change" === b, "MediaQueryList only has a change event"), a.addListener(d);
    else throw Error("addEventListener and attachEvent are unavailable.");
    goog.events.listenerCountEstimate_++;
    return c
};
goog.events.getProxy = function() {
    var a = goog.events.handleBrowserEvent_,
        b = goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT ? function(c) {
            return a.call(b.src, b.listener, c)
        } : function(c) {
            c = a.call(b.src, b.listener, c);
            if (!c) return c
        };
    return b
};
goog.events.listenOnce = function(a, b, c, d, e) {
    if (goog.isArray(b)) {
        for (var f = 0; f < b.length; f++) goog.events.listenOnce(a, b[f], c, d, e);
        return null
    }
    c = goog.events.wrapListener(c);
    return goog.events.Listenable.isImplementedBy(a) ? (d = goog.isObject(d) ? !!d.capture : !!d, a.listenOnce(b, c, d, e)) : goog.events.listen_(a, b, c, !0, d, e)
};
goog.events.listenWithWrapper = function(a, b, c, d, e) {
    b.listen(a, c, d, e)
};
goog.events.unlisten = function(a, b, c, d, e) {
    if (goog.isArray(b)) {
        for (var f = 0; f < b.length; f++) goog.events.unlisten(a, b[f], c, d, e);
        return null
    }
    d = goog.isObject(d) ? !!d.capture : !!d;
    c = goog.events.wrapListener(c);
    if (goog.events.Listenable.isImplementedBy(a)) return a.unlisten(b, c, d, e);
    if (!a) return !1;
    if (a = goog.events.getListenerMap_(a))
        if (b = a.getListener(b, c, d, e)) return goog.events.unlistenByKey(b);
    return !1
};
goog.events.unlistenByKey = function(a) {
    if ("number" === typeof a || !a || a.removed) return !1;
    var b = a.src;
    if (goog.events.Listenable.isImplementedBy(b)) return b.unlistenByKey(a);
    var c = a.type,
        d = a.proxy;
    b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(goog.events.getOnString_(c), d) : b.addListener && b.removeListener && b.removeListener(d);
    goog.events.listenerCountEstimate_--;
    (c = goog.events.getListenerMap_(b)) ? (c.removeByKey(a), 0 == c.getTypeCount() && (c.src = null, b[goog.events.LISTENER_MAP_PROP_] =
        null)) : a.markAsRemoved();
    return !0
};
goog.events.unlistenWithWrapper = function(a, b, c, d, e) {
    b.unlisten(a, c, d, e)
};
goog.events.removeAll = function(a, b) {
    if (!a) return 0;
    if (goog.events.Listenable.isImplementedBy(a)) return a.removeAllListeners(b);
    var c = goog.events.getListenerMap_(a);
    if (!c) return 0;
    var d = 0,
        e = b && b.toString(),
        f;
    for (f in c.listeners)
        if (!e || f == e)
            for (var g = c.listeners[f].concat(), h = 0; h < g.length; ++h) goog.events.unlistenByKey(g[h]) && ++d;
    return d
};
goog.events.getListeners = function(a, b, c) {
    return goog.events.Listenable.isImplementedBy(a) ? a.getListeners(b, c) : a ? (a = goog.events.getListenerMap_(a)) ? a.getListeners(b, c) : [] : []
};
goog.events.getListener = function(a, b, c, d, e) {
    c = goog.events.wrapListener(c);
    d = !!d;
    return goog.events.Listenable.isImplementedBy(a) ? a.getListener(b, c, d, e) : a ? (a = goog.events.getListenerMap_(a)) ? a.getListener(b, c, d, e) : null : null
};
goog.events.hasListener = function(a, b, c) {
    if (goog.events.Listenable.isImplementedBy(a)) return a.hasListener(b, c);
    a = goog.events.getListenerMap_(a);
    return !!a && a.hasListener(b, c)
};
goog.events.expose = function(a) {
    var b = [],
        c;
    for (c in a) a[c] && a[c].id ? b.push(c + " = " + a[c] + " (" + a[c].id + ")") : b.push(c + " = " + a[c]);
    return b.join("\n")
};
goog.events.getOnString_ = function(a) {
    return a in goog.events.onStringMap_ ? goog.events.onStringMap_[a] : goog.events.onStringMap_[a] = goog.events.onString_ + a
};
goog.events.fireListeners = function(a, b, c, d) {
    return goog.events.Listenable.isImplementedBy(a) ? a.fireListeners(b, c, d) : goog.events.fireListeners_(a, b, c, d)
};
goog.events.fireListeners_ = function(a, b, c, d) {
    var e = !0;
    if (a = goog.events.getListenerMap_(a))
        if (b = a.listeners[b.toString()])
            for (b = b.concat(), a = 0; a < b.length; a++) {
                var f = b[a];
                f && f.capture == c && !f.removed && (f = goog.events.fireListener(f, d), e = e && !1 !== f)
            }
        return e
};
goog.events.fireListener = function(a, b) {
    var c = a.listener,
        d = a.handler || a.src;
    a.callOnce && goog.events.unlistenByKey(a);
    return c.call(d, b)
};
goog.events.getTotalListenerCount = function() {
    return goog.events.listenerCountEstimate_
};
goog.events.dispatchEvent = function(a, b) {
    goog.asserts.assert(goog.events.Listenable.isImplementedBy(a), "Can not use goog.events.dispatchEvent with non-goog.events.Listenable instance.");
    return a.dispatchEvent(b)
};
goog.events.protectBrowserEventEntryPoint = function(a) {
    goog.events.handleBrowserEvent_ = a.protectEntryPoint(goog.events.handleBrowserEvent_)
};
goog.events.handleBrowserEvent_ = function(a, b) {
    if (a.removed) return !0;
    if (!goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
        var c = b || goog.getObjectByName("window.event"),
            d = new goog.events.BrowserEvent(c, this),
            e = !0;
        if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.ON) {
            if (!goog.events.isMarkedIeEvent_(c)) {
                goog.events.markIeEvent_(c);
                c = [];
                for (var f = d.currentTarget; f; f = f.parentNode) c.push(f);
                f = a.type;
                for (var g = c.length - 1; !d.propagationStopped_ && 0 <= g; g--) {
                    d.currentTarget = c[g];
                    var h =
                        goog.events.fireListeners_(c[g], f, !0, d);
                    e = e && h
                }
                for (g = 0; !d.propagationStopped_ && g < c.length; g++) d.currentTarget = c[g], h = goog.events.fireListeners_(c[g], f, !1, d), e = e && h
            }
        } else e = goog.events.fireListener(a, d);
        return e
    }
    return goog.events.fireListener(a, new goog.events.BrowserEvent(b, this))
};
goog.events.markIeEvent_ = function(a) {
    var b = !1;
    if (0 == a.keyCode) try {
        a.keyCode = -1;
        return
    } catch (c) {
        b = !0
    }
    if (b || void 0 == a.returnValue) a.returnValue = !0
};
goog.events.isMarkedIeEvent_ = function(a) {
    return 0 > a.keyCode || void 0 != a.returnValue
};
goog.events.uniqueIdCounter_ = 0;
goog.events.getUniqueId = function(a) {
    return a + "_" + goog.events.uniqueIdCounter_++
};
goog.events.getListenerMap_ = function(a) {
    a = a[goog.events.LISTENER_MAP_PROP_];
    return a instanceof goog.events.ListenerMap ? a : null
};
goog.events.LISTENER_WRAPPER_PROP_ = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
goog.events.wrapListener = function(a) {
    goog.asserts.assert(a, "Listener can not be null.");
    if (goog.isFunction(a)) return a;
    goog.asserts.assert(a.handleEvent, "An object listener must have handleEvent method.");
    a[goog.events.LISTENER_WRAPPER_PROP_] || (a[goog.events.LISTENER_WRAPPER_PROP_] = function(b) {
        return a.handleEvent(b)
    });
    return a[goog.events.LISTENER_WRAPPER_PROP_]
};
goog.debug.entryPointRegistry.register(function(a) {
    goog.events.handleBrowserEvent_ = a(goog.events.handleBrowserEvent_)
});
goog.Thenable = function() {};
goog.Thenable.prototype.then = function(a, b, c) {};
goog.Thenable.IMPLEMENTED_BY_PROP = "$goog_Thenable";
goog.Thenable.addImplementation = function(a) {
    COMPILED ? a.prototype[goog.Thenable.IMPLEMENTED_BY_PROP] = !0 : a.prototype.$goog_Thenable = !0
};
goog.Thenable.isImplementedBy = function(a) {
    if (!a) return !1;
    try {
        return COMPILED ? !!a[goog.Thenable.IMPLEMENTED_BY_PROP] : !!a.$goog_Thenable
    } catch (b) {
        return !1
    }
};
goog.async = {};
goog.async.FreeList = function(a, b, c) {
    this.limit_ = c;
    this.create_ = a;
    this.reset_ = b;
    this.occupants_ = 0;
    this.head_ = null
};
goog.async.FreeList.prototype.get = function() {
    if (0 < this.occupants_) {
        this.occupants_--;
        var a = this.head_;
        this.head_ = a.next;
        a.next = null
    } else a = this.create_();
    return a
};
goog.async.FreeList.prototype.put = function(a) {
    this.reset_(a);
    this.occupants_ < this.limit_ && (this.occupants_++, a.next = this.head_, this.head_ = a)
};
goog.async.FreeList.prototype.occupants = function() {
    return this.occupants_
};
goog.async.WorkQueue = function() {
    this.workTail_ = this.workHead_ = null
};
goog.async.WorkQueue.DEFAULT_MAX_UNUSED = 100;
goog.async.WorkQueue.freelist_ = new goog.async.FreeList(function() {
    return new goog.async.WorkItem
}, function(a) {
    a.reset()
}, goog.async.WorkQueue.DEFAULT_MAX_UNUSED);
goog.async.WorkQueue.prototype.add = function(a, b) {
    var c = this.getUnusedItem_();
    c.set(a, b);
    this.workTail_ ? this.workTail_.next = c : (goog.asserts.assert(!this.workHead_), this.workHead_ = c);
    this.workTail_ = c
};
goog.async.WorkQueue.prototype.remove = function() {
    var a = null;
    this.workHead_ && (a = this.workHead_, this.workHead_ = this.workHead_.next, this.workHead_ || (this.workTail_ = null), a.next = null);
    return a
};
goog.async.WorkQueue.prototype.returnUnused = function(a) {
    goog.async.WorkQueue.freelist_.put(a)
};
goog.async.WorkQueue.prototype.getUnusedItem_ = function() {
    return goog.async.WorkQueue.freelist_.get()
};
goog.async.WorkItem = function() {
    this.next = this.scope = this.fn = null
};
goog.async.WorkItem.prototype.set = function(a, b) {
    this.fn = a;
    this.scope = b;
    this.next = null
};
goog.async.WorkItem.prototype.reset = function() {
    this.next = this.scope = this.fn = null
};
goog.async.throwException = function(a) {
    goog.global.setTimeout(function() {
        throw a;
    }, 0)
};
goog.async.nextTick = function(a, b, c) {
    var d = a;
    b && (d = goog.bind(a, b));
    d = goog.async.nextTick.wrapCallback_(d);
    goog.isFunction(goog.global.setImmediate) && (c || goog.async.nextTick.useSetImmediate_()) ? goog.global.setImmediate(d) : (goog.async.nextTick.setImmediate_ || (goog.async.nextTick.setImmediate_ = goog.async.nextTick.getSetImmediateEmulator_()), goog.async.nextTick.setImmediate_(d))
};
goog.async.nextTick.useSetImmediate_ = function() {
    return goog.global.Window && goog.global.Window.prototype && !goog.labs.userAgent.browser.isEdge() && goog.global.Window.prototype.setImmediate == goog.global.setImmediate ? !1 : !0
};
goog.async.nextTick.getSetImmediateEmulator_ = function() {
    var a = goog.global.MessageChannel;
    "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !goog.labs.userAgent.engine.isPresto() && (a = function() {
        var a = goog.dom.createElement("IFRAME");
        a.style.display = "none";
        goog.dom.safe.setIframeSrc(a, goog.html.TrustedResourceUrl.fromConstant(goog.string.Const.EMPTY));
        document.documentElement.appendChild(a);
        var b = a.contentWindow;
        a = b.document;
        a.open();
        goog.dom.safe.documentWrite(a,
            goog.html.SafeHtml.EMPTY);
        a.close();
        var c = "callImmediate" + Math.random(),
            d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host;
        a = goog.bind(function(a) {
            if (("*" == d || a.origin == d) && a.data == c) this.port1.onmessage()
        }, this);
        b.addEventListener("message", a, !1);
        this.port1 = {};
        this.port2 = {
            postMessage: function() {
                b.postMessage(c, d)
            }
        }
    });
    if ("undefined" !== typeof a && !goog.labs.userAgent.browser.isIE()) {
        var b = new a,
            c = {},
            d = c;
        b.port1.onmessage = function() {
            if (void 0 !== c.next) {
                c = c.next;
                var a = c.cb;
                c.cb =
                    null;
                a()
            }
        };
        return function(a) {
            d.next = {
                cb: a
            };
            d = d.next;
            b.port2.postMessage(0)
        }
    }
    return "undefined" !== typeof document && "onreadystatechange" in goog.dom.createElement("SCRIPT") ? function(a) {
        var b = goog.dom.createElement("SCRIPT");
        b.onreadystatechange = function() {
            b.onreadystatechange = null;
            b.parentNode.removeChild(b);
            b = null;
            a();
            a = null
        };
        document.documentElement.appendChild(b)
    } : function(a) {
        goog.global.setTimeout(a, 0)
    }
};
goog.async.nextTick.wrapCallback_ = goog.functions.identity;
goog.debug.entryPointRegistry.register(function(a) {
    goog.async.nextTick.wrapCallback_ = a
});
goog.ASSUME_NATIVE_PROMISE = !1;
goog.async.run = function(a, b) {
    goog.async.run.schedule_ || goog.async.run.initializeRunner_();
    goog.async.run.workQueueScheduled_ || (goog.async.run.schedule_(), goog.async.run.workQueueScheduled_ = !0);
    goog.async.run.workQueue_.add(a, b)
};
goog.async.run.initializeRunner_ = function() {
    if (goog.ASSUME_NATIVE_PROMISE || goog.global.Promise && goog.global.Promise.resolve) {
        var a = goog.global.Promise.resolve(void 0);
        goog.async.run.schedule_ = function() {
            a.then(goog.async.run.processWorkQueue)
        }
    } else goog.async.run.schedule_ = function() {
        goog.async.nextTick(goog.async.run.processWorkQueue)
    }
};
goog.async.run.forceNextTick = function(a) {
    goog.async.run.schedule_ = function() {
        goog.async.nextTick(goog.async.run.processWorkQueue);
        a && a(goog.async.run.processWorkQueue)
    }
};
goog.async.run.workQueueScheduled_ = !1;
goog.async.run.workQueue_ = new goog.async.WorkQueue;
goog.DEBUG && (goog.async.run.resetQueue = function() {
    goog.async.run.workQueueScheduled_ = !1;
    goog.async.run.workQueue_ = new goog.async.WorkQueue
});
goog.async.run.processWorkQueue = function() {
    for (var a; a = goog.async.run.workQueue_.remove();) {
        try {
            a.fn.call(a.scope)
        } catch (b) {
            goog.async.throwException(b)
        }
        goog.async.run.workQueue_.returnUnused(a)
    }
    goog.async.run.workQueueScheduled_ = !1
};
goog.promise = {};
goog.promise.Resolver = function() {};
goog.Promise = function(a, b) {
    this.state_ = goog.Promise.State_.PENDING;
    this.result_ = void 0;
    this.callbackEntriesTail_ = this.callbackEntries_ = this.parent_ = null;
    this.executing_ = !1;
    0 < goog.Promise.UNHANDLED_REJECTION_DELAY ? this.unhandledRejectionId_ = 0 : 0 == goog.Promise.UNHANDLED_REJECTION_DELAY && (this.hadUnhandledRejection_ = !1);
    goog.Promise.LONG_STACK_TRACES && (this.stack_ = [], this.addStackTrace_(Error("created")), this.currentStep_ = 0);
    if (a != goog.nullFunction) try {
        var c = this;
        a.call(b, function(a) {
            c.resolve_(goog.Promise.State_.FULFILLED,
                a)
        }, function(a) {
            if (goog.DEBUG && !(a instanceof goog.Promise.CancellationError)) try {
                if (a instanceof Error) throw a;
                throw Error("Promise rejected.");
            } catch (e) {}
            c.resolve_(goog.Promise.State_.REJECTED, a)
        })
    } catch (d) {
        this.resolve_(goog.Promise.State_.REJECTED, d)
    }
};
goog.Promise.LONG_STACK_TRACES = !1;
goog.Promise.UNHANDLED_REJECTION_DELAY = 0;
goog.Promise.State_ = {
    PENDING: 0,
    BLOCKED: 1,
    FULFILLED: 2,
    REJECTED: 3
};
goog.Promise.CallbackEntry_ = function() {
    this.next = this.context = this.onRejected = this.onFulfilled = this.child = null;
    this.always = !1
};
goog.Promise.CallbackEntry_.prototype.reset = function() {
    this.context = this.onRejected = this.onFulfilled = this.child = null;
    this.always = !1
};
goog.Promise.DEFAULT_MAX_UNUSED = 100;
goog.Promise.freelist_ = new goog.async.FreeList(function() {
    return new goog.Promise.CallbackEntry_
}, function(a) {
    a.reset()
}, goog.Promise.DEFAULT_MAX_UNUSED);
goog.Promise.getCallbackEntry_ = function(a, b, c) {
    var d = goog.Promise.freelist_.get();
    d.onFulfilled = a;
    d.onRejected = b;
    d.context = c;
    return d
};
goog.Promise.returnEntry_ = function(a) {
    goog.Promise.freelist_.put(a)
};
goog.Promise.resolve = function(a) {
    if (a instanceof goog.Promise) return a;
    var b = new goog.Promise(goog.nullFunction);
    b.resolve_(goog.Promise.State_.FULFILLED, a);
    return b
};
goog.Promise.reject = function(a) {
    return new goog.Promise(function(b, c) {
        c(a)
    })
};
goog.Promise.resolveThen_ = function(a, b, c) {
    goog.Promise.maybeThen_(a, b, c, null) || goog.async.run(goog.partial(b, a))
};
goog.Promise.race = function(a) {
    return new goog.Promise(function(b, c) {
        a.length || b(void 0);
        for (var d = 0, e; d < a.length; d++) e = a[d], goog.Promise.resolveThen_(e, b, c)
    })
};
goog.Promise.all = function(a) {
    return new goog.Promise(function(b, c) {
        var d = a.length,
            e = [];
        if (d)
            for (var f = function(a, c) {
                    d--;
                    e[a] = c;
                    0 == d && b(e)
                }, g = function(a) {
                    c(a)
                }, h = 0, k; h < a.length; h++) k = a[h], goog.Promise.resolveThen_(k, goog.partial(f, h), g);
        else b(e)
    })
};
goog.Promise.allSettled = function(a) {
    return new goog.Promise(function(b, c) {
        var d = a.length,
            e = [];
        if (d)
            for (var f = function(a, c, f) {
                    d--;
                    e[a] = c ? {
                        fulfilled: !0,
                        value: f
                    } : {
                        fulfilled: !1,
                        reason: f
                    };
                    0 == d && b(e)
                }, g = 0, h; g < a.length; g++) h = a[g], goog.Promise.resolveThen_(h, goog.partial(f, g, !0), goog.partial(f, g, !1));
        else b(e)
    })
};
goog.Promise.firstFulfilled = function(a) {
    return new goog.Promise(function(b, c) {
        var d = a.length,
            e = [];
        if (d)
            for (var f = function(a) {
                    b(a)
                }, g = function(a, b) {
                    d--;
                    e[a] = b;
                    0 == d && c(e)
                }, h = 0, k; h < a.length; h++) k = a[h], goog.Promise.resolveThen_(k, f, goog.partial(g, h));
        else b(void 0)
    })
};
goog.Promise.withResolver = function() {
    var a, b, c = new goog.Promise(function(c, e) {
        a = c;
        b = e
    });
    return new goog.Promise.Resolver_(c, a, b)
};
goog.Promise.prototype.then = function(a, b, c) {
    null != a && goog.asserts.assertFunction(a, "opt_onFulfilled should be a function.");
    null != b && goog.asserts.assertFunction(b, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
    goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("then"));
    return this.addChildPromise_(goog.isFunction(a) ? a : null, goog.isFunction(b) ? b : null, c)
};
goog.Thenable.addImplementation(goog.Promise);
goog.Promise.prototype.thenVoid = function(a, b, c) {
    null != a && goog.asserts.assertFunction(a, "opt_onFulfilled should be a function.");
    null != b && goog.asserts.assertFunction(b, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
    goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("then"));
    this.addCallbackEntry_(goog.Promise.getCallbackEntry_(a || goog.nullFunction, b || null, c))
};
goog.Promise.prototype.thenAlways = function(a, b) {
    goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("thenAlways"));
    var c = goog.Promise.getCallbackEntry_(a, a, b);
    c.always = !0;
    this.addCallbackEntry_(c);
    return this
};
goog.Promise.prototype.thenCatch = function(a, b) {
    goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("thenCatch"));
    return this.addChildPromise_(null, a, b)
};
goog.Promise.prototype.cancel = function(a) {
    if (this.state_ == goog.Promise.State_.PENDING) {
        var b = new goog.Promise.CancellationError(a);
        goog.async.run(function() {
            this.cancelInternal_(b)
        }, this)
    }
};
goog.Promise.prototype.cancelInternal_ = function(a) {
    this.state_ == goog.Promise.State_.PENDING && (this.parent_ ? (this.parent_.cancelChild_(this, a), this.parent_ = null) : this.resolve_(goog.Promise.State_.REJECTED, a))
};
goog.Promise.prototype.cancelChild_ = function(a, b) {
    if (this.callbackEntries_) {
        for (var c = 0, d = null, e = null, f = this.callbackEntries_; f && (f.always || (c++, f.child == a && (d = f), !(d && 1 < c))); f = f.next) d || (e = f);
        d && (this.state_ == goog.Promise.State_.PENDING && 1 == c ? this.cancelInternal_(b) : (e ? this.removeEntryAfter_(e) : this.popEntry_(), this.executeCallback_(d, goog.Promise.State_.REJECTED, b)))
    }
};
goog.Promise.prototype.addCallbackEntry_ = function(a) {
    this.hasEntry_() || this.state_ != goog.Promise.State_.FULFILLED && this.state_ != goog.Promise.State_.REJECTED || this.scheduleCallbacks_();
    this.queueEntry_(a)
};
goog.Promise.prototype.addChildPromise_ = function(a, b, c) {
    var d = goog.Promise.getCallbackEntry_(null, null, null);
    d.child = new goog.Promise(function(e, f) {
        d.onFulfilled = a ? function(b) {
            try {
                var d = a.call(c, b);
                e(d)
            } catch (k) {
                f(k)
            }
        } : e;
        d.onRejected = b ? function(a) {
            try {
                var d = b.call(c, a);
                void 0 === d && a instanceof goog.Promise.CancellationError ? f(a) : e(d)
            } catch (k) {
                f(k)
            }
        } : f
    });
    d.child.parent_ = this;
    this.addCallbackEntry_(d);
    return d.child
};
goog.Promise.prototype.unblockAndFulfill_ = function(a) {
    goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED);
    this.state_ = goog.Promise.State_.PENDING;
    this.resolve_(goog.Promise.State_.FULFILLED, a)
};
goog.Promise.prototype.unblockAndReject_ = function(a) {
    goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED);
    this.state_ = goog.Promise.State_.PENDING;
    this.resolve_(goog.Promise.State_.REJECTED, a)
};
goog.Promise.prototype.resolve_ = function(a, b) {
    this.state_ == goog.Promise.State_.PENDING && (this === b && (a = goog.Promise.State_.REJECTED, b = new TypeError("Promise cannot resolve to itself")), this.state_ = goog.Promise.State_.BLOCKED, goog.Promise.maybeThen_(b, this.unblockAndFulfill_, this.unblockAndReject_, this) || (this.result_ = b, this.state_ = a, this.parent_ = null, this.scheduleCallbacks_(), a != goog.Promise.State_.REJECTED || b instanceof goog.Promise.CancellationError || goog.Promise.addUnhandledRejection_(this, b)))
};
goog.Promise.maybeThen_ = function(a, b, c, d) {
    if (a instanceof goog.Promise) return a.thenVoid(b, c, d), !0;
    if (goog.Thenable.isImplementedBy(a)) return a.then(b, c, d), !0;
    if (goog.isObject(a)) try {
        var e = a.then;
        if (goog.isFunction(e)) return goog.Promise.tryThen_(a, e, b, c, d), !0
    } catch (f) {
        return c.call(d, f), !0
    }
    return !1
};
goog.Promise.tryThen_ = function(a, b, c, d, e) {
    var f = !1,
        g = function(a) {
            f || (f = !0, c.call(e, a))
        },
        h = function(a) {
            f || (f = !0, d.call(e, a))
        };
    try {
        b.call(a, g, h)
    } catch (k) {
        h(k)
    }
};
goog.Promise.prototype.scheduleCallbacks_ = function() {
    this.executing_ || (this.executing_ = !0, goog.async.run(this.executeCallbacks_, this))
};
goog.Promise.prototype.hasEntry_ = function() {
    return !!this.callbackEntries_
};
goog.Promise.prototype.queueEntry_ = function(a) {
    goog.asserts.assert(null != a.onFulfilled);
    this.callbackEntriesTail_ ? this.callbackEntriesTail_.next = a : this.callbackEntries_ = a;
    this.callbackEntriesTail_ = a
};
goog.Promise.prototype.popEntry_ = function() {
    var a = null;
    this.callbackEntries_ && (a = this.callbackEntries_, this.callbackEntries_ = a.next, a.next = null);
    this.callbackEntries_ || (this.callbackEntriesTail_ = null);
    null != a && goog.asserts.assert(null != a.onFulfilled);
    return a
};
goog.Promise.prototype.removeEntryAfter_ = function(a) {
    goog.asserts.assert(this.callbackEntries_);
    goog.asserts.assert(null != a);
    a.next == this.callbackEntriesTail_ && (this.callbackEntriesTail_ = a);
    a.next = a.next.next
};
goog.Promise.prototype.executeCallbacks_ = function() {
    for (var a; a = this.popEntry_();) goog.Promise.LONG_STACK_TRACES && this.currentStep_++, this.executeCallback_(a, this.state_, this.result_);
    this.executing_ = !1
};
goog.Promise.prototype.executeCallback_ = function(a, b, c) {
    b == goog.Promise.State_.REJECTED && a.onRejected && !a.always && this.removeUnhandledRejection_();
    if (a.child) a.child.parent_ = null, goog.Promise.invokeCallback_(a, b, c);
    else try {
        a.always ? a.onFulfilled.call(a.context) : goog.Promise.invokeCallback_(a, b, c)
    } catch (d) {
        goog.Promise.handleRejection_.call(null, d)
    }
    goog.Promise.returnEntry_(a)
};
goog.Promise.invokeCallback_ = function(a, b, c) {
    b == goog.Promise.State_.FULFILLED ? a.onFulfilled.call(a.context, c) : a.onRejected && a.onRejected.call(a.context, c)
};
goog.Promise.prototype.addStackTrace_ = function(a) {
    if (goog.Promise.LONG_STACK_TRACES && "string" === typeof a.stack) {
        var b = a.stack.split("\n", 4)[3];
        a = a.message;
        a += Array(11 - a.length).join(" ");
        this.stack_.push(a + b)
    }
};
goog.Promise.prototype.appendLongStack_ = function(a) {
    if (goog.Promise.LONG_STACK_TRACES && a && "string" === typeof a.stack && this.stack_.length) {
        for (var b = ["Promise trace:"], c = this; c; c = c.parent_) {
            for (var d = this.currentStep_; 0 <= d; d--) b.push(c.stack_[d]);
            b.push("Value: [" + (c.state_ == goog.Promise.State_.REJECTED ? "REJECTED" : "FULFILLED") + "] <" + String(c.result_) + ">")
        }
        a.stack += "\n\n" + b.join("\n")
    }
};
goog.Promise.prototype.removeUnhandledRejection_ = function() {
    if (0 < goog.Promise.UNHANDLED_REJECTION_DELAY)
        for (var a = this; a && a.unhandledRejectionId_; a = a.parent_) goog.global.clearTimeout(a.unhandledRejectionId_), a.unhandledRejectionId_ = 0;
    else if (0 == goog.Promise.UNHANDLED_REJECTION_DELAY)
        for (a = this; a && a.hadUnhandledRejection_; a = a.parent_) a.hadUnhandledRejection_ = !1
};
goog.Promise.addUnhandledRejection_ = function(a, b) {
    0 < goog.Promise.UNHANDLED_REJECTION_DELAY ? a.unhandledRejectionId_ = goog.global.setTimeout(function() {
        a.appendLongStack_(b);
        goog.Promise.handleRejection_.call(null, b)
    }, goog.Promise.UNHANDLED_REJECTION_DELAY) : 0 == goog.Promise.UNHANDLED_REJECTION_DELAY && (a.hadUnhandledRejection_ = !0, goog.async.run(function() {
        a.hadUnhandledRejection_ && (a.appendLongStack_(b), goog.Promise.handleRejection_.call(null, b))
    }))
};
goog.Promise.handleRejection_ = goog.async.throwException;
goog.Promise.setUnhandledRejectionHandler = function(a) {
    goog.Promise.handleRejection_ = a
};
goog.Promise.CancellationError = function(a) {
    goog.debug.Error.call(this, a)
};
goog.inherits(goog.Promise.CancellationError, goog.debug.Error);
goog.Promise.CancellationError.prototype.name = "cancel";
goog.Promise.Resolver_ = function(a, b, c) {
    this.promise = a;
    this.resolve = b;
    this.reject = c
};
goog.events.EventTarget = function() {
    goog.Disposable.call(this);
    this.eventTargetListeners_ = new goog.events.ListenerMap(this);
    this.actualEventTarget_ = this;
    this.parentEventTarget_ = null
};
goog.inherits(goog.events.EventTarget, goog.Disposable);
goog.events.Listenable.addImplementation(goog.events.EventTarget);
goog.events.EventTarget.MAX_ANCESTORS_ = 1E3;
goog.events.EventTarget.prototype.getParentEventTarget = function() {
    return this.parentEventTarget_
};
goog.events.EventTarget.prototype.setParentEventTarget = function(a) {
    this.parentEventTarget_ = a
};
goog.events.EventTarget.prototype.addEventListener = function(a, b, c, d) {
    goog.events.listen(this, a, b, c, d)
};
goog.events.EventTarget.prototype.removeEventListener = function(a, b, c, d) {
    goog.events.unlisten(this, a, b, c, d)
};
goog.events.EventTarget.prototype.dispatchEvent = function(a) {
    this.assertInitialized_();
    var b = this.getParentEventTarget();
    if (b) {
        var c = [];
        for (var d = 1; b; b = b.getParentEventTarget()) c.push(b), goog.asserts.assert(++d < goog.events.EventTarget.MAX_ANCESTORS_, "infinite loop")
    }
    return goog.events.EventTarget.dispatchEventInternal_(this.actualEventTarget_, a, c)
};
goog.events.EventTarget.prototype.disposeInternal = function() {
    goog.events.EventTarget.superClass_.disposeInternal.call(this);
    this.removeAllListeners();
    this.parentEventTarget_ = null
};
goog.events.EventTarget.prototype.listen = function(a, b, c, d) {
    this.assertInitialized_();
    return this.eventTargetListeners_.add(String(a), b, !1, c, d)
};
goog.events.EventTarget.prototype.listenOnce = function(a, b, c, d) {
    return this.eventTargetListeners_.add(String(a), b, !0, c, d)
};
goog.events.EventTarget.prototype.unlisten = function(a, b, c, d) {
    return this.eventTargetListeners_.remove(String(a), b, c, d)
};
goog.events.EventTarget.prototype.unlistenByKey = function(a) {
    return this.eventTargetListeners_.removeByKey(a)
};
goog.events.EventTarget.prototype.removeAllListeners = function(a) {
    return this.eventTargetListeners_ ? this.eventTargetListeners_.removeAll(a) : 0
};
goog.events.EventTarget.prototype.fireListeners = function(a, b, c) {
    a = this.eventTargetListeners_.listeners[String(a)];
    if (!a) return !0;
    a = a.concat();
    for (var d = !0, e = 0; e < a.length; ++e) {
        var f = a[e];
        if (f && !f.removed && f.capture == b) {
            var g = f.listener,
                h = f.handler || f.src;
            f.callOnce && this.unlistenByKey(f);
            d = !1 !== g.call(h, c) && d
        }
    }
    return d && 0 != c.returnValue_
};
goog.events.EventTarget.prototype.getListeners = function(a, b) {
    return this.eventTargetListeners_.getListeners(String(a), b)
};
goog.events.EventTarget.prototype.getListener = function(a, b, c, d) {
    return this.eventTargetListeners_.getListener(String(a), b, c, d)
};
goog.events.EventTarget.prototype.hasListener = function(a, b) {
    return this.eventTargetListeners_.hasListener(void 0 !== a ? String(a) : void 0, b)
};
goog.events.EventTarget.prototype.setTargetForTesting = function(a) {
    this.actualEventTarget_ = a
};
goog.events.EventTarget.prototype.assertInitialized_ = function() {
    goog.asserts.assert(this.eventTargetListeners_, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
};
goog.events.EventTarget.dispatchEventInternal_ = function(a, b, c) {
    var d = b.type || b;
    if ("string" === typeof b) b = new goog.events.Event(b, a);
    else if (b instanceof goog.events.Event) b.target = b.target || a;
    else {
        var e = b;
        b = new goog.events.Event(d, a);
        goog.object.extend(b, e)
    }
    e = !0;
    if (c)
        for (var f = c.length - 1; !b.propagationStopped_ && 0 <= f; f--) {
            var g = b.currentTarget = c[f];
            e = g.fireListeners(d, !0, b) && e
        }
    b.propagationStopped_ || (g = b.currentTarget = a, e = g.fireListeners(d, !0, b) && e, b.propagationStopped_ || (e = g.fireListeners(d, !1, b) &&
        e));
    if (c)
        for (f = 0; !b.propagationStopped_ && f < c.length; f++) g = b.currentTarget = c[f], e = g.fireListeners(d, !1, b) && e;
    return e
};
goog.Timer = function(a, b) {
    goog.events.EventTarget.call(this);
    this.interval_ = a || 1;
    this.timerObject_ = b || goog.Timer.defaultTimerObject;
    this.boundTick_ = goog.bind(this.tick_, this);
    this.last_ = goog.now()
};
goog.inherits(goog.Timer, goog.events.EventTarget);
goog.Timer.MAX_TIMEOUT_ = 2147483647;
goog.Timer.INVALID_TIMEOUT_ID_ = -1;
goog.Timer.prototype.enabled = !1;
goog.Timer.defaultTimerObject = goog.global;
goog.Timer.intervalScale = .8;
goog.Timer.prototype.timer_ = null;
goog.Timer.prototype.getInterval = function() {
    return this.interval_
};
goog.Timer.prototype.setInterval = function(a) {
    this.interval_ = a;
    this.timer_ && this.enabled ? (this.stop(), this.start()) : this.timer_ && this.stop()
};
goog.Timer.prototype.tick_ = function() {
    if (this.enabled) {
        var a = goog.now() - this.last_;
        0 < a && a < this.interval_ * goog.Timer.intervalScale ? this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_ - a) : (this.timer_ && (this.timerObject_.clearTimeout(this.timer_), this.timer_ = null), this.dispatchTick(), this.enabled && (this.stop(), this.start()))
    }
};
goog.Timer.prototype.dispatchTick = function() {
    this.dispatchEvent(goog.Timer.TICK)
};
goog.Timer.prototype.start = function() {
    this.enabled = !0;
    this.timer_ || (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog.now())
};
goog.Timer.prototype.stop = function() {
    this.enabled = !1;
    this.timer_ && (this.timerObject_.clearTimeout(this.timer_), this.timer_ = null)
};
goog.Timer.prototype.disposeInternal = function() {
    goog.Timer.superClass_.disposeInternal.call(this);
    this.stop();
    delete this.timerObject_
};
goog.Timer.TICK = "tick";
goog.Timer.callOnce = function(a, b, c) {
    if (goog.isFunction(a)) c && (a = goog.bind(a, c));
    else if (a && "function" == typeof a.handleEvent) a = goog.bind(a.handleEvent, a);
    else throw Error("Invalid listener argument");
    return Number(b) > goog.Timer.MAX_TIMEOUT_ ? goog.Timer.INVALID_TIMEOUT_ID_ : goog.Timer.defaultTimerObject.setTimeout(a, b || 0)
};
goog.Timer.clear = function(a) {
    goog.Timer.defaultTimerObject.clearTimeout(a)
};
goog.Timer.promise = function(a, b) {
    var c = null;
    return (new goog.Promise(function(d, e) {
        c = goog.Timer.callOnce(function() {
            d(b)
        }, a);
        c == goog.Timer.INVALID_TIMEOUT_ID_ && e(Error("Failed to schedule timer."))
    })).thenCatch(function(a) {
        goog.Timer.clear(c);
        throw a;
    })
};
goog.events.EventHandler = function(a) {
    goog.Disposable.call(this);
    this.handler_ = a;
    this.keys_ = {}
};
goog.inherits(goog.events.EventHandler, goog.Disposable);
goog.events.EventHandler.typeArray_ = [];
goog.events.EventHandler.prototype.listen = function(a, b, c, d) {
    return this.listen_(a, b, c, d)
};
goog.events.EventHandler.prototype.listenWithScope = function(a, b, c, d, e) {
    return this.listen_(a, b, c, d, e)
};
goog.events.EventHandler.prototype.listen_ = function(a, b, c, d, e) {
    goog.isArray(b) || (b && (goog.events.EventHandler.typeArray_[0] = b.toString()), b = goog.events.EventHandler.typeArray_);
    for (var f = 0; f < b.length; f++) {
        var g = goog.events.listen(a, b[f], c || this.handleEvent, d || !1, e || this.handler_ || this);
        if (!g) break;
        this.keys_[g.key] = g
    }
    return this
};
goog.events.EventHandler.prototype.listenOnce = function(a, b, c, d) {
    return this.listenOnce_(a, b, c, d)
};
goog.events.EventHandler.prototype.listenOnceWithScope = function(a, b, c, d, e) {
    return this.listenOnce_(a, b, c, d, e)
};
goog.events.EventHandler.prototype.listenOnce_ = function(a, b, c, d, e) {
    if (goog.isArray(b))
        for (var f = 0; f < b.length; f++) this.listenOnce_(a, b[f], c, d, e);
    else {
        a = goog.events.listenOnce(a, b, c || this.handleEvent, d, e || this.handler_ || this);
        if (!a) return this;
        this.keys_[a.key] = a
    }
    return this
};
goog.events.EventHandler.prototype.listenWithWrapper = function(a, b, c, d) {
    return this.listenWithWrapper_(a, b, c, d)
};
goog.events.EventHandler.prototype.listenWithWrapperAndScope = function(a, b, c, d, e) {
    return this.listenWithWrapper_(a, b, c, d, e)
};
goog.events.EventHandler.prototype.listenWithWrapper_ = function(a, b, c, d, e) {
    b.listen(a, c, d, e || this.handler_ || this, this);
    return this
};
goog.events.EventHandler.prototype.getListenerCount = function() {
    var a = 0,
        b;
    for (b in this.keys_) Object.prototype.hasOwnProperty.call(this.keys_, b) && a++;
    return a
};
goog.events.EventHandler.prototype.unlisten = function(a, b, c, d, e) {
    if (goog.isArray(b))
        for (var f = 0; f < b.length; f++) this.unlisten(a, b[f], c, d, e);
    else if (d = goog.isObject(d) ? !!d.capture : !!d, a = goog.events.getListener(a, b, c || this.handleEvent, d, e || this.handler_ || this)) goog.events.unlistenByKey(a), delete this.keys_[a.key];
    return this
};
goog.events.EventHandler.prototype.unlistenWithWrapper = function(a, b, c, d, e) {
    b.unlisten(a, c, d, e || this.handler_ || this, this);
    return this
};
goog.events.EventHandler.prototype.removeAll = function() {
    goog.object.forEach(this.keys_, function(a, b) {
        this.keys_.hasOwnProperty(b) && goog.events.unlistenByKey(a)
    }, this);
    this.keys_ = {}
};
goog.events.EventHandler.prototype.disposeInternal = function() {
    goog.events.EventHandler.superClass_.disposeInternal.call(this);
    this.removeAll()
};
goog.events.EventHandler.prototype.handleEvent = function(a) {
    throw Error("EventHandler.handleEvent not implemented");
};
goog.ui = {};
goog.ui.IdGenerator = function() {};
goog.addSingletonGetter(goog.ui.IdGenerator);
goog.ui.IdGenerator.prototype.nextId_ = 0;
goog.ui.IdGenerator.prototype.idPrefix_ = "";
goog.ui.IdGenerator.prototype.setIdPrefix = function(a) {
    this.idPrefix_ = a
};
goog.ui.IdGenerator.prototype.getNextUniqueId = function() {
    return this.idPrefix_ + ":" + (this.nextId_++).toString(36)
};
goog.ui.Component = function(a) {
    goog.events.EventTarget.call(this);
    this.dom_ = a || goog.dom.getDomHelper();
    this.rightToLeft_ = goog.ui.Component.defaultRightToLeft_;
    this.id_ = null;
    this.inDocument_ = !1;
    this.element_ = null;
    this.googUiComponentHandler_ = void 0;
    this.childIndex_ = this.children_ = this.parent_ = this.model_ = null;
    this.pointerEventsEnabled_ = this.wasDecorated_ = !1
};
goog.inherits(goog.ui.Component, goog.events.EventTarget);
goog.ui.Component.ALLOW_DETACHED_DECORATION = !1;
goog.ui.Component.prototype.idGenerator_ = goog.ui.IdGenerator.getInstance();
goog.ui.Component.DEFAULT_BIDI_DIR = 0;
goog.ui.Component.defaultRightToLeft_ = 1 == goog.ui.Component.DEFAULT_BIDI_DIR ? !1 : -1 == goog.ui.Component.DEFAULT_BIDI_DIR ? !0 : null;
goog.ui.Component.EventType = {
    BEFORE_SHOW: "beforeshow",
    SHOW: "show",
    HIDE: "hide",
    DISABLE: "disable",
    ENABLE: "enable",
    HIGHLIGHT: "highlight",
    UNHIGHLIGHT: "unhighlight",
    ACTIVATE: "activate",
    DEACTIVATE: "deactivate",
    SELECT: "select",
    UNSELECT: "unselect",
    CHECK: "check",
    UNCHECK: "uncheck",
    FOCUS: "focus",
    BLUR: "blur",
    OPEN: "open",
    CLOSE: "close",
    ENTER: "enter",
    LEAVE: "leave",
    ACTION: "action",
    CHANGE: "change"
};
goog.ui.Component.Error = {
    NOT_SUPPORTED: "Method not supported",
    DECORATE_INVALID: "Invalid element to decorate",
    ALREADY_RENDERED: "Component already rendered",
    PARENT_UNABLE_TO_BE_SET: "Unable to set parent component",
    CHILD_INDEX_OUT_OF_BOUNDS: "Child component index out of bounds",
    NOT_OUR_CHILD: "Child is not in parent component",
    NOT_IN_DOCUMENT: "Operation not supported while component is not in document",
    STATE_INVALID: "Invalid component state"
};
goog.ui.Component.State = {
    ALL: 255,
    DISABLED: 1,
    HOVER: 2,
    ACTIVE: 4,
    SELECTED: 8,
    CHECKED: 16,
    FOCUSED: 32,
    OPENED: 64
};
goog.ui.Component.getStateTransitionEvent = function(a, b) {
    switch (a) {
        case goog.ui.Component.State.DISABLED:
            return b ? goog.ui.Component.EventType.DISABLE : goog.ui.Component.EventType.ENABLE;
        case goog.ui.Component.State.HOVER:
            return b ? goog.ui.Component.EventType.HIGHLIGHT : goog.ui.Component.EventType.UNHIGHLIGHT;
        case goog.ui.Component.State.ACTIVE:
            return b ? goog.ui.Component.EventType.ACTIVATE : goog.ui.Component.EventType.DEACTIVATE;
        case goog.ui.Component.State.SELECTED:
            return b ? goog.ui.Component.EventType.SELECT :
                goog.ui.Component.EventType.UNSELECT;
        case goog.ui.Component.State.CHECKED:
            return b ? goog.ui.Component.EventType.CHECK : goog.ui.Component.EventType.UNCHECK;
        case goog.ui.Component.State.FOCUSED:
            return b ? goog.ui.Component.EventType.FOCUS : goog.ui.Component.EventType.BLUR;
        case goog.ui.Component.State.OPENED:
            return b ? goog.ui.Component.EventType.OPEN : goog.ui.Component.EventType.CLOSE
    }
    throw Error(goog.ui.Component.Error.STATE_INVALID);
};
goog.ui.Component.setDefaultRightToLeft = function(a) {
    goog.ui.Component.defaultRightToLeft_ = a
};
goog.ui.Component.prototype.getId = function() {
    return this.id_ || (this.id_ = this.idGenerator_.getNextUniqueId())
};
goog.ui.Component.prototype.setId = function(a) {
    this.parent_ && this.parent_.childIndex_ && (goog.object.remove(this.parent_.childIndex_, this.id_), goog.object.add(this.parent_.childIndex_, a, this));
    this.id_ = a
};
goog.ui.Component.prototype.getElement = function() {
    return this.element_
};
goog.ui.Component.prototype.getElementStrict = function() {
    var a = this.element_;
    goog.asserts.assert(a, "Can not call getElementStrict before rendering/decorating.");
    return a
};
goog.ui.Component.prototype.setElementInternal = function(a) {
    this.element_ = a
};
goog.ui.Component.prototype.getElementsByClass = function(a) {
    return this.element_ ? this.dom_.getElementsByClass(a, this.element_) : []
};
goog.ui.Component.prototype.getElementByClass = function(a) {
    return this.element_ ? this.dom_.getElementByClass(a, this.element_) : null
};
goog.ui.Component.prototype.getRequiredElementByClass = function(a) {
    var b = this.getElementByClass(a);
    goog.asserts.assert(b, "Expected element in component with class: %s", a);
    return b
};
goog.ui.Component.prototype.getHandler = function() {
    this.googUiComponentHandler_ || (this.googUiComponentHandler_ = new goog.events.EventHandler(this));
    return goog.asserts.assert(this.googUiComponentHandler_)
};
goog.ui.Component.prototype.setParent = function(a) {
    if (this == a) throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);
    if (a && this.parent_ && this.id_ && this.parent_.getChild(this.id_) && this.parent_ != a) throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);
    this.parent_ = a;
    goog.ui.Component.superClass_.setParentEventTarget.call(this, a)
};
goog.ui.Component.prototype.getParent = function() {
    return this.parent_
};
goog.ui.Component.prototype.setParentEventTarget = function(a) {
    if (this.parent_ && this.parent_ != a) throw Error(goog.ui.Component.Error.NOT_SUPPORTED);
    goog.ui.Component.superClass_.setParentEventTarget.call(this, a)
};
goog.ui.Component.prototype.getDomHelper = function() {
    return this.dom_
};
goog.ui.Component.prototype.isInDocument = function() {
    return this.inDocument_
};
goog.ui.Component.prototype.createDom = function() {
    this.element_ = this.dom_.createElement("DIV")
};
goog.ui.Component.prototype.render = function(a) {
    this.render_(a)
};
goog.ui.Component.prototype.renderBefore = function(a) {
    this.render_(a.parentNode, a)
};
goog.ui.Component.prototype.render_ = function(a, b) {
    if (this.inDocument_) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    this.element_ || this.createDom();
    a ? a.insertBefore(this.element_, b || null) : this.dom_.getDocument().body.appendChild(this.element_);
    this.parent_ && !this.parent_.isInDocument() || this.enterDocument()
};
goog.ui.Component.prototype.decorate = function(a) {
    if (this.inDocument_) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    if (a && this.canDecorate(a)) {
        this.wasDecorated_ = !0;
        var b = goog.dom.getOwnerDocument(a);
        this.dom_ && this.dom_.getDocument() == b || (this.dom_ = goog.dom.getDomHelper(a));
        this.decorateInternal(a);
        goog.ui.Component.ALLOW_DETACHED_DECORATION && !goog.dom.contains(b, a) || this.enterDocument()
    } else throw Error(goog.ui.Component.Error.DECORATE_INVALID);
};
goog.ui.Component.prototype.canDecorate = function(a) {
    return !0
};
goog.ui.Component.prototype.wasDecorated = function() {
    return this.wasDecorated_
};
goog.ui.Component.prototype.decorateInternal = function(a) {
    this.element_ = a
};
goog.ui.Component.prototype.enterDocument = function() {
    this.inDocument_ = !0;
    this.forEachChild(function(a) {
        !a.isInDocument() && a.getElement() && a.enterDocument()
    })
};
goog.ui.Component.prototype.exitDocument = function() {
    this.forEachChild(function(a) {
        a.isInDocument() && a.exitDocument()
    });
    this.googUiComponentHandler_ && this.googUiComponentHandler_.removeAll();
    this.inDocument_ = !1
};
goog.ui.Component.prototype.disposeInternal = function() {
    this.inDocument_ && this.exitDocument();
    this.googUiComponentHandler_ && (this.googUiComponentHandler_.dispose(), delete this.googUiComponentHandler_);
    this.forEachChild(function(a) {
        a.dispose()
    });
    !this.wasDecorated_ && this.element_ && goog.dom.removeNode(this.element_);
    this.parent_ = this.model_ = this.element_ = this.childIndex_ = this.children_ = null;
    goog.ui.Component.superClass_.disposeInternal.call(this)
};
goog.ui.Component.prototype.makeId = function(a) {
    return this.getId() + "." + a
};
goog.ui.Component.prototype.makeIds = function(a) {
    var b = {},
        c;
    for (c in a) b[c] = this.makeId(a[c]);
    return b
};
goog.ui.Component.prototype.getModel = function() {
    return this.model_
};
goog.ui.Component.prototype.setModel = function(a) {
    this.model_ = a
};
goog.ui.Component.prototype.getFragmentFromId = function(a) {
    return a.substring(this.getId().length + 1)
};
goog.ui.Component.prototype.getElementByFragment = function(a) {
    if (!this.inDocument_) throw Error(goog.ui.Component.Error.NOT_IN_DOCUMENT);
    return this.dom_.getElement(this.makeId(a))
};
goog.ui.Component.prototype.addChild = function(a, b) {
    this.addChildAt(a, this.getChildCount(), b)
};
goog.ui.Component.prototype.addChildAt = function(a, b, c) {
    goog.asserts.assert(!!a, "Provided element must not be null.");
    if (a.inDocument_ && (c || !this.inDocument_)) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    if (0 > b || b > this.getChildCount()) throw Error(goog.ui.Component.Error.CHILD_INDEX_OUT_OF_BOUNDS);
    this.childIndex_ && this.children_ || (this.childIndex_ = {}, this.children_ = []);
    a.getParent() == this ? (goog.object.set(this.childIndex_, a.getId(), a), goog.array.remove(this.children_, a)) : goog.object.add(this.childIndex_,
        a.getId(), a);
    a.setParent(this);
    goog.array.insertAt(this.children_, a, b);
    a.inDocument_ && this.inDocument_ && a.getParent() == this ? (c = this.getContentElement(), b = c.childNodes[b] || null, b != a.getElement() && c.insertBefore(a.getElement(), b)) : c ? (this.element_ || this.createDom(), b = this.getChildAt(b + 1), a.render_(this.getContentElement(), b ? b.element_ : null)) : this.inDocument_ && !a.inDocument_ && a.element_ && a.element_.parentNode && a.element_.parentNode.nodeType == goog.dom.NodeType.ELEMENT && a.enterDocument()
};
goog.ui.Component.prototype.getContentElement = function() {
    return this.element_
};
goog.ui.Component.prototype.isRightToLeft = function() {
    null == this.rightToLeft_ && (this.rightToLeft_ = goog.style.isRightToLeft(this.inDocument_ ? this.element_ : this.dom_.getDocument().body));
    return this.rightToLeft_
};
goog.ui.Component.prototype.setRightToLeft = function(a) {
    if (this.inDocument_) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    this.rightToLeft_ = a
};
goog.ui.Component.prototype.hasChildren = function() {
    return !!this.children_ && 0 != this.children_.length
};
goog.ui.Component.prototype.getChildCount = function() {
    return this.children_ ? this.children_.length : 0
};
goog.ui.Component.prototype.getChildIds = function() {
    var a = [];
    this.forEachChild(function(b) {
        a.push(b.getId())
    });
    return a
};
goog.ui.Component.prototype.getChild = function(a) {
    return this.childIndex_ && a ? goog.object.get(this.childIndex_, a) || null : null
};
goog.ui.Component.prototype.getChildAt = function(a) {
    return this.children_ ? this.children_[a] || null : null
};
goog.ui.Component.prototype.forEachChild = function(a, b) {
    this.children_ && goog.array.forEach(this.children_, a, b)
};
goog.ui.Component.prototype.indexOfChild = function(a) {
    return this.children_ && a ? goog.array.indexOf(this.children_, a) : -1
};
goog.ui.Component.prototype.removeChild = function(a, b) {
    if (a) {
        var c = "string" === typeof a ? a : a.getId();
        a = this.getChild(c);
        c && a && (goog.object.remove(this.childIndex_, c), goog.array.remove(this.children_, a), b && (a.exitDocument(), a.element_ && goog.dom.removeNode(a.element_)), a.setParent(null))
    }
    if (!a) throw Error(goog.ui.Component.Error.NOT_OUR_CHILD);
    return a
};
goog.ui.Component.prototype.removeChildAt = function(a, b) {
    return this.removeChild(this.getChildAt(a), b)
};
goog.ui.Component.prototype.removeChildren = function(a) {
    for (var b = []; this.hasChildren();) b.push(this.removeChildAt(0, a));
    return b
};
goog.ui.Component.prototype.pointerEventsEnabled = function() {
    return this.pointerEventsEnabled_
};
goog.ui.Component.prototype.setPointerEventsEnabled = function(a) {
    if (this.inDocument_) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    this.pointerEventsEnabled_ = a
};
goog.a11y = {};
goog.a11y.aria = {};
goog.a11y.aria.Role = {
    ALERT: "alert",
    ALERTDIALOG: "alertdialog",
    APPLICATION: "application",
    ARTICLE: "article",
    BANNER: "banner",
    BUTTON: "button",
    CHECKBOX: "checkbox",
    COLUMNHEADER: "columnheader",
    COMBOBOX: "combobox",
    COMPLEMENTARY: "complementary",
    CONTENTINFO: "contentinfo",
    DEFINITION: "definition",
    DIALOG: "dialog",
    DIRECTORY: "directory",
    DOCUMENT: "document",
    FORM: "form",
    GRID: "grid",
    GRIDCELL: "gridcell",
    GROUP: "group",
    HEADING: "heading",
    IMG: "img",
    LINK: "link",
    LIST: "list",
    LISTBOX: "listbox",
    LISTITEM: "listitem",
    LOG: "log",
    MAIN: "main",
    MARQUEE: "marquee",
    MATH: "math",
    MENU: "menu",
    MENUBAR: "menubar",
    MENU_ITEM: "menuitem",
    MENU_ITEM_CHECKBOX: "menuitemcheckbox",
    MENU_ITEM_RADIO: "menuitemradio",
    NAVIGATION: "navigation",
    NOTE: "note",
    OPTION: "option",
    PRESENTATION: "presentation",
    PROGRESSBAR: "progressbar",
    RADIO: "radio",
    RADIOGROUP: "radiogroup",
    REGION: "region",
    ROW: "row",
    ROWGROUP: "rowgroup",
    ROWHEADER: "rowheader",
    SCROLLBAR: "scrollbar",
    SEARCH: "search",
    SEPARATOR: "separator",
    SLIDER: "slider",
    SPINBUTTON: "spinbutton",
    STATUS: "status",
    TAB: "tab",
    TAB_LIST: "tablist",
    TAB_PANEL: "tabpanel",
    TEXTBOX: "textbox",
    TEXTINFO: "textinfo",
    TIMER: "timer",
    TOOLBAR: "toolbar",
    TOOLTIP: "tooltip",
    TREE: "tree",
    TREEGRID: "treegrid",
    TREEITEM: "treeitem"
};
goog.a11y.aria.State = {
    ACTIVEDESCENDANT: "activedescendant",
    ATOMIC: "atomic",
    AUTOCOMPLETE: "autocomplete",
    BUSY: "busy",
    CHECKED: "checked",
    COLINDEX: "colindex",
    CONTROLS: "controls",
    DESCRIBEDBY: "describedby",
    DISABLED: "disabled",
    DROPEFFECT: "dropeffect",
    EXPANDED: "expanded",
    FLOWTO: "flowto",
    GRABBED: "grabbed",
    HASPOPUP: "haspopup",
    HIDDEN: "hidden",
    INVALID: "invalid",
    LABEL: "label",
    LABELLEDBY: "labelledby",
    LEVEL: "level",
    LIVE: "live",
    MULTILINE: "multiline",
    MULTISELECTABLE: "multiselectable",
    ORIENTATION: "orientation",
    OWNS: "owns",
    POSINSET: "posinset",
    PRESSED: "pressed",
    READONLY: "readonly",
    RELEVANT: "relevant",
    REQUIRED: "required",
    ROWINDEX: "rowindex",
    SELECTED: "selected",
    SETSIZE: "setsize",
    SORT: "sort",
    VALUEMAX: "valuemax",
    VALUEMIN: "valuemin",
    VALUENOW: "valuenow",
    VALUETEXT: "valuetext"
};
goog.a11y.aria.AutoCompleteValues = {
    INLINE: "inline",
    LIST: "list",
    BOTH: "both",
    NONE: "none"
};
goog.a11y.aria.DropEffectValues = {
    COPY: "copy",
    MOVE: "move",
    LINK: "link",
    EXECUTE: "execute",
    POPUP: "popup",
    NONE: "none"
};
goog.a11y.aria.LivePriority = {
    OFF: "off",
    POLITE: "polite",
    ASSERTIVE: "assertive"
};
goog.a11y.aria.OrientationValues = {
    VERTICAL: "vertical",
    HORIZONTAL: "horizontal"
};
goog.a11y.aria.RelevantValues = {
    ADDITIONS: "additions",
    REMOVALS: "removals",
    TEXT: "text",
    ALL: "all"
};
goog.a11y.aria.SortValues = {
    ASCENDING: "ascending",
    DESCENDING: "descending",
    NONE: "none",
    OTHER: "other"
};
goog.a11y.aria.CheckedValues = {
    TRUE: "true",
    FALSE: "false",
    MIXED: "mixed",
    UNDEFINED: "undefined"
};
goog.a11y.aria.ExpandedValues = {
    TRUE: "true",
    FALSE: "false",
    UNDEFINED: "undefined"
};
goog.a11y.aria.GrabbedValues = {
    TRUE: "true",
    FALSE: "false",
    UNDEFINED: "undefined"
};
goog.a11y.aria.InvalidValues = {
    FALSE: "false",
    TRUE: "true",
    GRAMMAR: "grammar",
    SPELLING: "spelling"
};
goog.a11y.aria.PressedValues = {
    TRUE: "true",
    FALSE: "false",
    MIXED: "mixed",
    UNDEFINED: "undefined"
};
goog.a11y.aria.SelectedValues = {
    TRUE: "true",
    FALSE: "false",
    UNDEFINED: "undefined"
};
goog.a11y.aria.datatables = {};
goog.a11y.aria.datatables.getDefaultValuesMap = function() {
    goog.a11y.aria.DefaultStateValueMap_ || (goog.a11y.aria.DefaultStateValueMap_ = goog.object.create(goog.a11y.aria.State.ATOMIC, !1, goog.a11y.aria.State.AUTOCOMPLETE, "none", goog.a11y.aria.State.DROPEFFECT, "none", goog.a11y.aria.State.HASPOPUP, !1, goog.a11y.aria.State.LIVE, "off", goog.a11y.aria.State.MULTILINE, !1, goog.a11y.aria.State.MULTISELECTABLE, !1, goog.a11y.aria.State.ORIENTATION, "vertical", goog.a11y.aria.State.READONLY, !1, goog.a11y.aria.State.RELEVANT,
        "additions text", goog.a11y.aria.State.REQUIRED, !1, goog.a11y.aria.State.SORT, "none", goog.a11y.aria.State.BUSY, !1, goog.a11y.aria.State.DISABLED, !1, goog.a11y.aria.State.HIDDEN, !1, goog.a11y.aria.State.INVALID, "false"));
    return goog.a11y.aria.DefaultStateValueMap_
};
goog.a11y.aria.ARIA_PREFIX_ = "aria-";
goog.a11y.aria.ROLE_ATTRIBUTE_ = "role";
goog.a11y.aria.TAGS_WITH_ASSUMED_ROLES_ = goog.object.createSet("A AREA BUTTON HEAD INPUT LINK MENU META OPTGROUP OPTION PROGRESS STYLE SELECT SOURCE TEXTAREA TITLE TRACK".split(" "));
goog.a11y.aria.CONTAINER_ROLES_ = [goog.a11y.aria.Role.COMBOBOX, goog.a11y.aria.Role.GRID, goog.a11y.aria.Role.GROUP, goog.a11y.aria.Role.LISTBOX, goog.a11y.aria.Role.MENU, goog.a11y.aria.Role.MENUBAR, goog.a11y.aria.Role.RADIOGROUP, goog.a11y.aria.Role.ROW, goog.a11y.aria.Role.ROWGROUP, goog.a11y.aria.Role.TAB_LIST, goog.a11y.aria.Role.TEXTBOX, goog.a11y.aria.Role.TOOLBAR, goog.a11y.aria.Role.TREE, goog.a11y.aria.Role.TREEGRID];
goog.a11y.aria.setRole = function(a, b) {
    b ? (goog.asserts.ENABLE_ASSERTS && goog.asserts.assert(goog.object.containsValue(goog.a11y.aria.Role, b), "No such ARIA role " + b), a.setAttribute(goog.a11y.aria.ROLE_ATTRIBUTE_, b)) : goog.a11y.aria.removeRole(a)
};
goog.a11y.aria.getRole = function(a) {
    return a.getAttribute(goog.a11y.aria.ROLE_ATTRIBUTE_) || null
};
goog.a11y.aria.removeRole = function(a) {
    a.removeAttribute(goog.a11y.aria.ROLE_ATTRIBUTE_)
};
goog.a11y.aria.setState = function(a, b, c) {
    goog.isArray(c) && (c = c.join(" "));
    var d = goog.a11y.aria.getAriaAttributeName_(b);
    "" === c || void 0 == c ? (c = goog.a11y.aria.datatables.getDefaultValuesMap(), b in c ? a.setAttribute(d, c[b]) : a.removeAttribute(d)) : a.setAttribute(d, c)
};
goog.a11y.aria.toggleState = function(a, b) {
    var c = goog.a11y.aria.getState(a, b);
    goog.string.isEmptyOrWhitespace(goog.string.makeSafe(c)) || "true" == c || "false" == c ? goog.a11y.aria.setState(a, b, "true" == c ? "false" : "true") : goog.a11y.aria.removeState(a, b)
};
goog.a11y.aria.removeState = function(a, b) {
    a.removeAttribute(goog.a11y.aria.getAriaAttributeName_(b))
};
goog.a11y.aria.getState = function(a, b) {
    var c = a.getAttribute(goog.a11y.aria.getAriaAttributeName_(b));
    return null == c || void 0 == c ? "" : String(c)
};
goog.a11y.aria.getActiveDescendant = function(a) {
    var b = goog.a11y.aria.getState(a, goog.a11y.aria.State.ACTIVEDESCENDANT);
    return goog.dom.getOwnerDocument(a).getElementById(b)
};
goog.a11y.aria.setActiveDescendant = function(a, b) {
    var c = "";
    b && (c = b.id, goog.asserts.assert(c, "The active element should have an id."));
    goog.a11y.aria.setState(a, goog.a11y.aria.State.ACTIVEDESCENDANT, c)
};
goog.a11y.aria.getLabel = function(a) {
    return goog.a11y.aria.getState(a, goog.a11y.aria.State.LABEL)
};
goog.a11y.aria.setLabel = function(a, b) {
    goog.a11y.aria.setState(a, goog.a11y.aria.State.LABEL, b)
};
goog.a11y.aria.assertRoleIsSetInternalUtil = function(a, b) {
    if (!goog.a11y.aria.TAGS_WITH_ASSUMED_ROLES_[a.tagName]) {
        var c = goog.a11y.aria.getRole(a);
        goog.asserts.assert(null != c, "The element ARIA role cannot be null.");
        goog.asserts.assert(goog.array.contains(b, c), 'Non existing or incorrect role set for element.The role set is "' + c + '". The role should be any of "' + b + '". Check the ARIA specification for more details http://www.w3.org/TR/wai-aria/roles.')
    }
};
goog.a11y.aria.getStateBoolean = function(a, b) {
    var c = a.getAttribute(goog.a11y.aria.getAriaAttributeName_(b));
    goog.asserts.assert("boolean" === typeof c || null == c || "true" == c || "false" == c);
    return null == c ? c : "boolean" === typeof c ? c : "true" == c
};
goog.a11y.aria.getStateNumber = function(a, b) {
    var c = a.getAttribute(goog.a11y.aria.getAriaAttributeName_(b));
    goog.asserts.assert((null == c || !isNaN(Number(c))) && "boolean" !== typeof c);
    return null == c ? null : Number(c)
};
goog.a11y.aria.getStateString = function(a, b) {
    var c = a.getAttribute(goog.a11y.aria.getAriaAttributeName_(b));
    goog.asserts.assert((null == c || "string" === typeof c) && ("" == c || isNaN(Number(c))) && "true" != c && "false" != c);
    return null == c || "" == c ? null : c
};
goog.a11y.aria.getStringArrayStateInternalUtil = function(a, b) {
    var c = a.getAttribute(goog.a11y.aria.getAriaAttributeName_(b));
    return goog.a11y.aria.splitStringOnWhitespace_(c)
};
goog.a11y.aria.hasState = function(a, b) {
    return a.hasAttribute(goog.a11y.aria.getAriaAttributeName_(b))
};
goog.a11y.aria.isContainerRole = function(a) {
    a = goog.a11y.aria.getRole(a);
    return goog.array.contains(goog.a11y.aria.CONTAINER_ROLES_, a)
};
goog.a11y.aria.splitStringOnWhitespace_ = function(a) {
    return a ? a.split(/\s+/) : []
};
goog.a11y.aria.getAriaAttributeName_ = function(a) {
    goog.asserts.ENABLE_ASSERTS && (goog.asserts.assert(a, "ARIA attribute cannot be empty."), goog.asserts.assert(goog.object.containsValue(goog.a11y.aria.State, a), "No such ARIA attribute " + a));
    return goog.a11y.aria.ARIA_PREFIX_ + a
};
goog.events.KeyCodes = {
    WIN_KEY_FF_LINUX: 0,
    MAC_ENTER: 3,
    BACKSPACE: 8,
    TAB: 9,
    NUM_CENTER: 12,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    PAUSE: 19,
    CAPS_LOCK: 20,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    PLUS_SIGN: 43,
    PRINT_SCREEN: 44,
    INSERT: 45,
    DELETE: 46,
    ZERO: 48,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    SIX: 54,
    SEVEN: 55,
    EIGHT: 56,
    NINE: 57,
    FF_SEMICOLON: 59,
    FF_EQUALS: 61,
    FF_DASH: 173,
    FF_HASH: 163,
    FF_JP_QUOTE: 58,
    QUESTION_MARK: 63,
    AT_SIGN: 64,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    META: 91,
    WIN_KEY_RIGHT: 92,
    CONTEXT_MENU: 93,
    NUM_ZERO: 96,
    NUM_ONE: 97,
    NUM_TWO: 98,
    NUM_THREE: 99,
    NUM_FOUR: 100,
    NUM_FIVE: 101,
    NUM_SIX: 102,
    NUM_SEVEN: 103,
    NUM_EIGHT: 104,
    NUM_NINE: 105,
    NUM_MULTIPLY: 106,
    NUM_PLUS: 107,
    NUM_MINUS: 109,
    NUM_PERIOD: 110,
    NUM_DIVISION: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    NUMLOCK: 144,
    SCROLL_LOCK: 145,
    FIRST_MEDIA_KEY: 166,
    LAST_MEDIA_KEY: 183,
    SEMICOLON: 186,
    DASH: 189,
    EQUALS: 187,
    COMMA: 188,
    PERIOD: 190,
    SLASH: 191,
    APOSTROPHE: 192,
    TILDE: 192,
    SINGLE_QUOTE: 222,
    OPEN_SQUARE_BRACKET: 219,
    BACKSLASH: 220,
    CLOSE_SQUARE_BRACKET: 221,
    WIN_KEY: 224,
    MAC_FF_META: 224,
    MAC_WK_CMD_LEFT: 91,
    MAC_WK_CMD_RIGHT: 93,
    WIN_IME: 229,
    VK_NONAME: 252,
    PHANTOM: 255
};
goog.events.KeyCodes.isTextModifyingKeyEvent = function(a) {
    if (a.altKey && !a.ctrlKey || a.metaKey || a.keyCode >= goog.events.KeyCodes.F1 && a.keyCode <= goog.events.KeyCodes.F12) return !1;
    if (goog.events.KeyCodes.isCharacterKey(a.keyCode)) return !0;
    switch (a.keyCode) {
        case goog.events.KeyCodes.ALT:
        case goog.events.KeyCodes.CAPS_LOCK:
        case goog.events.KeyCodes.CONTEXT_MENU:
        case goog.events.KeyCodes.CTRL:
        case goog.events.KeyCodes.DOWN:
        case goog.events.KeyCodes.END:
        case goog.events.KeyCodes.ESC:
        case goog.events.KeyCodes.HOME:
        case goog.events.KeyCodes.INSERT:
        case goog.events.KeyCodes.LEFT:
        case goog.events.KeyCodes.MAC_FF_META:
        case goog.events.KeyCodes.META:
        case goog.events.KeyCodes.NUMLOCK:
        case goog.events.KeyCodes.NUM_CENTER:
        case goog.events.KeyCodes.PAGE_DOWN:
        case goog.events.KeyCodes.PAGE_UP:
        case goog.events.KeyCodes.PAUSE:
        case goog.events.KeyCodes.PHANTOM:
        case goog.events.KeyCodes.PRINT_SCREEN:
        case goog.events.KeyCodes.RIGHT:
        case goog.events.KeyCodes.SCROLL_LOCK:
        case goog.events.KeyCodes.SHIFT:
        case goog.events.KeyCodes.UP:
        case goog.events.KeyCodes.VK_NONAME:
        case goog.events.KeyCodes.WIN_KEY:
        case goog.events.KeyCodes.WIN_KEY_RIGHT:
            return !1;
        case goog.events.KeyCodes.WIN_KEY_FF_LINUX:
            return !goog.userAgent.GECKO;
        default:
            return a.keyCode < goog.events.KeyCodes.FIRST_MEDIA_KEY || a.keyCode > goog.events.KeyCodes.LAST_MEDIA_KEY
    }
};
goog.events.KeyCodes.firesKeyPressEvent = function(a, b, c, d, e, f) {
    if (goog.userAgent.WEBKIT && !goog.userAgent.isVersionOrHigher("525")) return !0;
    if (goog.userAgent.MAC && e) return goog.events.KeyCodes.isCharacterKey(a);
    if (e && !d) return !1;
    if (!goog.userAgent.GECKO) {
        "number" === typeof b && (b = goog.events.KeyCodes.normalizeKeyCode(b));
        var g = b == goog.events.KeyCodes.CTRL || b == goog.events.KeyCodes.ALT || goog.userAgent.MAC && b == goog.events.KeyCodes.META,
            h = b == goog.events.KeyCodes.SHIFT && (d || f);
        if ((!c || goog.userAgent.MAC) &&
            g || goog.userAgent.MAC && h) return !1
    }
    if ((goog.userAgent.WEBKIT || goog.userAgent.EDGE) && d && c) switch (a) {
        case goog.events.KeyCodes.BACKSLASH:
        case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:
        case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:
        case goog.events.KeyCodes.TILDE:
        case goog.events.KeyCodes.SEMICOLON:
        case goog.events.KeyCodes.DASH:
        case goog.events.KeyCodes.EQUALS:
        case goog.events.KeyCodes.COMMA:
        case goog.events.KeyCodes.PERIOD:
        case goog.events.KeyCodes.SLASH:
        case goog.events.KeyCodes.APOSTROPHE:
        case goog.events.KeyCodes.SINGLE_QUOTE:
            return !1
    }
    if (goog.userAgent.IE &&
        d && b == a) return !1;
    switch (a) {
        case goog.events.KeyCodes.ENTER:
            return goog.userAgent.GECKO ? f || e ? !1 : !(c && d) : !0;
        case goog.events.KeyCodes.ESC:
            return !(goog.userAgent.WEBKIT || goog.userAgent.EDGE || goog.userAgent.GECKO)
    }
    return goog.userAgent.GECKO && (d || e || f) ? !1 : goog.events.KeyCodes.isCharacterKey(a)
};
goog.events.KeyCodes.isCharacterKey = function(a) {
    if (a >= goog.events.KeyCodes.ZERO && a <= goog.events.KeyCodes.NINE || a >= goog.events.KeyCodes.NUM_ZERO && a <= goog.events.KeyCodes.NUM_MULTIPLY || a >= goog.events.KeyCodes.A && a <= goog.events.KeyCodes.Z || (goog.userAgent.WEBKIT || goog.userAgent.EDGE) && 0 == a) return !0;
    switch (a) {
        case goog.events.KeyCodes.SPACE:
        case goog.events.KeyCodes.PLUS_SIGN:
        case goog.events.KeyCodes.QUESTION_MARK:
        case goog.events.KeyCodes.AT_SIGN:
        case goog.events.KeyCodes.NUM_PLUS:
        case goog.events.KeyCodes.NUM_MINUS:
        case goog.events.KeyCodes.NUM_PERIOD:
        case goog.events.KeyCodes.NUM_DIVISION:
        case goog.events.KeyCodes.SEMICOLON:
        case goog.events.KeyCodes.FF_SEMICOLON:
        case goog.events.KeyCodes.DASH:
        case goog.events.KeyCodes.EQUALS:
        case goog.events.KeyCodes.FF_EQUALS:
        case goog.events.KeyCodes.COMMA:
        case goog.events.KeyCodes.PERIOD:
        case goog.events.KeyCodes.SLASH:
        case goog.events.KeyCodes.APOSTROPHE:
        case goog.events.KeyCodes.SINGLE_QUOTE:
        case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:
        case goog.events.KeyCodes.BACKSLASH:
        case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:
        case goog.events.KeyCodes.FF_HASH:
        case goog.events.KeyCodes.FF_JP_QUOTE:
            return !0;
        case goog.events.KeyCodes.FF_DASH:
            return goog.userAgent.GECKO;
        default:
            return !1
    }
};
goog.events.KeyCodes.normalizeKeyCode = function(a) {
    return goog.userAgent.GECKO ? goog.events.KeyCodes.normalizeGeckoKeyCode(a) : goog.userAgent.MAC && goog.userAgent.WEBKIT ? goog.events.KeyCodes.normalizeMacWebKitKeyCode(a) : a
};
goog.events.KeyCodes.normalizeGeckoKeyCode = function(a) {
    switch (a) {
        case goog.events.KeyCodes.FF_EQUALS:
            return goog.events.KeyCodes.EQUALS;
        case goog.events.KeyCodes.FF_SEMICOLON:
            return goog.events.KeyCodes.SEMICOLON;
        case goog.events.KeyCodes.FF_DASH:
            return goog.events.KeyCodes.DASH;
        case goog.events.KeyCodes.MAC_FF_META:
            return goog.events.KeyCodes.META;
        case goog.events.KeyCodes.WIN_KEY_FF_LINUX:
            return goog.events.KeyCodes.WIN_KEY;
        default:
            return a
    }
};
goog.events.KeyCodes.normalizeMacWebKitKeyCode = function(a) {
    switch (a) {
        case goog.events.KeyCodes.MAC_WK_CMD_RIGHT:
            return goog.events.KeyCodes.META;
        default:
            return a
    }
};
goog.events.KeyHandler = function(a, b) {
    goog.events.EventTarget.call(this);
    a && this.attach(a, b)
};
goog.inherits(goog.events.KeyHandler, goog.events.EventTarget);
goog.events.KeyHandler.prototype.element_ = null;
goog.events.KeyHandler.prototype.keyPressKey_ = null;
goog.events.KeyHandler.prototype.keyDownKey_ = null;
goog.events.KeyHandler.prototype.keyUpKey_ = null;
goog.events.KeyHandler.prototype.lastKey_ = -1;
goog.events.KeyHandler.prototype.keyCode_ = -1;
goog.events.KeyHandler.prototype.altKey_ = !1;
goog.events.KeyHandler.EventType = {
    KEY: "key"
};
goog.events.KeyHandler.safariKey_ = {
    3: goog.events.KeyCodes.ENTER,
    12: goog.events.KeyCodes.NUMLOCK,
    63232: goog.events.KeyCodes.UP,
    63233: goog.events.KeyCodes.DOWN,
    63234: goog.events.KeyCodes.LEFT,
    63235: goog.events.KeyCodes.RIGHT,
    63236: goog.events.KeyCodes.F1,
    63237: goog.events.KeyCodes.F2,
    63238: goog.events.KeyCodes.F3,
    63239: goog.events.KeyCodes.F4,
    63240: goog.events.KeyCodes.F5,
    63241: goog.events.KeyCodes.F6,
    63242: goog.events.KeyCodes.F7,
    63243: goog.events.KeyCodes.F8,
    63244: goog.events.KeyCodes.F9,
    63245: goog.events.KeyCodes.F10,
    63246: goog.events.KeyCodes.F11,
    63247: goog.events.KeyCodes.F12,
    63248: goog.events.KeyCodes.PRINT_SCREEN,
    63272: goog.events.KeyCodes.DELETE,
    63273: goog.events.KeyCodes.HOME,
    63275: goog.events.KeyCodes.END,
    63276: goog.events.KeyCodes.PAGE_UP,
    63277: goog.events.KeyCodes.PAGE_DOWN,
    63289: goog.events.KeyCodes.NUMLOCK,
    63302: goog.events.KeyCodes.INSERT
};
goog.events.KeyHandler.keyIdentifier_ = {
    Up: goog.events.KeyCodes.UP,
    Down: goog.events.KeyCodes.DOWN,
    Left: goog.events.KeyCodes.LEFT,
    Right: goog.events.KeyCodes.RIGHT,
    Enter: goog.events.KeyCodes.ENTER,
    F1: goog.events.KeyCodes.F1,
    F2: goog.events.KeyCodes.F2,
    F3: goog.events.KeyCodes.F3,
    F4: goog.events.KeyCodes.F4,
    F5: goog.events.KeyCodes.F5,
    F6: goog.events.KeyCodes.F6,
    F7: goog.events.KeyCodes.F7,
    F8: goog.events.KeyCodes.F8,
    F9: goog.events.KeyCodes.F9,
    F10: goog.events.KeyCodes.F10,
    F11: goog.events.KeyCodes.F11,
    F12: goog.events.KeyCodes.F12,
    "U+007F": goog.events.KeyCodes.DELETE,
    Home: goog.events.KeyCodes.HOME,
    End: goog.events.KeyCodes.END,
    PageUp: goog.events.KeyCodes.PAGE_UP,
    PageDown: goog.events.KeyCodes.PAGE_DOWN,
    Insert: goog.events.KeyCodes.INSERT
};
goog.events.KeyHandler.USES_KEYDOWN_ = !goog.userAgent.WEBKIT || goog.userAgent.isVersionOrHigher("525");
goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ = goog.userAgent.MAC && goog.userAgent.GECKO;
goog.events.KeyHandler.prototype.handleKeyDown_ = function(a) {
    (goog.userAgent.WEBKIT || goog.userAgent.EDGE) && (this.lastKey_ == goog.events.KeyCodes.CTRL && !a.ctrlKey || this.lastKey_ == goog.events.KeyCodes.ALT && !a.altKey || goog.userAgent.MAC && this.lastKey_ == goog.events.KeyCodes.META && !a.metaKey) && this.resetState(); - 1 == this.lastKey_ && (a.ctrlKey && a.keyCode != goog.events.KeyCodes.CTRL ? this.lastKey_ = goog.events.KeyCodes.CTRL : a.altKey && a.keyCode != goog.events.KeyCodes.ALT ? this.lastKey_ = goog.events.KeyCodes.ALT : a.metaKey &&
        a.keyCode != goog.events.KeyCodes.META && (this.lastKey_ = goog.events.KeyCodes.META));
    goog.events.KeyHandler.USES_KEYDOWN_ && !goog.events.KeyCodes.firesKeyPressEvent(a.keyCode, this.lastKey_, a.shiftKey, a.ctrlKey, a.altKey, a.metaKey) ? this.handleEvent(a) : (this.keyCode_ = goog.events.KeyCodes.normalizeKeyCode(a.keyCode), goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ && (this.altKey_ = a.altKey))
};
goog.events.KeyHandler.prototype.resetState = function() {
    this.keyCode_ = this.lastKey_ = -1
};
goog.events.KeyHandler.prototype.handleKeyup_ = function(a) {
    this.resetState();
    this.altKey_ = a.altKey
};
goog.events.KeyHandler.prototype.handleEvent = function(a) {
    var b = a.getBrowserEvent(),
        c = b.altKey;
    if (goog.userAgent.IE && a.type == goog.events.EventType.KEYPRESS) {
        var d = this.keyCode_;
        var e = d != goog.events.KeyCodes.ENTER && d != goog.events.KeyCodes.ESC ? b.keyCode : 0
    } else(goog.userAgent.WEBKIT || goog.userAgent.EDGE) && a.type == goog.events.EventType.KEYPRESS ? (d = this.keyCode_, e = 0 <= b.charCode && 63232 > b.charCode && goog.events.KeyCodes.isCharacterKey(d) ? b.charCode : 0) : goog.userAgent.OPERA && !goog.userAgent.WEBKIT ? (d = this.keyCode_,
        e = goog.events.KeyCodes.isCharacterKey(d) ? b.keyCode : 0) : (a.type == goog.events.EventType.KEYPRESS ? (goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ && (c = this.altKey_), b.keyCode == b.charCode ? 32 > b.keyCode ? (d = b.keyCode, e = 0) : (d = this.keyCode_, e = b.charCode) : (d = b.keyCode || this.keyCode_, e = b.charCode || 0)) : (d = b.keyCode || this.keyCode_, e = b.charCode || 0), goog.userAgent.MAC && e == goog.events.KeyCodes.QUESTION_MARK && d == goog.events.KeyCodes.WIN_KEY && (d = goog.events.KeyCodes.SLASH));
    var f = d = goog.events.KeyCodes.normalizeKeyCode(d);
    d ? 63232 <= d && d in goog.events.KeyHandler.safariKey_ ? f = goog.events.KeyHandler.safariKey_[d] : 25 == d && a.shiftKey && (f = 9) : b.keyIdentifier && b.keyIdentifier in goog.events.KeyHandler.keyIdentifier_ && (f = goog.events.KeyHandler.keyIdentifier_[b.keyIdentifier]);
    goog.userAgent.GECKO && goog.events.KeyHandler.USES_KEYDOWN_ && a.type == goog.events.EventType.KEYPRESS && !goog.events.KeyCodes.firesKeyPressEvent(f, this.lastKey_, a.shiftKey, a.ctrlKey, c, a.metaKey) || (a = f == this.lastKey_, this.lastKey_ = f, b = new goog.events.KeyEvent(f,
        e, a, b), b.altKey = c, this.dispatchEvent(b))
};
goog.events.KeyHandler.prototype.getElement = function() {
    return this.element_
};
goog.events.KeyHandler.prototype.attach = function(a, b) {
    this.keyUpKey_ && this.detach();
    this.element_ = a;
    this.keyPressKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYPRESS, this, b);
    this.keyDownKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYDOWN, this.handleKeyDown_, b, this);
    this.keyUpKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYUP, this.handleKeyup_, b, this)
};
goog.events.KeyHandler.prototype.detach = function() {
    this.keyPressKey_ && (goog.events.unlistenByKey(this.keyPressKey_), goog.events.unlistenByKey(this.keyDownKey_), goog.events.unlistenByKey(this.keyUpKey_), this.keyUpKey_ = this.keyDownKey_ = this.keyPressKey_ = null);
    this.element_ = null;
    this.keyCode_ = this.lastKey_ = -1
};
goog.events.KeyHandler.prototype.disposeInternal = function() {
    goog.events.KeyHandler.superClass_.disposeInternal.call(this);
    this.detach()
};
goog.events.KeyEvent = function(a, b, c, d) {
    goog.events.BrowserEvent.call(this, d);
    this.type = goog.events.KeyHandler.EventType.KEY;
    this.keyCode = a;
    this.charCode = b;
    this.repeat = c
};
goog.inherits(goog.events.KeyEvent, goog.events.BrowserEvent);
goog.ui.ComponentUtil = {};
goog.ui.ComponentUtil.getMouseEventType = function(a) {
    return a.pointerEventsEnabled() ? goog.events.PointerAsMouseEventType : goog.events.MouseAsMouseEventType
};
goog.dom.classlist = {};
goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST = !1;
goog.dom.classlist.getClassName_ = function(a) {
    return "string" == typeof a.className ? a.className : a.getAttribute && a.getAttribute("class") || ""
};
goog.dom.classlist.get = function(a) {
    return goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList ? a.classList : goog.dom.classlist.getClassName_(a).match(/\S+/g) || []
};
goog.dom.classlist.set = function(a, b) {
    "string" == typeof a.className ? a.className = b : a.setAttribute && a.setAttribute("class", b)
};
goog.dom.classlist.contains = function(a, b) {
    return goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList ? a.classList.contains(b) : goog.array.contains(goog.dom.classlist.get(a), b)
};
goog.dom.classlist.add = function(a, b) {
    if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList) a.classList.add(b);
    else if (!goog.dom.classlist.contains(a, b)) {
        var c = goog.dom.classlist.getClassName_(a);
        goog.dom.classlist.set(a, c + (0 < c.length ? " " + b : b))
    }
};
goog.dom.classlist.addAll = function(a, b) {
    if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList) goog.array.forEach(b, function(b) {
        goog.dom.classlist.add(a, b)
    });
    else {
        var c = {};
        goog.array.forEach(goog.dom.classlist.get(a), function(a) {
            c[a] = !0
        });
        goog.array.forEach(b, function(a) {
            c[a] = !0
        });
        var d = "",
            e;
        for (e in c) d += 0 < d.length ? " " + e : e;
        goog.dom.classlist.set(a, d)
    }
};
goog.dom.classlist.remove = function(a, b) {
    goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList ? a.classList.remove(b) : goog.dom.classlist.contains(a, b) && goog.dom.classlist.set(a, goog.array.filter(goog.dom.classlist.get(a), function(a) {
        return a != b
    }).join(" "))
};
goog.dom.classlist.removeAll = function(a, b) {
    goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList ? goog.array.forEach(b, function(b) {
        goog.dom.classlist.remove(a, b)
    }) : goog.dom.classlist.set(a, goog.array.filter(goog.dom.classlist.get(a), function(a) {
        return !goog.array.contains(b, a)
    }).join(" "))
};
goog.dom.classlist.enable = function(a, b, c) {
    c ? goog.dom.classlist.add(a, b) : goog.dom.classlist.remove(a, b)
};
goog.dom.classlist.enableAll = function(a, b, c) {
    (c ? goog.dom.classlist.addAll : goog.dom.classlist.removeAll)(a, b)
};
goog.dom.classlist.swap = function(a, b, c) {
    return goog.dom.classlist.contains(a, b) ? (goog.dom.classlist.remove(a, b), goog.dom.classlist.add(a, c), !0) : !1
};
goog.dom.classlist.toggle = function(a, b) {
    var c = !goog.dom.classlist.contains(a, b);
    goog.dom.classlist.enable(a, b, c);
    return c
};
goog.dom.classlist.addRemove = function(a, b, c) {
    goog.dom.classlist.remove(a, b);
    goog.dom.classlist.add(a, c)
};
goog.ui.registry = {};
goog.ui.registry.getDefaultRenderer = function(a) {
    for (var b; a;) {
        b = goog.getUid(a);
        if (b = goog.ui.registry.defaultRenderers_[b]) break;
        a = a.superClass_ ? a.superClass_.constructor : null
    }
    return b ? goog.isFunction(b.getInstance) ? b.getInstance() : new b : null
};
goog.ui.registry.setDefaultRenderer = function(a, b) {
    if (!goog.isFunction(a)) throw Error("Invalid component class " + a);
    if (!goog.isFunction(b)) throw Error("Invalid renderer class " + b);
    var c = goog.getUid(a);
    goog.ui.registry.defaultRenderers_[c] = b
};
goog.ui.registry.getDecoratorByClassName = function(a) {
    return a in goog.ui.registry.decoratorFunctions_ ? goog.ui.registry.decoratorFunctions_[a]() : null
};
goog.ui.registry.setDecoratorByClassName = function(a, b) {
    if (!a) throw Error("Invalid class name " + a);
    if (!goog.isFunction(b)) throw Error("Invalid decorator function " + b);
    goog.ui.registry.decoratorFunctions_[a] = b
};
goog.ui.registry.getDecorator = function(a) {
    goog.asserts.assert(a);
    for (var b = goog.dom.classlist.get(a), c = 0, d = b.length; c < d; c++)
        if (a = goog.ui.registry.getDecoratorByClassName(b[c])) return a;
    return null
};
goog.ui.registry.reset = function() {
    goog.ui.registry.defaultRenderers_ = {};
    goog.ui.registry.decoratorFunctions_ = {}
};
goog.ui.registry.defaultRenderers_ = {};
goog.ui.registry.decoratorFunctions_ = {};
goog.ui.ContainerRenderer = function(a) {
    this.ariaRole_ = a
};
goog.addSingletonGetter(goog.ui.ContainerRenderer);
goog.ui.ContainerRenderer.getCustomRenderer = function(a, b) {
    var c = new a;
    c.getCssClass = function() {
        return b
    };
    return c
};
goog.ui.ContainerRenderer.CSS_CLASS = "goog-container";
goog.ui.ContainerRenderer.prototype.getAriaRole = function() {
    return this.ariaRole_
};
goog.ui.ContainerRenderer.prototype.enableTabIndex = function(a, b) {
    a && (a.tabIndex = b ? 0 : -1)
};
goog.ui.ContainerRenderer.prototype.createDom = function(a) {
    return a.getDomHelper().createDom("DIV", this.getClassNames(a).join(" "))
};
goog.ui.ContainerRenderer.prototype.getContentElement = function(a) {
    return a
};
goog.ui.ContainerRenderer.prototype.canDecorate = function(a) {
    return "DIV" == a.tagName
};
goog.ui.ContainerRenderer.prototype.decorate = function(a, b) {
    b.id && a.setId(b.id);
    var c = this.getCssClass(),
        d = !1,
        e = goog.dom.classlist.get(b);
    e && goog.array.forEach(e, function(b) {
        b == c ? d = !0 : b && this.setStateFromClassName(a, b, c)
    }, this);
    d || goog.dom.classlist.add(b, c);
    this.decorateChildren(a, this.getContentElement(b));
    return b
};
goog.ui.ContainerRenderer.prototype.setStateFromClassName = function(a, b, c) {
    b == c + "-disabled" ? a.setEnabled(!1) : b == c + "-horizontal" ? a.setOrientation(goog.ui.Container.Orientation.HORIZONTAL) : b == c + "-vertical" && a.setOrientation(goog.ui.Container.Orientation.VERTICAL)
};
goog.ui.ContainerRenderer.prototype.decorateChildren = function(a, b, c) {
    if (b) {
        c = c || b.firstChild;
        for (var d; c && c.parentNode == b;) {
            d = c.nextSibling;
            if (c.nodeType == goog.dom.NodeType.ELEMENT) {
                var e = this.getDecoratorForChild(c);
                e && (e.setElementInternal(c), a.isEnabled() || e.setEnabled(!1), a.addChild(e), e.decorate(c))
            } else c.nodeValue && "" != goog.string.trim(c.nodeValue) || b.removeChild(c);
            c = d
        }
    }
};
goog.ui.ContainerRenderer.prototype.getDecoratorForChild = function(a) {
    return goog.ui.registry.getDecorator(a)
};
goog.ui.ContainerRenderer.prototype.initializeDom = function(a) {
    a = a.getElement();
    goog.asserts.assert(a, "The container DOM element cannot be null.");
    goog.style.setUnselectable(a, !0, goog.userAgent.GECKO);
    goog.userAgent.IE && (a.hideFocus = !0);
    var b = this.getAriaRole();
    b && goog.a11y.aria.setRole(a, b)
};
goog.ui.ContainerRenderer.prototype.getKeyEventTarget = function(a) {
    return a.getElement()
};
goog.ui.ContainerRenderer.prototype.getCssClass = function() {
    return goog.ui.ContainerRenderer.CSS_CLASS
};
goog.ui.ContainerRenderer.prototype.getClassNames = function(a) {
    var b = this.getCssClass(),
        c = a.getOrientation() == goog.ui.Container.Orientation.HORIZONTAL;
    c = [b, c ? b + "-horizontal" : b + "-vertical"];
    a.isEnabled() || c.push(b + "-disabled");
    return c
};
goog.ui.ContainerRenderer.prototype.getDefaultOrientation = function() {
    return goog.ui.Container.Orientation.VERTICAL
};
goog.ui.ControlRenderer = function() {};
goog.addSingletonGetter(goog.ui.ControlRenderer);
goog.tagUnsealableClass(goog.ui.ControlRenderer);
goog.ui.ControlRenderer.getCustomRenderer = function(a, b) {
    var c = new a;
    c.getCssClass = function() {
        return b
    };
    return c
};
goog.ui.ControlRenderer.CSS_CLASS = "goog-control";
goog.ui.ControlRenderer.IE6_CLASS_COMBINATIONS = [];
goog.ui.ControlRenderer.TOGGLE_ARIA_STATE_MAP_ = goog.object.create(goog.a11y.aria.Role.BUTTON, goog.a11y.aria.State.PRESSED, goog.a11y.aria.Role.CHECKBOX, goog.a11y.aria.State.CHECKED, goog.a11y.aria.Role.MENU_ITEM, goog.a11y.aria.State.SELECTED, goog.a11y.aria.Role.MENU_ITEM_CHECKBOX, goog.a11y.aria.State.CHECKED, goog.a11y.aria.Role.MENU_ITEM_RADIO, goog.a11y.aria.State.CHECKED, goog.a11y.aria.Role.RADIO, goog.a11y.aria.State.CHECKED, goog.a11y.aria.Role.TAB, goog.a11y.aria.State.SELECTED, goog.a11y.aria.Role.TREEITEM,
    goog.a11y.aria.State.SELECTED);
goog.ui.ControlRenderer.prototype.getAriaRole = function() {};
goog.ui.ControlRenderer.prototype.createDom = function(a) {
    return a.getDomHelper().createDom("DIV", this.getClassNames(a).join(" "), a.getContent())
};
goog.ui.ControlRenderer.prototype.getContentElement = function(a) {
    return a
};
goog.ui.ControlRenderer.prototype.enableClassName = function(a, b, c) {
    if (a = a.getElement ? a.getElement() : a) {
        var d = [b];
        goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("7") && (d = this.getAppliedCombinedClassNames_(goog.dom.classlist.get(a), b), d.push(b));
        goog.dom.classlist.enableAll(a, d, c)
    }
};
goog.ui.ControlRenderer.prototype.enableExtraClassName = function(a, b, c) {
    this.enableClassName(a, b, c)
};
goog.ui.ControlRenderer.prototype.canDecorate = function(a) {
    return !0
};
goog.ui.ControlRenderer.prototype.decorate = function(a, b) {
    b.id && a.setId(b.id);
    var c = this.getContentElement(b);
    c && c.firstChild ? a.setContentInternal(c.firstChild.nextSibling ? goog.array.clone(c.childNodes) : c.firstChild) : a.setContentInternal(null);
    var d = 0,
        e = this.getCssClass(),
        f = this.getStructuralCssClass(),
        g = !1,
        h = !1,
        k = !1,
        l = goog.array.toArray(goog.dom.classlist.get(b));
    goog.array.forEach(l, function(a) {
        g || a != e ? h || a != f ? d |= this.getStateFromClass(a) : h = !0 : (g = !0, f == e && (h = !0));
        this.getStateFromClass(a) == goog.ui.Component.State.DISABLED &&
            (goog.asserts.assertElement(c), goog.dom.isFocusableTabIndex(c) && goog.dom.setFocusableTabIndex(c, !1))
    }, this);
    a.setStateInternal(d);
    g || (l.push(e), f == e && (h = !0));
    h || l.push(f);
    var p = a.getExtraClassNames();
    p && l.push.apply(l, p);
    if (goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("7")) {
        var m = this.getAppliedCombinedClassNames_(l);
        0 < m.length && (l.push.apply(l, m), k = !0)
    }
    g && h && !p && !k || goog.dom.classlist.set(b, l.join(" "));
    return b
};
goog.ui.ControlRenderer.prototype.initializeDom = function(a) {
    a.isRightToLeft() && this.setRightToLeft(a.getElement(), !0);
    a.isEnabled() && this.setFocusable(a, a.isVisible())
};
goog.ui.ControlRenderer.prototype.setAriaRole = function(a, b) {
    var c = b || this.getAriaRole();
    if (c) {
        goog.asserts.assert(a, "The element passed as a first parameter cannot be null.");
        var d = goog.a11y.aria.getRole(a);
        c != d && goog.a11y.aria.setRole(a, c)
    }
};
goog.ui.ControlRenderer.prototype.setAriaStates = function(a, b) {
    goog.asserts.assert(a);
    goog.asserts.assert(b);
    var c = a.getAriaLabel();
    null != c && this.setAriaLabel(b, c);
    a.isVisible() || goog.a11y.aria.setState(b, goog.a11y.aria.State.HIDDEN, !a.isVisible());
    a.isEnabled() || this.updateAriaState(b, goog.ui.Component.State.DISABLED, !a.isEnabled());
    a.isSupportedState(goog.ui.Component.State.SELECTED) && this.updateAriaState(b, goog.ui.Component.State.SELECTED, a.isSelected());
    a.isSupportedState(goog.ui.Component.State.CHECKED) &&
        this.updateAriaState(b, goog.ui.Component.State.CHECKED, a.isChecked());
    a.isSupportedState(goog.ui.Component.State.OPENED) && this.updateAriaState(b, goog.ui.Component.State.OPENED, a.isOpen())
};
goog.ui.ControlRenderer.prototype.setAriaLabel = function(a, b) {
    goog.a11y.aria.setLabel(a, b)
};
goog.ui.ControlRenderer.prototype.setAllowTextSelection = function(a, b) {
    goog.style.setUnselectable(a, !b, !goog.userAgent.IE && !goog.userAgent.OPERA)
};
goog.ui.ControlRenderer.prototype.setRightToLeft = function(a, b) {
    this.enableClassName(a, this.getStructuralCssClass() + "-rtl", b)
};
goog.ui.ControlRenderer.prototype.isFocusable = function(a) {
    var b;
    return a.isSupportedState(goog.ui.Component.State.FOCUSED) && (b = a.getKeyEventTarget()) ? goog.dom.isFocusableTabIndex(b) : !1
};
goog.ui.ControlRenderer.prototype.setFocusable = function(a, b) {
    var c;
    if (a.isSupportedState(goog.ui.Component.State.FOCUSED) && (c = a.getKeyEventTarget())) {
        if (!b && a.isFocused()) {
            try {
                c.blur()
            } catch (d) {}
            a.isFocused() && a.handleBlur(null)
        }
        goog.dom.isFocusableTabIndex(c) != b && goog.dom.setFocusableTabIndex(c, b)
    }
};
goog.ui.ControlRenderer.prototype.setVisible = function(a, b) {
    goog.style.setElementShown(a, b);
    a && goog.a11y.aria.setState(a, goog.a11y.aria.State.HIDDEN, !b)
};
goog.ui.ControlRenderer.prototype.setState = function(a, b, c) {
    var d = a.getElement();
    if (d) {
        var e = this.getClassForState(b);
        e && this.enableClassName(a, e, c);
        this.updateAriaState(d, b, c)
    }
};
goog.ui.ControlRenderer.prototype.updateAriaState = function(a, b, c) {
    goog.ui.ControlRenderer.ariaAttributeMap_ || (goog.ui.ControlRenderer.ariaAttributeMap_ = goog.object.create(goog.ui.Component.State.DISABLED, goog.a11y.aria.State.DISABLED, goog.ui.Component.State.SELECTED, goog.a11y.aria.State.SELECTED, goog.ui.Component.State.CHECKED, goog.a11y.aria.State.CHECKED, goog.ui.Component.State.OPENED, goog.a11y.aria.State.EXPANDED));
    goog.asserts.assert(a, "The element passed as a first parameter cannot be null.");
    (b = goog.ui.ControlRenderer.getAriaStateForAriaRole_(a, goog.ui.ControlRenderer.ariaAttributeMap_[b])) && goog.a11y.aria.setState(a, b, c)
};
goog.ui.ControlRenderer.getAriaStateForAriaRole_ = function(a, b) {
    var c = goog.a11y.aria.getRole(a);
    if (!c) return b;
    c = goog.ui.ControlRenderer.TOGGLE_ARIA_STATE_MAP_[c] || b;
    return goog.ui.ControlRenderer.isAriaState_(b) ? c : b
};
goog.ui.ControlRenderer.isAriaState_ = function(a) {
    return a == goog.a11y.aria.State.CHECKED || a == goog.a11y.aria.State.SELECTED
};
goog.ui.ControlRenderer.prototype.setContent = function(a, b) {
    var c = this.getContentElement(a);
    if (c && (goog.dom.removeChildren(c), b))
        if ("string" === typeof b) goog.dom.setTextContent(c, b);
        else {
            var d = function(a) {
                if (a) {
                    var b = goog.dom.getOwnerDocument(c);
                    c.appendChild("string" === typeof a ? b.createTextNode(a) : a)
                }
            };
            goog.isArray(b) ? goog.array.forEach(b, d) : !goog.isArrayLike(b) || "nodeType" in b ? d(b) : goog.array.forEach(goog.array.clone(b), d)
        }
};
goog.ui.ControlRenderer.prototype.getKeyEventTarget = function(a) {
    return a.getElement()
};
goog.ui.ControlRenderer.prototype.getCssClass = function() {
    return goog.ui.ControlRenderer.CSS_CLASS
};
goog.ui.ControlRenderer.prototype.getIe6ClassCombinations = function() {
    return []
};
goog.ui.ControlRenderer.prototype.getStructuralCssClass = function() {
    return this.getCssClass()
};
goog.ui.ControlRenderer.prototype.getClassNames = function(a) {
    var b = this.getCssClass(),
        c = [b],
        d = this.getStructuralCssClass();
    d != b && c.push(d);
    b = this.getClassNamesForState(a.getState());
    c.push.apply(c, b);
    (a = a.getExtraClassNames()) && c.push.apply(c, a);
    goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("7") && c.push.apply(c, this.getAppliedCombinedClassNames_(c));
    return c
};
goog.ui.ControlRenderer.prototype.getAppliedCombinedClassNames_ = function(a, b) {
    var c = [];
    b && (a = goog.array.concat(a, [b]));
    goog.array.forEach(this.getIe6ClassCombinations(), function(d) {
        !goog.array.every(d, goog.partial(goog.array.contains, a)) || b && !goog.array.contains(d, b) || c.push(d.join("_"))
    });
    return c
};
goog.ui.ControlRenderer.prototype.getClassNamesForState = function(a) {
    for (var b = []; a;) {
        var c = a & -a;
        b.push(this.getClassForState(c));
        a &= ~c
    }
    return b
};
goog.ui.ControlRenderer.prototype.getClassForState = function(a) {
    this.classByState_ || this.createClassByStateMap_();
    return this.classByState_[a]
};
goog.ui.ControlRenderer.prototype.getStateFromClass = function(a) {
    this.stateByClass_ || this.createStateByClassMap_();
    a = parseInt(this.stateByClass_[a], 10);
    return isNaN(a) ? 0 : a
};
goog.ui.ControlRenderer.prototype.createClassByStateMap_ = function() {
    var a = this.getStructuralCssClass(),
        b = !goog.string.contains(goog.string.normalizeWhitespace(a), " ");
    goog.asserts.assert(b, "ControlRenderer has an invalid css class: '" + a + "'");
    this.classByState_ = goog.object.create(goog.ui.Component.State.DISABLED, a + "-disabled", goog.ui.Component.State.HOVER, a + "-hover", goog.ui.Component.State.ACTIVE, a + "-active", goog.ui.Component.State.SELECTED, a + "-selected", goog.ui.Component.State.CHECKED, a + "-checked",
        goog.ui.Component.State.FOCUSED, a + "-focused", goog.ui.Component.State.OPENED, a + "-open")
};
goog.ui.ControlRenderer.prototype.createStateByClassMap_ = function() {
    this.classByState_ || this.createClassByStateMap_();
    this.stateByClass_ = goog.object.transpose(this.classByState_)
};
goog.ui.Control = function(a, b, c) {
    goog.ui.Component.call(this, c);
    this.renderer_ = b || goog.ui.registry.getDefaultRenderer(this.constructor);
    this.setContentInternal(void 0 !== a ? a : null);
    this.ariaLabel_ = null
};
goog.inherits(goog.ui.Control, goog.ui.Component);
goog.tagUnsealableClass(goog.ui.Control);
goog.ui.Control.registerDecorator = goog.ui.registry.setDecoratorByClassName;
goog.ui.Control.getDecorator = goog.ui.registry.getDecorator;
goog.ui.Control.prototype.content_ = null;
goog.ui.Control.prototype.state_ = 0;
goog.ui.Control.prototype.supportedStates_ = goog.ui.Component.State.DISABLED | goog.ui.Component.State.HOVER | goog.ui.Component.State.ACTIVE | goog.ui.Component.State.FOCUSED;
goog.ui.Control.prototype.autoStates_ = goog.ui.Component.State.ALL;
goog.ui.Control.prototype.statesWithTransitionEvents_ = 0;
goog.ui.Control.prototype.visible_ = !0;
goog.ui.Control.prototype.extraClassNames_ = null;
goog.ui.Control.prototype.handleMouseEvents_ = !0;
goog.ui.Control.prototype.allowTextSelection_ = !1;
goog.ui.Control.prototype.preferredAriaRole_ = null;
goog.ui.Control.prototype.isHandleMouseEvents = function() {
    return this.handleMouseEvents_
};
goog.ui.Control.prototype.setHandleMouseEvents = function(a) {
    this.isInDocument() && a != this.handleMouseEvents_ && this.enableMouseEventHandling_(a);
    this.handleMouseEvents_ = a
};
goog.ui.Control.prototype.getKeyEventTarget = function() {
    return this.renderer_.getKeyEventTarget(this)
};
goog.ui.Control.prototype.getKeyHandler = function() {
    return this.keyHandler_ || (this.keyHandler_ = new goog.events.KeyHandler)
};
goog.ui.Control.prototype.getRenderer = function() {
    return this.renderer_
};
goog.ui.Control.prototype.setRenderer = function(a) {
    if (this.isInDocument()) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    this.getElement() && this.setElementInternal(null);
    this.renderer_ = a
};
goog.ui.Control.prototype.getExtraClassNames = function() {
    return this.extraClassNames_
};
goog.ui.Control.prototype.addClassName = function(a) {
    a && (this.extraClassNames_ ? goog.array.contains(this.extraClassNames_, a) || this.extraClassNames_.push(a) : this.extraClassNames_ = [a], this.renderer_.enableExtraClassName(this, a, !0))
};
goog.ui.Control.prototype.removeClassName = function(a) {
    a && this.extraClassNames_ && goog.array.remove(this.extraClassNames_, a) && (0 == this.extraClassNames_.length && (this.extraClassNames_ = null), this.renderer_.enableExtraClassName(this, a, !1))
};
goog.ui.Control.prototype.enableClassName = function(a, b) {
    b ? this.addClassName(a) : this.removeClassName(a)
};
goog.ui.Control.prototype.createDom = function() {
    var a = this.renderer_.createDom(this);
    this.setElementInternal(a);
    this.renderer_.setAriaRole(a, this.getPreferredAriaRole());
    this.isAllowTextSelection() || this.renderer_.setAllowTextSelection(a, !1);
    this.isVisible() || this.renderer_.setVisible(a, !1)
};
goog.ui.Control.prototype.getPreferredAriaRole = function() {
    return this.preferredAriaRole_
};
goog.ui.Control.prototype.setPreferredAriaRole = function(a) {
    this.preferredAriaRole_ = a
};
goog.ui.Control.prototype.getAriaLabel = function() {
    return this.ariaLabel_
};
goog.ui.Control.prototype.setAriaLabel = function(a) {
    this.ariaLabel_ = a;
    var b = this.getElement();
    b && this.renderer_.setAriaLabel(b, a)
};
goog.ui.Control.prototype.getContentElement = function() {
    return this.renderer_.getContentElement(this.getElement())
};
goog.ui.Control.prototype.canDecorate = function(a) {
    return this.renderer_.canDecorate(a)
};
goog.ui.Control.prototype.decorateInternal = function(a) {
    a = this.renderer_.decorate(this, a);
    this.setElementInternal(a);
    this.renderer_.setAriaRole(a, this.getPreferredAriaRole());
    this.isAllowTextSelection() || this.renderer_.setAllowTextSelection(a, !1);
    this.visible_ = "none" != a.style.display
};
goog.ui.Control.prototype.enterDocument = function() {
    goog.ui.Control.superClass_.enterDocument.call(this);
    this.renderer_.setAriaStates(this, this.getElementStrict());
    this.renderer_.initializeDom(this);
    if (this.supportedStates_ & ~goog.ui.Component.State.DISABLED && (this.isHandleMouseEvents() && this.enableMouseEventHandling_(!0), this.isSupportedState(goog.ui.Component.State.FOCUSED))) {
        var a = this.getKeyEventTarget();
        if (a) {
            var b = this.getKeyHandler();
            b.attach(a);
            this.getHandler().listen(b, goog.events.KeyHandler.EventType.KEY,
                this.handleKeyEvent).listen(a, goog.events.EventType.FOCUS, this.handleFocus).listen(a, goog.events.EventType.BLUR, this.handleBlur)
        }
    }
};
goog.ui.Control.prototype.enableMouseEventHandling_ = function(a) {
    var b = goog.ui.ComponentUtil.getMouseEventType(this),
        c = this.getHandler(),
        d = this.getElement();
    a ? (c.listen(d, b.MOUSEDOWN, this.handleMouseDown).listen(d, [b.MOUSEUP, b.MOUSECANCEL], this.handleMouseUp).listen(d, goog.events.EventType.MOUSEOVER, this.handleMouseOver).listen(d, goog.events.EventType.MOUSEOUT, this.handleMouseOut), this.pointerEventsEnabled() && c.listen(d, goog.events.EventType.GOTPOINTERCAPTURE, this.preventPointerCapture_), this.handleContextMenu !=
        goog.nullFunction && c.listen(d, goog.events.EventType.CONTEXTMENU, this.handleContextMenu), goog.userAgent.IE && (goog.userAgent.isVersionOrHigher(9) || c.listen(d, goog.events.EventType.DBLCLICK, this.handleDblClick), this.ieMouseEventSequenceSimulator_ || (this.ieMouseEventSequenceSimulator_ = new goog.ui.Control.IeMouseEventSequenceSimulator_(this), this.registerDisposable(this.ieMouseEventSequenceSimulator_)))) : (c.unlisten(d, b.MOUSEDOWN, this.handleMouseDown).unlisten(d, [b.MOUSEUP, b.MOUSECANCEL], this.handleMouseUp).unlisten(d,
        goog.events.EventType.MOUSEOVER, this.handleMouseOver).unlisten(d, goog.events.EventType.MOUSEOUT, this.handleMouseOut), this.pointerEventsEnabled() && c.unlisten(d, goog.events.EventType.GOTPOINTERCAPTURE, this.preventPointerCapture_), this.handleContextMenu != goog.nullFunction && c.unlisten(d, goog.events.EventType.CONTEXTMENU, this.handleContextMenu), goog.userAgent.IE && (goog.userAgent.isVersionOrHigher(9) || c.unlisten(d, goog.events.EventType.DBLCLICK, this.handleDblClick), goog.dispose(this.ieMouseEventSequenceSimulator_),
        this.ieMouseEventSequenceSimulator_ = null))
};
goog.ui.Control.prototype.exitDocument = function() {
    goog.ui.Control.superClass_.exitDocument.call(this);
    this.keyHandler_ && this.keyHandler_.detach();
    this.isVisible() && this.isEnabled() && this.renderer_.setFocusable(this, !1)
};
goog.ui.Control.prototype.disposeInternal = function() {
    goog.ui.Control.superClass_.disposeInternal.call(this);
    this.keyHandler_ && (this.keyHandler_.dispose(), delete this.keyHandler_);
    delete this.renderer_;
    this.ieMouseEventSequenceSimulator_ = this.extraClassNames_ = this.content_ = null
};
goog.ui.Control.prototype.getContent = function() {
    return this.content_
};
goog.ui.Control.prototype.setContent = function(a) {
    this.renderer_.setContent(this.getElement(), a);
    this.setContentInternal(a)
};
goog.ui.Control.prototype.setContentInternal = function(a) {
    this.content_ = a
};
goog.ui.Control.prototype.getCaption = function() {
    var a = this.getContent();
    if (!a) return "";
    a = "string" === typeof a ? a : goog.isArray(a) ? goog.array.map(a, goog.dom.getRawTextContent).join("") : goog.dom.getTextContent(a);
    return goog.string.collapseBreakingSpaces(a)
};
goog.ui.Control.prototype.setCaption = function(a) {
    this.setContent(a)
};
goog.ui.Control.prototype.setRightToLeft = function(a) {
    goog.ui.Control.superClass_.setRightToLeft.call(this, a);
    var b = this.getElement();
    b && this.renderer_.setRightToLeft(b, a)
};
goog.ui.Control.prototype.isAllowTextSelection = function() {
    return this.allowTextSelection_
};
goog.ui.Control.prototype.setAllowTextSelection = function(a) {
    this.allowTextSelection_ = a;
    var b = this.getElement();
    b && this.renderer_.setAllowTextSelection(b, a)
};
goog.ui.Control.prototype.isVisible = function() {
    return this.visible_
};
goog.ui.Control.prototype.setVisible = function(a, b) {
    if (b || this.visible_ != a && this.dispatchEvent(a ? goog.ui.Component.EventType.SHOW : goog.ui.Component.EventType.HIDE)) {
        var c = this.getElement();
        c && this.renderer_.setVisible(c, a);
        this.isEnabled() && this.renderer_.setFocusable(this, a);
        this.visible_ = a;
        return !0
    }
    return !1
};
goog.ui.Control.prototype.isEnabled = function() {
    return !this.hasState(goog.ui.Component.State.DISABLED)
};
goog.ui.Control.prototype.isParentDisabled_ = function() {
    var a = this.getParent();
    return !!a && "function" == typeof a.isEnabled && !a.isEnabled()
};
goog.ui.Control.prototype.setEnabled = function(a) {
    !this.isParentDisabled_() && this.isTransitionAllowed(goog.ui.Component.State.DISABLED, !a) && (a || (this.setActive(!1), this.setHighlighted(!1)), this.isVisible() && this.renderer_.setFocusable(this, a), this.setState(goog.ui.Component.State.DISABLED, !a, !0))
};
goog.ui.Control.prototype.isHighlighted = function() {
    return this.hasState(goog.ui.Component.State.HOVER)
};
goog.ui.Control.prototype.setHighlighted = function(a) {
    this.isTransitionAllowed(goog.ui.Component.State.HOVER, a) && this.setState(goog.ui.Component.State.HOVER, a)
};
goog.ui.Control.prototype.isActive = function() {
    return this.hasState(goog.ui.Component.State.ACTIVE)
};
goog.ui.Control.prototype.setActive = function(a) {
    this.isTransitionAllowed(goog.ui.Component.State.ACTIVE, a) && this.setState(goog.ui.Component.State.ACTIVE, a)
};
goog.ui.Control.prototype.isSelected = function() {
    return this.hasState(goog.ui.Component.State.SELECTED)
};
goog.ui.Control.prototype.setSelected = function(a) {
    this.isTransitionAllowed(goog.ui.Component.State.SELECTED, a) && this.setState(goog.ui.Component.State.SELECTED, a)
};
goog.ui.Control.prototype.isChecked = function() {
    return this.hasState(goog.ui.Component.State.CHECKED)
};
goog.ui.Control.prototype.setChecked = function(a) {
    this.isTransitionAllowed(goog.ui.Component.State.CHECKED, a) && this.setState(goog.ui.Component.State.CHECKED, a)
};
goog.ui.Control.prototype.isFocused = function() {
    return this.hasState(goog.ui.Component.State.FOCUSED)
};
goog.ui.Control.prototype.setFocused = function(a) {
    this.isTransitionAllowed(goog.ui.Component.State.FOCUSED, a) && this.setState(goog.ui.Component.State.FOCUSED, a)
};
goog.ui.Control.prototype.isOpen = function() {
    return this.hasState(goog.ui.Component.State.OPENED)
};
goog.ui.Control.prototype.setOpen = function(a) {
    this.isTransitionAllowed(goog.ui.Component.State.OPENED, a) && this.setState(goog.ui.Component.State.OPENED, a)
};
goog.ui.Control.prototype.getState = function() {
    return this.state_
};
goog.ui.Control.prototype.hasState = function(a) {
    return !!(this.state_ & a)
};
goog.ui.Control.prototype.setState = function(a, b, c) {
    c || a != goog.ui.Component.State.DISABLED ? this.isSupportedState(a) && b != this.hasState(a) && (this.renderer_.setState(this, a, b), this.state_ = b ? this.state_ | a : this.state_ & ~a) : this.setEnabled(!b)
};
goog.ui.Control.prototype.setStateInternal = function(a) {
    this.state_ = a
};
goog.ui.Control.prototype.isSupportedState = function(a) {
    return !!(this.supportedStates_ & a)
};
goog.ui.Control.prototype.setSupportedState = function(a, b) {
    if (this.isInDocument() && this.hasState(a) && !b) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    !b && this.hasState(a) && this.setState(a, !1);
    this.supportedStates_ = b ? this.supportedStates_ | a : this.supportedStates_ & ~a
};
goog.ui.Control.prototype.isAutoState = function(a) {
    return !!(this.autoStates_ & a) && this.isSupportedState(a)
};
goog.ui.Control.prototype.setAutoStates = function(a, b) {
    this.autoStates_ = b ? this.autoStates_ | a : this.autoStates_ & ~a
};
goog.ui.Control.prototype.isDispatchTransitionEvents = function(a) {
    return !!(this.statesWithTransitionEvents_ & a) && this.isSupportedState(a)
};
goog.ui.Control.prototype.setDispatchTransitionEvents = function(a, b) {
    this.statesWithTransitionEvents_ = b ? this.statesWithTransitionEvents_ | a : this.statesWithTransitionEvents_ & ~a
};
goog.ui.Control.prototype.isTransitionAllowed = function(a, b) {
    return this.isSupportedState(a) && this.hasState(a) != b && (!(this.statesWithTransitionEvents_ & a) || this.dispatchEvent(goog.ui.Component.getStateTransitionEvent(a, b))) && !this.isDisposed()
};
goog.ui.Control.prototype.handleMouseOver = function(a) {
    !goog.ui.Control.isMouseEventWithinElement_(a, this.getElement()) && this.dispatchEvent(goog.ui.Component.EventType.ENTER) && this.isEnabled() && this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(!0)
};
goog.ui.Control.prototype.handleMouseOut = function(a) {
    !goog.ui.Control.isMouseEventWithinElement_(a, this.getElement()) && this.dispatchEvent(goog.ui.Component.EventType.LEAVE) && (this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(!1), this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(!1))
};
goog.ui.Control.prototype.preventPointerCapture_ = function(a) {
    var b = a.target;
    b.releasePointerCapture && b.releasePointerCapture(a.pointerId)
};
goog.ui.Control.prototype.handleContextMenu = goog.nullFunction;
goog.ui.Control.isMouseEventWithinElement_ = function(a, b) {
    return !!a.relatedTarget && goog.dom.contains(b, a.relatedTarget)
};
goog.ui.Control.prototype.handleMouseDown = function(a) {
    this.isEnabled() && (this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(!0), a.isMouseActionButton() && (this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(!0), this.renderer_ && this.renderer_.isFocusable(this) && this.getKeyEventTarget().focus()));
    !this.isAllowTextSelection() && a.isMouseActionButton() && a.preventDefault()
};
goog.ui.Control.prototype.handleMouseUp = function(a) {
    this.isEnabled() && (this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(!0), this.isActive() && this.performActionInternal(a) && this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(!1))
};
goog.ui.Control.prototype.handleDblClick = function(a) {
    this.isEnabled() && this.performActionInternal(a)
};
goog.ui.Control.prototype.performActionInternal = function(a) {
    this.isAutoState(goog.ui.Component.State.CHECKED) && this.setChecked(!this.isChecked());
    this.isAutoState(goog.ui.Component.State.SELECTED) && this.setSelected(!0);
    this.isAutoState(goog.ui.Component.State.OPENED) && this.setOpen(!this.isOpen());
    var b = new goog.events.Event(goog.ui.Component.EventType.ACTION, this);
    a && (b.altKey = a.altKey, b.ctrlKey = a.ctrlKey, b.metaKey = a.metaKey, b.shiftKey = a.shiftKey, b.platformModifierKey = a.platformModifierKey);
    return this.dispatchEvent(b)
};
goog.ui.Control.prototype.handleFocus = function(a) {
    this.isAutoState(goog.ui.Component.State.FOCUSED) && this.setFocused(!0)
};
goog.ui.Control.prototype.handleBlur = function(a) {
    this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(!1);
    this.isAutoState(goog.ui.Component.State.FOCUSED) && this.setFocused(!1)
};
goog.ui.Control.prototype.handleKeyEvent = function(a) {
    return this.isVisible() && this.isEnabled() && this.handleKeyEventInternal(a) ? (a.preventDefault(), a.stopPropagation(), !0) : !1
};
goog.ui.Control.prototype.handleKeyEventInternal = function(a) {
    return a.keyCode == goog.events.KeyCodes.ENTER && this.performActionInternal(a)
};
goog.ui.registry.setDefaultRenderer(goog.ui.Control, goog.ui.ControlRenderer);
goog.ui.registry.setDecoratorByClassName(goog.ui.ControlRenderer.CSS_CLASS, function() {
    return new goog.ui.Control(null)
});
goog.ui.Control.IeMouseEventSequenceSimulator_ = function(a) {
    goog.Disposable.call(this);
    this.control_ = a;
    this.clickExpected_ = !1;
    this.handler_ = new goog.events.EventHandler(this);
    this.registerDisposable(this.handler_);
    var b = this.control_.getElementStrict();
    a = goog.ui.ComponentUtil.getMouseEventType(a);
    this.handler_.listen(b, a.MOUSEDOWN, this.handleMouseDown_).listen(b, a.MOUSEUP, this.handleMouseUp_).listen(b, goog.events.EventType.CLICK, this.handleClick_)
};
goog.inherits(goog.ui.Control.IeMouseEventSequenceSimulator_, goog.Disposable);
goog.ui.Control.IeMouseEventSequenceSimulator_.SYNTHETIC_EVENTS_ = !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9);
goog.ui.Control.IeMouseEventSequenceSimulator_.prototype.handleMouseDown_ = function() {
    this.clickExpected_ = !1
};
goog.ui.Control.IeMouseEventSequenceSimulator_.prototype.handleMouseUp_ = function() {
    this.clickExpected_ = !0
};
goog.ui.Control.IeMouseEventSequenceSimulator_.makeLeftMouseEvent_ = function(a, b) {
    if (!goog.ui.Control.IeMouseEventSequenceSimulator_.SYNTHETIC_EVENTS_) return a.button = goog.events.BrowserEvent.MouseButton.LEFT, a.type = b, a;
    var c = document.createEvent("MouseEvents");
    c.initMouseEvent(b, a.bubbles, a.cancelable, a.view || null, a.detail, a.screenX, a.screenY, a.clientX, a.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, goog.events.BrowserEvent.MouseButton.LEFT, a.relatedTarget || null);
    return c
};
goog.ui.Control.IeMouseEventSequenceSimulator_.prototype.handleClick_ = function(a) {
    if (this.clickExpected_) this.clickExpected_ = !1;
    else {
        var b = a.getBrowserEvent(),
            c = b.button,
            d = b.type,
            e = goog.ui.Control.IeMouseEventSequenceSimulator_.makeLeftMouseEvent_(b, goog.events.EventType.MOUSEDOWN);
        this.control_.handleMouseDown(new goog.events.BrowserEvent(e, a.currentTarget));
        e = goog.ui.Control.IeMouseEventSequenceSimulator_.makeLeftMouseEvent_(b, goog.events.EventType.MOUSEUP);
        this.control_.handleMouseUp(new goog.events.BrowserEvent(e,
            a.currentTarget));
        goog.ui.Control.IeMouseEventSequenceSimulator_.SYNTHETIC_EVENTS_ || (b.button = c, b.type = d)
    }
};
goog.ui.Control.IeMouseEventSequenceSimulator_.prototype.disposeInternal = function() {
    this.control_ = null;
    goog.ui.Control.IeMouseEventSequenceSimulator_.superClass_.disposeInternal.call(this)
};
goog.ui.Container = function(a, b, c) {
    goog.ui.Component.call(this, c);
    this.renderer_ = b || goog.ui.ContainerRenderer.getInstance();
    this.orientation_ = a || this.renderer_.getDefaultOrientation()
};
goog.inherits(goog.ui.Container, goog.ui.Component);
goog.tagUnsealableClass(goog.ui.Container);
goog.ui.Container.EventType = {
    AFTER_SHOW: "aftershow",
    AFTER_HIDE: "afterhide"
};
goog.ui.Container.Orientation = {
    HORIZONTAL: "horizontal",
    VERTICAL: "vertical"
};
goog.ui.Container.prototype.keyEventTarget_ = null;
goog.ui.Container.prototype.keyHandler_ = null;
goog.ui.Container.prototype.renderer_ = null;
goog.ui.Container.prototype.orientation_ = null;
goog.ui.Container.prototype.visible_ = !0;
goog.ui.Container.prototype.enabled_ = !0;
goog.ui.Container.prototype.focusable_ = !0;
goog.ui.Container.prototype.highlightedIndex_ = -1;
goog.ui.Container.prototype.openItem_ = null;
goog.ui.Container.prototype.mouseButtonPressed_ = !1;
goog.ui.Container.prototype.allowFocusableChildren_ = !1;
goog.ui.Container.prototype.openFollowsHighlight_ = !0;
goog.ui.Container.prototype.childElementIdMap_ = null;
goog.ui.Container.prototype.getKeyEventTarget = function() {
    return this.keyEventTarget_ || this.renderer_.getKeyEventTarget(this)
};
goog.ui.Container.prototype.setKeyEventTarget = function(a) {
    if (this.focusable_) {
        var b = this.getKeyEventTarget(),
            c = this.isInDocument();
        this.keyEventTarget_ = a;
        var d = this.getKeyEventTarget();
        c && (this.keyEventTarget_ = b, this.enableFocusHandling_(!1), this.keyEventTarget_ = a, this.getKeyHandler().attach(d), this.enableFocusHandling_(!0))
    } else throw Error("Can't set key event target for container that doesn't support keyboard focus!");
};
goog.ui.Container.prototype.getKeyHandler = function() {
    return this.keyHandler_ || (this.keyHandler_ = new goog.events.KeyHandler(this.getKeyEventTarget()))
};
goog.ui.Container.prototype.getRenderer = function() {
    return this.renderer_
};
goog.ui.Container.prototype.setRenderer = function(a) {
    if (this.getElement()) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    this.renderer_ = a
};
goog.ui.Container.prototype.createDom = function() {
    this.setElementInternal(this.renderer_.createDom(this))
};
goog.ui.Container.prototype.getContentElement = function() {
    return this.renderer_.getContentElement(this.getElement())
};
goog.ui.Container.prototype.canDecorate = function(a) {
    return this.renderer_.canDecorate(a)
};
goog.ui.Container.prototype.decorateInternal = function(a) {
    this.setElementInternal(this.renderer_.decorate(this, a));
    "none" == a.style.display && (this.visible_ = !1)
};
goog.ui.Container.prototype.enterDocument = function() {
    goog.ui.Container.superClass_.enterDocument.call(this);
    this.forEachChild(function(a) {
        a.isInDocument() && this.registerChildId_(a)
    }, this);
    var a = this.getElement();
    this.renderer_.initializeDom(this);
    this.setVisible(this.visible_, !0);
    var b = goog.ui.ComponentUtil.getMouseEventType(this);
    this.getHandler().listen(this, goog.ui.Component.EventType.ENTER, this.handleEnterItem).listen(this, goog.ui.Component.EventType.HIGHLIGHT, this.handleHighlightItem).listen(this,
        goog.ui.Component.EventType.UNHIGHLIGHT, this.handleUnHighlightItem).listen(this, goog.ui.Component.EventType.OPEN, this.handleOpenItem).listen(this, goog.ui.Component.EventType.CLOSE, this.handleCloseItem).listen(a, b.MOUSEDOWN, this.handleMouseDown).listen(goog.dom.getOwnerDocument(a), [b.MOUSEUP, b.MOUSECANCEL], this.handleDocumentMouseUp).listen(a, [b.MOUSEDOWN, b.MOUSEUP, b.MOUSECANCEL, goog.events.EventType.MOUSEOVER, goog.events.EventType.MOUSEOUT, goog.events.EventType.CONTEXTMENU], this.handleChildMouseEvents);
    this.pointerEventsEnabled() && this.getHandler().listen(a, goog.events.EventType.GOTPOINTERCAPTURE, this.preventPointerCapture_);
    this.isFocusable() && this.enableFocusHandling_(!0)
};
goog.ui.Container.prototype.preventPointerCapture_ = function(a) {
    var b = a.target;
    b.releasePointerCapture && b.releasePointerCapture(a.pointerId)
};
goog.ui.Container.prototype.enableFocusHandling_ = function(a) {
    var b = this.getHandler(),
        c = this.getKeyEventTarget();
    a ? b.listen(c, goog.events.EventType.FOCUS, this.handleFocus).listen(c, goog.events.EventType.BLUR, this.handleBlur).listen(this.getKeyHandler(), goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent) : b.unlisten(c, goog.events.EventType.FOCUS, this.handleFocus).unlisten(c, goog.events.EventType.BLUR, this.handleBlur).unlisten(this.getKeyHandler(), goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent)
};
goog.ui.Container.prototype.exitDocument = function() {
    this.setHighlightedIndex(-1);
    this.openItem_ && this.openItem_.setOpen(!1);
    this.mouseButtonPressed_ = !1;
    goog.ui.Container.superClass_.exitDocument.call(this)
};
goog.ui.Container.prototype.disposeInternal = function() {
    goog.ui.Container.superClass_.disposeInternal.call(this);
    this.keyHandler_ && (this.keyHandler_.dispose(), this.keyHandler_ = null);
    this.renderer_ = this.openItem_ = this.childElementIdMap_ = this.keyEventTarget_ = null
};
goog.ui.Container.prototype.handleEnterItem = function(a) {
    return !0
};
goog.ui.Container.prototype.handleHighlightItem = function(a) {
    var b = this.indexOfChild(a.target);
    if (-1 < b && b != this.highlightedIndex_) {
        var c = this.getHighlighted();
        c && c.setHighlighted(!1);
        this.highlightedIndex_ = b;
        c = this.getHighlighted();
        this.isMouseButtonPressed() && c.setActive(!0);
        this.openFollowsHighlight_ && this.openItem_ && c != this.openItem_ && (c.isSupportedState(goog.ui.Component.State.OPENED) ? c.setOpen(!0) : this.openItem_.setOpen(!1))
    }
    b = this.getElement();
    goog.asserts.assert(b, "The DOM element for the container cannot be null.");
    null != a.target.getElement() && goog.a11y.aria.setState(b, goog.a11y.aria.State.ACTIVEDESCENDANT, a.target.getElement().id)
};
goog.ui.Container.prototype.handleUnHighlightItem = function(a) {
    a.target == this.getHighlighted() && (this.highlightedIndex_ = -1);
    a = this.getElement();
    goog.asserts.assert(a, "The DOM element for the container cannot be null.");
    goog.a11y.aria.removeState(a, goog.a11y.aria.State.ACTIVEDESCENDANT)
};
goog.ui.Container.prototype.handleOpenItem = function(a) {
    (a = a.target) && a != this.openItem_ && a.getParent() == this && (this.openItem_ && this.openItem_.setOpen(!1), this.openItem_ = a)
};
goog.ui.Container.prototype.handleCloseItem = function(a) {
    a.target == this.openItem_ && (this.openItem_ = null);
    var b = this.getElement(),
        c = a.target.getElement();
    b && a.target.isHighlighted() && c && goog.a11y.aria.setActiveDescendant(b, c)
};
goog.ui.Container.prototype.handleMouseDown = function(a) {
    this.enabled_ && this.setMouseButtonPressed(!0);
    var b = this.getKeyEventTarget();
    b && goog.dom.isFocusableTabIndex(b) ? b.focus() : a.preventDefault()
};
goog.ui.Container.prototype.handleDocumentMouseUp = function(a) {
    this.setMouseButtonPressed(!1)
};
goog.ui.Container.prototype.handleChildMouseEvents = function(a) {
    var b = goog.ui.ComponentUtil.getMouseEventType(this),
        c = this.getOwnerControl(a.target);
    if (c) switch (a.type) {
        case b.MOUSEDOWN:
            c.handleMouseDown(a);
            break;
        case b.MOUSEUP:
        case b.MOUSECANCEL:
            c.handleMouseUp(a);
            break;
        case goog.events.EventType.MOUSEOVER:
            c.handleMouseOver(a);
            break;
        case goog.events.EventType.MOUSEOUT:
            c.handleMouseOut(a);
            break;
        case goog.events.EventType.CONTEXTMENU:
            c.handleContextMenu(a)
    }
};
goog.ui.Container.prototype.getOwnerControl = function(a) {
    if (this.childElementIdMap_)
        for (var b = this.getElement(); a && a !== b;) {
            var c = a.id;
            if (c in this.childElementIdMap_) return this.childElementIdMap_[c];
            a = a.parentNode
        }
    return null
};
goog.ui.Container.prototype.handleFocus = function(a) {};
goog.ui.Container.prototype.handleBlur = function(a) {
    this.setHighlightedIndex(-1);
    this.setMouseButtonPressed(!1);
    this.openItem_ && this.openItem_.setOpen(!1)
};
goog.ui.Container.prototype.handleKeyEvent = function(a) {
    return this.isEnabled() && this.isVisible() && (0 != this.getChildCount() || this.keyEventTarget_) && this.handleKeyEventInternal(a) ? (a.preventDefault(), a.stopPropagation(), !0) : !1
};
goog.ui.Container.prototype.handleKeyEventInternal = function(a) {
    var b = this.getHighlighted();
    if (b && "function" == typeof b.handleKeyEvent && b.handleKeyEvent(a) || this.openItem_ && this.openItem_ != b && "function" == typeof this.openItem_.handleKeyEvent && this.openItem_.handleKeyEvent(a)) return !0;
    if (a.shiftKey || a.ctrlKey || a.metaKey || a.altKey) return !1;
    switch (a.keyCode) {
        case goog.events.KeyCodes.ESC:
            if (this.isFocusable()) this.getKeyEventTarget().blur();
            else return !1;
            break;
        case goog.events.KeyCodes.HOME:
            this.highlightFirst();
            break;
        case goog.events.KeyCodes.END:
            this.highlightLast();
            break;
        case goog.events.KeyCodes.UP:
            if (this.orientation_ == goog.ui.Container.Orientation.VERTICAL) this.highlightPrevious();
            else return !1;
            break;
        case goog.events.KeyCodes.LEFT:
            if (this.orientation_ == goog.ui.Container.Orientation.HORIZONTAL) this.isRightToLeft() ? this.highlightNext() : this.highlightPrevious();
            else return !1;
            break;
        case goog.events.KeyCodes.DOWN:
            if (this.orientation_ == goog.ui.Container.Orientation.VERTICAL) this.highlightNext();
            else return !1;
            break;
        case goog.events.KeyCodes.RIGHT:
            if (this.orientation_ == goog.ui.Container.Orientation.HORIZONTAL) this.isRightToLeft() ? this.highlightPrevious() : this.highlightNext();
            else return !1;
            break;
        default:
            return !1
    }
    return !0
};
goog.ui.Container.prototype.registerChildId_ = function(a) {
    var b = a.getElement();
    b = b.id || (b.id = a.getId());
    this.childElementIdMap_ || (this.childElementIdMap_ = {});
    this.childElementIdMap_[b] = a
};
goog.ui.Container.prototype.addChild = function(a, b) {
    goog.asserts.assertInstanceof(a, goog.ui.Control, "The child of a container must be a control");
    goog.ui.Container.superClass_.addChild.call(this, a, b)
};
goog.ui.Container.prototype.addChildAt = function(a, b, c) {
    goog.asserts.assertInstanceof(a, goog.ui.Control);
    a.setDispatchTransitionEvents(goog.ui.Component.State.HOVER, !0);
    a.setDispatchTransitionEvents(goog.ui.Component.State.OPENED, !0);
    !this.isFocusable() && this.isFocusableChildrenAllowed() || a.setSupportedState(goog.ui.Component.State.FOCUSED, !1);
    a.setHandleMouseEvents(!1);
    var d = a.getParent() == this ? this.indexOfChild(a) : -1;
    goog.ui.Container.superClass_.addChildAt.call(this, a, b, c);
    a.isInDocument() && this.isInDocument() &&
        this.registerChildId_(a);
    this.updateHighlightedIndex_(d, b)
};
goog.ui.Container.prototype.updateHighlightedIndex_ = function(a, b) {
    -1 == a && (a = this.getChildCount());
    a == this.highlightedIndex_ ? this.highlightedIndex_ = Math.min(this.getChildCount() - 1, b) : a > this.highlightedIndex_ && b <= this.highlightedIndex_ ? this.highlightedIndex_++ : a < this.highlightedIndex_ && b > this.highlightedIndex_ && this.highlightedIndex_--
};
goog.ui.Container.prototype.removeChild = function(a, b) {
    a = "string" === typeof a ? this.getChild(a) : a;
    goog.asserts.assertInstanceof(a, goog.ui.Control);
    if (a) {
        var c = this.indexOfChild(a); - 1 != c && (c == this.highlightedIndex_ ? (a.setHighlighted(!1), this.highlightedIndex_ = -1) : c < this.highlightedIndex_ && this.highlightedIndex_--);
        (c = a.getElement()) && c.id && this.childElementIdMap_ && goog.object.remove(this.childElementIdMap_, c.id)
    }
    a = goog.ui.Container.superClass_.removeChild.call(this, a, b);
    a.setHandleMouseEvents(!0);
    return a
};
goog.ui.Container.prototype.getOrientation = function() {
    return this.orientation_
};
goog.ui.Container.prototype.setOrientation = function(a) {
    if (this.getElement()) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    this.orientation_ = a
};
goog.ui.Container.prototype.isVisible = function() {
    return this.visible_
};
goog.ui.Container.prototype.setVisible = function(a, b) {
    if (b || this.visible_ != a && this.dispatchEvent(a ? goog.ui.Component.EventType.SHOW : goog.ui.Component.EventType.HIDE)) {
        this.visible_ = a;
        var c = this.getElement();
        c && (goog.style.setElementShown(c, a), this.isFocusable() && this.renderer_.enableTabIndex(this.getKeyEventTarget(), this.enabled_ && this.visible_), b || this.dispatchEvent(this.visible_ ? goog.ui.Container.EventType.AFTER_SHOW : goog.ui.Container.EventType.AFTER_HIDE));
        return !0
    }
    return !1
};
goog.ui.Container.prototype.isEnabled = function() {
    return this.enabled_
};
goog.ui.Container.prototype.setEnabled = function(a) {
    this.enabled_ != a && this.dispatchEvent(a ? goog.ui.Component.EventType.ENABLE : goog.ui.Component.EventType.DISABLE) && (a ? (this.enabled_ = !0, this.forEachChild(function(a) {
        a.wasDisabled ? delete a.wasDisabled : a.setEnabled(!0)
    })) : (this.forEachChild(function(a) {
        a.isEnabled() ? a.setEnabled(!1) : a.wasDisabled = !0
    }), this.enabled_ = !1, this.setMouseButtonPressed(!1)), this.isFocusable() && this.renderer_.enableTabIndex(this.getKeyEventTarget(), a && this.visible_))
};
goog.ui.Container.prototype.isFocusable = function() {
    return this.focusable_
};
goog.ui.Container.prototype.setFocusable = function(a) {
    a != this.focusable_ && this.isInDocument() && this.enableFocusHandling_(a);
    this.focusable_ = a;
    this.enabled_ && this.visible_ && this.renderer_.enableTabIndex(this.getKeyEventTarget(), a)
};
goog.ui.Container.prototype.isFocusableChildrenAllowed = function() {
    return this.allowFocusableChildren_
};
goog.ui.Container.prototype.setFocusableChildrenAllowed = function(a) {
    this.allowFocusableChildren_ = a
};
goog.ui.Container.prototype.isOpenFollowsHighlight = function() {
    return this.openFollowsHighlight_
};
goog.ui.Container.prototype.setOpenFollowsHighlight = function(a) {
    this.openFollowsHighlight_ = a
};
goog.ui.Container.prototype.getHighlightedIndex = function() {
    return this.highlightedIndex_
};
goog.ui.Container.prototype.setHighlightedIndex = function(a) {
    (a = this.getChildAt(a)) ? a.setHighlighted(!0): -1 < this.highlightedIndex_ && this.getHighlighted().setHighlighted(!1)
};
goog.ui.Container.prototype.setHighlighted = function(a) {
    this.setHighlightedIndex(this.indexOfChild(a))
};
goog.ui.Container.prototype.getHighlighted = function() {
    return this.getChildAt(this.highlightedIndex_)
};
goog.ui.Container.prototype.highlightFirst = function() {
    this.highlightHelper(function(a, b) {
        return (a + 1) % b
    }, this.getChildCount() - 1)
};
goog.ui.Container.prototype.highlightLast = function() {
    this.highlightHelper(function(a, b) {
        a--;
        return 0 > a ? b - 1 : a
    }, 0)
};
goog.ui.Container.prototype.highlightNext = function() {
    this.highlightHelper(function(a, b) {
        return (a + 1) % b
    }, this.highlightedIndex_)
};
goog.ui.Container.prototype.highlightPrevious = function() {
    this.highlightHelper(function(a, b) {
        a--;
        return 0 > a ? b - 1 : a
    }, this.highlightedIndex_)
};
goog.ui.Container.prototype.highlightHelper = function(a, b) {
    var c = 0 > b ? this.indexOfChild(this.openItem_) : b,
        d = this.getChildCount();
    c = a.call(this, c, d);
    for (var e = 0; e <= d;) {
        var f = this.getChildAt(c);
        if (f && this.canHighlightItem(f)) return this.setHighlightedIndexFromKeyEvent(c), !0;
        e++;
        c = a.call(this, c, d)
    }
    return !1
};
goog.ui.Container.prototype.canHighlightItem = function(a) {
    return a.isVisible() && a.isEnabled() && a.isSupportedState(goog.ui.Component.State.HOVER)
};
goog.ui.Container.prototype.setHighlightedIndexFromKeyEvent = function(a) {
    this.setHighlightedIndex(a)
};
goog.ui.Container.prototype.getOpenItem = function() {
    return this.openItem_
};
goog.ui.Container.prototype.isMouseButtonPressed = function() {
    return this.mouseButtonPressed_
};
goog.ui.Container.prototype.setMouseButtonPressed = function(a) {
    this.mouseButtonPressed_ = a
};
goog.ui.MenuHeaderRenderer = function() {
    goog.ui.ControlRenderer.call(this)
};
goog.inherits(goog.ui.MenuHeaderRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(goog.ui.MenuHeaderRenderer);
goog.ui.MenuHeaderRenderer.CSS_CLASS = "goog-menuheader";
goog.ui.MenuHeaderRenderer.prototype.getCssClass = function() {
    return goog.ui.MenuHeaderRenderer.CSS_CLASS
};
goog.ui.MenuHeader = function(a, b, c) {
    goog.ui.Control.call(this, a, c || goog.ui.MenuHeaderRenderer.getInstance(), b);
    this.setSupportedState(goog.ui.Component.State.DISABLED, !1);
    this.setSupportedState(goog.ui.Component.State.HOVER, !1);
    this.setSupportedState(goog.ui.Component.State.ACTIVE, !1);
    this.setSupportedState(goog.ui.Component.State.FOCUSED, !1);
    this.setStateInternal(goog.ui.Component.State.DISABLED)
};
goog.inherits(goog.ui.MenuHeader, goog.ui.Control);
goog.ui.registry.setDecoratorByClassName(goog.ui.MenuHeaderRenderer.CSS_CLASS, function() {
    return new goog.ui.MenuHeader(null)
});
goog.ui.MenuItemRenderer = function() {
    goog.ui.ControlRenderer.call(this);
    this.classNameCache_ = []
};
goog.inherits(goog.ui.MenuItemRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(goog.ui.MenuItemRenderer);
goog.ui.MenuItemRenderer.CSS_CLASS = "goog-menuitem";
goog.ui.MenuItemRenderer.CompositeCssClassIndex_ = {
    HOVER: 0,
    CHECKBOX: 1,
    CONTENT: 2
};
goog.ui.MenuItemRenderer.prototype.getCompositeCssClass_ = function(a) {
    var b = this.classNameCache_[a];
    if (!b) {
        switch (a) {
            case goog.ui.MenuItemRenderer.CompositeCssClassIndex_.HOVER:
                b = this.getStructuralCssClass() + "-highlight";
                break;
            case goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CHECKBOX:
                b = this.getStructuralCssClass() + "-checkbox";
                break;
            case goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CONTENT:
                b = this.getStructuralCssClass() + "-content"
        }
        this.classNameCache_[a] = b
    }
    return b
};
goog.ui.MenuItemRenderer.prototype.getAriaRole = function() {
    return goog.a11y.aria.Role.MENU_ITEM
};
goog.ui.MenuItemRenderer.prototype.createDom = function(a) {
    var b = a.getDomHelper().createDom("DIV", this.getClassNames(a).join(" "), this.createContent(a.getContent(), a.getDomHelper()));
    this.setEnableCheckBoxStructure(a, b, a.isSupportedState(goog.ui.Component.State.SELECTED) || a.isSupportedState(goog.ui.Component.State.CHECKED));
    return b
};
goog.ui.MenuItemRenderer.prototype.getContentElement = function(a) {
    return a && a.firstChild
};
goog.ui.MenuItemRenderer.prototype.decorate = function(a, b) {
    goog.asserts.assert(b);
    this.hasContentStructure(b) || b.appendChild(this.createContent(b.childNodes, a.getDomHelper()));
    goog.dom.classlist.contains(b, "goog-option") && (a.setCheckable(!0), this.setCheckable(a, b, !0));
    return goog.ui.MenuItemRenderer.superClass_.decorate.call(this, a, b)
};
goog.ui.MenuItemRenderer.prototype.setContent = function(a, b) {
    var c = this.getContentElement(a),
        d = this.hasCheckBoxStructure(a) ? c.firstChild : null;
    goog.ui.MenuItemRenderer.superClass_.setContent.call(this, a, b);
    d && !this.hasCheckBoxStructure(a) && c.insertBefore(d, c.firstChild || null)
};
goog.ui.MenuItemRenderer.prototype.hasContentStructure = function(a) {
    a = goog.dom.getFirstElementChild(a);
    var b = this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CONTENT);
    return !!a && goog.dom.classlist.contains(a, b)
};
goog.ui.MenuItemRenderer.prototype.createContent = function(a, b) {
    var c = this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CONTENT);
    return b.createDom("DIV", c, a)
};
goog.ui.MenuItemRenderer.prototype.setSelectable = function(a, b, c) {
    a && b && this.setEnableCheckBoxStructure(a, b, c)
};
goog.ui.MenuItemRenderer.prototype.setCheckable = function(a, b, c) {
    a && b && this.setEnableCheckBoxStructure(a, b, c)
};
goog.ui.MenuItemRenderer.prototype.hasCheckBoxStructure = function(a) {
    if (a = this.getContentElement(a)) {
        a = a.firstChild;
        var b = this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CHECKBOX);
        return !!a && goog.dom.isElement(a) && goog.dom.classlist.contains(a, b)
    }
    return !1
};
goog.ui.MenuItemRenderer.prototype.setEnableCheckBoxStructure = function(a, b, c) {
    this.setAriaRole(b, a.getPreferredAriaRole());
    this.setAriaStates(a, b);
    c != this.hasCheckBoxStructure(b) && (goog.dom.classlist.enable(b, "goog-option", c), b = this.getContentElement(b), c ? (c = this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CHECKBOX), b.insertBefore(a.getDomHelper().createDom("DIV", c), b.firstChild || null)) : b.removeChild(b.firstChild))
};
goog.ui.MenuItemRenderer.prototype.getClassForState = function(a) {
    switch (a) {
        case goog.ui.Component.State.HOVER:
            return this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.HOVER);
        case goog.ui.Component.State.CHECKED:
        case goog.ui.Component.State.SELECTED:
            return "goog-option-selected";
        default:
            return goog.ui.MenuItemRenderer.superClass_.getClassForState.call(this, a)
    }
};
goog.ui.MenuItemRenderer.prototype.getStateFromClass = function(a) {
    var b = this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.HOVER);
    switch (a) {
        case "goog-option-selected":
            return goog.ui.Component.State.CHECKED;
        case b:
            return goog.ui.Component.State.HOVER;
        default:
            return goog.ui.MenuItemRenderer.superClass_.getStateFromClass.call(this, a)
    }
};
goog.ui.MenuItemRenderer.prototype.getCssClass = function() {
    return goog.ui.MenuItemRenderer.CSS_CLASS
};
goog.ui.MenuItem = function(a, b, c, d) {
    goog.ui.Control.call(this, a, d || goog.ui.MenuItemRenderer.getInstance(), c);
    this.setValue(b)
};
goog.inherits(goog.ui.MenuItem, goog.ui.Control);
goog.tagUnsealableClass(goog.ui.MenuItem);
goog.ui.MenuItem.MNEMONIC_WRAPPER_CLASS_ = "goog-menuitem-mnemonic-separator";
goog.ui.MenuItem.ACCELERATOR_CLASS = "goog-menuitem-accel";
goog.ui.MenuItem.prototype.getValue = function() {
    var a = this.getModel();
    return null != a ? a : this.getCaption()
};
goog.ui.MenuItem.prototype.setValue = function(a) {
    this.setModel(a)
};
goog.ui.MenuItem.prototype.setSupportedState = function(a, b) {
    goog.ui.MenuItem.superClass_.setSupportedState.call(this, a, b);
    switch (a) {
        case goog.ui.Component.State.SELECTED:
            this.setSelectableInternal_(b);
            break;
        case goog.ui.Component.State.CHECKED:
            this.setCheckableInternal_(b)
    }
};
goog.ui.MenuItem.prototype.setSelectable = function(a) {
    this.setSupportedState(goog.ui.Component.State.SELECTED, a)
};
goog.ui.MenuItem.prototype.setSelectableInternal_ = function(a) {
    this.isChecked() && !a && this.setChecked(!1);
    var b = this.getElement();
    b && this.getRenderer().setSelectable(this, b, a)
};
goog.ui.MenuItem.prototype.setCheckable = function(a) {
    this.setSupportedState(goog.ui.Component.State.CHECKED, a)
};
goog.ui.MenuItem.prototype.setCheckableInternal_ = function(a) {
    var b = this.getElement();
    b && this.getRenderer().setCheckable(this, b, a)
};
goog.ui.MenuItem.prototype.getCaption = function() {
    var a = this.getContent();
    if (goog.isArray(a)) {
        var b = goog.ui.MenuItem.ACCELERATOR_CLASS,
            c = goog.ui.MenuItem.MNEMONIC_WRAPPER_CLASS_;
        a = goog.array.map(a, function(a) {
            return goog.dom.isElement(a) && (goog.dom.classlist.contains(a, b) || goog.dom.classlist.contains(a, c)) ? "" : goog.dom.getRawTextContent(a)
        }).join("");
        return goog.string.collapseBreakingSpaces(a)
    }
    return goog.ui.MenuItem.superClass_.getCaption.call(this)
};
goog.ui.MenuItem.prototype.getAccelerator = function() {
    var a = this.getDomHelper(),
        b = this.getContent();
    return goog.isArray(b) && (b = goog.array.find(b, function(a) {
        return goog.dom.classlist.contains(a, goog.ui.MenuItem.ACCELERATOR_CLASS)
    })) ? a.getTextContent(b) : null
};
goog.ui.MenuItem.prototype.handleMouseUp = function(a) {
    var b = this.getParent();
    if (b) {
        var c = b.openingCoords;
        b.openingCoords = null;
        if (c && "number" === typeof a.clientX && (b = new goog.math.Coordinate(a.clientX, a.clientY), goog.math.Coordinate.equals(c, b))) return
    }
    goog.ui.MenuItem.superClass_.handleMouseUp.call(this, a)
};
goog.ui.MenuItem.prototype.handleKeyEventInternal = function(a) {
    return a.keyCode == this.getMnemonic() && this.performActionInternal(a) ? !0 : goog.ui.MenuItem.superClass_.handleKeyEventInternal.call(this, a)
};
goog.ui.MenuItem.prototype.setMnemonic = function(a) {
    this.mnemonicKey_ = a
};
goog.ui.MenuItem.prototype.getMnemonic = function() {
    return this.mnemonicKey_
};
goog.ui.registry.setDecoratorByClassName(goog.ui.MenuItemRenderer.CSS_CLASS, function() {
    return new goog.ui.MenuItem(null)
});
goog.ui.MenuItem.prototype.getPreferredAriaRole = function() {
    return this.isSupportedState(goog.ui.Component.State.CHECKED) ? goog.a11y.aria.Role.MENU_ITEM_CHECKBOX : this.isSupportedState(goog.ui.Component.State.SELECTED) ? goog.a11y.aria.Role.MENU_ITEM_RADIO : goog.ui.MenuItem.superClass_.getPreferredAriaRole.call(this)
};
goog.ui.MenuItem.prototype.getParent = function() {
    return goog.ui.Control.prototype.getParent.call(this)
};
goog.ui.MenuItem.prototype.getParentEventTarget = function() {
    return goog.ui.Control.prototype.getParentEventTarget.call(this)
};
goog.ui.MenuSeparatorRenderer = function() {
    goog.ui.ControlRenderer.call(this)
};
goog.inherits(goog.ui.MenuSeparatorRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(goog.ui.MenuSeparatorRenderer);
goog.ui.MenuSeparatorRenderer.CSS_CLASS = "goog-menuseparator";
goog.ui.MenuSeparatorRenderer.prototype.createDom = function(a) {
    return a.getDomHelper().createDom("DIV", this.getCssClass())
};
goog.ui.MenuSeparatorRenderer.prototype.decorate = function(a, b) {
    b.id && a.setId(b.id);
    if ("HR" == b.tagName) {
        var c = b;
        b = this.createDom(a);
        goog.dom.insertSiblingBefore(b, c);
        goog.dom.removeNode(c)
    } else goog.dom.classlist.add(b, this.getCssClass());
    return b
};
goog.ui.MenuSeparatorRenderer.prototype.setContent = function(a, b) {};
goog.ui.MenuSeparatorRenderer.prototype.getCssClass = function() {
    return goog.ui.MenuSeparatorRenderer.CSS_CLASS
};
goog.ui.Separator = function(a, b) {
    goog.ui.Control.call(this, null, a || goog.ui.MenuSeparatorRenderer.getInstance(), b);
    this.setSupportedState(goog.ui.Component.State.DISABLED, !1);
    this.setSupportedState(goog.ui.Component.State.HOVER, !1);
    this.setSupportedState(goog.ui.Component.State.ACTIVE, !1);
    this.setSupportedState(goog.ui.Component.State.FOCUSED, !1);
    this.setStateInternal(goog.ui.Component.State.DISABLED)
};
goog.inherits(goog.ui.Separator, goog.ui.Control);
goog.ui.Separator.prototype.enterDocument = function() {
    goog.ui.Separator.superClass_.enterDocument.call(this);
    var a = this.getElement();
    goog.asserts.assert(a, "The DOM element for the separator cannot be null.");
    goog.a11y.aria.setRole(a, "separator")
};
goog.ui.registry.setDecoratorByClassName(goog.ui.MenuSeparatorRenderer.CSS_CLASS, function() {
    return new goog.ui.Separator
});
goog.ui.MenuRenderer = function(a) {
    goog.ui.ContainerRenderer.call(this, a || goog.a11y.aria.Role.MENU)
};
goog.inherits(goog.ui.MenuRenderer, goog.ui.ContainerRenderer);
goog.addSingletonGetter(goog.ui.MenuRenderer);
goog.ui.MenuRenderer.CSS_CLASS = "goog-menu";
goog.ui.MenuRenderer.prototype.canDecorate = function(a) {
    return "UL" == a.tagName || goog.ui.MenuRenderer.superClass_.canDecorate.call(this, a)
};
goog.ui.MenuRenderer.prototype.getDecoratorForChild = function(a) {
    return "HR" == a.tagName ? new goog.ui.Separator : goog.ui.MenuRenderer.superClass_.getDecoratorForChild.call(this, a)
};
goog.ui.MenuRenderer.prototype.containsElement = function(a, b) {
    return goog.dom.contains(a.getElement(), b)
};
goog.ui.MenuRenderer.prototype.getCssClass = function() {
    return goog.ui.MenuRenderer.CSS_CLASS
};
goog.ui.MenuRenderer.prototype.initializeDom = function(a) {
    goog.ui.MenuRenderer.superClass_.initializeDom.call(this, a);
    a = a.getElement();
    goog.asserts.assert(a, "The menu DOM element cannot be null.");
    goog.a11y.aria.setState(a, goog.a11y.aria.State.HASPOPUP, "true")
};
goog.ui.MenuSeparator = function(a) {
    goog.ui.Separator.call(this, goog.ui.MenuSeparatorRenderer.getInstance(), a)
};
goog.inherits(goog.ui.MenuSeparator, goog.ui.Separator);
goog.ui.registry.setDecoratorByClassName(goog.ui.MenuSeparatorRenderer.CSS_CLASS, function() {
    return new goog.ui.Separator
});
goog.ui.Menu = function(a, b) {
    goog.ui.Container.call(this, goog.ui.Container.Orientation.VERTICAL, b || goog.ui.MenuRenderer.getInstance(), a);
    this.setFocusable(!1)
};
goog.inherits(goog.ui.Menu, goog.ui.Container);
goog.tagUnsealableClass(goog.ui.Menu);
goog.ui.Menu.EventType = {
    BEFORE_SHOW: goog.ui.Component.EventType.BEFORE_SHOW,
    SHOW: goog.ui.Component.EventType.SHOW,
    BEFORE_HIDE: goog.ui.Component.EventType.HIDE,
    HIDE: goog.ui.Component.EventType.HIDE
};
goog.ui.Menu.CSS_CLASS = goog.ui.MenuRenderer.CSS_CLASS;
goog.ui.Menu.prototype.allowAutoFocus_ = !0;
goog.ui.Menu.prototype.allowHighlightDisabled_ = !1;
goog.ui.Menu.prototype.getCssClass = function() {
    return this.getRenderer().getCssClass()
};
goog.ui.Menu.prototype.containsElement = function(a) {
    if (this.getRenderer().containsElement(this, a)) return !0;
    for (var b = 0, c = this.getChildCount(); b < c; b++) {
        var d = this.getChildAt(b);
        if ("function" == typeof d.containsElement && d.containsElement(a)) return !0
    }
    return !1
};
goog.ui.Menu.prototype.addItem = function(a) {
    this.addChild(a, !0)
};
goog.ui.Menu.prototype.addItemAt = function(a, b) {
    this.addChildAt(a, b, !0)
};
goog.ui.Menu.prototype.removeItem = function(a) {
    (a = this.removeChild(a, !0)) && a.dispose()
};
goog.ui.Menu.prototype.removeItemAt = function(a) {
    (a = this.removeChildAt(a, !0)) && a.dispose()
};
goog.ui.Menu.prototype.getItemAt = function(a) {
    return this.getChildAt(a)
};
goog.ui.Menu.prototype.getItemCount = function() {
    return this.getChildCount()
};
goog.ui.Menu.prototype.getItems = function() {
    var a = [];
    this.forEachChild(function(b) {
        a.push(b)
    });
    return a
};
goog.ui.Menu.prototype.setPosition = function(a, b) {
    var c = this.isVisible();
    c || goog.style.setElementShown(this.getElement(), !0);
    goog.style.setPageOffset(this.getElement(), a, b);
    c || goog.style.setElementShown(this.getElement(), !1)
};
goog.ui.Menu.prototype.getPosition = function() {
    return this.isVisible() ? goog.style.getPageOffset(this.getElement()) : null
};
goog.ui.Menu.prototype.setAllowAutoFocus = function(a) {
    (this.allowAutoFocus_ = a) && this.setFocusable(!0)
};
goog.ui.Menu.prototype.getAllowAutoFocus = function() {
    return this.allowAutoFocus_
};
goog.ui.Menu.prototype.setAllowHighlightDisabled = function(a) {
    this.allowHighlightDisabled_ = a
};
goog.ui.Menu.prototype.getAllowHighlightDisabled = function() {
    return this.allowHighlightDisabled_
};
goog.ui.Menu.prototype.setVisible = function(a, b, c) {
    (b = goog.ui.Menu.superClass_.setVisible.call(this, a, b)) && a && this.isInDocument() && this.allowAutoFocus_ && this.getKeyEventTarget().focus();
    this.openingCoords = a && c && "number" === typeof c.clientX ? new goog.math.Coordinate(c.clientX, c.clientY) : null;
    return b
};
goog.ui.Menu.prototype.handleEnterItem = function(a) {
    this.allowAutoFocus_ && this.getKeyEventTarget().focus();
    return goog.ui.Menu.superClass_.handleEnterItem.call(this, a)
};
goog.ui.Menu.prototype.highlightNextPrefix = function(a) {
    var b = new RegExp("^" + goog.string.regExpEscape(a), "i");
    return this.highlightHelper(function(a, d) {
        var c = 0 > a ? 0 : a,
            f = !1;
        do {
            ++a;
            a == d && (a = 0, f = !0);
            var g = this.getChildAt(a).getCaption();
            if (g && g.match(b)) return a
        } while (!f || a != c);
        return this.getHighlightedIndex()
    }, this.getHighlightedIndex())
};
goog.ui.Menu.prototype.canHighlightItem = function(a) {
    return (this.allowHighlightDisabled_ || a.isEnabled()) && a.isVisible() && a.isSupportedState(goog.ui.Component.State.HOVER)
};
goog.ui.Menu.prototype.decorateInternal = function(a) {
    this.decorateContent(a);
    goog.ui.Menu.superClass_.decorateInternal.call(this, a)
};
goog.ui.Menu.prototype.handleKeyEventInternal = function(a) {
    var b = goog.ui.Menu.superClass_.handleKeyEventInternal.call(this, a);
    b || this.forEachChild(function(c) {
        !b && c.getMnemonic && c.getMnemonic() == a.keyCode && (this.isEnabled() && this.setHighlighted(c), b = c.handleKeyEvent(a))
    }, this);
    return b
};
goog.ui.Menu.prototype.setHighlightedIndex = function(a) {
    goog.ui.Menu.superClass_.setHighlightedIndex.call(this, a);
    (a = this.getChildAt(a)) && goog.style.scrollIntoContainerView(a.getElement(), this.getElement())
};
goog.ui.Menu.prototype.decorateContent = function(a) {
    var b = this.getRenderer();
    a = this.getDomHelper().getElementsByTagNameAndClass("DIV", b.getCssClass() + "-content", a);
    for (var c = a.length, d = 0; d < c; d++) b.decorateChildren(this, a[d])
};
goog.color = {};
goog.color.names = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
};
goog.color.parse = function(a) {
    var b = {};
    a = String(a);
    var c = goog.color.prependHashIfNecessaryHelper(a);
    if (goog.color.isValidHexColor_(c)) return b.hex = goog.color.normalizeHex(c), b.type = "hex", b;
    c = goog.color.isValidRgbColor_(a);
    if (c.length) return b.hex = goog.color.rgbArrayToHex(c), b.type = "rgb", b;
    if (goog.color.names && (c = goog.color.names[a.toLowerCase()])) return b.hex = c, b.type = "named", b;
    throw Error(a + " is not a valid color string");
};
goog.color.isValidColor = function(a) {
    var b = goog.color.prependHashIfNecessaryHelper(a);
    return !!(goog.color.isValidHexColor_(b) || goog.color.isValidRgbColor_(a).length || goog.color.names && goog.color.names[a.toLowerCase()])
};
goog.color.parseRgb = function(a) {
    var b = goog.color.isValidRgbColor_(a);
    if (!b.length) throw Error(a + " is not a valid RGB color");
    return b
};
goog.color.hexToRgbStyle = function(a) {
    return goog.color.rgbStyle_(goog.color.hexToRgb(a))
};
goog.color.hexTripletRe_ = /#(.)(.)(.)/;
goog.color.normalizeHex = function(a) {
    if (!goog.color.isValidHexColor_(a)) throw Error("'" + a + "' is not a valid hex color");
    4 == a.length && (a = a.replace(goog.color.hexTripletRe_, "#$1$1$2$2$3$3"));
    return a.toLowerCase()
};
goog.color.hexToRgb = function(a) {
    a = goog.color.normalizeHex(a);
    a = parseInt(a.substr(1), 16);
    return [a >> 16, a >> 8 & 255, a & 255]
};
goog.color.rgbToHex = function(a, b, c) {
    a = Number(a);
    b = Number(b);
    c = Number(c);
    if (a != (a & 255) || b != (b & 255) || c != (c & 255)) throw Error('"(' + a + "," + b + "," + c + '") is not a valid RGB color');
    b = a << 16 | b << 8 | c;
    return 16 > a ? "#" + (16777216 | b).toString(16).substr(1) : "#" + b.toString(16)
};
goog.color.rgbArrayToHex = function(a) {
    return goog.color.rgbToHex(a[0], a[1], a[2])
};
goog.color.rgbToHsl = function(a, b, c) {
    a /= 255;
    b /= 255;
    c /= 255;
    var d = Math.max(a, b, c),
        e = Math.min(a, b, c),
        f = 0,
        g = 0,
        h = .5 * (d + e);
    d != e && (d == a ? f = 60 * (b - c) / (d - e) : d == b ? f = 60 * (c - a) / (d - e) + 120 : d == c && (f = 60 * (a - b) / (d - e) + 240), g = 0 < h && .5 >= h ? (d - e) / (2 * h) : (d - e) / (2 - 2 * h));
    return [Math.round(f + 360) % 360, g, h]
};
goog.color.rgbArrayToHsl = function(a) {
    return goog.color.rgbToHsl(a[0], a[1], a[2])
};
goog.color.hueToRgb_ = function(a, b, c) {
    0 > c ? c += 1 : 1 < c && --c;
    return 1 > 6 * c ? a + 6 * (b - a) * c : 1 > 2 * c ? b : 2 > 3 * c ? a + (b - a) * (2 / 3 - c) * 6 : a
};
goog.color.hslToRgb = function(a, b, c) {
    a /= 360;
    if (0 == b) c = b = a = 255 * c;
    else {
        var d = .5 > c ? c * (1 + b) : c + b - b * c;
        var e = 2 * c - d;
        c = 255 * goog.color.hueToRgb_(e, d, a + 1 / 3);
        b = 255 * goog.color.hueToRgb_(e, d, a);
        a = 255 * goog.color.hueToRgb_(e, d, a - 1 / 3)
    }
    return [Math.round(c), Math.round(b), Math.round(a)]
};
goog.color.hslArrayToRgb = function(a) {
    return goog.color.hslToRgb(a[0], a[1], a[2])
};
goog.color.validHexColorRe_ = /^#(?:[0-9a-f]{3}){1,2}$/i;
goog.color.isValidHexColor_ = function(a) {
    return goog.color.validHexColorRe_.test(a)
};
goog.color.rgbColorRe_ = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;
goog.color.isValidRgbColor_ = function(a) {
    var b = a.match(goog.color.rgbColorRe_);
    if (b) {
        a = Number(b[1]);
        var c = Number(b[2]);
        b = Number(b[3]);
        if (0 <= a && 255 >= a && 0 <= c && 255 >= c && 0 <= b && 255 >= b) return [a, c, b]
    }
    return []
};
goog.color.prependZeroIfNecessaryHelper = function(a) {
    return 1 == a.length ? "0" + a : a
};
goog.color.prependHashIfNecessaryHelper = function(a) {
    return "#" == a.charAt(0) ? a : "#" + a
};
goog.color.rgbStyle_ = function(a) {
    return "rgb(" + a.join(",") + ")"
};
goog.color.hsvToRgb = function(a, b, c) {
    var d = 0,
        e = 0,
        f = 0;
    if (0 == b) f = e = d = c;
    else {
        var g = Math.floor(a / 60),
            h = a / 60 - g;
        a = c * (1 - b);
        var k = c * (1 - b * h);
        b = c * (1 - b * (1 - h));
        switch (g) {
            case 1:
                d = k;
                e = c;
                f = a;
                break;
            case 2:
                d = a;
                e = c;
                f = b;
                break;
            case 3:
                d = a;
                e = k;
                f = c;
                break;
            case 4:
                d = b;
                e = a;
                f = c;
                break;
            case 5:
                d = c;
                e = a;
                f = k;
                break;
            case 6:
            case 0:
                d = c, e = b, f = a
        }
    }
    return [Math.round(d), Math.round(e), Math.round(f)]
};
goog.color.rgbToHsv = function(a, b, c) {
    var d = Math.max(Math.max(a, b), c),
        e = Math.min(Math.min(a, b), c);
    if (e == d) e = a = 0;
    else {
        var f = d - e;
        e = f / d;
        a = 60 * (a == d ? (b - c) / f : b == d ? 2 + (c - a) / f : 4 + (a - b) / f);
        0 > a && (a += 360);
        360 < a && (a -= 360)
    }
    return [a, e, d]
};
goog.color.rgbArrayToHsv = function(a) {
    return goog.color.rgbToHsv(a[0], a[1], a[2])
};
goog.color.hsvArrayToRgb = function(a) {
    return goog.color.hsvToRgb(a[0], a[1], a[2])
};
goog.color.hexToHsl = function(a) {
    a = goog.color.hexToRgb(a);
    return goog.color.rgbToHsl(a[0], a[1], a[2])
};
goog.color.hslToHex = function(a, b, c) {
    return goog.color.rgbArrayToHex(goog.color.hslToRgb(a, b, c))
};
goog.color.hslArrayToHex = function(a) {
    return goog.color.rgbArrayToHex(goog.color.hslToRgb(a[0], a[1], a[2]))
};
goog.color.hexToHsv = function(a) {
    return goog.color.rgbArrayToHsv(goog.color.hexToRgb(a))
};
goog.color.hsvToHex = function(a, b, c) {
    return goog.color.rgbArrayToHex(goog.color.hsvToRgb(a, b, c))
};
goog.color.hsvArrayToHex = function(a) {
    return goog.color.hsvToHex(a[0], a[1], a[2])
};
goog.color.hslDistance = function(a, b) {
    var c = .5 >= a[2] ? a[1] * a[2] : a[1] * (1 - a[2]);
    var d = .5 >= b[2] ? b[1] * b[2] : b[1] * (1 - b[2]);
    return (a[2] - b[2]) * (a[2] - b[2]) + c * c + d * d - 2 * c * d * Math.cos(2 * (a[0] / 360 - b[0] / 360) * Math.PI)
};
goog.color.blend = function(a, b, c) {
    c = goog.math.clamp(c, 0, 1);
    return [Math.round(b[0] + c * (a[0] - b[0])), Math.round(b[1] + c * (a[1] - b[1])), Math.round(b[2] + c * (a[2] - b[2]))]
};
goog.color.darken = function(a, b) {
    return goog.color.blend([0, 0, 0], a, b)
};
goog.color.lighten = function(a, b) {
    return goog.color.blend([255, 255, 255], a, b)
};
goog.color.highContrast = function(a, b) {
    for (var c = [], d = 0; d < b.length; d++) c.push({
        color: b[d],
        diff: goog.color.yiqBrightnessDiff_(b[d], a) + goog.color.colorDiff_(b[d], a)
    });
    c.sort(function(a, b) {
        return b.diff - a.diff
    });
    return c[0].color
};
goog.color.yiqBrightness_ = function(a) {
    return Math.round((299 * a[0] + 587 * a[1] + 114 * a[2]) / 1E3)
};
goog.color.yiqBrightnessDiff_ = function(a, b) {
    return Math.abs(goog.color.yiqBrightness_(a) - goog.color.yiqBrightness_(b))
};
goog.color.colorDiff_ = function(a, b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2])
};
goog.iter = {};
goog.iter.StopIteration = "StopIteration" in goog.global ? goog.global.StopIteration : {
    message: "StopIteration",
    stack: ""
};
goog.iter.Iterator = function() {};
goog.iter.Iterator.prototype.next = function() {
    throw goog.iter.StopIteration;
};
goog.iter.Iterator.prototype.__iterator__ = function(a) {
    return this
};
goog.iter.toIterator = function(a) {
    if (a instanceof goog.iter.Iterator) return a;
    if ("function" == typeof a.__iterator__) return a.__iterator__(!1);
    if (goog.isArrayLike(a)) {
        var b = 0,
            c = new goog.iter.Iterator;
        c.next = function() {
            for (;;) {
                if (b >= a.length) throw goog.iter.StopIteration;
                if (b in a) return a[b++];
                b++
            }
        };
        return c
    }
    throw Error("Not implemented");
};
goog.iter.forEach = function(a, b, c) {
    if (goog.isArrayLike(a)) try {
        goog.array.forEach(a, b, c)
    } catch (d) {
        if (d !== goog.iter.StopIteration) throw d;
    } else {
        a = goog.iter.toIterator(a);
        try {
            for (;;) b.call(c, a.next(), void 0, a)
        } catch (d) {
            if (d !== goog.iter.StopIteration) throw d;
        }
    }
};
goog.iter.filter = function(a, b, c) {
    var d = goog.iter.toIterator(a);
    a = new goog.iter.Iterator;
    a.next = function() {
        for (;;) {
            var a = d.next();
            if (b.call(c, a, void 0, d)) return a
        }
    };
    return a
};
goog.iter.filterFalse = function(a, b, c) {
    return goog.iter.filter(a, goog.functions.not(b), c)
};
goog.iter.range = function(a, b, c) {
    var d = 0,
        e = a,
        f = c || 1;
    1 < arguments.length && (d = a, e = +b);
    if (0 == f) throw Error("Range step argument must not be zero");
    var g = new goog.iter.Iterator;
    g.next = function() {
        if (0 < f && d >= e || 0 > f && d <= e) throw goog.iter.StopIteration;
        var a = d;
        d += f;
        return a
    };
    return g
};
goog.iter.join = function(a, b) {
    return goog.iter.toArray(a).join(b)
};
goog.iter.map = function(a, b, c) {
    var d = goog.iter.toIterator(a);
    a = new goog.iter.Iterator;
    a.next = function() {
        var a = d.next();
        return b.call(c, a, void 0, d)
    };
    return a
};
goog.iter.reduce = function(a, b, c, d) {
    var e = c;
    goog.iter.forEach(a, function(a) {
        e = b.call(d, e, a)
    });
    return e
};
goog.iter.some = function(a, b, c) {
    a = goog.iter.toIterator(a);
    try {
        for (;;)
            if (b.call(c, a.next(), void 0, a)) return !0
    } catch (d) {
        if (d !== goog.iter.StopIteration) throw d;
    }
    return !1
};
goog.iter.every = function(a, b, c) {
    a = goog.iter.toIterator(a);
    try {
        for (;;)
            if (!b.call(c, a.next(), void 0, a)) return !1
    } catch (d) {
        if (d !== goog.iter.StopIteration) throw d;
    }
    return !0
};
goog.iter.chain = function(a) {
    return goog.iter.chainFromIterable(arguments)
};
goog.iter.chainFromIterable = function(a) {
    var b = goog.iter.toIterator(a);
    a = new goog.iter.Iterator;
    var c = null;
    a.next = function() {
        for (;;) {
            if (null == c) {
                var a = b.next();
                c = goog.iter.toIterator(a)
            }
            try {
                return c.next()
            } catch (e) {
                if (e !== goog.iter.StopIteration) throw e;
                c = null
            }
        }
    };
    return a
};
goog.iter.dropWhile = function(a, b, c) {
    var d = goog.iter.toIterator(a);
    a = new goog.iter.Iterator;
    var e = !0;
    a.next = function() {
        for (;;) {
            var a = d.next();
            if (!e || !b.call(c, a, void 0, d)) return e = !1, a
        }
    };
    return a
};
goog.iter.takeWhile = function(a, b, c) {
    var d = goog.iter.toIterator(a);
    a = new goog.iter.Iterator;
    a.next = function() {
        var a = d.next();
        if (b.call(c, a, void 0, d)) return a;
        throw goog.iter.StopIteration;
    };
    return a
};
goog.iter.toArray = function(a) {
    if (goog.isArrayLike(a)) return goog.array.toArray(a);
    a = goog.iter.toIterator(a);
    var b = [];
    goog.iter.forEach(a, function(a) {
        b.push(a)
    });
    return b
};
goog.iter.equals = function(a, b, c) {
    a = goog.iter.zipLongest({}, a, b);
    var d = c || goog.array.defaultCompareEquality;
    return goog.iter.every(a, function(a) {
        return d(a[0], a[1])
    })
};
goog.iter.nextOrValue = function(a, b) {
    try {
        return goog.iter.toIterator(a).next()
    } catch (c) {
        if (c != goog.iter.StopIteration) throw c;
        return b
    }
};
goog.iter.product = function(a) {
    if (goog.array.some(arguments, function(a) {
            return !a.length
        }) || !arguments.length) return new goog.iter.Iterator;
    var b = new goog.iter.Iterator,
        c = arguments,
        d = goog.array.repeat(0, c.length);
    b.next = function() {
        if (d) {
            for (var a = goog.array.map(d, function(a, b) {
                    return c[b][a]
                }), b = d.length - 1; 0 <= b; b--) {
                goog.asserts.assert(d);
                if (d[b] < c[b].length - 1) {
                    d[b]++;
                    break
                }
                if (0 == b) {
                    d = null;
                    break
                }
                d[b] = 0
            }
            return a
        }
        throw goog.iter.StopIteration;
    };
    return b
};
goog.iter.cycle = function(a) {
    var b = goog.iter.toIterator(a),
        c = [],
        d = 0;
    a = new goog.iter.Iterator;
    var e = !1;
    a.next = function() {
        var a = null;
        if (!e) try {
            return a = b.next(), c.push(a), a
        } catch (g) {
            if (g != goog.iter.StopIteration || goog.array.isEmpty(c)) throw g;
            e = !0
        }
        a = c[d];
        d = (d + 1) % c.length;
        return a
    };
    return a
};
goog.iter.count = function(a, b) {
    var c = a || 0,
        d = void 0 !== b ? b : 1,
        e = new goog.iter.Iterator;
    e.next = function() {
        var a = c;
        c += d;
        return a
    };
    return e
};
goog.iter.repeat = function(a) {
    var b = new goog.iter.Iterator;
    b.next = goog.functions.constant(a);
    return b
};
goog.iter.accumulate = function(a) {
    var b = goog.iter.toIterator(a),
        c = 0;
    a = new goog.iter.Iterator;
    a.next = function() {
        return c += b.next()
    };
    return a
};
goog.iter.zip = function(a) {
    var b = arguments,
        c = new goog.iter.Iterator;
    if (0 < b.length) {
        var d = goog.array.map(b, goog.iter.toIterator);
        c.next = function() {
            return goog.array.map(d, function(a) {
                return a.next()
            })
        }
    }
    return c
};
goog.iter.zipLongest = function(a, b) {
    var c = goog.array.slice(arguments, 1),
        d = new goog.iter.Iterator;
    if (0 < c.length) {
        var e = goog.array.map(c, goog.iter.toIterator);
        d.next = function() {
            var b = !1,
                c = goog.array.map(e, function(c) {
                    try {
                        var d = c.next();
                        b = !0
                    } catch (l) {
                        if (l !== goog.iter.StopIteration) throw l;
                        d = a
                    }
                    return d
                });
            if (!b) throw goog.iter.StopIteration;
            return c
        }
    }
    return d
};
goog.iter.compress = function(a, b) {
    var c = goog.iter.toIterator(b);
    return goog.iter.filter(a, function() {
        return !!c.next()
    })
};
goog.iter.GroupByIterator_ = function(a, b) {
    this.iterator = goog.iter.toIterator(a);
    this.keyFunc = b || goog.functions.identity
};
goog.inherits(goog.iter.GroupByIterator_, goog.iter.Iterator);
goog.iter.GroupByIterator_.prototype.next = function() {
    for (; this.currentKey == this.targetKey;) this.currentValue = this.iterator.next(), this.currentKey = this.keyFunc(this.currentValue);
    this.targetKey = this.currentKey;
    return [this.currentKey, this.groupItems_(this.targetKey)]
};
goog.iter.GroupByIterator_.prototype.groupItems_ = function(a) {
    for (var b = []; this.currentKey == a;) {
        b.push(this.currentValue);
        try {
            this.currentValue = this.iterator.next()
        } catch (c) {
            if (c !== goog.iter.StopIteration) throw c;
            break
        }
        this.currentKey = this.keyFunc(this.currentValue)
    }
    return b
};
goog.iter.groupBy = function(a, b) {
    return new goog.iter.GroupByIterator_(a, b)
};
goog.iter.starMap = function(a, b, c) {
    var d = goog.iter.toIterator(a);
    a = new goog.iter.Iterator;
    a.next = function() {
        var a = goog.iter.toArray(d.next());
        return b.apply(c, goog.array.concat(a, void 0, d))
    };
    return a
};
goog.iter.tee = function(a, b) {
    var c = goog.iter.toIterator(a),
        d = goog.array.map(goog.array.range("number" === typeof b ? b : 2), function() {
            return []
        }),
        e = function() {
            var a = c.next();
            goog.array.forEach(d, function(b) {
                b.push(a)
            })
        };
    return goog.array.map(d, function(a) {
        var b = new goog.iter.Iterator;
        b.next = function() {
            goog.array.isEmpty(a) && e();
            goog.asserts.assert(!goog.array.isEmpty(a));
            return a.shift()
        };
        return b
    })
};
goog.iter.enumerate = function(a, b) {
    return goog.iter.zip(goog.iter.count(b), a)
};
goog.iter.limit = function(a, b) {
    goog.asserts.assert(goog.math.isInt(b) && 0 <= b);
    var c = goog.iter.toIterator(a),
        d = new goog.iter.Iterator,
        e = b;
    d.next = function() {
        if (0 < e--) return c.next();
        throw goog.iter.StopIteration;
    };
    return d
};
goog.iter.consume = function(a, b) {
    goog.asserts.assert(goog.math.isInt(b) && 0 <= b);
    for (var c = goog.iter.toIterator(a); 0 < b--;) goog.iter.nextOrValue(c, null);
    return c
};
goog.iter.slice = function(a, b, c) {
    goog.asserts.assert(goog.math.isInt(b) && 0 <= b);
    a = goog.iter.consume(a, b);
    "number" === typeof c && (goog.asserts.assert(goog.math.isInt(c) && c >= b), a = goog.iter.limit(a, c - b));
    return a
};
goog.iter.hasDuplicates_ = function(a) {
    var b = [];
    goog.array.removeDuplicates(a, b);
    return a.length != b.length
};
goog.iter.permutations = function(a, b) {
    var c = goog.iter.toArray(a);
    c = goog.array.repeat(c, "number" === typeof b ? b : c.length);
    c = goog.iter.product.apply(void 0, c);
    return goog.iter.filter(c, function(a) {
        return !goog.iter.hasDuplicates_(a)
    })
};
goog.iter.combinations = function(a, b) {
    function c(a) {
        return d[a]
    }
    var d = goog.iter.toArray(a),
        e = goog.iter.range(d.length);
    e = goog.iter.permutations(e, b);
    var f = goog.iter.filter(e, function(a) {
        return goog.array.isSorted(a)
    });
    e = new goog.iter.Iterator;
    e.next = function() {
        return goog.array.map(f.next(), c)
    };
    return e
};
goog.iter.combinationsWithReplacement = function(a, b) {
    function c(a) {
        return d[a]
    }
    var d = goog.iter.toArray(a),
        e = goog.array.range(d.length);
    e = goog.array.repeat(e, b);
    e = goog.iter.product.apply(void 0, e);
    var f = goog.iter.filter(e, function(a) {
        return goog.array.isSorted(a)
    });
    e = new goog.iter.Iterator;
    e.next = function() {
        return goog.array.map(f.next(), c)
    };
    return e
};
goog.dom.TagWalkType = {
    START_TAG: 1,
    OTHER: 0,
    END_TAG: -1
};
goog.dom.TagIterator = function(a, b, c, d, e) {
    this.reversed = !!b;
    this.node = null;
    this.tagType = goog.dom.TagWalkType.OTHER;
    this.started_ = !1;
    this.constrained = !c;
    a && this.setPosition(a, d);
    this.depth = void 0 != e ? e : this.tagType || 0;
    this.reversed && (this.depth *= -1)
};
goog.inherits(goog.dom.TagIterator, goog.iter.Iterator);
goog.dom.TagIterator.prototype.setPosition = function(a, b, c) {
    if (this.node = a) this.tagType = "number" === typeof b ? b : this.node.nodeType != goog.dom.NodeType.ELEMENT ? goog.dom.TagWalkType.OTHER : this.reversed ? goog.dom.TagWalkType.END_TAG : goog.dom.TagWalkType.START_TAG;
    "number" === typeof c && (this.depth = c)
};
goog.dom.TagIterator.prototype.copyFrom = function(a) {
    this.node = a.node;
    this.tagType = a.tagType;
    this.depth = a.depth;
    this.reversed = a.reversed;
    this.constrained = a.constrained
};
goog.dom.TagIterator.prototype.clone = function() {
    return new goog.dom.TagIterator(this.node, this.reversed, !this.constrained, this.tagType, this.depth)
};
goog.dom.TagIterator.prototype.skipTag = function() {
    var a = this.reversed ? goog.dom.TagWalkType.END_TAG : goog.dom.TagWalkType.START_TAG;
    this.tagType == a && (this.tagType = -1 * a, this.depth += this.tagType * (this.reversed ? -1 : 1))
};
goog.dom.TagIterator.prototype.restartTag = function() {
    var a = this.reversed ? goog.dom.TagWalkType.START_TAG : goog.dom.TagWalkType.END_TAG;
    this.tagType == a && (this.tagType = -1 * a, this.depth += this.tagType * (this.reversed ? -1 : 1))
};
goog.dom.TagIterator.prototype.next = function() {
    if (this.started_) {
        if (!this.node || this.constrained && 0 == this.depth) throw goog.iter.StopIteration;
        var a = this.node;
        var b = this.reversed ? goog.dom.TagWalkType.END_TAG : goog.dom.TagWalkType.START_TAG;
        if (this.tagType == b) {
            var c = this.reversed ? a.lastChild : a.firstChild;
            c ? this.setPosition(c) : this.setPosition(a, -1 * b)
        } else(c = this.reversed ? a.previousSibling : a.nextSibling) ? this.setPosition(c) : this.setPosition(a.parentNode, -1 * b);
        this.depth += this.tagType * (this.reversed ? -1 :
            1)
    } else this.started_ = !0;
    a = this.node;
    if (!this.node) throw goog.iter.StopIteration;
    return a
};
goog.dom.TagIterator.prototype.isStarted = function() {
    return this.started_
};
goog.dom.TagIterator.prototype.isStartTag = function() {
    return this.tagType == goog.dom.TagWalkType.START_TAG
};
goog.dom.TagIterator.prototype.isEndTag = function() {
    return this.tagType == goog.dom.TagWalkType.END_TAG
};
goog.dom.TagIterator.prototype.isNonElement = function() {
    return this.tagType == goog.dom.TagWalkType.OTHER
};
goog.dom.TagIterator.prototype.equals = function(a) {
    return a.node == this.node && (!this.node || a.tagType == this.tagType)
};
goog.dom.TagIterator.prototype.splice = function(a) {
    var b = this.node;
    this.restartTag();
    this.reversed = !this.reversed;
    goog.dom.TagIterator.prototype.next.call(this);
    this.reversed = !this.reversed;
    for (var c = goog.isArrayLike(arguments[0]) ? arguments[0] : arguments, d = c.length - 1; 0 <= d; d--) goog.dom.insertSiblingAfter(c[d], b);
    goog.dom.removeNode(b)
};
goog.dom.NodeIterator = function(a, b, c, d) {
    goog.dom.TagIterator.call(this, a, b, c, null, d)
};
goog.inherits(goog.dom.NodeIterator, goog.dom.TagIterator);
goog.dom.NodeIterator.prototype.next = function() {
    do goog.dom.NodeIterator.superClass_.next.call(this); while (this.isEndTag());
    return this.node
};
goog.userAgent.product = {};
goog.userAgent.product.ASSUME_FIREFOX = !1;
goog.userAgent.product.ASSUME_IPHONE = !1;
goog.userAgent.product.ASSUME_IPAD = !1;
goog.userAgent.product.ASSUME_ANDROID = !1;
goog.userAgent.product.ASSUME_CHROME = !1;
goog.userAgent.product.ASSUME_SAFARI = !1;
goog.userAgent.product.PRODUCT_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_OPERA || goog.userAgent.product.ASSUME_FIREFOX || goog.userAgent.product.ASSUME_IPHONE || goog.userAgent.product.ASSUME_IPAD || goog.userAgent.product.ASSUME_ANDROID || goog.userAgent.product.ASSUME_CHROME || goog.userAgent.product.ASSUME_SAFARI;
goog.userAgent.product.OPERA = goog.userAgent.OPERA;
goog.userAgent.product.IE = goog.userAgent.IE;
goog.userAgent.product.EDGE = goog.userAgent.EDGE;
goog.userAgent.product.FIREFOX = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_FIREFOX : goog.labs.userAgent.browser.isFirefox();
goog.userAgent.product.isIphoneOrIpod_ = function() {
    return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpod()
};
goog.userAgent.product.IPHONE = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPHONE : goog.userAgent.product.isIphoneOrIpod_();
goog.userAgent.product.IPAD = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
goog.userAgent.product.ANDROID = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_ANDROID : goog.labs.userAgent.browser.isAndroidBrowser();
goog.userAgent.product.CHROME = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CHROME : goog.labs.userAgent.browser.isChrome();
goog.userAgent.product.isSafariDesktop_ = function() {
    return goog.labs.userAgent.browser.isSafari() && !goog.labs.userAgent.platform.isIos()
};
goog.userAgent.product.SAFARI = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_SAFARI : goog.userAgent.product.isSafariDesktop_();
goog.dom.dataset = {};
goog.dom.dataset.ALLOWED_ = !goog.userAgent.product.IE && !goog.labs.userAgent.browser.isSafari();
goog.dom.dataset.PREFIX_ = "data-";
goog.dom.dataset.isValidProperty_ = function(a) {
    return !/-[a-z]/.test(a)
};
goog.dom.dataset.set = function(a, b, c) {
    if (goog.dom.dataset.ALLOWED_ && a.dataset) a.dataset[b] = c;
    else if (goog.dom.dataset.isValidProperty_(b)) a.setAttribute(goog.dom.dataset.PREFIX_ + goog.string.toSelectorCase(b), c);
    else throw Error(goog.DEBUG ? '"' + b + '" is not a valid dataset property name.' : "");
};
goog.dom.dataset.get = function(a, b) {
    if (!goog.dom.dataset.isValidProperty_(b)) return null;
    if (goog.dom.dataset.ALLOWED_ && a.dataset) {
        if (goog.labs.userAgent.browser.isAndroidBrowser() && !(b in a.dataset)) return null;
        var c = a.dataset[b];
        return void 0 === c ? null : c
    }
    return a.getAttribute(goog.dom.dataset.PREFIX_ + goog.string.toSelectorCase(b))
};
goog.dom.dataset.remove = function(a, b) {
    goog.dom.dataset.isValidProperty_(b) && (goog.dom.dataset.ALLOWED_ && a.dataset ? goog.dom.dataset.has(a, b) && delete a.dataset[b] : a.removeAttribute(goog.dom.dataset.PREFIX_ + goog.string.toSelectorCase(b)))
};
goog.dom.dataset.has = function(a, b) {
    return goog.dom.dataset.isValidProperty_(b) ? goog.dom.dataset.ALLOWED_ && a.dataset ? b in a.dataset : a.hasAttribute ? a.hasAttribute(goog.dom.dataset.PREFIX_ + goog.string.toSelectorCase(b)) : !!a.getAttribute(goog.dom.dataset.PREFIX_ + goog.string.toSelectorCase(b)) : !1
};
goog.dom.dataset.getAll = function(a) {
    if (goog.dom.dataset.ALLOWED_ && a.dataset) return a.dataset;
    var b = {};
    a = a.attributes;
    for (var c = 0; c < a.length; ++c) {
        var d = a[c];
        if (goog.string.startsWith(d.name, goog.dom.dataset.PREFIX_)) {
            var e = goog.string.toCamelCase(d.name.substr(5));
            b[e] = d.value
        }
    }
    return b
};
goog.ui.PaletteRenderer = function() {
    goog.ui.ControlRenderer.call(this)
};
goog.inherits(goog.ui.PaletteRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(goog.ui.PaletteRenderer);
goog.ui.PaletteRenderer.cellId_ = 0;
goog.ui.PaletteRenderer.CSS_CLASS = "goog-palette";
goog.ui.PaletteRenderer.GRID_WIDTH_ATTRIBUTE = "gridWidth";
goog.ui.PaletteRenderer.prototype.createDom = function(a) {
    var b = this.getClassNames(a);
    b = a.getDomHelper().createDom("DIV", b, this.createGrid(a.getContent(), a.getSize(), a.getDomHelper()));
    goog.a11y.aria.setRole(b, goog.a11y.aria.Role.GRID);
    goog.dom.dataset.set(b, goog.ui.PaletteRenderer.GRID_WIDTH_ATTRIBUTE, a.getSize().width);
    return b
};
goog.ui.PaletteRenderer.prototype.createGrid = function(a, b, c) {
    for (var d = [], e = 0, f = 0; e < b.height; e++) {
        for (var g = [], h = 0; h < b.width; h++) {
            var k = a && a[f++];
            g.push(this.createCell(k, c))
        }
        d.push(this.createRow(g, c))
    }
    return this.createTable(d, c)
};
goog.ui.PaletteRenderer.prototype.createTable = function(a, b) {
    var c = b.createDom("TABLE", this.getCssClass() + "-table", b.createDom("TBODY", this.getCssClass() + "-body", a));
    c.cellSpacing = "0";
    c.cellPadding = "0";
    return c
};
goog.ui.PaletteRenderer.prototype.createRow = function(a, b) {
    var c = b.createDom("TR", this.getCssClass() + "-row", a);
    goog.a11y.aria.setRole(c, goog.a11y.aria.Role.ROW);
    return c
};
goog.ui.PaletteRenderer.prototype.createCell = function(a, b) {
    var c = b.createDom("TD", {
        "class": this.getCssClass() + "-cell",
        id: this.getCssClass() + "-cell-" + goog.ui.PaletteRenderer.cellId_++
    }, a);
    goog.a11y.aria.setRole(c, goog.a11y.aria.Role.GRIDCELL);
    goog.a11y.aria.setState(c, goog.a11y.aria.State.SELECTED, !1);
    this.maybeUpdateAriaLabel_(c);
    return c
};
goog.ui.PaletteRenderer.prototype.maybeUpdateAriaLabel_ = function(a) {
    if (!goog.dom.getTextContent(a) && !goog.a11y.aria.getLabel(a)) {
        for (var b = new goog.dom.NodeIterator(a), c = "", d; !c && (d = goog.iter.nextOrValue(b, null));) d.nodeType == goog.dom.NodeType.ELEMENT && (c = goog.a11y.aria.getLabel(d) || d.title);
        c && goog.a11y.aria.setLabel(a, c)
    }
};
goog.ui.PaletteRenderer.prototype.canDecorate = function(a) {
    return !1
};
goog.ui.PaletteRenderer.prototype.decorate = function(a, b) {
    return null
};
goog.ui.PaletteRenderer.prototype.setContent = function(a, b) {
    if (a) {
        var c = goog.dom.getElementsByTagNameAndClass("TBODY", this.getCssClass() + "-body", a)[0];
        if (c) {
            var d = 0;
            goog.array.forEach(c.rows, function(a) {
                goog.array.forEach(a.cells, function(a) {
                    goog.dom.removeChildren(a);
                    goog.a11y.aria.removeState(a, goog.a11y.aria.State.LABEL);
                    if (b) {
                        var c = b[d++];
                        c && (goog.dom.appendChild(a, c), this.maybeUpdateAriaLabel_(a))
                    }
                }, this)
            }, this);
            if (d < b.length) {
                for (var e = [], f = goog.dom.getDomHelper(a), g = goog.dom.dataset.get(a, goog.ui.PaletteRenderer.GRID_WIDTH_ATTRIBUTE); d <
                    b.length;) {
                    var h = b[d++];
                    e.push(this.createCell(h, f));
                    e.length == g && (h = this.createRow(e, f), goog.dom.appendChild(c, h), e.length = 0)
                }
                if (0 < e.length) {
                    for (; e.length < g;) e.push(this.createCell("", f));
                    h = this.createRow(e, f);
                    goog.dom.appendChild(c, h)
                }
            }
        }
        goog.style.setUnselectable(a, !0, goog.userAgent.GECKO)
    }
};
goog.ui.PaletteRenderer.prototype.getContainingItem = function(a, b) {
    for (var c = a.getElement(); b && b.nodeType == goog.dom.NodeType.ELEMENT && b != c;) {
        if ("TD" == b.tagName && goog.dom.classlist.contains(b, this.getCssClass() + "-cell")) return b.firstChild;
        b = b.parentNode
    }
    return null
};
goog.ui.PaletteRenderer.prototype.highlightCell = function(a, b, c) {
    b && (b = this.getCellForItem(b), goog.asserts.assert(b), goog.dom.classlist.enable(b, this.getCssClass() + "-cell-hover", c), c ? goog.a11y.aria.setState(a.getElementStrict(), goog.a11y.aria.State.ACTIVEDESCENDANT, b.id) : b.id == goog.a11y.aria.getState(a.getElementStrict(), goog.a11y.aria.State.ACTIVEDESCENDANT) && goog.a11y.aria.removeState(a.getElementStrict(), goog.a11y.aria.State.ACTIVEDESCENDANT))
};
goog.ui.PaletteRenderer.prototype.getCellForItem = function(a) {
    return a ? a.parentNode : null
};
goog.ui.PaletteRenderer.prototype.selectCell = function(a, b, c) {
    b && (a = b.parentNode, goog.dom.classlist.enable(a, this.getCssClass() + "-cell-selected", c), goog.a11y.aria.setState(a, goog.a11y.aria.State.SELECTED, c))
};
goog.ui.PaletteRenderer.prototype.getCssClass = function() {
    return goog.ui.PaletteRenderer.CSS_CLASS
};
goog.ui.SelectionModel = function(a) {
    goog.events.EventTarget.call(this);
    this.items_ = [];
    this.addItems(a)
};
goog.inherits(goog.ui.SelectionModel, goog.events.EventTarget);
goog.tagUnsealableClass(goog.ui.SelectionModel);
goog.ui.SelectionModel.prototype.selectedItem_ = null;
goog.ui.SelectionModel.prototype.selectionHandler_ = null;
goog.ui.SelectionModel.prototype.getSelectionHandler = function() {
    return this.selectionHandler_
};
goog.ui.SelectionModel.prototype.setSelectionHandler = function(a) {
    this.selectionHandler_ = a
};
goog.ui.SelectionModel.prototype.getItemCount = function() {
    return this.items_.length
};
goog.ui.SelectionModel.prototype.indexOfItem = function(a) {
    return a ? goog.array.indexOf(this.items_, a) : -1
};
goog.ui.SelectionModel.prototype.getFirst = function() {
    return this.items_[0]
};
goog.ui.SelectionModel.prototype.getLast = function() {
    return this.items_[this.items_.length - 1]
};
goog.ui.SelectionModel.prototype.getItemAt = function(a) {
    return this.items_[a] || null
};
goog.ui.SelectionModel.prototype.addItems = function(a) {
    a && (goog.array.forEach(a, function(a) {
        this.selectItem_(a, !1)
    }, this), goog.array.extend(this.items_, a))
};
goog.ui.SelectionModel.prototype.addItem = function(a) {
    this.addItemAt(a, this.getItemCount())
};
goog.ui.SelectionModel.prototype.addItemAt = function(a, b) {
    a && (this.selectItem_(a, !1), goog.array.insertAt(this.items_, a, b))
};
goog.ui.SelectionModel.prototype.removeItem = function(a) {
    a && goog.array.remove(this.items_, a) && a == this.selectedItem_ && (this.selectedItem_ = null, this.dispatchEvent(goog.events.EventType.SELECT))
};
goog.ui.SelectionModel.prototype.removeItemAt = function(a) {
    this.removeItem(this.getItemAt(a))
};
goog.ui.SelectionModel.prototype.getSelectedItem = function() {
    return this.selectedItem_
};
goog.ui.SelectionModel.prototype.getItems = function() {
    return goog.array.clone(this.items_)
};
goog.ui.SelectionModel.prototype.setSelectedItem = function(a) {
    a != this.selectedItem_ && (this.selectItem_(this.selectedItem_, !1), this.selectedItem_ = a, this.selectItem_(a, !0));
    this.dispatchEvent(goog.events.EventType.SELECT)
};
goog.ui.SelectionModel.prototype.getSelectedIndex = function() {
    return this.indexOfItem(this.selectedItem_)
};
goog.ui.SelectionModel.prototype.setSelectedIndex = function(a) {
    this.setSelectedItem(this.getItemAt(a))
};
goog.ui.SelectionModel.prototype.clear = function() {
    goog.array.clear(this.items_);
    this.selectedItem_ = null
};
goog.ui.SelectionModel.prototype.disposeInternal = function() {
    goog.ui.SelectionModel.superClass_.disposeInternal.call(this);
    delete this.items_;
    this.selectedItem_ = null
};
goog.ui.SelectionModel.prototype.selectItem_ = function(a, b) {
    a && ("function" == typeof this.selectionHandler_ ? this.selectionHandler_(a, b) : "function" == typeof a.setSelected && a.setSelected(b))
};
goog.ui.Palette = function(a, b, c) {
    goog.ui.Control.call(this, a, b || goog.ui.PaletteRenderer.getInstance(), c);
    this.setAutoStates(goog.ui.Component.State.CHECKED | goog.ui.Component.State.SELECTED | goog.ui.Component.State.OPENED, !1);
    this.currentCellControl_ = new goog.ui.Palette.CurrentCell_;
    this.currentCellControl_.setParentEventTarget(this);
    this.lastHighlightedIndex_ = -1
};
goog.inherits(goog.ui.Palette, goog.ui.Control);
goog.tagUnsealableClass(goog.ui.Palette);
goog.ui.Palette.EventType = {
    AFTER_HIGHLIGHT: goog.events.getUniqueId("afterhighlight")
};
goog.ui.Palette.prototype.size_ = null;
goog.ui.Palette.prototype.highlightedIndex_ = -1;
goog.ui.Palette.prototype.selectionModel_ = null;
goog.ui.Palette.prototype.disposeInternal = function() {
    goog.ui.Palette.superClass_.disposeInternal.call(this);
    this.selectionModel_ && (this.selectionModel_.dispose(), this.selectionModel_ = null);
    this.size_ = null;
    this.currentCellControl_.dispose()
};
goog.ui.Palette.prototype.setContentInternal = function(a) {
    goog.ui.Palette.superClass_.setContentInternal.call(this, a);
    this.adjustSize_();
    this.selectionModel_ ? (this.selectionModel_.clear(), this.selectionModel_.addItems(a)) : (this.selectionModel_ = new goog.ui.SelectionModel(a), this.selectionModel_.setSelectionHandler(goog.bind(this.selectItem_, this)), this.getHandler().listen(this.selectionModel_, goog.events.EventType.SELECT, this.handleSelectionChange));
    this.highlightedIndex_ = -1
};
goog.ui.Palette.prototype.getCaption = function() {
    return ""
};
goog.ui.Palette.prototype.setCaption = function(a) {};
goog.ui.Palette.prototype.handleMouseOver = function(a) {
    goog.ui.Palette.superClass_.handleMouseOver.call(this, a);
    var b = this.getRenderer().getContainingItem(this, a.target);
    b && a.relatedTarget && goog.dom.contains(b, a.relatedTarget) || b != this.getHighlightedItem() && this.setHighlightedItem(b)
};
goog.ui.Palette.prototype.handleMouseDown = function(a) {
    goog.ui.Palette.superClass_.handleMouseDown.call(this, a);
    this.isActive() && (a = this.getRenderer().getContainingItem(this, a.target), a != this.getHighlightedItem() && this.setHighlightedItem(a))
};
goog.ui.Palette.prototype.performActionInternal = function(a) {
    var b = this.getHighlightedItem();
    return b ? (a && this.shouldSelectHighlightedItem_(a) && this.setSelectedItem(b), goog.ui.Palette.superClass_.performActionInternal.call(this, a)) : !1
};
goog.ui.Palette.prototype.shouldSelectHighlightedItem_ = function(a) {
    return this.getSelectedItem() ? "mouseup" != a.type ? !0 : !!this.getRenderer().getContainingItem(this, a.target) : !0
};
goog.ui.Palette.prototype.handleKeyEvent = function(a) {
    var b = this.getContent();
    b = b ? b.length : 0;
    var c = this.size_.width;
    if (0 == b || !this.isEnabled()) return !1;
    if (a.keyCode == goog.events.KeyCodes.ENTER || a.keyCode == goog.events.KeyCodes.SPACE) return this.performActionInternal(a);
    if (a.keyCode == goog.events.KeyCodes.HOME) return this.setHighlightedIndex(0), !0;
    if (a.keyCode == goog.events.KeyCodes.END) return this.setHighlightedIndex(b - 1), !0;
    var d = 0 > this.highlightedIndex_ ? this.getSelectedIndex() : this.highlightedIndex_;
    switch (a.keyCode) {
        case goog.events.KeyCodes.LEFT:
            if (-1 == d || 0 == d) d = b;
            this.setHighlightedIndex(d - 1);
            a.preventDefault();
            return !0;
        case goog.events.KeyCodes.RIGHT:
            return d == b - 1 && (d = -1), this.setHighlightedIndex(d + 1), a.preventDefault(), !0;
        case goog.events.KeyCodes.UP:
            -1 == d && (d = b + c - 1);
            if (d >= c) return this.setHighlightedIndex(d - c), a.preventDefault(), !0;
            break;
        case goog.events.KeyCodes.DOWN:
            if (-1 == d && (d = -c), d < b - c) return this.setHighlightedIndex(d + c), a.preventDefault(), !0
    }
    return !1
};
goog.ui.Palette.prototype.handleSelectionChange = function(a) {};
goog.ui.Palette.prototype.getSize = function() {
    return this.size_
};
goog.ui.Palette.prototype.setSize = function(a, b) {
    if (this.getElement()) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    this.size_ = "number" === typeof a ? new goog.math.Size(a, b) : a;
    this.adjustSize_()
};
goog.ui.Palette.prototype.getHighlightedIndex = function() {
    return this.highlightedIndex_
};
goog.ui.Palette.prototype.getHighlightedItem = function() {
    var a = this.getContent();
    return a && a[this.highlightedIndex_]
};
goog.ui.Palette.prototype.getHighlightedCellElement_ = function() {
    return this.getRenderer().getCellForItem(this.getHighlightedItem())
};
goog.ui.Palette.prototype.setHighlightedIndex = function(a) {
    a != this.highlightedIndex_ && (this.highlightIndex_(this.highlightedIndex_, !1), this.lastHighlightedIndex_ = this.highlightedIndex_, this.highlightedIndex_ = a, this.highlightIndex_(a, !0), this.dispatchEvent(goog.ui.Palette.EventType.AFTER_HIGHLIGHT))
};
goog.ui.Palette.prototype.setHighlightedItem = function(a) {
    var b = this.getContent();
    this.setHighlightedIndex(b && a ? goog.array.indexOf(b, a) : -1)
};
goog.ui.Palette.prototype.getSelectedIndex = function() {
    return this.selectionModel_ ? this.selectionModel_.getSelectedIndex() : -1
};
goog.ui.Palette.prototype.getSelectedItem = function() {
    return this.selectionModel_ ? this.selectionModel_.getSelectedItem() : null
};
goog.ui.Palette.prototype.setSelectedIndex = function(a) {
    this.selectionModel_ && this.selectionModel_.setSelectedIndex(a)
};
goog.ui.Palette.prototype.setSelectedItem = function(a) {
    this.selectionModel_ && this.selectionModel_.setSelectedItem(a)
};
goog.ui.Palette.prototype.highlightIndex_ = function(a, b) {
    if (this.getElement()) {
        var c = this.getContent();
        if (c && 0 <= a && a < c.length) {
            var d = this.getHighlightedCellElement_();
            this.currentCellControl_.getElement() != d && this.currentCellControl_.setElementInternal(d);
            this.currentCellControl_.tryHighlight(b) && this.getRenderer().highlightCell(this, c[a], b)
        }
    }
};
goog.ui.Palette.prototype.setHighlighted = function(a) {
    a && -1 == this.highlightedIndex_ ? this.setHighlightedIndex(-1 < this.lastHighlightedIndex_ ? this.lastHighlightedIndex_ : 0) : a || this.setHighlightedIndex(-1);
    goog.ui.Palette.superClass_.setHighlighted.call(this, a)
};
goog.ui.Palette.prototype.selectItem_ = function(a, b) {
    this.getElement() && this.getRenderer().selectCell(this, a, b)
};
goog.ui.Palette.prototype.adjustSize_ = function() {
    var a = this.getContent();
    if (a)
        if (this.size_ && this.size_.width) {
            if (a = Math.ceil(a.length / this.size_.width), "number" !== typeof this.size_.height || this.size_.height < a) this.size_.height = a
        } else a = Math.ceil(Math.sqrt(a.length)), this.size_ = new goog.math.Size(a, a);
    else this.size_ = new goog.math.Size(0, 0)
};
goog.ui.Palette.CurrentCell_ = function() {
    goog.ui.Control.call(this, null);
    this.setDispatchTransitionEvents(goog.ui.Component.State.HOVER, !0)
};
goog.inherits(goog.ui.Palette.CurrentCell_, goog.ui.Control);
goog.ui.Palette.CurrentCell_.prototype.tryHighlight = function(a) {
    this.setHighlighted(a);
    return this.isHighlighted() == a
};
goog.ui.ColorPalette = function(a, b, c) {
    this.colors_ = a || [];
    goog.ui.Palette.call(this, null, b || goog.ui.PaletteRenderer.getInstance(), c);
    this.setColors(this.colors_)
};
goog.inherits(goog.ui.ColorPalette, goog.ui.Palette);
goog.tagUnsealableClass(goog.ui.ColorPalette);
goog.ui.ColorPalette.prototype.normalizedColors_ = null;
goog.ui.ColorPalette.prototype.labels_ = null;
goog.ui.ColorPalette.prototype.getColors = function() {
    return this.colors_
};
goog.ui.ColorPalette.prototype.setColors = function(a, b) {
    this.colors_ = a;
    this.labels_ = b || null;
    this.normalizedColors_ = null;
    this.setContent(this.createColorNodes())
};
goog.ui.ColorPalette.prototype.getSelectedColor = function() {
    var a = this.getSelectedItem();
    return a ? (a = goog.style.getStyle(a, "background-color"), goog.ui.ColorPalette.parseColor_(a)) : null
};
goog.ui.ColorPalette.prototype.setSelectedColor = function(a) {
    a = goog.ui.ColorPalette.parseColor_(a);
    this.normalizedColors_ || (this.normalizedColors_ = goog.array.map(this.colors_, function(a) {
        return goog.ui.ColorPalette.parseColor_(a)
    }));
    this.setSelectedIndex(a ? goog.array.indexOf(this.normalizedColors_, a) : -1)
};
goog.ui.ColorPalette.prototype.createColorNodes = function() {
    return goog.array.map(this.colors_, function(a, b) {
        var c = this.getDomHelper().createDom("DIV", {
            "class": this.getRenderer().getCssClass() + "-colorswatch",
            style: "background-color:" + a
        });
        c.title = this.labels_ && this.labels_[b] ? this.labels_[b] : "#" == a.charAt(0) ? "RGB (" + goog.color.hexToRgb(a).join(", ") + ")" : a;
        return c
    }, this)
};
goog.ui.ColorPalette.parseColor_ = function(a) {
    if (a) try {
        return goog.color.parse(a).hex
    } catch (b) {}
    return null
};
goog.ui.ColorPicker = function(a, b) {
    goog.ui.Component.call(this, a);
    this.colorPalette_ = b || null;
    this.getHandler().listen(this, goog.ui.Component.EventType.ACTION, this.onColorPaletteAction_)
};
goog.inherits(goog.ui.ColorPicker, goog.ui.Component);
goog.ui.ColorPicker.DEFAULT_NUM_COLS = 5;
goog.ui.ColorPicker.EventType = {
    CHANGE: "change"
};
goog.ui.ColorPicker.prototype.focusable_ = !0;
goog.ui.ColorPicker.prototype.getColors = function() {
    return this.colorPalette_ ? this.colorPalette_.getColors() : null
};
goog.ui.ColorPicker.prototype.setColors = function(a) {
    this.colorPalette_ ? this.colorPalette_.setColors(a) : this.createColorPalette_(a)
};
goog.ui.ColorPicker.prototype.addColors = function(a) {
    this.setColors(a)
};
goog.ui.ColorPicker.prototype.setSize = function(a) {
    this.colorPalette_ || this.createColorPalette_([]);
    this.colorPalette_.setSize(a)
};
goog.ui.ColorPicker.prototype.getSize = function() {
    return this.colorPalette_ ? this.colorPalette_.getSize() : null
};
goog.ui.ColorPicker.prototype.setColumnCount = function(a) {
    this.setSize(a)
};
goog.ui.ColorPicker.prototype.getSelectedIndex = function() {
    return this.colorPalette_ ? this.colorPalette_.getSelectedIndex() : -1
};
goog.ui.ColorPicker.prototype.setSelectedIndex = function(a) {
    this.colorPalette_ && this.colorPalette_.setSelectedIndex(a)
};
goog.ui.ColorPicker.prototype.getSelectedColor = function() {
    return this.colorPalette_ ? this.colorPalette_.getSelectedColor() : null
};
goog.ui.ColorPicker.prototype.setSelectedColor = function(a) {
    this.colorPalette_ && this.colorPalette_.setSelectedColor(a)
};
goog.ui.ColorPicker.prototype.isFocusable = function() {
    return this.focusable_
};
goog.ui.ColorPicker.prototype.setFocusable = function(a) {
    this.focusable_ = a;
    this.colorPalette_ && this.colorPalette_.setSupportedState(goog.ui.Component.State.FOCUSED, a)
};
goog.ui.ColorPicker.prototype.canDecorate = function(a) {
    return !1
};
goog.ui.ColorPicker.prototype.enterDocument = function() {
    goog.ui.ColorPicker.superClass_.enterDocument.call(this);
    this.colorPalette_ && this.colorPalette_.render(this.getElement());
    this.getElement().unselectable = "on"
};
goog.ui.ColorPicker.prototype.disposeInternal = function() {
    goog.ui.ColorPicker.superClass_.disposeInternal.call(this);
    this.colorPalette_ && (this.colorPalette_.dispose(), this.colorPalette_ = null)
};
goog.ui.ColorPicker.prototype.focus = function() {
    this.colorPalette_ && this.colorPalette_.getElement().focus()
};
goog.ui.ColorPicker.prototype.onColorPaletteAction_ = function(a) {
    a.stopPropagation();
    this.dispatchEvent(goog.ui.ColorPicker.EventType.CHANGE)
};
goog.ui.ColorPicker.prototype.createColorPalette_ = function(a) {
    a = new goog.ui.ColorPalette(a, null, this.getDomHelper());
    a.setSize(goog.ui.ColorPicker.DEFAULT_NUM_COLS);
    a.setSupportedState(goog.ui.Component.State.FOCUSED, this.focusable_);
    this.addChild(a);
    this.colorPalette_ = a;
    this.isInDocument() && this.colorPalette_.render(this.getElement())
};
goog.ui.ColorPicker.createSimpleColorGrid = function(a) {
    a = new goog.ui.ColorPicker(a);
    a.setSize(7);
    a.setColors(goog.ui.ColorPicker.SIMPLE_GRID_COLORS);
    return a
};
goog.ui.ColorPicker.SIMPLE_GRID_COLORS = "#ffffff #cccccc #c0c0c0 #999999 #666666 #333333 #000000 #ffcccc #ff6666 #ff0000 #cc0000 #990000 #660000 #330000 #ffcc99 #ff9966 #ff9900 #ff6600 #cc6600 #993300 #663300 #ffff99 #ffff66 #ffcc66 #ffcc33 #cc9933 #996633 #663333 #ffffcc #ffff33 #ffff00 #ffcc00 #999900 #666600 #333300 #99ff99 #66ff99 #33ff33 #33cc00 #009900 #006600 #003300 #99ffff #33ffff #66cccc #00cccc #339999 #336666 #003333 #ccffff #66ffff #33ccff #3366ff #3333ff #000099 #000066 #ccccff #9999ff #6666cc #6633ff #6600cc #333399 #330099 #ffccff #ff99ff #cc66cc #cc33cc #993399 #663366 #330033".split(" ");
goog.events.FocusHandler = function(a) {
    goog.events.EventTarget.call(this);
    this.element_ = a;
    a = goog.userAgent.IE ? "focusout" : "blur";
    this.listenKeyIn_ = goog.events.listen(this.element_, goog.userAgent.IE ? "focusin" : "focus", this, !goog.userAgent.IE);
    this.listenKeyOut_ = goog.events.listen(this.element_, a, this, !goog.userAgent.IE)
};
goog.inherits(goog.events.FocusHandler, goog.events.EventTarget);
goog.events.FocusHandler.EventType = {
    FOCUSIN: "focusin",
    FOCUSOUT: "focusout"
};
goog.events.FocusHandler.prototype.handleEvent = function(a) {
    var b = a.getBrowserEvent();
    b = new goog.events.BrowserEvent(b);
    b.type = "focusin" == a.type || "focus" == a.type ? goog.events.FocusHandler.EventType.FOCUSIN : goog.events.FocusHandler.EventType.FOCUSOUT;
    this.dispatchEvent(b)
};
goog.events.FocusHandler.prototype.disposeInternal = function() {
    goog.events.FocusHandler.superClass_.disposeInternal.call(this);
    goog.events.unlistenByKey(this.listenKeyIn_);
    goog.events.unlistenByKey(this.listenKeyOut_);
    delete this.element_
};
goog.debug.LogRecord = function(a, b, c, d, e) {
    this.reset(a, b, c, d, e)
};
goog.debug.LogRecord.prototype.sequenceNumber_ = 0;
goog.debug.LogRecord.prototype.exception_ = null;
goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS = !0;
goog.debug.LogRecord.nextSequenceNumber_ = 0;
goog.debug.LogRecord.prototype.reset = function(a, b, c, d, e) {
    goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS && (this.sequenceNumber_ = "number" == typeof e ? e : goog.debug.LogRecord.nextSequenceNumber_++);
    this.time_ = d || goog.now();
    this.level_ = a;
    this.msg_ = b;
    this.loggerName_ = c;
    delete this.exception_
};
goog.debug.LogRecord.prototype.getLoggerName = function() {
    return this.loggerName_
};
goog.debug.LogRecord.prototype.getException = function() {
    return this.exception_
};
goog.debug.LogRecord.prototype.setException = function(a) {
    this.exception_ = a
};
goog.debug.LogRecord.prototype.setLoggerName = function(a) {
    this.loggerName_ = a
};
goog.debug.LogRecord.prototype.getLevel = function() {
    return this.level_
};
goog.debug.LogRecord.prototype.setLevel = function(a) {
    this.level_ = a
};
goog.debug.LogRecord.prototype.getMessage = function() {
    return this.msg_
};
goog.debug.LogRecord.prototype.setMessage = function(a) {
    this.msg_ = a
};
goog.debug.LogRecord.prototype.getMillis = function() {
    return this.time_
};
goog.debug.LogRecord.prototype.setMillis = function(a) {
    this.time_ = a
};
goog.debug.LogRecord.prototype.getSequenceNumber = function() {
    return this.sequenceNumber_
};
goog.debug.LogBuffer = function() {
    goog.asserts.assert(goog.debug.LogBuffer.isBufferingEnabled(), "Cannot use goog.debug.LogBuffer without defining goog.debug.LogBuffer.CAPACITY.");
    this.clear()
};
goog.debug.LogBuffer.getInstance = function() {
    goog.debug.LogBuffer.instance_ || (goog.debug.LogBuffer.instance_ = new goog.debug.LogBuffer);
    return goog.debug.LogBuffer.instance_
};
goog.debug.LogBuffer.CAPACITY = 0;
goog.debug.LogBuffer.prototype.addRecord = function(a, b, c) {
    var d = (this.curIndex_ + 1) % goog.debug.LogBuffer.CAPACITY;
    this.curIndex_ = d;
    if (this.isFull_) return d = this.buffer_[d], d.reset(a, b, c), d;
    this.isFull_ = d == goog.debug.LogBuffer.CAPACITY - 1;
    return this.buffer_[d] = new goog.debug.LogRecord(a, b, c)
};
goog.debug.LogBuffer.isBufferingEnabled = function() {
    return 0 < goog.debug.LogBuffer.CAPACITY
};
goog.debug.LogBuffer.prototype.clear = function() {
    this.buffer_ = Array(goog.debug.LogBuffer.CAPACITY);
    this.curIndex_ = -1;
    this.isFull_ = !1
};
goog.debug.LogBuffer.prototype.forEachRecord = function(a) {
    var b = this.buffer_;
    if (b[0]) {
        var c = this.curIndex_,
            d = this.isFull_ ? c : -1;
        do d = (d + 1) % goog.debug.LogBuffer.CAPACITY, a(b[d]); while (d != c)
    }
};
goog.debug.Logger = function(a) {
    this.name_ = a;
    this.handlers_ = this.children_ = this.level_ = this.parent_ = null
};
goog.debug.Logger.ROOT_LOGGER_NAME = "";
goog.debug.Logger.ENABLE_HIERARCHY = !0;
goog.debug.Logger.ENABLE_PROFILER_LOGGING = !1;
goog.debug.Logger.ENABLE_HIERARCHY || (goog.debug.Logger.rootHandlers_ = []);
goog.debug.Logger.Level = function(a, b) {
    this.name = a;
    this.value = b
};
goog.debug.Logger.Level.prototype.toString = function() {
    return this.name
};
goog.debug.Logger.Level.OFF = new goog.debug.Logger.Level("OFF", Infinity);
goog.debug.Logger.Level.SHOUT = new goog.debug.Logger.Level("SHOUT", 1200);
goog.debug.Logger.Level.SEVERE = new goog.debug.Logger.Level("SEVERE", 1E3);
goog.debug.Logger.Level.WARNING = new goog.debug.Logger.Level("WARNING", 900);
goog.debug.Logger.Level.INFO = new goog.debug.Logger.Level("INFO", 800);
goog.debug.Logger.Level.CONFIG = new goog.debug.Logger.Level("CONFIG", 700);
goog.debug.Logger.Level.FINE = new goog.debug.Logger.Level("FINE", 500);
goog.debug.Logger.Level.FINER = new goog.debug.Logger.Level("FINER", 400);
goog.debug.Logger.Level.FINEST = new goog.debug.Logger.Level("FINEST", 300);
goog.debug.Logger.Level.ALL = new goog.debug.Logger.Level("ALL", 0);
goog.debug.Logger.Level.PREDEFINED_LEVELS = [goog.debug.Logger.Level.OFF, goog.debug.Logger.Level.SHOUT, goog.debug.Logger.Level.SEVERE, goog.debug.Logger.Level.WARNING, goog.debug.Logger.Level.INFO, goog.debug.Logger.Level.CONFIG, goog.debug.Logger.Level.FINE, goog.debug.Logger.Level.FINER, goog.debug.Logger.Level.FINEST, goog.debug.Logger.Level.ALL];
goog.debug.Logger.Level.predefinedLevelsCache_ = null;
goog.debug.Logger.Level.createPredefinedLevelsCache_ = function() {
    goog.debug.Logger.Level.predefinedLevelsCache_ = {};
    for (var a = 0, b; b = goog.debug.Logger.Level.PREDEFINED_LEVELS[a]; a++) goog.debug.Logger.Level.predefinedLevelsCache_[b.value] = b, goog.debug.Logger.Level.predefinedLevelsCache_[b.name] = b
};
goog.debug.Logger.Level.getPredefinedLevel = function(a) {
    goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
    return goog.debug.Logger.Level.predefinedLevelsCache_[a] || null
};
goog.debug.Logger.Level.getPredefinedLevelByValue = function(a) {
    goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
    if (a in goog.debug.Logger.Level.predefinedLevelsCache_) return goog.debug.Logger.Level.predefinedLevelsCache_[a];
    for (var b = 0; b < goog.debug.Logger.Level.PREDEFINED_LEVELS.length; ++b) {
        var c = goog.debug.Logger.Level.PREDEFINED_LEVELS[b];
        if (c.value <= a) return c
    }
    return null
};
goog.debug.Logger.getLogger = function(a) {
    return goog.debug.LogManager.getLogger(a)
};
goog.debug.Logger.logToProfilers = function(a) {
    if (goog.debug.Logger.ENABLE_PROFILER_LOGGING) {
        var b = goog.global.msWriteProfilerMark;
        b ? b(a) : (b = goog.global.console) && b.timeStamp && b.timeStamp(a)
    }
};
goog.debug.Logger.prototype.getName = function() {
    return this.name_
};
goog.debug.Logger.prototype.addHandler = function(a) {
    goog.debug.LOGGING_ENABLED && (goog.debug.Logger.ENABLE_HIERARCHY ? (this.handlers_ || (this.handlers_ = []), this.handlers_.push(a)) : (goog.asserts.assert(!this.name_, "Cannot call addHandler on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootHandlers_.push(a)))
};
goog.debug.Logger.prototype.removeHandler = function(a) {
    if (goog.debug.LOGGING_ENABLED) {
        var b = goog.debug.Logger.ENABLE_HIERARCHY ? this.handlers_ : goog.debug.Logger.rootHandlers_;
        return !!b && goog.array.remove(b, a)
    }
    return !1
};
goog.debug.Logger.prototype.getParent = function() {
    return this.parent_
};
goog.debug.Logger.prototype.getChildren = function() {
    this.children_ || (this.children_ = {});
    return this.children_
};
goog.debug.Logger.prototype.setLevel = function(a) {
    goog.debug.LOGGING_ENABLED && (goog.debug.Logger.ENABLE_HIERARCHY ? this.level_ = a : (goog.asserts.assert(!this.name_, "Cannot call setLevel() on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootLevel_ = a))
};
goog.debug.Logger.prototype.getLevel = function() {
    return goog.debug.LOGGING_ENABLED ? this.level_ : goog.debug.Logger.Level.OFF
};
goog.debug.Logger.prototype.getEffectiveLevel = function() {
    if (!goog.debug.LOGGING_ENABLED) return goog.debug.Logger.Level.OFF;
    if (!goog.debug.Logger.ENABLE_HIERARCHY) return goog.debug.Logger.rootLevel_;
    if (this.level_) return this.level_;
    if (this.parent_) return this.parent_.getEffectiveLevel();
    goog.asserts.fail("Root logger has no level set.");
    return null
};
goog.debug.Logger.prototype.isLoggable = function(a) {
    return goog.debug.LOGGING_ENABLED && a.value >= this.getEffectiveLevel().value
};
goog.debug.Logger.prototype.log = function(a, b, c) {
    goog.debug.LOGGING_ENABLED && this.isLoggable(a) && (goog.isFunction(b) && (b = b()), this.doLogRecord_(this.getLogRecord(a, b, c)))
};
goog.debug.Logger.prototype.getLogRecord = function(a, b, c) {
    a = goog.debug.LogBuffer.isBufferingEnabled() ? goog.debug.LogBuffer.getInstance().addRecord(a, b, this.name_) : new goog.debug.LogRecord(a, String(b), this.name_);
    c && a.setException(c);
    return a
};
goog.debug.Logger.prototype.shout = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.SHOUT, a, b)
};
goog.debug.Logger.prototype.severe = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.SEVERE, a, b)
};
goog.debug.Logger.prototype.warning = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.WARNING, a, b)
};
goog.debug.Logger.prototype.info = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.INFO, a, b)
};
goog.debug.Logger.prototype.config = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.CONFIG, a, b)
};
goog.debug.Logger.prototype.fine = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINE, a, b)
};
goog.debug.Logger.prototype.finer = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINER, a, b)
};
goog.debug.Logger.prototype.finest = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINEST, a, b)
};
goog.debug.Logger.prototype.logRecord = function(a) {
    goog.debug.LOGGING_ENABLED && this.isLoggable(a.getLevel()) && this.doLogRecord_(a)
};
goog.debug.Logger.prototype.doLogRecord_ = function(a) {
    goog.debug.Logger.ENABLE_PROFILER_LOGGING && goog.debug.Logger.logToProfilers("log:" + a.getMessage());
    if (goog.debug.Logger.ENABLE_HIERARCHY)
        for (var b = this; b;) b.callPublish_(a), b = b.getParent();
    else {
        b = 0;
        for (var c; c = goog.debug.Logger.rootHandlers_[b++];) c(a)
    }
};
goog.debug.Logger.prototype.callPublish_ = function(a) {
    if (this.handlers_)
        for (var b = 0, c; c = this.handlers_[b]; b++) c(a)
};
goog.debug.Logger.prototype.setParent_ = function(a) {
    this.parent_ = a
};
goog.debug.Logger.prototype.addChild_ = function(a, b) {
    this.getChildren()[a] = b
};
goog.debug.LogManager = {};
goog.debug.LogManager.loggers_ = {};
goog.debug.LogManager.rootLogger_ = null;
goog.debug.LogManager.initialize = function() {
    goog.debug.LogManager.rootLogger_ || (goog.debug.LogManager.rootLogger_ = new goog.debug.Logger(goog.debug.Logger.ROOT_LOGGER_NAME), goog.debug.LogManager.loggers_[goog.debug.Logger.ROOT_LOGGER_NAME] = goog.debug.LogManager.rootLogger_, goog.debug.LogManager.rootLogger_.setLevel(goog.debug.Logger.Level.CONFIG))
};
goog.debug.LogManager.getLoggers = function() {
    return goog.debug.LogManager.loggers_
};
goog.debug.LogManager.getRoot = function() {
    goog.debug.LogManager.initialize();
    return goog.debug.LogManager.rootLogger_
};
goog.debug.LogManager.getLogger = function(a) {
    goog.debug.LogManager.initialize();
    return goog.debug.LogManager.loggers_[a] || goog.debug.LogManager.createLogger_(a)
};
goog.debug.LogManager.createFunctionForCatchErrors = function(a) {
    return function(b) {
        (a || goog.debug.LogManager.getRoot()).severe("Error: " + b.message + " (" + b.fileName + " @ Line: " + b.line + ")")
    }
};
goog.debug.LogManager.createLogger_ = function(a) {
    var b = new goog.debug.Logger(a);
    if (goog.debug.Logger.ENABLE_HIERARCHY) {
        var c = a.lastIndexOf("."),
            d = a.substr(0, c);
        c = a.substr(c + 1);
        d = goog.debug.LogManager.getLogger(d);
        d.addChild_(c, b);
        b.setParent_(d)
    }
    return goog.debug.LogManager.loggers_[a] = b
};
goog.log = {};
goog.log.ENABLED = goog.debug.LOGGING_ENABLED;
goog.log.ROOT_LOGGER_NAME = goog.debug.Logger.ROOT_LOGGER_NAME;
goog.log.Logger = goog.debug.Logger;
goog.log.Level = goog.debug.Logger.Level;
goog.log.LogRecord = goog.debug.LogRecord;
goog.log.getLogger = function(a, b) {
    if (goog.log.ENABLED) {
        var c = goog.debug.LogManager.getLogger(a);
        b && c && c.setLevel(b);
        return c
    }
    return null
};
goog.log.addHandler = function(a, b) {
    goog.log.ENABLED && a && a.addHandler(b)
};
goog.log.removeHandler = function(a, b) {
    return goog.log.ENABLED && a ? a.removeHandler(b) : !1
};
goog.log.log = function(a, b, c, d) {
    goog.log.ENABLED && a && a.log(b, c, d)
};
goog.log.error = function(a, b, c) {
    goog.log.ENABLED && a && a.severe(b, c)
};
goog.log.warning = function(a, b, c) {
    goog.log.ENABLED && a && a.warning(b, c)
};
goog.log.info = function(a, b, c) {
    goog.log.ENABLED && a && a.info(b, c)
};
goog.log.fine = function(a, b, c) {
    goog.log.ENABLED && a && a.fine(b, c)
};
goog.string.StringBuffer = function(a, b) {
    null != a && this.append.apply(this, arguments)
};
goog.string.StringBuffer.prototype.buffer_ = "";
goog.string.StringBuffer.prototype.set = function(a) {
    this.buffer_ = "" + a
};
goog.string.StringBuffer.prototype.append = function(a, b, c) {
    this.buffer_ += String(a);
    if (null != b)
        for (var d = 1; d < arguments.length; d++) this.buffer_ += arguments[d];
    return this
};
goog.string.StringBuffer.prototype.clear = function() {
    this.buffer_ = ""
};
goog.string.StringBuffer.prototype.getLength = function() {
    return this.buffer_.length
};
goog.string.StringBuffer.prototype.toString = function() {
    return this.buffer_
};
goog.ui.tree = {};
goog.ui.tree.BaseNode = function(a, b, c) {
    goog.ui.Component.call(this, c);
    this.config_ = b || goog.ui.tree.BaseNode.defaultConfig;
    this.html_ = goog.html.SafeHtml.htmlEscapePreservingNewlines(a);
    this.expanded_ = this.selected_ = !1;
    this.toolTip_ = null;
    this.afterLabelHtml_ = goog.html.SafeHtml.EMPTY;
    this.isUserCollapsible_ = !0;
    this.depth_ = -1
};
goog.inherits(goog.ui.tree.BaseNode, goog.ui.Component);
goog.ui.tree.BaseNode.EventType = {
    BEFORE_EXPAND: "beforeexpand",
    EXPAND: "expand",
    BEFORE_COLLAPSE: "beforecollapse",
    COLLAPSE: "collapse"
};
goog.ui.tree.BaseNode.allNodes = {};
goog.ui.tree.BaseNode.prototype.disposeInternal = function() {
    goog.ui.tree.BaseNode.superClass_.disposeInternal.call(this);
    this.tree && (this.tree.removeNode(this), this.tree = null);
    this.setElementInternal(null)
};
goog.ui.tree.BaseNode.prototype.initAccessibility = function() {
    var a = this.getElement();
    if (a) {
        var b = this.getLabelElement();
        b && !b.id && (b.id = this.getId() + ".label");
        goog.a11y.aria.setRole(a, "treeitem");
        goog.a11y.aria.setState(a, "selected", !1);
        goog.a11y.aria.setState(a, "level", this.getDepth());
        b && goog.a11y.aria.setState(a, "labelledby", b.id);
        (b = this.getIconElement()) && goog.a11y.aria.setRole(b, "presentation");
        (b = this.getExpandIconElement()) && goog.a11y.aria.setRole(b, "presentation");
        if (b = this.getChildrenElement())
            if (goog.a11y.aria.setRole(b,
                    "group"), b.hasChildNodes())
                for (goog.a11y.aria.setState(a, goog.a11y.aria.State.EXPANDED, !1), a = this.getChildCount(), b = 1; b <= a; b++) {
                    var c = this.getChildAt(b - 1).getElement();
                    goog.asserts.assert(c, "The child element cannot be null");
                    goog.a11y.aria.setState(c, "setsize", a);
                    goog.a11y.aria.setState(c, "posinset", b)
                }
    }
};
goog.ui.tree.BaseNode.prototype.createDom = function() {
    var a = this.getDomHelper().safeHtmlToNode(this.toSafeHtml());
    this.setElementInternal(a)
};
goog.ui.tree.BaseNode.prototype.enterDocument = function() {
    goog.ui.tree.BaseNode.superClass_.enterDocument.call(this);
    goog.ui.tree.BaseNode.allNodes[this.getId()] = this;
    this.initAccessibility()
};
goog.ui.tree.BaseNode.prototype.exitDocument = function() {
    goog.ui.tree.BaseNode.superClass_.exitDocument.call(this);
    delete goog.ui.tree.BaseNode.allNodes[this.getId()]
};
goog.ui.tree.BaseNode.prototype.addChildAt = function(a, b, c) {
    goog.asserts.assert(!a.getParent());
    goog.asserts.assertInstanceof(a, goog.ui.tree.BaseNode);
    c = this.getChildAt(b - 1);
    var d = this.getChildAt(b);
    goog.ui.tree.BaseNode.superClass_.addChildAt.call(this, a, b);
    a.previousSibling_ = c;
    a.nextSibling_ = d;
    c ? c.nextSibling_ = a : this.firstChild_ = a;
    d ? d.previousSibling_ = a : this.lastChild_ = a;
    (b = this.getTree()) && a.setTreeInternal(b);
    a.setDepth_(this.getDepth() + 1);
    if (b = this.getElement())
        if (this.updateExpandIcon(), goog.a11y.aria.setState(b,
                goog.a11y.aria.State.EXPANDED, this.getExpanded()), this.getExpanded()) {
            b = this.getChildrenElement();
            a.getElement() || a.createDom();
            var e = a.getElement(),
                f = d && d.getElement();
            b.insertBefore(e, f);
            this.isInDocument() && a.enterDocument();
            d || (c ? c.updateExpandIcon() : (goog.style.setElementShown(b, !0), this.setExpanded(this.getExpanded())))
        }
};
goog.ui.tree.BaseNode.prototype.add = function(a, b) {
    goog.asserts.assert(!b || b.getParent() == this, "Can only add nodes before siblings");
    a.getParent() && a.getParent().removeChild(a);
    this.addChildAt(a, b ? this.indexOfChild(b) : this.getChildCount());
    return a
};
goog.ui.tree.BaseNode.prototype.removeChild = function(a, b) {
    var c = this.getTree(),
        d = c ? c.getSelectedItem() : null;
    if (d == a || a.contains(d)) c.hasFocus() ? (this.select(), goog.Timer.callOnce(this.onTimeoutSelect_, 10, this)) : this.select();
    goog.ui.tree.BaseNode.superClass_.removeChild.call(this, a);
    this.lastChild_ == a && (this.lastChild_ = a.previousSibling_);
    this.firstChild_ == a && (this.firstChild_ = a.nextSibling_);
    a.previousSibling_ && (a.previousSibling_.nextSibling_ = a.nextSibling_);
    a.nextSibling_ && (a.nextSibling_.previousSibling_ =
        a.previousSibling_);
    d = a.isLastSibling();
    a.tree = null;
    a.depth_ = -1;
    if (c && (c.removeNode(a), this.isInDocument())) {
        c = this.getChildrenElement();
        if (a.isInDocument()) {
            var e = a.getElement();
            c.removeChild(e);
            a.exitDocument()
        }
        d && (d = this.getLastChild()) && d.updateExpandIcon();
        this.hasChildren() || (c.style.display = "none", this.updateExpandIcon(), this.updateIcon_(), (d = this.getElement()) && goog.a11y.aria.removeState(d, goog.a11y.aria.State.EXPANDED))
    }
    return a
};
goog.ui.tree.BaseNode.prototype.remove = goog.ui.tree.BaseNode.prototype.removeChild;
goog.ui.tree.BaseNode.prototype.onTimeoutSelect_ = function() {
    this.select()
};
goog.ui.tree.BaseNode.prototype.getTree = goog.abstractMethod;
goog.ui.tree.BaseNode.prototype.getDepth = function() {
    var a = this.depth_;
    0 > a && (a = this.computeDepth_(), this.setDepth_(a));
    return a
};
goog.ui.tree.BaseNode.prototype.computeDepth_ = function() {
    var a = this.getParent();
    return a ? a.getDepth() + 1 : 0
};
goog.ui.tree.BaseNode.prototype.setDepth_ = function(a) {
    if (a != this.depth_) {
        this.depth_ = a;
        var b = this.getRowElement();
        if (b) {
            var c = this.getPixelIndent_() + "px";
            this.isRightToLeft() ? b.style.paddingRight = c : b.style.paddingLeft = c
        }
        this.forEachChild(function(b) {
            b.setDepth_(a + 1)
        })
    }
};
goog.ui.tree.BaseNode.prototype.contains = function(a) {
    for (; a;) {
        if (a == this) return !0;
        a = a.getParent()
    }
    return !1
};
goog.ui.tree.BaseNode.EMPTY_CHILDREN_ = [];
goog.ui.tree.BaseNode.prototype.getChildren = function() {
    var a = [];
    this.forEachChild(function(b) {
        a.push(b)
    });
    return a
};
goog.ui.tree.BaseNode.prototype.getFirstChild = function() {
    return this.getChildAt(0)
};
goog.ui.tree.BaseNode.prototype.getLastChild = function() {
    return this.getChildAt(this.getChildCount() - 1)
};
goog.ui.tree.BaseNode.prototype.getPreviousSibling = function() {
    return this.previousSibling_
};
goog.ui.tree.BaseNode.prototype.getNextSibling = function() {
    return this.nextSibling_
};
goog.ui.tree.BaseNode.prototype.isLastSibling = function() {
    return !this.nextSibling_
};
goog.ui.tree.BaseNode.prototype.isSelected = function() {
    return this.selected_
};
goog.ui.tree.BaseNode.prototype.select = function() {
    var a = this.getTree();
    a && a.setSelectedItem(this)
};
goog.ui.tree.BaseNode.prototype.deselect = goog.nullFunction;
goog.ui.tree.BaseNode.prototype.setSelectedInternal = function(a) {
    if (this.selected_ != a) {
        this.selected_ = a;
        this.updateRow();
        var b = this.getElement();
        b && (goog.a11y.aria.setState(b, "selected", a), a && (a = this.getTree().getElement(), goog.asserts.assert(a, "The DOM element for the tree cannot be null"), goog.a11y.aria.setState(a, "activedescendant", this.getId())))
    }
};
goog.ui.tree.BaseNode.prototype.getExpanded = function() {
    return this.expanded_
};
goog.ui.tree.BaseNode.prototype.setExpandedInternal = function(a) {
    this.expanded_ = a
};
goog.ui.tree.BaseNode.prototype.setExpanded = function(a) {
    var b = a != this.expanded_;
    if (!b || this.dispatchEvent(a ? goog.ui.tree.BaseNode.EventType.BEFORE_EXPAND : goog.ui.tree.BaseNode.EventType.BEFORE_COLLAPSE)) {
        this.expanded_ = a;
        var c = this.getTree();
        var d = this.getElement();
        if (this.hasChildren()) {
            if (!a && c && this.contains(c.getSelectedItem()) && this.select(), d) {
                if (c = this.getChildrenElement())
                    if (goog.style.setElementShown(c, a), goog.a11y.aria.setState(d, goog.a11y.aria.State.EXPANDED, a), a && this.isInDocument() &&
                        !c.hasChildNodes()) {
                        var e = [];
                        this.forEachChild(function(a) {
                            e.push(a.toSafeHtml())
                        });
                        goog.dom.safe.setInnerHtml(c, goog.html.SafeHtml.concat(e));
                        this.forEachChild(function(a) {
                            a.enterDocument()
                        })
                    }
                this.updateExpandIcon()
            }
        } else(c = this.getChildrenElement()) && goog.style.setElementShown(c, !1);
        d && this.updateIcon_();
        b && this.dispatchEvent(a ? goog.ui.tree.BaseNode.EventType.EXPAND : goog.ui.tree.BaseNode.EventType.COLLAPSE)
    }
};
goog.ui.tree.BaseNode.prototype.toggle = function() {
    this.setExpanded(!this.getExpanded())
};
goog.ui.tree.BaseNode.prototype.expand = function() {
    this.setExpanded(!0)
};
goog.ui.tree.BaseNode.prototype.collapse = function() {
    this.setExpanded(!1)
};
goog.ui.tree.BaseNode.prototype.collapseChildren = function() {
    this.forEachChild(function(a) {
        a.collapseAll()
    })
};
goog.ui.tree.BaseNode.prototype.collapseAll = function() {
    this.collapseChildren();
    this.collapse()
};
goog.ui.tree.BaseNode.prototype.expandChildren = function() {
    this.forEachChild(function(a) {
        a.expandAll()
    })
};
goog.ui.tree.BaseNode.prototype.expandAll = function() {
    this.expandChildren();
    this.expand()
};
goog.ui.tree.BaseNode.prototype.reveal = function() {
    var a = this.getParent();
    a && (a.setExpanded(!0), a.reveal())
};
goog.ui.tree.BaseNode.prototype.setIsUserCollapsible = function(a) {
    (this.isUserCollapsible_ = a) || this.expand();
    this.getElement() && this.updateExpandIcon()
};
goog.ui.tree.BaseNode.prototype.isUserCollapsible = function() {
    return this.isUserCollapsible_
};
goog.ui.tree.BaseNode.prototype.toSafeHtml = function() {
    var a = this.getTree(),
        b = !a.getShowLines() || a == this.getParent() && !a.getShowRootLines() ? this.config_.cssChildrenNoLines : this.config_.cssChildren;
    a = this.getExpanded() && this.hasChildren();
    b = {
        "class": b,
        style: this.getLineStyle()
    };
    var c = [];
    a && this.forEachChild(function(a) {
        c.push(a.toSafeHtml())
    });
    a = goog.html.SafeHtml.create("div", b, c);
    return goog.html.SafeHtml.create("div", {
        "class": this.config_.cssItem,
        id: this.getId()
    }, [this.getRowSafeHtml(), a])
};
goog.ui.tree.BaseNode.prototype.getPixelIndent_ = function() {
    return Math.max(0, (this.getDepth() - 1) * this.config_.indentWidth)
};
goog.ui.tree.BaseNode.prototype.getRowSafeHtml = function() {
    var a = {};
    a["padding-" + (this.isRightToLeft() ? "right" : "left")] = this.getPixelIndent_() + "px";
    a = {
        "class": this.getRowClassName(),
        style: a
    };
    var b = [this.getExpandIconSafeHtml(), this.getIconSafeHtml(), this.getLabelSafeHtml()];
    return goog.html.SafeHtml.create("div", a, b)
};
goog.ui.tree.BaseNode.prototype.getRowClassName = function() {
    var a = this.isSelected() ? " " + this.config_.cssSelectedRow : "";
    return this.config_.cssTreeRow + a
};
goog.ui.tree.BaseNode.prototype.getLabelSafeHtml = function() {
    var a = goog.html.SafeHtml.create("span", {
        "class": this.config_.cssItemLabel,
        title: this.getToolTip() || null
    }, this.getSafeHtml());
    return goog.html.SafeHtml.concat(a, goog.html.SafeHtml.create("span", {}, this.getAfterLabelSafeHtml()))
};
goog.ui.tree.BaseNode.prototype.getAfterLabelHtml = function() {
    return goog.html.SafeHtml.unwrap(this.getAfterLabelSafeHtml())
};
goog.ui.tree.BaseNode.prototype.getAfterLabelSafeHtml = function() {
    return this.afterLabelHtml_
};
goog.ui.tree.BaseNode.prototype.setAfterLabelSafeHtml = function(a) {
    this.afterLabelHtml_ = a;
    var b = this.getAfterLabelElement();
    b && goog.dom.safe.setInnerHtml(b, a)
};
goog.ui.tree.BaseNode.prototype.getIconSafeHtml = function() {
    return goog.html.SafeHtml.create("span", {
        style: {
            display: "inline-block"
        },
        "class": this.getCalculatedIconClass()
    })
};
goog.ui.tree.BaseNode.prototype.getCalculatedIconClass = goog.abstractMethod;
goog.ui.tree.BaseNode.prototype.getExpandIconSafeHtml = function() {
    return goog.html.SafeHtml.create("span", {
        type: "expand",
        style: {
            display: "inline-block"
        },
        "class": this.getExpandIconClass()
    })
};
goog.ui.tree.BaseNode.prototype.getExpandIconClass = function() {
    var a = this.getTree(),
        b = !a.getShowLines() || a == this.getParent() && !a.getShowRootLines(),
        c = this.config_,
        d = new goog.string.StringBuffer;
    d.append(c.cssTreeIcon, " ", c.cssExpandTreeIcon, " ");
    if (this.hasChildren()) {
        var e = 0;
        a.getShowExpandIcons() && this.isUserCollapsible_ && (e = this.getExpanded() ? 2 : 1);
        b || (e = this.isLastSibling() ? e + 4 : e + 8);
        switch (e) {
            case 1:
                d.append(c.cssExpandTreeIconPlus);
                break;
            case 2:
                d.append(c.cssExpandTreeIconMinus);
                break;
            case 4:
                d.append(c.cssExpandTreeIconL);
                break;
            case 5:
                d.append(c.cssExpandTreeIconLPlus);
                break;
            case 6:
                d.append(c.cssExpandTreeIconLMinus);
                break;
            case 8:
                d.append(c.cssExpandTreeIconT);
                break;
            case 9:
                d.append(c.cssExpandTreeIconTPlus);
                break;
            case 10:
                d.append(c.cssExpandTreeIconTMinus);
                break;
            default:
                d.append(c.cssExpandTreeIconBlank)
        }
    } else b ? d.append(c.cssExpandTreeIconBlank) : this.isLastSibling() ? d.append(c.cssExpandTreeIconL) : d.append(c.cssExpandTreeIconT);
    return d.toString()
};
goog.ui.tree.BaseNode.prototype.getLineStyle = function() {
    var a = this.getExpanded() && this.hasChildren();
    return goog.html.SafeStyle.create({
        "background-position": this.getBackgroundPosition(),
        display: a ? null : "none"
    })
};
goog.ui.tree.BaseNode.prototype.getBackgroundPosition = function() {
    return (this.isLastSibling() ? "-100" : (this.getDepth() - 1) * this.config_.indentWidth) + "px 0"
};
goog.ui.tree.BaseNode.prototype.getElement = function() {
    var a = goog.ui.tree.BaseNode.superClass_.getElement.call(this);
    a || (a = this.getDomHelper().getElement(this.getId()), this.setElementInternal(a));
    return a
};
goog.ui.tree.BaseNode.prototype.getRowElement = function() {
    var a = this.getElement();
    return a ? a.firstChild : null
};
goog.ui.tree.BaseNode.prototype.getExpandIconElement = function() {
    var a = this.getRowElement();
    return a ? a.firstChild : null
};
goog.ui.tree.BaseNode.prototype.getIconElement = function() {
    var a = this.getRowElement();
    return a ? a.childNodes[1] : null
};
goog.ui.tree.BaseNode.prototype.getLabelElement = function() {
    var a = this.getRowElement();
    return a && a.lastChild ? a.lastChild.previousSibling : null
};
goog.ui.tree.BaseNode.prototype.getAfterLabelElement = function() {
    var a = this.getRowElement();
    return a ? a.lastChild : null
};
goog.ui.tree.BaseNode.prototype.getChildrenElement = function() {
    var a = this.getElement();
    return a ? a.lastChild : null
};
goog.ui.tree.BaseNode.prototype.setIconClass = function(a) {
    this.iconClass_ = a;
    this.isInDocument() && this.updateIcon_()
};
goog.ui.tree.BaseNode.prototype.getIconClass = function() {
    return this.iconClass_
};
goog.ui.tree.BaseNode.prototype.setExpandedIconClass = function(a) {
    this.expandedIconClass_ = a;
    this.isInDocument() && this.updateIcon_()
};
goog.ui.tree.BaseNode.prototype.getExpandedIconClass = function() {
    return this.expandedIconClass_
};
goog.ui.tree.BaseNode.prototype.setText = function(a) {
    this.setSafeHtml(goog.html.SafeHtml.htmlEscape(a))
};
goog.ui.tree.BaseNode.prototype.getText = function() {
    return goog.string.unescapeEntities(goog.html.SafeHtml.unwrap(this.html_))
};
goog.ui.tree.BaseNode.prototype.setSafeHtml = function(a) {
    this.html_ = a;
    var b = this.getLabelElement();
    b && goog.dom.safe.setInnerHtml(b, a);
    (a = this.getTree()) && a.setNode(this)
};
goog.ui.tree.BaseNode.prototype.getHtml = function() {
    return goog.html.SafeHtml.unwrap(this.getSafeHtml())
};
goog.ui.tree.BaseNode.prototype.getSafeHtml = function() {
    return this.html_
};
goog.ui.tree.BaseNode.prototype.setToolTip = function(a) {
    this.toolTip_ = a;
    var b = this.getLabelElement();
    b && (b.title = a)
};
goog.ui.tree.BaseNode.prototype.getToolTip = function() {
    return this.toolTip_
};
goog.ui.tree.BaseNode.prototype.updateRow = function() {
    var a = this.getRowElement();
    a && (a.className = this.getRowClassName())
};
goog.ui.tree.BaseNode.prototype.updateExpandIcon = function() {
    var a = this.getExpandIconElement();
    a && (a.className = this.getExpandIconClass());
    if (a = this.getChildrenElement()) a.style.backgroundPosition = this.getBackgroundPosition()
};
goog.ui.tree.BaseNode.prototype.updateIcon_ = function() {
    this.getIconElement().className = this.getCalculatedIconClass()
};
goog.ui.tree.BaseNode.prototype.onMouseDown = function(a) {
    "expand" == a.target.getAttribute("type") && this.hasChildren() ? this.isUserCollapsible_ && this.toggle() : (this.select(), this.updateRow())
};
goog.ui.tree.BaseNode.prototype.onClick_ = goog.events.Event.preventDefault;
goog.ui.tree.BaseNode.prototype.onDoubleClick_ = function(a) {
    "expand" == a.target.getAttribute("type") && this.hasChildren() || this.isUserCollapsible_ && this.toggle()
};
goog.ui.tree.BaseNode.prototype.onKeyDown = function(a) {
    var b = !0;
    switch (a.keyCode) {
        case goog.events.KeyCodes.RIGHT:
            if (a.altKey) break;
            this.hasChildren() && (this.getExpanded() ? this.getFirstChild().select() : this.setExpanded(!0));
            break;
        case goog.events.KeyCodes.LEFT:
            if (a.altKey) break;
            if (this.hasChildren() && this.getExpanded() && this.isUserCollapsible_) this.setExpanded(!1);
            else {
                var c = this.getParent(),
                    d = this.getTree();
                c && (d.getShowRootNode() || c != d) && c.select()
            }
            break;
        case goog.events.KeyCodes.DOWN:
            (c = this.getNextShownNode()) &&
            c.select();
            break;
        case goog.events.KeyCodes.UP:
            (c = this.getPreviousShownNode()) && c.select();
            break;
        default:
            b = !1
    }
    b && (a.preventDefault(), (d = this.getTree()) && d.clearTypeAhead());
    return b
};
goog.ui.tree.BaseNode.prototype.getLastShownDescendant = function() {
    return this.getExpanded() && this.hasChildren() ? this.getLastChild().getLastShownDescendant() : this
};
goog.ui.tree.BaseNode.prototype.getNextShownNode = function() {
    if (this.hasChildren() && this.getExpanded()) return this.getFirstChild();
    for (var a = this, b; a != this.getTree();) {
        b = a.getNextSibling();
        if (null != b) return b;
        a = a.getParent()
    }
    return null
};
goog.ui.tree.BaseNode.prototype.getPreviousShownNode = function() {
    var a = this.getPreviousSibling();
    if (null != a) return a.getLastShownDescendant();
    a = this.getParent();
    var b = this.getTree();
    return !b.getShowRootNode() && a == b || this == b ? null : a
};
goog.ui.tree.BaseNode.prototype.getClientData = goog.ui.tree.BaseNode.prototype.getModel;
goog.ui.tree.BaseNode.prototype.setClientData = goog.ui.tree.BaseNode.prototype.setModel;
goog.ui.tree.BaseNode.prototype.getConfig = function() {
    return this.config_
};
goog.ui.tree.BaseNode.prototype.setTreeInternal = function(a) {
    this.tree != a && (this.tree = a, a.setNode(this), this.forEachChild(function(b) {
        b.setTreeInternal(a)
    }))
};
goog.ui.tree.BaseNode.defaultConfig = {
    indentWidth: 19,
    cssRoot: "goog-tree-root goog-tree-item",
    cssHideRoot: "goog-tree-hide-root",
    cssItem: "goog-tree-item",
    cssChildren: "goog-tree-children",
    cssChildrenNoLines: "goog-tree-children-nolines",
    cssTreeRow: "goog-tree-row",
    cssItemLabel: "goog-tree-item-label",
    cssTreeIcon: "goog-tree-icon",
    cssExpandTreeIcon: "goog-tree-expand-icon",
    cssExpandTreeIconPlus: "goog-tree-expand-icon-plus",
    cssExpandTreeIconMinus: "goog-tree-expand-icon-minus",
    cssExpandTreeIconTPlus: "goog-tree-expand-icon-tplus",
    cssExpandTreeIconTMinus: "goog-tree-expand-icon-tminus",
    cssExpandTreeIconLPlus: "goog-tree-expand-icon-lplus",
    cssExpandTreeIconLMinus: "goog-tree-expand-icon-lminus",
    cssExpandTreeIconT: "goog-tree-expand-icon-t",
    cssExpandTreeIconL: "goog-tree-expand-icon-l",
    cssExpandTreeIconBlank: "goog-tree-expand-icon-blank",
    cssExpandedFolderIcon: "goog-tree-expanded-folder-icon",
    cssCollapsedFolderIcon: "goog-tree-collapsed-folder-icon",
    cssFileIcon: "goog-tree-file-icon",
    cssExpandedRootIcon: "goog-tree-expanded-folder-icon",
    cssCollapsedRootIcon: "goog-tree-collapsed-folder-icon",
    cssSelectedRow: "selected"
};
goog.ui.tree.TreeNode = function(a, b, c) {
    goog.ui.tree.BaseNode.call(this, a, b, c)
};
goog.inherits(goog.ui.tree.TreeNode, goog.ui.tree.BaseNode);
goog.ui.tree.TreeNode.prototype.getTree = function() {
    if (this.tree) return this.tree;
    var a = this.getParent();
    return a && (a = a.getTree()) ? (this.setTreeInternal(a), a) : null
};
goog.ui.tree.TreeNode.prototype.getCalculatedIconClass = function() {
    var a = this.getExpanded(),
        b = this.getExpandedIconClass();
    if (a && b) return b;
    b = this.getIconClass();
    if (!a && b) return b;
    b = this.getConfig();
    if (this.hasChildren()) {
        if (a && b.cssExpandedFolderIcon) return b.cssTreeIcon + " " + b.cssExpandedFolderIcon;
        if (!a && b.cssCollapsedFolderIcon) return b.cssTreeIcon + " " + b.cssCollapsedFolderIcon
    } else if (b.cssFileIcon) return b.cssTreeIcon + " " + b.cssFileIcon;
    return ""
};
goog.structs = {};
goog.structs.getCount = function(a) {
    return a.getCount && "function" == typeof a.getCount ? a.getCount() : goog.isArrayLike(a) || "string" === typeof a ? a.length : goog.object.getCount(a)
};
goog.structs.getValues = function(a) {
    if (a.getValues && "function" == typeof a.getValues) return a.getValues();
    if ("string" === typeof a) return a.split("");
    if (goog.isArrayLike(a)) {
        for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
        return b
    }
    return goog.object.getValues(a)
};
goog.structs.getKeys = function(a) {
    if (a.getKeys && "function" == typeof a.getKeys) return a.getKeys();
    if (!a.getValues || "function" != typeof a.getValues) {
        if (goog.isArrayLike(a) || "string" === typeof a) {
            var b = [];
            a = a.length;
            for (var c = 0; c < a; c++) b.push(c);
            return b
        }
        return goog.object.getKeys(a)
    }
};
goog.structs.contains = function(a, b) {
    return a.contains && "function" == typeof a.contains ? a.contains(b) : a.containsValue && "function" == typeof a.containsValue ? a.containsValue(b) : goog.isArrayLike(a) || "string" === typeof a ? goog.array.contains(a, b) : goog.object.containsValue(a, b)
};
goog.structs.isEmpty = function(a) {
    return a.isEmpty && "function" == typeof a.isEmpty ? a.isEmpty() : goog.isArrayLike(a) || "string" === typeof a ? goog.array.isEmpty(a) : goog.object.isEmpty(a)
};
goog.structs.clear = function(a) {
    a.clear && "function" == typeof a.clear ? a.clear() : goog.isArrayLike(a) ? goog.array.clear(a) : goog.object.clear(a)
};
goog.structs.forEach = function(a, b, c) {
    if (a.forEach && "function" == typeof a.forEach) a.forEach(b, c);
    else if (goog.isArrayLike(a) || "string" === typeof a) goog.array.forEach(a, b, c);
    else
        for (var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0; g < f; g++) b.call(c, e[g], d && d[g], a)
};
goog.structs.filter = function(a, b, c) {
    if ("function" == typeof a.filter) return a.filter(b, c);
    if (goog.isArrayLike(a) || "string" === typeof a) return goog.array.filter(a, b, c);
    var d = goog.structs.getKeys(a),
        e = goog.structs.getValues(a),
        f = e.length;
    if (d) {
        var g = {};
        for (var h = 0; h < f; h++) b.call(c, e[h], d[h], a) && (g[d[h]] = e[h])
    } else
        for (g = [], h = 0; h < f; h++) b.call(c, e[h], void 0, a) && g.push(e[h]);
    return g
};
goog.structs.map = function(a, b, c) {
    if ("function" == typeof a.map) return a.map(b, c);
    if (goog.isArrayLike(a) || "string" === typeof a) return goog.array.map(a, b, c);
    var d = goog.structs.getKeys(a),
        e = goog.structs.getValues(a),
        f = e.length;
    if (d) {
        var g = {};
        for (var h = 0; h < f; h++) g[d[h]] = b.call(c, e[h], d[h], a)
    } else
        for (g = [], h = 0; h < f; h++) g[h] = b.call(c, e[h], void 0, a);
    return g
};
goog.structs.some = function(a, b, c) {
    if ("function" == typeof a.some) return a.some(b, c);
    if (goog.isArrayLike(a) || "string" === typeof a) return goog.array.some(a, b, c);
    for (var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0; g < f; g++)
        if (b.call(c, e[g], d && d[g], a)) return !0;
    return !1
};
goog.structs.every = function(a, b, c) {
    if ("function" == typeof a.every) return a.every(b, c);
    if (goog.isArrayLike(a) || "string" === typeof a) return goog.array.every(a, b, c);
    for (var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0; g < f; g++)
        if (!b.call(c, e[g], d && d[g], a)) return !1;
    return !0
};
goog.structs.Trie = function(a) {
    this.value_ = void 0;
    this.childNodes_ = {};
    a && this.setAll(a)
};
goog.structs.Trie.prototype.set = function(a, b) {
    this.setOrAdd_(a, b, !1)
};
goog.structs.Trie.prototype.add = function(a, b) {
    this.setOrAdd_(a, b, !0)
};
goog.structs.Trie.prototype.setOrAdd_ = function(a, b, c) {
    for (var d = this, e = 0; e < a.length; e++) {
        var f = a.charAt(e);
        d.childNodes_[f] || (d.childNodes_[f] = new goog.structs.Trie);
        d = d.childNodes_[f]
    }
    if (c && void 0 !== d.value_) throw Error('The collection already contains the key "' + a + '"');
    d.value_ = b
};
goog.structs.Trie.prototype.setAll = function(a) {
    var b = goog.structs.getKeys(a);
    a = goog.structs.getValues(a);
    for (var c = 0; c < b.length; c++) this.set(b[c], a[c])
};
goog.structs.Trie.prototype.getChildNode_ = function(a) {
    for (var b = this, c = 0; c < a.length; c++) {
        var d = a.charAt(c);
        b = b.childNodes_[d];
        if (!b) return
    }
    return b
};
goog.structs.Trie.prototype.get = function(a) {
    return (a = this.getChildNode_(a)) ? a.value_ : void 0
};
goog.structs.Trie.prototype.getKeyAndPrefixes = function(a, b) {
    var c = this,
        d = {},
        e = b || 0;
    void 0 !== c.value_ && (d[e] = c.value_);
    for (; e < a.length; e++) {
        var f = a.charAt(e);
        if (!(f in c.childNodes_)) break;
        c = c.childNodes_[f];
        void 0 !== c.value_ && (d[e] = c.value_)
    }
    return d
};
goog.structs.Trie.prototype.getValues = function() {
    var a = [];
    this.getValuesInternal_(a);
    return a
};
goog.structs.Trie.prototype.getValuesInternal_ = function(a) {
    void 0 !== this.value_ && a.push(this.value_);
    for (var b in this.childNodes_) this.childNodes_[b].getValuesInternal_(a)
};
goog.structs.Trie.prototype.getKeys = function(a) {
    var b = [];
    if (a) {
        for (var c = this, d = 0; d < a.length; d++) {
            var e = a.charAt(d);
            if (!c.childNodes_[e]) return [];
            c = c.childNodes_[e]
        }
        c.getKeysInternal_(a, b)
    } else this.getKeysInternal_("", b);
    return b
};
goog.structs.Trie.prototype.getKeysInternal_ = function(a, b) {
    void 0 !== this.value_ && b.push(a);
    for (var c in this.childNodes_) this.childNodes_[c].getKeysInternal_(a + c, b)
};
goog.structs.Trie.prototype.containsKey = function(a) {
    return void 0 !== this.get(a)
};
goog.structs.Trie.prototype.containsPrefix = function(a) {
    return 0 == a.length ? !this.isEmpty() : !!this.getChildNode_(a)
};
goog.structs.Trie.prototype.containsValue = function(a) {
    if (this.value_ === a) return !0;
    for (var b in this.childNodes_)
        if (this.childNodes_[b].containsValue(a)) return !0;
    return !1
};
goog.structs.Trie.prototype.clear = function() {
    this.childNodes_ = {};
    this.value_ = void 0
};
goog.structs.Trie.prototype.remove = function(a) {
    for (var b = this, c = [], d = 0; d < a.length; d++) {
        var e = a.charAt(d);
        if (!b.childNodes_[e]) throw Error('The collection does not have the key "' + a + '"');
        c.push([b, e]);
        b = b.childNodes_[e]
    }
    a = b.value_;
    for (delete b.value_; 0 < c.length;)
        if (e = c.pop(), b = e[0], e = e[1], b.childNodes_[e].isEmpty()) delete b.childNodes_[e];
        else break;
    return a
};
goog.structs.Trie.prototype.clone = function() {
    return new goog.structs.Trie(this)
};
goog.structs.Trie.prototype.getCount = function() {
    return goog.structs.getCount(this.getValues())
};
goog.structs.Trie.prototype.isEmpty = function() {
    return void 0 === this.value_ && goog.object.isEmpty(this.childNodes_)
};
goog.ui.tree.TypeAhead = function() {
    this.nodeMap_ = new goog.structs.Trie;
    this.buffer_ = "";
    this.matchingNodes_ = this.matchingLabels_ = null;
    this.matchingNodeIndex_ = this.matchingLabelIndex_ = 0
};
goog.ui.tree.TypeAhead.Offset = {
    DOWN: 1,
    UP: -1
};
goog.ui.tree.TypeAhead.prototype.handleNavigation = function(a) {
    var b = !1;
    switch (a.keyCode) {
        case goog.events.KeyCodes.DOWN:
        case goog.events.KeyCodes.UP:
            a.ctrlKey && (this.jumpTo_(a.keyCode == goog.events.KeyCodes.DOWN ? goog.ui.tree.TypeAhead.Offset.DOWN : goog.ui.tree.TypeAhead.Offset.UP), b = !0);
            break;
        case goog.events.KeyCodes.BACKSPACE:
            a = this.buffer_.length - 1;
            b = !0;
            0 < a ? (this.buffer_ = this.buffer_.substring(0, a), this.jumpToLabel_(this.buffer_)) : 0 == a ? this.buffer_ = "" : b = !1;
            break;
        case goog.events.KeyCodes.ESC:
            this.buffer_ =
                "", b = !0
    }
    return b
};
goog.ui.tree.TypeAhead.prototype.handleTypeAheadChar = function(a) {
    var b = !1;
    a.ctrlKey || a.altKey || (a = String.fromCharCode(a.charCode || a.keyCode).toLowerCase(), goog.string.isUnicodeChar(a) && (" " != a || this.buffer_) && (this.buffer_ += a, b = this.jumpToLabel_(this.buffer_)));
    return b
};
goog.ui.tree.TypeAhead.prototype.setNodeInMap = function(a) {
    var b = a.getText();
    if (b && !goog.string.isEmptyOrWhitespace(goog.string.makeSafe(b))) {
        b = b.toLowerCase();
        var c = this.nodeMap_.get(b);
        c ? c.push(a) : this.nodeMap_.set(b, [a])
    }
};
goog.ui.tree.TypeAhead.prototype.removeNodeFromMap = function(a) {
    var b = a.getText();
    if (b && !goog.string.isEmptyOrWhitespace(goog.string.makeSafe(b))) {
        b = b.toLowerCase();
        var c = this.nodeMap_.get(b);
        if (c) {
            for (var d = a.getChildCount(), e = 0; e < d; e++) this.removeNodeFromMap(a.getChildAt(e));
            goog.array.remove(c, a);
            c.length || this.nodeMap_.remove(b)
        }
    }
};
goog.ui.tree.TypeAhead.prototype.jumpToLabel_ = function(a) {
    var b = !1;
    (a = this.nodeMap_.getKeys(a)) && a.length && (this.matchingLabelIndex_ = this.matchingNodeIndex_ = 0, b = this.nodeMap_.get(a[0]), b = this.selectMatchingNode_(b)) && (this.matchingLabels_ = a);
    return b
};
goog.ui.tree.TypeAhead.prototype.jumpTo_ = function(a) {
    var b = !1,
        c = this.matchingLabels_;
    if (c) {
        b = null;
        var d = !1;
        if (this.matchingNodes_) {
            var e = this.matchingNodeIndex_ + a;
            0 <= e && e < this.matchingNodes_.length ? (this.matchingNodeIndex_ = e, b = this.matchingNodes_) : d = !0
        }
        b || (e = this.matchingLabelIndex_ + a, 0 <= e && e < c.length && (this.matchingLabelIndex_ = e), c.length > this.matchingLabelIndex_ && (b = this.nodeMap_.get(c[this.matchingLabelIndex_])), b && b.length && d && (this.matchingNodeIndex_ = a == goog.ui.tree.TypeAhead.Offset.UP ? b.length -
            1 : 0));
        if (b = this.selectMatchingNode_(b)) this.matchingLabels_ = c
    }
    return b
};
goog.ui.tree.TypeAhead.prototype.selectMatchingNode_ = function(a) {
    if (a) {
        if (this.matchingNodeIndex_ < a.length) {
            var b = a[this.matchingNodeIndex_];
            this.matchingNodes_ = a
        }
        b && (b.reveal(), b.select())
    }
    return !!b
};
goog.ui.tree.TypeAhead.prototype.clear = function() {
    this.buffer_ = ""
};
goog.ui.tree.TreeControl = function(a, b, c) {
    goog.ui.tree.BaseNode.call(this, a, b, c);
    this.setExpandedInternal(!0);
    this.setSelectedInternal(!0);
    this.selectedItem_ = this;
    this.typeAhead_ = new goog.ui.tree.TypeAhead;
    this.focusHandler_ = this.keyHandler_ = null;
    this.logger_ = goog.log.getLogger("this");
    this.focused_ = !1;
    this.focusedNode_ = null;
    this.showRootLines_ = this.showRootNode_ = this.showExpandIcons_ = this.showLines_ = !0;
    if (goog.userAgent.IE) try {
        document.execCommand("BackgroundImageCache", !1, !0)
    } catch (d) {
        goog.log.warning(this.logger_,
            "Failed to enable background image cache")
    }
};
goog.inherits(goog.ui.tree.TreeControl, goog.ui.tree.BaseNode);
goog.ui.tree.TreeControl.prototype.getTree = function() {
    return this
};
goog.ui.tree.TreeControl.prototype.getDepth = function() {
    return 0
};
goog.ui.tree.TreeControl.prototype.reveal = function() {};
goog.ui.tree.TreeControl.prototype.handleFocus_ = function(a) {
    this.focused_ = !0;
    goog.dom.classlist.add(goog.asserts.assert(this.getElement()), "focused");
    this.selectedItem_ && this.selectedItem_.select()
};
goog.ui.tree.TreeControl.prototype.handleBlur_ = function(a) {
    this.focused_ = !1;
    goog.dom.classlist.remove(goog.asserts.assert(this.getElement()), "focused")
};
goog.ui.tree.TreeControl.prototype.hasFocus = function() {
    return this.focused_
};
goog.ui.tree.TreeControl.prototype.getExpanded = function() {
    return !this.showRootNode_ || goog.ui.tree.TreeControl.superClass_.getExpanded.call(this)
};
goog.ui.tree.TreeControl.prototype.setExpanded = function(a) {
    this.showRootNode_ ? goog.ui.tree.TreeControl.superClass_.setExpanded.call(this, a) : this.setExpandedInternal(a)
};
goog.ui.tree.TreeControl.prototype.getExpandIconSafeHtml = function() {
    return goog.html.SafeHtml.EMPTY
};
goog.ui.tree.TreeControl.prototype.getIconElement = function() {
    var a = this.getRowElement();
    return a ? a.firstChild : null
};
goog.ui.tree.TreeControl.prototype.getExpandIconElement = function() {
    return null
};
goog.ui.tree.TreeControl.prototype.updateExpandIcon = function() {};
goog.ui.tree.TreeControl.prototype.getRowClassName = function() {
    return goog.ui.tree.TreeControl.superClass_.getRowClassName.call(this) + (this.showRootNode_ ? "" : " " + this.getConfig().cssHideRoot)
};
goog.ui.tree.TreeControl.prototype.getCalculatedIconClass = function() {
    var a = this.getExpanded(),
        b = this.getExpandedIconClass();
    if (a && b) return b;
    b = this.getIconClass();
    if (!a && b) return b;
    b = this.getConfig();
    return a && b.cssExpandedRootIcon ? b.cssTreeIcon + " " + b.cssExpandedRootIcon : !a && b.cssCollapsedRootIcon ? b.cssTreeIcon + " " + b.cssCollapsedRootIcon : ""
};
goog.ui.tree.TreeControl.prototype.setSelectedItem = function(a) {
    if (this.selectedItem_ != a) {
        var b = !1;
        this.selectedItem_ && (b = this.selectedItem_ == this.focusedNode_, this.selectedItem_.setSelectedInternal(!1));
        if (this.selectedItem_ = a) a.setSelectedInternal(!0), b && a.select();
        this.dispatchEvent(goog.events.EventType.CHANGE)
    }
};
goog.ui.tree.TreeControl.prototype.getSelectedItem = function() {
    return this.selectedItem_
};
goog.ui.tree.TreeControl.prototype.setShowLines = function(a) {
    this.showLines_ != a && (this.showLines_ = a, this.isInDocument() && this.updateLinesAndExpandIcons_())
};
goog.ui.tree.TreeControl.prototype.getShowLines = function() {
    return this.showLines_
};
goog.ui.tree.TreeControl.prototype.updateLinesAndExpandIcons_ = function() {
    function a(e) {
        var f = e.getChildrenElement();
        if (f) {
            var g = !c || b == e.getParent() && !d ? e.getConfig().cssChildrenNoLines : e.getConfig().cssChildren;
            f.className = g;
            if (f = e.getExpandIconElement()) f.className = e.getExpandIconClass()
        }
        e.forEachChild(a)
    }
    var b = this,
        c = b.getShowLines(),
        d = b.getShowRootLines();
    a(this)
};
goog.ui.tree.TreeControl.prototype.setShowRootLines = function(a) {
    this.showRootLines_ != a && (this.showRootLines_ = a, this.isInDocument() && this.updateLinesAndExpandIcons_())
};
goog.ui.tree.TreeControl.prototype.getShowRootLines = function() {
    return this.showRootLines_
};
goog.ui.tree.TreeControl.prototype.setShowExpandIcons = function(a) {
    this.showExpandIcons_ != a && (this.showExpandIcons_ = a, this.isInDocument() && this.updateLinesAndExpandIcons_())
};
goog.ui.tree.TreeControl.prototype.getShowExpandIcons = function() {
    return this.showExpandIcons_
};
goog.ui.tree.TreeControl.prototype.setShowRootNode = function(a) {
    if (this.showRootNode_ != a) {
        this.showRootNode_ = a;
        if (this.isInDocument()) {
            var b = this.getRowElement();
            b && (b.className = this.getRowClassName())
        }!a && this.getSelectedItem() == this && this.getFirstChild() && this.setSelectedItem(this.getFirstChild())
    }
};
goog.ui.tree.TreeControl.prototype.getShowRootNode = function() {
    return this.showRootNode_
};
goog.ui.tree.TreeControl.prototype.initAccessibility = function() {
    goog.ui.tree.TreeControl.superClass_.initAccessibility.call(this);
    var a = this.getElement();
    goog.asserts.assert(a, "The DOM element for the tree cannot be null.");
    goog.a11y.aria.setRole(a, "tree");
    goog.a11y.aria.setState(a, "labelledby", this.getLabelElement().id)
};
goog.ui.tree.TreeControl.prototype.enterDocument = function() {
    goog.ui.tree.TreeControl.superClass_.enterDocument.call(this);
    var a = this.getElement();
    a.className = this.getConfig().cssRoot;
    a.setAttribute("hideFocus", "true");
    this.attachEvents_();
    this.initAccessibility()
};
goog.ui.tree.TreeControl.prototype.exitDocument = function() {
    goog.ui.tree.TreeControl.superClass_.exitDocument.call(this);
    this.detachEvents_()
};
goog.ui.tree.TreeControl.prototype.attachEvents_ = function() {
    var a = this.getElement();
    a.tabIndex = 0;
    var b = this.keyHandler_ = new goog.events.KeyHandler(a),
        c = this.focusHandler_ = new goog.events.FocusHandler(a);
    this.getHandler().listen(c, goog.events.FocusHandler.EventType.FOCUSOUT, this.handleBlur_).listen(c, goog.events.FocusHandler.EventType.FOCUSIN, this.handleFocus_).listen(b, goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent).listen(a, goog.events.EventType.MOUSEDOWN, this.handleMouseEvent_).listen(a,
        goog.events.EventType.CLICK, this.handleMouseEvent_).listen(a, goog.events.EventType.DBLCLICK, this.handleMouseEvent_)
};
goog.ui.tree.TreeControl.prototype.detachEvents_ = function() {
    this.keyHandler_.dispose();
    this.keyHandler_ = null;
    this.focusHandler_.dispose();
    this.focusHandler_ = null
};
goog.ui.tree.TreeControl.prototype.handleMouseEvent_ = function(a) {
    goog.log.fine(this.logger_, "Received event " + a.type);
    var b = this.getNodeFromEvent_(a);
    if (b) switch (a.type) {
        case goog.events.EventType.MOUSEDOWN:
            b.onMouseDown(a);
            break;
        case goog.events.EventType.CLICK:
            b.onClick_(a);
            break;
        case goog.events.EventType.DBLCLICK:
            b.onDoubleClick_(a)
    }
};
goog.ui.tree.TreeControl.prototype.handleKeyEvent = function(a) {
    var b;
    (b = this.typeAhead_.handleNavigation(a) || this.selectedItem_ && this.selectedItem_.onKeyDown(a) || this.typeAhead_.handleTypeAheadChar(a)) && a.preventDefault();
    return b
};
goog.ui.tree.TreeControl.prototype.getNodeFromEvent_ = function(a) {
    for (var b = a.target; null != b;) {
        if (a = goog.ui.tree.BaseNode.allNodes[b.id]) return a;
        if (b == this.getElement()) break;
        b = b.parentNode
    }
    return null
};
goog.ui.tree.TreeControl.prototype.createNode = function(a) {
    return new goog.ui.tree.TreeNode(a || goog.html.SafeHtml.EMPTY, this.getConfig(), this.getDomHelper())
};
goog.ui.tree.TreeControl.prototype.setNode = function(a) {
    this.typeAhead_.setNodeInMap(a)
};
goog.ui.tree.TreeControl.prototype.removeNode = function(a) {
    this.typeAhead_.removeNodeFromMap(a)
};
goog.ui.tree.TreeControl.prototype.clearTypeAhead = function() {
    this.typeAhead_.clear()
};
goog.ui.tree.TreeControl.defaultConfig = goog.ui.tree.BaseNode.defaultConfig;
/*

 Visual Blocks Editor

 Copyright 2013 Google Inc.
 https://developers.google.com/blockly/

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
var Blockly = {
    Blocks: {}
};
/*

 Visual Blocks Editor

 Copyright 2012 Google Inc.
 https://developers.google.com/blockly/

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
Blockly.Workspace = function(a) {
    this.id = Blockly.genUid();
    Blockly.Workspace.WorkspaceDB_[this.id] = this;
    this.options = a || {};
    this.RTL = !!this.options.RTL;
    this.topBlocks_ = []
};
Blockly.Workspace.prototype.rendered = !1;
Blockly.Workspace.prototype.dispose = function() {
    this.clear();
    delete Blockly.Workspace.WorkspaceDB_[this.id]
};
Blockly.Workspace.SCAN_ANGLE = 3;
Blockly.Workspace.prototype.addTopBlock = function(a) {
    this.topBlocks_.push(a);
    this.fireChangeEvent()
};
Blockly.Workspace.prototype.removeTopBlock = function(a) {
    for (var b = !1, c, d = 0; c = this.topBlocks_[d]; d++)
        if (c == a) {
            this.topBlocks_.splice(d, 1);
            b = !0;
            break
        }
    if (!b) throw "Block not present in workspace's list of top-most blocks.";
    this.fireChangeEvent()
};
Blockly.Workspace.prototype.getTopBlocks = function(a) {
    var b = [].concat(this.topBlocks_);
    if (a && 1 < b.length) {
        var c = Math.sin(goog.math.toRadians(Blockly.Workspace.SCAN_ANGLE));
        this.RTL && (c *= -1);
        b.sort(function(a, b) {
            var d = a.getRelativeToSurfaceXY(),
                e = b.getRelativeToSurfaceXY();
            return d.y + c * d.x - (e.y + c * e.x)
        })
    }
    return b
};
Blockly.Workspace.prototype.getAllBlocks = function() {
    for (var a = this.getTopBlocks(!1), b = 0; b < a.length; b++) a.push.apply(a, a[b].getChildren());
    return a
};
Blockly.Workspace.prototype.clear = function() {
    for (; this.topBlocks_.length;) this.topBlocks_[0].dispose()
};
Blockly.Workspace.prototype.getWidth = function() {
    return 0
};
Blockly.Workspace.prototype.newBlock = function(a, b) {
    return new Blockly.Block(this, a, b)
};
Blockly.Workspace.prototype.getBlockById = function(a) {
    for (var b = this.getAllBlocks(), c = 0, d; d = b[c]; c++)
        if (d.id == a) return d;
    return null
};
Blockly.Workspace.prototype.remainingCapacity = function() {
    return isNaN(this.options.maxBlocks) ? Infinity : this.options.maxBlocks - this.getAllBlocks().length
};
Blockly.Workspace.prototype.fireChangeEvent = function() {};
Blockly.Workspace.WorkspaceDB_ = Object.create(null);
Blockly.Workspace.getById = function(a) {
    return Blockly.Workspace.WorkspaceDB_[a] || null
};
Blockly.Workspace.prototype.clear = Blockly.Workspace.prototype.clear;
Blockly.Bubble = function(a, b, c, d, e, f, g) {
    this.workspace_ = a;
    this.content_ = b;
    this.shape_ = c;
    c = Blockly.Bubble.ARROW_ANGLE;
    this.workspace_.RTL && (c = -c);
    this.arrow_radians_ = goog.math.toRadians(c);
    a.getBubbleCanvas().appendChild(this.createDom_(b, !(!f || !g)));
    this.setAnchorLocation(d, e);
    f && g || (b = this.content_.getBBox(), f = b.width + 2 * Blockly.Bubble.BORDER_WIDTH, g = b.height + 2 * Blockly.Bubble.BORDER_WIDTH);
    this.setBubbleSize(f, g);
    this.positionBubble_();
    this.renderArrow_();
    this.rendered_ = !0;
    a.options.readOnly || (Blockly.bindEvent_(this.bubbleBack_,
        "mousedown", this, this.bubbleMouseDown_), this.resizeGroup_ && Blockly.bindEvent_(this.resizeGroup_, "mousedown", this, this.resizeMouseDown_))
};
Blockly.Bubble.BORDER_WIDTH = 6;
Blockly.Bubble.ARROW_THICKNESS = 10;
Blockly.Bubble.ARROW_ANGLE = 20;
Blockly.Bubble.ARROW_BEND = 4;
Blockly.Bubble.ANCHOR_RADIUS = 8;
Blockly.Bubble.onMouseUpWrapper_ = null;
Blockly.Bubble.onMouseMoveWrapper_ = null;
Blockly.Bubble.unbindDragEvents_ = function() {
    Blockly.Bubble.onMouseUpWrapper_ && (Blockly.unbindEvent_(Blockly.Bubble.onMouseUpWrapper_), Blockly.Bubble.onMouseUpWrapper_ = null);
    Blockly.Bubble.onMouseMoveWrapper_ && (Blockly.unbindEvent_(Blockly.Bubble.onMouseMoveWrapper_), Blockly.Bubble.onMouseMoveWrapper_ = null)
};
Blockly.Bubble.prototype.rendered_ = !1;
Blockly.Bubble.prototype.anchorX_ = 0;
Blockly.Bubble.prototype.anchorY_ = 0;
Blockly.Bubble.prototype.relativeLeft_ = 0;
Blockly.Bubble.prototype.relativeTop_ = 0;
Blockly.Bubble.prototype.width_ = 0;
Blockly.Bubble.prototype.height_ = 0;
Blockly.Bubble.prototype.autoLayout_ = !0;
Blockly.Bubble.prototype.createDom_ = function(a, b) {
    this.bubbleGroup_ = Blockly.createSvgElement("g", {}, null);
    var c = {
        filter: "url(#" + this.workspace_.options.embossFilterId + ")"
    }; - 1 != goog.userAgent.getUserAgentString().indexOf("JavaFX") && (c = {});
    c = Blockly.createSvgElement("g", c, this.bubbleGroup_);
    this.bubbleArrow_ = Blockly.createSvgElement("path", {}, c);
    this.bubbleBack_ = Blockly.createSvgElement("rect", {
        "class": "blocklyDraggable",
        x: 0,
        y: 0,
        rx: Blockly.Bubble.BORDER_WIDTH,
        ry: Blockly.Bubble.BORDER_WIDTH
    }, c);
    b ? (this.resizeGroup_ =
        Blockly.createSvgElement("g", {
            "class": this.workspace_.RTL ? "blocklyResizeSW" : "blocklyResizeSE"
        }, this.bubbleGroup_), c = 2 * Blockly.Bubble.BORDER_WIDTH, Blockly.createSvgElement("polygon", {
            points: "0,x x,x x,0".replace(/x/g, c.toString())
        }, this.resizeGroup_), Blockly.createSvgElement("line", {
            "class": "blocklyResizeLine",
            x1: c / 3,
            y1: c - 1,
            x2: c - 1,
            y2: c / 3
        }, this.resizeGroup_), Blockly.createSvgElement("line", {
            "class": "blocklyResizeLine",
            x1: 2 * c / 3,
            y1: c - 1,
            x2: c - 1,
            y2: 2 * c / 3
        }, this.resizeGroup_)) : this.resizeGroup_ = null;
    this.bubbleGroup_.appendChild(a);
    return this.bubbleGroup_
};
Blockly.Bubble.prototype.bubbleMouseDown_ = function(a) {
    this.promote_();
    Blockly.Bubble.unbindDragEvents_();
    Blockly.isRightButton(a) ? a.stopPropagation() : Blockly.isTargetInput_(a) || (Blockly.Css.setCursor(Blockly.Css.Cursor.CLOSED), this.workspace_.startDrag(a, this.workspace_.RTL ? -this.relativeLeft_ : this.relativeLeft_, this.relativeTop_), Blockly.Bubble.onMouseUpWrapper_ = Blockly.bindEvent_(document, "mouseup", this, Blockly.Bubble.unbindDragEvents_), Blockly.Bubble.onMouseMoveWrapper_ = Blockly.bindEvent_(document,
        "mousemove", this, this.bubbleMouseMove_), Blockly.hideChaff(), a.stopPropagation())
};
Blockly.Bubble.prototype.bubbleMouseMove_ = function(a) {
    this.autoLayout_ = !1;
    a = this.workspace_.moveDrag(a);
    this.relativeLeft_ = this.workspace_.RTL ? -a.x : a.x;
    this.relativeTop_ = a.y;
    this.positionBubble_();
    this.renderArrow_()
};
Blockly.Bubble.prototype.resizeMouseDown_ = function(a) {
    this.promote_();
    Blockly.Bubble.unbindDragEvents_();
    Blockly.isRightButton(a) || (Blockly.Css.setCursor(Blockly.Css.Cursor.CLOSED), this.workspace_.startDrag(a, this.workspace_.RTL ? -this.width_ : this.width_, this.height_), Blockly.Bubble.onMouseUpWrapper_ = Blockly.bindEvent_(document, "mouseup", this, Blockly.Bubble.unbindDragEvents_), Blockly.Bubble.onMouseMoveWrapper_ = Blockly.bindEvent_(document, "mousemove", this, this.resizeMouseMove_), Blockly.hideChaff());
    a.stopPropagation()
};
Blockly.Bubble.prototype.resizeMouseMove_ = function(a) {
    this.autoLayout_ = !1;
    a = this.workspace_.moveDrag(a);
    this.setBubbleSize(this.workspace_.RTL ? -a.x : a.x, a.y);
    this.workspace_.RTL && this.positionBubble_()
};
Blockly.Bubble.prototype.registerResizeEvent = function(a, b) {
    Blockly.bindEvent_(this.bubbleGroup_, "resize", a, b)
};
Blockly.Bubble.prototype.promote_ = function() {
    this.bubbleGroup_.parentNode.appendChild(this.bubbleGroup_)
};
Blockly.Bubble.prototype.setAnchorLocation = function(a, b) {
    this.anchorX_ = a;
    this.anchorY_ = b;
    this.rendered_ && this.positionBubble_()
};
Blockly.Bubble.prototype.layoutBubble_ = function() {
    var a = -this.width_ / 4,
        b = -this.height_ - Blockly.BlockSvg.MIN_BLOCK_Y,
        c = this.workspace_.getMetrics();
    c.viewWidth /= this.workspace_.scale;
    c.viewLeft /= this.workspace_.scale;
    this.workspace_.RTL ? this.anchorX_ - c.viewLeft - a - this.width_ < Blockly.Scrollbar.scrollbarThickness ? a = this.anchorX_ - c.viewLeft - this.width_ - Blockly.Scrollbar.scrollbarThickness : this.anchorX_ - c.viewLeft - a > c.viewWidth && (a = this.anchorX_ - c.viewLeft - c.viewWidth) : this.anchorX_ + a < c.viewLeft ? a = c.viewLeft -
        this.anchorX_ : c.viewLeft + c.viewWidth < this.anchorX_ + a + this.width_ + Blockly.BlockSvg.SEP_SPACE_X + Blockly.Scrollbar.scrollbarThickness && (a = c.viewLeft + c.viewWidth - this.anchorX_ - this.width_ - Blockly.Scrollbar.scrollbarThickness);
    this.anchorY_ + b < c.viewTop && (b = this.shape_.getBBox().height);
    this.relativeLeft_ = a;
    this.relativeTop_ = b
};
Blockly.Bubble.prototype.positionBubble_ = function() {
    this.bubbleGroup_.setAttribute("transform", "translate(" + (this.workspace_.RTL ? this.anchorX_ - this.relativeLeft_ - this.width_ : this.anchorX_ + this.relativeLeft_) + "," + (this.relativeTop_ + this.anchorY_) + ")")
};
Blockly.Bubble.prototype.getBubbleSize = function() {
    return {
        width: this.width_,
        height: this.height_
    }
};
Blockly.Bubble.prototype.setBubbleSize = function(a, b) {
    var c = 2 * Blockly.Bubble.BORDER_WIDTH;
    a = Math.max(a, c + 45);
    b = Math.max(b, c + 20);
    this.width_ = a;
    this.height_ = b;
    this.bubbleBack_.setAttribute("width", a);
    this.bubbleBack_.setAttribute("height", b);
    this.resizeGroup_ && (this.workspace_.RTL ? this.resizeGroup_.setAttribute("transform", "translate(" + 2 * Blockly.Bubble.BORDER_WIDTH + "," + (b - c) + ") scale(-1 1)") : this.resizeGroup_.setAttribute("transform", "translate(" + (a - c) + "," + (b - c) + ")"));
    this.rendered_ && (this.autoLayout_ &&
        this.layoutBubble_(), this.positionBubble_(), this.renderArrow_());
    Blockly.fireUiEvent(this.bubbleGroup_, "resize")
};
Blockly.Bubble.prototype.renderArrow_ = function() {
    var a = [],
        b = this.width_ / 2,
        c = this.height_ / 2,
        d = -this.relativeLeft_,
        e = -this.relativeTop_;
    if (b == d && c == e) a.push("M " + b + "," + c);
    else {
        e -= c;
        d -= b;
        this.workspace_.RTL && (d *= -1);
        var f = Math.sqrt(e * e + d * d),
            g = Math.acos(d / f);
        0 > e && (g = 2 * Math.PI - g);
        var h = g + Math.PI / 2;
        h > 2 * Math.PI && (h -= 2 * Math.PI);
        var k = Math.sin(h),
            l = Math.cos(h),
            p = this.getBubbleSize();
        h = (p.width + p.height) / Blockly.Bubble.ARROW_THICKNESS;
        h = Math.min(h, p.width, p.height) / 2;
        p = 1 - Blockly.Bubble.ANCHOR_RADIUS / f;
        d = b +
            p * d;
        e = c + p * e;
        p = b + h * l;
        var m = c + h * k;
        b -= h * l;
        c -= h * k;
        k = g + this.arrow_radians_;
        k > 2 * Math.PI && (k -= 2 * Math.PI);
        g = Math.sin(k) * f / Blockly.Bubble.ARROW_BEND;
        f = Math.cos(k) * f / Blockly.Bubble.ARROW_BEND;
        a.push("M" + p + "," + m);
        a.push("C" + (p + f) + "," + (m + g) + " " + d + "," + e + " " + d + "," + e);
        a.push("C" + d + "," + e + " " + (b + f) + "," + (c + g) + " " + b + "," + c)
    }
    a.push("z");
    this.bubbleArrow_.setAttribute("d", a.join(" "))
};
Blockly.Bubble.prototype.setColour = function(a) {
    this.bubbleBack_.setAttribute("fill", a);
    this.bubbleArrow_.setAttribute("fill", a)
};
Blockly.Bubble.prototype.dispose = function() {
    Blockly.Bubble.unbindDragEvents_();
    goog.dom.removeNode(this.bubbleGroup_);
    this.shape_ = this.content_ = this.workspace_ = this.resizeGroup_ = this.bubbleBack_ = this.bubbleArrow_ = this.bubbleGroup_ = null
};
Blockly.Icon = function(a) {
    this.block_ = a
};
Blockly.Icon.prototype.collapseHidden = !0;
Blockly.Icon.prototype.SIZE = 17;
Blockly.Icon.prototype.bubble_ = null;
Blockly.Icon.prototype.iconX_ = 0;
Blockly.Icon.prototype.iconY_ = 0;
Blockly.Icon.prototype.createIcon = function() {
    this.iconGroup_ || (this.iconGroup_ = Blockly.createSvgElement("g", {
        "class": "blocklyIconGroup"
    }, null), this.drawIcon_(this.iconGroup_), this.block_.getSvgRoot().appendChild(this.iconGroup_), Blockly.bindEvent_(this.iconGroup_, "mouseup", this, this.iconClick_), this.updateEditable())
};
Blockly.Icon.prototype.dispose = function() {
    goog.dom.removeNode(this.iconGroup_);
    this.iconGroup_ = null;
    this.setVisible(!1);
    this.block_ = null
};
Blockly.Icon.prototype.updateEditable = function() {
    this.block_.isInFlyout || !this.block_.isEditable() ? Blockly.addClass_(this.iconGroup_, "blocklyIconGroupReadonly") : Blockly.removeClass_(this.iconGroup_, "blocklyIconGroupReadonly")
};
Blockly.Icon.prototype.isVisible = function() {
    return !!this.bubble_
};
Blockly.Icon.prototype.iconClick_ = function(a) {
    2 != Blockly.dragMode_ && (this.block_.isInFlyout || Blockly.isRightButton(a) || this.setVisible(!this.isVisible()))
};
Blockly.Icon.prototype.updateColour = function() {
    this.isVisible() && this.bubble_.setColour(this.block_.getColour())
};
Blockly.Icon.prototype.renderIcon = function(a) {
    if (this.collapseHidden && this.block_.isCollapsed()) return this.iconGroup_.setAttribute("display", "none"), a;
    this.iconGroup_.setAttribute("display", "block");
    var b = this.SIZE;
    this.block_.RTL && (a -= b);
    this.iconGroup_.setAttribute("transform", "translate(" + a + ",5)");
    this.computeIconLocation();
    return a = this.block_.RTL ? a - Blockly.BlockSvg.SEP_SPACE_X : a + (b + Blockly.BlockSvg.SEP_SPACE_X)
};
Blockly.Icon.prototype.setIconLocation = function(a, b) {
    this.iconX_ = a;
    this.iconY_ = b;
    this.isVisible() && this.bubble_.setAnchorLocation(a, b)
};
Blockly.Icon.prototype.computeIconLocation = function() {
    var a = this.block_.getRelativeToSurfaceXY(),
        b = Blockly.getRelativeXY_(this.iconGroup_),
        c = a.x + b.x + this.SIZE / 2;
    a = a.y + b.y + this.SIZE / 2;
    c === this.iconX_ && a === this.iconY_ || this.setIconLocation(c, a)
};
Blockly.Icon.prototype.getIconLocation = function() {
    return {
        x: this.iconX_,
        y: this.iconY_
    }
};
/*

 Visual Blocks Editor

 Copyright 2011 Google Inc.
 https://developers.google.com/blockly/

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
Blockly.Comment = function(a) {
    Blockly.Comment.superClass_.constructor.call(this, a);
    this.createIcon()
};
goog.inherits(Blockly.Comment, Blockly.Icon);
Blockly.Comment.prototype.text_ = "";
Blockly.Comment.prototype.width_ = 160;
Blockly.Comment.prototype.height_ = 80;
Blockly.Comment.prototype.drawIcon_ = function(a) {
    Blockly.createSvgElement("circle", {
        "class": "blocklyIconShape",
        r: "8",
        cx: "8",
        cy: "8"
    }, a);
    Blockly.createSvgElement("path", {
        "class": "blocklyIconSymbol",
        d: "m6.8,10h2c0.003,-0.617 0.271,-0.962 0.633,-1.266 2.875,-2.405 0.607,-5.534 -3.765,-3.874v1.7c3.12,-1.657 3.698,0.118 2.336,1.25 -1.201,0.998 -1.201,1.528 -1.204,2.19z"
    }, a);
    Blockly.createSvgElement("rect", {
        "class": "blocklyIconSymbol",
        x: "6.8",
        y: "10.78",
        height: "2",
        width: "2"
    }, a)
};
Blockly.Comment.prototype.createEditor_ = function() {
    this.foreignObject_ = Blockly.createSvgElement("foreignObject", {
        x: Blockly.Bubble.BORDER_WIDTH,
        y: Blockly.Bubble.BORDER_WIDTH
    }, null);
    var a = document.createElementNS(Blockly.HTML_NS, "body");
    a.setAttribute("xmlns", Blockly.HTML_NS);
    a.className = "blocklyMinimalBody";
    this.textarea_ = document.createElementNS(Blockly.HTML_NS, "textarea");
    this.textarea_.className = "blocklyCommentTextarea";
    this.textarea_.setAttribute("dir", this.block_.RTL ? "RTL" : "LTR");
    a.appendChild(this.textarea_);
    this.foreignObject_.appendChild(a);
    Blockly.bindEvent_(this.textarea_, "mouseup", this, this.textareaFocus_);
    Blockly.bindEvent_(this.textarea_, "wheel", this, function(a) {
        a.stopPropagation()
    });
    return this.foreignObject_
};
Blockly.Comment.prototype.updateEditable = function() {
    this.isVisible() && (this.setVisible(!1), this.setVisible(!0));
    Blockly.Icon.prototype.updateEditable.call(this)
};
Blockly.Comment.prototype.resizeBubble_ = function() {
    var a = this.bubble_.getBubbleSize(),
        b = 2 * Blockly.Bubble.BORDER_WIDTH;
    this.foreignObject_.setAttribute("width", a.width - b);
    this.foreignObject_.setAttribute("height", a.height - b);
    this.textarea_.style.width = a.width - b - 4 + "px";
    this.textarea_.style.height = a.height - b - 4 + "px"
};
Blockly.Comment.prototype.setVisible = function(a) {
    if (a != this.isVisible())
        if (!this.block_.isEditable() && !this.textarea_ || goog.userAgent.IE) Blockly.Warning.prototype.setVisible.call(this, a);
        else {
            var b = this.getText(),
                c = this.getBubbleSize();
            a ? (this.bubble_ = new Blockly.Bubble(this.block_.workspace, this.createEditor_(), this.block_.svgPath_, this.iconX_, this.iconY_, this.width_, this.height_), this.bubble_.registerResizeEvent(this, this.resizeBubble_), this.updateColour(), this.text_ = null) : (this.bubble_.dispose(),
                this.foreignObject_ = this.textarea_ = this.bubble_ = null);
            this.setText(b);
            this.setBubbleSize(c.width, c.height)
        }
};
Blockly.Comment.prototype.textareaFocus_ = function(a) {
    this.bubble_.promote_();
    this.textarea_.focus()
};
Blockly.Comment.prototype.getBubbleSize = function() {
    return this.isVisible() ? this.bubble_.getBubbleSize() : {
        width: this.width_,
        height: this.height_
    }
};
Blockly.Comment.prototype.setBubbleSize = function(a, b) {
    this.textarea_ ? this.bubble_.setBubbleSize(a, b) : (this.width_ = a, this.height_ = b)
};
Blockly.Comment.prototype.getText = function() {
    return this.textarea_ ? this.textarea_.value : this.text_
};
Blockly.Comment.prototype.setText = function(a) {
    this.textarea_ ? this.textarea_.value = a : this.text_ = a
};
Blockly.Comment.prototype.dispose = function() {
    this.block_.comment = null;
    Blockly.Icon.prototype.dispose.call(this)
};
Blockly.Connection = function(a, b) {
    this.sourceBlock_ = a;
    this.type = b;
    a.workspace.connectionDBList && (this.db_ = a.workspace.connectionDBList[b], this.dbOpposite_ = a.workspace.connectionDBList[Blockly.OPPOSITE_TYPE[b]], this.hidden_ = !this.db_)
};
Blockly.Connection.prototype.targetConnection = null;
Blockly.Connection.prototype.check_ = null;
Blockly.Connection.prototype.shadowDom_ = null;
Blockly.Connection.prototype.x_ = 0;
Blockly.Connection.prototype.y_ = 0;
Blockly.Connection.prototype.inDB_ = !1;
Blockly.Connection.prototype.db_ = null;
Blockly.Connection.prototype.dbOpposite_ = null;
Blockly.Connection.prototype.hidden_ = null;
Blockly.Connection.prototype.dispose = function() {
    if (this.targetConnection) throw "Disconnect connection before disposing of it.";
    this.inDB_ && this.db_.removeConnection_(this);
    Blockly.highlightedConnection_ == this && (Blockly.highlightedConnection_ = null);
    Blockly.localConnection_ == this && (Blockly.localConnection_ = null);
    this.dbOpposite_ = this.db_ = null
};
Blockly.Connection.prototype.isSuperior = function() {
    return this.type == Blockly.INPUT_VALUE || this.type == Blockly.NEXT_STATEMENT
};
Blockly.Connection.prototype.connect = function(a) {
    if (this.sourceBlock_ == a.sourceBlock_) throw "Attempted to connect a block to itself.";
    if (this.sourceBlock_.workspace !== a.sourceBlock_.workspace) throw "Blocks are on different workspaces.";
    if (Blockly.OPPOSITE_TYPE[this.type] != a.type) throw "Attempt to connect incompatible types.";
    if (this.type == Blockly.INPUT_VALUE || this.type == Blockly.OUTPUT_VALUE) {
        if (this.targetConnection) throw "Source connection already connected (value).";
        if (a.targetConnection) {
            var b = a.targetBlock();
            b.setParent(null);
            if (b.isShadow()) b.dispose();
            else {
                if (!b.outputConnection) throw "Orphan block does not have an output connection.";
                for (var c = this.sourceBlock_, d; d = Blockly.Connection.singleConnection_(c, b);)
                    if (c = d.targetBlock(), !c || c.isShadow()) {
                        b.outputConnection.connect(d);
                        b = null;
                        break
                    }
                b && setTimeout(function() {
                    b.outputConnection.bumpAwayFrom_(a)
                }, Blockly.BUMP_DELAY)
            }
        }
    } else {
        if (this.targetConnection) throw "Source connection already connected (block).";
        if (a.targetConnection) {
            if (this.type != Blockly.PREVIOUS_STATEMENT) throw "Can only do a mid-stack connection with the top of a block.";
            b = a.targetBlock();
            b.setParent(null);
            if (!b.previousConnection) throw "Orphan block does not have a previous connection.";
            for (c = this.sourceBlock_; c.nextConnection;)
                if (c.nextConnection.targetConnection) c = c.getNextBlock();
                else {
                    b.previousConnection.checkType_(c.nextConnection) && (c.nextConnection.connect(b.previousConnection), b = null);
                    break
                }
            b && setTimeout(function() {
                b.previousConnection.bumpAwayFrom_(a)
            }, Blockly.BUMP_DELAY)
        }
    }
    this.isSuperior() ? (c = this.sourceBlock_, d = a.sourceBlock_) : (c = a.sourceBlock_, d = this.sourceBlock_);
    this.targetConnection = a;
    a.targetConnection = this;
    d.setParent(c);
    c.rendered && c.updateDisabled();
    d.rendered && d.updateDisabled();
    c.rendered && d.rendered && (this.type == Blockly.NEXT_STATEMENT || this.type == Blockly.PREVIOUS_STATEMENT ? d.render() : c.render())
};
Blockly.Connection.singleConnection_ = function(a, b) {
    for (var c = !1, d = 0; d < a.inputList.length; d++) {
        var e = a.inputList[d].connection;
        if (e && e.type == Blockly.INPUT_VALUE && b.outputConnection.checkType_(e)) {
            if (c) return null;
            c = e
        }
    }
    return c
};
Blockly.Connection.prototype.disconnect = function() {
    var a = this.targetConnection;
    if (!a) throw "Source connection not connected.";
    if (a.targetConnection != this) throw "Target connection not connected to source connection.";
    this.targetConnection = a.targetConnection = null;
    if (this.isSuperior()) {
        var b = this.sourceBlock_;
        var c = a.sourceBlock_;
        a = this
    } else b = a.sourceBlock_, c = this.sourceBlock_;
    var d = a.getShadowDom();
    if (b.workspace && !c.isShadow() && d) {
        d = Blockly.Xml.domToBlock(b.workspace, d);
        if (d.outputConnection) a.connect(d.outputConnection);
        else if (d.previousConnection) a.connect(d.previousConnection);
        else throw "Child block does not have output or previous statement.";
        d.initSvg();
        d.render(!1)
    }
    b.rendered && b.render();
    c.rendered && (c.updateDisabled(), c.render())
};
Blockly.Connection.prototype.targetBlock = function() {
    return this.targetConnection ? this.targetConnection.sourceBlock_ : null
};
Blockly.Connection.prototype.bumpAwayFrom_ = function(a) {
    if (0 == Blockly.dragMode_) {
        var b = this.sourceBlock_.getRootBlock();
        if (!b.isInFlyout) {
            var c = !1;
            if (!b.isMovable()) {
                b = a.sourceBlock_.getRootBlock();
                if (!b.isMovable()) return;
                a = this;
                c = !0
            }
            b.getSvgRoot().parentNode.appendChild(b.getSvgRoot());
            var d = a.x_ + Blockly.SNAP_RADIUS - this.x_;
            a = a.y_ + Blockly.SNAP_RADIUS - this.y_;
            c && (a = -a);
            b.RTL && (d = -d);
            b.moveBy(d, a)
        }
    }
};
Blockly.Connection.prototype.moveTo = function(a, b) {
    this.inDB_ && this.db_.removeConnection_(this);
    this.x_ = a;
    this.y_ = b;
    this.hidden_ || this.db_.addConnection_(this)
};
Blockly.Connection.prototype.moveBy = function(a, b) {
    this.moveTo(this.x_ + a, this.y_ + b)
};
Blockly.Connection.prototype.highlight = function() {
    if (this.type == Blockly.INPUT_VALUE || this.type == Blockly.OUTPUT_VALUE) {
        var a = this.sourceBlock_.RTL ? -Blockly.BlockSvg.TAB_WIDTH : Blockly.BlockSvg.TAB_WIDTH;
        a = "m 0,0 v 5 c 0,10 " + -a + ",-8 " + -a + ",7.5 s " + a + ",-2.5 " + a + ",7.5 v 5"
    } else a = this.sourceBlock_.RTL ? "m 20,0 h -5 " + Blockly.BlockSvg.NOTCH_PATH_RIGHT + " h -5" : "m -20,0 h 5 " + Blockly.BlockSvg.NOTCH_PATH_LEFT + " h 5";
    var b = this.sourceBlock_.getRelativeToSurfaceXY();
    Blockly.Connection.highlightedPath_ = Blockly.createSvgElement("path", {
        "class": "blocklyHighlightedConnectionPath",
        d: a,
        transform: "translate(" + (this.x_ - b.x) + "," + (this.y_ - b.y) + ")"
    }, this.sourceBlock_.getSvgRoot())
};
Blockly.Connection.prototype.unhighlight = function() {
    goog.dom.removeNode(Blockly.Connection.highlightedPath_);
    delete Blockly.Connection.highlightedPath_
};
Blockly.Connection.prototype.tighten_ = function() {
    var a = this.targetConnection.x_ - this.x_,
        b = this.targetConnection.y_ - this.y_;
    if (0 != a || 0 != b) {
        var c = this.targetBlock(),
            d = c.getSvgRoot();
        if (!d) throw "block is not rendered.";
        d = Blockly.getRelativeXY_(d);
        c.getSvgRoot().setAttribute("transform", "translate(" + (d.x - a) + "," + (d.y - b) + ")");
        c.moveConnections_(-a, -b)
    }
};
Blockly.Connection.prototype.closest = function(a, b, c) {
    function d(b) {
        b = e[b];
        if ((b.type == Blockly.OUTPUT_VALUE || b.type == Blockly.PREVIOUS_STATEMENT) && b.targetConnection || b.type == Blockly.INPUT_VALUE && b.targetConnection && !b.targetBlock().isMovable() && !b.targetBlock().isShadow() || !p.checkType_(b)) return !0;
        var c = b.sourceBlock_;
        do {
            if (l == c) return !0;
            c = c.getParent()
        } while (c);
        var d = f - b.x_;
        c = g - b.y_;
        d = Math.sqrt(d * d + c * c);
        d <= a && (k = b, a = d);
        return Math.abs(c) < a
    }
    if (this.targetConnection) return {
        connection: null,
        radius: a
    };
    var e = this.dbOpposite_,
        f = this.x_ + b,
        g = this.y_ + c;
    b = 0;
    for (var h = c = e.length - 2; b < h;) e[h].y_ < g ? b = h : c = h, h = Math.floor((b + c) / 2);
    c = b = h;
    var k = null,
        l = this.sourceBlock_,
        p = this;
    if (e.length) {
        for (; 0 <= b && d(b);) b--;
        do c++; while (c < e.length && d(c))
    }
    return {
        connection: k,
        radius: a
    }
};
Blockly.Connection.prototype.checkType_ = function(a) {
    var b = this.targetBlock();
    if (b && !b.isMovable() && !this.sourceBlock_.isMovable() || (b = a.targetBlock()) && !b.isMovable() && !a.sourceBlock_.isMovable()) return !1;
    if (!this.check_ || !a.check_) return !0;
    for (b = 0; b < this.check_.length; b++)
        if (-1 != a.check_.indexOf(this.check_[b])) return !0;
    return !1
};
Blockly.Connection.prototype.setCheck = function(a) {
    a ? (goog.isArray(a) || (a = [a]), this.check_ = a, this.targetConnection && !this.checkType_(this.targetConnection) && (this.isSuperior() ? this.targetBlock().setParent(null) : this.sourceBlock_.setParent(null), this.sourceBlock_.bumpNeighbours_())) : this.check_ = null;
    return this
};
Blockly.Connection.prototype.setShadowDom = function(a) {
    this.shadowDom_ = a
};
Blockly.Connection.prototype.getShadowDom = function() {
    return this.shadowDom_
};
Blockly.Connection.prototype.neighbours_ = function(a) {
    function b(b) {
        var f = d - c[b].x_,
            g = e - c[b].y_;
        Math.sqrt(f * f + g * g) <= a && k.push(c[b]);
        return g < a
    }
    for (var c = this.dbOpposite_, d = this.x_, e = this.y_, f = 0, g = c.length - 2, h = g; f < h;) c[h].y_ < e ? f = h : g = h, h = Math.floor((f + g) / 2);
    g = f = h;
    var k = [];
    if (c.length) {
        for (; 0 <= f && b(f);) f--;
        do g++; while (g < c.length && b(g))
    }
    return k
};
Blockly.Connection.prototype.setHidden = function(a) {
    (this.hidden_ = a) && this.inDB_ ? this.db_.removeConnection_(this) : a || this.inDB_ || this.db_.addConnection_(this)
};
Blockly.Connection.prototype.hideAll = function() {
    this.setHidden(!0);
    if (this.targetConnection)
        for (var a = this.targetBlock().getDescendants(), b = 0; b < a.length; b++) {
            for (var c = a[b], d = c.getConnections_(!0), e = 0; e < d.length; e++) d[e].setHidden(!0);
            c = c.getIcons();
            for (d = 0; d < c.length; d++) c[d].setVisible(!1)
        }
};
Blockly.Connection.prototype.unhideAll = function() {
    this.setHidden(!1);
    var a = [];
    if (this.type != Blockly.INPUT_VALUE && this.type != Blockly.NEXT_STATEMENT) return a;
    var b = this.targetBlock();
    if (b) {
        if (b.isCollapsed()) {
            var c = [];
            b.outputConnection && c.push(b.outputConnection);
            b.nextConnection && c.push(b.nextConnection);
            b.previousConnection && c.push(b.previousConnection)
        } else c = b.getConnections_(!0);
        for (var d = 0; d < c.length; d++) a.push.apply(a, c[d].unhideAll());
        0 == a.length && (a[0] = b)
    }
    return a
};
Blockly.ConnectionDB = function() {};
Blockly.ConnectionDB.prototype = [];
Blockly.ConnectionDB.constructor = Blockly.ConnectionDB;
Blockly.ConnectionDB.prototype.addConnection_ = function(a) {
    if (a.inDB_) throw "Connection already in database.";
    if (!a.sourceBlock_.isInFlyout) {
        for (var b = 0, c = this.length; b < c;) {
            var d = Math.floor((b + c) / 2);
            if (this[d].y_ < a.y_) b = d + 1;
            else if (this[d].y_ > a.y_) c = d;
            else {
                b = d;
                break
            }
        }
        this.splice(b, 0, a);
        a.inDB_ = !0
    }
};
Blockly.ConnectionDB.prototype.removeConnection_ = function(a) {
    if (!a.inDB_) throw "Connection not in database.";
    a.inDB_ = !1;
    for (var b = 0, c = this.length - 2, d = c; b < d;) this[d].y_ < a.y_ ? b = d : c = d, d = Math.floor((b + c) / 2);
    for (c = b = d; 0 <= b && this[b].y_ == a.y_;) {
        if (this[b] == a) {
            this.splice(b, 1);
            return
        }
        b--
    }
    do {
        if (this[c] == a) {
            this.splice(c, 1);
            return
        }
        c++
    } while (c < this.length && this[c].y_ == a.y_);
    throw "Unable to find connection in connectionDB.";
};
Blockly.ConnectionDB.init = function(a) {
    var b = [];
    b[Blockly.INPUT_VALUE] = new Blockly.ConnectionDB;
    b[Blockly.OUTPUT_VALUE] = new Blockly.ConnectionDB;
    b[Blockly.NEXT_STATEMENT] = new Blockly.ConnectionDB;
    b[Blockly.PREVIOUS_STATEMENT] = new Blockly.ConnectionDB;
    a.connectionDBList = b
};
Blockly.Field = function(a) {
    this.size_ = new goog.math.Size(0, 25);
    this.setText(a)
};
Blockly.Field.cacheWidths_ = null;
Blockly.Field.cacheReference_ = 0;
Blockly.Field.prototype.maxDisplayLength = 50;
Blockly.Field.prototype.sourceBlock_ = null;
Blockly.Field.prototype.visible_ = !0;
Blockly.Field.prototype.changeHandler_ = null;
Blockly.Field.NBSP = "\u00a0";
Blockly.Field.prototype.EDITABLE = !0;
Blockly.Field.prototype.init = function(a) {
    this.sourceBlock_ || (this.sourceBlock_ = a, this.fieldGroup_ = Blockly.createSvgElement("g", {}, null), this.visible_ || (this.fieldGroup_.style.display = "none"), this.borderRect_ = Blockly.createSvgElement("rect", {
            rx: 4,
            ry: 4,
            x: -Blockly.BlockSvg.SEP_SPACE_X / 2,
            y: 0,
            height: 16
        }, this.fieldGroup_, this.sourceBlock_.workspace), this.textElement_ = Blockly.createSvgElement("text", {
            "class": "blocklyText",
            y: this.size_.height - 12.5
        }, this.fieldGroup_), this.updateEditable(), a.getSvgRoot().appendChild(this.fieldGroup_),
        this.mouseUpWrapper_ = Blockly.bindEvent_(this.fieldGroup_, "mouseup", this, this.onMouseUp_), this.updateTextNode_())
};
Blockly.Field.prototype.dispose = function() {
    this.mouseUpWrapper_ && (Blockly.unbindEvent_(this.mouseUpWrapper_), this.mouseUpWrapper_ = null);
    this.sourceBlock_ = null;
    goog.dom.removeNode(this.fieldGroup_);
    this.changeHandler_ = this.borderRect_ = this.textElement_ = this.fieldGroup_ = null
};
Blockly.Field.prototype.updateEditable = function() {
    this.EDITABLE && this.sourceBlock_ && (this.sourceBlock_.isEditable() ? (Blockly.addClass_(this.fieldGroup_, "blocklyEditableText"), Blockly.removeClass_(this.fieldGroup_, "blocklyNoNEditableText"), this.fieldGroup_.style.cursor = this.CURSOR) : (Blockly.addClass_(this.fieldGroup_, "blocklyNonEditableText"), Blockly.removeClass_(this.fieldGroup_, "blocklyEditableText"), this.fieldGroup_.style.cursor = ""))
};
Blockly.Field.prototype.isVisible = function() {
    return this.visible_
};
Blockly.Field.prototype.setVisible = function(a) {
    if (this.visible_ != a) {
        this.visible_ = a;
        var b = this.getSvgRoot();
        b && (b.style.display = a ? "block" : "none", this.render_())
    }
};
Blockly.Field.prototype.setChangeHandler = function(a) {
    this.changeHandler_ = a
};
Blockly.Field.prototype.getSvgRoot = function() {
    return this.fieldGroup_
};
Blockly.Field.prototype.render_ = function() {
    if (this.visible_ && this.textElement_) {
        var a = this.textElement_.textContent + "\n" + this.textElement_.className.baseVal;
        if (Blockly.Field.cacheWidths_ && Blockly.Field.cacheWidths_[a]) var b = Blockly.Field.cacheWidths_[a];
        else {
            try {
                b = this.textElement_.getComputedTextLength()
            } catch (c) {
                b = 8 * this.textElement_.textContent.length
            }
            Blockly.Field.cacheWidths_ && (Blockly.Field.cacheWidths_[a] = b)
        }
        this.borderRect_ && this.borderRect_.setAttribute("width", b + Blockly.BlockSvg.SEP_SPACE_X)
    } else b =
        0;
    this.size_.width = b
};
Blockly.Field.startCache = function() {
    Blockly.Field.cacheReference_++;
    Blockly.Field.cacheWidths_ || (Blockly.Field.cacheWidths_ = {})
};
Blockly.Field.stopCache = function() {
    Blockly.Field.cacheReference_--;
    Blockly.Field.cacheReference_ || (Blockly.Field.cacheWidths_ = null)
};
Blockly.Field.prototype.getSize = function() {
    this.size_.width || this.render_();
    return this.size_
};
Blockly.Field.prototype.getScaledBBox_ = function() {
    var a = this.borderRect_.getBBox();
    return new goog.math.Size(a.width * this.sourceBlock_.workspace.scale, a.height * this.sourceBlock_.workspace.scale)
};
Blockly.Field.prototype.getText = function() {
    return this.text_
};
Blockly.Field.prototype.setText = function(a) {
    null !== a && (a = String(a), a !== this.text_ && (this.text_ = a, this.updateTextNode_(), this.sourceBlock_ && this.sourceBlock_.rendered && (this.sourceBlock_.render(), this.sourceBlock_.bumpNeighbours_(), this.sourceBlock_.workspace.fireChangeEvent())))
};
Blockly.Field.prototype.updateTextNode_ = function() {
    if (this.textElement_) {
        var a = this.text_;
        a.length > this.maxDisplayLength && (a = a.substring(0, this.maxDisplayLength - 2) + "\u2026");
        goog.dom.removeChildren(this.textElement_);
        a = a.replace(/\s/g, Blockly.Field.NBSP);
        this.sourceBlock_.RTL && a && (a += "\u200f");
        a || (a = Blockly.Field.NBSP);
        a = document.createTextNode(a);
        this.textElement_.appendChild(a);
        this.size_.width = 0
    }
};
Blockly.Field.prototype.getValue = function() {
    return this.getText()
};
Blockly.Field.prototype.setValue = function(a) {
    this.setText(a)
};
Blockly.Field.prototype.onMouseUp_ = function(a) {
    if (!goog.userAgent.IPHONE && !goog.userAgent.IPAD || goog.userAgent.isVersionOrHigher("537.51.2") || 0 === a.layerX || 0 === a.layerY) Blockly.isRightButton(a) || 2 != Blockly.dragMode_ && this.sourceBlock_.isEditable() && this.showEditor_()
};
Blockly.Field.prototype.setTooltip = function(a) {};
Blockly.Field.prototype.getAbsoluteXY_ = function() {
    return goog.style.getPageOffset(this.borderRect_)
};
Blockly.Tooltip = {};
Blockly.Tooltip.visible = !1;
Blockly.Tooltip.LIMIT = 50;
Blockly.Tooltip.mouseOutPid_ = 0;
Blockly.Tooltip.showPid_ = 0;
Blockly.Tooltip.lastX_ = 0;
Blockly.Tooltip.lastY_ = 0;
Blockly.Tooltip.element_ = null;
Blockly.Tooltip.poisonedElement_ = null;
Blockly.Tooltip.OFFSET_X = 0;
Blockly.Tooltip.OFFSET_Y = 10;
Blockly.Tooltip.RADIUS_OK = 10;
Blockly.Tooltip.HOVER_MS = 1E3;
Blockly.Tooltip.MARGINS = 5;
Blockly.Tooltip.DIV = null;
Blockly.Tooltip.createDom = function() {
    Blockly.Tooltip.DIV || (Blockly.Tooltip.DIV = goog.dom.createDom("div", "blocklyTooltipDiv"), document.body.appendChild(Blockly.Tooltip.DIV))
};
Blockly.Tooltip.bindMouseEvents = function(a) {
    Blockly.bindEvent_(a, "mouseover", null, Blockly.Tooltip.onMouseOver_);
    Blockly.bindEvent_(a, "mouseout", null, Blockly.Tooltip.onMouseOut_);
    Blockly.bindEvent_(a, "mousemove", null, Blockly.Tooltip.onMouseMove_)
};
Blockly.Tooltip.onMouseOver_ = function(a) {
    for (a = a.target; !goog.isString(a.tooltip) && !goog.isFunction(a.tooltip);) a = a.tooltip;
    Blockly.Tooltip.element_ != a && (Blockly.Tooltip.hide(), Blockly.Tooltip.poisonedElement_ = null, Blockly.Tooltip.element_ = a);
    clearTimeout(Blockly.Tooltip.mouseOutPid_)
};
Blockly.Tooltip.onMouseOut_ = function(a) {
    Blockly.Tooltip.mouseOutPid_ = setTimeout(function() {
        Blockly.Tooltip.element_ = null;
        Blockly.Tooltip.poisonedElement_ = null;
        Blockly.Tooltip.hide()
    }, 1);
    clearTimeout(Blockly.Tooltip.showPid_)
};
Blockly.Tooltip.onMouseMove_ = function(a) {
    if (Blockly.Tooltip.element_ && Blockly.Tooltip.element_.tooltip && 0 == Blockly.dragMode_ && !Blockly.WidgetDiv.isVisible())
        if (Blockly.Tooltip.visible) {
            var b = Blockly.Tooltip.lastX_ - a.pageX;
            a = Blockly.Tooltip.lastY_ - a.pageY;
            Math.sqrt(b * b + a * a) > Blockly.Tooltip.RADIUS_OK && Blockly.Tooltip.hide()
        } else Blockly.Tooltip.poisonedElement_ != Blockly.Tooltip.element_ && (clearTimeout(Blockly.Tooltip.showPid_), Blockly.Tooltip.lastX_ = a.pageX, Blockly.Tooltip.lastY_ = a.pageY, Blockly.Tooltip.showPid_ =
            setTimeout(Blockly.Tooltip.show_, Blockly.Tooltip.HOVER_MS))
};
Blockly.Tooltip.hide = function() {
    Blockly.Tooltip.visible && (Blockly.Tooltip.visible = !1, Blockly.Tooltip.DIV && (Blockly.Tooltip.DIV.style.display = "none"));
    clearTimeout(Blockly.Tooltip.showPid_)
};
Blockly.Tooltip.show_ = function() {
    Blockly.Tooltip.poisonedElement_ = Blockly.Tooltip.element_;
    if (Blockly.Tooltip.DIV) {
        goog.dom.removeChildren(Blockly.Tooltip.DIV);
        var a = Blockly.Tooltip.element_.tooltip;
        goog.isFunction(a) && (a = a());
        a = Blockly.Tooltip.wrap_(a, Blockly.Tooltip.LIMIT);
        a = a.split("\n");
        for (var b = 0; b < a.length; b++) {
            var c = document.createElement("div");
            c.appendChild(document.createTextNode(a[b]));
            Blockly.Tooltip.DIV.appendChild(c)
        }
        a = Blockly.Tooltip.element_.RTL;
        b = goog.dom.getViewportSize();
        Blockly.Tooltip.DIV.style.direction =
            a ? "rtl" : "ltr";
        Blockly.Tooltip.DIV.style.display = "block";
        Blockly.Tooltip.visible = !0;
        c = Blockly.Tooltip.lastX_;
        c = a ? c - (Blockly.Tooltip.OFFSET_X + Blockly.Tooltip.DIV.offsetWidth) : c + Blockly.Tooltip.OFFSET_X;
        var d = Blockly.Tooltip.lastY_ + Blockly.Tooltip.OFFSET_Y;
        d + Blockly.Tooltip.DIV.offsetHeight > b.height + window.scrollY && (d -= Blockly.Tooltip.DIV.offsetHeight + 2 * Blockly.Tooltip.OFFSET_Y);
        a ? c = Math.max(Blockly.Tooltip.MARGINS - window.scrollX, c) : c + Blockly.Tooltip.DIV.offsetWidth > b.width + window.scrollX - 2 * Blockly.Tooltip.MARGINS &&
            (c = b.width - Blockly.Tooltip.DIV.offsetWidth - 2 * Blockly.Tooltip.MARGINS);
        Blockly.Tooltip.DIV.style.top = d + "px";
        Blockly.Tooltip.DIV.style.left = c + "px"
    }
};
Blockly.Tooltip.wrap_ = function(a, b) {
    if (a.length <= b) return a;
    for (var c = a.trim().split(/\s+/), d = 0; d < c.length; d++) c[d].length > b && (b = c[d].length);
    d = -Infinity;
    var e = 1;
    do {
        var f = d;
        var g = a;
        var h = [],
            k = c.length / e,
            l = 1;
        for (d = 0; d < c.length - 1; d++) l < (d + 1.5) / k ? (l++, h[d] = !0) : h[d] = !1;
        h = Blockly.Tooltip.wrapMutate_(c, h, b);
        d = Blockly.Tooltip.wrapScore_(c, h, b);
        a = Blockly.Tooltip.wrapToText_(c, h);
        e++
    } while (d > f);
    return g
};
Blockly.Tooltip.wrapScore_ = function(a, b, c) {
    for (var d = [0], e = [], f = 0; f < a.length; f++) d[d.length - 1] += a[f].length, !0 === b[f] ? (d.push(0), e.push(a[f].charAt(a[f].length - 1))) : !1 === b[f] && d[d.length - 1]++;
    a = Math.max.apply(Math, d);
    for (f = b = 0; f < d.length; f++) b -= 2 * Math.pow(Math.abs(c - d[f]), 1.5), b -= Math.pow(a - d[f], 1.5), -1 != ".?!".indexOf(e[f]) ? b += c / 3 : -1 != ",;)]}".indexOf(e[f]) && (b += c / 4);
    1 < d.length && d[d.length - 1] <= d[d.length - 2] && (b += .5);
    return b
};
Blockly.Tooltip.wrapMutate_ = function(a, b, c) {
    for (var d = Blockly.Tooltip.wrapScore_(a, b, c), e, f = 0; f < b.length - 1; f++)
        if (b[f] != b[f + 1]) {
            var g = [].concat(b);
            g[f] = !g[f];
            g[f + 1] = !g[f + 1];
            var h = Blockly.Tooltip.wrapScore_(a, g, c);
            h > d && (d = h, e = g)
        }
    return e ? Blockly.Tooltip.wrapMutate_(a, e, c) : b
};
Blockly.Tooltip.wrapToText_ = function(a, b) {
    for (var c = [], d = 0; d < a.length; d++) c.push(a[d]), void 0 !== b[d] && c.push(b[d] ? "\n" : " ");
    return c.join("")
};
Blockly.FieldLabel = function(a, b) {
    this.size_ = new goog.math.Size(0, 17.5);
    this.class_ = b;
    this.setText(a)
};
goog.inherits(Blockly.FieldLabel, Blockly.Field);
Blockly.FieldLabel.prototype.EDITABLE = !1;
Blockly.FieldLabel.prototype.init = function(a) {
    this.sourceBlock_ || (this.sourceBlock_ = a, this.textElement_ = Blockly.createSvgElement("text", {
        "class": "blocklyText",
        y: this.size_.height - 5
    }, null), this.class_ && Blockly.addClass_(this.textElement_, this.class_), this.visible_ || (this.textElement_.style.display = "none"), a.getSvgRoot().appendChild(this.textElement_), this.textElement_.tooltip = this.sourceBlock_, Blockly.Tooltip.bindMouseEvents(this.textElement_), this.updateTextNode_())
};
Blockly.FieldLabel.prototype.dispose = function() {
    goog.dom.removeNode(this.textElement_);
    this.textElement_ = null
};
Blockly.FieldLabel.prototype.getSvgRoot = function() {
    return this.textElement_
};
Blockly.FieldLabel.prototype.setTooltip = function(a) {
    this.textElement_.tooltip = a
};
Blockly.Input = function(a, b, c, d) {
    this.type = a;
    this.name = b;
    this.sourceBlock_ = c;
    this.connection = d;
    this.fieldRow = []
};
Blockly.Input.prototype.align = Blockly.ALIGN_LEFT;
Blockly.Input.prototype.visible_ = !0;
Blockly.Input.prototype.appendField = function(a, b) {
    if (!a && !b) return this;
    goog.isString(a) && (a = new Blockly.FieldLabel(a));
    this.sourceBlock_.rendered && a.init(this.sourceBlock_);
    a.name = b;
    a.prefixField && this.appendField(a.prefixField);
    this.fieldRow.push(a);
    a.suffixField && this.appendField(a.suffixField);
    this.sourceBlock_.rendered && (this.sourceBlock_.render(), this.sourceBlock_.bumpNeighbours_());
    return this
};
Blockly.Input.prototype.appendTitle = function(a, b) {
    console.warn("Deprecated call to appendTitle, use appendField instead.");
    return this.appendField(a, b)
};
Blockly.Input.prototype.removeField = function(a) {
    for (var b = 0, c; c = this.fieldRow[b]; b++)
        if (c.name === a) {
            c.dispose();
            this.fieldRow.splice(b, 1);
            this.sourceBlock_.rendered && (this.sourceBlock_.render(), this.sourceBlock_.bumpNeighbours_());
            return
        }
    goog.asserts.fail('Field "%s" not found.', a)
};
Blockly.Input.prototype.isVisible = function() {
    return this.visible_
};
Blockly.Input.prototype.setVisible = function(a) {
    var b = [];
    if (this.visible_ == a) return b;
    for (var c = (this.visible_ = a) ? "block" : "none", d = 0, e; e = this.fieldRow[d]; d++) e.setVisible(a);
    this.connection && (a ? b = this.connection.unhideAll() : this.connection.hideAll(), d = this.connection.targetBlock()) && (d.getSvgRoot().style.display = c, a || (d.rendered = !1));
    return b
};
Blockly.Input.prototype.setCheck = function(a) {
    if (!this.connection) throw "This input does not have a connection.";
    this.connection.setCheck(a);
    return this
};
Blockly.Input.prototype.setAlign = function(a) {
    this.align = a;
    this.sourceBlock_.rendered && this.sourceBlock_.render();
    return this
};
Blockly.Input.prototype.init = function() {
    if (this.sourceBlock_.workspace.rendered)
        for (var a = 0; a < this.fieldRow.length; a++) this.fieldRow[a].init(this.sourceBlock_)
};
Blockly.Input.prototype.dispose = function() {
    for (var a = 0, b; b = this.fieldRow[a]; a++) b.dispose();
    this.connection && this.connection.dispose();
    this.sourceBlock_ = null
};
Blockly.ScrollbarPair = function(a) {
    this.workspace_ = a;
    this.hScroll = new Blockly.Scrollbar(a, !0, !0);
    this.vScroll = new Blockly.Scrollbar(a, !1, !0);
    this.corner_ = Blockly.createSvgElement("rect", {
        height: Blockly.Scrollbar.scrollbarThickness,
        width: Blockly.Scrollbar.scrollbarThickness,
        "class": "blocklyScrollbarBackground"
    }, null);
    Blockly.Scrollbar.insertAfter_(this.corner_, a.getBubbleCanvas())
};
Blockly.ScrollbarPair.prototype.oldHostMetrics_ = null;
Blockly.ScrollbarPair.prototype.dispose = function() {
    goog.dom.removeNode(this.corner_);
    this.oldHostMetrics_ = this.workspace_ = this.corner_ = null;
    this.hScroll.dispose();
    this.hScroll = null;
    this.vScroll.dispose();
    this.vScroll = null
};
Blockly.ScrollbarPair.prototype.resize = function() {
    var a = this.workspace_.getMetrics();
    if (a) {
        var b = !1,
            c = !1;
        this.oldHostMetrics_ && this.oldHostMetrics_.viewWidth == a.viewWidth && this.oldHostMetrics_.viewHeight == a.viewHeight && this.oldHostMetrics_.absoluteTop == a.absoluteTop && this.oldHostMetrics_.absoluteLeft == a.absoluteLeft ? (this.oldHostMetrics_ && this.oldHostMetrics_.contentWidth == a.contentWidth && this.oldHostMetrics_.viewLeft == a.viewLeft && this.oldHostMetrics_.contentLeft == a.contentLeft || (b = !0), this.oldHostMetrics_ &&
            this.oldHostMetrics_.contentHeight == a.contentHeight && this.oldHostMetrics_.viewTop == a.viewTop && this.oldHostMetrics_.contentTop == a.contentTop || (c = !0)) : c = b = !0;
        b && this.hScroll.resize(a);
        c && this.vScroll.resize(a);
        this.oldHostMetrics_ && this.oldHostMetrics_.viewWidth == a.viewWidth && this.oldHostMetrics_.absoluteLeft == a.absoluteLeft || this.corner_.setAttribute("x", this.vScroll.xCoordinate);
        this.oldHostMetrics_ && this.oldHostMetrics_.viewHeight == a.viewHeight && this.oldHostMetrics_.absoluteTop == a.absoluteTop || this.corner_.setAttribute("y",
            this.hScroll.yCoordinate);
        this.oldHostMetrics_ = a
    }
};
Blockly.ScrollbarPair.prototype.set = function(a, b) {
    this.hScroll.set(a);
    this.vScroll.set(b)
};
Blockly.Scrollbar = function(a, b, c) {
    this.workspace_ = a;
    this.pair_ = c || !1;
    this.horizontal_ = b;
    this.createDom_();
    b ? (this.svgBackground_.setAttribute("height", Blockly.Scrollbar.scrollbarThickness), this.svgKnob_.setAttribute("height", Blockly.Scrollbar.scrollbarThickness - 5), this.svgKnob_.setAttribute("y", 2.5)) : (this.svgBackground_.setAttribute("width", Blockly.Scrollbar.scrollbarThickness), this.svgKnob_.setAttribute("width", Blockly.Scrollbar.scrollbarThickness - 5), this.svgKnob_.setAttribute("x", 2.5));
    this.onMouseDownBarWrapper_ =
        Blockly.bindEvent_(this.svgBackground_, "mousedown", this, this.onMouseDownBar_);
    this.onMouseDownKnobWrapper_ = Blockly.bindEvent_(this.svgKnob_, "mousedown", this, this.onMouseDownKnob_)
};
Blockly.Scrollbar.scrollbarThickness = 15;
goog.events.BrowserFeature.TOUCH_ENABLED && (Blockly.Scrollbar.scrollbarThickness = 25);
Blockly.Scrollbar.prototype.dispose = function() {
    this.onMouseUpKnob_();
    Blockly.unbindEvent_(this.onMouseDownBarWrapper_);
    this.onMouseDownBarWrapper_ = null;
    Blockly.unbindEvent_(this.onMouseDownKnobWrapper_);
    this.onMouseDownKnobWrapper_ = null;
    goog.dom.removeNode(this.svgGroup_);
    this.workspace_ = this.svgKnob_ = this.svgBackground_ = this.svgGroup_ = null
};
Blockly.Scrollbar.prototype.resize = function(a) {
    if (!a && (a = this.workspace_.getMetrics(), !a)) return;
    if (this.horizontal_) {
        var b = a.viewWidth - 1;
        this.pair_ ? b -= Blockly.Scrollbar.scrollbarThickness : this.setVisible(b < a.contentWidth);
        this.ratio_ = b / a.contentWidth;
        if (-Infinity === this.ratio_ || Infinity === this.ratio_ || isNaN(this.ratio_)) this.ratio_ = 0;
        var c = a.viewWidth * this.ratio_,
            d = (a.viewLeft - a.contentLeft) * this.ratio_;
        this.svgKnob_.setAttribute("width", Math.max(0, c));
        this.xCoordinate = a.absoluteLeft + .5;
        this.pair_ &&
            this.workspace_.RTL && (this.xCoordinate += a.absoluteLeft + Blockly.Scrollbar.scrollbarThickness);
        this.yCoordinate = a.absoluteTop + a.viewHeight - Blockly.Scrollbar.scrollbarThickness - .5;
        this.svgGroup_.setAttribute("transform", "translate(" + this.xCoordinate + "," + this.yCoordinate + ")");
        this.svgBackground_.setAttribute("width", Math.max(0, b));
        this.svgKnob_.setAttribute("x", this.constrainKnob_(d))
    } else {
        b = a.viewHeight - 1;
        this.pair_ ? b -= Blockly.Scrollbar.scrollbarThickness : this.setVisible(b < a.contentHeight);
        this.ratio_ =
            b / a.contentHeight;
        if (-Infinity === this.ratio_ || Infinity === this.ratio_ || isNaN(this.ratio_)) this.ratio_ = 0;
        c = a.viewHeight * this.ratio_;
        d = (a.viewTop - a.contentTop) * this.ratio_;
        this.svgKnob_.setAttribute("height", Math.max(0, c));
        this.xCoordinate = a.absoluteLeft + .5;
        this.workspace_.RTL || (this.xCoordinate += a.viewWidth - Blockly.Scrollbar.scrollbarThickness - 1);
        this.yCoordinate = a.absoluteTop + .5;
        this.svgGroup_.setAttribute("transform", "translate(" + this.xCoordinate + "," + this.yCoordinate + ")");
        this.svgBackground_.setAttribute("height",
            Math.max(0, b));
        this.svgKnob_.setAttribute("y", this.constrainKnob_(d))
    }
    this.onScroll_()
};
Blockly.Scrollbar.prototype.createDom_ = function() {
    this.svgGroup_ = Blockly.createSvgElement("g", {
        "class": "blocklyScrollbar" + (this.horizontal_ ? "Horizontal" : "Vertical")
    }, null);
    this.svgBackground_ = Blockly.createSvgElement("rect", {
        "class": "blocklyScrollbarBackground"
    }, this.svgGroup_);
    var a = Math.floor((Blockly.Scrollbar.scrollbarThickness - 5) / 2);
    this.svgKnob_ = Blockly.createSvgElement("rect", {
        "class": "blocklyScrollbarKnob",
        rx: a,
        ry: a
    }, this.svgGroup_);
    Blockly.Scrollbar.insertAfter_(this.svgGroup_, this.workspace_.getBubbleCanvas())
};
Blockly.Scrollbar.prototype.isVisible = function() {
    return "none" != this.svgGroup_.getAttribute("display")
};
Blockly.Scrollbar.prototype.setVisible = function(a) {
    if (a != this.isVisible()) {
        if (this.pair_) throw "Unable to toggle visibility of paired scrollbars.";
        a ? this.svgGroup_.setAttribute("display", "block") : (this.workspace_.setMetrics({
            x: 0,
            y: 0
        }), this.svgGroup_.setAttribute("display", "none"))
    }
};
Blockly.Scrollbar.prototype.onMouseDownBar_ = function(a) {
    this.onMouseUpKnob_();
    if (!Blockly.isRightButton(a)) {
        var b = Blockly.mouseToSvg(a, this.workspace_.getParentSvg());
        b = this.horizontal_ ? b.x : b.y;
        var c = Blockly.getSvgXY_(this.svgKnob_, this.workspace_);
        c = this.horizontal_ ? c.x : c.y;
        var d = parseFloat(this.svgKnob_.getAttribute(this.horizontal_ ? "width" : "height")),
            e = parseFloat(this.svgKnob_.getAttribute(this.horizontal_ ? "x" : "y")),
            f = .95 * d;
        b <= c ? e -= f : b >= c + d && (e += f);
        this.svgKnob_.setAttribute(this.horizontal_ ? "x" :
            "y", this.constrainKnob_(e));
        this.onScroll_()
    }
    a.stopPropagation()
};
Blockly.Scrollbar.prototype.onMouseDownKnob_ = function(a) {
    this.onMouseUpKnob_();
    Blockly.isRightButton(a) || (this.startDragKnob = parseFloat(this.svgKnob_.getAttribute(this.horizontal_ ? "x" : "y")), this.startDragMouse = this.horizontal_ ? a.clientX : a.clientY, Blockly.Scrollbar.onMouseUpWrapper_ = Blockly.bindEvent_(document, "mouseup", this, this.onMouseUpKnob_), Blockly.Scrollbar.onMouseMoveWrapper_ = Blockly.bindEvent_(document, "mousemove", this, this.onMouseMoveKnob_));
    a.stopPropagation()
};
Blockly.Scrollbar.prototype.onMouseMoveKnob_ = function(a) {
    this.svgKnob_.setAttribute(this.horizontal_ ? "x" : "y", this.constrainKnob_(this.startDragKnob + ((this.horizontal_ ? a.clientX : a.clientY) - this.startDragMouse)));
    this.onScroll_()
};
Blockly.Scrollbar.prototype.onMouseUpKnob_ = function() {
    Blockly.removeAllRanges();
    Blockly.hideChaff(!0);
    Blockly.Scrollbar.onMouseUpWrapper_ && (Blockly.unbindEvent_(Blockly.Scrollbar.onMouseUpWrapper_), Blockly.Scrollbar.onMouseUpWrapper_ = null);
    Blockly.Scrollbar.onMouseMoveWrapper_ && (Blockly.unbindEvent_(Blockly.Scrollbar.onMouseMoveWrapper_), Blockly.Scrollbar.onMouseMoveWrapper_ = null)
};
Blockly.Scrollbar.prototype.constrainKnob_ = function(a) {
    if (0 >= a || isNaN(a)) a = 0;
    else {
        var b = this.horizontal_ ? "width" : "height",
            c = parseFloat(this.svgBackground_.getAttribute(b));
        b = parseFloat(this.svgKnob_.getAttribute(b));
        a = Math.min(a, c - b)
    }
    return a
};
Blockly.Scrollbar.prototype.onScroll_ = function() {
    var a = parseFloat(this.svgKnob_.getAttribute(this.horizontal_ ? "x" : "y")),
        b = parseFloat(this.svgBackground_.getAttribute(this.horizontal_ ? "width" : "height"));
    a /= b;
    isNaN(a) && (a = 0);
    b = {};
    this.horizontal_ ? b.x = a : b.y = a;
    this.workspace_.setMetrics(b)
};
Blockly.Scrollbar.prototype.set = function(a) {
    this.svgKnob_.setAttribute(this.horizontal_ ? "x" : "y", a * this.ratio_);
    this.onScroll_()
};
Blockly.Scrollbar.insertAfter_ = function(a, b) {
    var c = b.nextSibling,
        d = b.parentNode;
    if (!d) throw "Reference node has no parent.";
    c ? d.insertBefore(a, c) : d.appendChild(a)
};
Blockly.Trashcan = function(a) {
    this.workspace_ = a
};
Blockly.Trashcan.prototype.WIDTH_ = 47;
Blockly.Trashcan.prototype.BODY_HEIGHT_ = 44;
Blockly.Trashcan.prototype.LID_HEIGHT_ = 16;
Blockly.Trashcan.prototype.MARGIN_BOTTOM_ = 20;
Blockly.Trashcan.prototype.MARGIN_SIDE_ = 20;
Blockly.Trashcan.prototype.MARGIN_HOTSPOT_ = 25;
Blockly.Trashcan.prototype.isOpen = !1;
Blockly.Trashcan.prototype.svgGroup_ = null;
Blockly.Trashcan.prototype.svgLid_ = null;
Blockly.Trashcan.prototype.lidTask_ = 0;
Blockly.Trashcan.prototype.lidOpen_ = 0;
Blockly.Trashcan.prototype.left_ = 0;
Blockly.Trashcan.prototype.top_ = 0;
Blockly.Trashcan.prototype.createDom = function() {
    this.svgGroup_ = Blockly.createSvgElement("g", {
        "class": "blocklyTrash"
    }, null);
    var a = String(Math.random()).substring(2),
        b = Blockly.createSvgElement("clipPath", {
            id: "blocklyTrashBodyClipPath" + a
        }, this.svgGroup_);
    Blockly.createSvgElement("rect", {
        width: this.WIDTH_,
        height: this.BODY_HEIGHT_,
        y: this.LID_HEIGHT_
    }, b);
    Blockly.createSvgElement("image", {
        width: Blockly.SPRITE.width,
        height: Blockly.SPRITE.height,
        y: -32,
        "clip-path": "url(#blocklyTrashBodyClipPath" + a + ")"
    }, this.svgGroup_).setAttributeNS("http://www.w3.org/1999/xlink",
        "xlink:href", this.workspace_.options.pathToMedia + Blockly.SPRITE.url);
    b = Blockly.createSvgElement("clipPath", {
        id: "blocklyTrashLidClipPath" + a
    }, this.svgGroup_);
    Blockly.createSvgElement("rect", {
        width: this.WIDTH_,
        height: this.LID_HEIGHT_
    }, b);
    this.svgLid_ = Blockly.createSvgElement("image", {
        width: Blockly.SPRITE.width,
        height: Blockly.SPRITE.height,
        y: -32,
        "clip-path": "url(#blocklyTrashLidClipPath" + a + ")"
    }, this.svgGroup_);
    this.svgLid_.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", this.workspace_.options.pathToMedia +
        Blockly.SPRITE.url);
    Blockly.bindEvent_(this.svgGroup_, "mouseup", this, this.click);
    this.animateLid_();
    return this.svgGroup_
};
Blockly.Trashcan.prototype.init = function(a) {
    this.bottom_ = this.MARGIN_BOTTOM_ + a;
    this.setOpen_(!1);
    return this.bottom_ + this.BODY_HEIGHT_ + this.LID_HEIGHT_
};
Blockly.Trashcan.prototype.dispose = function() {
    this.svgGroup_ && (goog.dom.removeNode(this.svgGroup_), this.svgGroup_ = null);
    this.workspace_ = this.svgLid_ = null;
    goog.Timer.clear(this.lidTask_)
};
Blockly.Trashcan.prototype.position = function() {
    var a = this.workspace_.getMetrics();
    a && (this.left_ = this.workspace_.RTL ? this.MARGIN_SIDE_ + Blockly.Scrollbar.scrollbarThickness : a.viewWidth + a.absoluteLeft - this.WIDTH_ - this.MARGIN_SIDE_ - Blockly.Scrollbar.scrollbarThickness, this.top_ = a.viewHeight + a.absoluteTop - (this.BODY_HEIGHT_ + this.LID_HEIGHT_) - this.bottom_, this.svgGroup_.setAttribute("transform", "translate(" + this.left_ + "," + this.top_ + ")"))
};
Blockly.Trashcan.prototype.getRect = function() {
    var a = Blockly.getSvgXY_(this.svgGroup_, this.workspace_);
    return new goog.math.Rect(a.x - this.MARGIN_HOTSPOT_, a.y - this.MARGIN_HOTSPOT_, this.WIDTH_ + 2 * this.MARGIN_HOTSPOT_, this.BODY_HEIGHT_ + this.LID_HEIGHT_ + 2 * this.MARGIN_HOTSPOT_)
};
Blockly.Trashcan.prototype.setOpen_ = function(a) {
    this.isOpen != a && (goog.Timer.clear(this.lidTask_), this.isOpen = a, this.animateLid_())
};
Blockly.Trashcan.prototype.animateLid_ = function() {
    this.lidOpen_ += this.isOpen ? .2 : -.2;
    this.lidOpen_ = goog.math.clamp(this.lidOpen_, 0, 1);
    var a = 45 * this.lidOpen_;
    this.svgLid_.setAttribute("transform", "rotate(" + (this.workspace_.RTL ? -a : a) + "," + (this.workspace_.RTL ? 4 : this.WIDTH_ - 4) + "," + (this.LID_HEIGHT_ - 2) + ")");
    a = goog.math.lerp(.4, .8, this.lidOpen_);
    this.svgGroup_.style.opacity = a;
    0 < this.lidOpen_ && 1 > this.lidOpen_ && (this.lidTask_ = goog.Timer.callOnce(this.animateLid_, 20, this))
};
Blockly.Trashcan.prototype.close = function() {
    this.setOpen_(!1)
};
Blockly.Trashcan.prototype.click = function() {
    var a = this.workspace_.startScrollX - this.workspace_.scrollX,
        b = this.workspace_.startScrollY - this.workspace_.scrollY;
    Math.sqrt(a * a + b * b) > Blockly.DRAG_RADIUS || console.log("TODO: Inspect trash.")
};
/*

 Visual Blocks Editor

 Copyright 2015 Google Inc.
 https://developers.google.com/blockly/

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
Blockly.ZoomControls = function(a) {
    this.workspace_ = a
};
Blockly.ZoomControls.prototype.WIDTH_ = 32;
Blockly.ZoomControls.prototype.HEIGHT_ = 110;
Blockly.ZoomControls.prototype.MARGIN_BOTTOM_ = 20;
Blockly.ZoomControls.prototype.MARGIN_SIDE_ = 20;
Blockly.ZoomControls.prototype.svgGroup_ = null;
Blockly.ZoomControls.prototype.left_ = 0;
Blockly.ZoomControls.prototype.top_ = 0;
Blockly.ZoomControls.prototype.createDom = function() {
    var a = this.workspace_;
    this.svgGroup_ = Blockly.createSvgElement("g", {
        "class": "blocklyZoom"
    }, null);
    var b = String(Math.random()).substring(2),
        c = Blockly.createSvgElement("clipPath", {
            id: "blocklyZoomoutClipPath" + b
        }, this.svgGroup_);
    Blockly.createSvgElement("rect", {
        width: 32,
        height: 32,
        y: 77
    }, c);
    var d = Blockly.createSvgElement("image", {
        width: Blockly.SPRITE.width,
        height: Blockly.SPRITE.height,
        x: -64,
        y: -15,
        "clip-path": "url(#blocklyZoomoutClipPath" + b + ")"
    }, this.svgGroup_);
    d.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a.options.pathToMedia + Blockly.SPRITE.url);
    c = Blockly.createSvgElement("clipPath", {
        id: "blocklyZoominClipPath" + b
    }, this.svgGroup_);
    Blockly.createSvgElement("rect", {
        width: 32,
        height: 32,
        y: 43
    }, c);
    var e = Blockly.createSvgElement("image", {
        width: Blockly.SPRITE.width,
        height: Blockly.SPRITE.height,
        x: -32,
        y: -49,
        "clip-path": "url(#blocklyZoominClipPath" + b + ")"
    }, this.svgGroup_);
    e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a.options.pathToMedia +
        Blockly.SPRITE.url);
    c = Blockly.createSvgElement("clipPath", {
        id: "blocklyZoomresetClipPath" + b
    }, this.svgGroup_);
    Blockly.createSvgElement("rect", {
        width: 32,
        height: 32
    }, c);
    b = Blockly.createSvgElement("image", {
        width: Blockly.SPRITE.width,
        height: Blockly.SPRITE.height,
        y: -92,
        "clip-path": "url(#blocklyZoomresetClipPath" + b + ")"
    }, this.svgGroup_);
    b.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a.options.pathToMedia + Blockly.SPRITE.url);
    Blockly.bindEvent_(b, "mousedown", a, a.zoomReset);
    Blockly.bindEvent_(e,
        "mousedown", null,
        function(b) {
            a.zoomCenter(1);
            b.stopPropagation()
        });
    Blockly.bindEvent_(d, "mousedown", null, function(b) {
        a.zoomCenter(-1);
        b.stopPropagation()
    });
    return this.svgGroup_
};
Blockly.ZoomControls.prototype.init = function(a) {
    this.bottom_ = this.MARGIN_BOTTOM_ + a;
    return this.bottom_ + this.HEIGHT_
};
Blockly.ZoomControls.prototype.dispose = function() {
    this.svgGroup_ && (goog.dom.removeNode(this.svgGroup_), this.svgGroup_ = null);
    this.workspace_ = null
};
Blockly.ZoomControls.prototype.position = function() {
    var a = this.workspace_.getMetrics();
    a && (this.left_ = this.workspace_.RTL ? this.MARGIN_SIDE_ + Blockly.Scrollbar.scrollbarThickness : a.viewWidth + a.absoluteLeft - this.WIDTH_ - this.MARGIN_SIDE_ - Blockly.Scrollbar.scrollbarThickness, this.top_ = a.viewHeight + a.absoluteTop - this.HEIGHT_ - this.bottom_, this.svgGroup_.setAttribute("transform", "translate(" + this.left_ + "," + this.top_ + ")"))
};
Blockly.Xml = {};
Blockly.Xml.workspaceToDom = function(a) {
    var b;
    a.RTL && (b = a.getWidth());
    for (var c = goog.dom.createDom("xml"), d = a.getTopBlocks(!0), e = 0, f; f = d[e]; e++) {
        var g = Blockly.Xml.blockToDom_(f);
        f = f.getRelativeToSurfaceXY();
        g.setAttribute("x", Math.round(a.RTL ? b - f.x : f.x));
        g.setAttribute("y", Math.round(f.y));
        c.appendChild(g)
    }
    return c
};
Blockly.Xml.blockToDom_ = function(a) {
    var b = goog.dom.createDom(a.isShadow() ? "shadow" : "block");
    b.setAttribute("type", a.type);
    if (a.mutationToDom) {
        var c = a.mutationToDom();
        c && (c.hasChildNodes() || c.hasAttributes()) && b.appendChild(c)
    }
    c = 0;
    for (var d; d = a.inputList[c]; c++)
        for (var e = 0, f; f = d.fieldRow[e]; e++)
            if (f.name && f.EDITABLE) {
                var g = goog.dom.createDom("field", null, f.getValue());
                g.setAttribute("name", f.name);
                b.appendChild(g)
            }
    if (c = a.getCommentText()) c = goog.dom.createDom("comment", null, c), "object" == typeof a.comment &&
        (c.setAttribute("pinned", a.comment.isVisible()), d = a.comment.getBubbleSize(), c.setAttribute("h", d.height), c.setAttribute("w", d.width)), b.appendChild(c);
    a.data && (c = goog.dom.createDom("data", null, a.data), b.appendChild(c));
    for (c = 0; d = a.inputList[c]; c++) {
        var h;
        f = !0;
        d.type != Blockly.DUMMY_INPUT && (g = d.connection.targetBlock(), d.type == Blockly.INPUT_VALUE ? h = goog.dom.createDom("value") : d.type == Blockly.NEXT_STATEMENT && (h = goog.dom.createDom("statement")), e = d.connection.getShadowDom(), !e || g && g.isShadow() || h.appendChild(Blockly.Xml.cloneShadow_(e)),
            g && (h.appendChild(Blockly.Xml.blockToDom_(g)), f = !1), h.setAttribute("name", d.name), f || b.appendChild(h))
    }
    a.inputsInlineDefault != a.inputsInline && b.setAttribute("inline", a.inputsInline);
    a.isCollapsed() && b.setAttribute("collapsed", !0);
    a.disabled && b.setAttribute("disabled", !0);
    a.isDeletable() || a.isShadow() || b.setAttribute("deletable", !1);
    a.isMovable() || a.isShadow() || b.setAttribute("movable", !1);
    a.isEditable() || b.setAttribute("editable", !1);
    if (c = a.getNextBlock()) h = goog.dom.createDom("next", null, Blockly.Xml.blockToDom_(c)),
        b.appendChild(h);
    e = a.nextConnection && a.nextConnection.getShadowDom();
    !e || c && c.isShadow() || h.appendChild(Blockly.Xml.cloneShadow_(e));
    return b
};
Blockly.Xml.cloneShadow_ = function(a) {
    for (var b = a = a.cloneNode(!0), c; b;)
        if (b.firstChild) b = b.firstChild;
        else {
            for (; b && !b.nextSibling;) c = b, b = b.parentNode, 3 == c.nodeType && "" == c.data.trim() && b.firstChild != c && goog.dom.removeNode(c);
            b && (c = b, b = b.nextSibling, 3 == c.nodeType && "" == c.data.trim() && goog.dom.removeNode(c))
        }
    return a
};
Blockly.Xml.domToText = function(a) {
    return (new XMLSerializer).serializeToString(a)
};
Blockly.Xml.domToPrettyText = function(a) {
    a = Blockly.Xml.domToText(a).split("<");
    for (var b = "", c = 1; c < a.length; c++) {
        var d = a[c];
        "/" == d[0] && (b = b.substring(2));
        a[c] = b + "<" + d;
        "/" != d[0] && "/>" != d.slice(-2) && (b += "  ")
    }
    a = a.join("\n");
    a = a.replace(/(<(\w+)\b[^>]*>[^\n]*)\n *<\/\2>/g, "$1</$2>");
    return a.replace(/^\n/, "")
};
Blockly.Xml.textToDom = function(a) {
    a = (new DOMParser).parseFromString(a, "text/xml");
    if (!a || !a.firstChild || "xml" != a.firstChild.nodeName.toLowerCase() || a.firstChild !== a.lastChild) throw "Blockly.Xml.textToDom did not obtain a valid XML tree.";
    return a.firstChild
};
Blockly.Xml.domToWorkspace = function(a, b) {
    var c;
    a.RTL && (c = a.getWidth());
    Blockly.Field.startCache();
    for (var d = b.childNodes.length, e = 0; e < d; e++) {
        var f = b.childNodes[e],
            g = f.nodeName.toLowerCase();
        if ("block" == g || "shadow" == g) {
            g = Blockly.Xml.domToBlock(a, f);
            var h = parseInt(f.getAttribute("x"), 10);
            f = parseInt(f.getAttribute("y"), 10);
            isNaN(h) || isNaN(f) || g.moveBy(a.RTL ? c - h : h, f)
        }
    }
    Blockly.Field.stopCache()
};
Blockly.Xml.domToBlock = function(a, b) {
    var c = Blockly.Xml.domToBlockHeadless_(a, b);
    if (a.rendered) {
        c.setConnectionsHidden(!0);
        for (var d = c.getDescendants(), e = d.length - 1; 0 <= e; e--) d[e].initSvg();
        for (e = d.length - 1; 0 <= e; e--) d[e].render(!1);
        setTimeout(function() {
            c.workspace && c.setConnectionsHidden(!1)
        }, 1);
        c.updateDisabled();
        Blockly.fireUiEvent(window, "resize")
    }
    return c
};
Blockly.Xml.domToBlockHeadless_ = function(a, b) {
    var c = null,
        d = b.getAttribute("type");
    if (!d) throw "Block type unspecified: \n" + b.outerHTML;
    var e = b.getAttribute("id");
    c = a.newBlock(d, e);
    var f = null;
    e = 0;
    for (var g; g = b.childNodes[e]; e++)
        if (3 != g.nodeType) {
            for (var h = f = null, k = 0, l; l = g.childNodes[k]; k++) 1 == l.nodeType && ("block" == l.nodeName.toLowerCase() ? f = l : "shadow" == l.nodeName.toLowerCase() && (h = l));
            !f && h && (f = h);
            k = g.getAttribute("name");
            switch (g.nodeName.toLowerCase()) {
                case "mutation":
                    c.domToMutation && (c.domToMutation(g),
                        c.initSvg && c.initSvg());
                    break;
                case "comment":
                    c.setCommentText(g.textContent);
                    var p = g.getAttribute("pinned");
                    p && !c.isInFlyout && setTimeout(function() {
                        c.comment && c.comment.setVisible && c.comment.setVisible("true" == p)
                    }, 1);
                    f = parseInt(g.getAttribute("w"), 10);
                    g = parseInt(g.getAttribute("h"), 10);
                    !isNaN(f) && !isNaN(g) && c.comment && c.comment.setVisible && c.comment.setBubbleSize(f, g);
                    break;
                case "data":
                    c.data = g.textContent;
                    break;
                case "title":
                case "field":
                    f = c.getField(k);
                    if (!f) {
                        console.warn("Ignoring non-existent field " +
                            k + " in block " + d);
                        break
                    }
                    f.setValue(g.textContent);
                    break;
                case "value":
                case "statement":
                    g = c.getInput(k);
                    if (!g) {
                        console.warn("Ignoring non-existent input " + k + " in block " + d);
                        break
                    }
                    h && g.connection.setShadowDom(h);
                    if (f)
                        if (f = Blockly.Xml.domToBlockHeadless_(a, f), f.outputConnection) g.connection.connect(f.outputConnection);
                        else if (f.previousConnection) g.connection.connect(f.previousConnection);
                    else throw "Child block does not have output or previous statement.";
                    break;
                case "next":
                    h && c.nextConnection && c.nextConnection.setShadowDom(h);
                    if (f) {
                        if (!c.nextConnection) throw "Next statement does not exist.";
                        if (c.nextConnection.targetConnection) throw "Next statement is already connected.";
                        f = Blockly.Xml.domToBlockHeadless_(a, f);
                        if (!f.previousConnection) throw "Next block does not have previous statement.";
                        c.nextConnection.connect(f.previousConnection)
                    }
                    break;
                default:
                    console.warn("Ignoring unknown tag: " + g.nodeName)
            }
        }(d = b.getAttribute("inline")) && c.setInputsInline("true" == d);
    (d = b.getAttribute("disabled")) && c.setDisabled("true" == d);
    (d = b.getAttribute("deletable")) &&
    c.setDeletable("true" == d);
    (d = b.getAttribute("movable")) && c.setMovable("true" == d);
    (d = b.getAttribute("editable")) && c.setEditable("true" == d);
    (d = b.getAttribute("collapsed")) && c.setCollapsed("true" == d);
    "shadow" == b.nodeName.toLowerCase() && c.setShadow(!0);
    c.validate && c.validate();
    return c
};
Blockly.Xml.deleteNext = function(a) {
    for (var b = 0, c; c = a.childNodes[b]; b++)
        if ("next" == c.nodeName.toLowerCase()) {
            a.removeChild(c);
            break
        }
};
goog.global.Blockly || (goog.global.Blockly = {});
goog.global.Blockly.Xml || (goog.global.Blockly.Xml = {});
goog.global.Blockly.Xml.domToText = Blockly.Xml.domToText;
goog.global.Blockly.Xml.domToWorkspace = Blockly.Xml.domToWorkspace;
goog.global.Blockly.Xml.textToDom = Blockly.Xml.textToDom;
goog.global.Blockly.Xml.workspaceToDom = Blockly.Xml.workspaceToDom;
/*

 Visual Blocks Editor

 Copyright 2014 Google Inc.
 https://developers.google.com/blockly/

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
Blockly.WorkspaceSvg = function(a) {
    Blockly.WorkspaceSvg.superClass_.constructor.call(this, a);
    this.getMetrics = a.getMetrics;
    this.setMetrics = a.setMetrics;
    Blockly.ConnectionDB.init(this);
    this.SOUNDS_ = Object.create(null);
    this.eventWrappers_ = []
};
goog.inherits(Blockly.WorkspaceSvg, Blockly.Workspace);
Blockly.WorkspaceSvg.prototype.rendered = !0;
Blockly.WorkspaceSvg.prototype.isFlyout = !1;
Blockly.WorkspaceSvg.prototype.isScrolling = !1;
Blockly.WorkspaceSvg.prototype.scrollX = 0;
Blockly.WorkspaceSvg.prototype.scrollY = 0;
Blockly.WorkspaceSvg.prototype.startScrollX = 0;
Blockly.WorkspaceSvg.prototype.startScrollY = 0;
Blockly.WorkspaceSvg.prototype.dragDeltaX_ = 0;
Blockly.WorkspaceSvg.prototype.dragDeltaY_ = 0;
Blockly.WorkspaceSvg.prototype.scale = 1;
Blockly.WorkspaceSvg.prototype.trashcan = null;
Blockly.WorkspaceSvg.prototype.scrollbar = null;
Blockly.WorkspaceSvg.prototype.createDom = function(a) {
    this.svgGroup_ = Blockly.createSvgElement("g", {
        "class": "blocklyWorkspace"
    }, null);
    a && (this.svgBackground_ = Blockly.createSvgElement("rect", {
        height: "100%",
        width: "100%",
        "class": a
    }, this.svgGroup_), "blocklyMainBackground" == a && (this.svgBackground_.style.fill = "url(#" + this.options.gridPattern.id + ")"));
    this.svgBlockCanvas_ = Blockly.createSvgElement("g", {
        "class": "blocklyBlockCanvas"
    }, this.svgGroup_, this);
    this.svgBubbleCanvas_ = Blockly.createSvgElement("g", {
            "class": "blocklyBubbleCanvas"
        },
        this.svgGroup_, this);
    a = Blockly.Scrollbar.scrollbarThickness;
    this.options.hasTrashcan && (a = this.addTrashcan_(a));
    this.options.zoomOptions && this.options.zoomOptions.controls && (a = this.addZoomControls_(a));
    Blockly.bindEvent_(this.svgGroup_, "mousedown", this, this.onMouseDown_);
    var b = this;
    Blockly.bindEvent_(this.svgGroup_, "touchstart", null, function(a) {
        Blockly.longStart_(a, b)
    });
    this.options.zoomOptions && this.options.zoomOptions.wheel && Blockly.bindEvent_(this.svgGroup_, "wheel", this, this.onMouseWheel_);
    this.options.hasCategories ?
        this.toolbox_ = new Blockly.Toolbox(this) : this.options.languageTree && this.addFlyout_();
    this.updateGridPattern_();
    return this.svgGroup_
};
Blockly.WorkspaceSvg.prototype.dispose = function() {
    this.rendered = !1;
    Blockly.unbindEvent_(this.eventWrappers_);
    Blockly.WorkspaceSvg.superClass_.dispose.call(this);
    this.svgGroup_ && (goog.dom.removeNode(this.svgGroup_), this.svgGroup_ = null);
    this.svgBubbleCanvas_ = this.svgBlockCanvas_ = null;
    this.toolbox_ && (this.toolbox_.dispose(), this.toolbox_ = null);
    this.flyout_ && (this.flyout_.dispose(), this.flyout_ = null);
    this.trashcan && (this.trashcan.dispose(), this.trashcan = null);
    this.scrollbar && (this.scrollbar.dispose(),
        this.scrollbar = null);
    this.zoomControls_ && (this.zoomControls_.dispose(), this.zoomControls_ = null);
    this.options.parentWorkspace || goog.dom.removeNode(this.getParentSvg())
};
Blockly.WorkspaceSvg.prototype.newBlock = function(a, b) {
    return new Blockly.BlockSvg(this, a, b)
};
Blockly.WorkspaceSvg.prototype.addTrashcan_ = function(a) {
    this.trashcan = new Blockly.Trashcan(this);
    var b = this.trashcan.createDom();
    this.svgGroup_.insertBefore(b, this.svgBlockCanvas_);
    return this.trashcan.init(a)
};
Blockly.WorkspaceSvg.prototype.addZoomControls_ = function(a) {
    this.zoomControls_ = new Blockly.ZoomControls(this);
    var b = this.zoomControls_.createDom();
    this.svgGroup_.appendChild(b);
    return this.zoomControls_.init(a)
};
Blockly.WorkspaceSvg.prototype.addFlyout_ = function() {
    this.flyout_ = new Blockly.Flyout({
        disabledPatternId: this.options.disabledPatternId,
        parentWorkspace: this,
        RTL: this.RTL
    });
    this.flyout_.autoClose = !1;
    var a = this.flyout_.createDom();
    this.svgGroup_.insertBefore(a, this.svgBlockCanvas_)
};
Blockly.WorkspaceSvg.prototype.resize = function() {
    this.toolbox_ && this.toolbox_.position();
    this.flyout_ && this.flyout_.position();
    this.trashcan && this.trashcan.position();
    this.zoomControls_ && this.zoomControls_.position();
    this.scrollbar && this.scrollbar.resize()
};
Blockly.WorkspaceSvg.prototype.getCanvas = function() {
    return this.svgBlockCanvas_
};
Blockly.WorkspaceSvg.prototype.getBubbleCanvas = function() {
    return this.svgBubbleCanvas_
};
Blockly.WorkspaceSvg.prototype.getParentSvg = function() {
    if (this.cachedParentSvg_) return this.cachedParentSvg_;
    for (var a = this.svgGroup_; a;) {
        if ("svg" == a.tagName) return this.cachedParentSvg_ = a;
        a = a.parentNode
    }
    return null
};
Blockly.WorkspaceSvg.prototype.translate = function(a, b) {
    var c = "translate(" + a + "," + b + ") scale(" + this.scale + ")";
    this.svgBlockCanvas_.setAttribute("transform", c);
    this.svgBubbleCanvas_.setAttribute("transform", c)
};
Blockly.WorkspaceSvg.prototype.getWidth = function() {
    return this.getMetrics().viewWidth
};
Blockly.WorkspaceSvg.prototype.setVisible = function(a) {
    this.getParentSvg().style.display = a ? "block" : "none";
    this.toolbox_ && (this.toolbox_.HtmlDiv.style.display = a ? "block" : "none");
    a ? (this.render(), this.toolbox_ && this.toolbox_.position()) : Blockly.hideChaff(!0)
};
Blockly.WorkspaceSvg.prototype.render = function() {
    for (var a = this.getAllBlocks(), b = a.length - 1; 0 <= b; b--) a[b].render(!1)
};
Blockly.WorkspaceSvg.prototype.traceOn = function(a) {
    this.traceOn_ = a;
    this.traceWrapper_ && (Blockly.unbindEvent_(this.traceWrapper_), this.traceWrapper_ = null);
    a && (this.traceWrapper_ = Blockly.bindEvent_(this.svgBlockCanvas_, "blocklySelectChange", this, function() {
        this.traceOn_ = !1
    }))
};
Blockly.WorkspaceSvg.prototype.highlightBlock = function(a) {
    this.traceOn_ && 0 != Blockly.dragMode_ && this.traceOn(!1);
    if (this.traceOn_) {
        var b = null;
        if (a && (b = Blockly.Block.getById(a), !b)) return;
        this.traceOn(!1);
        b ? b.select() : Blockly.selected && Blockly.selected.unselect();
        var c = this;
        setTimeout(function() {
            c.traceOn(!0)
        }, 1)
    }
};
Blockly.WorkspaceSvg.prototype.fireChangeEvent = function() {
    this.rendered && this.svgBlockCanvas_ && Blockly.fireUiEvent(this.svgBlockCanvas_, "blocklyWorkspaceChange")
};
Blockly.WorkspaceSvg.prototype.paste = function(a) {
    if (this.rendered && !(a.getElementsByTagName("block").length >= this.remainingCapacity())) {
        Blockly.terminateDrag_();
        var b = Blockly.Xml.domToBlock(this, a),
            c = parseInt(a.getAttribute("x"), 10);
        a = parseInt(a.getAttribute("y"), 10);
        if (!isNaN(c) && !isNaN(a)) {
            this.RTL && (c = -c);
            do {
                for (var d = !1, e = this.getAllBlocks(), f = 0, g; g = e[f]; f++)
                    if (g = g.getRelativeToSurfaceXY(), 1 >= Math.abs(c - g.x) && 1 >= Math.abs(a - g.y)) {
                        d = !0;
                        break
                    }
                if (!d)
                    for (e = b.getConnections_(!1), f = 0; g = e[f]; f++)
                        if (g.closest(Blockly.SNAP_RADIUS,
                                c, a).connection) {
                            d = !0;
                            break
                        }
                d && (c = this.RTL ? c - Blockly.SNAP_RADIUS : c + Blockly.SNAP_RADIUS, a += 2 * Blockly.SNAP_RADIUS)
            } while (d);
            b.moveBy(c, a)
        }
        b.select()
    }
};
Blockly.WorkspaceSvg.prototype.recordDeleteAreas = function() {
    this.deleteAreaTrash_ = this.trashcan ? this.trashcan.getRect() : null;
    this.deleteAreaToolbox_ = this.flyout_ ? this.flyout_.getRect() : this.toolbox_ ? this.toolbox_.getRect() : null
};
Blockly.WorkspaceSvg.prototype.isDeleteArea = function(a) {
    a = Blockly.mouseToSvg(a, Blockly.mainWorkspace.getParentSvg());
    a = new goog.math.Coordinate(a.x, a.y);
    if (this.deleteAreaTrash_) {
        if (this.deleteAreaTrash_.contains(a)) return this.trashcan.setOpen_(!0), Blockly.Css.setCursor(Blockly.Css.Cursor.DELETE), !0;
        this.trashcan.setOpen_(!1)
    }
    if (this.deleteAreaToolbox_ && this.deleteAreaToolbox_.contains(a)) return Blockly.Css.setCursor(Blockly.Css.Cursor.DELETE), !0;
    Blockly.Css.setCursor(Blockly.Css.Cursor.CLOSED);
    return !1
};
Blockly.WorkspaceSvg.prototype.onMouseDown_ = function(a) {
    this.markFocused();
    Blockly.isTargetInput_(a) || (Blockly.svgResize(this), Blockly.terminateDrag_(), Blockly.hideChaff(), a.target && a.target.nodeName && ("svg" == a.target.nodeName.toLowerCase() || a.target == this.svgBackground_) && Blockly.selected && !this.options.readOnly && Blockly.selected.unselect(), Blockly.isRightButton(a) ? this.showContextMenu_(a) : this.scrollbar && (Blockly.removeAllRanges(), this.isScrolling = !0, this.startDragMouseX = a.clientX, this.startDragMouseY = a.clientY,
            this.startDragMetrics = this.getMetrics(), this.startScrollX = this.scrollX, this.startScrollY = this.scrollY, "mouseup" in Blockly.bindEvent_.TOUCH_MAP && (Blockly.onTouchUpWrapper_ = Blockly.onTouchUpWrapper_ || [], Blockly.onTouchUpWrapper_ = Blockly.onTouchUpWrapper_.concat(Blockly.bindEvent_(document, "mouseup", null, Blockly.onMouseUp_))), Blockly.onMouseMoveWrapper_ = Blockly.onMouseMoveWrapper_ || [], Blockly.onMouseMoveWrapper_ = Blockly.onMouseMoveWrapper_.concat(Blockly.bindEvent_(document, "mousemove", null, Blockly.onMouseMove_))),
        a.stopPropagation())
};
Blockly.WorkspaceSvg.prototype.startDrag = function(a, b, c) {
    a = Blockly.mouseToSvg(a, this.getParentSvg());
    a.x /= this.scale;
    a.y /= this.scale;
    this.dragDeltaX_ = b - a.x;
    this.dragDeltaY_ = c - a.y
};
Blockly.WorkspaceSvg.prototype.moveDrag = function(a) {
    a = Blockly.mouseToSvg(a, this.getParentSvg());
    a.x /= this.scale;
    a.y /= this.scale;
    return new goog.math.Coordinate(this.dragDeltaX_ + a.x, this.dragDeltaY_ + a.y)
};
Blockly.WorkspaceSvg.prototype.onMouseWheel_ = function(a) {
    Blockly.terminateDrag_();
    var b = 0 < a.deltaY ? -1 : 1,
        c = Blockly.mouseToSvg(a, this.getParentSvg());
    this.zoom(c.x, c.y, b);
    a.preventDefault()
};
Blockly.WorkspaceSvg.prototype.cleanUp_ = function() {
    for (var a = this.getTopBlocks(!0), b = 0, c = 0, d; d = a[c]; c++) {
        var e = d.getRelativeToSurfaceXY();
        d.moveBy(-e.x, b - e.y);
        d.snapToGrid();
        b = d.getRelativeToSurfaceXY().y + d.getHeightWidth().height + Blockly.BlockSvg.MIN_BLOCK_Y
    }
    Blockly.fireUiEvent(window, "resize");
    this.fireChangeEvent()
};
Blockly.WorkspaceSvg.prototype.showContextMenu_ = function(a) {
    function b(a) {
        if (a.isDeletable()) p = p.concat(a.getDescendants());
        else {
            a = a.getChildren();
            for (var c = 0; c < a.length; c++) b(a[c])
        }
    }

    function c() {
        var a = p.shift();
        a && (a.workspace ? (a.dispose(!1, !0), setTimeout(c, 10)) : c())
    }
    if (!this.options.readOnly && !this.isFlyout) {
        var d = [],
            e = this.getTopBlocks(!0),
            f = {};
        f.text = Blockly.Msg.CLEAN_UP;
        f.enabled = 1 < e.length;
        f.callback = this.cleanUp_.bind(this);
        d.push(f);
        if (this.options.collapse) {
            for (var g = f = !1, h = 0; h < e.length; h++)
                for (var k =
                        e[h]; k;) k.isCollapsed() ? f = !0 : g = !0, k = k.getNextBlock();
            var l = function(a) {
                for (var b = 0, c = 0; c < e.length; c++)
                    for (var d = e[c]; d;) setTimeout(d.setCollapsed.bind(d, a), b), d = d.getNextBlock(), b += 10
            };
            g = {
                enabled: g
            };
            g.text = Blockly.Msg.COLLAPSE_ALL;
            g.callback = function() {
                l(!0)
            };
            d.push(g);
            f = {
                enabled: f
            };
            f.text = Blockly.Msg.EXPAND_ALL;
            f.callback = function() {
                l(!1)
            };
            d.push(f)
        }
        var p = [];
        for (h = 0; h < e.length; h++) b(e[h]);
        f = {
            text: 1 >= p.length ? Blockly.Msg.DELETE_BLOCK : Blockly.Msg.DELETE_X_BLOCKS.replace("%1", String(p.length)),
            enabled: 0 <
                p.length,
            callback: function() {
                (2 > p.length || window.confirm(Blockly.Msg.DELETE_ALL_BLOCKS.replace("%1", String(p.length)))) && c()
            }
        };
        d.push(f);
        Blockly.ContextMenu.show(a, d, this.RTL)
    }
};
Blockly.WorkspaceSvg.prototype.loadAudio_ = function(a, b) {
    if (a.length) {
        try {
            var c = new window.Audio
        } catch (h) {
            return
        }
        for (var d, e = 0; e < a.length; e++) {
            var f = a[e],
                g = f.match(/\.(\w+)$/);
            if (g && c.canPlayType("audio/" + g[1])) {
                d = new window.Audio(f);
                break
            }
        }
        d && d.play && (this.SOUNDS_[b] = d)
    }
};
Blockly.WorkspaceSvg.prototype.preloadAudio_ = function() {
    for (var a in this.SOUNDS_) {
        var b = this.SOUNDS_[a];
        b.volume = .01;
        b.play();
        b.pause();
        if (goog.userAgent.IPAD || goog.userAgent.IPHONE) break
    }
};
Blockly.WorkspaceSvg.prototype.playAudio = function(a, b) {
    var c = this.SOUNDS_[a];
    c ? (c = goog.userAgent.DOCUMENT_MODE && 9 === goog.userAgent.DOCUMENT_MODE || goog.userAgent.IPAD || goog.userAgent.ANDROID ? c : c.cloneNode(), c.volume = void 0 === b ? 1 : b, c.play()) : this.options.parentWorkspace && this.options.parentWorkspace.playAudio(a, b)
};
Blockly.WorkspaceSvg.prototype.updateToolbox = function(a) {
    if (a = Blockly.parseToolboxTree_(a)) {
        if (!this.options.languageTree) throw "Existing toolbox is null.  Can't create new toolbox.";
        if (this.options.hasCategories) {
            if (!this.toolbox_) throw "Existing toolbox has no categories.  Can't change mode.";
            this.options.languageTree = a;
            this.toolbox_.populate_(a);
            this.toolbox_.addColour_()
        } else {
            if (!this.flyout_) throw "Existing toolbox has categories.  Can't change mode.";
            this.options.languageTree = a;
            this.flyout_.show(a.childNodes)
        }
    } else if (this.options.languageTree) throw "Can't nullify an existing toolbox.";
};
Blockly.WorkspaceSvg.prototype.addChangeListener = function(a) {
    a = Blockly.bindEvent_(this.getCanvas(), "blocklyWorkspaceChange", null, a);
    Array.prototype.push.apply(this.eventWrappers_, a);
    return a
};
Blockly.WorkspaceSvg.prototype.removeChangeListener = function(a) {
    Blockly.unbindEvent_(a);
    a = this.eventWrappers_.indexOf(a); - 1 != a && this.eventWrappers_.splice(a, 1)
};
Blockly.WorkspaceSvg.prototype.markFocused = function() {
    this.options.parentWorkspace ? this.options.parentWorkspace.markFocused() : Blockly.mainWorkspace = this
};
Blockly.WorkspaceSvg.prototype.zoom = function(a, b, c) {
    var d = this.options.zoomOptions.scaleSpeed,
        e = this.getMetrics(),
        f = this.getParentSvg().createSVGPoint();
    f.x = a;
    f.y = b;
    f = f.matrixTransform(this.getCanvas().getCTM().inverse());
    a = f.x;
    b = f.y;
    f = this.getCanvas();
    c = 1 == c ? d : 1 / d;
    d = this.scale * c;
    d > this.options.zoomOptions.maxScale ? c = this.options.zoomOptions.maxScale / this.scale : d < this.options.zoomOptions.minScale && (c = this.options.zoomOptions.minScale / this.scale);
    a = f.getCTM().translate(a * (1 - c), b * (1 - c)).scale(c);
    this.scale !=
        a.a && (this.scale = a.a, this.scrollX = a.e - e.absoluteLeft, this.scrollY = a.f - e.absoluteTop, this.updateGridPattern_(), this.scrollbar ? this.scrollbar.resize() : this.translate(0, 0), Blockly.hideChaff(!1), this.flyout_ && this.flyout_.reflow())
};
Blockly.WorkspaceSvg.prototype.zoomCenter = function(a) {
    var b = this.getMetrics();
    this.zoom(b.viewWidth / 2, b.viewHeight / 2, a)
};
Blockly.WorkspaceSvg.prototype.zoomToFit = function() {
    var a = this.svgBackground_.getBBox(),
        b = this.svgBlockCanvas_.getBBox(),
        c = b.width;
    if (0 != c) {
        var d = this.options.zoomOptions.scaleSpeed;
        a = Math.pow(d, Math.floor(Math.log(Math.min((a.width - this.toolbox_.width - Blockly.Scrollbar.scrollbarThickness) / c, (a.height - Blockly.Scrollbar.scrollbarThickness) / b.height)) / Math.log(d)));
        a > this.options.zoomOptions.maxScale ? a = this.options.zoomOptions.maxScale : a < this.options.zoomOptions.minScale && (a = this.options.zoomOptions.minScale);
        this.scale = a;
        this.updateGridPattern_();
        this.scrollbar.resize();
        Blockly.hideChaff(!1);
        this.flyout_ && this.flyout_.reflow();
        a = this.getMetrics();
        this.scrollbar.set((a.contentWidth - a.viewWidth) / 2, (a.contentHeight - a.viewHeight) / 2)
    }
};
Blockly.WorkspaceSvg.prototype.zoomReset = function(a) {
    this.scale = 1;
    this.updateGridPattern_();
    Blockly.hideChaff(!1);
    this.flyout_ && this.flyout_.reflow();
    this.scrollbar && this.scrollbar.resize();
    var b = this.getMetrics();
    this.scrollbar ? this.scrollbar.set((b.contentWidth - b.viewWidth) / 2, (b.contentHeight - b.viewHeight) / 2) : this.translate(0, 0);
    a.stopPropagation()
};
Blockly.WorkspaceSvg.prototype.updateGridPattern_ = function() {
    if (this.options.gridPattern) {
        var a = this.options.gridOptions.spacing * this.scale || 100;
        this.options.gridPattern.setAttribute("width", a);
        this.options.gridPattern.setAttribute("height", a);
        a = Math.floor(this.options.gridOptions.spacing / 2) + .5;
        var b = a - this.options.gridOptions.length / 2,
            c = a + this.options.gridOptions.length / 2,
            d = this.options.gridPattern.firstChild,
            e = d && d.nextSibling;
        a *= this.scale;
        b *= this.scale;
        c *= this.scale;
        d && (d.setAttribute("stroke-width",
            this.scale), d.setAttribute("x1", b), d.setAttribute("y1", a), d.setAttribute("x2", c), d.setAttribute("y2", a));
        e && (e.setAttribute("stroke-width", this.scale), e.setAttribute("x1", a), e.setAttribute("y1", b), e.setAttribute("x2", a), e.setAttribute("y2", c))
    }
};
Blockly.WorkspaceSvg.prototype.setVisible = Blockly.WorkspaceSvg.prototype.setVisible;
Blockly.WorkspaceSvg.prototype.addChangeListener = Blockly.WorkspaceSvg.prototype.addChangeListener;
Blockly.WorkspaceSvg.prototype.removeChangeListener = Blockly.WorkspaceSvg.prototype.removeChangeListener;
Blockly.Mutator = function(a) {
    Blockly.Mutator.superClass_.constructor.call(this, null);
    this.quarkNames_ = a
};
goog.inherits(Blockly.Mutator, Blockly.Icon);
Blockly.Mutator.prototype.workspaceWidth_ = 0;
Blockly.Mutator.prototype.workspaceHeight_ = 0;
Blockly.Mutator.prototype.drawIcon_ = function(a) {
    Blockly.createSvgElement("rect", {
        "class": "blocklyIconShape",
        rx: "4",
        ry: "4",
        height: "16",
        width: "16"
    }, a);
    Blockly.createSvgElement("path", {
        "class": "blocklyIconSymbol",
        d: "m4.203,7.296 0,1.368 -0.92,0.677 -0.11,0.41 0.9,1.559 0.41,0.11 1.043,-0.457 1.187,0.683 0.127,1.134 0.3,0.3 1.8,0 0.3,-0.299 0.127,-1.138 1.185,-0.682 1.046,0.458 0.409,-0.11 0.9,-1.559 -0.11,-0.41 -0.92,-0.677 0,-1.366 0.92,-0.677 0.11,-0.41 -0.9,-1.559 -0.409,-0.109 -1.046,0.458 -1.185,-0.682 -0.127,-1.138 -0.3,-0.299 -1.8,0 -0.3,0.3 -0.126,1.135 -1.187,0.682 -1.043,-0.457 -0.41,0.11 -0.899,1.559 0.108,0.409z"
    }, a);
    Blockly.createSvgElement("circle", {
        "class": "blocklyIconShape",
        r: "2.7",
        cx: "8",
        cy: "8"
    }, a)
};
Blockly.Mutator.prototype.iconClick_ = function(a) {
    this.block_.isEditable() && Blockly.Icon.prototype.iconClick_.call(this, a)
};
Blockly.Mutator.prototype.createEditor_ = function() {
    this.svgDialog_ = Blockly.createSvgElement("svg", {
        x: Blockly.Bubble.BORDER_WIDTH,
        y: Blockly.Bubble.BORDER_WIDTH
    }, null);
    if (this.quarkNames_.length)
        for (var a = goog.dom.createDom("xml"), b = 0, c; c = this.quarkNames_[b]; b++) a.appendChild(goog.dom.createDom("block", {
            type: c
        }));
    else a = null;
    a = {
        languageTree: a,
        parentWorkspace: this.block_.workspace,
        pathToMedia: this.block_.workspace.options.pathToMedia,
        RTL: this.block_.RTL,
        getMetrics: this.getFlyoutMetrics_.bind(this),
        setMetrics: null
    };
    this.workspace_ = new Blockly.WorkspaceSvg(a);
    this.svgDialog_.appendChild(this.workspace_.createDom("blocklyMutatorBackground"));
    return this.svgDialog_
};
Blockly.Mutator.prototype.updateEditable = function() {
    this.block_.isEditable() ? Blockly.Icon.prototype.updateEditable.call(this) : (this.setVisible(!1), this.iconGroup_ && Blockly.addClass_(this.iconGroup_, "blocklyIconGroupReadonly"))
};
Blockly.Mutator.prototype.resizeBubble_ = function() {
    var a = 2 * Blockly.Bubble.BORDER_WIDTH,
        b = this.workspace_.getCanvas().getBBox();
    var c = this.block_.RTL ? -b.x : b.width + b.x;
    b = b.height + 3 * a;
    if (this.workspace_.flyout_) {
        var d = this.workspace_.flyout_.getMetrics_();
        b = Math.max(b, d.contentHeight + 20)
    }
    c += 3 * a;
    if (Math.abs(this.workspaceWidth_ - c) > a || Math.abs(this.workspaceHeight_ - b) > a) this.workspaceWidth_ = c, this.workspaceHeight_ = b, this.bubble_.setBubbleSize(c + a, b + a), this.svgDialog_.setAttribute("width", this.workspaceWidth_),
        this.svgDialog_.setAttribute("height", this.workspaceHeight_);
    this.block_.RTL && (a = "translate(" + this.workspaceWidth_ + ",0)", this.workspace_.getCanvas().setAttribute("transform", a));
    this.workspace_.resize()
};
Blockly.Mutator.prototype.setVisible = function(a) {
    if (a != this.isVisible())
        if (a) {
            this.bubble_ = new Blockly.Bubble(this.block_.workspace, this.createEditor_(), this.block_.svgPath_, this.iconX_, this.iconY_, null, null);
            if (a = this.workspace_.options.languageTree) this.workspace_.flyout_.init(this.workspace_), this.workspace_.flyout_.show(a.childNodes);
            this.rootBlock_ = this.block_.decompose(this.workspace_);
            a = this.rootBlock_.getDescendants();
            for (var b = 0, c; c = a[b]; b++) c.render();
            this.rootBlock_.setMovable(!1);
            this.rootBlock_.setDeletable(!1);
            this.workspace_.flyout_ ? (a = 2 * this.workspace_.flyout_.CORNER_RADIUS, b = this.workspace_.flyout_.width_ + a) : b = a = 16;
            this.block_.RTL && (b = -b);
            this.rootBlock_.moveBy(b, a);
            if (this.block_.saveConnections) {
                var d = this;
                this.block_.saveConnections(this.rootBlock_);
                this.sourceListener_ = Blockly.bindEvent_(this.block_.workspace.getCanvas(), "blocklyWorkspaceChange", null, function() {
                    d.block_.saveConnections(d.rootBlock_)
                })
            }
            this.resizeBubble_();
            Blockly.bindEvent_(this.workspace_.getCanvas(), "blocklyWorkspaceChange", this,
                this.workspaceChanged_);
            this.updateColour()
        } else this.svgDialog_ = null, this.workspace_.dispose(), this.rootBlock_ = this.workspace_ = null, this.bubble_.dispose(), this.bubble_ = null, this.workspaceHeight_ = this.workspaceWidth_ = 0, this.sourceListener_ && (Blockly.unbindEvent_(this.sourceListener_), this.sourceListener_ = null)
};
Blockly.Mutator.prototype.workspaceChanged_ = function() {
    if (0 == Blockly.dragMode_)
        for (var a = this.workspace_.getTopBlocks(!1), b = 0, c; c = a[b]; b++) {
            var d = c.getRelativeToSurfaceXY(),
                e = c.getHeightWidth();
            20 > d.y + e.height && c.moveBy(0, 20 - e.height - d.y)
        }
    this.rootBlock_.workspace == this.workspace_ && (a = this.block_.rendered, this.block_.rendered = !1, this.block_.compose(this.rootBlock_), this.block_.rendered = a, this.block_.initSvg(), this.block_.rendered && this.block_.render(), this.resizeBubble_(), this.block_.workspace.fireChangeEvent(),
        goog.Timer.callOnce(this.block_.bumpNeighbours_, Blockly.BUMP_DELAY, this.block_))
};
Blockly.Mutator.prototype.getFlyoutMetrics_ = function() {
    return {
        viewHeight: this.workspaceHeight_,
        viewWidth: this.workspaceWidth_,
        absoluteTop: 0,
        absoluteLeft: 0
    }
};
Blockly.Mutator.prototype.dispose = function() {
    this.block_.mutator = null;
    Blockly.Icon.prototype.dispose.call(this)
};
Blockly.Warning = function(a) {
    Blockly.Warning.superClass_.constructor.call(this, a);
    this.createIcon();
    this.text_ = {}
};
goog.inherits(Blockly.Warning, Blockly.Icon);
Blockly.Warning.prototype.collapseHidden = !1;
Blockly.Warning.prototype.drawIcon_ = function(a) {
    Blockly.createSvgElement("path", {
        "class": "blocklyIconShape",
        d: "M2,15Q-1,15 0.5,12L6.5,1.7Q8,-1 9.5,1.7L15.5,12Q17,15 14,15z"
    }, a);
    Blockly.createSvgElement("path", {
        "class": "blocklyIconSymbol",
        d: "m7,4.8v3.16l0.27,2.27h1.46l0.27,-2.27v-3.16z"
    }, a);
    Blockly.createSvgElement("rect", {
        "class": "blocklyIconSymbol",
        x: "7",
        y: "11",
        height: "2",
        width: "2"
    }, a)
};
Blockly.Warning.textToDom_ = function(a) {
    var b = Blockly.createSvgElement("text", {
        "class": "blocklyText blocklyBubbleText",
        y: Blockly.Bubble.BORDER_WIDTH
    }, null);
    a = a.split("\n");
    for (var c = 0; c < a.length; c++) {
        var d = Blockly.createSvgElement("tspan", {
                dy: "1em",
                x: Blockly.Bubble.BORDER_WIDTH
            }, b),
            e = document.createTextNode(a[c]);
        d.appendChild(e)
    }
    return b
};
Blockly.Warning.prototype.setVisible = function(a) {
    if (a != this.isVisible())
        if (a) {
            a = Blockly.Warning.textToDom_(this.getText());
            this.bubble_ = new Blockly.Bubble(this.block_.workspace, a, this.block_.svgPath_, this.iconX_, this.iconY_, null, null);
            if (this.block_.RTL)
                for (var b = a.getBBox().width, c = 0, d; d = a.childNodes[c]; c++) d.setAttribute("text-anchor", "end"), d.setAttribute("x", b + Blockly.Bubble.BORDER_WIDTH);
            this.updateColour();
            a = this.bubble_.getBubbleSize();
            this.bubble_.setBubbleSize(a.width, a.height)
        } else this.bubble_.dispose(),
            this.body_ = this.bubble_ = null
};
Blockly.Warning.prototype.bodyFocus_ = function(a) {
    this.bubble_.promote_()
};
Blockly.Warning.prototype.setText = function(a, b) {
    this.text_[b] != a && (a ? this.text_[b] = a : delete this.text_[b], this.isVisible() && (this.setVisible(!1), this.setVisible(!0)))
};
Blockly.Warning.prototype.getText = function() {
    var a = [],
        b;
    for (b in this.text_) a.push(this.text_[b]);
    return a.join("\n")
};
Blockly.Warning.prototype.dispose = function() {
    this.block_.warning = null;
    Blockly.Icon.prototype.dispose.call(this)
};
Blockly.Block = function(a, b, c) {
    this.id = c || Blockly.genUid();
    goog.asserts.assert(!Blockly.Block.getById(this.id), 'Error: Block "%s" already exists.', this.id);
    Blockly.Block.BlockDB_[this.id] = this;
    this.previousConnection = this.nextConnection = this.outputConnection = null;
    this.inputList = [];
    this.inputsInline = void 0;
    this.disabled = this.rendered = !1;
    this.tooltip = "";
    this.contextMenu = !0;
    this.parentBlock_ = null;
    this.childBlocks_ = [];
    this.editable_ = this.movable_ = this.deletable_ = !0;
    this.collapsed_ = this.isShadow_ = !1;
    this.comment =
        null;
    this.xy_ = new goog.math.Coordinate(0, 0);
    this.workspace = a;
    this.isInFlyout = a.isFlyout;
    this.RTL = a.RTL;
    b && (this.type = b, c = Blockly.Blocks[b], goog.asserts.assertObject(c, 'Error: "%s" is an unknown language block.', b), goog.mixin(this, c));
    a.addTopBlock(this);
    goog.isFunction(this.init) && this.init();
    this.inputsInlineDefault = this.inputsInline
};
Blockly.Block.obtain = function(a, b) {
    console.warn("Deprecated call to Blockly.Block.obtain, use workspace.newBlock instead.");
    return a.newBlock(b)
};
Blockly.Block.prototype.data = null;
Blockly.Block.prototype.colour_ = "#000000";
Blockly.Block.prototype.dispose = function(a, b, c) {
    this.unplug(a, !1);
    this.workspace && !c && (this.workspace.removeTopBlock(this), this.workspace = null);
    Blockly.selected == this && (Blockly.selected = null);
    for (a = this.childBlocks_.length - 1; 0 <= a; a--) this.childBlocks_[a].dispose(!1);
    for (a = 0; b = this.inputList[a]; a++) b.dispose();
    this.inputList.length = 0;
    b = this.getConnections_(!0);
    for (a = 0; a < b.length; a++) c = b[a], c.targetConnection && c.disconnect(), b[a].dispose();
    delete Blockly.Block.BlockDB_[this.id]
};
Blockly.Block.prototype.unplug = function(a, b) {
    b = b && !!this.getParent();
    if (this.outputConnection) this.outputConnection.targetConnection && this.setParent(null);
    else {
        var c = null;
        this.previousConnection && this.previousConnection.targetConnection && (c = this.previousConnection.targetConnection, this.setParent(null));
        var d = this.getNextBlock();
        if (a && d) {
            var e = this.nextConnection.targetConnection;
            d.setParent(null);
            c && c.checkType_(e) && c.connect(e)
        }
    }
    b && this.moveBy(Blockly.SNAP_RADIUS * (this.RTL ? -1 : 1), 2 * Blockly.SNAP_RADIUS)
};
Blockly.Block.prototype.getConnections_ = function(a) {
    var b = [];
    if (a || this.rendered)
        if (this.outputConnection && b.push(this.outputConnection), this.previousConnection && b.push(this.previousConnection), this.nextConnection && b.push(this.nextConnection), a || !this.collapsed_) {
            a = 0;
            for (var c; c = this.inputList[a]; a++) c.connection && b.push(c.connection)
        }
    return b
};
Blockly.Block.prototype.bumpNeighbours_ = function() {
    if (this.workspace && 0 == Blockly.dragMode_) {
        var a = this.getRootBlock();
        if (!a.isInFlyout)
            for (var b = this.getConnections_(!1), c = 0, d; d = b[c]; c++) {
                d.targetConnection && d.isSuperior() && d.targetBlock().bumpNeighbours_();
                for (var e = d.neighbours_(Blockly.SNAP_RADIUS), f = 0, g; g = e[f]; f++) d.targetConnection && g.targetConnection || g.sourceBlock_.getRootBlock() != a && (d.isSuperior() ? g.bumpAwayFrom_(d) : d.bumpAwayFrom_(g))
            }
    }
};
Blockly.Block.prototype.getParent = function() {
    return this.parentBlock_
};
Blockly.Block.prototype.getSurroundParent = function() {
    for (var a = this;;) {
        do {
            var b = a;
            a = a.getParent();
            if (!a) return null
        } while (a.getNextBlock() == b);
        return a
    }
};
Blockly.Block.prototype.getNextBlock = function() {
    return this.nextConnection && this.nextConnection.targetBlock()
};
Blockly.Block.prototype.getRootBlock = function() {
    var a = this;
    do {
        var b = a;
        a = b.parentBlock_
    } while (a);
    return b
};
Blockly.Block.prototype.getChildren = function() {
    return this.childBlocks_
};
Blockly.Block.prototype.setParent = function(a) {
    if (this.parentBlock_) {
        for (var b = this.parentBlock_.childBlocks_, c, d = 0; c = b[d]; d++)
            if (c == this) {
                b.splice(d, 1);
                break
            }
        this.parentBlock_ = null;
        this.previousConnection && this.previousConnection.targetConnection && this.previousConnection.disconnect();
        this.outputConnection && this.outputConnection.targetConnection && this.outputConnection.disconnect()
    } else goog.array.contains(this.workspace.getTopBlocks(!1), this) && this.workspace.removeTopBlock(this);
    (this.parentBlock_ =
        a) ? a.childBlocks_.push(this): this.workspace.addTopBlock(this)
};
Blockly.Block.prototype.getDescendants = function() {
    for (var a = [this], b, c = 0; b = this.childBlocks_[c]; c++) a.push.apply(a, b.getDescendants());
    return a
};
Blockly.Block.prototype.isDeletable = function() {
    return this.deletable_ && !this.isShadow_ && !(this.workspace && this.workspace.options.readOnly)
};
Blockly.Block.prototype.setDeletable = function(a) {
    this.deletable_ = a
};
Blockly.Block.prototype.isMovable = function() {
    return this.movable_ && !this.isShadow_ && !(this.workspace && this.workspace.options.readOnly)
};
Blockly.Block.prototype.setMovable = function(a) {
    this.movable_ = a
};
Blockly.Block.prototype.isShadow = function() {
    return this.isShadow_
};
Blockly.Block.prototype.setShadow = function(a) {
    this.isShadow_ = a
};
Blockly.Block.prototype.isEditable = function() {
    return this.editable_ && !(this.workspace && this.workspace.options.readOnly)
};
Blockly.Block.prototype.setEditable = function(a) {
    this.editable_ = a;
    a = 0;
    for (var b; b = this.inputList[a]; a++)
        for (var c = 0, d; d = b.fieldRow[c]; c++) d.updateEditable()
};
Blockly.Block.prototype.setConnectionsHidden = function(a) {
    if (!a && this.isCollapsed()) {
        if (this.outputConnection && this.outputConnection.setHidden(a), this.previousConnection && this.previousConnection.setHidden(a), this.nextConnection) {
            this.nextConnection.setHidden(a);
            var b = this.nextConnection.targetBlock();
            b && b.setConnectionsHidden(a)
        }
    } else
        for (var c = this.getConnections_(!0), d = 0; b = c[d]; d++) b.setHidden(a), b.isSuperior() && (b = b.targetBlock()) && b.setConnectionsHidden(a)
};
Blockly.Block.prototype.setHelpUrl = function(a) {
    this.helpUrl = a
};
Blockly.Block.prototype.setTooltip = function(a) {
    this.tooltip = a
};
Blockly.Block.prototype.getColour = function() {
    return this.colour_
};
Blockly.Block.prototype.setColour = function(a) {
    var b = parseFloat(a);
    if (isNaN(b))
        if (goog.isString(a) && a.match(/^#[0-9a-fA-F]{6}$/)) this.colour_ = a;
        else throw "Invalid colour: " + a;
    else this.colour_ = Blockly.hueToRgb(b);
    this.rendered && this.updateColour()
};
Blockly.Block.prototype.getField = function(a) {
    for (var b = 0, c; c = this.inputList[b]; b++)
        for (var d = 0, e; e = c.fieldRow[d]; d++)
            if (e.name === a) return e;
    return null
};
Blockly.Block.prototype.getFieldValue = function(a) {
    return (a = this.getField(a)) ? a.getValue() : null
};
Blockly.Block.prototype.getTitleValue = function(a) {
    console.warn("Deprecated call to getTitleValue, use getFieldValue instead.");
    return this.getFieldValue(a)
};
Blockly.Block.prototype.setFieldValue = function(a, b) {
    var c = this.getField(b);
    goog.asserts.assertObject(c, 'Field "%s" not found.', b);
    c.setValue(a)
};
Blockly.Block.prototype.setTitleValue = function(a, b) {
    console.warn("Deprecated call to setTitleValue, use setFieldValue instead.");
    this.setFieldValue(a, b)
};
Blockly.Block.prototype.setPreviousStatement = function(a, b) {
    this.previousConnection && (goog.asserts.assert(!this.previousConnection.targetConnection, "Must disconnect previous statement before removing connection."), this.previousConnection.dispose(), this.previousConnection = null);
    a && (goog.asserts.assert(!this.outputConnection, "Remove output connection prior to adding previous connection."), void 0 === b && (b = null), this.previousConnection = new Blockly.Connection(this, Blockly.PREVIOUS_STATEMENT), this.previousConnection.setCheck(b));
    this.rendered && (this.render(), this.bumpNeighbours_())
};
Blockly.Block.prototype.setNextStatement = function(a, b) {
    this.nextConnection && (goog.asserts.assert(!this.nextConnection.targetConnection, "Must disconnect next statement before removing connection."), this.nextConnection.dispose(), this.nextConnection = null);
    a && (void 0 === b && (b = null), this.nextConnection = new Blockly.Connection(this, Blockly.NEXT_STATEMENT), this.nextConnection.setCheck(b));
    this.rendered && (this.render(), this.bumpNeighbours_())
};
Blockly.Block.prototype.setOutput = function(a, b) {
    this.outputConnection && (goog.asserts.assert(!this.outputConnection.targetConnection, "Must disconnect output value before removing connection."), this.outputConnection.dispose(), this.outputConnection = null);
    a && (goog.asserts.assert(!this.previousConnection, "Remove previous connection prior to adding output connection."), void 0 === b && (b = null), this.outputConnection = new Blockly.Connection(this, Blockly.OUTPUT_VALUE), this.outputConnection.setCheck(b));
    this.rendered &&
        (this.render(), this.bumpNeighbours_())
};
Blockly.Block.prototype.setInputsInline = function(a) {
    this.inputsInline = a;
    this.rendered && (this.render(), this.bumpNeighbours_(), this.workspace.fireChangeEvent())
};
Blockly.Block.prototype.getInputsInline = function() {
    if (void 0 != this.inputsInline) return this.inputsInline;
    for (var a = 1; a < this.inputList.length; a++)
        if (this.inputList[a - 1].type == Blockly.DUMMY_INPUT && this.inputList[a].type == Blockly.DUMMY_INPUT) return !1;
    for (a = 1; a < this.inputList.length; a++)
        if (this.inputList[a - 1].type == Blockly.INPUT_VALUE && this.inputList[a].type == Blockly.DUMMY_INPUT) return !0;
    return !1
};
Blockly.Block.prototype.setDisabled = function(a) {
    this.disabled = a
};
Blockly.Block.prototype.getInheritedDisabled = function() {
    for (var a = this;;) {
        a = a.getSurroundParent();
        if (!a) return !1;
        if (a.disabled) return !0
    }
};
Blockly.Block.prototype.isCollapsed = function() {
    return this.collapsed_
};
Blockly.Block.prototype.setCollapsed = function(a) {
    this.collapsed_ = a
};
Blockly.Block.prototype.toString = function(a) {
    var b = [];
    if (this.collapsed_) b.push(this.getInput("_TEMP_COLLAPSED_INPUT").fieldRow[0].text_);
    else
        for (var c = 0, d; d = this.inputList[c]; c++) {
            for (var e = 0, f; f = d.fieldRow[e]; e++) b.push(f.getText());
            d.connection && ((d = d.connection.targetBlock()) ? b.push(d.toString()) : b.push("?"))
        }
    b = goog.string.trim(b.join(" ")) || "???";
    a && (b = goog.string.truncate(b, a));
    return b
};
Blockly.Block.prototype.appendValueInput = function(a) {
    return this.appendInput_(Blockly.INPUT_VALUE, a)
};
Blockly.Block.prototype.appendStatementInput = function(a) {
    return this.appendInput_(Blockly.NEXT_STATEMENT, a)
};
Blockly.Block.prototype.appendDummyInput = function(a) {
    return this.appendInput_(Blockly.DUMMY_INPUT, a || "")
};
Blockly.Block.prototype.jsonInit = function(a) {
    goog.asserts.assert(void 0 == a.output || void 0 == a.previousStatement, "Must not have both an output and a previousStatement.");
    this.setColour(a.colour);
    for (var b = 0; void 0 !== a["message" + b];) this.interpolate_(a["message" + b], a["args" + b] || [], a["lastDummyAlign" + b]), b++;
    void 0 !== a.inputsInline && this.setInputsInline(a.inputsInline);
    void 0 !== a.output && this.setOutput(!0, a.output);
    void 0 !== a.previousStatement && this.setPreviousStatement(!0, a.previousStatement);
    void 0 !==
        a.nextStatement && this.setNextStatement(!0, a.nextStatement);
    void 0 !== a.tooltip && this.setTooltip(a.tooltip);
    void 0 !== a.helpUrl && this.setHelpUrl(a.helpUrl)
};
Blockly.Block.prototype.interpolate_ = function(a, b, c) {
    var d = Blockly.tokenizeInterpolation(a),
        e = [],
        f = 0;
    a = [];
    for (var g = 0; g < d.length; g++) {
        var h = d[g];
        "number" == typeof h ? (goog.asserts.assert(0 < h && h <= b.length, 'Message index "%s" out of range.', h), goog.asserts.assert(!e[h], 'Message index "%s" duplicated.', h), e[h] = !0, f++, a.push(b[h - 1])) : (h = h.trim()) && a.push(h)
    }
    goog.asserts.assert(f == b.length, "Message does not reference all %s arg(s).", b.length);
    !a.length || "string" != typeof a[a.length - 1] && 0 != a[a.length - 1].type.indexOf("field_") ||
        (b = {
            type: "input_dummy"
        }, c && (b.align = c), a.push(b));
    c = {
        LEFT: Blockly.ALIGN_LEFT,
        RIGHT: Blockly.ALIGN_RIGHT,
        CENTRE: Blockly.ALIGN_CENTRE
    };
    d = [];
    for (g = 0; g < a.length; g++)
        if (e = a[g], "string" == typeof e) d.push([e, void 0]);
        else {
            b = f = null;
            do switch (h = !1, e.type) {
                case "input_value":
                    b = this.appendValueInput(e.name);
                    break;
                case "input_statement":
                    b = this.appendStatementInput(e.name);
                    break;
                case "input_dummy":
                    b = this.appendDummyInput(e.name);
                    break;
                case "field_label":
                    f = new Blockly.FieldLabel(e.text, e["class"]);
                    break;
                case "field_input":
                    f =
                        new Blockly.FieldTextInput(e.text);
                    "boolean" == typeof e.spellcheck && f.setSpellcheck(e.spellcheck);
                    break;
                case "field_angle":
                    f = new Blockly.FieldAngle(e.angle);
                    break;
                case "field_checkbox":
                    f = new Blockly.FieldCheckbox(e.checked ? "TRUE" : "FALSE");
                    break;
                case "field_colour":
                    f = new Blockly.FieldColour(e.colour);
                    break;
                case "field_variable":
                    f = new Blockly.FieldVariable(e.variable);
                    break;
                case "field_dropdown":
                    f = new Blockly.FieldDropdown(e.options);
                    break;
                case "field_image":
                    f = new Blockly.FieldImage(e.src, e.width, e.height,
                        e.alt);
                    break;
                case "field_date":
                    if (Blockly.FieldDate) {
                        f = new Blockly.FieldDate(e.date);
                        break
                    }
                default:
                    e.alt && (e = e.alt, h = !0)
            }
            while (h);
            if (f) d.push([f, e.name]);
            else if (b) {
                e.check && b.setCheck(e.check);
                e.align && b.setAlign(c[e.align]);
                for (e = 0; e < d.length; e++) b.appendField(d[e][0], d[e][1]);
                d.length = 0
            }
        }
};
Blockly.Block.prototype.appendInput_ = function(a, b) {
    var c = null;
    if (a == Blockly.INPUT_VALUE || a == Blockly.NEXT_STATEMENT) c = new Blockly.Connection(this, a);
    c = new Blockly.Input(a, b, this, c);
    this.inputList.push(c);
    this.rendered && (this.render(), this.bumpNeighbours_());
    return c
};
Blockly.Block.prototype.moveInputBefore = function(a, b) {
    if (a != b) {
        for (var c = -1, d = b ? -1 : this.inputList.length, e = 0, f; f = this.inputList[e]; e++)
            if (f.name == a) {
                if (c = e, -1 != d) break
            } else if (b && f.name == b && (d = e, -1 != c)) break;
        goog.asserts.assert(-1 != c, 'Named input "%s" not found.', a);
        goog.asserts.assert(-1 != d, 'Reference input "%s" not found.', b);
        this.moveNumberedInputBefore(c, d)
    }
};
Blockly.Block.prototype.moveNumberedInputBefore = function(a, b) {
    goog.asserts.assert(a != b, "Can't move input to itself.");
    goog.asserts.assert(a < this.inputList.length, "Input index " + a + " out of bounds.");
    goog.asserts.assert(b <= this.inputList.length, "Reference input " + b + " out of bounds.");
    var c = this.inputList[a];
    this.inputList.splice(a, 1);
    a < b && b--;
    this.inputList.splice(b, 0, c);
    this.rendered && (this.render(), this.bumpNeighbours_())
};
Blockly.Block.prototype.removeInput = function(a, b) {
    for (var c = 0, d; d = this.inputList[c]; c++)
        if (d.name == a) {
            d.connection && d.connection.targetConnection && d.connection.targetBlock().setParent(null);
            d.dispose();
            this.inputList.splice(c, 1);
            this.rendered && (this.render(), this.bumpNeighbours_());
            return
        }
    b || goog.asserts.fail('Input "%s" not found.', a)
};
Blockly.Block.prototype.getInput = function(a) {
    for (var b = 0, c; c = this.inputList[b]; b++)
        if (c.name == a) return c;
    return null
};
Blockly.Block.prototype.getInputTargetBlock = function(a) {
    return (a = this.getInput(a)) && a.connection && a.connection.targetBlock()
};
Blockly.Block.prototype.getCommentText = function() {
    return this.comment || ""
};
Blockly.Block.prototype.setCommentText = function(a) {
    this.comment = a
};
Blockly.Block.prototype.setWarningText = function(a) {};
Blockly.Block.prototype.setMutator = function(a) {};
Blockly.Block.prototype.getRelativeToSurfaceXY = function() {
    return this.xy_
};
Blockly.Block.prototype.moveBy = function(a, b) {
    this.xy_.translate(a, b)
};
Blockly.Block.BlockDB_ = Object.create(null);
Blockly.Block.getById = function(a) {
    return Blockly.Block.BlockDB_[a] || null
};
Blockly.ContextMenu = {};
Blockly.ContextMenu.currentBlock = null;
Blockly.ContextMenu.show = function(a, b, c) {
    Blockly.WidgetDiv.show(Blockly.ContextMenu, c, null);
    if (b.length) {
        var d = new goog.ui.Menu;
        d.setRightToLeft(c);
        for (var e = 0, f; f = b[e]; e++) {
            var g = new goog.ui.MenuItem(f.text);
            g.setRightToLeft(c);
            d.addChild(g, !0);
            g.setEnabled(f.enabled);
            f.enabled && goog.events.listen(g, goog.ui.Component.EventType.ACTION, f.callback)
        }
        goog.events.listen(d, goog.ui.Component.EventType.ACTION, Blockly.ContextMenu.hide);
        b = goog.dom.getViewportSize();
        f = goog.style.getViewportPageOffset(document);
        d.render(Blockly.WidgetDiv.DIV);
        var h = d.getElement();
        Blockly.addClass_(h, "blocklyContextMenu");
        g = goog.style.getSize(h);
        e = a.clientX + f.x;
        var k = a.clientY + f.y;
        a.clientY + g.height >= b.height && (k -= g.height);
        c ? g.width >= a.clientX && (e += g.width) : a.clientX + g.width >= b.width && (e -= g.width);
        Blockly.WidgetDiv.position(e, k, b, f, c);
        d.setAllowAutoFocus(!0);
        setTimeout(function() {
            h.focus()
        }, 1);
        Blockly.ContextMenu.currentBlock = null
    } else Blockly.ContextMenu.hide()
};
Blockly.ContextMenu.hide = function() {
    Blockly.WidgetDiv.hideIfOwner(Blockly.ContextMenu);
    Blockly.ContextMenu.currentBlock = null
};
Blockly.ContextMenu.callbackFactory = function(a, b) {
    return function() {
        var c = Blockly.Xml.domToBlock(a.workspace, b),
            d = a.getRelativeToSurfaceXY();
        d.x = a.RTL ? d.x - Blockly.SNAP_RADIUS : d.x + Blockly.SNAP_RADIUS;
        d.y += 2 * Blockly.SNAP_RADIUS;
        c.moveBy(d.x, d.y);
        c.select()
    }
};
Blockly.BlockSvg = function(a, b, c) {
    this.svgGroup_ = Blockly.createSvgElement("g", {}, null);
    this.svgPathDark_ = Blockly.createSvgElement("path", {
        "class": "blocklyPathDark",
        transform: "translate(1,1)"
    }, this.svgGroup_);
    this.svgPath_ = Blockly.createSvgElement("path", {
        "class": "blocklyPath"
    }, this.svgGroup_);
    this.svgPathLight_ = Blockly.createSvgElement("path", {
        "class": "blocklyPathLight"
    }, this.svgGroup_);
    this.svgPath_.tooltip = this;
    Blockly.Tooltip.bindMouseEvents(this.svgPath_);
    Blockly.BlockSvg.superClass_.constructor.call(this,
        a, b, c)
};
goog.inherits(Blockly.BlockSvg, Blockly.Block);
Blockly.BlockSvg.prototype.height = 0;
Blockly.BlockSvg.prototype.width = 0;
Blockly.BlockSvg.prototype.dragStartXY_ = null;
Blockly.BlockSvg.INLINE = -1;
Blockly.BlockSvg.prototype.initSvg = function() {
    goog.asserts.assert(this.workspace.rendered, "Workspace is headless.");
    for (var a = 0, b; b = this.inputList[a]; a++) b.init();
    b = this.getIcons();
    for (a = 0; a < b.length; a++) b[a].createIcon();
    this.updateColour();
    this.updateMovable();
    if (!this.workspace.options.readOnly && !this.eventsInit_) {
        Blockly.bindEvent_(this.getSvgRoot(), "mousedown", this, this.onMouseDown_);
        var c = this;
        Blockly.bindEvent_(this.getSvgRoot(), "touchstart", null, function(a) {
            Blockly.longStart_(a, c)
        })
    }
    goog.isFunction(this.onchange) &&
        !this.eventsInit_ && (this.onchangeWrapper_ = Blockly.bindEvent_(this.workspace.getCanvas(), "blocklyWorkspaceChange", this, this.onchange));
    this.eventsInit_ = !0;
    this.getSvgRoot().parentNode || this.workspace.getCanvas().appendChild(this.getSvgRoot())
};
Blockly.BlockSvg.prototype.select = function() {
    Blockly.selected && Blockly.selected.unselect();
    Blockly.selected = this;
    this.addSelect();
    Blockly.fireUiEvent(this.workspace.getCanvas(), "blocklySelectChange")
};
Blockly.BlockSvg.prototype.unselect = function() {
    Blockly.selected = null;
    this.removeSelect();
    Blockly.fireUiEvent(this.workspace.getCanvas(), "blocklySelectChange")
};
Blockly.BlockSvg.prototype.mutator = null;
Blockly.BlockSvg.prototype.comment = null;
Blockly.BlockSvg.prototype.warning = null;
Blockly.BlockSvg.prototype.getIcons = function() {
    var a = [];
    this.mutator && a.push(this.mutator);
    this.comment && a.push(this.comment);
    this.warning && a.push(this.warning);
    return a
};
Blockly.BlockSvg.onMouseUpWrapper_ = null;
Blockly.BlockSvg.onMouseMoveWrapper_ = null;
Blockly.BlockSvg.terminateDrag_ = function() {
    Blockly.BlockSvg.disconnectUiStop_();
    Blockly.BlockSvg.onMouseUpWrapper_ && (Blockly.unbindEvent_(Blockly.BlockSvg.onMouseUpWrapper_), Blockly.BlockSvg.onMouseUpWrapper_ = null);
    Blockly.BlockSvg.onMouseMoveWrapper_ && (Blockly.unbindEvent_(Blockly.BlockSvg.onMouseMoveWrapper_), Blockly.BlockSvg.onMouseMoveWrapper_ = null);
    var a = Blockly.selected;
    if (2 == Blockly.dragMode_ && a) {
        var b = a.getRelativeToSurfaceXY();
        b = goog.math.Coordinate.difference(b, a.dragStartXY_);
        a.moveConnections_(b.x,
            b.y);
        delete a.draggedBubbles_;
        a.setDragging_(!1);
        a.render();
        goog.Timer.callOnce(a.snapToGrid, Blockly.BUMP_DELAY / 2, a);
        goog.Timer.callOnce(a.bumpNeighbours_, Blockly.BUMP_DELAY, a);
        Blockly.fireUiEvent(window, "resize");
        a.workspace.fireChangeEvent()
    }
    Blockly.dragMode_ = 0;
    Blockly.Css.setCursor(Blockly.Css.Cursor.OPEN)
};
Blockly.BlockSvg.prototype.setParent = function(a) {
    var b = this.getSvgRoot();
    if (this.parentBlock_ && b) {
        var c = this.getRelativeToSurfaceXY();
        this.workspace.getCanvas().appendChild(b);
        b.setAttribute("transform", "translate(" + c.x + "," + c.y + ")")
    }
    Blockly.Field.startCache();
    Blockly.BlockSvg.superClass_.setParent.call(this, a);
    Blockly.Field.stopCache();
    a && (c = this.getRelativeToSurfaceXY(), a.getSvgRoot().appendChild(b), a = this.getRelativeToSurfaceXY(), this.moveConnections_(a.x - c.x, a.y - c.y))
};
Blockly.BlockSvg.prototype.getRelativeToSurfaceXY = function() {
    var a = 0,
        b = 0,
        c = this.getSvgRoot();
    if (c) {
        do {
            var d = Blockly.getRelativeXY_(c);
            a += d.x;
            b += d.y;
            c = c.parentNode
        } while (c && c != this.workspace.getCanvas())
    }
    return new goog.math.Coordinate(a, b)
};
Blockly.BlockSvg.prototype.moveBy = function(a, b) {
    var c = this.getRelativeToSurfaceXY();
    this.getSvgRoot().setAttribute("transform", "translate(" + (c.x + a) + "," + (c.y + b) + ")");
    this.moveConnections_(a, b)
};
Blockly.BlockSvg.prototype.snapToGrid = function() {
    if (this.workspace && 0 == Blockly.dragMode_ && !this.getParent() && !this.isInFlyout && this.workspace.options.gridOptions && this.workspace.options.gridOptions.snap) {
        var a = this.workspace.options.gridOptions.spacing,
            b = a / 2,
            c = this.getRelativeToSurfaceXY(),
            d = Math.round((c.x - b) / a) * a + b - c.x;
        a = Math.round((c.y - b) / a) * a + b - c.y;
        d = Math.round(d);
        a = Math.round(a);
        0 == d && 0 == a || this.moveBy(d, a)
    }
};
Blockly.BlockSvg.prototype.getHeightWidth = function() {
    var a = this.height,
        b = this.width,
        c = this.getNextBlock();
    c ? (c = c.getHeightWidth(), a += c.height - 4, b = Math.max(b, c.width)) : this.nextConnection || this.outputConnection || (a += 2);
    return {
        height: a,
        width: b
    }
};
Blockly.BlockSvg.prototype.setCollapsed = function(a) {
    if (this.collapsed_ != a) {
        for (var b = [], c = 0, d; d = this.inputList[c]; c++) b.push.apply(b, d.setVisible(!a));
        if (a) {
            d = this.getIcons();
            for (c = 0; c < d.length; c++) d[c].setVisible(!1);
            c = this.toString(Blockly.COLLAPSE_CHARS);
            this.appendDummyInput("_TEMP_COLLAPSED_INPUT").appendField(c).init()
        } else this.removeInput("_TEMP_COLLAPSED_INPUT"), this.setWarningText(null);
        Blockly.BlockSvg.superClass_.setCollapsed.call(this, a);
        b.length || (b[0] = this);
        if (this.rendered)
            for (c = 0; a =
                b[c]; c++) a.render();
        this.workspace.fireChangeEvent()
    }
};
Blockly.BlockSvg.prototype.tab = function(a, b) {
    for (var c = [], d = 0, e; e = this.inputList[d]; d++) {
        for (var f = 0, g; g = e.fieldRow[f]; f++) g instanceof Blockly.FieldTextInput && c.push(g);
        e.connection && (e = e.connection.targetBlock()) && c.push(e)
    }
    d = c.indexOf(a); - 1 == d && (d = b ? -1 : c.length);
    (c = c[b ? d + 1 : d - 1]) ? c instanceof Blockly.Field ? c.showEditor_() : c.tab(null, b): (c = this.getParent()) && c.tab(this, b)
};
Blockly.BlockSvg.prototype.onMouseDown_ = function(a) {
    if (!this.isInFlyout)
        if (this.workspace.markFocused(), Blockly.svgResize(this.workspace), Blockly.terminateDrag_(), this.select(), Blockly.hideChaff(), Blockly.isRightButton(a)) this.showContextMenu_(a);
        else if (this.isMovable()) {
        Blockly.removeAllRanges();
        Blockly.Css.setCursor(Blockly.Css.Cursor.CLOSED);
        this.dragStartXY_ = this.getRelativeToSurfaceXY();
        this.workspace.startDrag(a, this.dragStartXY_.x, this.dragStartXY_.y);
        Blockly.dragMode_ = 1;
        Blockly.BlockSvg.onMouseUpWrapper_ =
            Blockly.bindEvent_(document, "mouseup", this, this.onMouseUp_);
        Blockly.BlockSvg.onMouseMoveWrapper_ = Blockly.bindEvent_(document, "mousemove", this, this.onMouseMove_);
        this.draggedBubbles_ = [];
        for (var b = this.getDescendants(), c = 0, d; d = b[c]; c++) {
            d = d.getIcons();
            for (var e = 0; e < d.length; e++) {
                var f = d[e].getIconLocation();
                f.bubble = d[e];
                this.draggedBubbles_.push(f)
            }
        }
    } else return;
    a.stopPropagation()
};
Blockly.BlockSvg.prototype.onMouseUp_ = function(a) {
    Blockly.terminateDrag_();
    Blockly.selected && Blockly.highlightedConnection_ ? (Blockly.localConnection_.connect(Blockly.highlightedConnection_), this.rendered && (Blockly.localConnection_.isSuperior() ? Blockly.highlightedConnection_ : Blockly.localConnection_).sourceBlock_.connectionUiEffect(), this.workspace.trashcan && this.workspace.trashcan.close()) : !this.getParent() && Blockly.selected.isDeletable() && this.workspace.isDeleteArea(a) && ((a = this.workspace.trashcan) &&
        goog.Timer.callOnce(a.close, 100, a), Blockly.selected.dispose(!1, !0), Blockly.fireUiEvent(window, "resize"));
    Blockly.highlightedConnection_ && (Blockly.highlightedConnection_.unhighlight(), Blockly.highlightedConnection_ = null);
    Blockly.Css.setCursor(Blockly.Css.Cursor.OPEN)
};
Blockly.BlockSvg.prototype.showHelp_ = function() {
    var a = goog.isFunction(this.helpUrl) ? this.helpUrl() : this.helpUrl;
    a && window.open(a)
};
Blockly.BlockSvg.prototype.showContextMenu_ = function(a) {
    if (!this.workspace.options.readOnly && this.contextMenu) {
        var b = this,
            c = [];
        if (this.isDeletable() && this.isMovable() && !b.isInFlyout) {
            var d = {
                text: Blockly.Msg.DUPLICATE_BLOCK,
                enabled: !0,
                callback: function() {
                    Blockly.duplicate_(b)
                }
            };
            this.getDescendants().length > this.workspace.remainingCapacity() && (d.enabled = !1);
            c.push(d);
            this.isEditable() && !this.collapsed_ && this.workspace.options.comments && (d = {
                enabled: !goog.userAgent.IE
            }, this.comment ? (d.text = Blockly.Msg.REMOVE_COMMENT,
                d.callback = function() {
                    b.setCommentText(null)
                }) : (d.text = Blockly.Msg.ADD_COMMENT, d.callback = function() {
                b.setCommentText("")
            }), c.push(d));
            if (!this.collapsed_)
                for (d = 1; d < this.inputList.length; d++)
                    if (this.inputList[d - 1].type != Blockly.NEXT_STATEMENT && this.inputList[d].type != Blockly.NEXT_STATEMENT) {
                        d = {
                            enabled: !0
                        };
                        var e = this.getInputsInline();
                        d.text = e ? Blockly.Msg.EXTERNAL_INPUTS : Blockly.Msg.INLINE_INPUTS;
                        d.callback = function() {
                            b.setInputsInline(!e)
                        };
                        c.push(d);
                        break
                    }
            this.workspace.options.collapse && (this.collapsed_ ?
                (d = {
                    enabled: !0
                }, d.text = Blockly.Msg.EXPAND_BLOCK, d.callback = function() {
                    b.setCollapsed(!1)
                }, c.push(d)) : (d = {
                    enabled: !0
                }, d.text = Blockly.Msg.COLLAPSE_BLOCK, d.callback = function() {
                    b.setCollapsed(!0)
                }, c.push(d)));
            this.workspace.options.disable && (d = {
                text: this.disabled ? Blockly.Msg.ENABLE_BLOCK : Blockly.Msg.DISABLE_BLOCK,
                enabled: !this.getInheritedDisabled(),
                callback: function() {
                    b.setDisabled(!b.disabled)
                }
            }, c.push(d));
            d = this.getDescendants().length;
            var f = this.getNextBlock();
            f && (d -= f.getDescendants().length);
            d = {
                text: 1 == d ? Blockly.Msg.DELETE_BLOCK : Blockly.Msg.DELETE_X_BLOCKS.replace("%1", String(d)),
                enabled: !0,
                callback: function() {
                    b.dispose(!0, !0)
                }
            };
            c.push(d)
        }
        d = {
            enabled: !(goog.isFunction(this.helpUrl) ? !this.helpUrl() : !this.helpUrl)
        };
        d.text = Blockly.Msg.HELP;
        d.callback = function() {
            b.showHelp_()
        };
        c.push(d);
        this.customContextMenu && !b.isInFlyout && this.customContextMenu(c);
        Blockly.ContextMenu.show(a, c, this.RTL);
        Blockly.ContextMenu.currentBlock = this
    }
};
Blockly.BlockSvg.prototype.moveConnections_ = function(a, b) {
    if (this.rendered) {
        for (var c = this.getConnections_(!1), d = 0; d < c.length; d++) c[d].moveBy(a, b);
        c = this.getIcons();
        for (d = 0; d < c.length; d++) c[d].computeIconLocation();
        for (d = 0; d < this.childBlocks_.length; d++) this.childBlocks_[d].moveConnections_(a, b)
    }
};
Blockly.BlockSvg.prototype.setDragging_ = function(a) {
    a ? this.addDragging() : this.removeDragging();
    for (var b = 0; b < this.childBlocks_.length; b++) this.childBlocks_[b].setDragging_(a)
};
Blockly.BlockSvg.prototype.onMouseMove_ = function(a) {
    if (!("mousemove" == a.type && 1 >= a.clientX && 0 == a.clientY && 0 == a.button)) {
        Blockly.removeAllRanges();
        var b = this.getRelativeToSurfaceXY(),
            c = this.workspace.moveDrag(a),
            d = this.getSvgRoot();
        1 == Blockly.dragMode_ && goog.math.Coordinate.distance(b, c) * this.workspace.scale > Blockly.DRAG_RADIUS && (Blockly.dragMode_ = 2, Blockly.longStop_(), d.translate_ = "", d.skew_ = "", this.parentBlock_ && (this.setParent(null), this.disconnectUiEffect()), this.setDragging_(!0), this.workspace.recordDeleteAreas());
        if (2 == Blockly.dragMode_) {
            var e = b.x - this.dragStartXY_.x;
            b = b.y - this.dragStartXY_.y;
            d.translate_ = "translate(" + c.x + "," + c.y + ")";
            d.setAttribute("transform", d.translate_ + d.skew_);
            for (c = 0; c < this.draggedBubbles_.length; c++) d = this.draggedBubbles_[c], d.bubble.setIconLocation(d.x + e, d.y + b);
            d = this.getConnections_(!1);
            var f = null,
                g = null,
                h = Blockly.SNAP_RADIUS;
            for (c = 0; c < d.length; c++) {
                var k = d[c],
                    l = k.closest(h, e, b);
                l.connection && (f = l.connection, g = k, h = l.radius)
            }
            Blockly.highlightedConnection_ && Blockly.highlightedConnection_ !=
                f && (Blockly.highlightedConnection_.unhighlight(), Blockly.highlightedConnection_ = null, Blockly.localConnection_ = null);
            f && f != Blockly.highlightedConnection_ && (f.highlight(), Blockly.highlightedConnection_ = f, Blockly.localConnection_ = g);
            this.isDeletable() && this.workspace.isDeleteArea(a)
        }
    }
    a.stopPropagation()
};
Blockly.BlockSvg.prototype.updateMovable = function() {
    this.isMovable() ? Blockly.addClass_(this.svgGroup_, "blocklyDraggable") : Blockly.removeClass_(this.svgGroup_, "blocklyDraggable")
};
Blockly.BlockSvg.prototype.setMovable = function(a) {
    Blockly.BlockSvg.superClass_.setMovable.call(this, a);
    this.updateMovable()
};
Blockly.BlockSvg.prototype.setEditable = function(a) {
    Blockly.BlockSvg.superClass_.setEditable.call(this, a);
    if (this.rendered)
        for (a = 0; a < this.icons_.length; a++) this.icons_[a].updateEditable()
};
Blockly.BlockSvg.prototype.setShadow = function(a) {
    Blockly.BlockSvg.superClass_.setShadow.call(this, a);
    this.updateColour()
};
Blockly.BlockSvg.prototype.getSvgRoot = function() {
    return this.svgGroup_
};
Blockly.BlockSvg.SEP_SPACE_X = 10;
Blockly.BlockSvg.SEP_SPACE_Y = 10;
Blockly.BlockSvg.INLINE_PADDING_Y = 5;
Blockly.BlockSvg.MIN_BLOCK_Y = 25;
Blockly.BlockSvg.TAB_HEIGHT = 20;
Blockly.BlockSvg.TAB_WIDTH = 8;
Blockly.BlockSvg.NOTCH_WIDTH = 30;
Blockly.BlockSvg.CORNER_RADIUS = 8;
Blockly.BlockSvg.START_HAT = !1;
Blockly.BlockSvg.START_HAT_PATH = "c 30,-15 70,-15 100,0";
Blockly.BlockSvg.START_HAT_HIGHLIGHT_LTR = "c 17.8,-9.2 45.3,-14.9 75,-8.7 M 100.5,0.5";
Blockly.BlockSvg.START_HAT_HIGHLIGHT_RTL = "m 25,-8.7 c 29.7,-6.2 57.2,-0.5 75,8.7";
Blockly.BlockSvg.DISTANCE_45_INSIDE = (1 - Math.SQRT1_2) * (Blockly.BlockSvg.CORNER_RADIUS - .5) + .5;
Blockly.BlockSvg.DISTANCE_45_OUTSIDE = (1 - Math.SQRT1_2) * (Blockly.BlockSvg.CORNER_RADIUS + .5) - .5;
Blockly.BlockSvg.NOTCH_PATH_LEFT = "l 6,4 3,0 6,-4";
Blockly.BlockSvg.NOTCH_PATH_LEFT_HIGHLIGHT = "l 6,4 3,0 6,-4";
Blockly.BlockSvg.NOTCH_PATH_RIGHT = "l -6,4 -3,0 -6,-4";
Blockly.BlockSvg.JAGGED_TEETH = "l 8,0 0,4 8,4 -16,8 8,4";
Blockly.BlockSvg.JAGGED_TEETH_HEIGHT = 20;
Blockly.BlockSvg.JAGGED_TEETH_WIDTH = 15;
Blockly.BlockSvg.TAB_PATH_DOWN = "v 5 c 0,10 -" + Blockly.BlockSvg.TAB_WIDTH + ",-8 -" + Blockly.BlockSvg.TAB_WIDTH + ",7.5 s " + Blockly.BlockSvg.TAB_WIDTH + ",-2.5 " + Blockly.BlockSvg.TAB_WIDTH + ",7.5";
Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL = "v 6.5 m -" + .97 * Blockly.BlockSvg.TAB_WIDTH + ",3 q -" + .05 * Blockly.BlockSvg.TAB_WIDTH + ",10 " + .3 * Blockly.BlockSvg.TAB_WIDTH + ",9.5 m " + .67 * Blockly.BlockSvg.TAB_WIDTH + ",-1.9 v 1.4";
Blockly.BlockSvg.TOP_LEFT_CORNER_START = "m 0," + Blockly.BlockSvg.CORNER_RADIUS;
Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_RTL = "m " + Blockly.BlockSvg.DISTANCE_45_INSIDE + "," + Blockly.BlockSvg.DISTANCE_45_INSIDE;
Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_LTR = "m 0.5," + (Blockly.BlockSvg.CORNER_RADIUS - .5);
Blockly.BlockSvg.TOP_LEFT_CORNER = "A " + Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS + " 0 0,1 " + Blockly.BlockSvg.CORNER_RADIUS + ",0";
Blockly.BlockSvg.TOP_LEFT_CORNER_HIGHLIGHT = "A " + (Blockly.BlockSvg.CORNER_RADIUS - .5) + "," + (Blockly.BlockSvg.CORNER_RADIUS - .5) + " 0 0,1 " + Blockly.BlockSvg.CORNER_RADIUS + ",0.5";
Blockly.BlockSvg.INNER_TOP_LEFT_CORNER = Blockly.BlockSvg.NOTCH_PATH_RIGHT + " h -" + (Blockly.BlockSvg.NOTCH_WIDTH - 15 - Blockly.BlockSvg.CORNER_RADIUS) + " h -0.5 a " + Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS + " 0 0,0 -" + Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS;
Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER = "a " + Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS + " 0 0,0 " + Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS;
Blockly.BlockSvg.INNER_TOP_LEFT_CORNER_HIGHLIGHT_RTL = "a " + Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS + " 0 0,0 " + (-Blockly.BlockSvg.DISTANCE_45_OUTSIDE - .5) + "," + (Blockly.BlockSvg.CORNER_RADIUS - Blockly.BlockSvg.DISTANCE_45_OUTSIDE);
Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_RTL = "a " + (Blockly.BlockSvg.CORNER_RADIUS + .5) + "," + (Blockly.BlockSvg.CORNER_RADIUS + .5) + " 0 0,0 " + (Blockly.BlockSvg.CORNER_RADIUS + .5) + "," + (Blockly.BlockSvg.CORNER_RADIUS + .5);
Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_LTR = "a " + (Blockly.BlockSvg.CORNER_RADIUS + .5) + "," + (Blockly.BlockSvg.CORNER_RADIUS + .5) + " 0 0,0 " + (Blockly.BlockSvg.CORNER_RADIUS - Blockly.BlockSvg.DISTANCE_45_OUTSIDE) + "," + (Blockly.BlockSvg.DISTANCE_45_OUTSIDE + .5);
Blockly.BlockSvg.prototype.dispose = function(a, b, c) {
    Blockly.Field.startCache();
    this.onchangeWrapper_ && (Blockly.unbindEvent_(this.onchangeWrapper_), this.onchangeWrapper_ = null);
    Blockly.selected == this && Blockly.terminateDrag_();
    Blockly.ContextMenu.currentBlock == this && Blockly.ContextMenu.hide();
    b && this.rendered && (this.unplug(a, !1), this.disposeUiEffect());
    this.rendered = !1;
    b = this.getIcons();
    for (c = 0; c < b.length; c++) b[c].dispose();
    Blockly.BlockSvg.superClass_.dispose.call(this, a);
    goog.dom.removeNode(this.svgGroup_);
    this.svgPathDark_ = this.svgPathLight_ = this.svgPath_ = this.svgGroup_ = null;
    Blockly.Field.stopCache()
};
Blockly.BlockSvg.prototype.disposeUiEffect = function() {
    this.workspace.playAudio("delete");
    var a = Blockly.getSvgXY_(this.svgGroup_, this.workspace),
        b = this.svgGroup_.cloneNode(!0);
    b.translateX_ = a.x;
    b.translateY_ = a.y;
    b.setAttribute("transform", "translate(" + b.translateX_ + "," + b.translateY_ + ")");
    this.workspace.getParentSvg().appendChild(b);
    b.bBox_ = b.getBBox();
    Blockly.BlockSvg.disposeUiStep_(b, this.RTL, new Date, this.workspace.scale)
};
Blockly.BlockSvg.disposeUiStep_ = function(a, b, c, d) {
    var e = (new Date - c) / 150;
    1 < e ? goog.dom.removeNode(a) : (a.setAttribute("transform", "translate(" + (a.translateX_ + (b ? -1 : 1) * a.bBox_.width * d / 2 * e) + "," + (a.translateY_ + a.bBox_.height * d * e) + ") scale(" + (1 - e) * d + ")"), setTimeout(function() {
        Blockly.BlockSvg.disposeUiStep_(a, b, c, d)
    }, 10))
};
Blockly.BlockSvg.prototype.connectionUiEffect = function() {
    this.workspace.playAudio("click");
    if (!(1 > this.workspace.scale)) {
        var a = Blockly.getSvgXY_(this.svgGroup_, this.workspace);
        this.outputConnection ? (a.x += (this.RTL ? 3 : -3) * this.workspace.scale, a.y += 13 * this.workspace.scale) : this.previousConnection && (a.x += (this.RTL ? -23 : 23) * this.workspace.scale, a.y += 3 * this.workspace.scale);
        a = Blockly.createSvgElement("circle", {
            cx: a.x,
            cy: a.y,
            r: 0,
            fill: "none",
            stroke: "#888",
            "stroke-width": 10
        }, this.workspace.getParentSvg());
        Blockly.BlockSvg.connectionUiStep_(a, new Date, this.workspace.scale)
    }
};
Blockly.BlockSvg.connectionUiStep_ = function(a, b, c) {
    var d = (new Date - b) / 150;
    1 < d ? goog.dom.removeNode(a) : (a.setAttribute("r", 25 * d * c), a.style.opacity = 1 - d, Blockly.BlockSvg.disconnectUiStop_.pid_ = setTimeout(function() {
        Blockly.BlockSvg.connectionUiStep_(a, b, c)
    }, 10))
};
Blockly.BlockSvg.prototype.disconnectUiEffect = function() {
    this.workspace.playAudio("disconnect");
    if (!(1 > this.workspace.scale)) {
        var a = this.getHeightWidth().height;
        a = Math.atan(10 / a) / Math.PI * 180;
        this.RTL || (a *= -1);
        Blockly.BlockSvg.disconnectUiStep_(this.svgGroup_, a, new Date)
    }
};
Blockly.BlockSvg.disconnectUiStep_ = function(a, b, c) {
    var d = (new Date - c) / 200;
    1 < d ? a.skew_ = "" : (a.skew_ = "skewX(" + Math.round(Math.sin(d * Math.PI * 3) * (1 - d) * b) + ")", Blockly.BlockSvg.disconnectUiStop_.group = a, Blockly.BlockSvg.disconnectUiStop_.pid = setTimeout(function() {
        Blockly.BlockSvg.disconnectUiStep_(a, b, c)
    }, 10));
    a.setAttribute("transform", a.translate_ + a.skew_)
};
Blockly.BlockSvg.disconnectUiStop_ = function() {
    if (Blockly.BlockSvg.disconnectUiStop_.group) {
        clearTimeout(Blockly.BlockSvg.disconnectUiStop_.pid);
        var a = Blockly.BlockSvg.disconnectUiStop_.group;
        a.skew_ = "";
        a.setAttribute("transform", a.translate_);
        Blockly.BlockSvg.disconnectUiStop_.group = null
    }
};
Blockly.BlockSvg.disconnectUiStop_.pid = 0;
Blockly.BlockSvg.disconnectUiStop_.group = null;
Blockly.BlockSvg.prototype.updateColour = function() {
    if (!this.disabled) {
        var a = this.getColour(),
            b = goog.color.hexToRgb(a);
        if (this.isShadow()) b = goog.color.lighten(b, .6), a = goog.color.rgbArrayToHex(b), this.svgPathLight_.style.display = "none", this.svgPathDark_.setAttribute("fill", a);
        else {
            this.svgPathLight_.style.display = "";
            var c = goog.color.rgbArrayToHex(goog.color.lighten(b, .3));
            b = goog.color.rgbArrayToHex(goog.color.darken(b, .2));
            this.svgPathLight_.setAttribute("stroke", c);
            this.svgPathDark_.setAttribute("fill",
                b)
        }
        this.svgPath_.setAttribute("fill", a);
        a = this.getIcons();
        for (c = 0; c < a.length; c++) a[c].updateColour();
        for (a = 0; c = this.inputList[a]; a++) {
            b = 0;
            for (var d; d = c.fieldRow[b]; b++) d.setText(null)
        }
    }
};
Blockly.BlockSvg.prototype.updateDisabled = function() {
    var a = Blockly.hasClass_(this.svgGroup_, "blocklyDisabled");
    this.disabled || this.getInheritedDisabled() ? a || (Blockly.addClass_(this.svgGroup_, "blocklyDisabled"), this.svgPath_.setAttribute("fill", "url(#" + this.workspace.options.disabledPatternId + ")")) : a && (Blockly.removeClass_(this.svgGroup_, "blocklyDisabled"), this.updateColour());
    a = this.getChildren();
    for (var b = 0, c; c = a[b]; b++) c.updateDisabled()
};
Blockly.BlockSvg.prototype.getCommentText = function() {
    return this.comment ? this.comment.getText().replace(/\s+$/, "").replace(/ +\n/g, "\n") : ""
};
Blockly.BlockSvg.prototype.setCommentText = function(a) {
    var b = !1;
    goog.isString(a) ? (this.comment || (this.comment = new Blockly.Comment(this), b = !0), this.comment.setText(a)) : this.comment && (this.comment.dispose(), b = !0);
    b && this.rendered && (this.render(), this.bumpNeighbours_())
};
Blockly.BlockSvg.prototype.setWarningText = function(a, b) {
    this.setWarningText.pid_ || (this.setWarningText.pid_ = Object.create(null));
    var c = b || "";
    if (c) this.setWarningText.pid_[c] && (clearTimeout(this.setWarningText.pid_[c]), delete this.setWarningText.pid_[c]);
    else
        for (var d in this.setWarningText.pid_) clearTimeout(this.setWarningText.pid_[d]), delete this.setWarningText.pid_[d];
    if (2 == Blockly.dragMode_) {
        var e = this;
        this.setWarningText.pid_[c] = setTimeout(function() {
            e.workspace && (delete e.setWarningText.pid_[c],
                e.setWarningText(a, c))
        }, 100)
    } else {
        this.isInFlyout && (a = null);
        d = this.getSurroundParent();
        for (var f = null; d;) d.isCollapsed() && (f = d), d = d.getSurroundParent();
        f && f.setWarningText(a, "collapsed " + this.id + " " + c);
        d = !1;
        goog.isString(a) ? (this.warning || (this.warning = new Blockly.Warning(this), d = !0), this.warning.setText(a, c)) : this.warning && !c ? (this.warning.dispose(), d = !0) : this.warning && (d = this.warning.getText(), this.warning.setText("", c), (f = this.warning.getText()) || this.warning.dispose(), d = d == f);
        d && this.rendered &&
            (this.render(), this.bumpNeighbours_())
    }
};
Blockly.BlockSvg.prototype.setMutator = function(a) {
    this.mutator && this.mutator !== a && this.mutator.dispose();
    a && (a.block_ = this, this.mutator = a, a.createIcon())
};
Blockly.BlockSvg.prototype.setDisabled = function(a) {
    this.disabled != a && (Blockly.BlockSvg.superClass_.setDisabled.call(this, a), this.rendered && this.updateDisabled(), this.workspace.fireChangeEvent())
};
Blockly.BlockSvg.prototype.addSelect = function() {
    Blockly.addClass_(this.svgGroup_, "blocklySelected");
    this.svgGroup_.parentNode.appendChild(this.svgGroup_)
};
Blockly.BlockSvg.prototype.removeSelect = function() {
    Blockly.removeClass_(this.svgGroup_, "blocklySelected")
};
Blockly.BlockSvg.prototype.addDragging = function() {
    Blockly.addClass_(this.svgGroup_, "blocklyDragging")
};
Blockly.BlockSvg.prototype.removeDragging = function() {
    Blockly.removeClass_(this.svgGroup_, "blocklyDragging")
};
Blockly.BlockSvg.prototype.render = function(a) {
    Blockly.Field.startCache();
    this.rendered = !0;
    var b = Blockly.BlockSvg.SEP_SPACE_X;
    this.RTL && (b = -b);
    for (var c = this.getIcons(), d = 0; d < c.length; d++) b = c[d].renderIcon(b);
    b += this.RTL ? Blockly.BlockSvg.SEP_SPACE_X : -Blockly.BlockSvg.SEP_SPACE_X;
    c = this.renderCompute_(b);
    this.renderDraw_(b, c);
    !1 !== a && ((a = this.getParent()) ? a.render(!0) : Blockly.fireUiEvent(window, "resize"));
    Blockly.Field.stopCache()
};
Blockly.BlockSvg.prototype.renderFields_ = function(a, b, c) {
    c += Blockly.BlockSvg.INLINE_PADDING_Y;
    this.RTL && (b = -b);
    for (var d = 0, e; e = a[d]; d++) {
        var f = e.getSvgRoot();
        f && (this.RTL ? (b -= e.renderSep + e.renderWidth, f.setAttribute("transform", "translate(" + b + "," + c + ")"), e.renderWidth && (b -= Blockly.BlockSvg.SEP_SPACE_X)) : (f.setAttribute("transform", "translate(" + (b + e.renderSep) + "," + c + ")"), e.renderWidth && (b += e.renderSep + e.renderWidth + Blockly.BlockSvg.SEP_SPACE_X)))
    }
    return this.RTL ? -b : b
};
Blockly.BlockSvg.prototype.renderCompute_ = function(a) {
    var b = this.inputList,
        c = [];
    c.rightEdge = a + 2 * Blockly.BlockSvg.SEP_SPACE_X;
    if (this.previousConnection || this.nextConnection) c.rightEdge = Math.max(c.rightEdge, Blockly.BlockSvg.NOTCH_WIDTH + Blockly.BlockSvg.SEP_SPACE_X);
    for (var d = 0, e = 0, f = !1, g = !1, h = !1, k = void 0, l = this.getInputsInline() && !this.isCollapsed(), p = 0, m; m = b[p]; p++)
        if (m.isVisible()) {
            if (l && k && k != Blockly.NEXT_STATEMENT && m.type != Blockly.NEXT_STATEMENT) var q = c[c.length - 1];
            else k = m.type, q = [], q.type = l &&
                m.type != Blockly.NEXT_STATEMENT ? Blockly.BlockSvg.INLINE : m.type, q.height = 0, c.push(q);
            q.push(m);
            m.renderHeight = Blockly.BlockSvg.MIN_BLOCK_Y;
            m.renderWidth = l && m.type == Blockly.INPUT_VALUE ? Blockly.BlockSvg.TAB_WIDTH + 1.25 * Blockly.BlockSvg.SEP_SPACE_X : 0;
            if (m.connection && m.connection.targetConnection) {
                var n = m.connection.targetBlock().getHeightWidth();
                m.renderHeight = Math.max(m.renderHeight, n.height);
                m.renderWidth = Math.max(m.renderWidth, n.width)
            }
            l || p != b.length - 1 ? !l && m.type == Blockly.INPUT_VALUE && b[p + 1] && b[p + 1].type ==
                Blockly.NEXT_STATEMENT && m.renderHeight-- : m.renderHeight--;
            q.height = Math.max(q.height, m.renderHeight);
            m.fieldWidth = 0;
            1 == c.length && (m.fieldWidth += this.RTL ? -a : a);
            n = !1;
            for (var r = 0, t; t = m.fieldRow[r]; r++) {
                0 != r && (m.fieldWidth += Blockly.BlockSvg.SEP_SPACE_X);
                var u = t.getSize();
                t.renderWidth = u.width;
                t.renderSep = n && t.EDITABLE ? Blockly.BlockSvg.SEP_SPACE_X : 0;
                m.fieldWidth += t.renderWidth + t.renderSep;
                q.height = Math.max(q.height, u.height);
                n = t.EDITABLE
            }
            q.type != Blockly.BlockSvg.INLINE && (q.type == Blockly.NEXT_STATEMENT ?
                (g = !0, e = Math.max(e, m.fieldWidth)) : (q.type == Blockly.INPUT_VALUE ? f = !0 : q.type == Blockly.DUMMY_INPUT && (h = !0), d = Math.max(d, m.fieldWidth)))
        }
    for (a = 0; q = c[a]; a++)
        if (q.thicker = !1, q.type == Blockly.BlockSvg.INLINE)
            for (b = 0; m = q[b]; b++)
                if (m.type == Blockly.INPUT_VALUE) {
                    q.height += 2 * Blockly.BlockSvg.INLINE_PADDING_Y;
                    q.thicker = !0;
                    break
                }
    c.statementEdge = 2 * Blockly.BlockSvg.SEP_SPACE_X + e;
    g && (c.rightEdge = Math.max(c.rightEdge, c.statementEdge + Blockly.BlockSvg.NOTCH_WIDTH));
    f ? c.rightEdge = Math.max(c.rightEdge, d + 2 * Blockly.BlockSvg.SEP_SPACE_X +
        Blockly.BlockSvg.TAB_WIDTH) : h && (c.rightEdge = Math.max(c.rightEdge, d + 2 * Blockly.BlockSvg.SEP_SPACE_X));
    c.hasValue = f;
    c.hasStatement = g;
    c.hasDummy = h;
    return c
};
Blockly.BlockSvg.prototype.renderDraw_ = function(a, b) {
    this.startHat_ = !1;
    if (this.outputConnection) this.squareBottomLeftCorner_ = this.squareTopLeftCorner_ = !0;
    else {
        this.squareBottomLeftCorner_ = this.squareTopLeftCorner_ = !1;
        if (this.previousConnection) {
            var c = this.previousConnection.targetBlock();
            c && c.getNextBlock() == this && (this.squareTopLeftCorner_ = !0)
        } else Blockly.BlockSvg.START_HAT && (this.startHat_ = this.squareTopLeftCorner_ = !0, b.rightEdge = Math.max(b.rightEdge, 100));
        this.getNextBlock() && (this.squareBottomLeftCorner_ = !0)
    }
    var d = this.getRelativeToSurfaceXY(),
        e = [],
        f = [];
    c = [];
    var g = [];
    this.renderDrawTop_(e, c, d, b.rightEdge);
    var h = this.renderDrawRight_(e, c, f, g, d, b, a);
    this.renderDrawBottom_(e, c, d, h);
    this.renderDrawLeft_(e, c, d, h);
    d = e.join(" ") + "\n" + f.join(" ");
    this.svgPath_.setAttribute("d", d);
    this.svgPathDark_.setAttribute("d", d);
    d = c.join(" ") + "\n" + g.join(" ");
    this.svgPathLight_.setAttribute("d", d);
    this.RTL && (this.svgPath_.setAttribute("transform", "scale(-1 1)"), this.svgPathLight_.setAttribute("transform", "scale(-1 1)"),
        this.svgPathDark_.setAttribute("transform", "translate(1,1) scale(-1 1)"))
};
Blockly.BlockSvg.prototype.renderDrawTop_ = function(a, b, c, d) {
    this.squareTopLeftCorner_ ? (a.push("m 0,0"), b.push("m 0.5,0.5"), this.startHat_ && (a.push(Blockly.BlockSvg.START_HAT_PATH), b.push(this.RTL ? Blockly.BlockSvg.START_HAT_HIGHLIGHT_RTL : Blockly.BlockSvg.START_HAT_HIGHLIGHT_LTR))) : (a.push(Blockly.BlockSvg.TOP_LEFT_CORNER_START), b.push(this.RTL ? Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_RTL : Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_LTR), a.push(Blockly.BlockSvg.TOP_LEFT_CORNER), b.push(Blockly.BlockSvg.TOP_LEFT_CORNER_HIGHLIGHT));
    this.previousConnection && (a.push("H", Blockly.BlockSvg.NOTCH_WIDTH - 15), b.push("H", Blockly.BlockSvg.NOTCH_WIDTH - 15), a.push(Blockly.BlockSvg.NOTCH_PATH_LEFT), b.push(Blockly.BlockSvg.NOTCH_PATH_LEFT_HIGHLIGHT), this.previousConnection.moveTo(c.x + (this.RTL ? -Blockly.BlockSvg.NOTCH_WIDTH : Blockly.BlockSvg.NOTCH_WIDTH), c.y));
    a.push("H", d);
    b.push("H", d - .5);
    this.width = d
};
Blockly.BlockSvg.prototype.renderDrawRight_ = function(a, b, c, d, e, f, g) {
    for (var h, k = 0, l, p, m = 0, q; q = f[m]; m++) {
        h = Blockly.BlockSvg.SEP_SPACE_X;
        0 == m && (h += this.RTL ? -g : g);
        b.push("M", f.rightEdge - .5 + "," + (k + .5));
        if (this.isCollapsed()) {
            var n = q[0];
            l = k;
            this.renderFields_(n.fieldRow, h, l);
            a.push(Blockly.BlockSvg.JAGGED_TEETH);
            b.push("h 8");
            n = q.height - Blockly.BlockSvg.JAGGED_TEETH_HEIGHT;
            a.push("v", n);
            this.RTL && (b.push("v 3.9 l 7.2,3.4 m -14.5,8.9 l 7.3,3.5"), b.push("v", n - .7));
            this.width += Blockly.BlockSvg.JAGGED_TEETH_WIDTH
        } else if (q.type ==
            Blockly.BlockSvg.INLINE) {
            for (var r = 0; n = q[r]; r++) l = k, q.thicker && (l += Blockly.BlockSvg.INLINE_PADDING_Y), h = this.renderFields_(n.fieldRow, h, l), n.type != Blockly.DUMMY_INPUT && (h += n.renderWidth + Blockly.BlockSvg.SEP_SPACE_X), n.type == Blockly.INPUT_VALUE && (c.push("M", h - Blockly.BlockSvg.SEP_SPACE_X + "," + (k + Blockly.BlockSvg.INLINE_PADDING_Y)), c.push("h", Blockly.BlockSvg.TAB_WIDTH - 2 - n.renderWidth), c.push(Blockly.BlockSvg.TAB_PATH_DOWN), c.push("v", n.renderHeight + 1 - Blockly.BlockSvg.TAB_HEIGHT), c.push("h", n.renderWidth +
                2 - Blockly.BlockSvg.TAB_WIDTH), c.push("z"), this.RTL ? (d.push("M", h - Blockly.BlockSvg.SEP_SPACE_X - 2.5 + Blockly.BlockSvg.TAB_WIDTH - n.renderWidth + "," + (k + Blockly.BlockSvg.INLINE_PADDING_Y + .5)), d.push(Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL), d.push("v", n.renderHeight - Blockly.BlockSvg.TAB_HEIGHT + 2.5), d.push("h", n.renderWidth - Blockly.BlockSvg.TAB_WIDTH + 2)) : (d.push("M", h - Blockly.BlockSvg.SEP_SPACE_X + .5 + "," + (k + Blockly.BlockSvg.INLINE_PADDING_Y + .5)), d.push("v", n.renderHeight + 1), d.push("h", Blockly.BlockSvg.TAB_WIDTH -
                2 - n.renderWidth), d.push("M", h - n.renderWidth - Blockly.BlockSvg.SEP_SPACE_X + .9 + "," + (k + Blockly.BlockSvg.INLINE_PADDING_Y + Blockly.BlockSvg.TAB_HEIGHT - .7)), d.push("l", .46 * Blockly.BlockSvg.TAB_WIDTH + ",-2.1")), l = this.RTL ? e.x - h - Blockly.BlockSvg.TAB_WIDTH + Blockly.BlockSvg.SEP_SPACE_X + n.renderWidth + 1 : e.x + h + Blockly.BlockSvg.TAB_WIDTH - Blockly.BlockSvg.SEP_SPACE_X - n.renderWidth - 1, p = e.y + k + Blockly.BlockSvg.INLINE_PADDING_Y + 1, n.connection.moveTo(l, p), n.connection.targetConnection && n.connection.tighten_());
            h = Math.max(h,
                f.rightEdge);
            this.width = Math.max(this.width, h);
            a.push("H", h);
            b.push("H", h - .5);
            a.push("v", q.height);
            this.RTL && b.push("v", q.height - 1)
        } else q.type == Blockly.INPUT_VALUE ? (n = q[0], l = k, n.align != Blockly.ALIGN_LEFT && (r = f.rightEdge - n.fieldWidth - Blockly.BlockSvg.TAB_WIDTH - 2 * Blockly.BlockSvg.SEP_SPACE_X, n.align == Blockly.ALIGN_RIGHT ? h += r : n.align == Blockly.ALIGN_CENTRE && (h += r / 2)), this.renderFields_(n.fieldRow, h, l), a.push(Blockly.BlockSvg.TAB_PATH_DOWN), r = q.height - Blockly.BlockSvg.TAB_HEIGHT, a.push("v", r), this.RTL ?
            (b.push(Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL), b.push("v", r + .5)) : (b.push("M", f.rightEdge - 5 + "," + (k + Blockly.BlockSvg.TAB_HEIGHT - .7)), b.push("l", .46 * Blockly.BlockSvg.TAB_WIDTH + ",-2.1")), l = e.x + (this.RTL ? -f.rightEdge - 1 : f.rightEdge + 1), p = e.y + k, n.connection.moveTo(l, p), n.connection.targetConnection && (n.connection.tighten_(), this.width = Math.max(this.width, f.rightEdge + n.connection.targetBlock().getHeightWidth().width - Blockly.BlockSvg.TAB_WIDTH + 1))) : q.type == Blockly.DUMMY_INPUT ? (n = q[0], l = k, n.align != Blockly.ALIGN_LEFT &&
            (r = f.rightEdge - n.fieldWidth - 2 * Blockly.BlockSvg.SEP_SPACE_X, f.hasValue && (r -= Blockly.BlockSvg.TAB_WIDTH), n.align == Blockly.ALIGN_RIGHT ? h += r : n.align == Blockly.ALIGN_CENTRE && (h += r / 2)), this.renderFields_(n.fieldRow, h, l), a.push("v", q.height), this.RTL && b.push("v", q.height - 1)) : q.type == Blockly.NEXT_STATEMENT && (n = q[0], 0 == m && (a.push("v", Blockly.BlockSvg.SEP_SPACE_Y), this.RTL && b.push("v", Blockly.BlockSvg.SEP_SPACE_Y - 1), k += Blockly.BlockSvg.SEP_SPACE_Y), l = k, n.align != Blockly.ALIGN_LEFT && (r = f.statementEdge - n.fieldWidth -
            2 * Blockly.BlockSvg.SEP_SPACE_X, n.align == Blockly.ALIGN_RIGHT ? h += r : n.align == Blockly.ALIGN_CENTRE && (h += r / 2)), this.renderFields_(n.fieldRow, h, l), h = f.statementEdge + Blockly.BlockSvg.NOTCH_WIDTH, a.push("H", h), a.push(Blockly.BlockSvg.INNER_TOP_LEFT_CORNER), a.push("v", q.height - 2 * Blockly.BlockSvg.CORNER_RADIUS), a.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER), a.push("H", f.rightEdge), this.RTL ? (b.push("M", h - Blockly.BlockSvg.NOTCH_WIDTH + Blockly.BlockSvg.DISTANCE_45_OUTSIDE + "," + (k + Blockly.BlockSvg.DISTANCE_45_OUTSIDE)),
            b.push(Blockly.BlockSvg.INNER_TOP_LEFT_CORNER_HIGHLIGHT_RTL), b.push("v", q.height - 2 * Blockly.BlockSvg.CORNER_RADIUS), b.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_RTL)) : (b.push("M", h - Blockly.BlockSvg.NOTCH_WIDTH + Blockly.BlockSvg.DISTANCE_45_OUTSIDE + "," + (k + q.height - Blockly.BlockSvg.DISTANCE_45_OUTSIDE)), b.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_LTR)), b.push("H", f.rightEdge - .5), l = e.x + (this.RTL ? -h : h + 1), p = e.y + k + 1, n.connection.moveTo(l, p), n.connection.targetConnection && (n.connection.tighten_(),
            this.width = Math.max(this.width, f.statementEdge + n.connection.targetBlock().getHeightWidth().width)), m == f.length - 1 || f[m + 1].type == Blockly.NEXT_STATEMENT) && (a.push("v", Blockly.BlockSvg.SEP_SPACE_Y), this.RTL && b.push("v", Blockly.BlockSvg.SEP_SPACE_Y - 1), k += Blockly.BlockSvg.SEP_SPACE_Y);
        k += q.height
    }
    f.length || (k = Blockly.BlockSvg.MIN_BLOCK_Y, a.push("V", k), this.RTL && b.push("V", k - 1));
    return k
};
Blockly.BlockSvg.prototype.renderDrawBottom_ = function(a, b, c, d) {
    this.height = d + 1;
    this.nextConnection && (a.push("H", Blockly.BlockSvg.NOTCH_WIDTH + (this.RTL ? .5 : -.5) + " " + Blockly.BlockSvg.NOTCH_PATH_RIGHT), this.nextConnection.moveTo(this.RTL ? c.x - Blockly.BlockSvg.NOTCH_WIDTH : c.x + Blockly.BlockSvg.NOTCH_WIDTH, c.y + d + 1), this.nextConnection.targetConnection && this.nextConnection.tighten_(), this.height += 4);
    this.squareBottomLeftCorner_ ? (a.push("H 0"), this.RTL || b.push("M", "0.5," + (d - .5))) : (a.push("H", Blockly.BlockSvg.CORNER_RADIUS),
        a.push("a", Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS + " 0 0,1 -" + Blockly.BlockSvg.CORNER_RADIUS + ",-" + Blockly.BlockSvg.CORNER_RADIUS), this.RTL || (b.push("M", Blockly.BlockSvg.DISTANCE_45_INSIDE + "," + (d - Blockly.BlockSvg.DISTANCE_45_INSIDE)), b.push("A", Blockly.BlockSvg.CORNER_RADIUS - .5 + "," + (Blockly.BlockSvg.CORNER_RADIUS - .5) + " 0 0,1 0.5," + (d - Blockly.BlockSvg.CORNER_RADIUS))))
};
Blockly.BlockSvg.prototype.renderDrawLeft_ = function(a, b, c, d) {
    this.outputConnection ? (this.outputConnection.moveTo(c.x, c.y), a.push("V", Blockly.BlockSvg.TAB_HEIGHT), a.push("c 0,-10 -" + Blockly.BlockSvg.TAB_WIDTH + ",8 -" + Blockly.BlockSvg.TAB_WIDTH + ",-7.5 s " + Blockly.BlockSvg.TAB_WIDTH + ",2.5 " + Blockly.BlockSvg.TAB_WIDTH + ",-7.5"), this.RTL ? (b.push("M", -.25 * Blockly.BlockSvg.TAB_WIDTH + ",8.4"), b.push("l", -.45 * Blockly.BlockSvg.TAB_WIDTH + ",-2.1")) : (b.push("V", Blockly.BlockSvg.TAB_HEIGHT - 1.5), b.push("m", -.92 * Blockly.BlockSvg.TAB_WIDTH +
        ",-0.5 q " + -.19 * Blockly.BlockSvg.TAB_WIDTH + ",-5.5 0,-11"), b.push("m", .92 * Blockly.BlockSvg.TAB_WIDTH + ",1 V 0.5 H 1")), this.width += Blockly.BlockSvg.TAB_WIDTH) : this.RTL || (this.squareTopLeftCorner_ ? b.push("V", .5) : b.push("V", Blockly.BlockSvg.CORNER_RADIUS));
    a.push("z")
};
Blockly.Msg = {};
goog.getMsgOrig = goog.getMsg;
goog.getMsg = function(a, b) {
    var c = goog.getMsg.blocklyMsgMap[a];
    c && (a = Blockly.Msg[c]);
    return goog.getMsgOrig(a, b)
};
goog.getMsg.blocklyMsgMap = {
    Today: "TODAY"
};
Blockly.FieldTextInput = function(a, b) {
    Blockly.FieldTextInput.superClass_.constructor.call(this, a);
    this.setChangeHandler(b)
};
goog.inherits(Blockly.FieldTextInput, Blockly.Field);
Blockly.FieldTextInput.FONTSIZE = 11;
Blockly.FieldTextInput.prototype.CURSOR = "text";
Blockly.FieldTextInput.prototype.spellcheck_ = !0;
Blockly.FieldTextInput.prototype.dispose = function() {
    Blockly.WidgetDiv.hideIfOwner(this);
    Blockly.FieldTextInput.superClass_.dispose.call(this)
};
Blockly.FieldTextInput.prototype.setText = function(a) {
    if (null !== a) {
        if (this.sourceBlock_ && this.changeHandler_) {
            var b = this.changeHandler_(a);
            null !== b && void 0 !== b && (a = b)
        }
        Blockly.Field.prototype.setText.call(this, a)
    }
};
Blockly.FieldTextInput.prototype.setSpellcheck = function(a) {
    this.spellcheck_ = a
};
Blockly.FieldTextInput.prototype.showEditor_ = function(a) {
    var b = a || !1;
    if (!b && (goog.userAgent.MOBILE || goog.userAgent.ANDROID || goog.userAgent.IPAD)) a = window.prompt(Blockly.Msg.CHANGE_VALUE_TITLE, this.text_), this.sourceBlock_ && this.changeHandler_ && (b = this.changeHandler_(a), void 0 !== b && (a = b)), null !== a && this.setText(a);
    else {
        Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL, this.widgetDispose_());
        var c = Blockly.WidgetDiv.DIV;
        a = goog.dom.createDom("input", "blocklyHtmlInput");
        a.setAttribute("spellcheck", this.spellcheck_);
        var d = Blockly.FieldTextInput.FONTSIZE * this.sourceBlock_.workspace.scale + "pt";
        c.style.fontSize = d;
        a.style.fontSize = d;
        Blockly.FieldTextInput.htmlInput_ = a;
        c.appendChild(a);
        a.value = a.defaultValue = this.text_;
        a.oldValue_ = null;
        this.validate_();
        this.resizeEditor_();
        b || (a.focus(), a.select());
        a.onKeyDownWrapper_ = Blockly.bindEvent_(a, "keydown", this, this.onHtmlInputKeyDown_);
        a.onKeyUpWrapper_ = Blockly.bindEvent_(a, "keyup", this, this.onHtmlInputChange_);
        a.onKeyPressWrapper_ = Blockly.bindEvent_(a, "keypress", this, this.onHtmlInputChange_);
        b = this.sourceBlock_.workspace.getCanvas();
        a.onWorkspaceChangeWrapper_ = Blockly.bindEvent_(b, "blocklyWorkspaceChange", this, this.resizeEditor_)
    }
};
Blockly.FieldTextInput.prototype.onHtmlInputKeyDown_ = function(a) {
    var b = Blockly.FieldTextInput.htmlInput_;
    13 == a.keyCode ? Blockly.WidgetDiv.hide() : 27 == a.keyCode ? (this.setText(b.defaultValue), Blockly.WidgetDiv.hide()) : 9 == a.keyCode && (Blockly.WidgetDiv.hide(), this.sourceBlock_.tab(this, !a.shiftKey), a.preventDefault())
};
Blockly.FieldTextInput.prototype.onHtmlInputChange_ = function(a) {
    var b = Blockly.FieldTextInput.htmlInput_;
    27 != a.keyCode && (a = b.value, a !== b.oldValue_ ? (this.sourceBlock_.setShadow(!1), b.oldValue_ = a, this.setText(a), this.validate_()) : goog.userAgent.WEBKIT && this.sourceBlock_.render())
};
Blockly.FieldTextInput.prototype.validate_ = function() {
    var a = !0;
    goog.asserts.assertObject(Blockly.FieldTextInput.htmlInput_);
    var b = Blockly.FieldTextInput.htmlInput_;
    this.sourceBlock_ && this.changeHandler_ && (a = this.changeHandler_(b.value));
    null === a ? Blockly.addClass_(b, "blocklyInvalidInput") : Blockly.removeClass_(b, "blocklyInvalidInput")
};
Blockly.FieldTextInput.prototype.resizeEditor_ = function() {
    var a = Blockly.WidgetDiv.DIV,
        b = this.fieldGroup_.getBBox();
    a.style.width = b.width * this.sourceBlock_.workspace.scale + "px";
    a.style.height = b.height * this.sourceBlock_.workspace.scale + "px";
    b = this.getAbsoluteXY_();
    if (this.sourceBlock_.RTL) {
        var c = this.getScaledBBox_();
        b.x += c.width;
        b.x -= a.offsetWidth
    }
    b.y += 1;
    goog.userAgent.GECKO && Blockly.WidgetDiv.DIV.style.top && (--b.x, --b.y);
    goog.userAgent.WEBKIT && (b.y -= 3);
    a.style.left = b.x + "px";
    a.style.top = b.y + "px"
};
Blockly.FieldTextInput.prototype.widgetDispose_ = function() {
    var a = this;
    return function() {
        var b = Blockly.FieldTextInput.htmlInput_,
            c = b.value;
        if (a.sourceBlock_ && a.changeHandler_) {
            var d = a.changeHandler_(c);
            null === d ? c = b.defaultValue : void 0 !== d && (c = d)
        }
        a.setText(c);
        a.sourceBlock_.rendered && a.sourceBlock_.render();
        Blockly.unbindEvent_(b.onKeyDownWrapper_);
        Blockly.unbindEvent_(b.onKeyUpWrapper_);
        Blockly.unbindEvent_(b.onKeyPressWrapper_);
        Blockly.unbindEvent_(b.onWorkspaceChangeWrapper_);
        Blockly.FieldTextInput.htmlInput_ =
            null;
        b = Blockly.WidgetDiv.DIV.style;
        b.width = "auto";
        b.height = "auto";
        b.fontSize = ""
    }
};
Blockly.FieldTextInput.numberValidator = function(a) {
    if (null === a) return null;
    a = String(a);
    a = a.replace(/O/ig, "0");
    a = a.replace(/,/g, "");
    a = parseFloat(a || 0);
    return isNaN(a) ? null : String(a)
};
Blockly.FieldTextInput.nonnegativeIntegerValidator = function(a) {
    (a = Blockly.FieldTextInput.numberValidator(a)) && (a = String(Math.max(0, Math.floor(a))));
    return a
};
Blockly.FieldAngle = function(a, b) {
    this.symbol_ = Blockly.createSvgElement("tspan", {}, null);
    this.symbol_.appendChild(document.createTextNode("\u00b0"));
    Blockly.FieldAngle.superClass_.constructor.call(this, a, null);
    this.setChangeHandler(b)
};
goog.inherits(Blockly.FieldAngle, Blockly.FieldTextInput);
Blockly.FieldAngle.prototype.setChangeHandler = function(a) {
    Blockly.FieldAngle.superClass_.setChangeHandler.call(this, a ? function(b) {
        var c = a.call(this, b);
        if (null === c) var d = c;
        else void 0 === c && (c = b), d = Blockly.FieldAngle.angleValidator.call(this, c), void 0 !== d && (d = c);
        return d === b ? void 0 : d
    } : Blockly.FieldAngle.angleValidator)
};
Blockly.FieldAngle.ROUND = 15;
Blockly.FieldAngle.HALF = 50;
Blockly.FieldAngle.RADIUS = Blockly.FieldAngle.HALF - 1;
Blockly.FieldAngle.prototype.dispose_ = function() {
    var a = this;
    return function() {
        Blockly.FieldAngle.superClass_.dispose_.call(a)();
        a.gauge_ = null;
        a.clickWrapper_ && Blockly.unbindEvent_(a.clickWrapper_);
        a.moveWrapper1_ && Blockly.unbindEvent_(a.moveWrapper1_);
        a.moveWrapper2_ && Blockly.unbindEvent_(a.moveWrapper2_)
    }
};
Blockly.FieldAngle.prototype.showEditor_ = function() {
    Blockly.FieldAngle.superClass_.showEditor_.call(this, goog.userAgent.MOBILE || goog.userAgent.ANDROID || goog.userAgent.IPAD);
    var a = Blockly.WidgetDiv.DIV;
    if (a.firstChild) {
        a = Blockly.createSvgElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:html": "http://www.w3.org/1999/xhtml",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            version: "1.1",
            height: 2 * Blockly.FieldAngle.HALF + "px",
            width: 2 * Blockly.FieldAngle.HALF + "px"
        }, a);
        var b = Blockly.createSvgElement("circle", {
            cx: Blockly.FieldAngle.HALF,
            cy: Blockly.FieldAngle.HALF,
            r: Blockly.FieldAngle.RADIUS,
            "class": "blocklyAngleCircle"
        }, a);
        this.gauge_ = Blockly.createSvgElement("path", {
            "class": "blocklyAngleGauge"
        }, a);
        this.line_ = Blockly.createSvgElement("line", {
            x1: Blockly.FieldAngle.HALF,
            y1: Blockly.FieldAngle.HALF,
            "class": "blocklyAngleLine"
        }, a);
        for (var c = 0; 360 > c; c += 15) Blockly.createSvgElement("line", {
            x1: Blockly.FieldAngle.HALF + Blockly.FieldAngle.RADIUS,
            y1: Blockly.FieldAngle.HALF,
            x2: Blockly.FieldAngle.HALF + Blockly.FieldAngle.RADIUS -
                (0 == c % 45 ? 10 : 5),
            y2: Blockly.FieldAngle.HALF,
            "class": "blocklyAngleMarks",
            transform: "rotate(" + c + "," + Blockly.FieldAngle.HALF + "," + Blockly.FieldAngle.HALF + ")"
        }, a);
        a.style.marginLeft = 15 - Blockly.FieldAngle.RADIUS + "px";
        this.clickWrapper_ = Blockly.bindEvent_(a, "click", this, Blockly.WidgetDiv.hide);
        this.moveWrapper1_ = Blockly.bindEvent_(b, "mousemove", this, this.onMouseMove);
        this.moveWrapper2_ = Blockly.bindEvent_(this.gauge_, "mousemove", this, this.onMouseMove);
        this.updateGraph_()
    }
};
Blockly.FieldAngle.prototype.onMouseMove = function(a) {
    var b = this.gauge_.ownerSVGElement.getBoundingClientRect(),
        c = a.clientX - b.left - Blockly.FieldAngle.HALF;
    a = a.clientY - b.top - Blockly.FieldAngle.HALF;
    b = Math.atan(-a / c);
    isNaN(b) || (b = goog.math.toDegrees(b), 0 > c ? b += 180 : 0 < a && (b += 360), Blockly.FieldAngle.ROUND && (b = Math.round(b / Blockly.FieldAngle.ROUND) * Blockly.FieldAngle.ROUND), 360 <= b && (b -= 360), b = String(b), Blockly.FieldTextInput.htmlInput_.value = b, this.setText(b), this.validate_())
};
Blockly.FieldAngle.prototype.setText = function(a) {
    Blockly.FieldAngle.superClass_.setText.call(this, a);
    this.textElement_ && (this.updateGraph_(), this.sourceBlock_.RTL ? this.textElement_.insertBefore(this.symbol_, this.textElement_.firstChild) : this.textElement_.appendChild(this.symbol_), this.size_.width = 0)
};
Blockly.FieldAngle.prototype.updateGraph_ = function() {
    if (this.gauge_) {
        var a = goog.math.toRadians(Number(this.getText()));
        if (isNaN(a)) this.gauge_.setAttribute("d", "M " + Blockly.FieldAngle.HALF + "," + Blockly.FieldAngle.HALF), this.line_.setAttribute("x2", Blockly.FieldAngle.HALF), this.line_.setAttribute("y2", Blockly.FieldAngle.HALF);
        else {
            var b = Blockly.FieldAngle.HALF + Math.cos(a) * Blockly.FieldAngle.RADIUS,
                c = Blockly.FieldAngle.HALF + Math.sin(a) * -Blockly.FieldAngle.RADIUS;
            this.gauge_.setAttribute("d", "M " + Blockly.FieldAngle.HALF +
                "," + Blockly.FieldAngle.HALF + " h " + Blockly.FieldAngle.RADIUS + " A " + Blockly.FieldAngle.RADIUS + "," + Blockly.FieldAngle.RADIUS + " 0 " + (a > Math.PI ? 1 : 0) + " 0 " + b + "," + c + " z");
            this.line_.setAttribute("x2", b);
            this.line_.setAttribute("y2", c)
        }
    }
};
Blockly.FieldAngle.angleValidator = function(a) {
    a = Blockly.FieldTextInput.numberValidator(a);
    null !== a && (a %= 360, 0 > a && (a += 360), a = String(a));
    return a
};
Blockly.FieldCheckbox = function(a, b) {
    Blockly.FieldCheckbox.superClass_.constructor.call(this, "");
    this.setChangeHandler(b);
    this.setValue(a)
};
goog.inherits(Blockly.FieldCheckbox, Blockly.Field);
Blockly.FieldCheckbox.prototype.CURSOR = "default";
Blockly.FieldCheckbox.prototype.init = function(a) {
    this.sourceBlock_ || (Blockly.FieldCheckbox.superClass_.init.call(this, a), this.checkElement_ = Blockly.createSvgElement("text", {
        "class": "blocklyText",
        x: -3,
        y: 14
    }, this.fieldGroup_), a = document.createTextNode("\u2713"), this.checkElement_.appendChild(a), this.checkElement_.style.display = this.state_ ? "block" : "none")
};
Blockly.FieldCheckbox.prototype.getValue = function() {
    return String(this.state_).toUpperCase()
};
Blockly.FieldCheckbox.prototype.setValue = function(a) {
    a = "TRUE" == a;
    this.state_ !== a && (this.state_ = a, this.checkElement_ && (this.checkElement_.style.display = a ? "block" : "none"), this.sourceBlock_ && this.sourceBlock_.rendered && this.sourceBlock_.workspace.fireChangeEvent())
};
Blockly.FieldCheckbox.prototype.showEditor_ = function() {
    var a = !this.state_;
    if (this.sourceBlock_ && this.changeHandler_) {
        var b = this.changeHandler_(a);
        void 0 !== b && (a = b)
    }
    null !== a && (this.sourceBlock_.setShadow(!1), this.setValue(String(a).toUpperCase()))
};
Blockly.FieldColour = function(a, b) {
    Blockly.FieldColour.superClass_.constructor.call(this, "\u00a0\u00a0\u00a0");
    this.setChangeHandler(b);
    this.setValue(a)
};
goog.inherits(Blockly.FieldColour, Blockly.Field);
Blockly.FieldColour.prototype.colours_ = null;
Blockly.FieldColour.prototype.columns_ = 0;
Blockly.FieldColour.prototype.init = function(a) {
    Blockly.FieldColour.superClass_.init.call(this, a);
    this.borderRect_.style.fillOpacity = 1;
    this.setValue(this.getValue())
};
Blockly.FieldColour.prototype.CURSOR = "default";
Blockly.FieldColour.prototype.dispose = function() {
    Blockly.WidgetDiv.hideIfOwner(this);
    Blockly.FieldColour.superClass_.dispose.call(this)
};
Blockly.FieldColour.prototype.getValue = function() {
    return this.colour_
};
Blockly.FieldColour.prototype.setValue = function(a) {
    this.colour_ = a;
    this.borderRect_ && (this.borderRect_.style.fill = a);
    this.sourceBlock_ && this.sourceBlock_.rendered && this.sourceBlock_.workspace.fireChangeEvent()
};
Blockly.FieldColour.prototype.getText = function() {
    var a = this.colour_,
        b = a.match(/^#(.)\1(.)\2(.)\3$/);
    b && (a = "#" + b[1] + b[2] + b[3]);
    return a
};
Blockly.FieldColour.COLOURS = goog.ui.ColorPicker.SIMPLE_GRID_COLORS;
Blockly.FieldColour.COLUMNS = 7;
Blockly.FieldColour.prototype.setColours = function(a) {
    this.colours_ = a;
    return this
};
Blockly.FieldColour.prototype.setColumns = function(a) {
    this.columns_ = a;
    return this
};
Blockly.FieldColour.prototype.showEditor_ = function() {
    Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL, Blockly.FieldColour.widgetDispose_);
    var a = new goog.ui.ColorPicker;
    a.setSize(this.columns_ || Blockly.FieldColour.COLUMNS);
    a.setColors(this.colours_ || Blockly.FieldColour.COLOURS);
    var b = goog.dom.getViewportSize(),
        c = goog.style.getViewportPageOffset(document),
        d = this.getAbsoluteXY_(),
        e = this.getScaledBBox_();
    a.render(Blockly.WidgetDiv.DIV);
    a.setSelectedColor(this.getValue());
    var f = goog.style.getSize(a.getElement());
    d.y = d.y + f.height + e.height >= b.height + c.y ? d.y - (f.height - 1) : d.y + (e.height - 1);
    this.sourceBlock_.RTL ? (d.x += e.width, d.x -= f.width, d.x < c.x && (d.x = c.x)) : d.x > b.width + c.x - f.width && (d.x = b.width + c.x - f.width);
    Blockly.WidgetDiv.position(d.x, d.y, b, c, this.sourceBlock_.RTL);
    var g = this;
    Blockly.FieldColour.changeEventKey_ = goog.events.listen(a, goog.ui.ColorPicker.EventType.CHANGE, function(a) {
        a = a.target.getSelectedColor() || "#000000";
        Blockly.WidgetDiv.hide();
        if (g.sourceBlock_ && g.changeHandler_) {
            var b = g.changeHandler_(a);
            void 0 !== b && (a = b)
        }
        null !== a && (g.sourceBlock_.setShadow(!1), g.setValue(a))
    })
};
Blockly.FieldColour.widgetDispose_ = function() {
    Blockly.FieldColour.changeEventKey_ && goog.events.unlistenByKey(Blockly.FieldColour.changeEventKey_)
};
Blockly.FieldDropdown = function(a, b) {
    this.menuGenerator_ = a;
    this.setChangeHandler(b);
    this.trimOptions_();
    var c = this.getOptions_()[0];
    this.value_ = c[1];
    Blockly.FieldDropdown.superClass_.constructor.call(this, c[0])
};
goog.inherits(Blockly.FieldDropdown, Blockly.Field);
Blockly.FieldDropdown.CHECKMARK_OVERHANG = 25;
Blockly.FieldDropdown.ARROW_CHAR = goog.userAgent.ANDROID ? "\u25bc" : "\u25be";
Blockly.FieldDropdown.prototype.CURSOR = "default";
Blockly.FieldDropdown.prototype.init = function(a) {
    this.sourceBlock_ || (this.arrow_ = Blockly.createSvgElement("tspan", {}, null), this.arrow_.appendChild(document.createTextNode(a.RTL ? Blockly.FieldDropdown.ARROW_CHAR + " " : " " + Blockly.FieldDropdown.ARROW_CHAR)), Blockly.FieldDropdown.superClass_.init.call(this, a), a = this.text_, this.text_ = null, this.setText(a))
};
Blockly.FieldDropdown.prototype.showEditor_ = function() {
    Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL, null);
    var a = this,
        b = new goog.ui.Menu;
    b.setRightToLeft(this.sourceBlock_.RTL);
    for (var c = this.getOptions_(), d = 0; d < c.length; d++) {
        var e = c[d][1],
            f = new goog.ui.MenuItem(c[d][0]);
        f.setRightToLeft(this.sourceBlock_.RTL);
        f.setValue(e);
        f.setCheckable(!0);
        b.addChild(f, !0);
        f.setChecked(e == this.value_)
    }
    goog.events.listen(b, goog.ui.Component.EventType.ACTION, function(b) {
        if (b = b.target) {
            b = b.getValue();
            if (a.sourceBlock_ &&
                a.changeHandler_) {
                var c = a.changeHandler_(b);
                void 0 !== c && (b = c)
            }
            null !== b && (a.sourceBlock_.setShadow(!1), a.setValue(b))
        }
        Blockly.WidgetDiv.hideIfOwner(a)
    });
    b.getHandler().listen(b.getElement(), goog.events.EventType.TOUCHSTART, function(a) {
        this.getOwnerControl(a.target).handleMouseDown(a)
    });
    b.getHandler().listen(b.getElement(), goog.events.EventType.TOUCHEND, function(a) {
        this.getOwnerControl(a.target).performActionInternal(a)
    });
    c = goog.dom.getViewportSize();
    c.height -= 150;
    d = goog.style.getViewportPageOffset(document);
    d.y += 100;
    e = this.getAbsoluteXY_();
    f = this.getScaledBBox_();
    b.render(Blockly.WidgetDiv.DIV);
    var g = b.getElement();
    Blockly.addClass_(g, "blocklyDropdownMenu");
    var h = goog.style.getSize(g);
    h.height = g.scrollHeight;
    e.y = e.y + h.height + f.height >= c.height + d.y ? e.y - (h.height + 2) : e.y + f.height;
    this.sourceBlock_.RTL ? (e.x += f.width, e.x += Blockly.FieldDropdown.CHECKMARK_OVERHANG, e.x < d.x + h.width && (e.x = d.x + h.width)) : (e.x -= Blockly.FieldDropdown.CHECKMARK_OVERHANG, e.x > c.width + d.x - h.width && (e.x = c.width + d.x - h.width));
    Blockly.WidgetDiv.position(e.x,
        e.y, c, d, this.sourceBlock_.RTL);
    b.setAllowAutoFocus(!0);
    g.focus()
};
Blockly.FieldDropdown.prototype.trimOptions_ = function() {
    this.suffixField = this.prefixField = null;
    var a = this.menuGenerator_;
    if (goog.isArray(a) && !(2 > a.length)) {
        var b = a.map(function(a) {
                return a[0]
            }),
            c = Blockly.shortestStringLength(b),
            d = Blockly.commonWordPrefix(b, c),
            e = Blockly.commonWordSuffix(b, c);
        if ((d || e) && !(c <= d + e)) {
            d && (this.prefixField = b[0].substring(0, d - 1));
            e && (this.suffixField = b[0].substr(1 - e));
            b = [];
            for (c = 0; c < a.length; c++) {
                var f = a[c][0],
                    g = a[c][1];
                f = f.substring(d, f.length - e);
                b[c] = [f, g]
            }
            this.menuGenerator_ =
                b
        }
    }
};
Blockly.FieldDropdown.prototype.getOptions_ = function() {
    return goog.isFunction(this.menuGenerator_) ? this.menuGenerator_.call(this) : this.menuGenerator_
};
Blockly.FieldDropdown.prototype.getValue = function() {
    return this.value_
};
Blockly.FieldDropdown.prototype.setValue = function(a) {
    this.value_ = a;
    for (var b = this.getOptions_(), c = 0; c < b.length; c++)
        if (b[c][1] == a) {
            this.setText(b[c][0]);
            return
        }
    this.setText(a)
};
Blockly.FieldDropdown.prototype.setText = function(a) {
    this.sourceBlock_ && this.arrow_ && (this.arrow_.style.fill = this.sourceBlock_.getColour());
    null !== a && a !== this.text_ && (this.text_ = a, this.updateTextNode_(), this.textElement_ && (this.sourceBlock_.RTL ? this.textElement_.insertBefore(this.arrow_, this.textElement_.firstChild) : this.textElement_.appendChild(this.arrow_)), this.sourceBlock_ && this.sourceBlock_.rendered && (this.sourceBlock_.render(), this.sourceBlock_.bumpNeighbours_(), this.sourceBlock_.workspace.fireChangeEvent()))
};
Blockly.FieldDropdown.prototype.dispose = function() {
    Blockly.WidgetDiv.hideIfOwner(this);
    Blockly.FieldDropdown.superClass_.dispose.call(this)
};
Blockly.FieldImage = function(a, b, c, d) {
    this.sourceBlock_ = null;
    this.height_ = Number(c);
    this.width_ = Number(b);
    this.size_ = new goog.math.Size(this.width_, this.height_ + 2 * Blockly.BlockSvg.INLINE_PADDING_Y);
    this.text_ = d || "";
    this.setValue(a)
};
goog.inherits(Blockly.FieldImage, Blockly.Field);
Blockly.FieldImage.prototype.rectElement_ = null;
Blockly.FieldImage.prototype.EDITABLE = !1;
Blockly.FieldImage.prototype.init = function(a) {
    this.sourceBlock_ || (this.sourceBlock_ = a, this.fieldGroup_ = Blockly.createSvgElement("g", {}, null), this.visible_ || (this.fieldGroup_.style.display = "none"), this.imageElement_ = Blockly.createSvgElement("image", {
            height: this.height_ + "px",
            width: this.width_ + "px"
        }, this.fieldGroup_), this.setValue(this.src_), goog.userAgent.GECKO && (this.rectElement_ = Blockly.createSvgElement("rect", {
            height: this.height_ + "px",
            width: this.width_ + "px",
            "fill-opacity": 0
        }, this.fieldGroup_)), a.getSvgRoot().appendChild(this.fieldGroup_),
        a = this.rectElement_ || this.imageElement_, a.tooltip = this.sourceBlock_, Blockly.Tooltip.bindMouseEvents(a))
};
Blockly.FieldImage.prototype.dispose = function() {
    goog.dom.removeNode(this.fieldGroup_);
    this.rectElement_ = this.imageElement_ = this.fieldGroup_ = null
};
Blockly.FieldImage.prototype.setTooltip = function(a) {
    (this.rectElement_ || this.imageElement_).tooltip = a
};
Blockly.FieldImage.prototype.getValue = function() {
    return this.src_
};
Blockly.FieldImage.prototype.setValue = function(a) {
    null !== a && (this.src_ = a, this.imageElement_ && this.imageElement_.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", goog.isString(a) ? a : ""))
};
Blockly.FieldImage.prototype.setText = function(a) {
    null !== a && (this.text_ = a)
};
Blockly.FieldImage.prototype.render_ = function() {};
Blockly.Variables = {};
Blockly.Variables.NAME_TYPE = "VARIABLE";
Blockly.Variables.allVariables = function(a) {
    if (a.getDescendants) var b = a.getDescendants();
    else if (a.getAllBlocks) b = a.getAllBlocks();
    else throw "Not Block or Workspace: " + a;
    a = Object.create(null);
    for (var c = 0; c < b.length; c++)
        if (b[c].getVars)
            for (var d = b[c].getVars(), e = 0; e < d.length; e++) {
                var f = d[e];
                f && (a[f.toLowerCase()] = f)
            }
        b = [];
    for (var g in a) b.push(a[g]);
    return b
};
Blockly.Variables.renameVariable = function(a, b, c) {
    c = c.getAllBlocks();
    for (var d = 0; d < c.length; d++) c[d].renameVar && c[d].renameVar(a, b)
};
Blockly.Variables.allVariablesText = function(a) {
    if (a.getDescendants) var b = a.getDescendants();
    else if (a.getAllBlocks) b = a.getAllBlocks();
    else throw "Not Block or Workspace: " + a;
    a = Object.create(null);
    for (var c = 0; c < b.length; c++)
        if (b[c].getVarsText)
            for (var d = b[c].getVarsText(), e = 0; e < d.length; e++) {
                var f = d[e];
                f && (a[f.toLowerCase()] = f)
            }
        b = [];
    for (var g in a) b.push(a[g]);
    return b
};
Blockly.Variables.renameVariableText = function(a, b, c) {
    c = c.getAllBlocks();
    for (var d = 0; d < c.length; d++) c[d].renameVarText && c[d].renameVarText(a, b)
};
Blockly.Variables.allVariablesBool = function(a) {
    if (a.getDescendants) var b = a.getDescendants();
    else if (a.getAllBlocks) b = a.getAllBlocks();
    else throw "Not Block or Workspace: " + a;
    a = Object.create(null);
    for (var c = 0; c < b.length; c++)
        if (b[c].getVarsBool)
            for (var d = b[c].getVarsBool(), e = 0; e < d.length; e++) {
                var f = d[e];
                f && (a[f.toLowerCase()] = f)
            }
        b = [];
    for (var g in a) b.push(a[g]);
    return b
};
Blockly.Variables.renameVariableBool = function(a, b, c) {
    c = c.getAllBlocks();
    for (var d = 0; d < c.length; d++) c[d].renameVarBool && c[d].renameVarBool(a, b)
};
Blockly.Variables.allVariablesList = function(a) {
    if (a.getDescendants) var b = a.getDescendants();
    else if (a.getAllBlocks) b = a.getAllBlocks();
    else throw "Not Block or Workspace: " + a;
    a = Object.create(null);
    for (var c = 0; c < b.length; c++)
        if (b[c].getVarsList)
            for (var d = b[c].getVarsList(), e = 0; e < d.length; e++) {
                var f = d[e];
                f && (a[f.toLowerCase()] = f)
            }
        b = [];
    for (var g in a) b.push(a[g]);
    return b
};
Blockly.Variables.renameVariableList = function(a, b, c) {
    c = c.getAllBlocks();
    for (var d = 0; d < c.length; d++) c[d].renameVarList && c[d].renameVarList(a, b)
};
Blockly.Variables.allVariablesListText = function(a) {
    if (a.getDescendants) var b = a.getDescendants();
    else if (a.getAllBlocks) b = a.getAllBlocks();
    else throw "Not Block or Workspace: " + a;
    a = Object.create(null);
    for (var c = 0; c < b.length; c++)
        if (b[c].getVarsListText)
            for (var d = b[c].getVarsListText(), e = 0; e < d.length; e++) {
                var f = d[e];
                f && (a[f.toLowerCase()] = f)
            }
        b = [];
    for (var g in a) b.push(a[g]);
    return b
};
Blockly.Variables.renameVariableListText = function(a, b, c) {
    c = c.getAllBlocks();
    for (var d = 0; d < c.length; d++) c[d].renameVarListText && c[d].renameVarListText(a, b)
};
Blockly.Variables.generateUniqueName = function(a) {
    a = Blockly.Variables.allVariables(a);
    var b = "";
    if (a.length)
        for (var c = 1, d = 0, e = "ijkmnopqrstuvwxyzabcdefgh".charAt(d); !b;) {
            for (var f = !1, g = 0; g < a.length; g++)
                if (a[g][0].toLowerCase() == e) {
                    f = !0;
                    break
                }
            f ? (d++, 25 == d && (d = 0, c++), e = "ijkmnopqrstuvwxyzabcdefgh".charAt(d), 1 < c && (e += c)) : b = e
        } else b = "i";
    return b
};
Blockly.Variables.generateUniqueNameText = function(a) {
    a = Blockly.Variables.allVariablesText(a);
    var b = "";
    if (a.length)
        for (var c = 1, d = 0, e = "ijkmnopqrstuvwxyzabcdefgh".charAt(d); !b;) {
            for (var f = !1, g = 0; g < a.length; g++)
                if (a[g][0].toLowerCase() == e) {
                    f = !0;
                    break
                }
            f ? (d++, 25 == d && (d = 0, c++), e = "ijkmnopqrstuvwxyzabcdefgh".charAt(d), 1 < c && (e += c)) : b = e
        } else b = "i";
    return b
};
Blockly.Variables.generateUniqueNameBool = function(a) {
    a = Blockly.Variables.allVariablesBool(a);
    var b = "";
    if (a.length)
        for (var c = 1, d = 0, e = "ijkmnopqrstuvwxyzabcdefgh".charAt(d); !b;) {
            for (var f = !1, g = 0; g < a.length; g++)
                if (a[g][0].toLowerCase() == e) {
                    f = !0;
                    break
                }
            f ? (d++, 25 == d && (d = 0, c++), e = "ijkmnopqrstuvwxyzabcdefgh".charAt(d), 1 < c && (e += c)) : b = e
        } else b = "i";
    return b
};
Blockly.Variables.generateUniqueNameList = function(a) {
    a = Blockly.Variables.allVariablesList(a);
    var b = "";
    if (a.length)
        for (var c = 1, d = 0, e = "ijkmnopqrstuvwxyzabcdefgh".charAt(d); !b;) {
            for (var f = !1, g = 0; g < a.length; g++)
                if (a[g][0].toLowerCase() == e) {
                    f = !0;
                    break
                }
            f ? (d++, 25 == d && (d = 0, c++), e = "ijkmnopqrstuvwxyzabcdefgh".charAt(d), 1 < c && (e += c)) : b = e
        } else b = "i";
    return b
};
Blockly.Variables.generateUniqueNameListText = function(a) {
    a = Blockly.Variables.allVariablesListText(a);
    var b = "";
    if (a.length)
        for (var c = 1, d = 0, e = "ijkmnopqrstuvwxyzabcdefgh".charAt(d); !b;) {
            for (var f = !1, g = 0; g < a.length; g++)
                if (a[g][0].toLowerCase() == e) {
                    f = !0;
                    break
                }
            f ? (d++, 25 == d && (d = 0, c++), e = "ijkmnopqrstuvwxyzabcdefgh".charAt(d), 1 < c && (e += c)) : b = e
        } else b = "i";
    return b
};
Blockly.FieldVariable = function(a, b) {
    Blockly.FieldVariable.superClass_.constructor.call(this, Blockly.FieldVariable.dropdownCreate, null);
    this.setChangeHandler(b);
    this.setValue(a || "")
};
goog.inherits(Blockly.FieldVariable, Blockly.FieldDropdown);
Blockly.FieldVariable.prototype.setChangeHandler = function(a) {
    Blockly.FieldVariable.superClass_.setChangeHandler.call(this, a ? function(b) {
        var c = a.call(this, b);
        if (null === c) var d = c;
        else void 0 === c && (c = b), d = Blockly.FieldVariable.dropdownChange.call(this, c), void 0 !== d && (d = c);
        return d === b ? void 0 : d
    } : Blockly.FieldVariable.dropdownChange)
};
Blockly.FieldVariable.prototype.init = function(a) {
    this.sourceBlock_ || (this.getValue() || this.setValue(Blockly.Variables.generateUniqueName(a.isInFlyout ? a.workspace.targetWorkspace : a.workspace)), Blockly.FieldVariable.superClass_.init.call(this, a))
};
Blockly.FieldVariable.prototype.getValue = function() {
    return this.getText()
};
Blockly.FieldVariable.prototype.setValue = function(a) {
    this.value_ = a;
    this.setText(a)
};
Blockly.FieldVariable.dropdownCreate = function() {
    var a = this.sourceBlock_ && this.sourceBlock_.workspace ? Blockly.Variables.allVariables(this.sourceBlock_.workspace) : [],
        b = this.getText();
    b && -1 == a.indexOf(b) && a.push(b);
    a.sort(goog.string.caseInsensitiveCompare);
    a.push(Blockly.Msg.RENAME_VARIABLE);
    a.push(Blockly.Msg.NEW_VARIABLE);
    b = [];
    for (var c = 0; c < a.length; c++) b[c] = [a[c], a[c]];
    return b
};
Blockly.FieldVariable.dropdownChange = function(a) {
    function b(a, b) {
        Blockly.hideChaff();
        var c = window.prompt(a, b);
        c && (c = c.replace(/[\s\xa0]+/g, " ").replace(/^ | $/g, ""), c == Blockly.Msg.RENAME_VARIABLE || c == Blockly.Msg.NEW_VARIABLE) && (c = null);
        return c
    }
    var c = this.sourceBlock_.workspace;
    if (a == Blockly.Msg.RENAME_VARIABLE) {
        var d = this.getText();
        (a = b(Blockly.Msg.RENAME_VARIABLE_TITLE.replace("%1", d), d)) && Blockly.Variables.renameVariable(d, a, c);
        return null
    }
    if (a == Blockly.Msg.NEW_VARIABLE) return (a = b(Blockly.Msg.NEW_VARIABLE_TITLE,
        "")) ? (Blockly.Variables.renameVariable(a, a, c), a) : null
};
Blockly.FieldVariableText = function(a, b) {
    Blockly.FieldVariableText.superClass_.constructor.call(this, Blockly.FieldVariableText.dropdownCreate, null);
    this.setChangeHandler(b);
    this.setValue(a || "")
};
goog.inherits(Blockly.FieldVariableText, Blockly.FieldDropdown);
Blockly.FieldVariableText.prototype.setChangeHandler = function(a) {
    Blockly.FieldVariableText.superClass_.setChangeHandler.call(this, a ? function(b) {
        var c = a.call(this, b);
        if (null === c) var d = c;
        else void 0 === c && (c = b), d = Blockly.FieldVariableText.dropdownChange.call(this, c), void 0 !== d && (d = c);
        return d === b ? void 0 : d
    } : Blockly.FieldVariableText.dropdownChange)
};
Blockly.FieldVariableText.prototype.init = function(a) {
    this.sourceBlock_ || (this.getValue() || this.setValue(Blockly.Variables.generateUniqueNameText(a.isInFlyout ? a.workspace.targetWorkspace : a.workspace)), Blockly.FieldVariableText.superClass_.init.call(this, a))
};
Blockly.FieldVariableText.prototype.getValue = function() {
    return this.getText()
};
Blockly.FieldVariableText.prototype.setValue = function(a) {
    this.value_ = a;
    this.setText(a)
};
Blockly.FieldVariableText.dropdownCreate = function() {
    var a = this.sourceBlock_ && this.sourceBlock_.workspace ? Blockly.Variables.allVariablesText(this.sourceBlock_.workspace) : [],
        b = this.getText();
    b && -1 == a.indexOf(b) && a.push(b);
    a.sort(goog.string.caseInsensitiveCompare);
    a.push(Blockly.Msg.RENAME_VARIABLE);
    a.push(Blockly.Msg.NEW_VARIABLE);
    b = [];
    for (var c = 0; c < a.length; c++) b[c] = [a[c], a[c]];
    return b
};
Blockly.FieldVariableText.dropdownChange = function(a) {
    function b(a, b) {
        Blockly.hideChaff();
        var c = window.prompt(a, b);
        c && (c = c.replace(/[\s\xa0]+/g, " ").replace(/^ | $/g, ""), c == Blockly.Msg.RENAME_VARIABLE || c == Blockly.Msg.NEW_VARIABLE) && (c = null);
        return c
    }
    var c = this.sourceBlock_.workspace;
    if (a == Blockly.Msg.RENAME_VARIABLE) {
        var d = this.getText();
        (a = b(Blockly.Msg.RENAME_VARIABLE_TITLE.replace("%1", d), d)) && Blockly.Variables.renameVariableText(d, a, c);
        return null
    }
    if (a == Blockly.Msg.NEW_VARIABLE) return (a = b(Blockly.Msg.NEW_VARIABLE_TITLE,
        "")) ? (Blockly.Variables.renameVariableText(a, a, c), a) : null
};
Blockly.FieldVariableBool = function(a, b) {
    Blockly.FieldVariableBool.superClass_.constructor.call(this, Blockly.FieldVariableBool.dropdownCreate, null);
    this.setChangeHandler(b);
    this.setValue(a || "")
};
goog.inherits(Blockly.FieldVariableBool, Blockly.FieldDropdown);
Blockly.FieldVariableBool.prototype.setChangeHandler = function(a) {
    Blockly.FieldVariableBool.superClass_.setChangeHandler.call(this, a ? function(b) {
        var c = a.call(this, b);
        if (null === c) var d = c;
        else void 0 === c && (c = b), d = Blockly.FieldVariableBool.dropdownChange.call(this, c), void 0 !== d && (d = c);
        return d === b ? void 0 : d
    } : Blockly.FieldVariableBool.dropdownChange)
};
Blockly.FieldVariableBool.prototype.init = function(a) {
    this.sourceBlock_ || (this.getValue() || this.setValue(Blockly.Variables.generateUniqueNameBool(a.isInFlyout ? a.workspace.targetWorkspace : a.workspace)), Blockly.FieldVariableBool.superClass_.init.call(this, a))
};
Blockly.FieldVariableBool.prototype.getValue = function() {
    return this.getText()
};
Blockly.FieldVariableBool.prototype.setValue = function(a) {
    this.value_ = a;
    this.setText(a)
};
Blockly.FieldVariableBool.dropdownCreate = function() {
    var a = this.sourceBlock_ && this.sourceBlock_.workspace ? Blockly.Variables.allVariablesBool(this.sourceBlock_.workspace) : [],
        b = this.getText();
    b && -1 == a.indexOf(b) && a.push(b);
    a.sort(goog.string.caseInsensitiveCompare);
    a.push(Blockly.Msg.RENAME_VARIABLE);
    a.push(Blockly.Msg.NEW_VARIABLE);
    b = [];
    for (var c = 0; c < a.length; c++) b[c] = [a[c], a[c]];
    return b
};
Blockly.FieldVariableBool.dropdownChange = function(a) {
    function b(a, b) {
        Blockly.hideChaff();
        var c = window.prompt(a, b);
        c && (c = c.replace(/[\s\xa0]+/g, " ").replace(/^ | $/g, ""), c == Blockly.Msg.RENAME_VARIABLE || c == Blockly.Msg.NEW_VARIABLE) && (c = null);
        return c
    }
    var c = this.sourceBlock_.workspace;
    if (a == Blockly.Msg.RENAME_VARIABLE) {
        var d = this.getText();
        (a = b(Blockly.Msg.RENAME_VARIABLE_TITLE.replace("%1", d), d)) && Blockly.Variables.renameVariableBool(d, a, c);
        return null
    }
    if (a == Blockly.Msg.NEW_VARIABLE) return (a = b(Blockly.Msg.NEW_VARIABLE_TITLE,
        "")) ? (Blockly.Variables.renameVariableBool(a, a, c), a) : null
};
Blockly.FieldVariableList = function(a, b) {
    Blockly.FieldVariableList.superClass_.constructor.call(this, Blockly.FieldVariableList.dropdownCreate, null);
    this.setChangeHandler(b);
    this.setValue(a || "")
};
goog.inherits(Blockly.FieldVariableList, Blockly.FieldDropdown);
Blockly.FieldVariableList.prototype.setChangeHandler = function(a) {
    Blockly.FieldVariableList.superClass_.setChangeHandler.call(this, a ? function(b) {
        var c = a.call(this, b);
        if (null === c) var d = c;
        else void 0 === c && (c = b), d = Blockly.FieldVariableList.dropdownChange.call(this, c), void 0 !== d && (d = c);
        return d === b ? void 0 : d
    } : Blockly.FieldVariableList.dropdownChange)
};
Blockly.FieldVariableList.prototype.init = function(a) {
    this.sourceBlock_ || (this.getValue() || this.setValue(Blockly.Variables.generateUniqueNameList(a.isInFlyout ? a.workspace.targetWorkspace : a.workspace)), Blockly.FieldVariableList.superClass_.init.call(this, a))
};
Blockly.FieldVariableList.prototype.getValue = function() {
    return this.getText()
};
Blockly.FieldVariableList.prototype.setValue = function(a) {
    this.value_ = a;
    this.setText(a)
};
Blockly.FieldVariableList.dropdownCreate = function() {
    var a = this.sourceBlock_ && this.sourceBlock_.workspace ? Blockly.Variables.allVariablesList(this.sourceBlock_.workspace) : [],
        b = this.getText();
    b && -1 == a.indexOf(b) && a.push(b);
    a.sort(goog.string.caseInsensitiveCompare);
    a.push(Blockly.Msg.RENAME_VARIABLE);
    a.push(Blockly.Msg.NEW_VARIABLE);
    b = [];
    for (var c = 0; c < a.length; c++) b[c] = [a[c], a[c]];
    return b
};
Blockly.FieldVariableList.dropdownChange = function(a) {
    function b(a, b) {
        Blockly.hideChaff();
        var c = window.prompt(a, b);
        c && (c = c.replace(/[\s\xa0]+/g, " ").replace(/^ | $/g, ""), c == Blockly.Msg.RENAME_VARIABLE || c == Blockly.Msg.NEW_VARIABLE) && (c = null);
        return c
    }
    var c = this.sourceBlock_.workspace;
    if (a == Blockly.Msg.RENAME_VARIABLE) {
        var d = this.getText();
        (a = b(Blockly.Msg.RENAME_VARIABLE_TITLE.replace("%1", d), d)) && Blockly.Variables.renameVariableList(d, a, c);
        return null
    }
    if (a == Blockly.Msg.NEW_VARIABLE) return (a = b(Blockly.Msg.NEW_VARIABLE_TITLE,
        "")) ? (Blockly.Variables.renameVariableList(a, a, c), a) : null
};
Blockly.FieldVariableListText = function(a, b) {
    Blockly.FieldVariableListText.superClass_.constructor.call(this, Blockly.FieldVariableListText.dropdownCreate, null);
    this.setChangeHandler(b);
    this.setValue(a || "")
};
goog.inherits(Blockly.FieldVariableListText, Blockly.FieldDropdown);
Blockly.FieldVariableListText.prototype.setChangeHandler = function(a) {
    Blockly.FieldVariableListText.superClass_.setChangeHandler.call(this, a ? function(b) {
        var c = a.call(this, b);
        if (null === c) var d = c;
        else void 0 === c && (c = b), d = Blockly.FieldVariableListText.dropdownChange.call(this, c), void 0 !== d && (d = c);
        return d === b ? void 0 : d
    } : Blockly.FieldVariableListText.dropdownChange)
};
Blockly.FieldVariableListText.prototype.init = function(a) {
    this.sourceBlock_ || (this.getValue() || this.setValue(Blockly.Variables.generateUniqueNameListText(a.isInFlyout ? a.workspace.targetWorkspace : a.workspace)), Blockly.FieldVariableListText.superClass_.init.call(this, a))
};
Blockly.FieldVariableListText.prototype.getValue = function() {
    return this.getText()
};
Blockly.FieldVariableListText.prototype.setValue = function(a) {
    this.value_ = a;
    this.setText(a)
};
Blockly.FieldVariableListText.dropdownCreate = function() {
    var a = this.sourceBlock_ && this.sourceBlock_.workspace ? Blockly.Variables.allVariablesListText(this.sourceBlock_.workspace) : [],
        b = this.getText();
    b && -1 == a.indexOf(b) && a.push(b);
    a.sort(goog.string.caseInsensitiveCompare);
    a.push(Blockly.Msg.RENAME_VARIABLE);
    a.push(Blockly.Msg.NEW_VARIABLE);
    b = [];
    for (var c = 0; c < a.length; c++) b[c] = [a[c], a[c]];
    return b
};
Blockly.FieldVariableListText.dropdownChange = function(a) {
    function b(a, b) {
        Blockly.hideChaff();
        var c = window.prompt(a, b);
        c && (c = c.replace(/[\s\xa0]+/g, " ").replace(/^ | $/g, ""), c == Blockly.Msg.RENAME_VARIABLE || c == Blockly.Msg.NEW_VARIABLE) && (c = null);
        return c
    }
    var c = this.sourceBlock_.workspace;
    if (a == Blockly.Msg.RENAME_VARIABLE) {
        var d = this.getText();
        (a = b(Blockly.Msg.RENAME_VARIABLE_TITLE.replace("%1", d), d)) && Blockly.Variables.renameVariableListText(d, a, c);
        return null
    }
    if (a == Blockly.Msg.NEW_VARIABLE) return (a =
        b(Blockly.Msg.NEW_VARIABLE_TITLE, "")) ? (Blockly.Variables.renameVariableListText(a, a, c), a) : null
};
Blockly.Generator = function(a) {
    this.name_ = a;
    this.FUNCTION_NAME_PLACEHOLDER_REGEXP_ = new RegExp(this.FUNCTION_NAME_PLACEHOLDER_, "g")
};
Blockly.Generator.NAME_TYPE = "generated_function";
Blockly.Generator.prototype.INFINITE_LOOP_TRAP = null;
Blockly.Generator.prototype.STATEMENT_PREFIX = null;
Blockly.Generator.prototype.workspaceToCode = function(a) {
    a || (console.warn("No workspace specified in workspaceToCode call.  Guessing."), a = Blockly.getMainWorkspace());
    var b = [];
    this.init(a);
    a = a.getTopBlocks(!0);
    for (var c = 0, d; d = a[c]; c++)
        if (0 <= Blockly.gencode_allowed_blocks.indexOf(d.type)) {
            var e = this.blockToCode(d);
            goog.isArray(e) && (e = e[0]);
            e && (d.outputConnection && this.scrubNakedValue && (e = this.scrubNakedValue(e)), b.push(e))
        }
    b = b.join("\n");
    b = this.finish(b);
    b = b.replace(/^\s+\n/, "");
    b = b.replace(/\n\s+$/,
        "\n");
    return b = b.replace(/[ \t]+\n/g, "\n")
};
Blockly.Generator.prototype.prefixLines = function(a, b) {
    return b + a.replace(/\n(.)/g, "\n" + b + "$1")
};
Blockly.Generator.prototype.allNestedComments = function(a) {
    var b = [];
    a = a.getDescendants();
    for (var c = 0; c < a.length; c++) {
        var d = a[c].getCommentText();
        d && b.push(d)
    }
    b.length && b.push("");
    return b.join("\n")
};
Blockly.Generator.prototype.blockToCode = function(a) {
    if (!a) return "";
    if (a.disabled) return this.blockToCode(a.getNextBlock());
    var b = this[a.type];
    goog.asserts.assertFunction(b, 'Language "%s" does not know how to generate code for block type "%s".', this.name_, a.type);
    b = b.call(a, a);
    if (goog.isArray(b)) return [this.scrub_(a, b[0]), b[1]];
    if (goog.isString(b)) return this.STATEMENT_PREFIX && (b = this.STATEMENT_PREFIX.replace(/%1/g, "'" + a.id + "'") + b), this.scrub_(a, b);
    if (null === b) return "";
    goog.asserts.fail("Invalid code generated: %s",
        b)
};
Blockly.Generator.prototype.valueToCode = function(a, b, c) {
    isNaN(c) && goog.asserts.fail('Expecting valid order from block "%s".', a.type);
    a = a.getInputTargetBlock(b);
    if (!a) return "";
    var d = this.blockToCode(a);
    if ("" === d) return "";
    goog.asserts.assertArray(d, 'Expecting tuple from value block "%s".', a.type);
    b = d[0];
    d = d[1];
    isNaN(d) && goog.asserts.fail('Expecting valid order from value block "%s".', a.type);
    b && c <= d && (c != d || 0 != c && 99 != c) && (b = "(" + b + ")");
    return b
};
Blockly.Generator.prototype.statementToCode = function(a, b) {
    var c = a.getInputTargetBlock(b),
        d = this.blockToCode(c);
    goog.asserts.assertString(d, 'Expecting code from statement block "%s".', c && c.type);
    d && (d = this.prefixLines(d, this.INDENT));
    return d
};
Blockly.Generator.prototype.addLoopTrap = function(a, b) {
    this.INFINITE_LOOP_TRAP && (a = this.INFINITE_LOOP_TRAP.replace(/%1/g, "'" + b + "'") + a);
    this.STATEMENT_PREFIX && (a += this.prefixLines(this.STATEMENT_PREFIX.replace(/%1/g, "'" + b + "'"), this.INDENT));
    return a
};
Blockly.Generator.prototype.INDENT = "  ";
Blockly.Generator.prototype.RESERVED_WORDS_ = "";
Blockly.Generator.prototype.addReservedWords = function(a) {
    this.RESERVED_WORDS_ += a + ","
};
Blockly.Generator.prototype.FUNCTION_NAME_PLACEHOLDER_ = "{leCUI8hutHZI4480Dc}";
Blockly.Generator.prototype.provideFunction_ = function(a, b) {
    if (!this.definitions_[a]) {
        var c = this.variableDB_.getDistinctName(a, this.NAME_TYPE);
        this.functionNames_[a] = c;
        this.definitions_[a] = b.join("\n").replace(this.FUNCTION_NAME_PLACEHOLDER_REGEXP_, c)
    }
    return this.functionNames_[a]
};
Blockly.Names = function(a, b) {
    this.variablePrefix_ = b || "";
    this.reservedDict_ = Object.create(null);
    if (a)
        for (var c = a.split(","), d = 0; d < c.length; d++) this.reservedDict_[c[d]] = !0;
    this.reset()
};
Blockly.Names.prototype.reset = function() {
    this.db_ = Object.create(null);
    this.dbReverse_ = Object.create(null)
};
Blockly.Names.prototype.getName = function(a, b) {
    var c = a.toLowerCase() + "_" + b,
        d = b == Blockly.Variables.NAME_TYPE ? this.variablePrefix_ : "";
    if (c in this.db_) return d + this.db_[c];
    var e = this.getDistinctName(a, b);
    this.db_[c] = e.substr(d.length);
    return e
};
Blockly.Names.prototype.getDistinctName = function(a, b) {
    for (var c = this.safeName_(a), d = ""; this.dbReverse_[c + d] || c + d in this.reservedDict_;) d = d ? d + 1 : 2;
    c += d;
    this.dbReverse_[c] = !0;
    return (b == Blockly.Variables.NAME_TYPE ? this.variablePrefix_ : "") + c
};
Blockly.Names.prototype.safeName_ = function(a) {
    a ? (a = encodeURI(a.replace(/ /g, "_")).replace(/[^\w]/g, "_"), -1 != "0123456789".indexOf(a[0]) && (a = "my_" + a)) : a = "unnamed";
    return a
};
Blockly.Names.equals = function(a, b) {
    return a.toLowerCase() == b.toLowerCase()
};
Blockly.Procedures = {};
Blockly.Procedures.NAME_TYPE = "PROCEDURE";
Blockly.Procedures.allProcedures = function(a) {
    a = a.getAllBlocks();
    for (var b = [], c = [], d = 0; d < a.length; d++)
        if (a[d].getProcedureDef) {
            var e = a[d].getProcedureDef();
            e && (e[2] ? b.push(e) : c.push(e))
        }
    c.sort(Blockly.Procedures.procTupleComparator_);
    b.sort(Blockly.Procedures.procTupleComparator_);
    return [c, b]
};
Blockly.Procedures.procTupleComparator_ = function(a, b) {
    return a[0].toLowerCase().localeCompare(b[0].toLowerCase())
};
Blockly.Procedures.findLegalName = function(a, b) {
    if (b.isInFlyout) return a;
    for (; !Blockly.Procedures.isLegalName(a, b.workspace, b);) {
        var c = a.match(/^(.*?)(\d+)$/);
        a = c ? c[1] + (parseInt(c[2], 10) + 1) : a + "2"
    }
    return a
};
Blockly.Procedures.isLegalName = function(a, b, c) {
    b = b.getAllBlocks();
    for (var d = 0; d < b.length; d++)
        if (b[d] != c && b[d].getProcedureDef) {
            var e = b[d].getProcedureDef();
            if (Blockly.Names.equals(e[0], a)) return !1
        }
    return !0
};
Blockly.Procedures.rename = function(a) {
    a = a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
    a = Blockly.Procedures.findLegalName(a, this.sourceBlock_);
    for (var b = this.sourceBlock_.workspace.getAllBlocks(), c = 0; c < b.length; c++) b[c].renameProcedure && b[c].renameProcedure(this.text_, a);
    return a
};
Blockly.Procedures.flyoutCategory = function(a) {
    function b(a, b) {
        for (var d = 0; d < a.length; d++) {
            var e = a[d][0],
                f = a[d][1],
                l = goog.dom.createDom("block");
            l.setAttribute("type", b);
            l.setAttribute("gap", 16);
            var p = goog.dom.createDom("mutation");
            p.setAttribute("name", e);
            l.appendChild(p);
            for (e = 0; e < f.length; e++) {
                var m = goog.dom.createDom("arg");
                m.setAttribute("name", f[e]);
                p.appendChild(m)
            }
            c.push(l)
        }
    }
    var c = [];
    if (Blockly.Blocks.procedures_defnoreturn) {
        var d = goog.dom.createDom("block");
        d.setAttribute("type", "procedures_defnoreturn");
        d.setAttribute("gap", 16);
        c.push(d)
    }
    Blockly.Blocks.procedures_defreturn && (d = goog.dom.createDom("block"), d.setAttribute("type", "procedures_defreturn"), d.setAttribute("gap", 16), c.push(d));
    Blockly.Blocks.procedures_ifreturn && (d = goog.dom.createDom("block"), d.setAttribute("type", "procedures_ifreturn"), d.setAttribute("gap", 16), c.push(d));
    c.length && c[c.length - 1].setAttribute("gap", 24);
    a = Blockly.Procedures.allProcedures(a);
    b(a[0], "procedures_callnoreturn");
    b(a[1], "procedures_callreturn");
    return c
};
Blockly.Procedures.getCallers = function(a, b) {
    for (var c = [], d = b.getAllBlocks(), e = 0; e < d.length; e++)
        if (d[e].getProcedureCall) {
            var f = d[e].getProcedureCall();
            f && Blockly.Names.equals(f, a) && c.push(d[e])
        }
    return c
};
Blockly.Procedures.disposeCallers = function(a, b) {
    for (var c = Blockly.Procedures.getCallers(a, b), d = 0; d < c.length; d++) c[d].dispose(!0, !1)
};
Blockly.Procedures.mutateCallers = function(a, b, c, d) {
    a = Blockly.Procedures.getCallers(a, b);
    for (b = 0; b < a.length; b++) a[b].setProcedureParameters(c, d)
};
Blockly.Procedures.getDefinition = function(a, b) {
    for (var c = b.getAllBlocks(), d = 0; d < c.length; d++)
        if (c[d].getProcedureDef) {
            var e = c[d].getProcedureDef();
            if (e && Blockly.Names.equals(e[0], a)) return c[d]
        }
    return null
};
Blockly.Flyout = function(a) {
    a.getMetrics = this.getMetrics_.bind(this);
    a.setMetrics = this.setMetrics_.bind(this);
    this.workspace_ = new Blockly.WorkspaceSvg(a);
    this.workspace_.isFlyout = !0;
    this.RTL = !!a.RTL;
    this.eventWrappers_ = [];
    this.buttons_ = [];
    this.listeners_ = []
};
Blockly.Flyout.prototype.autoClose = !0;
Blockly.Flyout.prototype.CORNER_RADIUS = 8;
Blockly.Flyout.prototype.SCROLLBAR_PADDING = 2;
Blockly.Flyout.prototype.width_ = 0;
Blockly.Flyout.prototype.height_ = 0;
Blockly.Flyout.prototype.createDom = function() {
    this.svgGroup_ = Blockly.createSvgElement("g", {
        "class": "blocklyFlyout"
    }, null);
    this.svgBackground_ = Blockly.createSvgElement("path", {
        "class": "blocklyFlyoutBackground"
    }, this.svgGroup_);
    this.svgGroup_.appendChild(this.workspace_.createDom());
    return this.svgGroup_
};
Blockly.Flyout.prototype.init = function(a) {
    this.targetWorkspace_ = a;
    this.workspace_.targetWorkspace = a;
    this.scrollbar_ = new Blockly.Scrollbar(this.workspace_, !1, !1);
    this.hide();
    Array.prototype.push.apply(this.eventWrappers_, Blockly.bindEvent_(this.svgGroup_, "wheel", this, this.wheel_));
    this.autoClose || Array.prototype.push.apply(this.eventWrappers_, Blockly.bindEvent_(this.targetWorkspace_.getCanvas(), "blocklyWorkspaceChange", this, this.filterForCapacity_));
    Array.prototype.push.apply(this.eventWrappers_, Blockly.bindEvent_(this.svgGroup_,
        "mousedown", this, this.onMouseDown_))
};
Blockly.Flyout.prototype.dispose = function() {
    this.hide();
    Blockly.unbindEvent_(this.eventWrappers_);
    this.scrollbar_ && (this.scrollbar_.dispose(), this.scrollbar_ = null);
    this.workspace_ && (this.workspace_.targetWorkspace = null, this.workspace_.dispose(), this.workspace_ = null);
    this.svgGroup_ && (goog.dom.removeNode(this.svgGroup_), this.svgGroup_ = null);
    this.targetWorkspace_ = this.svgBackground_ = null
};
Blockly.Flyout.prototype.getMetrics_ = function() {
    if (!this.isVisible()) return null;
    var a = this.height_ - 2 * this.SCROLLBAR_PADDING,
        b = this.width_;
    try {
        var c = this.workspace_.getCanvas().getBBox()
    } catch (d) {
        c = {
            height: 0,
            y: 0
        }
    }
    return {
        viewHeight: a,
        viewWidth: b,
        contentHeight: (c.height + c.y) * this.workspace_.scale,
        viewTop: -this.workspace_.scrollY,
        contentTop: 0,
        absoluteTop: this.SCROLLBAR_PADDING,
        absoluteLeft: 0
    }
};
Blockly.Flyout.prototype.setMetrics_ = function(a) {
    var b = this.getMetrics_();
    b && (goog.isNumber(a.y) && (this.workspace_.scrollY = -b.contentHeight * a.y - b.contentTop), this.workspace_.translate(0, this.workspace_.scrollY + b.absoluteTop))
};
Blockly.Flyout.prototype.position = function() {
    if (this.isVisible()) {
        var a = this.targetWorkspace_.getMetrics();
        if (a) {
            var b = this.width_ - this.CORNER_RADIUS;
            this.RTL && (b *= -1);
            var c = ["M " + (this.RTL ? this.width_ : 0) + ",0"];
            c.push("h", b);
            c.push("a", this.CORNER_RADIUS, this.CORNER_RADIUS, 0, 0, this.RTL ? 0 : 1, this.RTL ? -this.CORNER_RADIUS : this.CORNER_RADIUS, this.CORNER_RADIUS);
            c.push("v", Math.max(0, a.viewHeight - 2 * this.CORNER_RADIUS));
            c.push("a", this.CORNER_RADIUS, this.CORNER_RADIUS, 0, 0, this.RTL ? 0 : 1, this.RTL ? this.CORNER_RADIUS :
                -this.CORNER_RADIUS, this.CORNER_RADIUS);
            c.push("h", -b);
            c.push("z");
            this.svgBackground_.setAttribute("d", c.join(" "));
            b = a.absoluteLeft;
            this.RTL && (b += a.viewWidth, b -= this.width_);
            this.svgGroup_.setAttribute("transform", "translate(" + b + "," + a.absoluteTop + ")");
            this.height_ = a.viewHeight;
            this.scrollbar_ && this.scrollbar_.resize()
        }
    }
};
Blockly.Flyout.prototype.scrollToTop = function() {
    this.scrollbar_.set(0)
};
Blockly.Flyout.prototype.wheel_ = function(a) {
    var b = a.deltaY;
    if (b) {
        goog.userAgent.GECKO && (b *= 10);
        var c = this.getMetrics_();
        b = c.viewTop + b;
        b = Math.min(b, c.contentHeight - c.viewHeight);
        b = Math.max(b, 0);
        this.scrollbar_.set(b);
        a.preventDefault();
        a.stopPropagation()
    }
};
Blockly.Flyout.prototype.isVisible = function() {
    return this.svgGroup_ && "block" == this.svgGroup_.style.display
};
Blockly.Flyout.prototype.hide = function() {
    if (this.isVisible()) {
        this.svgGroup_.style.display = "none";
        for (var a = 0, b; b = this.listeners_[a]; a++) Blockly.unbindEvent_(b);
        this.listeners_.length = 0;
        this.reflowWrapper_ && (Blockly.unbindEvent_(this.reflowWrapper_), this.reflowWrapper_ = null)
    }
};
Blockly.Flyout.prototype.show = function(a) {
    this.hide();
    for (var b = this.workspace_.getTopBlocks(!1), c = 0, d; d = b[c]; c++) d.workspace == this.workspace_ && d.dispose(!1, !1);
    c = 0;
    for (var e; e = this.buttons_[c]; c++) goog.dom.removeNode(e);
    this.buttons_.length = 0;
    a == Blockly.Variables.NAME_TYPE ? a = Blockly.Variables.flyoutCategory(this.workspace_.targetWorkspace) : a == Blockly.Procedures.NAME_TYPE && (a = Blockly.Procedures.flyoutCategory(this.workspace_.targetWorkspace));
    var f = this.CORNER_RADIUS;
    this.svgGroup_.style.display =
        "block";
    b = [];
    var g = [];
    for (c = 0; e = a[c]; c++) e.tagName && "BLOCK" == e.tagName.toUpperCase() && (d = Blockly.Xml.domToBlock(this.workspace_, e), b.push(d), d = parseInt(e.getAttribute("gap"), 10), g.push(d || 3 * f));
    a = f;
    for (c = 0; d = b[c]; c++) {
        e = d.getDescendants();
        for (var h = 0, k; k = e[h]; h++) k.isInFlyout = !0;
        d.render();
        h = d.getSvgRoot();
        e = d.getHeightWidth();
        d.moveBy(this.RTL ? 0 : f / this.workspace_.scale + Blockly.BlockSvg.TAB_WIDTH, a);
        a += e.height + g[c];
        e = Blockly.createSvgElement("rect", {
            "fill-opacity": 0
        }, null);
        this.workspace_.getCanvas().insertBefore(e,
            d.getSvgRoot());
        d.flyoutRect_ = e;
        this.buttons_[c] = e;
        this.autoClose ? this.listeners_.push(Blockly.bindEvent_(h, "mousedown", null, this.createBlockFunc_(d))) : this.listeners_.push(Blockly.bindEvent_(h, "mousedown", null, this.blockMouseDown_(d)));
        this.listeners_.push(Blockly.bindEvent_(h, "mouseover", d, d.addSelect));
        this.listeners_.push(Blockly.bindEvent_(h, "mouseout", d, d.removeSelect));
        this.listeners_.push(Blockly.bindEvent_(e, "mousedown", null, this.createBlockFunc_(d)));
        this.listeners_.push(Blockly.bindEvent_(e,
            "mouseover", d, d.addSelect));
        this.listeners_.push(Blockly.bindEvent_(e, "mouseout", d, d.removeSelect))
    }
    this.listeners_.push(Blockly.bindEvent_(this.svgBackground_, "mouseover", this, function(a) {
        a = this.workspace_.getTopBlocks(!1);
        for (var b = 0, c; c = a[b]; b++) c.removeSelect()
    }));
    this.width_ = 0;
    this.reflow();
    this.filterForCapacity_();
    Blockly.fireUiEventNow(window, "resize");
    this.reflowWrapper_ = Blockly.bindEvent_(this.workspace_.getCanvas(), "blocklyWorkspaceChange", this, this.reflow);
    this.workspace_.fireChangeEvent()
};
Blockly.Flyout.prototype.reflow = function() {
    this.workspace_.scale = this.targetWorkspace_.scale;
    for (var a = 0, b = this.CORNER_RADIUS, c = this.workspace_.getTopBlocks(!1), d = 0, e; e = c[d]; d++) {
        var f = e.getHeightWidth().width;
        e.outputConnection && (f -= Blockly.BlockSvg.TAB_WIDTH);
        a = Math.max(a, f)
    }
    a += Blockly.BlockSvg.TAB_WIDTH;
    a *= this.workspace_.scale;
    a += 1.5 * b + Blockly.Scrollbar.scrollbarThickness;
    if (this.width_ != a) {
        for (d = 0; e = c[d]; d++) {
            f = e.getHeightWidth();
            if (this.RTL) {
                var g = e.getRelativeToSurfaceXY().x,
                    h = a - b;
                h /= this.workspace_.scale;
                h -= Blockly.BlockSvg.TAB_WIDTH;
                e.moveBy(h - g, 0)
            }
            e.flyoutRect_ && (e.flyoutRect_.setAttribute("width", f.width), e.flyoutRect_.setAttribute("height", f.height), g = e.outputConnection ? Blockly.BlockSvg.TAB_WIDTH : 0, h = e.getRelativeToSurfaceXY(), e.flyoutRect_.setAttribute("x", this.RTL ? h.x - f.width + g : h.x - g), e.flyoutRect_.setAttribute("y", h.y))
        }
        this.width_ = a;
        Blockly.fireUiEvent(window, "resize")
    }
};
Blockly.Flyout.prototype.blockMouseDown_ = function(a) {
    var b = this;
    return function(c) {
        Blockly.terminateDrag_();
        Blockly.hideChaff();
        Blockly.isRightButton(c) ? a.showContextMenu_(c) : (Blockly.removeAllRanges(), Blockly.Css.setCursor(Blockly.Css.Cursor.CLOSED), Blockly.Flyout.startDownEvent_ = c, Blockly.Flyout.startBlock_ = a, Blockly.Flyout.startFlyout_ = b, Blockly.Flyout.onMouseUpWrapper_ = Blockly.bindEvent_(document, "mouseup", this, Blockly.terminateDrag_), Blockly.Flyout.onMouseMoveBlockWrapper_ = Blockly.bindEvent_(document,
            "mousemove", this, b.onMouseMoveBlock_));
        c.stopPropagation()
    }
};
Blockly.Flyout.prototype.onMouseDown_ = function(a) {
    Blockly.isRightButton(a) || (Blockly.hideChaff(!0), Blockly.Flyout.terminateDrag_(), this.startDragMouseY_ = a.clientY, Blockly.Flyout.onMouseMoveWrapper_ = Blockly.bindEvent_(document, "mousemove", this, this.onMouseMove_), Blockly.Flyout.onMouseUpWrapper_ = Blockly.bindEvent_(document, "mouseup", this, Blockly.Flyout.terminateDrag_), a.preventDefault(), a.stopPropagation())
};
Blockly.Flyout.prototype.onMouseMove_ = function(a) {
    var b = a.clientY - this.startDragMouseY_;
    this.startDragMouseY_ = a.clientY;
    a = this.getMetrics_();
    b = a.viewTop - b;
    b = Math.min(b, a.contentHeight - a.viewHeight);
    b = Math.max(b, 0);
    this.scrollbar_.set(b)
};
Blockly.Flyout.prototype.onMouseMoveBlock_ = function(a) {
    if ("mousemove" == a.type && 1 >= a.clientX && 0 == a.clientY && 0 == a.button) a.stopPropagation();
    else {
        Blockly.removeAllRanges();
        var b = a.clientX - Blockly.Flyout.startDownEvent_.clientX;
        a = a.clientY - Blockly.Flyout.startDownEvent_.clientY;
        Math.sqrt(b * b + a * a) > Blockly.DRAG_RADIUS && Blockly.Flyout.startFlyout_.createBlockFunc_(Blockly.Flyout.startBlock_)(Blockly.Flyout.startDownEvent_)
    }
};
Blockly.Flyout.prototype.createBlockFunc_ = function(a) {
    var b = this,
        c = this.targetWorkspace_;
    return function(d) {
        if (!Blockly.isRightButton(d) && !a.disabled) {
            var e = Blockly.Xml.blockToDom_(a);
            e = Blockly.Xml.domToBlock(c, e);
            var f = a.getSvgRoot();
            if (!f) throw "originBlock is not rendered.";
            f = Blockly.getSvgXY_(f, c);
            if (b.RTL) {
                var g = c.getMetrics().viewWidth - b.width_;
                f.x += g / c.scale - g
            } else f.x += b.workspace_.scrollX / b.workspace_.scale - b.workspace_.scrollX;
            f.y += b.workspace_.scrollY / b.workspace_.scale - b.workspace_.scrollY;
            g = e.getSvgRoot();
            if (!g) throw "block is not rendered.";
            g = Blockly.getSvgXY_(g, c);
            g.x += c.scrollX / c.scale - c.scrollX;
            g.y += c.scrollY / c.scale - c.scrollY;
            c.toolbox_ && !c.scrollbar && (g.x += c.toolbox_.width / c.scale);
            e.moveBy(f.x - g.x, f.y - g.y);
            b.autoClose ? b.hide() : b.filterForCapacity_();
            e.onMouseDown_(d)
        }
    }
};
Blockly.Flyout.prototype.filterForCapacity_ = function() {
    for (var a = this.targetWorkspace_.remainingCapacity(), b = this.workspace_.getTopBlocks(!1), c = 0, d; d = b[c]; c++) d.getDescendants().length > a && d.setDisabled(!0)
};
Blockly.Flyout.prototype.getRect = function() {
    var a = Blockly.mainWorkspace,
        b = Blockly.getSvgXY_(this.svgGroup_, a).x;
    this.RTL || (b -= 1E9);
    return new goog.math.Rect(b, -1E9, 1E9 + this.width_ * (this.targetWorkspace_ == a ? 1 : a.scale), 2E9)
};
Blockly.Flyout.terminateDrag_ = function() {
    Blockly.Flyout.onMouseUpWrapper_ && (Blockly.unbindEvent_(Blockly.Flyout.onMouseUpWrapper_), Blockly.Flyout.onMouseUpWrapper_ = null);
    Blockly.Flyout.onMouseMoveBlockWrapper_ && (Blockly.unbindEvent_(Blockly.Flyout.onMouseMoveBlockWrapper_), Blockly.Flyout.onMouseMoveBlockWrapper_ = null);
    Blockly.Flyout.onMouseMoveWrapper_ && (Blockly.unbindEvent_(Blockly.Flyout.onMouseMoveWrapper_), Blockly.Flyout.onMouseMoveWrapper_ = null);
    Blockly.Flyout.onMouseUpWrapper_ && (Blockly.unbindEvent_(Blockly.Flyout.onMouseUpWrapper_),
        Blockly.Flyout.onMouseUpWrapper_ = null);
    Blockly.Flyout.startDownEvent_ = null;
    Blockly.Flyout.startBlock_ = null;
    Blockly.Flyout.startFlyout_ = null
};
Blockly.Toolbox = function(a) {
    this.workspace_ = a
};
Blockly.Toolbox.prototype.width = 0;
Blockly.Toolbox.prototype.selectedOption_ = null;
Blockly.Toolbox.prototype.lastCategory_ = null;
Blockly.Toolbox.prototype.CONFIG_ = {
    indentWidth: 19,
    cssRoot: "blocklyTreeRoot",
    cssHideRoot: "blocklyHidden",
    cssItem: "",
    cssTreeRow: "blocklyTreeRow",
    cssItemLabel: "blocklyTreeLabel",
    cssTreeIcon: "blocklyTreeIcon",
    cssExpandedFolderIcon: "blocklyTreeIconOpen",
    cssFileIcon: "blocklyTreeIconNone",
    cssSelectedRow: "blocklyTreeSelected"
};
Blockly.Toolbox.prototype.init = function() {
    var a = this.workspace_;
    this.HtmlDiv = goog.dom.createDom("div", "blocklyToolboxDiv");
    this.HtmlDiv.setAttribute("dir", a.RTL ? "RTL" : "LTR");
    document.body.appendChild(this.HtmlDiv);
    Blockly.bindEvent_(this.HtmlDiv, "mousedown", this, function(a) {
        Blockly.isRightButton(a) || a.target == this.HtmlDiv ? Blockly.hideChaff(!1) : Blockly.hideChaff(!0)
    });
    this.flyout_ = new Blockly.Flyout({
        disabledPatternId: a.options.disabledPatternId,
        parentWorkspace: a,
        RTL: a.RTL
    });
    goog.dom.insertSiblingAfter(this.flyout_.createDom(),
        a.svgGroup_);
    this.flyout_.init(a);
    this.CONFIG_.cleardotPath = a.options.pathToMedia + "1x1.gif";
    this.CONFIG_.cssCollapsedFolderIcon = "blocklyTreeIconClosed" + (a.RTL ? "Rtl" : "Ltr");
    var b = new Blockly.Toolbox.TreeControl(this, this.CONFIG_);
    this.tree_ = b;
    b.setShowRootNode(!1);
    b.setShowLines(!1);
    b.setShowExpandIcons(!1);
    b.setSelectedItem(null);
    this.populate_(a.options.languageTree);
    b.render(this.HtmlDiv);
    this.addColour_();
    this.position()
};
Blockly.Toolbox.prototype.dispose = function() {
    this.flyout_.dispose();
    this.tree_.dispose();
    goog.dom.removeNode(this.HtmlDiv);
    this.lastCategory_ = this.workspace_ = null
};
Blockly.Toolbox.prototype.position = function() {
    var a = this.HtmlDiv;
    if (a) {
        var b = this.workspace_.getParentSvg(),
            c = goog.style.getPageOffset(b);
        b = Blockly.svgSize(b);
        a.style.left = this.workspace_.RTL ? c.x + b.width - a.offsetWidth + "px" : c.x + "px";
        a.style.height = b.height + "px";
        a.style.top = c.y + "px";
        this.width = a.offsetWidth;
        this.workspace_.RTL || --this.width;
        this.flyout_.position()
    }
};
Blockly.Toolbox.prototype.populate_ = function(a) {
    function b(a, f) {
        for (var e = 0, h; h = a.childNodes[e]; e++)
            if (h.tagName) switch (h.tagName.toUpperCase()) {
                case "CATEGORY":
                    var k = c.createNode(h.getAttribute("name"));
                    k.blocks = [];
                    f.add(k);
                    var l = h.getAttribute("custom");
                    l ? k.blocks = l : b(h, k);
                    l = h.getAttribute("colour");
                    goog.isString(l) ? (l.match(/^#[0-9a-fA-F]{6}$/) ? k.hexColour = l : k.hexColour = Blockly.hueToRgb(l), d = !0) : k.hexColour = "";
                    "true" == h.getAttribute("expanded") ? (k.blocks.length && c.setSelectedItem(k), k.setExpanded(!0)) :
                        k.setExpanded(!1);
                    break;
                case "SEP":
                    f.add(new Blockly.Toolbox.TreeSeparator);
                    break;
                case "BLOCK":
                case "SHADOW":
                    f.blocks.push(h)
            }
    }
    var c = this.tree_;
    c.removeChildren();
    c.blocks = [];
    var d = !1;
    b(a, this.tree_);
    this.hasColours_ = d;
    if (c.blocks.length) throw "Toolbox cannot have both blocks and categories in the root level.";
    Blockly.fireUiEvent(window, "resize")
};
Blockly.Toolbox.prototype.addColour_ = function(a) {
    a = (a || this.tree_).getChildren();
    for (var b = 0, c; c = a[b]; b++) {
        var d = c.getRowElement();
        if (d) {
            var e = this.hasColours_ ? "8px solid " + (c.hexColour || "#ddd") : "none";
            this.workspace_.RTL ? d.style.borderRight = e : d.style.borderLeft = e
        }
        this.addColour_(c)
    }
};
Blockly.Toolbox.prototype.clearSelection = function() {
    this.tree_.setSelectedItem(null)
};
Blockly.Toolbox.prototype.getRect = function() {
    var a = this.workspace_.RTL ? Blockly.svgSize(this.workspace_.getParentSvg()).width - this.width : -1E7;
    return new goog.math.Rect(a, -1E7, 1E7 + this.width, 2E7)
};
Blockly.Toolbox.TreeControl = function(a, b) {
    this.toolbox_ = a;
    goog.ui.tree.TreeControl.call(this, goog.html.SafeHtml.EMPTY, b)
};
goog.inherits(Blockly.Toolbox.TreeControl, goog.ui.tree.TreeControl);
Blockly.Toolbox.TreeControl.prototype.enterDocument = function() {
    Blockly.Toolbox.TreeControl.superClass_.enterDocument.call(this);
    if (goog.events.BrowserFeature.TOUCH_ENABLED) {
        var a = this.getElement();
        Blockly.bindEvent_(a, goog.events.EventType.TOUCHSTART, this, this.handleTouchEvent_)
    }
};
Blockly.Toolbox.TreeControl.prototype.handleTouchEvent_ = function(a) {
    a.preventDefault();
    var b = this.getNodeFromEvent_(a);
    b && a.type === goog.events.EventType.TOUCHSTART && setTimeout(function() {
        b.onMouseDown(a)
    }, 1)
};
Blockly.Toolbox.TreeControl.prototype.createNode = function(a) {
    return new Blockly.Toolbox.TreeNode(this.toolbox_, a ? goog.html.SafeHtml.htmlEscape(a) : goog.html.SafeHtml.EMPTY, this.getConfig(), this.getDomHelper())
};
Blockly.Toolbox.TreeControl.prototype.setSelectedItem = function(a) {
    Blockly.removeAllRanges();
    var b = this.toolbox_;
    if (a != this.selectedItem_ && a != b.tree_) {
        b.lastCategory_ && (b.lastCategory_.getRowElement().style.backgroundColor = "");
        if (a) {
            var c = a.hexColour || "#57e";
            a.getRowElement().style.backgroundColor = c;
            b.addColour_(a)
        }
        goog.ui.tree.TreeControl.prototype.setSelectedItem.call(this, a);
        a && a.blocks && a.blocks.length ? (b.flyout_.show(a.blocks), b.lastCategory_ != a && b.flyout_.scrollToTop()) : b.flyout_.hide();
        a && (b.lastCategory_ =
            a)
    }
};
Blockly.Toolbox.TreeNode = function(a, b, c, d) {
    goog.ui.tree.TreeNode.call(this, b, c, d);
    a && (b = function() {
        Blockly.fireUiEvent(window, "resize")
    }, goog.events.listen(a.tree_, goog.ui.tree.BaseNode.EventType.EXPAND, b), goog.events.listen(a.tree_, goog.ui.tree.BaseNode.EventType.COLLAPSE, b))
};
goog.inherits(Blockly.Toolbox.TreeNode, goog.ui.tree.TreeNode);
Blockly.Toolbox.TreeNode.prototype.getExpandIconSafeHtml = function() {
    return goog.html.SafeHtml.create("span")
};
Blockly.Toolbox.TreeNode.prototype.onMouseDown = function(a) {
    this.hasChildren() && this.isUserCollapsible_ ? (this.toggle(), this.select()) : this.isSelected() ? this.getTree().setSelectedItem(null) : this.select();
    this.updateRow()
};
Blockly.Toolbox.TreeNode.prototype.onDoubleClick_ = function(a) {};
Blockly.Toolbox.TreeSeparator = function() {
    Blockly.Toolbox.TreeNode.call(this, null, "", Blockly.Toolbox.TreeSeparator.CONFIG_)
};
goog.inherits(Blockly.Toolbox.TreeSeparator, Blockly.Toolbox.TreeNode);
Blockly.Toolbox.TreeSeparator.CONFIG_ = {
    cssTreeRow: "blocklyTreeSeparator"
};
Blockly.Css = {};
Blockly.Css.Cursor = {
    OPEN: "handopen",
    CLOSED: "handclosed",
    DELETE: "handdelete"
};
Blockly.Css.currentCursor_ = "";
Blockly.Css.styleSheet_ = null;
Blockly.Css.mediaPath_ = "";
Blockly.Css.inject = function(a, b) {
    if (!Blockly.Css.styleSheet_) {
        var c = ".blocklyDraggable {}\n";
        a && (c += Blockly.Css.CONTENT.join("\n"), Blockly.FieldDate && (c += Blockly.FieldDate.CSS.join("\n")));
        Blockly.Css.mediaPath_ = b.replace(/[\\\/]$/, "");
        c = c.replace(/<<<PATH>>>/g, Blockly.Css.mediaPath_);
        var d = document.createElement("style");
        document.head.appendChild(d);
        c = document.createTextNode(c);
        d.appendChild(c);
        Blockly.Css.styleSheet_ = d.sheet;
        Blockly.Css.setCursor(Blockly.Css.Cursor.OPEN)
    }
};
Blockly.Css.setCursor = function(a) {
    if (Blockly.Css.currentCursor_ != a) {
        Blockly.Css.currentCursor_ = a;
        var b = "url(" + Blockly.Css.mediaPath_ + "/" + a + ".cur), auto",
            c = ".blocklyDraggable {\n  cursor: " + b + ";\n}\n";
        Blockly.Css.styleSheet_.deleteRule(0);
        Blockly.Css.styleSheet_.insertRule(c, 0);
        c = document.getElementsByClassName("blocklyToolboxDiv");
        for (var d = 0, e; e = c[d]; d++) e.style.cursor = a == Blockly.Css.Cursor.DELETE ? b : "";
        document.body.parentNode.style.cursor = a == Blockly.Css.Cursor.OPEN ? "" : b
    }
};
Blockly.Css.CONTENT = [".blocklySvg {", "background-color: #fff;", "outline: none;", "overflow: hidden;", "}", ".blocklyWidgetDiv {", "display: none;", "position: absolute;", "z-index: 999;", "}", ".blocklyTooltipDiv {", "background-color: #ffffc7;", "border: 1px solid #ddc;", "box-shadow: 4px 4px 20px 1px rgba(0,0,0,.15);", "color: #000;", "display: none;", "font-family: sans-serif;", "font-size: 9pt;", "opacity: 0.9;", "padding: 2px;", "position: absolute;", "z-index: 1000;", "}", ".blocklyResizeSE {", "cursor: se-resize;",
    "fill: #aaa;", "}", ".blocklyResizeSW {", "cursor: sw-resize;", "fill: #aaa;", "}", ".blocklyResizeLine {", "stroke: #888;", "stroke-width: 1;", "}", ".blocklyHighlightedConnectionPath {", "fill: none;", "stroke: #fc3;", "stroke-width: 4px;", "}", ".blocklyPathLight {", "fill: none;", "stroke-linecap: round;", "stroke-width: 1;", "}", ".blocklySelected>.blocklyPath {", "stroke: #fc3;", "stroke-width: 3px;", "}", ".blocklySelected>.blocklyPathLight {", "display: none;", "}", ".blocklyDragging>.blocklyPath,", ".blocklyDragging>.blocklyPathLight {",
    "fill-opacity: .8;", "stroke-opacity: .8;", "}", ".blocklyDragging>.blocklyPathDark {", "display: none;", "}", ".blocklyDisabled>.blocklyPath {", "fill-opacity: .5;", "stroke-opacity: .5;", "}", ".blocklyDisabled>.blocklyPathLight,", ".blocklyDisabled>.blocklyPathDark {", "display: none;", "}", ".blocklyText {", "cursor: default;", "fill: #fff;", "font-family: sans-serif;", "font-size: 11pt;", "}", ".blocklyNonEditableText>text {", "pointer-events: none;", "}", ".blocklyNonEditableText>rect,", ".blocklyEditableText>rect {",
    "fill: #fff;", "fill-opacity: .6;", "}", ".blocklyNonEditableText>text,", ".blocklyEditableText>text {", "fill: #000;", "}", ".blocklyEditableText:hover>rect {", "stroke: #fff;", "stroke-width: 2;", "}", ".blocklyBubbleText {", "fill: #000;", "}", ".blocklySvg text {", "user-select: none;", "-moz-user-select: none;", "-webkit-user-select: none;", "cursor: inherit;", "}", ".blocklyHidden {", "display: none;", "}", ".blocklyFieldDropdown:not(.blocklyHidden) {", "display: block;", "}", ".blocklyIconGroup {", "cursor: default;",
    "}", ".blocklyIconGroup:not(:hover),", ".blocklyIconGroupReadonly {", "opacity: .6;", "}", ".blocklyIconShape {", "fill: #00f;", "stroke: #fff;", "stroke-width: 1px;", "}", ".blocklyIconSymbol {", "fill: #fff;", "}", ".blocklyMinimalBody {", "margin: 0;", "padding: 0;", "}", ".blocklyCommentTextarea {", "background-color: #ffc;", "border: 0;", "margin: 0;", "padding: 2px;", "resize: none;", "}", ".blocklyHtmlInput {", "border: none;", "border-radius: 4px;", "font-family: sans-serif;", "height: 100%;", "margin: 0;", "outline: none;",
    "padding: 0 1px;", "width: 100%", "}", ".blocklyMainBackground {", "stroke-width: 1;", "stroke: #c6c6c6;", "}", ".blocklyMutatorBackground {", "fill: #fff;", "stroke: #ddd;", "stroke-width: 1;", "}", ".blocklyFlyoutBackground {", "fill: #ddebef;", "fill-opacity: .8;", "}", ".blocklyScrollbarBackground {", "opacity: 0;", "}", ".blocklyScrollbarKnob {", "fill: #a2c9d4;", "}", ".blocklyScrollbarBackground:hover+.blocklyScrollbarKnob,", ".blocklyScrollbarKnob:hover {", "fill: #a0c7d2;", "}", ".blocklyZoom>image {", "opacity: .4;",
    "}", ".blocklyZoom>image:hover {", "opacity: .6;", "}", ".blocklyZoom>image:active {", "opacity: .8;", "}", ".blocklyFlyout .blocklyScrollbarKnob {", "fill: #a2c9d4;", "}", ".blocklyFlyout .blocklyScrollbarBackground:hover+.blocklyScrollbarKnob,", ".blocklyFlyout .blocklyScrollbarKnob:hover {", "fill: #a0c7d2;", "}", ".blocklyInvalidInput {", "background: #faa;", "}", ".blocklyAngleCircle {", "stroke: #444;", "stroke-width: 1;", "fill: #ddd;", "fill-opacity: .8;", "}", ".blocklyAngleMarks {", "stroke: #444;", "stroke-width: 1;",
    "}", ".blocklyAngleGauge {", "fill: #f88;", "fill-opacity: .8;", "}", ".blocklyAngleLine {", "stroke: #f00;", "stroke-width: 2;", "stroke-linecap: round;", "}", ".blocklyContextMenu {", "border-radius: 4px;", "}", ".blocklyDropdownMenu {", "padding: 0 !important;", "}", ".blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,", ".blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon {", "background: url(<<<PATH>>>/sprites.png) no-repeat -48px -16px !important;", "}", ".blocklyToolboxDiv {", "background-color: #a2c9d4;",
    "overflow-x: visible;", "overflow-y: auto;", "position: absolute;", "}", ".blocklyTreeRoot {", "padding: 4px 0;", "}", ".blocklyTreeRoot:focus {", "outline: none;", "}", ".blocklyTreeRow {", "height: 22px;", "line-height: 22px;", "margin-bottom: 3px;", "padding-right: 8px;", "white-space: nowrap;", "}", '.blocklyToolboxDiv[dir="RTL"] .blocklyTreeRow {', "margin-left: 8px;", "}", ".blocklyTreeRow:not(.blocklyTreeSelected):hover {", "background-color: #a2c9d4;", "}", ".blocklyTreeSeparator {", "border-bottom: solid #a2c9d4 1px;",
    "height: 0px;", "margin: 5px 0;", "}", ".blocklyTreeIcon {", "background-image: url(<<<PATH>>>/sprites.png);", "height: 16px;", "vertical-align: middle;", "width: 16px;", "}", ".blocklyTreeIconClosedLtr {", "background-position: -32px -1px;", "}", ".blocklyTreeIconClosedRtl {", "background-position: 0px -1px;", "}", ".blocklyTreeIconOpen {", "background-position: -16px -1px;", "}", ".blocklyTreeSelected>.blocklyTreeIconClosedLtr {", "background-position: -32px -17px;", "}", ".blocklyTreeSelected>.blocklyTreeIconClosedRtl {",
    "background-position: 0px -17px;", "}", ".blocklyTreeSelected>.blocklyTreeIconOpen {", "background-position: -16px -17px;", "}", ".blocklyTreeIconNone,", ".blocklyTreeSelected>.blocklyTreeIconNone {", "background-position: -48px -1px;", "}", ".blocklyTreeLabel {", "cursor: default;", "font-family: sans-serif;", "font-size: 16px;", "padding: 0 3px;", "vertical-align: middle;", "}", ".blocklyTreeSelected .blocklyTreeLabel {", "color: #fff;", "}", ".blocklyWidgetDiv .goog-palette {", "outline: none;", "cursor: default;",
    "}", ".blocklyWidgetDiv .goog-palette-table {", "border: 1px solid #666;", "border-collapse: collapse;", "}", ".blocklyWidgetDiv .goog-palette-cell {", "height: 13px;", "width: 15px;", "margin: 0;", "border: 0;", "text-align: center;", "vertical-align: middle;", "border-right: 1px solid #666;", "font-size: 1px;", "}", ".blocklyWidgetDiv .goog-palette-colorswatch {", "position: relative;", "height: 13px;", "width: 15px;", "border: 1px solid #666;", "}", ".blocklyWidgetDiv .goog-palette-cell-hover .goog-palette-colorswatch {",
    "border: 1px solid #FFF;", "}", ".blocklyWidgetDiv .goog-palette-cell-selected .goog-palette-colorswatch {", "border: 1px solid #000;", "color: #fff;", "}", ".blocklyWidgetDiv .goog-menu {", "background: #fff;", "border-color: #ccc #666 #666 #ccc;", "border-style: solid;", "border-width: 1px;", "cursor: default;", "font: normal 13px Arial, sans-serif;", "margin: 0;", "outline: none;", "padding: 4px 0;", "position: absolute;", "overflow-y: auto;", "overflow-x: hidden;", "max-height: 100%;", "z-index: 20000;", "}", ".blocklyWidgetDiv .goog-menuitem {",
    "color: #000;", "font: normal 13px Arial, sans-serif;", "list-style: none;", "margin: 0;", "padding: 4px 7em 4px 28px;", "white-space: nowrap;", "}", ".blocklyWidgetDiv .goog-menuitem.goog-menuitem-rtl {", "padding-left: 7em;", "padding-right: 28px;", "}", ".blocklyWidgetDiv .goog-menu-nocheckbox .goog-menuitem,", ".blocklyWidgetDiv .goog-menu-noicon .goog-menuitem {", "padding-left: 12px;", "}", ".blocklyWidgetDiv .goog-menu-noaccel .goog-menuitem {", "padding-right: 20px;", "}", ".blocklyWidgetDiv .goog-menuitem-content {",
    "color: #000;", "font: normal 13px Arial, sans-serif;", "}", ".blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-accel,", ".blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-content {", "color: #ccc !important;", "}", ".blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-icon {", "opacity: 0.3;", "-moz-opacity: 0.3;", "filter: alpha(opacity=30);", "}", ".blocklyWidgetDiv .goog-menuitem-highlight,", ".blocklyWidgetDiv .goog-menuitem-hover {", "background-color: #d6e9f8;", "border-color: #d6e9f8;",
    "border-style: dotted;", "border-width: 1px 0;", "padding-bottom: 3px;", "padding-top: 3px;", "}", ".blocklyWidgetDiv .goog-menuitem-checkbox,", ".blocklyWidgetDiv .goog-menuitem-icon {", "background-repeat: no-repeat;", "height: 16px;", "left: 6px;", "position: absolute;", "right: auto;", "vertical-align: middle;", "width: 16px;", "}", ".blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-checkbox,", ".blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-icon {", "left: auto;", "right: 6px;", "}", ".blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,",
    ".blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon {", "background: url(//ssl.gstatic.com/editor/editortoolbar.png) no-repeat -512px 0;", "}", ".blocklyWidgetDiv .goog-menuitem-accel {", "color: #999;", "direction: ltr;", "left: auto;", "padding: 0 6px;", "position: absolute;", "right: 0;", "text-align: right;", "}", ".blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-accel {", "left: 0;", "right: auto;", "text-align: left;", "}", ".blocklyWidgetDiv .goog-menuitem-mnemonic-hint {", "text-decoration: underline;",
    "}", ".blocklyWidgetDiv .goog-menuitem-mnemonic-separator {", "color: #999;", "font-size: 12px;", "padding-left: 4px;", "}", ".blocklyWidgetDiv .goog-menuseparator {", "border-top: 1px solid #ccc;", "margin: 4px 0;", "padding: 0;", "}", ""
];
Blockly.WidgetDiv = {};
Blockly.WidgetDiv.DIV = null;
Blockly.WidgetDiv.owner_ = null;
Blockly.WidgetDiv.dispose_ = null;
Blockly.WidgetDiv.createDom = function() {
    Blockly.WidgetDiv.DIV || (Blockly.WidgetDiv.DIV = goog.dom.createDom("div", "blocklyWidgetDiv"), document.body.appendChild(Blockly.WidgetDiv.DIV))
};
Blockly.WidgetDiv.show = function(a, b, c) {
    Blockly.WidgetDiv.hide();
    Blockly.WidgetDiv.owner_ = a;
    Blockly.WidgetDiv.dispose_ = c;
    a = goog.style.getViewportPageOffset(document);
    Blockly.WidgetDiv.DIV.style.top = a.y + "px";
    Blockly.WidgetDiv.DIV.style.direction = b ? "rtl" : "ltr";
    Blockly.WidgetDiv.DIV.style.display = "block"
};
Blockly.WidgetDiv.hide = function() {
    Blockly.WidgetDiv.owner_ && (Blockly.WidgetDiv.DIV.style.display = "none", Blockly.WidgetDiv.DIV.style.left = "", Blockly.WidgetDiv.DIV.style.top = "", Blockly.WidgetDiv.DIV.style.height = "", Blockly.WidgetDiv.dispose_ && Blockly.WidgetDiv.dispose_(), Blockly.WidgetDiv.owner_ = null, Blockly.WidgetDiv.dispose_ = null, goog.dom.removeChildren(Blockly.WidgetDiv.DIV))
};
Blockly.WidgetDiv.isVisible = function() {
    return !!Blockly.WidgetDiv.owner_
};
Blockly.WidgetDiv.hideIfOwner = function(a) {
    Blockly.WidgetDiv.owner_ == a && Blockly.WidgetDiv.hide()
};
Blockly.WidgetDiv.position = function(a, b, c, d, e) {
    b < d.y && (b = d.y);
    e ? a > c.width + d.x && (a = c.width + d.x) : a < d.x && (a = d.x);
    Blockly.WidgetDiv.DIV.style.left = a + "px";
    Blockly.WidgetDiv.DIV.style.top = b + "px";
    Blockly.WidgetDiv.DIV.style.height = c.height - b + d.y + "px"
};
Blockly.inject = function(a, b) {
    goog.isString(a) && (a = document.getElementById(a));
    if (!goog.dom.contains(document, a)) throw "Error: container is not in current document.";
    var c = Blockly.parseOptions_(b || {}),
        d = Blockly.createDom_(a, c);
    c = Blockly.createMainWorkspace_(d, c);
    Blockly.init_(c);
    c.markFocused();
    Blockly.bindEvent_(d, "focus", c, c.markFocused);
    return c
};
Blockly.parseToolboxTree_ = function(a) {
    a ? ("string" != typeof a && ("undefined" == typeof XSLTProcessor && a.outerHTML ? a = a.outerHTML : a instanceof Element || (a = null)), "string" == typeof a && (a = Blockly.Xml.textToDom(a))) : a = null;
    return a
};
Blockly.parseOptions_ = function(a) {
    var b = !!a.readOnly;
    if (b) var c = null,
        d = !1,
        e = !1,
        f = !1,
        g = !1,
        h = !1,
        k = !1;
    else c = Blockly.parseToolboxTree_(a.toolbox), d = !(!c || !c.getElementsByTagName("category").length), e = a.trashcan, void 0 === e && (e = d), f = a.collapse, void 0 === f && (f = d), g = a.comments, void 0 === g && (g = d), h = a.disable, void 0 === h && (h = d), k = a.sounds, void 0 === k && (k = !0);
    var l = a.scrollbars;
    void 0 === l && (l = d);
    var p = a.css;
    void 0 === p && (p = !0);
    var m = a.grid || {},
        q = {};
    q.spacing = parseFloat(m.spacing) || 0;
    q.colour = m.colour || "#888";
    q.length =
        parseFloat(m.length) || 1;
    q.snap = 0 < q.spacing && !!m.snap;
    m = "https://blockly-demo.appspot.com/static/media/";
    a.media ? m = a.media : a.path && (m = a.path + "media/");
    var n = a.zoom || {},
        r = {};
    r.controls = void 0 === n.controls ? !1 : !!n.controls;
    r.wheel = void 0 === n.wheel ? !1 : !!n.wheel;
    r.startScale = void 0 === n.startScale ? 1 : parseFloat(n.startScale);
    r.maxScale = void 0 === n.maxScale ? 3 : parseFloat(n.maxScale);
    r.minScale = void 0 === n.minScale ? .3 : parseFloat(n.minScale);
    r.scaleSpeed = void 0 === n.scaleSpeed ? 1.2 : parseFloat(n.scaleSpeed);
    n = !!a.realtime;
    return {
        RTL: !!a.rtl,
        collapse: f,
        comments: g,
        disable: h,
        readOnly: b,
        maxBlocks: a.maxBlocks || Infinity,
        pathToMedia: m,
        hasCategories: d,
        hasScrollbars: l,
        hasTrashcan: e,
        hasSounds: k,
        hasCss: p,
        languageTree: c,
        gridOptions: q,
        zoomOptions: r,
        enableRealtime: n,
        realtimeOptions: n ? a.realtimeOptions : void 0
    }
};
Blockly.createDom_ = function(a, b) {
    a.setAttribute("dir", "LTR");
    goog.ui.Component.setDefaultRightToLeft(b.RTL);
    Blockly.Css.inject(b.hasCss, b.pathToMedia);
    var c = Blockly.createSvgElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:html": "http://www.w3.org/1999/xhtml",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            version: "1.1",
            "class": "blocklySvg"
        }, a),
        d = Blockly.createSvgElement("defs", {}, c),
        e = String(Math.random()).substring(2),
        f = Blockly.createSvgElement("filter", {
            id: "blocklyEmbossFilter" + e
        }, d);
    Blockly.createSvgElement("feGaussianBlur", {
        "in": "SourceAlpha",
        stdDeviation: 1,
        result: "blur"
    }, f);
    var g = Blockly.createSvgElement("feSpecularLighting", {
        "in": "blur",
        surfaceScale: 1,
        specularConstant: .5,
        specularExponent: 10,
        "lighting-color": "white",
        result: "specOut"
    }, f);
    Blockly.createSvgElement("fePointLight", {
        x: -5E3,
        y: -1E4,
        z: 2E4
    }, g);
    Blockly.createSvgElement("feComposite", {
        "in": "specOut",
        in2: "SourceAlpha",
        operator: "in",
        result: "specOut"
    }, f);
    Blockly.createSvgElement("feComposite", {
        "in": "SourceGraphic",
        in2: "specOut",
        operator: "arithmetic",
        k1: 0,
        k2: 1,
        k3: 1,
        k4: 0
    }, f);
    b.embossFilterId = f.id;
    f = Blockly.createSvgElement("pattern", {
        id: "blocklyDisabledPattern" + e,
        patternUnits: "userSpaceOnUse",
        width: 10,
        height: 10
    }, d);
    Blockly.createSvgElement("rect", {
        width: 10,
        height: 10,
        fill: "#aaa"
    }, f);
    Blockly.createSvgElement("path", {
        d: "M 0 0 L 10 10 M 10 0 L 0 10",
        stroke: "#cc0"
    }, f);
    b.disabledPatternId = f.id;
    d = Blockly.createSvgElement("pattern", {
        id: "blocklyGridPattern" + e,
        patternUnits: "userSpaceOnUse"
    }, d);
    0 < b.gridOptions.length && 0 < b.gridOptions.spacing && (Blockly.createSvgElement("line", {
        stroke: b.gridOptions.colour
    }, d), 1 < b.gridOptions.length && Blockly.createSvgElement("line", {
        stroke: b.gridOptions.colour
    }, d));
    b.gridPattern = d;
    return c
};
Blockly.createMainWorkspace_ = function(a, b) {
    b.parentWorkspace = null;
    b.getMetrics = Blockly.getMainWorkspaceMetrics_;
    b.setMetrics = Blockly.setMainWorkspaceMetrics_;
    var c = new Blockly.WorkspaceSvg(b);
    c.scale = b.zoomOptions.startScale;
    a.appendChild(c.createDom("blocklyMainBackground"));
    c.translate(0, 0);
    c.markFocused();
    b.readOnly || b.hasScrollbars || c.addChangeListener(function() {
        if (0 == Blockly.dragMode_) {
            var a = c.getMetrics(),
                e = a.viewLeft + a.absoluteLeft,
                f = a.viewTop + a.absoluteTop;
            if (a.contentTop < f || a.contentTop +
                a.contentHeight > a.viewHeight + f || a.contentLeft < (b.RTL ? a.viewLeft : e) || a.contentLeft + a.contentWidth > (b.RTL ? a.viewWidth : a.viewWidth + e))
                for (var g = c.getTopBlocks(!1), h = 0, k; k = g[h]; h++) {
                    var l = k.getRelativeToSurfaceXY(),
                        p = k.getHeightWidth(),
                        m = f + 25 - p.height - l.y;
                    0 < m && k.moveBy(0, m);
                    m = f + a.viewHeight - 25 - l.y;
                    0 > m && k.moveBy(0, m);
                    m = 25 + e - l.x - (b.RTL ? 0 : p.width);
                    0 < m && k.moveBy(m, 0);
                    m = e + a.viewWidth - 25 - l.x + (b.RTL ? p.width : 0);
                    0 > m && k.moveBy(m, 0)
                }
        }
    });
    Blockly.svgResize(c);
    Blockly.WidgetDiv.createDom();
    Blockly.Tooltip.createDom();
    return c
};
Blockly.init_ = function(a) {
    var b = a.options,
        c = a.getParentSvg();
    Blockly.bindEvent_(c, "contextmenu", null, function(a) {
        Blockly.isTargetInput_(a) || a.preventDefault()
    });
    Blockly.bindEvent_(window, "resize", null, function() {
        Blockly.svgResize(a)
    });
    Blockly.documentEventsBound_ || (Blockly.bindEvent_(document, "keydown", null, Blockly.onKeyDown_), Blockly.bindEvent_(document, "touchend", null, Blockly.longStop_), Blockly.bindEvent_(document, "touchcancel", null, Blockly.longStop_), document.addEventListener("mouseup", Blockly.onMouseUp_, !1), goog.userAgent.IPAD && Blockly.bindEvent_(window, "orientationchange", document, function() {
        Blockly.fireUiEvent(window, "resize")
    }), Blockly.documentEventsBound_ = !0);
    b.languageTree && (a.toolbox_ ? a.toolbox_.init(a) : a.flyout_ && (a.flyout_.init(a), a.flyout_.show(b.languageTree.childNodes), a.scrollX = a.flyout_.width_, b.RTL && (a.scrollX *= -1), c = "translate(" + a.scrollX + ",0)", a.getCanvas().setAttribute("transform", c), a.getBubbleCanvas().setAttribute("transform", c)));
    b.hasScrollbars && (a.scrollbar = new Blockly.ScrollbarPair(a),
        a.scrollbar.resize());
    if (b.hasSounds) {
        a.loadAudio_([b.pathToMedia + "click.mp3", b.pathToMedia + "click.wav", b.pathToMedia + "click.ogg"], "click");
        a.loadAudio_([b.pathToMedia + "disconnect.wav", b.pathToMedia + "disconnect.mp3", b.pathToMedia + "disconnect.ogg"], "disconnect");
        a.loadAudio_([b.pathToMedia + "delete.mp3", b.pathToMedia + "delete.ogg", b.pathToMedia + "delete.wav"], "delete");
        var d = [];
        b = function() {
            for (; d.length;) Blockly.unbindEvent_(d.pop());
            a.preloadAudio_()
        };
        d.push(Blockly.bindEvent_(document, "mousemove",
            null, b));
        d.push(Blockly.bindEvent_(document, "touchstart", null, b))
    }
};
Blockly.updateToolbox = function(a) {
    console.warn("Deprecated call to Blockly.updateToolbox, use workspace.updateToolbox instead.");
    Blockly.getMainWorkspace().updateToolbox(a)
};
Blockly.utils = {};
Blockly.addClass_ = function(a, b) {
    var c = a.getAttribute("class") || ""; - 1 == (" " + c + " ").indexOf(" " + b + " ") && (c && (c += " "), a.setAttribute("class", c + b))
};
Blockly.removeClass_ = function(a, b) {
    var c = a.getAttribute("class");
    if (-1 != (" " + c + " ").indexOf(" " + b + " ")) {
        c = c.split(/\s+/);
        for (var d = 0; d < c.length; d++) c[d] && c[d] != b || (c.splice(d, 1), d--);
        c.length ? a.setAttribute("class", c.join(" ")) : a.removeAttribute("class")
    }
};
Blockly.hasClass_ = function(a, b) {
    return -1 != (" " + a.getAttribute("class") + " ").indexOf(" " + b + " ")
};
Blockly.bindEvent_ = function(a, b, c, d) {
    var e = c ? function(a) {
        d.call(c, a)
    } : d;
    a.addEventListener(b, e, !1);
    var f = [
        [a, b, e]
    ];
    if (b in Blockly.bindEvent_.TOUCH_MAP) {
        e = function(a) {
            if (1 == a.changedTouches.length) {
                var b = a.changedTouches[0];
                a.clientX = b.clientX;
                a.clientY = b.clientY
            }
            d.call(c, a);
            a.preventDefault()
        };
        for (var g = 0, h; h = Blockly.bindEvent_.TOUCH_MAP[b][g]; g++) a.addEventListener(h, e, !1), f.push([a, h, e])
    }
    return f
};
Blockly.bindEvent_.TOUCH_MAP = {};
goog.events.BrowserFeature.TOUCH_ENABLED && (Blockly.bindEvent_.TOUCH_MAP = {
    mousedown: ["touchstart"],
    mousemove: ["touchmove"],
    mouseup: ["touchend", "touchcancel"]
});
Blockly.unbindEvent_ = function(a) {
    for (; a.length;) {
        var b = a.pop(),
            c = b[2];
        b[0].removeEventListener(b[1], c, !1)
    }
    return c
};
Blockly.fireUiEventNow = function(a, b) {
    var c = Blockly.fireUiEvent.DB_[b];
    if (c) {
        var d = c.indexOf(a); - 1 != d && c.splice(d, 1)
    }
    if (document.createEvent) c = document.createEvent("UIEvents"), c.initEvent(b, !0, !0), a.dispatchEvent(c);
    else if (document.createEventObject) c = document.createEventObject(), a.fireEvent("on" + b, c);
    else throw "FireEvent: No event creation mechanism.";
};
Blockly.fireUiEvent = function(a, b) {
    var c = Blockly.fireUiEvent.DB_[b];
    if (c) {
        if (-1 != c.indexOf(a)) return;
        c.push(a)
    } else Blockly.fireUiEvent.DB_[b] = [a];
    setTimeout(function() {
        Blockly.fireUiEventNow(a, b)
    }, 0)
};
Blockly.fireUiEvent.DB_ = {};
Blockly.noEvent = function(a) {
    a.preventDefault();
    a.stopPropagation()
};
Blockly.isTargetInput_ = function(a) {
    return "textarea" == a.target.type || "text" == a.target.type || "number" == a.target.type || "email" == a.target.type || "password" == a.target.type || "search" == a.target.type || "tel" == a.target.type || "url" == a.target.type || a.target.isContentEditable
};
Blockly.getRelativeXY_ = function(a) {
    var b = new goog.math.Coordinate(0, 0),
        c = a.getAttribute("x");
    c && (b.x = parseInt(c, 10));
    if (c = a.getAttribute("y")) b.y = parseInt(c, 10);
    if (a = (a = a.getAttribute("transform")) && a.match(Blockly.getRelativeXY_.XY_REGEXP_)) b.x += parseFloat(a[1]), a[3] && (b.y += parseFloat(a[3]));
    return b
};
Blockly.getRelativeXY_.XY_REGEXP_ = /translate\(\s*([-+\d.e]+)([ ,]\s*([-+\d.e]+)\s*\))?/;
Blockly.getSvgXY_ = function(a, b) {
    var c = 0,
        d = 0,
        e = 1;
    if (goog.dom.contains(b.getCanvas(), a) || goog.dom.contains(b.getBubbleCanvas(), a)) e = b.scale;
    do {
        var f = Blockly.getRelativeXY_(a);
        if (a == b.getCanvas() || a == b.getBubbleCanvas()) e = 1;
        c += f.x * e;
        d += f.y * e;
        a = a.parentNode
    } while (a && a != b.getParentSvg());
    return new goog.math.Coordinate(c, d)
};
Blockly.createSvgElement = function(a, b, c, d) {
    a = document.createElementNS(Blockly.SVG_NS, a);
    for (var e in b) a.setAttribute(e, b[e]);
    document.body.runtimeStyle && (a.runtimeStyle = a.currentStyle = a.style);
    c && c.appendChild(a);
    return a
};
Blockly.removeAllRanges = function() {
    window.getSelection && setTimeout(function() {
        try {
            var a = window.getSelection();
            a.isCollapsed || a.removeAllRanges()
        } catch (b) {}
    }, 0)
};
Blockly.isRightButton = function(a) {
    return a.ctrlKey && goog.userAgent.MAC ? !0 : 2 == a.button
};
Blockly.mouseToSvg = function(a, b) {
    var c = b.createSVGPoint();
    c.x = a.clientX;
    c.y = a.clientY;
    var d = b.getScreenCTM();
    d = d.inverse();
    return c.matrixTransform(d)
};
Blockly.shortestStringLength = function(a) {
    if (!a.length) return 0;
    for (var b = a[0].length, c = 1; c < a.length; c++) b = Math.min(b, a[c].length);
    return b
};
Blockly.commonWordPrefix = function(a, b) {
    if (!a.length) return 0;
    if (1 == a.length) return a[0].length;
    for (var c = 0, d = b || Blockly.shortestStringLength(a), e = 0; e < d; e++) {
        for (var f = a[0][e], g = 1; g < a.length; g++)
            if (f != a[g][e]) return c;
            " " == f && (c = e + 1)
    }
    for (g = 1; g < a.length; g++)
        if ((f = a[g][e]) && " " != f) return c;
    return d
};
Blockly.commonWordSuffix = function(a, b) {
    if (!a.length) return 0;
    if (1 == a.length) return a[0].length;
    for (var c = 0, d = b || Blockly.shortestStringLength(a), e = 0; e < d; e++) {
        for (var f = a[0].substr(-e - 1, 1), g = 1; g < a.length; g++)
            if (f != a[g].substr(-e - 1, 1)) return c;
            " " == f && (c = e + 1)
    }
    for (g = 1; g < a.length; g++)
        if ((f = a[g].charAt(a[g].length - e - 1)) && " " != f) return c;
    return d
};
Blockly.isNumber = function(a) {
    return !!a.match(/^\s*-?\d+(\.\d+)?\s*$/)
};
Blockly.tokenizeInterpolation = function(a) {
    var b = [];
    a = a.split("");
    a.push("");
    for (var c = 0, d = [], e = null, f = 0; f < a.length; f++) {
        var g = a[f];
        0 == c ? "%" == g ? c = 1 : d.push(g) : 1 == c ? "%" == g ? (d.push(g), c = 0) : "0" <= g && "9" >= g ? (c = 2, e = g, (g = d.join("")) && b.push(g), d.length = 0) : (d.push("%", g), c = 0) : 2 == c && ("0" <= g && "9" >= g ? e += g : (b.push(parseInt(e, 10)), f--, c = 0))
    }(g = d.join("")) && b.push(g);
    return b
};
Blockly.genUid = function() {
    var a = Blockly.genUid.soup_.length,
        b = [];
    if (Blockly.genUid.crypto_) {
        var c = new Uint32Array(20);
        Blockly.genUid.crypto_.getRandomValues(c);
        for (var d = 0; 20 > d; d++) b[d] = Blockly.genUid.soup_.charAt(c[d] % a)
    } else
        for (d = 0; 20 > d; d++) b[d] = Blockly.genUid.soup_.charAt(Math.random() * a);
    return b.join("")
};
Blockly.genUid.crypto_ = this.crypto;
Blockly.genUid.soup_ = "!#$%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var CLOSURE_DEFINES = {
    "goog.DEBUG": !1
};
Blockly.SVG_NS = "http://www.w3.org/2000/svg";
Blockly.HTML_NS = "http://www.w3.org/1999/xhtml";
Blockly.HSV_SATURATION = .5;
Blockly.HSV_VALUE = .7;
Blockly.SPRITE = {
    width: 96,
    height: 124,
    url: "sprites.png"
};
Blockly.hueToRgb = function(a) {
    return goog.color.hsvToHex(a, Blockly.HSV_SATURATION, 255 * Blockly.HSV_VALUE)
};
Blockly.INPUT_VALUE = 1;
Blockly.OUTPUT_VALUE = 2;
Blockly.NEXT_STATEMENT = 3;
Blockly.PREVIOUS_STATEMENT = 4;
Blockly.DUMMY_INPUT = 5;
Blockly.ALIGN_LEFT = -1;
Blockly.ALIGN_CENTRE = 0;
Blockly.ALIGN_RIGHT = 1;
Blockly.OPPOSITE_TYPE = [];
Blockly.OPPOSITE_TYPE[Blockly.INPUT_VALUE] = Blockly.OUTPUT_VALUE;
Blockly.OPPOSITE_TYPE[Blockly.OUTPUT_VALUE] = Blockly.INPUT_VALUE;
Blockly.OPPOSITE_TYPE[Blockly.NEXT_STATEMENT] = Blockly.PREVIOUS_STATEMENT;
Blockly.OPPOSITE_TYPE[Blockly.PREVIOUS_STATEMENT] = Blockly.NEXT_STATEMENT;
Blockly.selected = null;
Blockly.highlightedConnection_ = null;
Blockly.localConnection_ = null;
Blockly.DRAG_RADIUS = 5;
Blockly.SNAP_RADIUS = 20;
Blockly.BUMP_DELAY = 250;
Blockly.COLLAPSE_CHARS = 30;
Blockly.LONGPRESS = 750;
Blockly.mainWorkspace = null;
Blockly.clipboardXml_ = null;
Blockly.clipboardSource_ = null;
Blockly.dragMode_ = 0;
Blockly.onTouchUpWrapper_ = null;
Blockly.svgSize = function(a) {
    return {
        width: a.cachedWidth_,
        height: a.cachedHeight_
    }
};
Blockly.svgResize = function(a) {
    for (; a.options.parentWorkspace;) a = a.options.parentWorkspace;
    var b = a.getParentSvg(),
        c = b.parentNode;
    if (c) {
        var d = c.offsetWidth;
        c = c.offsetHeight;
        b.cachedWidth_ != d && (b.setAttribute("width", d + "px"), b.cachedWidth_ = d);
        b.cachedHeight_ != c && (b.setAttribute("height", c + "px"), b.cachedHeight_ = c);
        a.resize()
    }
};
Blockly.onMouseUp_ = function(a) {
    a = Blockly.getMainWorkspace();
    Blockly.Css.setCursor(Blockly.Css.Cursor.OPEN);
    a.isScrolling = !1;
    Blockly.onTouchUpWrapper_ && (Blockly.unbindEvent_(Blockly.onTouchUpWrapper_), Blockly.onTouchUpWrapper_ = null);
    Blockly.onMouseMoveWrapper_ && (Blockly.unbindEvent_(Blockly.onMouseMoveWrapper_), Blockly.onMouseMoveWrapper_ = null)
};
Blockly.onMouseMove_ = function(a) {
    if (!(a.touches && 2 <= a.touches.length)) {
        var b = Blockly.getMainWorkspace();
        if (b.isScrolling) {
            Blockly.removeAllRanges();
            var c = a.clientX - b.startDragMouseX,
                d = a.clientY - b.startDragMouseY,
                e = b.startDragMetrics,
                f = b.startScrollX + c,
                g = b.startScrollY + d;
            f = Math.min(f, -e.contentLeft);
            g = Math.min(g, -e.contentTop);
            f = Math.max(f, e.viewWidth - e.contentLeft - e.contentWidth);
            g = Math.max(g, e.viewHeight - e.contentTop - e.contentHeight);
            b.scrollbar.set(-f - e.contentLeft, -g - e.contentTop);
            Math.sqrt(c *
                c + d * d) > Blockly.DRAG_RADIUS && Blockly.longStop_();
            a.stopPropagation()
        }
    }
};
Blockly.onKeyDown_ = function(a) {
    if (!Blockly.isTargetInput_(a)) {
        var b = !1;
        if (27 == a.keyCode) Blockly.hideChaff();
        else if (8 == a.keyCode || 46 == a.keyCode) try {
            Blockly.selected && Blockly.selected.isDeletable() && (b = !0)
        } finally {
            a.preventDefault()
        } else if (a.altKey || a.ctrlKey || a.metaKey) Blockly.selected && Blockly.selected.isDeletable() && Blockly.selected.isMovable() && (67 == a.keyCode ? (Blockly.hideChaff(), Blockly.copy_(Blockly.selected)) : 88 == a.keyCode && (Blockly.copy_(Blockly.selected), b = !0)), 86 == a.keyCode && Blockly.clipboardXml_ &&
            Blockly.clipboardSource_.paste(Blockly.clipboardXml_);
        b && (Blockly.hideChaff(), Blockly.selected.dispose(2 != Blockly.dragMode_, !0), Blockly.highlightedConnection_ && (Blockly.highlightedConnection_.unhighlight(), Blockly.highlightedConnection_ = null))
    }
};
Blockly.terminateDrag_ = function() {
    Blockly.BlockSvg.terminateDrag_();
    Blockly.Flyout.terminateDrag_()
};
Blockly.longPid_ = 0;
Blockly.longStart_ = function(a, b) {
    Blockly.longStop_();
    Blockly.longPid_ = setTimeout(function() {
        a.button = 2;
        b.onMouseDown_(a)
    }, Blockly.LONGPRESS)
};
Blockly.longStop_ = function() {
    Blockly.longPid_ && (clearTimeout(Blockly.longPid_), Blockly.longPid_ = 0)
};
Blockly.copy_ = function(a) {
    var b = Blockly.Xml.blockToDom_(a);
    2 != Blockly.dragMode_ && Blockly.Xml.deleteNext(b);
    var c = a.getRelativeToSurfaceXY();
    b.setAttribute("x", a.RTL ? -c.x : c.x);
    b.setAttribute("y", c.y);
    Blockly.clipboardXml_ = b;
    Blockly.clipboardSource_ = a.workspace
};
Blockly.duplicate_ = function(a) {
    var b = Blockly.clipboardXml_,
        c = Blockly.clipboardSource_;
    Blockly.copy_(a);
    a.workspace.paste(Blockly.clipboardXml_);
    Blockly.clipboardXml_ = b;
    Blockly.clipboardSource_ = c
};
Blockly.onContextMenu_ = function(a) {
    Blockly.isTargetInput_(a) || a.preventDefault()
};
Blockly.hideChaff = function(a) {
    Blockly.Tooltip.hide();
    Blockly.WidgetDiv.hide();
    a || (a = Blockly.getMainWorkspace(), a.toolbox_ && a.toolbox_.flyout_ && a.toolbox_.flyout_.autoClose && a.toolbox_.clearSelection())
};
Blockly.getMainWorkspaceMetrics_ = function() {
    var a = Blockly.svgSize(this.getParentSvg());
    this.toolbox_ && (a.width -= this.toolbox_.width);
    var b = Blockly.Flyout.prototype.CORNER_RADIUS - 1,
        c = a.width - b,
        d = a.height - b;
    try {
        var e = this.getCanvas().getBBox()
    } catch (l) {
        return null
    }
    var f = e.width * this.scale,
        g = e.height * this.scale,
        h = e.x * this.scale,
        k = e.y * this.scale;
    this.scrollbar ? (b = Math.min(h - c / 2, h + f - c), c = Math.max(h + f + c / 2, h + c), f = Math.min(k - d / 2, k + g - d), e = Math.max(k + g + d / 2, k + d)) : (b = e.x, c = b + e.width, f = e.y, e = f + e.height);
    d = 0;
    !this.RTL &&
        this.toolbox_ && (d = this.toolbox_.width);
    return {
        viewHeight: a.height,
        viewWidth: a.width,
        contentHeight: e - f,
        contentWidth: c - b,
        viewTop: -this.scrollY,
        viewLeft: -this.scrollX,
        contentTop: f,
        contentLeft: b,
        absoluteTop: 0,
        absoluteLeft: d
    }
};
Blockly.setMainWorkspaceMetrics_ = function(a) {
    if (!this.scrollbar) throw "Attempt to set main workspace scroll without scrollbars.";
    var b = this.getMetrics();
    goog.isNumber(a.x) && (this.scrollX = -b.contentWidth * a.x - b.contentLeft);
    goog.isNumber(a.y) && (this.scrollY = -b.contentHeight * a.y - b.contentTop);
    a = this.scrollX + b.absoluteLeft;
    b = this.scrollY + b.absoluteTop;
    this.translate(a, b);
    this.options.gridPattern && (this.options.gridPattern.setAttribute("x", a), this.options.gridPattern.setAttribute("y", b), goog.userAgent.IE &&
        this.updateGridPattern_())
};
Blockly.addChangeListener = function(a) {
    console.warn("Deprecated call to Blockly.addChangeListener, use workspace.addChangeListener instead.");
    return Blockly.getMainWorkspace().addChangeListener(a)
};
Blockly.getMainWorkspace = function() {
    return Blockly.mainWorkspace
};
goog.global.Blockly || (goog.global.Blockly = {});
goog.global.Blockly.getMainWorkspace = Blockly.getMainWorkspace;
goog.global.Blockly.addChangeListener = Blockly.addChangeListener;
