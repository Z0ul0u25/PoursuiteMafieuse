define(["require", "exports", "./Ricardo"], function (require, exports, Ricardo_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Ruelle = void 0;
    var Ruelle = /** @class */ (function () {
        function Ruelle(refScene) {
            this.refScene = null;
            this.ricardo = null;
            this.refScene = refScene;
            this.debuter();
        }
        Ruelle.prototype.debuter = function () {
            this.ricardo = new Ricardo_1.Ricardo(this.refScene, window.lib.properties.width / 2, window.lib.properties.height - 60);
        };
        return Ruelle;
    }());
    exports.Ruelle = Ruelle;
});
//# sourceMappingURL=Ruelle.js.map