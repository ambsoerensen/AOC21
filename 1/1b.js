/*
--- Part Two ---
Considering every single measurement isn't as useful as you expected: there's just too much noise in the data.

Instead, consider sums of a three-measurement sliding window. Again considering the above example:

199  A      
200  A B    
208  A B C  
210    B C D
200  E   C D
207  E F   D
240  E F G  
269    F G H
260      G H
263        H
Start by comparing the first and second three-measurement windows. The measurements in the first window are marked A (199, 200, 208); their sum is 199 + 200 + 208 = 607. The second window is marked B (200, 208, 210); its sum is 618. The sum of measurements in the second window is larger than the sum of the first, so this first comparison increased.

Your goal now is to count the number of times the sum of measurements in this sliding window increases from the previous sum. So, compare A with B, then compare B with C, then C with D, and so on. Stop when there aren't enough measurements left to create a new three-measurement sum.

In the above example, the sum of each three-measurement window is as follows:

A: 607 (N/A - no previous sum)
B: 618 (increased)
C: 618 (no change)
D: 617 (decreased)
E: 647 (increased)
F: 716 (increased)
G: 769 (increased)
H: 792 (increased)
In this example, there are 5 sums that are larger than the previous sum.
*/
fs = require("fs");
fs.readFile("./1/1a.txt", "utf8", (err, data) => {
  console.log(err);
  let measurementwindows = [[]];
  let isLargerCount = 0;

  list = data.split("\r\n");
//   list = ["199", "200", "208", "210", "200", "207", "240", "269", "260", "263"];

  //Create Measurement Windows
  for (let j = 0; j < list.length; j++) {
    const element = list[j];
    elNum = parseInt(element);

    let lastIndex = measurementwindows.length - 1;
    if (measurementwindows[lastIndex].length == 0) {
      measurementwindows[lastIndex].push(elNum);
      continue;
    }

    if (measurementwindows[lastIndex].length == 1) {
      if (lastIndex > 0) {
        measurementwindows[lastIndex - 1].push(elNum);
      }
      measurementwindows[lastIndex].push(elNum);
      measurementwindows.push([elNum]);
    }
  }

  //Sum and count
  for (let i = 1; i < measurementwindows.length; i++) {
    let listPrev = measurementwindows[i - 1];
    let listCurr = measurementwindows[i];

    let sumPrev = 0;
    let SumCurr = 0;

    listPrev.forEach((element) => {
      sumPrev = sumPrev + element;
    });

    listCurr.forEach((element) => {
      SumCurr = SumCurr + element;
    });

    if (SumCurr > sumPrev) {
      isLargerCount++;
    }
  }
  console.log(isLargerCount);
});
