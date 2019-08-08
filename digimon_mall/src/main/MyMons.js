import React from 'react'
import ListBox from './ListBox';
import { inject, observer } from 'mobx-react';

@inject('rootStore')
@observer
class MyMons extends React.Component {
    monsterStore = this.props.rootStore.monsterStore

    componentDidMount() {
        this.monsterStore.getMyMonster();
    }

    render() {
        console.log(this.monsterStore.myMonsList);
        
        const lists = this.monsterStore.myMonsList.map((list) => {
            return (
                <ListBox key={list.list.id} list={list.list} count={list.count}/>
            )
        })

        return(
            <div id='containel'>
                {lists}
            </div>
        )
    }
}

export default MyMons;