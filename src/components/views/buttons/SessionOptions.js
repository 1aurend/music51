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
  text-align: center;
  color: ${props => props.theme.colors.light};
  line-height: 10px;
`
const ToggleDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  > * {
    margin: 5%
  }
`

export default function SessionOptions({checked, onChange, onCheck, text, size}) {
  const sizedStyles = useResponsiveStyles()
  const { h1, h2, h3, h4, para, input} = sizedStyles
  return (
      <>
      <ToggleDiv>
            <StyledColHeader style={h4}>chords/round:</StyledColHeader>
          <FormInput onChange={onChange} type="text" placeholder="5" style={input}/>
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
