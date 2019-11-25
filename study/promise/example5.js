/* 
executor 함수 인자 중 하나인 resolve() 함수를 실행 하면, fulfilled (이행) 상태가 됨
*/

new Promise((resolve, reject) => {
  // pending 상태
  // ...
  resolve(); // fulfilled 상태
});
