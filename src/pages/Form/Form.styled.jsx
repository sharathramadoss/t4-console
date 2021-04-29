import styled from 'styled-components';
import Card from '@material-ui/core/Card';

export const StyledCard = styled(Card)`
    ${(props) => {
        return props.activecard ? 'border: 1px solid #DFA24A; background: #FFF7ED' : 'border: 1px solid #D4D4D4';
    }}
`