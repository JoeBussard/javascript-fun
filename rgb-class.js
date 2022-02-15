var rgbPartyEffect = /** @class */ (function () {
    function rgbPartyEffect(elementId, backgroundReset, isActive, start_color, end_color, speed) {
        if (backgroundReset === void 0) { backgroundReset = 'black'; }
        if (isActive === void 0) { isActive = 0; }
        if (start_color === void 0) { start_color = 0; }
        if (end_color === void 0) { end_color = 1; }
        if (speed === void 0) { speed = 20; }
        this.elementId = document.getElementById(elementId);
        this.start_color = start_color;
        this.end_color = end_color;
        this.speed = speed;
        this.colorArray = new Array(3);
        this.colorArray[start_color] = 255;
        this.activeNow = isActive;
        this.backgroundReset = backgroundReset;
        this.increasing = end_color; // increasing is the ID (0,1,2) of the color that is becoming dominant.
        this.decreasing = start_color; // decreasing is the ID (0,1,2) of the color that was dominant and is fading out.
    }
    rgbPartyEffect.prototype.cycleRGB = function () {
        if (this.colorArray[this.decreasing] * this.colorArray[this.increasing] < 0) {
            this.decreasing = this.increasing;
            if (this.increasing == this.end_color) {
                this.increasing = this.start_color;
            }
            else
                this.increasing++;
        }
        this.colorArray[this.increasing] -= 1;
        this.colorArray[this.decreasing] += 1;
        this.elementId.style.backgroundColor = 'rgb(' + this.colorArray.join(',') + ')';
    };
    rgbPartyEffect.prototype.toggleActive = function () {
        this.activeNow = 1 - this.activeNow;
        console.log("RGBParty: ", this.elementId, ": ", this.activeNow);
        if (this.activeNow > 0) {
            this.intervalId = setInterval(this.cycleRGB, this.speed);
        }
        else {
            this.elementId.style.backgroundColor = this.backgroundReset;
            clearInterval(this.intervalId);
        }
    };
    return rgbPartyEffect;
}());
testRGB: rgbPartyEffect;
var testRGB = new rgbPartyEffect("h1ForTesting");
testRGB.toggleActive();
