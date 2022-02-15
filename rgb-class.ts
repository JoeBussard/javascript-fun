
class rgbPartyEffect {

    increasing: number; // 0|1|2 && which color (r,g,b) is getting brighter
    decreasing: number; // 0|1|2 && which color (r,g,b) is getting dimmer
    colorArray: [number]; // the values (0..255, 0..255, 0..255) for each color
    activeNow: number; // 0|1 && whether this element is actively RGB partying
    start_color: number; // 0|1|2 && which color starts bright
    end_color: number; // 0|1|2 && which color is the last one (?)
    elementId: HTMLElement; // the ID of the element that will be partying
    speed: number; // speed for setInterval
    intervalId: number;
    backgroundReset: string;

  constructor(elementId:string, backgroundReset:string='black', isActive:number=0, start_color:number =0, end_color:number =1, speed:number =20) {
    this.elementId = document.getElementById(elementId);
    this.start_color = start_color;
    this.end_color = end_color;
    this.speed = speed;
    this.colorArray = [0,0,0];
    this.colorArray[start_color] = 255;
    this.activeNow = isActive
    this.backgroundReset = backgroundReset;
    this.increasing = end_color; // increasing is the ID (0,1,2) of the color that is becoming dominant.
    this.decreasing = start_color // decreasing is the ID (0,1,2) of the color that was dominant and is fading out.
  }

   
cycleRGB() {
    if (this.colorArray[this.decreasing] * this.colorArray[this.increasing] < 0) {
      this.decreasing = this.increasing;
      if (this.increasing == this.end_color) {
        this.increasing = this.start_color;
      }
      else this.increasing ++;
    }
    this.colorArray[this.increasing] -= 1
    this.colorArray[this.decreasing] += 1
    this.elementId.style.backgroundColor = 'rgb(' + this.colorArray.join(',') + ')';
  }
  
toggleActive() {
    this.activeNow = 1 - this.activeNow
    console.log("RGBParty: ", this.elementId, ": ", this.activeNow)
    if (this.activeNow > 0) {
      this.intervalId = setInterval(this.cycleRGB, this.speed)
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