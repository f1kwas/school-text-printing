function main() {

  let pageWidth = 1680;
  let pageHeight = 2376;
  let lineHeight = 30;
  let lineColor = '#a5f5f5';
  let textColor = '#b8b8b8';
  let textFont = '75px schoolFont';
  let texts = [];

  let canvas = document.getElementById('myBoard');
  let textInput = document.getElementById('textInput');

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
  let canvas = event.currentTarget;
  let lineHeight = canvas.lineHeight;
  let texts = canvas.texts;
  let rect = canvas.getBoundingClientRect();
  let mouseYPos = event.clientY - rect.top;
  let rowNumber = calculateRow(mouseYPos, lineHeight);
  let textForm = document.getElementById('textInput');
  textForm.style.top = ((rowNumber - 1) * lineHeight * 4 + lineHeight - 2).toString() + 'px';
  textForm.value = texts[rowNumber - 1];
  textForm.style.visibility = 'visible';
  textForm.focus();
}

function textFormKeyDown(event) {
  if (event.keyCode == 13) {
    let textInput = event.currentTarget;
    let lineHeight = textInput.lineHeight;
    let lineColor = textInput.lineColor;
    let color = textInput.textColor;
    let font = textInput.textFont;
    let newText = textInput.value;
    let rowNumber = (parseInt(textInput.style.top.replace('px', '')) + 2 - lineHeight) / 4 / lineHeight + 1;
    let canvas = textInput.canvas;
    canvas.texts[rowNumber - 1] = newText;
    updateRow(canvas, rowNumber, lineHeight, newText, color, font, lineColor);
    textInput.style.visibility = 'hidden';
    canvas.focus();
  }
}

function updateRow(canvas, rowNumber, lineHeight, text, textColor, font, lineColor) {
  let position = lineHeight * 4 * rowNumber - lineHeight;
  cleanRow(canvas, lineHeight, rowNumber);
  drawLines(canvas, lineHeight, lineColor, rowNumber);
  printText(canvas, text, position, textColor, font);
}

function calculateRow(yPos, lineHeight) {
  let rowNumber = Math.floor(yPos / lineHeight / 4 + 1);
  return rowNumber;
}

function cleanRow(canvas, lineHeight, rowNumber) {
  let ctx = canvas.getContext('2d');
  let yStart = (rowNumber - 1) * lineHeight * 4;
  let height = lineHeight * 4;
  let xStart = 0;
  let width = canvas.width;
  ctx.fillStyle = '#fff';
  ctx.fillRect(xStart, yStart, width, height);
}

function drawLines(canvas, height, color, row = -1) {
  pageHeight = canvas.height;
  pageWidth = canvas.width;
  let ctx = canvas.getContext('2d');
  ctx.strokeStyle = color;
  ctx.beginPath();
  let rowNumber = 0;
  for (let vertical = 0; vertical <= pageHeight; vertical += height) {
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
  let frame = document.getElementById('initText');
  let frameData = frame.contentDocument.body.textContent;
  let texts = frameData.split('\n');
  return texts;
}

function printLines(canvas, text, lineHeight, color, font) {
  let textVerticalPosition = 0;
  for (let i = 0; i < text.length; i++) {
    textVerticalPosition = lineHeight * 4 * (i + 1) - lineHeight;
    printText(canvas, text[i], textVerticalPosition, color, font);
  }
}

function printText(canvas, text, position, color, font) {
  let leftMargin = 20;
  let ctx = canvas.getContext('2d');
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(text, leftMargin, position);
}
