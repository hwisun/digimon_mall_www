import React from 'react'
import ListBox from './ListBox';
import { inject, observer } from 'mobx-react';

@inject('rootStore')
@observer
class MyMons extends React.Component {


    componentDidMount() {
        const { rootStore } = this.props;
        const { monsterStore } = rootStore;
        monsterStore.getMyMonster();
    }

    render() {
        const { rootStore } = this.props;
        const { monsterStore } = rootStore;
        const { myMonsList } = monsterStore;
            
        const lists = myMonsList.map((list) => {
            
            return (
                <ListBox key={list.list.id} list={list.list} count={list.count} times={list.times} />
            )
        })

        return (
            <div id='containel'>
                <h3>장바구니 목록</h3>
                {lists}
            </div>
        )
    }
}

export default MyMons;