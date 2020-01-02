"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common = require("./svg.common");
var types = require("@nativescript/core/utils/types");
var http;
function ensureHttp() {
    if (!http) {
        http = require("http");
    }
}
global.moduleMerge(common, exports);
var utils;
function ensureUtils() {
    if (!utils) {
        utils = require("utils/utils");
    }
}
var fs;
function ensureFS() {
    if (!fs) {
        fs = require("file-system");
    }
}
var ImageSourceSVG = (function () {
    function ImageSourceSVG() {
    }
    ImageSourceSVG.prototype.loadFromResource = function (name) {
        this.nativeView = null;
        ensureUtils();
        var res = utils.ad.getApplicationContext().getResources();
        if (res) {
            var identifier = res.getIdentifier(name, 'drawable', utils.ad.getApplication().getPackageName());
            if (0 < identifier) {
                this.nativeView = com.caverock.androidsvg.SVG.getFromResource(res, identifier);
            }
        }
        return this.nativeView != null;
    };
    ImageSourceSVG.prototype.fromResource = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.loadFromResource(name));
        });
    };
    ImageSourceSVG.prototype.loadFromFile = function (path) {
        ensureFS();
        var fileName = types.isString(path) ? path.trim() : '';
        if (fileName.indexOf('~/') === 0) {
            fileName = fs.path.join(fs.knownFolders.currentApp().path, fileName.replace('~/', ''));
        }
        this.nativeView = com.caverock.androidsvg.SVG.getFromInputStream(new java.io.FileInputStream(new java.io.File(fileName)));
        return this.nativeView != null;
    };
    ImageSourceSVG.prototype.fromFile = function (path) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.loadFromFile(path));
        });
    };
    ImageSourceSVG.prototype.loadFromData = function (data) {
        this.nativeView = com.caverock.androidsvg.SVG.getFromString(data);
        return this.nativeView != null;
    };
    ImageSourceSVG.prototype.fromData = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.loadFromData(data));
        });
    };
    ImageSourceSVG.prototype.loadFromBase64 = function (source) {
        var bytes = android.util.Base64.decode(source, android.util.Base64.DEFAULT);
        this.nativeView = com.caverock.androidsvg.SVG.getFromString(new java.lang.String(bytes));
        return this.nativeView != null;
    };
    ImageSourceSVG.prototype.fromBase64 = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.loadFromBase64(data));
        });
    };
    ImageSourceSVG.prototype.fromUrl = function (url) {
        var _this = this;
        ensureHttp();
        var result = http.getString(url);
        return new Promise(function (resolve, reject) {
            result
                .then(function (val) {
                _this.setNativeSource(com.caverock.androidsvg.SVG.getFromString(val));
                resolve(true);
            })
                .catch(function (e) {
                reject(false);
            });
        });
    };
    ImageSourceSVG.prototype.setNativeSource = function (source) {
        this.nativeView = source;
        return source != null;
    };
    ImageSourceSVG.prototype.saveToFile = function (path) {
        return false;
    };
    ImageSourceSVG.prototype.toBase64String = function (format) {
        if (!this.nativeView) {
            return null;
        }
        return android.util.Base64.encodeToString(format, android.util.Base64.DEFAULT);
    };
    Object.defineProperty(ImageSourceSVG.prototype, "height", {
        get: function () {
            if (this.nativeView) {
                return this.nativeView.getPitcture().getHeight();
            }
            return NaN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageSourceSVG.prototype, "width", {
        get: function () {
            if (this.nativeView) {
                return this.nativeView.getPitcture().getWidth();
            }
            return NaN;
        },
        enumerable: true,
        configurable: true
    });
    return ImageSourceSVG;
}());
exports.ImageSourceSVG = ImageSourceSVG;
var SVGImage = (function (_super) {
    __extends(SVGImage, _super);
    function SVGImage() {
        return _super.call(this) || this;
    }
    SVGImage.prototype.createNativeView = function () {
        return new com.caverock.androidsvg.SVGImageView(this._context);
    };
    SVGImage.prototype._setNativeImage = function (nativeImage) {
        this.nativeView.setSVG(nativeImage.nativeView);
    };
    SVGImage.prototype[common.imageSourceProperty.setNative] = function (value) {
        var image = value;
        if (!image || !image.nativeView) {
            return;
        }
        this._setNativeImage(image);
    };
    return SVGImage;
}(common.SVGImage));
exports.SVGImage = SVGImage;
