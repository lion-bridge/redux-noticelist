console.log("start");
setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(() => {
    console.log("promise1");
  });
}, 0);
setTimeout(() => {
  console.log("timer2");
}, 0);
new Promise((resolve) => {
  console.log("promise2");
  resolve();
}).then(() => {
  console.log("promise3");
});
console.log("end");