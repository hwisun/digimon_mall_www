import React from 'react'
import Counter from './Counter';

export default class ObserverTest extends React.Component {
    constructor(props) {
        super(props)
        this.counter = new Counter();
        this.counter._observers.push(this);
    }

    increase = () => {
        this.counter.count++;
    }

    decrease = () => {
        this.counter.count--;
    }

    render() {
        console.log('1');
        
        return (
            <div>
                <h1>ObserverTest</h1>
                <h2>{this.counter.count}</h2>
                <button onClick={this.increase}>Increase</button>
                <button onClick={this.decrease}>Decrease</button>
            </div>
        )
    }
}