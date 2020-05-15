function main() {

  var text = [
    'Ala ma kota',
    'Kot i Ala',
    'Mama i Celina',
    'Babcia',
    'Dziadek i Babcia',
    'Ola i Ala'
  ];

  var pageWidth = 840;
  var pageHeight = 1188;
  var lineHeight = 30;
  var lineColor = '#efefef';
  var textColor = '#c8c8c8';
  var textFont = '75px ElementarzDwa';
  var fileName = '../text.txt'

  var c = document.getElementById("myBoard");
  c.width = pageWidth;
  c.height = pageHeight;

  drawLines(c, lineHeight, lineColor);

  var textVerticalPosition = 0;
  for (var i = 0; i < text.length; i++) {
    textVerticalPosition = lineHeight * 4 * (i + 1) - lineHeight;
    printText(c, text[i], textVerticalPosition, textColor, textFont);
  }
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

function printText(c, text, position, color, font) {
  pageHeight = c.height;
  pageWidth = c.width;
  var ctx = c.getContext("2d");
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(text, 10, position);
}
