import { foreverPromise, END } from 'run-forever';

(async () => {
  const previousValue = await foreverPromise(async (count) => {
    console.log('hi ' + count);
    count++;
    return count === 10 ? END : count;
  }, 0);
  console.log('forever done ' + previousValue);
})().catch(console.error);

console.log('start');
