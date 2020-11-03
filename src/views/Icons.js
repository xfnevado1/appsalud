import React from "react";

// reactstrap components
import { Row, Col } from "react-bootstrap";
import icons from "variables/icons";

class Icons extends React.Component {
  render() {
    return (
      <>
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
      </>
    );
  }
}

export default Icons;
