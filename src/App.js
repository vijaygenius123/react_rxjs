import React, {useState, useEffect} from 'react';
import './App.css';
import {concat, interval, of, Subject} from "rxjs";
import {filter, repeatWhen, scan, share, startWith, takeUntil, takeWhile} from "rxjs/operators";

const countDown$ = interval(1000)
    .pipe(
    startWith(5),
    scan(time => time - 1),
    takeWhile(time => time > 0)
)
    .pipe(share());





const action$ = new Subject();
const snooze$ = action$.pipe(filter(action => action === 'snooze'))
const dismiss$ = action$.pipe(filter(action => action === 'dismiss'))

const snoozeableAlarm$ = concat(countDown$, of("Wake Up")).pipe(
    repeatWhen(() =>  snooze$)
)

const observable$ = concat(snoozeableAlarm$.pipe(
    takeUntil(dismiss$)
), of("Completed"))


function App() {
    const [state, setState] = useState();
    useEffect(() => {
        const sub = observable$.subscribe(setState);
        return () => sub.unsubscribe();
    }, [])
    return (
        <div className="App">
            <h3>Alarm Clock</h3>
            <div className="display">{state}</div>
            <button className="snooze" onClick={() => action$.next('snooze')}>Snooze</button>
            <button className="dismiss" onClick={() => action$.next('dismiss')}>Dismiss</button>
        </div>
    );
}

export default App;
