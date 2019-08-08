import { observable, action, computed } from "mobx";
import Axios from 'axios'

export default class MonsterStore {
    @observable generId = null;
    @observable monsterList = [];

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action
    getMonster() {
        let URL = this.rootStore.BASE_URL + '/lists/';
        if (this.generId) {
            URL = this.rootStore.BASE_URL + '/geners/' + this.generId + '/mons/' ;
        }
        Axios.get(URL)
            .then(response => {
                if (this.generId) {
                    for (const data of response.data) {
                        data.monster.image = this.rootStore.BASE_URL + data.monster.image
                    }
                }
                this.monsterList = response.data;
            });
    }

    @computed
    get monsterCount() {
        return this.state.monsterList.length;
    }
}