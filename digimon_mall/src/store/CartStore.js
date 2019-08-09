import { observable, action, computed } from "mobx";
import Axios from 'axios'

export default class CartStore {
    @observable cartMons = [];

    constructor(rootStore) {
        let cartMons = localStorage.getItem('cart_mons');
        if (cartMons == null || cartMons.length < 1) {
            cartMons = [];
        } else {
            cartMons = JSON.parse(cartMons);
        }
        this.cartMons = cartMons;
        this.rootStore = rootStore;
    }

    @action
    addMonsToCart(mons) {
        let isAdded = false;
        for (let cartMon of this.cartMons) {
            if (cartMon.mons.id === mons.id) {
                cartMon.count++;
                isAdded = true;
                break;
            }
        }
        if (!isAdded) {
            this.cartMons.push({
                mons: mons,
                count: 1
            })
        }
        this.saveCartMons();
    }

    @action
    purchaseCartMons() {
        const mons = [];
        let URL = this.rootStore.BASE_URL + '/lists/purchase/';
        for (let cartMon of this.cartMons) {
            mons.push({
                mon_id: cartMon.mons.id,
                count: cartMon.count
            })
        }
        Axios.post(
            URL,
            {
                mons
            },
            {
                headers: {
                    'Authorization': this.rootStore.authStore.authToken
                }
            }
        ).then((response) => {
            this.clearCartMons();
        }).catch((error) => {
            console.log(error);
        })
    }

    @computed
    get cartMonsCount() {
        return this.cartMons.length;
    }

    @action
    clearCartMons() {
        this.cartMons = [];
        this.saveCartMons();
    }

    saveCartMons() {
        localStorage.setItem('cart_mons', JSON.stringify(this.cartMons))
    }
}