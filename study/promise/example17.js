/*
then 함수에서 다시 프로미스 객체를 리턴하는 방법을 체이닝하면, 비동기 작업을 순차적으로 아래로 표현할 수 있음.
then 에 함수를 넣는 여러 방법을 확인!!
*/

function p() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("1000ms 마다 호출 됩니다.");
      resolve();
    }, 1000);
  });
}

// p() -> pending 상태!!
// then 이 호출되면 , fulfilled 상태

// 1. 기본구조
// p()
//   .then(() => {
//     return p();
//   })
//   .then(() => {
//     return p();
//   })
//   .then(() => {
//     return p();
//   });

// 2. 축약
// p()
//   .then(() => p())
//   .then(() => p())
//   .then(() => p());

// 3. 함수로 처리
function callback() {
  return p();
}

p()
  .then(callback)
  .then(callback)
  .then(callback)
  .then(() => console.log("end"));
