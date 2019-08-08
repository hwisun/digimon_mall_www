import React from 'react'
import { inject, observer } from 'mobx-react';

@inject('rootStore')
@observer
class Home extends React.Component {

    componentDidUpdate(prevProps) {
        if (this.props.match.params.generId !== prevProps.match.params.generId) {
            const { monsterStore } = this.props.rootStore
            monsterStore.generId = this.props.match.params.generId
            monsterStore.getMonster();
        }
    }

    componentDidMount() {
        const { monsterStore } = this.props.rootStore
        monsterStore.getMonster();
    }

    render() {
        const { monsterStore } = this.props.rootStore
        
        const lists = monsterStore.monsterList.map(list => {    
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