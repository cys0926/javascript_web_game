// function animate() {
//   console.log("animate");
//   requestAnimationFrame(animate);
// }
//
// console.log("start");
// for (let i = 0; i < 1e5; i++) {
//   setTimeout(() => console.log("timeout"), 0);
// }
// requestAnimationFrame(animate)
// // requestAnimationFrame(() => console.log("animation"));
// queueMicrotask(() => console.log("queueMicro"));
// console.log("end");

// Promise.resolve()
//   .then(function () {
//     throw "에러가 발생했다!";
//   })
//   .catch((e) => {
//     console.log(e);
//     console.log("에러에서 복구됐다.");
//   });
//
// setTimeout(() => {
//   try {
//     throw "에러가 발생했다!";
//   } catch (e) {
//     console.log(e);
//     console.log("에러에서 복구됐다.");
//   }
// }, 1000);

const messageQueue = [];

let sendMessage = (message) => {
  messageQueue.push(message);

  if (messageQueue.length === 1) {
    queueMicrotask(() => {
      const json = JSON.stringify(messageQueue);
      messageQueue.length = 0;
      console.log(json);
    });
  }
};

sendMessage("1")
sendMessage("2")
sendMessage("3")