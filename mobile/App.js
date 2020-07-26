import 'react-native-gesture-handler';
import React, { useEffect, createContext } from 'react';
import Routes from './src/routes';
import { Linking } from 'react-native';

const UserContext = React.createContext()

import api from './src/services/api';

let code = '';

export default function App() {

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    useEffect( () => {
        Linking.addEventListener('url', (result) => {
            const urlString = result.url;

            const theCode = getParameterByName('code', urlString);

            code = theCode;
        })        
    });

    return (
        <Routes />
    );
}
