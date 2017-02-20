import {
    Link,
    IndexLink
} from 'react-router';
import TestGroup from 'modules/TestGroup';
import probeGroup from 'modules/probe-group';
import FirstTestComponent from 'components/FirstTestComponent';
import ThirdTestContainer from 'containers/ThirdTestContainer';

export default {
    ReactRouter: {
        Link,
        IndexLink
    },
    TestGroup,
    "probe-group": probeGroup,
    FirstTestComponent,
    ThirdTestContainer
};
