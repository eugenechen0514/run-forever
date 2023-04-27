import { forever, END } from 'run-forever';

forever<number>(
  async (count) => {
    console.log('hi ' + count);
    count++;
    return count === 10 ? END : count;
  },
  0,
  (e, previousValue) => {
    if (e) {
      console.error(e);
    } else {
      console.log('forever done ' + previousValue);
    }
  },
);

console.log('start');
