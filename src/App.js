import React, {useState, useEffect} from 'react';
import './App.css';
import {interval} from "rxjs";

const observable$ = interval(1000)

function App() {
    const [state, setState] = useState();
    useEffect(()=> {
    observable$.subscribe(setState)
    },[])
    return (
        <div className="App">
            <h3>Alarm Clock</h3>
          <div className="display">{state}</div>
        </div>
    );
}

export default App;
