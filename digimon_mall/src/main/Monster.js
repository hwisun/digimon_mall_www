import React from 'react'
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import Axios from 'axios'

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

    onPurchase = () => {
        const { rootStore, history } = this.props;
        const listId = rootStore.monsterStore.monsterDatail.id;
        Axios.post(
            rootStore.BASE_URL + '/lists/' + listId + '/purchase/',
            {},
            {
                headers: {
                    'Authorization': rootStore.authStore.authToken
                }
            }
        )
            .then((response) => {
                history.push('/me/mons')
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    history.push('/login/')
                }
                if (error.response.status === 402) {
                    alert('포인트가 부족합니다.')
                }
            })
    }

    render() {
        const monsterDatail = this.props.rootStore.monsterStore.monsterDatail;
        console.log(monsterDatail.id);
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
                    <br />
                    <button onClick={this.onPurchase}>구입하기</button>
                    <button>장바구니 담기</button>
                </div>
            </div>
        )
    }
}

export default Monster