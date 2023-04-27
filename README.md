# run-forever

Implement run forever by `setImmediate()` instead of a recursive function which may cause "memory stack overflow" 

## Install
``` bash
npm install run-forever --save
```

## Usage 

### forever(fn, previousValue, callback)

| parameter     | type                         | description                                                                            |
| ------------- | ---------------------------- | -------------------------------------------------------------------------------------- |
| fn            | (previousValue) => Promise   | Execution function. **forever()** exits if returns a promise with `END` resolved data. |
| previousValue | any                          | Initialize a previous value to pass through executions                                 |
| callback      | (err, previousValue) => void | Invoke the callback if **forever()** exists                                            |

```typescript
import {forever, END} from 'run-forever';
forever(async i => {
  i++;
  return i === 10 ? END : i;
},
  0,
  (err, previousValue) => {
    if(err) console.error(err);
    else console.log(previousValue);
  }
);
console.log('start');
```

### foreverPromise(fn, previousValue)

| parameter     | type                       | description                                                                            |
| ------------- | -------------------------- | -------------------------------------------------------------------------------------- |
| fn            | (previousValue) => Promise | Execution function. **forever()** exits if returns a promise with `END` resolved data. |
| previousValue | any                        | Initialize a previous value to pass through executions                                 |

**return**: Promise with previousValue data

```typescript
import { foreverPromise, END } from 'run-forever';

(async () => {
  console.log('start');
  const previousValue = await foreverPromise(async (count) => {
    count++;
    return count === 10 ? END : count;
  }, 0);
  console.log('forever done ' + previousValue);
})().catch(console.error);
```
