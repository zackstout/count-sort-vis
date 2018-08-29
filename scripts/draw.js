
var randomList = [];
let w, h;
const list_len = 25;
const start_len = 30;
const end_len = 30;
let max;
const colors = ["#9b59b6", "#3498db", "#ffa500", "#e74c3c", "#008080", "#2ecc71", '#001f3f', '#85144b', '#AAAAAA', '#F012BE', '#0074D9'];
let count_arr = [];
let ivl2, ivl, ivl3; // not sure any need to be global -- maybe ivl2. I now hate this notation because v looks like version.


function setup() {
  w = innerWidth;
  h = innerHeight;
  btn = createButton('Start sorting');
  btn.mousePressed(handleCount); // end mousePressed

  // Generate random list:
  randomList = new Array(list_len).fill(0).map(x => Math.floor(Math.random() * 10));

  // LAYER 1:
  ivl = (w - start_len - end_len) / (list_len - 1); // ok cool, adding the minus 1 fixed this
  makeRow(randomList, ivl, 100, 'purple');

  // LAYER 2:
  max = Math.max(...randomList); // nice -- will be same as length
  ivl2 = (w - start_len - end_len) / ( max );
  makeRow(makeArray(max + 1), ivl2, 200, 'blue', true, true, true);
}


function makeArray(len) {
  res = [];
  for (let i=0; i < len; i++) {
    res.push(i);
  }
  return res;
}


// PROB DON't need both lena nd list, almost certainly dn't nee dfill
function makeRow(list, my_ivl, y, fill='black', colEach=false, big=false, morethanone=false) {
  for (let i=0; i< list.length; i++) {
    const p = createP(list[i]);

    // Handling color:
    if (colEach) p.style('color', colors[i]);
    else p.style('color', fill);

    // if (boxing)

    if (big) {
      p.style('fontSize', '30px');
      p.style('margin', '20px');
    }

    // a pretty hacky solution, but hey:
    var x = start_len + i * my_ivl;
    if (morethanone) x -= 30;

    p.position(x, y);
  }
}


function handleCount() {
  countList = new Array(max + 1).fill(0); // nice
  randomList.forEach( n => countList[n]++ );
  console.log(randomList, countList);

  // Draw counts of each value (Layer 3):
  makeRow(countList, ivl2, 250, 'red', true, true, true);

  count_arr=[]; // clear it out before populating

  // Draw modified value (Layer 4):
  for (let i=0; i <= max; i++) {
    let val = i === 0 ? countList[i] : countList.slice(0, i + 1).reduce((t, x) => t + x, 0);
    let p = createP(val);
    count_arr.push(val);

    p.style('color', 'green');
    p.position(start_len + i * ivl2, 300);
  }

  // Stealing this code from above:
  ivl3 = (w - start_len - end_len) / (list_len); // ok cool, adding the minus 1 fixed this -- Now i'm thinking we want to revert back
  const canv_height = 80;
  canv = createCanvas(w, canv_height);
  canv.position(0, 450); // where to put the canvas
  background(51);

  let color_count = 0;

  // Draw Layer 5: the result array of boxes:
  for (let i=0; i <= list_len; i++) {
    console.log('what up ', i, count_arr, color_count);

    if (i === 0) fill('darkgray');
    else {
      fill(colors[color_count]);

      // This is the bug: we need to find ALL the times that the count array assumes this value.
      // We need to add two instead of one, e.g., to skip the color of the number that is not represented.
      // Remember, this is now the modified count array:
      // if (count_arr.includes(i)) color_count ++;

      // So this worked, but i think there's still a bug if there are no 0s!

      const amt_of_xs = count_arr.filter(n => n === i).length;
      color_count += amt_of_xs;
      rect(start_len / 4 + i * ivl3, 0, ivl3, canv_height); // well the /4 looks good, but doesn't make a ton of sense to me
    }
  }
} // end handleCount





function movePtoB() {
  // if p not beyond b:


  // if p beyond b, return false (i.e. DON'T keep calling)
}

function animate() {


}





// fine
