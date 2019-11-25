/*
value 가 프로미스 객체인지 아닌지 알 수 없는 경우, 사용하면 연결된 then 메소드를 실행함.
value 가 프로미스 객체면, resolve 된 then 메소드를 실행함.
value 가 프로미스 객체가아니면, value 를 인자로 보내면서 then 메소드를 실행함.
*/

Promise.resolve(/* value*/);
// value 에
// 1. promise 객체아니면
// 2. 일반 변수(value) 를 보낼 수 있음

Promise.resolve(
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("foo");
    }, 1000);
  })
).then(data => {
  console.log(
    "프로미스 객체인 경우, resolve 된 결과를 받아서 then 이 실행됩니다.",
    data
  );
});

Promise.resolve("bar").then(data => {
  console.log(
    "Promise 객체가 아닌 경우, then 메소드가 없는 경우, fulfilled 됩니다.",
    data
  );
});

// promise 객체인지 아닌지 모를 때는 "Promise.resolve" 를 실행해서 넘기면
// resolve 가 되게 하거나 값이 넘어가기 때문에 유용하게 사용할 수 있음?
