// 'use strict';
// const PADDING = 100;
// const xmlns = 'http://www.w3.org/2000/svg';

// const line1 = document.querySelector('.line1');
// const line2 = document.querySelector('.line2');
// const line3 = document.querySelector('.line3');

// line1.setAttributeNS(xmlns, 'x1', PADDING + '');
// line1.setAttributeNS(xmlns, 'y1', PADDING + '');
// line1.setAttributeNS(xmlns, 'x2', 1000 - PADDING + '');
// line1.setAttributeNS(xmlns, 'y2', 1000 - PADDING + '');

// line2.setAttributeNS(xmlns, 'x1', '1000');
// line2.setAttributeNS(xmlns, 'y1', '0');
// line2.setAttributeNS(xmlns, 'x2', 500 + PADDING + '');
// line2.setAttributeNS(xmlns, 'y2', 500 - PADDING + '');

// line3.setAttributeNS(xmlns, 'x1', '0');
// line3.setAttributeNS(xmlns, 'y1', '1000');
// line3.setAttributeNS(xmlns, 'x2', 500 - PADDING + '');
// line3.setAttributeNS(xmlns, 'y2', 500 + PADDING + '');



'use strict';
const PADDING = 250;

const line1 = document.querySelector('.line1');
const line2 = document.querySelector('.line2');
const line3 = document.querySelector('.line3');

line1.setAttribute('x1', PADDING + '');
line1.setAttribute('y1', PADDING + '');
line1.setAttribute('x2', 1000 - PADDING + '');
line1.setAttribute('y2', 1000 - PADDING + '');

line2.setAttribute('x1', '1000');
line2.setAttribute('y1', '0');
line2.setAttribute('x2', 500 + PADDING + '');
line2.setAttribute('y2', 500 - PADDING + '');

line3.setAttribute  ('x1', '0');
line3.setAttribute('y1', '1000');
line3.setAttribute('x2', 500 - PADDING + '');
line3.setAttribute('y2', 500 + PADDING + '');