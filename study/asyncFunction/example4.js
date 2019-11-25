/* 
async function 에서 return 되는 값은 
Promise.resolve 함수로 감싸서 리턴된다.
*/

// async 가 붙은 함수를 return 하면 Promise.resolve 함수로 감싸서 리턴됨
// 따라서 Promise 객체가 리턴됨
async function asyncP() {
  return "gyu";
}

(async function main() {
  try {
    // console.log(asyncP());
    const name = await asyncP();
    console.log(name);
  } catch (error) {
    console.error(error);
  }
})();
