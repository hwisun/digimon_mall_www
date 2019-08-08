import MonsterStore from "./MonsterStore";

export default class RootStore {
    constructor() {
        this.BASE_URL = 'http://localhost:8001';
        this.monsterStore = new MonsterStore(this);
    }
}