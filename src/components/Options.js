import React from 'react'
import {
  Row,
  Col,
  FormInput,
  FormCheckbox
} from 'shards-react'
import styled from 'styled-components'

const StyledToggleRow = styled(Row)`
  display: flex;
  justify-content: flex-start;
  margin-left: 25%;
  font-family: 'Overpass Mono', monospace;
`
const StyledColHeader = styled.h4`
  font-family: 'Overpass Mono', monospace;
  font-weight: 600;
  margin-bottom: 1%;
  text-align: center;
  margin-top: 2%;
`


export default function Options({checked, onChange, onCheck, text, size}) {
  return (
      <>
          <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '3%', marginBottom: '5%'}}>
            <Col lg='4' sm='12'>
              <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}>
                <StyledColHeader>CHORDS/ROUND</StyledColHeader>
              </Row>
              <Row style={{display: 'flex', justifyContent: 'center', paddingBottom: '2%'}}>
              <FormInput onChange={onChange} type="text" placeholder="5" style={{maxWidth: size, fontFamily: "'Overpass Mono', monospace"}}/>
              </Row>
            </Col>
              <Col sm='12' lg='4'>
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
              </Col>
            </Row>
      </>
    )

}
