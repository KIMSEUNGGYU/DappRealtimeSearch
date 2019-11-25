/* 
p 라는 프로미스 객체는 1000ms 후에 fulfilled 됩니다.
*/

const p = new Promise((resolve, reject) => {
  // pending 상태
  setTimeout(() => {
    resolve(); // fulfilled 상태로 전환됨
  }, 1000);
});
