import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

import Alpha from './view/Alpha/Alpha.jsx'

const appState = observable({});

@observer
class Main extends Component {
     render() {
        return (
            <div>
                <Alpha />
            </div>
        );
     }
}

ReactDOM.render(<Main appState={appState} />, document.getElementById('root'));
