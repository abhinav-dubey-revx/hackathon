
// input.addEventListener("change", change());
console.log("file loaded");

function rgb(r,g,b) {
  return 'rgb(' + [(r||0),(g||0),(b||0)].join(',') + ')';
}
function changeColour(number) {
  var ele = document.getElementsByClassName("color_code");
  ele[0].style.background = rgb(145, number, 110);
}

function change() {
  var input = document.getElementById('input1');

  console.log("called", input.value);
  changeColour(input.value);
}

/**
 * logic: NewValue = (((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin
 * @param {*} min 
 * @param {*} max 
 */
function scale(min, max, value, target) {
  if(value == terget) return 127;
  var OldMax = max;
  var OldMin = min;
  if(value < target) {
    var NewMax = 127;
    var NewMin = 0;
  } if(value > target) {
    var NewMax = 255;
    var NewMin = 127;
  }
  var OldRange = (OldMax - OldMin);
  var NewRange = (NewMax - NewMin);  
  var NewValue = (((value - OldMin) * NewRange) / OldRange) + NewMin;
  return NewValue;
}