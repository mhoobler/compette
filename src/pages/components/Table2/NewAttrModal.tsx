import React, {useState} from 'react';
import { 
  Modal,
  Button,
  InputGroup,
  Form,
  Row,
  Col
} from 'react-bootstrap';

import firebase from 'firebase';

type literals = 'name' | 'priority' | 'type' | 'default'

const initAttr: ClientAttr = {
  name: '',
  type: 'text',
  priority: 1,
  default: ''
}

type Props = {
  show: boolean;
  handleClose: () => void;
  catName: string
  attributes: ClientAttr[]
}

const NewAttrModal: React.FC<Props> = (P) => {

  const [newAttr, setNewAttr] = useState<ClientAttr>(initAttr)

  const handleSubmit = () => {
    let uid = firebase.auth().currentUser?.uid;
    let ref = uid ? firebase.database().ref(`${uid}/categories/${P.catName}`) : false;
    console.log(newAttr);

    let isSafe = true;
    let attrObj: any = {};
    let highest = 1;
    for(let a of P.attributes){
      if(a.name !== newAttr.name){

        if(a.priority > highest){
          highest = a.priority + 1;
        }
        attrObj[a.name] = {
          ...a,
          default: a.default ? a.default : ''
        };
        delete attrObj[a.name].name;

      } else {

        alert(`Sorry, this table already has the attribute: ${a.name}`);
        setNewAttr({
          name: '',
          type: 'text',
          priority: 1,
          default: ''
        });
        isSafe = false;
        break;

      }
    }

    if(ref && isSafe && newAttr.name !== ''){
      attrObj[newAttr.name] = {
        priority: newAttr.priority,
        type: newAttr.type.toLowerCase(),
        default: newAttr.default
      };
      ref.child('attributes').set(attrObj);
    }
  }

  const handleChange = (attr: literals | 'RESET', val: string | number) => {
    console.log(attr);
    console.log(val);
    if(attr === 'RESET'){
      setNewAttr(initAttr)
    } else {
      setNewAttr({
        ...newAttr,
        [attr]: val  
      })
    }
  }

  return(
    <Modal show={P.show} onHide={P.handleClose}>
{/* Header */}
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>

{/* Body */}
        <Modal.Body>

          {/* Name */}
          <Row>
            <Col lg='8'>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="attribute-label1">Name</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
              type='text'
              onChange={ (evt) => {
                let value = evt.currentTarget.value;
                handleChange('name', value);
              }}
              aria-label="Attribute Name"
              aria-describedby="attribute-label1"
              />
            </InputGroup>
            </Col>

            {/* Priority */}
            <Col lg='4'>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="attribute-label2">Priority</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
              type='number'
              value={newAttr.priority}
              onChange={ (evt) => {
                let value = parseInt(evt.currentTarget.value);
                handleChange('priority', value);
              }}
              aria-label="Attribute Priority"
              aria-describedby='attribute-label2'
              />
            </InputGroup>
            </Col>
          </Row>

          {/* Type */}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="attribute-label4">Default Value</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type='text'
              onChange={ (evt) => {
                let value = evt.currentTarget.value;
                handleChange('default', value);
              }}
              aria-label="Attribute Default"
              aria-describedby="attribute-label4"
            />
          </InputGroup>

          {/* Default Value */}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="attribute-label3">Type</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              as='select'
              onChange={ (evt) => {
                let value = evt.currentTarget.value;
                handleChange('type', value);
              }}
              aria-label="Attribute Type"
              aria-describedby="attribute-label3"
            >
              <option>Text</option>
              <option>Number</option>
              <option>Select</option>
            </Form.Control>
          </InputGroup>

        </Modal.Body>

{/* Footer */}
        <Modal.Footer>
          <Button variant="secondary" onClick={P.handleClose}>
            Close
          </Button>
          <Button
          variant="primary"
          onClick={() => {
            handleSubmit();
            P.handleClose();
          }}>
            Save Changes
          </Button>
        </Modal.Footer>

      </Modal>
  )
}

export default NewAttrModal;