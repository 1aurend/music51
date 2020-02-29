import { createGlobalStyle } from 'styled-components';
import fippsregular from './Fipps-Regular.woff';
import minecraftiaregular from './Minecraftia-Regular.woff';
import rainyhearts from './rainyhearts.woff';
import thintel from './Thintel.woff';
import upheaval from './upheavtt.woff';
import asapcondensedsemibold from './AsapCondensedSemiBold.woff'

export default createGlobalStyle`
    @font-face {
        font-family: 'Fipps Regular';
        src: local('Fipps Regular'), local('FippsRegular'),
        url(${fippsregular}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
    @font-face {
        font-family: 'Minecraftia Regular';
        src: local('Minecraftia Regular'), local('MinecraftiaRegular'),
        url(${minecraftiaregular}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
    @font-face {
        font-family: 'Rainy Hearts';
        src: local('Rainy Hearts'), local('RainyHearts'),
        url(${rainyhearts}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
    @font-face {
        font-family: 'Thintel';
        src: local('Thintel'),
        url(${thintel}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
    @font-face {
        font-family: 'Upheaval';
        src: local('Upheaval'),
        url(${upheaval}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
    @font-face {
        font-family: 'Asap Condensed SemiBold';
        src: local('Asap Condensed SemiBold'), local('AsapCondensedSemiBold'),
        url(${asapcondensedsemibold}) format('woff');
        font-weight: 600;
        font-style: normal;
    }
`;
