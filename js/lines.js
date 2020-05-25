function main() {

  var pageWidth = 840;
  var pageHeight = 1188;
  var lineHeight = 30;
  var lineColor = '#a5f5f5';
  var textColor = '#b8b8b8';
  var textFont = '75px schoolFont';
  var texts = [];

  var canvas = document.getElementById('myBoard');
  var textInput = document.getElementById('textInput');

  textInput.lineHeight = lineHeight;
  textInput.lineColor = lineColor;
  textInput.textColor = textColor;
  textInput.textFont = textFont;
  textInput.canvas = canvas;

  canvas.width = pageWidth;
  canvas.height = pageHeight;
  canvas.lineHeight = lineHeight;

  texts = initText();
  canvas.texts = texts;

  canvas.addEventListener('click', canvasClick, false);
  textInput.addEventListener('keydown', textFormKeyDown, false);

  drawLines(canvas, lineHeight, lineColor);
  printLines(canvas, texts, lineHeight, textColor, textFont);
}

function canvasClick(event) {
  var canvas = event.currentTarget;
  var lineHeight = canvas.lineHeight;
  var texts = canvas.texts;
  var rect = canvas.getBoundingClientRect();
  var mouseYPos = event.clientY - rect.top;
  var rowNumber = calculateRow(mouseYPos, lineHeight);
  var textForm = document.getElementById('textInput');
  textForm.style.top = ((rowNumber - 1) * lineHeight * 4 + lineHeight - 2).toString() + 'px';
  textForm.value = texts[rowNumber - 1];
  textForm.style.visibility = 'visible';
  textForm.focus();
}

function textFormKeyDown(event) {
  if(event.keyCode == 13) {
    var textInput = event.currentTarget;
    var lineHeight = textInput.lineHeight;
    var lineColor = textInput.lineColor;
    var color = textInput.textColor;
    var font = textInput.textFont;
    var newText = textInput.value;
    var rowNumber = (parseInt(textInput.style.top.replace('px', '')) + 2 - lineHeight) / 4 / lineHeight + 1;
    var canvas = textInput.canvas;
    canvas.texts[rowNumber - 1] = newText;
    updateRow(canvas, rowNumber, lineHeight, newText, color, font, lineColor);
    textInput.style.visibility = 'hidden';
    canvas.focus();
  }
}

function updateRow(canvas, rowNumber, lineHeight, text, textColor, font, lineColor) {
  var position = lineHeight * 4 * rowNumber - lineHeight;
  cleanRow(canvas, lineHeight, rowNumber);
  drawLines(canvas, lineHeight, lineColor, rowNumber);
  printText(canvas, text, position, textColor, font);
}

function calculateRow(yPos, lineHeight) {
  var rowNumber = Math.floor(yPos / lineHeight / 4 + 1);
  return rowNumber;
}

function cleanRow(canvas, lineHeight, rowNumber) {
  var ctx = canvas.getContext('2d');
  var yStart = (rowNumber - 1) * lineHeight * 4;
  var height = lineHeight * 4;
  var xStart = 0;
  var width = canvas.width;
  ctx.fillStyle = '#fff';
  ctx.fillRect(xStart, yStart, width, height);
}

function drawLines(canvas, height, color, row = -1) {
  pageHeight = canvas.height;
  pageWidth = canvas.width;
  var ctx = canvas.getContext('2d');
  ctx.strokeStyle = color;
  ctx.beginPath();
  var rowNumber = 0;
  for (var vertical = 0; vertical <= pageHeight; vertical += height) {
    rowNumber = Math.floor(vertical / height / 4 + 1);
    if ((row == -1 && vertical % (height * 4) != 0) || (rowNumber == row && vertical % (height * 4) != 0)) {
      ctx.moveTo(0, vertical);
      ctx.lineTo(pageWidth, vertical);
    }
  }
  ctx.closePath();
  ctx.stroke();
}

function initText() {
  var frame = document.getElementById('initText');
  var frameData = frame.contentDocument.body.textContent;
  var texts = frameData.split('\n');
  return texts;
}

function printLines(canvas, text, lineHeight, color, font) {
  var textVerticalPosition = 0;
  for (var i = 0; i < text.length; i++) {
    textVerticalPosition = lineHeight * 4 * (i + 1) - lineHeight;
    printText(canvas, text[i], textVerticalPosition, color, font);
  }
}

function printText(canvas, text, position, color, font) {
  var leftMargin = 20;
  var ctx = canvas.getContext('2d');
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(text, leftMargin, position);
}
