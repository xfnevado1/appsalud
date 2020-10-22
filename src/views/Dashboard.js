import React from "react";
// react plugin used to create charts
//import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Card,
  /*CardHeader,
  Card.Body,
  CardFooter,
  Card.Title,*/
  Row,
  Col,
  /*UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,*/
  Dropdown,
  Table,
  Button,
  Form,
/*   FormGroup,
  InputGroup,
 */  
  Tooltip
} from 'react-bootstrap';

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

/* import {
  dashboardPanelChart,
  dashboardShippedProductsChart,
  dashboardAllProductsChart,
  dashboard24HoursPerformanceChart,
} from "variables/charts.js";
 */
class Dashboard extends React.Component {
  render() {
    return (
      <>
        <PanelHeader
          size="lg"
          content={
            <Form.Label>Hola</Form.Label>
/*             <Line
              data={dashboardPanelChart.data}
              options={dashboardPanelChart.options}
            />
 */          }
        />
        <div className="content">
          <Row>
            <Col xs={12} md={4}>
              <Card className="card-chart">
                <Card.Header>
                  <h5 className="card-category">Global Sales</h5>
                  <Card.Title tag="h4">Shipped Products</Card.Title>
                  
                    <Dropdown.Toggle
                      className="btn-round btn-outline-default btn-icon"
                      color="default"
                    >
                      <i className="now-ui-icons loader_gear" />
                    </Dropdown.Toggle>
                    <Dropdown right>
                      <Dropdown.Item>Action</Dropdown.Item>
                      <Dropdown.Item>Another Action</Dropdown.Item>
                      <Dropdown.Item>Something else here</Dropdown.Item>
                      <Dropdown.Item className="text-danger">
                        Remove data
                      </Dropdown.Item>
                    </Dropdown>
                  
                </Card.Header>
                <Card.Body>
                  <div className="chart-area">
   {/*                  <Line
                      data={dashboardShippedProductsChart.data}
                      options={dashboardShippedProductsChart.options}
                    /> */}
                  </div>
                </Card.Body>
                <Card.Footer>
                  <div className="stats">
                    <i className="now-ui-icons arrows-1_refresh-69" /> Just
                    Updated
                  </div>
                </Card.Footer>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="card-chart">
                <Card.Header>
                  <h5 className="card-category">2020 Sales</h5>
                  <Card.Title tag="h4">All products</Card.Title>
                  
                    <Dropdown.Toggle
                      className="btn-round btn-outline-default btn-icon"
                      color="default"
                    >
                      <i className="now-ui-icons loader_gear" />
                    </Dropdown.Toggle>
                    <Dropdown right>
                      <Dropdown.Item>Action</Dropdown.Item>
                      <Dropdown.Item>Another Action</Dropdown.Item>
                      <Dropdown.Item>Something else here</Dropdown.Item>
                      <Dropdown.Item className="text-danger">
                        Remove data
                      </Dropdown.Item>
                    </Dropdown>
                  
                </Card.Header>
                <Card.Body>
                  <div className="chart-area">
{/*                     <Line
                      data={dashboardAllProductsChart.data}
                      options={dashboardAllProductsChart.options}
                    /> */}
                  </div>
                </Card.Body>
                <Card.Footer>
                  <div className="stats">
                    <i className="now-ui-icons arrows-1_refresh-69" /> Just
                    Updated
                  </div>
                </Card.Footer>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="card-chart">
                <Card.Header>
                  <h5 className="card-category">Email Statistics</h5>
                  <Card.Title tag="h4">24 Hours Performance</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="chart-area">
{/*                     <Bar
                      data={dashboard24HoursPerformanceChart.data}
                      options={dashboard24HoursPerformanceChart.options}
                    /> */}
                  </div>
                </Card.Body>
                <Card.Footer>
                  <div className="stats">
                    <i className="now-ui-icons ui-2_time-alarm" /> Last 7 days
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Card className="card-tasks">
                <Card.Header>
                  <h5 className="card-category">Backend Development</h5>
                  <Card.Title tag="h4">Tasks</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="table-full-width table-responsive">
                    <Table>
                      <tbody>
                        <tr>
                          <td>
                            <Form.Group check>
                              <Form.Label check>
                                <Form.Control defaultChecked type="checkbox" />
                                <span className="form-check-sign" />
                              </Form.Label>
                            </Form.Group>
                          </td>
                          <td className="text-left">
                            Sign contract for "What are conference organizers
                            afraid of?"
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="info"
                              id="tooltip731609871"
                              type="button"
                            >
                              <i className="now-ui-icons ui-2_settings-90" />
                            </Button>
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="danger"
                              id="tooltip923217206"
                              type="button"
                            >
                              <i className="now-ui-icons ui-1_simple-remove" />
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Form.Group check>
                              <Form.Label check>
                                <Form.Control type="checkbox" />
                                <span className="form-check-sign" />
                              </Form.Label>
                            </Form.Group>
                          </td>
                          <td className="text-left">
                            Lines From Great Russian Literature? Or E-mails From
                            My Boss?
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="info"
                              id="tooltip907509347"
                              type="button"
                            >
                              <i className="now-ui-icons ui-2_settings-90" />
                            </Button>
                            <Tooltip
                              delay={0}
                              target="tooltip907509347"
                            >
                              Edit Task
                            </Tooltip>
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="danger"
                              id="tooltip496353037"
                              type="button"
                            >
                              <i className="now-ui-icons ui-1_simple-remove" />
                            </Button>
                            <Tooltip
                              delay={0}
                              target="tooltip496353037"
                            >
                              Remove
                            </Tooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Form.Group check>
                              <Form.Label check>
                                <Form.Control defaultChecked type="checkbox" />
                                <span className="form-check-sign" />
                              </Form.Label>
                            </Form.Group>
                          </td>
                          <td className="text-left">
                            Flooded: One year later, assessing what was lost and
                            what was found when a ravaging rain swept through
                            metro Detroit
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="info"
                              id="tooltip326247652"
                              type="button"
                            >
                              <i className="now-ui-icons ui-2_settings-90" />
                            </Button>
                            <Tooltip
                              delay={0}
                              target="tooltip326247652"
                            >
                              Edit Task
                            </Tooltip>
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="danger"
                              id="tooltip389516969"
                              type="button"
                            >
                              <i className="now-ui-icons ui-1_simple-remove" />
                            </Button>
                            <Tooltip
                              delay={0}
                              target="tooltip389516969"
                            >
                              Remove
                            </Tooltip>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <hr />
                  <div className="stats">
                    <i className="now-ui-icons loader_refresh spin" /> Updated 3
                    minutes ago
                  </div>
                </Card.Footer>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card>
                <Card.Header>
                  <h5 className="card-category">All Persons List</h5>
                  <Card.Title tag="h4">Employees Stats</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>City</th>
                        <th className="text-right">Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dakota Rice</td>
                        <td>Niger</td>
                        <td>Oud-Turnhout</td>
                        <td className="text-right">$36,738</td>
                      </tr>
                      <tr>
                        <td>Minerva Hooper</td>
                        <td>Curaçao</td>
                        <td>Sinaai-Waas</td>
                        <td className="text-right">$23,789</td>
                      </tr>
                      <tr>
                        <td>Sage Rodriguez</td>
                        <td>Netherlands</td>
                        <td>Baileux</td>
                        <td className="text-right">$56,142</td>
                      </tr>
                      <tr>
                        <td>Doris Greene</td>
                        <td>Malawi</td>
                        <td>Feldkirchen in Kärnten</td>
                        <td className="text-right">$63,542</td>
                      </tr>
                      <tr>
                        <td>Mason Porter</td>
                        <td>Chile</td>
                        <td>Gloucester</td>
                        <td className="text-right">$78,615</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;