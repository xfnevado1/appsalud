import React from "react";

// reactstrap components
import { Card, Row, Col } from "react-bootstrap";

class RegularTables extends React.Component {
  render() {
    return (
      <>
          <Row>
            <Col xs={12}>
              <Card>
                <Card.Header>
                  <Card.Title tag="h4">Simple Table</Card.Title>
                </Card.Header>
              </Card>
            </Col>
          </Row>
      </>
    );
  }
}

export default RegularTables;
