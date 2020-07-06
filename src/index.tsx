import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import {MyProvider} from './OceanContext';
import {Provider} from 'react-redux';
import store from './redux';
import {SnackbarProvider} from 'notistack';

const theme = createMuiTheme({
    // palette: {
    //     primary: {
    //         main: "#00b0ff",
    //         light: "#9adcfb"
    //     }
    // }
})

ReactDOM.render (<React.StrictMode>
    <ThemeProvider theme={theme}>
        <MyProvider>
            <Provider store={store}>
                <SnackbarProvider maxSnack={3}>
                    <App/>
                </SnackbarProvider>
            </Provider>
        </MyProvider>
    </ThemeProvider>
</React.StrictMode>, document.getElementById('root'));

serviceWorker.unregister();
