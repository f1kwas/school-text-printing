function main() {

  var pageWidth = 840;
  var pageHeight = 1188;
  var lineHeight = 30;
  var lineColor = '#efefef';
  var textColor = '#c8c8c8';
  var textFont = '75px schoolFont';
  var fileName = '../text.txt'

  var c = document.getElementById("myBoard");
  c.width = pageWidth;
  c.height = pageHeight;

  drawLines(c, lineHeight, lineColor);
  doText(fileName, c, lineHeight, textColor, textFont);
}

function drawLines(c, height, color) {
  pageHeight = c.height;
  pageWidth = c.width;
  var ctx = c.getContext("2d");
  for (var vertical = height; vertical <= pageHeight; vertical += height) {
    ctx.strokeStyle = color;
    if (vertical % (height * 4) != 0) {
      ctx.moveTo(0, vertical);
      ctx.lineTo(pageWidth, vertical);
      ctx.stroke();
    }
  }
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
