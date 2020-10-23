import React from "react";
// react plugin used to create google maps

// reactstrap components
import { Row, Col, Card} from "react-bootstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

class FullScreenMap extends React.Component {
  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12}>
              <Card>
                <Card.Header>Google Maps</Card.Header>
                <Card.Body>
                  <div id="map" className="map" style={{ position: "relative", overflow: "hidden" }} >
                    MAPAS
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default FullScreenMap;
