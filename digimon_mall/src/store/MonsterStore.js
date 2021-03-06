import { observable, action, computed } from "mobx";
import Axios from 'axios'

export default class MonsterStore {
    @observable monsterList = [];
    @observable myMonsList = [];
    @observable monsterDatail = '';

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action
    getMonster(generId) {
        let URL = this.rootStore.BASE_URL + '/lists/';
        if (generId) {
            URL = this.rootStore.BASE_URL + '/geners/' + generId + '/mons/';
        }
        Axios.get(URL)
            .then(response => {
                this.monsterList = response.data;
            });
    }

    @action
    getMonsterDatail(monId) {
        let URL = this.rootStore.BASE_URL + '/lists/' + monId + '/';
        Axios.get(URL)
            .then(response => {
                // if (!this.monsterList) this.monsterList = [];
                this.monsterDatail = response.data;
            });
    }

    @action
    getMyMonster() {
        let URL = this.rootStore.BASE_URL + '/me/mons/';
        Axios.get(
            URL,
            {
                headers: {
                    'Authorization': this.rootStore.authStore.authToken
                }
            }
        )
            .then(response => {
                console.log(response.data);
                
                this.myMonsList = response.data;
            });
    }

    @computed
    get monsterCount() {
        return this.state.monsterList.length;
    }
}