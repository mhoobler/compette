import React from 'react';
import {
  Row,
  Col,
  ButtonGroup,
  Button
} from 'react-bootstrap';

type Props = {
  newCategory: any
  handleNewCategory: any
  setNewCategory: any
  handleSearch: any
  search: any
}

const PageHead: React.FC<Props> = (P) => {

  return (

    <Row className='header-row'>
      {/* The width on these columns are changed in App.css */}
      <Col lg='4'>
        <Row>
          <Col>
            <ButtonGroup size="lg" className="mb-2">
              <Button
              variant='primary'
              onClick={() => P.handleNewCategory()}
              >
                Add Category
              </Button>
              <input
              type='text'
              value={P.newCategory}
              onChange={(e) => {
                let str = e.currentTarget.value;
                P.setNewCategory(str.replace(/[^\w]/, ''));
              }}
              />
            </ButtonGroup>
          </Col>
        </Row>
      </Col>
      <Col lg='4'>
        <Row>
          <Col>
            <ButtonGroup size="lg" className="mb-2">
              <Button
              className="fa fa-search camo-disable"
              variant='primary'
              disabled={true}
              >
                &nbsp;Search
              </Button>
              <input
              type='text'
              value={P.search}
              onChange={(e) => {
                let str = e.currentTarget.value;
                P.handleSearch(str.replace(/[^\w]/, ''))
              }}
              />
            </ButtonGroup>
          </Col>
        </Row>
      </Col>
    </Row>

  )
}

export default PageHead;