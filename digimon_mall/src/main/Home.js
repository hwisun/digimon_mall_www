import React from 'react'
import { inject, observer } from 'mobx-react';
import ListBox from './ListBox';

@inject('rootStore')
@observer
class Home extends React.Component {
    monsterStore = this.props.rootStore.monsterStore;
    authStore = this.props.rootStore.authStore;
    userStore = this.props.rootStore.userStore;

    componentDidUpdate(prevProps) {
        if (this.props.match.params.generId !== prevProps.match.params.generId) {
            this.monsterStore.getMonster(this.props.match.params.generId);
        }
    }

    componentDidMount() {
        this.monsterStore.getMonster(this.props.match.params.generId);
    }


    render() {   
        console.log(this.userStore.user.username)
        const lists = this.monsterStore.monsterList.map((list) => {    
            return(
                <ListBox key={list.id} list={list} />  
            )
        })

        return (
            <div id='containel'>
                <h3>몬스터 리스트 페이지</h3>
                {lists}
            </div>
        )
    }
}

export default Home