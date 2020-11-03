import React from "react";
// react plugin for creating notifications over the dashboard
//import NotificationAlert from "react-notification-alert";

// reactstrap components
import {
  Alert,
  Card,
  Row,
  Col,
  Button,
} from "react-bootstrap";

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.notify = this.notify.bind(this);
  }
  onDismiss() {}
  notify(place) {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Welcome to <b>Now UI Dashboard React</b> - a beautiful freebie for
            every web developer.
          </div>
        </div>
      ),
      type: type,
      icon: "now-ui-icons ui-1_bell-53",
      autoDismiss: 7,
    };
    this.refs.notificationAlert.notificationAlert(options);
  }
  render() {
    return (
      <>
          {/* <NotificationAlert ref="notificationAlert" /> */}
          <Row>
            <Col md={6} xs={12}>
              <Card>
                <Card.Header>
                  <Card.Title tag="h4">Notifications Style</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Alert color="info">
                    <span>This is a plain notification</span>
                  </Alert>
                  <Alert
                    color="info"
                    show={this.state.visible}
                    //toggle={this.onDismiss}
                  >
                    <span>This is a notification with close button.</span>
                  </Alert>
                  <Alert
                    color="info"
                    className="alert-with-icon"
                    show={this.state.visible}
                    //toggle={this.onDismiss}
                  >
                    <span
                      data-notify="icon"
                      className="now-ui-icons ui-1_bell-53"
                    />
                    <span data-notify="message">
                      This is a notification with close button and icon.
                    </span>
                  </Alert>
                  <Alert
                    color="info"
                    className="alert-with-icon"
                    show={this.state.visible}
                    //toggle={this.onDismiss}
                  >
                    <span
                      data-notify="icon"
                      className="now-ui-icons ui-1_bell-53"
                    />
                    <span data-notify="message">
                      This is a notification with close button and icon and have
                      many lines. You can see that the icon and the close button
                      are always vertically aligned. This is a beautiful
                      notification. So you don't have to worry about the style.
                    </span>
                  </Alert>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} xs={12}>
              <Card>
                <Card.Header>
                  <Card.Title tag="h4">Notification states</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Alert
                    color="primary"
                    show={this.state.visible}
                    //toggle={this.onDismiss}
                  >
                    <span>
                      <b> Primary - </b> This is a regular notification made
                      with color="primary"
                    </span>
                  </Alert>
                  <Alert
                    color="info"
                    show={this.state.visible}
                    //toggle={this.onDismiss}
                  >
                    <span>
                      <b> Info - </b> This is a regular notification made with
                      color="info"
                    </span>
                  </Alert>
                  <Alert
                    color="success"
                    show={this.state.visible}
                    //toggle={this.onDismiss}
                  >
                    <span>
                      <b> Success - </b> This is a regular notification made
                      with color="success"
                    </span>
                  </Alert>
                  <Alert
                    color="warning"
                    show={this.state.visible}
                    //toggle={this.onDismiss}
                  >
                    <span>
                      <b> Warning - </b> This is a regular notification made
                      with color="warning"
                    </span>
                  </Alert>
                  <Alert
                    color="danger"
                    show={this.state.visible}
                    //toggle={this.onDismiss}
                  >
                    <span>
                      <b> Danger - </b> This is a regular notification made with
                      color="danger"
                    </span>
                  </Alert>
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} xs={12}>
              <Card>
                <Card.Body>
                  <div className="places-buttons">
                    <Row>
                      <Col md={6} className="ml-auto mr-auto text-center">
                        <Card.Title tag="h4">
                          Notifications Places
                          <p className="category">
                            Click to view notifications
                          </p>
                        </Card.Title>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={8} xs={12} className="ml-auto mr-auto">
                        <Row>
                          <Col md={4} xs={12}>
                            <Button
                              color="primary"
                              block
                              onClick={() => this.notify("tl")}
                            >
                              Top Left
                            </Button>
                          </Col>
                          <Col md={4} xs={12}>
                            <Button
                              color="primary"
                              block
                              onClick={() => this.notify("tc")}
                            >
                              Top Center
                            </Button>
                          </Col>
                          <Col md={4} xs={12}>
                            <Button
                              color="primary"
                              block
                              onClick={() => this.notify("tr")}
                            >
                              Top Right
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={8} xs={12} className="ml-auto mr-auto">
                        <Row>
                          <Col md={4} xs={12}>
                            <Button
                              color="primary"
                              block
                              onClick={() => this.notify("bl")}
                            >
                              Bottom Left
                            </Button>
                          </Col>
                          <Col md={4} xs={12}>
                            <Button
                              color="primary"
                              block
                              onClick={() => this.notify("bc")}
                            >
                              Bottom Center
                            </Button>
                          </Col>
                          <Col md={4} xs={12}>
                            <Button
                              color="primary"
                              block
                              onClick={() => this.notify("br")}
                            >
                              Bottom Right
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

      </>
    );
  }
}

export default Notifications;
