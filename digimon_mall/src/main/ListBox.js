import React from 'react'
import { withRouter } from 'react-router-dom'

class ListBox extends React.Component {

    goToMon = () => {
        const monId = this.props.list.monster.id;
        this.props.history.push('/mons/' + monId)
    }

    render() {
        const list = this.props.list;
        const image = list.monster.image
        const name = list.monster.title
        const price = list.price
        return (
            <div className='index_item_list' onClick={this.goToMon}>
                <img src={image} alt={name} />
                <p>{name}</p>
                <p>{price}</p>
            </div>
        );
    }
}

export default withRouter(ListBox);