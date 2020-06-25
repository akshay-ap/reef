import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#00b0ff",
            light: "#9adcfb"
        }
    }
})

ReactDOM.render (<React.StrictMode>
    <ThemeProvider theme={theme}>
        <App/>
    </ThemeProvider>
</React.StrictMode>, document.getElementById('root'));

serviceWorker.unregister();
