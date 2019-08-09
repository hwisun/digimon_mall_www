export default class Counter {
    constructor() {
        this._observers = [];
        this._count = 0;
    }

    addObserver(observers) {
        this._observers.push(observers);
    }

    get count() {
        console.log('get_count');
        return this._count;
    }

    set count(count) {
        console.log('set_count');
        this._count = count;
        for (let observer of this._observers) {
            observer.forceUpdate();
        }
    }
}