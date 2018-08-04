import styledComponents, { injectGlobal } from 'styled-components';
import styledComponentsTS from 'styled-components-ts';
import { colors } from '../../constants';

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  body {
    background-color: ${colors.phthaloGreen};
    text-align: center;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`

export const Card = styledComponents.img`
   height: 200px;
   padding-right: 10px;
`

export const PlayerLabel = styledComponents.h2`
  color: ${colors.marigold};
`

export const PlayerScore = styledComponents.h3`
  color: ${colors.marigold};
`
export const PlayerCards = styledComponents.div`
  padding-top: 30px;
`

export interface IButtonProps {
  disabled?: boolean;
}

export const Button = styledComponentsTS<IButtonProps>(styledComponents.a)`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 8rem;
  background: transparent;
  color: ${colors.ufoGreen};
  border: 2px solid ${colors.ufoGreen};
  &:hover {
    background: ${colors.ufoGreen};
    color: ${colors.phthaloGreen};
  }
  display: ${props => props.disabled ? 'none' : 'visible'}
  cursor: pointer;
`

export const ChipContainer = styledComponents.div`
  display: flex;
  justify-content: center;
  padding-bottom: 32px;
`

export const Chip = styledComponents.div`
  margin: 6px;
  border-radius: 50%;
  border: 6px solid ${colors.limeGreen};
  color: ${colors.limeGreen};
  font-weight: bold;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: ${colors.limeGreen};
    color: ${colors.phthaloGreen};
  }
`

export const BetTitle = styledComponents.h1`
  color: ${colors.marigold};
`

export const Financials = styledComponents.div`
  font-size: 18px;
  color: ${colors.limeGreen}
  padding-top: 12px;
  > b {
    font-weight: bold;
    font-size: 22px;
  }
`
export const RightArrow = styledComponents.div`
  position: relative;
  top: -100px;
  left: -50px;
  display: inline-block;
	height: 0px; width: 0px;
	border: 12px solid;
	border-color:
	  ${colors.marigold}
		${colors.marigold}
		transparent
		transparent;
	transform: rotate(45deg);
&:before {
	content: '';
	position: absolute;
	top: 0px; right: 0px;
	display: block;
	height: 12px; width: 16px;
	background-color: ${colors.marigold};
	transform:
		rotate(-45deg)
		translate(2px, 1px);
}
`

export const LeftArrow = RightArrow.extend`
  left: 50px;
  transform: rotate(-135deg);
`