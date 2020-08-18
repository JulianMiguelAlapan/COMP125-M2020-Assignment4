var UIObjects;
(function (UIObjects) {
    class Button extends createjs.Bitmap {
        // CONSTRUCTOR(S)
        constructor(bitmap_asset, x = 0, y = 0, isCentered = false) {
            super(Config.Globals.AssestManifest.getResult(bitmap_asset));
            this.isCentered = isCentered;
            this.x = x;
            this.y = y;
        }
        // PUBLIC PROPERTIES
        get isCentered() {
            return this.m_isCentered;
        }
        set isCentered(value) {
            if (value) {
                this.m_recalculateSize();
            }
            else {
                this.regX = 0;
                this.regY = 0;
            }
        }
        // PRIVATE METHOD(S)
        m_recalculateSize() {
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
        }
    }
    UIObjects.Button = Button;
})(UIObjects || (UIObjects = {}));
//# sourceMappingURL=button.js.map