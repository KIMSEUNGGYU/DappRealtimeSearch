/* 
p 라는 프로미스 객체는 fulfilled 되는 시점에 p.then 안에 설정한 callback 함수가 실행됨
*/

const p = new Promise((resolve, reject) => {
  // pending 상태
  setTimeout(() => {
    resolve(); // fulfilled 상태로 전환됨
  }, 3000);
});

// p.then(/* callback */);
p.then(() => {
  console.log("1000 ms 후에 수행됨");
});

/*
p.then 은 resolve 가 불린 fulfilled 상태로 넘어가면 그때 then 으로 넘어가서 
then 안 함수가 수행됨

따라서 then 안에 함수는 resolve 가 된 후에 수행됨
*/
