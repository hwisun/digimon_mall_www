import React from 'react'
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

@inject('rootStore')
@observer
class Monster extends React.Component {

    componentDidMount() {
        const monsterStore = this.props.rootStore.monsterStore
        monsterStore.getMonsterDatail(this.props.match.params.monId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.monId !== prevProps.match.params.monId) {
            const monsterStore = this.props.rootStore.monsterStore
            monsterStore.getMonsterDatail(this.props.match.params.monId);
        }
    }

    render() {
        const monsterDatail = this.props.rootStore.monsterStore.monsterDatail;
        console.log(monsterDatail);
        
        const image = monsterDatail ? monsterDatail.monster.image : null;
        const name = monsterDatail ? monsterDatail.monster.title : null;
        const gener = monsterDatail ? monsterDatail.gener.title : null;
        const kind = monsterDatail ? monsterDatail.kind.title : null;
        const attri = monsterDatail ? monsterDatail.attri.title : null;
        const skill = monsterDatail ? monsterDatail.skill : null;
        const desc = monsterDatail ? monsterDatail.desc : null;
        const prevId = monsterDatail.prev ? monsterDatail.prev.id : null;
        const prev = monsterDatail.prev ? monsterDatail.prev.title : null;
        

        return (
            <div id='containel'>
                <div className='detail_item_list'>
                    <img src={image} alt={name} />
                    <span> 
                        이름 : {name}<br />
                        세대 : {gener}<br />
                        종족 : {kind}<br />
                        속성 : {attri}<br />
                        - 이전 진화 -<br />
                        {
                            prevId ?
                                <Link to={'/mons/' + prevId}>{prev}</Link>:
                                '없음'
                        }
                    </span>
                    <span>
                        - 기술<br />
                        <div className='skill'>{skill}</div><br />
                        - 소개<br />
                        <div className='desc'>{desc}</div>
                    </span>
                </div>
            </div>
        )
    }
}

export default Monster