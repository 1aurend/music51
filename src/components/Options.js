import React from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  FormInput,
  FormCheckbox
} from 'shards-react'



export default function Options({checked, onChange, onCheck, text}) {

  // console.log(JSON.stringify(checked));

    return (
      <>
        <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}><p>{text}</p></Row>
        <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}>
          <Col sm='2' lg='2'><FormInput onChange={onChange} type="text" placeholder="10"/></Col>
        </Row>
          <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '3%', marginBottom: '3%'}}>
              <Col sm='12' lg='4'><h4 style={{textAlign: 'center'}}>Chord Types</h4>
                  <Row style={{display: 'flex', justifyContent: 'flex-start', marginLeft: '25%'}}><FormCheckbox toggle checked={checked.chordTypes.triads} onChange={(e) => onCheck(e, 'chord', 'triads')}>Triads</FormCheckbox></Row>
                  <Row style={{display: 'flex', justifyContent: 'flex-start', marginLeft: '25%'}}><FormCheckbox toggle checked={checked.chordTypes.sevenths} onChange={e => onCheck(e, 'chord', 'sevenths')}>7ths</FormCheckbox></Row>
              </Col>
              <Col sm='12' lg='4'><h4 style={{textAlign: 'center'}}>Root Notes</h4>
                  <Row style={{display: 'flex', justifyContent: 'flex-start', marginLeft: '25%'}}><FormCheckbox toggle checked={checked.roots.common} onChange={e => onCheck(e, 'root', 'common')}>Common</FormCheckbox></Row>
                  <Row style={{display: 'flex', justifyContent: 'flex-start', marginLeft: '25%'}}><FormCheckbox toggle checked={checked.roots.any} onChange={e => onCheck(e, 'root', 'any')}>Any</FormCheckbox></Row>
              </Col>
            </Row>
      </>
    )

}
