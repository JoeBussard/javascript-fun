
class rgbPartyEffect {

  constructor(elementID, start_color=0, end_color=2, speed=20) {
    this.elementID = elementID;
    this.start_color = start_color;
    this.end_color = end_color;
    this.speed = speed;
    this.colorArray[start_color] = 255;
  }

  let increasing = 0;
  let decreasing = 0;
  let colorArray = [0, 0, 0]
  let activeNow = 0;
  let start_color = 0;
  let end_color = 2;
  let elementID;
  let speed;
   
  function cycleRGB() {
    if (colorArray[decreasing] * colorArray[increasing] < 0) {
      decreasing = increasing;
      if (increasing == end_color) {
        increasing = start_color;
      }
      else increasing ++;
    }
    colorArray[increasing] -= 1
    colorArray[decreasing] += 1
    elementID.style.backgroundColor = 'rgb(' + colorArray.join(',') + ')';
  }
  
  function toggleActive() {
    partyActive = 1 - partyActive
    console.log(elementID, partyActive)
    if (partyActive > 0) {
      partyInterval = setInterval(cycleRGB(), speed)
    }
    else {
      elementID.style.backgroundColor = 'black'
      clearInterval(partyInterval)
    }
  }
}
    


