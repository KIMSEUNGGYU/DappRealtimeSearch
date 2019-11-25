/* 
executor 함수 인자 중 하나인 reject() 함수를 실행 하면, rejected (거부) 상태가 됨
*/

new Promise((resolve, reject) => {
  // pending 상태
  // ...
  reject(); // rejected 상태
});
