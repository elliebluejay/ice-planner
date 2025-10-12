const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

(async function(){
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });

  // Wait until the DOM is fully loaded
  await new Promise((res) => {
    dom.window.document.addEventListener('DOMContentLoaded', res);
    // fallback
    setTimeout(res, 500);
  });

  // Try to import the component module into the JSDOM window
  try {
    const scriptPath = path.resolve(__dirname, '../ice-planner.js');
    const moduleScript = fs.readFileSync(scriptPath, 'utf8');
    const scriptEl = dom.window.document.createElement('script');
    scriptEl.textContent = moduleScript;
    dom.window.document.body.appendChild(scriptEl);
  } catch (e) {
    console.error('component load error', e);
    process.exit(2);
  }

  // find first plus button and its sibling input
  const plus = dom.window.document.querySelector('.plus');
  const input = plus && plus.parentElement.querySelector('input');
  if (!plus || !input) {
    console.error('plus or input not found');
    process.exit(2);
  }

  const before = input.value;
  plus.click();
  const after = input.value;
  console.log('before -> after:', before, '->', after);

  if (Number(after) === Number(before) + 1) {
    console.log('OK: increment works');
    process.exit(0);
  } else {
    console.error('FAIL: increment did not change as expected');
    process.exit(3);
  }
})();