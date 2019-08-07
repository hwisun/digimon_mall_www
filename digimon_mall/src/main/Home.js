import React from 'react'
import Axios from 'axios'
import { inject } from 'mobx-react';

@inject('rootStore')
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = { lists: [] }

    }

    componentDidMount() {
        this.getMonster();
    }

    getMonster() {
        const { rootStore } = this.props
        const URL = rootStore.BASE_URL + '/lists/';
        Axios.get(URL)
            .then(response => {
                const lists = response.data;
                this.setState({
                    lists: lists
                });
            });
    }


    render() {
        console.log(this.state.lists);
        const lists = this.state.lists.map(list => {
            const image = list.monster.image
            const name = list.monster.title
            const price = list.price
            return(
                <div key={list.id} className='index_item_list'>
                    <img src={image} alt={name}/>
                    <p>{name}</p>
                    <p>{price}</p>
                </div>
            )
        })

        return (
            <div id='containel'>
                {lists}
            </div>
        )
    }
}

export default Home