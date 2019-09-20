# run-forever

Implement run forever by `setImmediate()` instead of a recursive function which may cause "memory stack overflow" 

## Install
``` bash
npm install run-forever --save
```

## Usage 
ES6
```javascript
import {forever, END} from 'run-forever';
forever(async i => {
    i++;
    return i === 10 ? END : i;
}, 0);
```

ES5
```javascript
const {forever, END} = require('run-forever');
forever(async i => {
    i++;
    return i === 10 ? END : i;
}, 0);
```
