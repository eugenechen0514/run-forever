import { forever, END } from 'run-forever';

let count = 0;
forever(async () => {
  console.log('hi ' + count);
  count++;
  return count === 10 ? END : count;
});

console.log('start');
