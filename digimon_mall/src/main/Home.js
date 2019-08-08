import React from 'react'
import { inject, observer } from 'mobx-react';
import ListBox from './ListBox';

@inject('rootStore')
@observer
class Home extends React.Component {
    monsterStore = this.props.rootStore.monsterStore

    componentDidUpdate(prevProps) {
        if (this.props.match.params.generId !== prevProps.match.params.generId) {
            this.monsterStore.getMonster(this.props.match.params.generId);
        }
    }

    componentDidMount() {
        this.monsterStore.getMonster(this.props.match.params.generId);
    }


    render() {   
        const lists = this.monsterStore.monsterList.map((list) => {    
            return(
                <ListBox key={list.id} list={list} />  
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