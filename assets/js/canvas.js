let canvasDiv = document.getElementById("canvas1Div");
let canvas = document.getElementById("canvas1");
let downloadBtn = document.getElementById("downloadCnv1");

downloadBtn.addEventListener(
  "click",
  function (ev) {
    console.log("tentando baixar");
    downloadBtn.href = canvas.toDataURL();
    link.download = "imagem.png";
  },
  false
);

canvasDiv.style.height = canvasDiv.clientWidth.toString() + "px";
console.log(canvasDiv.style.width);
iniciar();

function iniciar() {
  resizeCanvas();
  // Register an event listener to call the resizeCanvas() function
  // each time the window is resized.
  window.addEventListener("resize", resizeCanvas, false);
  // Draw canvas border for the first time.
  resizeCanvas();
}

function resizeCanvas() {
  canvas.width = canvasDiv.clientWidth;
  canvas.height = canvasDiv.clientHeight;
  console.log(canvasDiv);
  // redraw();
}

// create a wrapper around native canvas element
let cnvs = new fabric.Canvas("canvas1");

// create a rectangle object
let rect = new fabric.Rect({
  left: 50,
  top: 50,
  fill: "red",
  width: 20,
  height: 20,
  angle: 45,
});

// "add" rectangle onto canvas
cnvs.add(rect);

fabric.Image.fromURL("https://via.placeholder.com/300x300", function (oImg) {
  cnvs.add(oImg);
});
