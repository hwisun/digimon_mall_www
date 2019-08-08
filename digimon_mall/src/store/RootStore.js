import MonsterStore from "./MonsterStore";
import AuthStore from "./AuthStore";

export default class RootStore {
    constructor() {
        this.BASE_URL = 'http://localhost:8001';
        this.monsterStore = new MonsterStore(this);
        this.authStore = new AuthStore(this);
    }
}