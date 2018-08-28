
var randomList = [];
let w, h;
const list_len = 25; // there are actually 26 samples....
const start_len = 30;
const end_len = 30;
let max;
const colors = ["#9b59b6", "#3498db", "#95a5a6", "#e74c3c", "#34495e", "#2ecc71", '#001f3f', '#85144b', '#AAAAAA', '#F012BE', '#0074D9'];
let count_arr = [];
let ivl2;


function setup() {
  w = innerWidth;
  h = innerHeight;
  btn = createButton('Start sorting');
  btn.mousePressed(handleCount); // end mousePressed

  // Generate random list:
  let i=0;
  while (i < list_len) {
    randomList.push(Math.floor(Math.random() * 10));
    i++;
  }

  const ivl = (w - start_len - end_len) / (list_len - 1); // ok cool, adding the minus 1 fixed this
  makeRow(list_len, randomList, ivl, 100);

  max = Math.max(...randomList); // nice -- will be same as length
  ivl2 = (w - start_len - end_len) / max;
  makeRow(max + 1, makeArray(max + 1), ivl2, 200);
}


function makeArray(len) {
  res = [];
  for (let i=0; i < len; i++) {
    res.push(i);
  }
  return res;
}


function makeRow(len, list, ivl, y) {
  for (let i=0; i< len; i++) {
    const p = createP(list[i]);
    p.position(start_len + i * ivl, y);
  }
}


function handleCount() {
  countList = new Array(max + 1).fill(0); // nice

  randomList.forEach(n => {
    countList[n] ++;
  });

  // Draw counts of each value (Layer 3):
  makeRow(max + 1, countList, ivl2, 250);

  count_arr=[]; // clear it out before populating

  // Draw modified value (Layer 4):
  for (let i=0; i <= max; i++) {
    let val = i === 0 ? countList[i] : countList.slice(0, i + 1).reduce((t, x) => t + x, 0);
    let p = createP(val);
    count_arr.push(val);

    p.style('color', 'green');
    p.position(start_len + i * (w - start_len - end_len) / max, 300);
  }

  // Stealing this code from above:
  const ivl = (w - start_len - end_len) / (list_len); // ok cool, adding the minus 1 fixed this -- Now i'm thinking we want to revert back
  const canv_height = 80;
  canv = createCanvas(w, canv_height);
  canv.position(0, 450); // where to put the canvas
  background(51);

  let color_count = 0;

  // Draw Layer 5: the result array of boxes:
  for (let i=0; i <= list_len; i++) {
    console.log('what up ', i);

    if (i === 0) fill('darkgray');
    else {
      fill(colors[color_count]);
      if (count_arr.includes(i)) color_count ++;
      rect(start_len / 4 + i * ivl, 0, ivl, canv_height); // well the /4 looks good, but doesn't make a ton of sense to me

    }


  }
} // end handleCount











// fine
