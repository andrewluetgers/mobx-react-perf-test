import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observable} from 'mobservable';
import {observer} from 'mobservable-react';

import Alpha from './view/Alpha/Alpha.jsx'

// uncomment next line to enable the dev-tools.
//import 'mobservable-react-devtools';

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
