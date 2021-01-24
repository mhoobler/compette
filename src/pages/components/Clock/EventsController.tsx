import React from 'react';

import { 
  Row,
  Col,
  Button
} from 'react-bootstrap';

type Props = {
  events: string[]
  handleSubmit: any
}

const EventsController: React.FC<Props> = (P) => {

  return( 
    <Row>
      { P.events.map( (e: string, i: number) => {
        return (
          <Col key={i} className='text-center' lg='1'>
            <Button 
            variant='primary'
            onClick={ () => P.handleSubmit(e)}
            >
              {e}
            </Button>
          </Col>
        )
      })}
    </Row>
  )
}

export default EventsController;