function main() {

  var pageWidth = 840;
  var pageHeight = 1188;
  var lineHeight = 30;
  var lineColor = '#1fefef';
  var textColor = '#c8c8c8';
  var textFont = '75px schoolFont';
  var fileName = '../text.txt'

  var c = document.getElementById("myBoard");
  c.width = pageWidth;
  c.height = pageHeight;
  c.lineHeight = lineHeight;
  c.lineColor = lineColor;
  c.textColor = textColor;
  c.textFont = textFont;
  c.addEventListener("click", canvasClick, false);

  drawLines(c, lineHeight, lineColor);
  doText(fileName, c, lineHeight, textColor, textFont);
}

function canvasClick(event) {
  var c = event.currentTarget;
  var lineHeight = c.lineHeight;
  var lineColor = c.lineColor;
  var color = c.textColor;
  var font = c.textFont;
  var rect = c.getBoundingClientRect();
  var mouseXPos = event.clientX - rect.left;
  var mouseYPos = event.clientY - rect.top;
  var rowNumber = calculateRow(mouseYPos, lineHeight);
  var newText = promptText(rowNumber);
  updateRow(c, rowNumber, lineHeight, newText, color, font, lineColor);
}

function promptText(rowNumber) {
  var text = prompt('Enter new text for row number ' + rowNumber + ':')
  return text;
}

function updateRow(c, rowNumber, lineHeight, text, textColor, font, lineColor) {
  var position = lineHeight * 4 * rowNumber - lineHeight;
  cleanRow(c, lineHeight, rowNumber);
  drawLines(c, lineHeight, lineColor, rowNumber);
  printText(c, text, position, textColor, font);
}

function calculateRow(yPos, lineHeight) {
  var rowNumber = Math.floor(yPos / lineHeight / 4 + 1);
  return rowNumber;
}

function cleanRow(c, lineHeight, rowNumber) {
  var ctx = c.getContext("2d");
  var yStart = (rowNumber - 1) * lineHeight * 4;
  var height = lineHeight * 4;
  var xStart = 0;
  var width = c.width;
  ctx.fillStyle = '#fff';
  ctx.fillRect(xStart, yStart, width, height);
}

function drawLines(c, height, color, row = -1) {
  pageHeight = c.height;
  pageWidth = c.width;
  var ctx = c.getContext("2d");
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

function doText(fileName, c, lineHeight, color, font) {
  var promise = fetch(fileName)
    .then(response => response.text())
    .then(texts => {
      texts = texts.split('\n');
      printLines(c, texts, lineHeight, color, font);
    });
}

function printLines(c, text, lineHeight, color, font) {
  var textVerticalPosition = 0;
  for (var i = 0; i < text.length; i++) {
    textVerticalPosition = lineHeight * 4 * (i + 1) - lineHeight;
    printText(c, text[i], textVerticalPosition, color, font);
  }
}

function printText(c, text, position, color, font) {
  var leftMargin = 20;
  var ctx = c.getContext("2d");
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(text, leftMargin, position);
}
