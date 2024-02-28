import React from "react";
import { Container, Nav, Tab, Col, Row } from "react-bootstrap";
import ClientsAdminPage from "../components/ClientsAdminPage";
import DashboardProducts from "../components/DashboardProducts";

function AdminDashboard() {
  return (
    <Container>
      <Tab.Container defaultActiveKey="products">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="home">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="products">Products</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="clients">Clients</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="products">
                <DashboardProducts />
              </Tab.Pane>

              <Tab.Pane eventKey="clients">
                <ClientsAdminPage />
              </Tab.Pane>
              <Tab.Pane eventKey="home">
                <div className="flex flex-column flex-wrap container  ">
                  <iframe
                    className=" rounded-5  mx-1 "
                    style={{
                      background: "#21313C",
                      border: "none",
                      borderRadius: "2px",
                      boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
                      width: "375px",
                      height: "50vh",
                    }}
                    src="https://charts.mongodb.com/charts-ecommerce-bqopp/embed/charts?id=65d74375-7648-4a0f-815c-617ba2797c19&maxDataAge=3600&theme=dark&autoRefresh=true"
                  ></iframe>
                  <iframe
                    className=" rounded-5   "
                    style={{
                      background: "#21313C",
                      border: "none",
                      borderRadius: "2px",
                      boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
                      width: "400px",
                      height: "50vh",
                    }}
                    src="https://charts.mongodb.com/charts-ecommerce-bqopp/embed/charts?id=65d758a6-29a9-4061-8d59-02039bbc2030&maxDataAge=60&theme=dark&autoRefresh=true"
                  ></iframe>
                  <iframe
                    className=" rounded-5 mx-auto  "
                    style={{
                      background: "#21313C",
                      border: "none",
                      borderRadius: "2px",
                      boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
                      width: "250px",
                      height: "250px",
                    }}
                    src="https://charts.mongodb.com/charts-ecommerce-bqopp/embed/charts?id=65d7420b-bc0a-4506-86bb-da80602896f0&maxDataAge=60&theme=dark&autoRefresh=true"
                  ></iframe>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default AdminDashboard;
