import React, {useState, useEffect} from 'react';
import './App.css';
import {concat, interval, of, Subject} from "rxjs";
import {scan, startWith, takeWhile} from "rxjs/operators";

const countDown$ = interval(1000).pipe(
    startWith(5),
    scan(time => time - 1 ),
    takeWhile(time => time > 0)
)

const observable$ = concat(countDown$, of("Wake Up"));

const action$ = new Subject();

action$.subscribe(console.log)

function App() {
    const [state, setState] = useState();
    useEffect(()=> {
    const sub = observable$.subscribe(setState);
    return () => sub.unsubscribe();
    },[])
    return (
        <div className="App">
            <h3>Alarm Clock</h3>
          <div className="display">{state}</div>
            <button className="snooze" onClick={() => action$.next('snooze')}>Snooze</button>
        </div>
    );
}

export default App;
