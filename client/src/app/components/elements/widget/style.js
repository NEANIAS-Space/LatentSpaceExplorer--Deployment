import styled from 'styled-components';
import { Paper } from '@material-ui/core';
import theme from 'styles/theme';

const WidgetWrapper = styled(Paper)`
    position: relative;
    padding: ${theme.spacing(2)}px;
    margin-bottom: ${theme.spacing(2)}px;
    background-color: #fff;
    border-radius: ${theme.shape.borderRadius}px;
`;

export default WidgetWrapper;
