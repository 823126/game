addEventListener("DOMContentLoaded", function() {
  var GRID_SIZE = 64;
  var grid = [
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1]
  ];
  cameraX = 0;
  cameraY = 0;
  var canvas = document.getElementsByTagName("canvas")[0];
  var context = canvas.getContext("2d");
  var timeFunction = window.requestAnimationFrame || setTimeout;
  var width = canvas.width;
  var height = canvas.height;
  var widthLoop = ~~(width / GRID_SIZE) + 1;
  var heightLoop = ~~(height / GRID_SIZE) + 1;
  function frame() {
    context.clearRect(0, 0, width, height);
    if (arrowUp) cameraY -= 1;
    if (arrowDown) cameraY += 1;
    if (arrowLeft) cameraX -= 1;
    if (arrowRight) cameraX += 1;
    if (cameraY < 0) cameraY = 0;
    if (cameraX < 0) cameraX = 0;
    for (var i = 0; i < heightLoop; i += 1) {
      var row = grid[i + ~~(cameraY / GRID_SIZE)];
      if (row === undefined) break;
      for (var j = 0; j < widthLoop; j += 1) {
        var tile = row[j + ~~(cameraX / GRID_SIZE)];
        if (tile === undefined) break;
        context.fillStyle = tile ? "#f00" : "#00f";
        context.fillRect(
          (j + ~~(cameraX / GRID_SIZE)) * GRID_SIZE - cameraX,
          (i + ~~(cameraY / GRID_SIZE)) * GRID_SIZE - cameraY,
          GRID_SIZE,
          GRID_SIZE
        )
      }
    }
    timeFunction(frame);
  }
  frame();
  var arrowUp = false;
  var arrowLeft = false;
  var arrowDown = false;
  var arrowRight = false;
  addEventListener("keydown", function(event) {
    var keyCode = event.keyCode
    switch (keyCode) {
      case 37:
        arrowLeft = true;
        break;
      case 38:
        arrowUp = true;
        break;
      case 39:
        arrowRight = true;
        break;
      case 40:
        arrowDown = true;
    }
  });
  addEventListener("keyup", function(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
      case 37:
        arrowLeft = false;
        break;
      case 38:
        arrowUp = false;
        break;
      case 39:
        arrowRight = false;
        break;
      case 40:
        arrowDown = false;
    }
  });
})