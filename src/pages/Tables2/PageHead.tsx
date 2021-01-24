import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  ButtonGroup
} from 'react-bootstrap';

import {TableContext} from '../Tables2/TableContext';

const PageHead: React.FC = () => {
  const [newCategory, setNewCategory] = useState('');
  const {search, handleSearch, submitNewCategory} = React.useContext(TableContext) as ContextType;

  return (
  <Row className='header-row'>
    {/* The width on these columns are changed in App.css */}
    <Col lg='4'>
      <Row>
        <Col>
          <ButtonGroup size="lg" className="mb-2">
            <Button
            variant='primary'
            onClick={() => submitNewCategory(newCategory)}
            >
              Add Category
            </Button>
            <input
            type='text'
            value={newCategory}
            onChange={(e) => {
              let str = e.currentTarget.value;
              setNewCategory(str.replace(/[^\w]/, ''));
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
            >
              &nbsp;Search
            </Button>
            <input
            type='text'
            value={search}
            onChange={(e) => {
              let str = e.currentTarget.value;
              console.log(str);
              handleSearch(str.replace(/[^\w]/, ''));
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