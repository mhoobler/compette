import React, {useEffect, useState} from 'react';

import {
  Jumbotron,
  Container,
  Row,
  Col
} from 'react-bootstrap';

const TimeDisplay: React.FC = () => {

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(
      () => setTime(new Date()),
      1000
    )
  }, []); 


  return (
    <div id='time-display'>
      <Row>
        <Col>
          <Jumbotron fluid>
            <Container>
              {time.toLocaleString()}
            </Container>
          </Jumbotron>
        </Col>
      </Row>

    
    </div>
  )
}

export default TimeDisplay;