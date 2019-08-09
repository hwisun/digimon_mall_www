import React from 'react'
import { withRouter } from 'react-router-dom'
import { inject } from 'mobx-react';

@inject('rootStore')
class ListBox extends React.Component {

    goToMon = () => {
        const monId = this.props.list.monster.id;
        this.props.history.push('/mons/' + monId)
    }

    render() {
        const { list } = this.props;
        const image = list.monster.image;
        const name = list.monster.title;
        const price = list.price;
        // const itme = this.props.list.times.substring(0, 19)

        // if (!this.props.list.times.substring(0, 19)) {
        //     if (rootStore.times === this.props.list.times.substring(0, 19)) {
        //         const br = true;
        //     } else {
        //         const br = false;
        //     }
        // }
        // rootStore.times = list.times.substring(0, 19)
        
        return (
            <div className='index_item_list' onClick={this.goToMon}>
                <img src={image} alt={name} />
                <p>{name}</p>
                <p>{this.props.count ? this.props.count + '개' : price+' P' }</p>
            </div>
        );
    }
}

export default withRouter(ListBox);