var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./ObjetVisible"], function (require, exports, ObjetVisible_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Menu = void 0;
    var Menu = /** @class */ (function (_super) {
        __extends(Menu, _super);
        function Menu(refScene) {
            return _super.call(this, refScene, 0, 0) || this;
        }
        Menu.prototype.dessiner = function () {
            window.lib.ClipMenu.call(this);
            this.frameBounds = window.lib.ClipMenu.prototype.frameBounds;
        };
        Menu.prototype.pageSuivante = function () {
            this.gotoAndStop(1);
        };
        Menu.prototype.detruire = function () {
            _super.prototype.detruire.call(this);
        };
        return Menu;
    }(ObjetVisible_1.ObjetVisible));
    exports.Menu = Menu;
});
//# sourceMappingURL=Menu.js.map