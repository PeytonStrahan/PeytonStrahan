// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilter(reddify); //Applies red filter to whole image.
  applyFilterNoBackground(decreaseBlue); //Applies blue filter to image but not background.
  smudge(increaseGreenByBlue); //Applies green filter to whole image and smudges image to the left.

  

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction){ //This function applies a color as a regular filter to the whole image.
  for(var i = 0; i < image.length; i++){
    var row = image[i];
    for(var n = 0; n < row.length; n++){
      var rgbString = row[n];
      var rgbNumbers = rgbStringToArray(rgbString);
      filterFunction(rgbNumbers);
      rgbString = rgbArrayToString(rgbNumbers);
      row[n] = rgbString;
    }
  }
}

// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction){ //This filter applies a color as a filter to the image excluding the background.
  var referencePixel = rgbStringToArray(image[0][0]);
  for(var i = 0; i < image.length; i++){
    var row = image[i];
    for(var n = 0; n < row.length; n++){
      var rgbString = row[n];
      var rgbNumbers = rgbStringToArray(rgbString);
      if(rgbNumbers ==! referencePixel){
        filterFunction(rgbNumbers);
        rgbString = rgbArrayToString(rgbNumbers);
        row[n] = rgbString;
      }
    }
  }
}

// TODO 5: Create the keepInBounds function
function keepInBounds(num){ //This function prevents any of the RGB values from going over its maximum oossible value or under its minimum possible value.

  var initialNum = Math.max(num, 0);
  var finalNum = Math.min(initialNum, 255);
  return finalNum;
}

// TODO 3: Create reddify function
function reddify(arr){ //This function makes the applied filter red.
  var newRed = arr[RED] + 200;
  arr[RED] = keepInBounds(newRed);
}

// TODO 6: Create more filter functions
function decreaseBlue(arr){ //This function makes the applied filter blue.
  var newBlue = arr[BLUE] -50;
  arr[BLUE] = keepInBounds(newBlue);
}

function increaseGreenByBlue(arr){
  var newGreen = arr[GREEN] + arr[BLUE]; //This function makes the applies filter green.
  arr[GREEN] = keepInBounds(newGreen);
}

// CHALLENGE code goes below here
function smudge(filterFunction){ //This filter applies a color as a filter to the image while taking one third of the RGB values of each pixel located to the right of all of the pixels in the image and adding said RGB values to the pixels that each pixel was to the right of. (This function applies a color as a filter to the whole image and makes the image look like it was smudged to the left.)
  for(var i = 0; i < image.length; i++){
    var row = image[i];
    for(var n = 0; n < row.length; n++){
      var rgbString = row[n];
      var rgbStringNextPixel = row[n+1];
      var rgbNumbers = rgbStringToArray(rgbString);
      if (rgbStringNextPixel){
        var rgbNumbers2 = rgbStringToArray(rgbStringNextPixel);
        rgbNumbers[RED] = rgbNumbers[RED] + (rgbNumbers2[RED] / 3);
        rgbNumbers[BLUE] = rgbNumbers[BLUE] + (rgbNumbers2[BLUE] / 3);
        rgbNumbers[GREEN] = rgbNumbers[GREEN] + (rgbNumbers2[GREEN] / 3);
      }
      filterFunction(rgbNumbers);
      rgbString = rgbArrayToString(rgbNumbers);
      row[n] = rgbString;
    }
  }
}