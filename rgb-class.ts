
class rgbPartyEffect {
    i: number; // 0|1|2 && which color (r,g,b) is getting brighter
    j: number; // 0|1|2 && which color (r,g,b) is getting dimmer
    colorArray: [number, number, number]; // the values (0..255, 0..255, 0..255) for each color
    activeNow: number; // 0|1 && whether this element is actively RGB partying
    start_color: number; // 0|1|2 && which color starts bright
    end_color: number; // 0|1|2 && which color is the last one (?)
    elementId: HTMLElement; // the ID of the element that will be partying
    speed: number; // speed for setInterval
    intervalId: number;
    backgroundReset: string;

  constructor(elementId:string, speed:number=20, backgroundReset:string='black', start_color:number =0, end_color:number =1) {
    this.elementId = document.getElementById(elementId);
    if (this.elementId === null) {
      console.error("[RGBParty] Tried to make effect for undefined element", elementId);
      return
    }
    this.start_color = start_color;
    this.end_color = end_color;
    this.speed = speed;
    this.colorArray = [0,0,0];
    this.colorArray[start_color] = 255;
    this.activeNow = 0;
    this.backgroundReset = backgroundReset;
    this.i = 0 // decreasing is the ID (0,1,2) of the color that was dominant and is fading out.
    this.j = 1 // increasing is the ID (0,1,2) of the color that is becoming dominant.
    console.log("[RGBParty] constructed effect for", this.elementId.id);
 }


cycleRGB(self:rgbPartyEffect) {
    if (self.colorArray[self.i] * self.colorArray[self.j] < 0) {
      self.i = self.j;
      if (self.j == 2) {
        self.j = 0;
      }
      else self.j ++;
    }
    self.colorArray[self.i] -= 1
    self.colorArray[self.j] += 1
    self.elementId.style.backgroundColor = 'rgb(' + self.colorArray.join(',') + ')';
  }

toggleActive() {
    var self = this;
    this.activeNow = 1 - this.activeNow
    console.log("[RGBParty] ", this.elementId.id, "is", this.activeNow ? "ON" : "OFF")
    if (this.activeNow > 0) {
      this.intervalId = setInterval(this.cycleRGB, this.speed, self)
    }
    else {
      this.elementId.style.backgroundColor = this.backgroundReset;
      clearInterval(this.intervalId)
    }
  }
}

testRGB: rgbPartyEffect;
var testRGB = new rgbPartyEffect("h1ForTesting");
testRGB.toggleActive();

var test2RGB = new rgbPartyEffect("body", 5, "blue");
