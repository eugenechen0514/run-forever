import {forever, END} from '../src';
import delay from 'delay';

test('should stop by a outer variable', (done) => {
    let i = 0;
    forever(async () => {
        if(++i === 10){
            return END ;
        }
        return delay(50);
    });

    // Check
    setTimeout(() => {
        if(i === 10) {
            done();
        } else {
            done(new Error('should be 10'))
        }
    }, 1000);
}, 2000);


test('should stop by passing a value', done => {
    let lastValue = 0;

    forever(async i => {
        i++;
        lastValue = i;
        return i === 10 ? END : i;
    }, 0);

    // Check
    setTimeout(() => {
        if(lastValue === 10) {
            done();
        } else {
            done(new Error('should be 10'))
        }
    }, 1000);
}, 2000);

test('call callback when forever stop', done => {
    let lastValue = 0;

    const successCallback = (e?: Error) => {
        done(e);
    };

    forever(async i => {
        i++;
        return i === 10 ? END : i;
    }, 0, successCallback);
}, 2000);

test('rejects when returned a reject promise', done => {
    const aError =  new Error('error');

    let lastValue = 0;
    forever(async i => {
        lastValue = i;
        if(i === 10) {
            throw aError;
        }
        return i + 1;
    }, 0);

    // Check
    setTimeout(() => {
        if(lastValue === 10) {
            done();
        } else {
            done(new Error('should be 10'))
        }
    }, 1000);
}, 2000);

test('call callback when returned a reject promise', done => {
    const aError =  new Error('error');

    const failCallback = (e?: Error) => {
        if(!e) {
            done(new Error('should have an error'))
        }
        done();
    };

    let lastValue = 0;
    forever(async i => {
        lastValue = i;
        if(i === 10) {
            throw aError;
        }
        return i + 1;
    }, 0, failCallback);
}, 2000);

