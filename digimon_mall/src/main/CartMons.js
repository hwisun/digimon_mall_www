import React from 'react'

import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react';

import ListBox from './ListBox';

@inject('rootStore')
@observer
class CartMons extends React.Component {

    onPurchase = () => {
        const { rootStore } = this.props;
        const { cartStore } = rootStore;
        cartStore.purchaseCartMons();
    }

    clearMons = () => {
        const { rootStore } = this.props;
        const { cartStore } = rootStore;
        cartStore.clearCartMons();
    }

    render() {
        const { rootStore } = this.props;
        const { cartStore } = rootStore;
        
        const lists = cartStore.cartMons.map((list) => {
            return (
                <ListBox key={list.mons.id} list={list.mons} count={list.count} />
            )
        })

        return (
            <div id='containel'>
                <h3>장바구니 목록</h3>
                <button onClick={this.clearMons}>비우기</button>
                <button onClick={this.onPurchase}>전부구입</button>
                <br />
                {lists}
            </div>
        )
    }
}

export default withRouter(CartMons);