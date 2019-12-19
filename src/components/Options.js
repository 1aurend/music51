import React from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  FormInput,
  FormCheckbox
} from 'shards-react'



export default function Options({checked, onChange, onCheck, text, size}) {
  return (
      <>
        {/*<Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}>

        </Row>*/}
          <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '3%', marginBottom: '5%'}}>
            <Col lg='4' sm='12'>
              <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}><h4 style={{fontFamily: "'Overpass Mono', monospace", fontWeight: '600', marginBottom: '1%'}}>CHORDS/ROUND</h4></Row>
              <Row style={{display: 'flex', justifyContent: 'center', paddingBottom: '2%'}}>
              <FormInput onChange={onChange} type="text" placeholder="5" style={{maxWidth: size, fontFamily: "'Overpass Mono', monospace"}}/>
              </Row>
            </Col>
              <Col sm='12' lg='4'><h4 style={{fontFamily: "'Overpass Mono', monospace", fontWeight: '600', marginBottom: '1%', textAlign: 'center', marginTop: '2%'}}>CHORD TYPES</h4>
                  <Row style={{display: 'flex', justifyContent: 'flex-start', marginLeft: '25%'}}><FormCheckbox toggle checked={checked.chordTypes.triads} onChange={(e) => onCheck(e, 'chord', 'triads')}><span style={{fontFamily: "'Overpass Mono', monospace"}}>Triads</span></FormCheckbox></Row>
                  <Row style={{display: 'flex', justifyContent: 'flex-start', marginLeft: '25%'}}><FormCheckbox toggle checked={checked.chordTypes.sevenths} onChange={e => onCheck(e, 'chord', 'sevenths')}><span style={{fontFamily: "'Overpass Mono', monospace"}}>7ths</span></FormCheckbox></Row>
              </Col>
              <Col sm='12' lg='4'><h4 style={{fontFamily: "'Overpass Mono', monospace", fontWeight: '600', marginBottom: '1%', textAlign: 'center', marginTop: '2%'}}>ROOT NOTES</h4>
                  <Row style={{display: 'flex', justifyContent: 'flex-start', marginLeft: '25%'}}><FormCheckbox toggle checked={checked.roots.common} onChange={e => onCheck(e, 'root', 'common')}><span style={{fontFamily: "'Overpass Mono', monospace"}}>Common</span></FormCheckbox></Row>
                  <Row style={{display: 'flex', justifyContent: 'flex-start', marginLeft: '25%', color: '#b7b8bc'}}><FormCheckbox toggle checked={checked.roots.any} onChange={e => onCheck(e, 'root', 'any')}><span style={{fontFamily: "'Overpass Mono', monospace"}}>Any</span></FormCheckbox></Row>
              </Col>
            </Row>
      </>
    )

}
