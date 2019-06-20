"use strict";

var __values = undefined && undefined.__values || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator],
        i = 0;
    if (m) return m.call(o);
    return {
        next: function next() {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("stream");
var _a = require('fs-monkey/lib/util/lists'),
    fsAsyncMethods = _a.fsAsyncMethods,
    fsSyncMethods = _a.fsSyncMethods;
var SPECIAL_METHODS = new Set(["existsSync", "readdir", "readdirSync", "createReadStream", "createWriteStream", "watch", "watchFile", "unwatchFile"]);
var createFSProxy = function createFSProxy(watchers) {
    return new Proxy({}, {
        get: function get(_obj, property) {
            var e_1, _a;
            var funcCallers = [];
            var prop;
            try {
                for (var watchers_1 = __values(watchers), watchers_1_1 = watchers_1.next(); !watchers_1_1.done; watchers_1_1 = watchers_1.next()) {
                    var watcher = watchers_1_1.value;
                    prop = watcher[property];

                    if (typeof prop === "function") {
                        funcCallers.push([watcher, prop]);
                    }
                }
            } catch (e_1_1) {
                e_1 = { error: e_1_1 };
            } finally {
                try {
                    if (watchers_1_1 && !watchers_1_1.done && (_a = watchers_1.return)) _a.call(watchers_1);
                } finally {
                    if (e_1) throw e_1.error;
                }
            }
            if (funcCallers.length) {
                return function () {
                    var e_2, _a;
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    try {
                        for (var funcCallers_1 = __values(funcCallers), funcCallers_1_1 = funcCallers_1.next(); !funcCallers_1_1.done; funcCallers_1_1 = funcCallers_1.next()) {
                            var _b = __read(funcCallers_1_1.value, 2),
                                watcher = _b[0],
                                func = _b[1];
                            func.apply(watcher, args);
                        }
                    } catch (e_2_1) {
                        e_2 = { error: e_2_1 };
                    } finally {
                        try {
                            if (funcCallers_1_1 && !funcCallers_1_1.done && (_a = funcCallers_1.return)) _a.call(funcCallers_1);
                        } finally {
                            if (e_2) throw e_2.error;
                        }
                    }
                };
            } else {
                return prop;
            }
        }
    });
};

var Union = function () {
    function Union() {
        var e_3, _a, e_4, _b, e_5, _c;
        var _this = this;
        this.fss = [];
        this.ReadStream = stream_1.Readable;
        this.WriteStream = stream_1.Writable;
        this.unwatchFile = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            throw new Error("unwatchFile is not supported, please use watchFile");
        };
        this.watch = function () {
            var e_6, _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var watchers = [];
            try {
                for (var _b = __values(_this.fss), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var fs = _c.value;
                    try {
                        var watcher = fs.watch.apply(fs, args);
                        watchers.push(watcher);
                    } catch (e) {}
                }
            } catch (e_6_1) {
                e_6 = { error: e_6_1 };
            } finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                } finally {
                    if (e_6) throw e_6.error;
                }
            }

            return createFSProxy(watchers);
        };
        this.watchFile = function () {
            var e_7, _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var watchers = [];
            try {
                for (var _b = __values(_this.fss), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var fs = _c.value;
                    try {
                        var watcher = fs.watchFile.apply(fs, args);
                        watchers.push(watcher);
                    } catch (e) {}
                }
            } catch (e_7_1) {
                e_7 = { error: e_7_1 };
            } finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                } finally {
                    if (e_7) throw e_7.error;
                }
            }

            return createFSProxy(watchers);
        };
        this.existsSync = function (path) {
            var e_8, _a;
            try {
                for (var _b = __values(_this.fss), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var fs = _c.value;
                    try {
                        if (fs.existsSync(path)) {
                            return true;
                        }
                    } catch (e) {}
                }
            } catch (e_8_1) {
                e_8 = { error: e_8_1 };
            } finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                } finally {
                    if (e_8) throw e_8.error;
                }
            }
            return false;
        };
        this.readdir = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var lastarg = args.length - 1;
            var cb = args[lastarg];
            if (typeof cb !== 'function') {
                cb = null;
                lastarg++;
            }
            var lastError = null;
            var result = null;
            var iterate = function iterate(i, error) {
                if (i === void 0) {
                    i = 0;
                }
                if (error) {
                    error.prev = lastError;
                    lastError = error;
                }

                if (i >= _this.fss.length) {
                    if (cb) {
                        cb(error || Error('No file systems attached.'));
                    }
                    ;
                    return;
                }

                args[lastarg] = function (err, resArg) {
                    var e_9, _a;
                    if (err) {
                        return iterate(i + 1, err);
                    }
                    if (resArg) {
                        result = result !== null ? result : new Set();
                        try {
                            for (var resArg_1 = __values(resArg), resArg_1_1 = resArg_1.next(); !resArg_1_1.done; resArg_1_1 = resArg_1.next()) {
                                var res = resArg_1_1.value;
                                result.add(String(res));
                            }
                        } catch (e_9_1) {
                            e_9 = { error: e_9_1 };
                        } finally {
                            try {
                                if (resArg_1_1 && !resArg_1_1.done && (_a = resArg_1.return)) _a.call(resArg_1);
                            } finally {
                                if (e_9) throw e_9.error;
                            }
                        }
                    }
                    if (i === _this.fss.length - 1) {
                        return cb(null, Array.from(result).sort());
                    } else {
                        return iterate(i + 1, error);
                    }
                };
                var j = _this.fss.length - i - 1;
                var fs = _this.fss[j];
                var func = fs.readdir;
                if (!func) iterate(i + 1, Error('Method not supported: readdir'));else func.apply(fs, args);
            };
            iterate();
        };
        this.readdirSync = function () {
            var e_10, _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var lastError = null;
            var result = new Set();
            for (var i = _this.fss.length - 1; i >= 0; i--) {
                var fs = _this.fss[i];
                try {
                    if (!fs.readdirSync) throw Error("Method not supported: \"readdirSync\" with args \"" + args + "\"");
                    try {
                        for (var _b = (e_10 = void 0, __values(fs.readdirSync.apply(fs, args))), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var res = _c.value;

                            result.add(String(res));
                        }
                    } catch (e_10_1) {
                        e_10 = { error: e_10_1 };
                    } finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        } finally {
                            if (e_10) throw e_10.error;
                        }
                    }
                } catch (err) {
                    err.prev = lastError;
                    lastError = err;
                    if (!i) {
                        throw err;
                    } else {}
                }
            }
            return Array.from(result).sort();
        };
        this.createReadStream = function (path) {
            var e_11, _a;
            var lastError = null;
            try {
                for (var _b = __values(_this.fss), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var fs = _c.value;
                    try {
                        if (!fs.createReadStream) throw Error("Method not supported: \"createReadStream\"");
                        if (fs.existsSync && !fs.existsSync(path)) {
                            throw new Error("file \"" + path + "\" does not exists");
                        }
                        var stream = fs.createReadStream(path);
                        if (!stream) {
                            throw new Error("no valid stream");
                        }
                        _this.ReadStream = fs.ReadStream;
                        return stream;
                    } catch (err) {
                        lastError = err;
                    }
                }
            } catch (e_11_1) {
                e_11 = { error: e_11_1 };
            } finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                } finally {
                    if (e_11) throw e_11.error;
                }
            }
            throw lastError;
        };
        this.createWriteStream = function (path) {
            var e_12, _a;
            var lastError = null;
            try {
                for (var _b = __values(_this.fss), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var fs = _c.value;
                    try {
                        if (!fs.createWriteStream) throw Error("Method not supported: \"createWriteStream\"");
                        fs.statSync(path);
                        var stream = fs.createWriteStream(path);
                        if (!stream) {
                            throw new Error("no valid stream");
                        }
                        _this.WriteStream = fs.WriteStream;
                        return stream;
                    } catch (err) {
                        lastError = err;
                    }
                }
            } catch (e_12_1) {
                e_12 = { error: e_12_1 };
            } finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                } finally {
                    if (e_12) throw e_12.error;
                }
            }
            throw lastError;
        };
        var _loop_1 = function _loop_1(method) {
            if (!SPECIAL_METHODS.has(method)) {
                this_1[method] = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return _this.syncMethod(method, args);
                };
            }
        };
        var this_1 = this;
        try {
            for (var fsSyncMethods_1 = __values(fsSyncMethods), fsSyncMethods_1_1 = fsSyncMethods_1.next(); !fsSyncMethods_1_1.done; fsSyncMethods_1_1 = fsSyncMethods_1.next()) {
                var method = fsSyncMethods_1_1.value;
                _loop_1(method);
            }
        } catch (e_3_1) {
            e_3 = { error: e_3_1 };
        } finally {
            try {
                if (fsSyncMethods_1_1 && !fsSyncMethods_1_1.done && (_a = fsSyncMethods_1.return)) _a.call(fsSyncMethods_1);
            } finally {
                if (e_3) throw e_3.error;
            }
        }
        var _loop_2 = function _loop_2(method) {
            if (!SPECIAL_METHODS.has(method)) {
                this_2[method] = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return _this.asyncMethod(method, args);
                };
            }
        };
        var this_2 = this;
        try {
            for (var fsAsyncMethods_1 = __values(fsAsyncMethods), fsAsyncMethods_1_1 = fsAsyncMethods_1.next(); !fsAsyncMethods_1_1.done; fsAsyncMethods_1_1 = fsAsyncMethods_1.next()) {
                var method = fsAsyncMethods_1_1.value;
                _loop_2(method);
            }
        } catch (e_4_1) {
            e_4 = { error: e_4_1 };
        } finally {
            try {
                if (fsAsyncMethods_1_1 && !fsAsyncMethods_1_1.done && (_b = fsAsyncMethods_1.return)) _b.call(fsAsyncMethods_1);
            } finally {
                if (e_4) throw e_4.error;
            }
        }
        try {
            for (var _d = __values(SPECIAL_METHODS.values()), _e = _d.next(); !_e.done; _e = _d.next()) {
                var method = _e.value;

                this[method] = this[method].bind(this);
            }
        } catch (e_5_1) {
            e_5 = { error: e_5_1 };
        } finally {
            try {
                if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
            } finally {
                if (e_5) throw e_5.error;
            }
        }
    }

    Union.prototype.use = function (fs) {
        this.fss.push(fs);
        return this;
    };
    Union.prototype.syncMethod = function (method, args) {
        var lastError = null;
        for (var i = this.fss.length - 1; i >= 0; i--) {
            var fs = this.fss[i];
            try {
                if (!fs[method]) throw Error("Method not supported: \"" + method + "\" with args \"" + args + "\"");
                return fs[method].apply(fs, args);
            } catch (err) {
                err.prev = lastError;
                lastError = err;
                if (!i) {
                    throw err;
                } else {}
            }
        }
    };
    Union.prototype.asyncMethod = function (method, args) {
        var _this = this;
        var lastarg = args.length - 1;
        var cb = args[lastarg];
        if (typeof cb !== 'function') {
            cb = null;
            lastarg++;
        }
        var lastError = null;
        var iterate = function iterate(i, err) {
            if (i === void 0) {
                i = 0;
            }
            if (err) {
                err.prev = lastError;
                lastError = err;
            }

            if (i >= _this.fss.length) {
                if (cb) cb(err || Error('No file systems attached.'));
                return;
            }

            args[lastarg] = function (err) {
                if (err) return iterate(i + 1, err);
                if (cb) cb.apply(cb, arguments);
            };
            var j = _this.fss.length - i - 1;
            var fs = _this.fss[j];
            var func = fs[method];
            if (!func) iterate(i + 1, Error('Method not supported: ' + method));else func.apply(fs, args);
        };
        iterate();
    };
    return Union;
}();
exports.Union = Union;