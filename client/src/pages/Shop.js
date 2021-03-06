import React from 'react';
import { useState } from "react";
import Axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import StickerItem from '../components/sticker/StickerItem';
import Card from 'react-bootstrap/Card';
import { isSignedIn } from "../components/user/Signin";

function Shop() {

    const [ready, setReady] = useState(false);
    const [stickerList, setStickerList] = useState([]);
    const onAdd = (sticker) => {
      Axios.post('http://localhost:3001/Shop', {
          UserID: isSignedIn.UserID,
          StickerID: sticker.StickerID,
          Quantity: 1
      })
    };

    Axios.get('http://localhost:3001/Shop').then((response) => {
        if (stickerList.length === 0) {
            setStickerList(response.data);
        }
        setReady(true);
    })

    return (
        <div>
          {ready ? (
          <Container style={{ paddingTop: 20 }}>
            <h1 className="p-5 text-center"> Stickers </h1>
            <Row xs={1} md={4} className="g-4">
              {stickerList.map((val, key) =>
                <Col key={key}>
                  <Card>
                    <StickerItem sticker={val}/>
                    <Button variant="success" className='float-end' onClick={() => onAdd(val)}>Add to Cart</Button>
                  </Card>
                </Col>
              )}
            </Row>
          </Container>) : (<p style={{ paddingTop: 50 }}>Loading Data</p>)}
        </div>
    );
}

export default Shop;
