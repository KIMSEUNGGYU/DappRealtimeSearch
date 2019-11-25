function p(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
}

// Promise.all
// (async function main() {
//   const results = await Promise.all([p(1000), p(2000), p(3000)]);
//   console.log("3000ms 후에 실행됩니다. " + results);
// })();

// Promise.race
(async function main() {
  const result = await Promise.race([p(1000), p(2000), p(3000)]);
  console.log("1000 ms 후에 실행됩니다. ", result);
})();
