console.log('inicio') // 1

setTimeout(() => {
  console.log('primer') // 5
}, 2000);

setTimeout(() => {
  console.log('segundo') // 3
}, 0);

setTimeout(() => {
  console.log('tercero') // 4
}, 0);

console.log('fin') // 2
