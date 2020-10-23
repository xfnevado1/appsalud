import React from "react";

// reactstrap components
import { Card, Row, Col } from "react-bootstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import icons from "variables/icons";

class Icons extends React.Component {
  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md={12}>
              <Card>
                <Card.Header>
                  <h5 className="title">100 Awesome Nucleo Icons</h5>
                  <p className="category">
                    Handcrafted by our friends from{" "}
                    <a href="https://nucleoapp.com/?ref=1712">NucleoApp</a>
                  </p>
                </Card.Header>
                <Card.Body className="all-icons">
                  <Row>
                    {icons.map((prop, key) => {
                      return (
                        <Col
                          lg={2}
                          md={3}
                          sm={4}
                          xs={6}
                          className="font-icon-list"
                          key={key}
                        >
                          <div className="font-icon-detail">
                            <i className={"now-ui-icons " + prop} />
                            <p>{prop}</p>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Icons;
