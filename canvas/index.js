var canvas = document.getElementById("tutorial");
var ctx = canvas.getContext("2d");

function draw() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    ctx.fillRect(25, 25, 100, 100); // 색칠된 직사각형을 그린다.
    ctx.clearRect(45, 45, 60, 60); // 직사각형 윤곽선을 그린다.
    ctx.strokeRect(50, 50, 50, 50); // 특정 부분을 지운다. 지워진 부분은 투명해진다.
  }
}

