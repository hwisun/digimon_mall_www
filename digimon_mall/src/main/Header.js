import React from 'react'
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Axios from 'axios'

@inject('rootStore')
@observer
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            geners: []
        };
    }

    componentDidMount() {
        this.getGeners();
    }

    getGeners() {
        const { rootStore } = this.props
        const URL = rootStore.BASE_URL + '/geners/';
        Axios.get(URL)
            .then(response => {
                const geners = response.data;
                this.setState({
                    geners: geners
                })
            });
    }

    render() {
        const geners = this.state.geners.map((gener) => {
            return (
                <div key={gener.id} className='header_l'>
                    <Link to={'/geners/' + gener.id} >{gener.title}</Link>
                </div>
            )
        })
        return (
            <header>
                <div className='header_l'>
                    <Link to='/'>Home</Link>
                </div>
                {geners}
            </header>
        )
    }
}

export default Header;