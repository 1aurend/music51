import React from 'react'
import {
  Row,
  Col,
  FormInput,
  FormCheckbox
} from 'shards-react'
import styled from 'styled-components'
import useResponsiveStyles from '../../../hooks/useResponsiveStyles'


const StyledToggleRow = styled(Row)`
  display: flex;
  justify-content: flex-start;
  margin-left: 25%;
`
const StyledColHeader = styled.h3`
  color: ${props => props.theme.colors.light};
  line-height: 0.75em;
  font-family: 'Thintel', monospace;
  text-align: center;
  font-size: 28px;
  text-transform: lowercase
`
const ToggleDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  > * {
    margin: 5px;
  }
`

const FormStyle = {
  fontFamily: "'Thintel', monospace",
  textAlign: "center",
  fontSize: "28px",
  textTransform: "lowercase",
  maxWidth: "80px",
  minWidth: "60px"
}



export default function SessionOptions({checked, onChange, onCheck, text, size}) {
  const sizedStyles = useResponsiveStyles()
  const { h1, h2, h3, h4, para, input} = sizedStyles
  return (
      <>
      <ToggleDiv>
            <StyledColHeader>chords<br/>/round:</StyledColHeader>
            <FormInput onChange={onChange} type="text" placeholder="5" style={FormStyle}/>
          {/*<Col sm='12' lg='4'>
            <StyledColHeader>CHORD TYPES</StyledColHeader>
            <StyledToggleRow>
              <FormCheckbox toggle checked={checked.chordTypes.triads} onChange={() => onCheck('chord', 'triads')}>
                Triads
              </FormCheckbox>
            </StyledToggleRow>
            <StyledToggleRow>
              <FormCheckbox toggle checked={checked.chordTypes.sevenths} onChange={() => onCheck('chord', 'sevenths')}>
                7ths
              </FormCheckbox>
            </StyledToggleRow>
          </Col>
          <Col sm='12' lg='4'>
            <StyledColHeader>ROOT NOTES</StyledColHeader>
            <StyledToggleRow>
              <FormCheckbox toggle checked={checked.roots.common} onChange={() => onCheck('root', 'common')}>
                Common
              </FormCheckbox>
            </StyledToggleRow>
            <StyledToggleRow>
              <FormCheckbox toggle checked={checked.roots.any} onChange={() => onCheck('root', 'any')}>
                Any
              </FormCheckbox>
            </StyledToggleRow>
          </Col>*/}
        </ToggleDiv>
      </>
    )

}
