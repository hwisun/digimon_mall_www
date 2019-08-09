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

    onMonsToCart = () => {
        const { rootStore } = this.props;
        const { monsterStore, cartStore } = rootStore;
        const { monsterDatail } = monsterStore;
        cartStore.addMonsToCart(monsterDatail)
    }

    render() {
        const { rootStore } = this.props;
        const { monsterStore } = rootStore;
        const { monsterDatail } = monsterStore;
        const { monster, gener, kind, attri, prev } = monsterDatail
        let { skill, desc } = monsterDatail

        const monImage = monsterDatail ? monster.image : null;
        const monName = monsterDatail ? monster.title : null;
        const genName = monsterDatail ? gener.title : null;
        const kinName = monsterDatail ? kind.title : null;
        const attName = monsterDatail ? attri.title : null;
        const prevId = monsterDatail.prev ? prev.id : null;
        const prevName = monsterDatail.prev ? prev.title : null;
        skill = monsterDatail ? skill : null;
        desc = monsterDatail ? desc : null;
        

        return (
            <div id='containel'>
                <h3>몬스터 상세페이지</h3>
                <div className='detail_item_list'>
                    <img src={monImage} alt={monName} />
                    <span> 
                        이름 : {monName}<br />
                        세대 : {genName}<br />
                        종족 : {kinName}<br />
                        속성 : {attName}<br />
                        - 이전 진화 -<br />
                        {
                            prevId ?
                                <Link to={'/mons/' + prevId}>{prevName}</Link>:
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
                    <button onClick={this.onMonsToCart}>장바구니 담기</button>
                </div>
            </div>
        )
    }
}

export default Monster