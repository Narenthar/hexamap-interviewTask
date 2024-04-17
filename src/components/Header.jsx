import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Container, Button, Modal } from "react-bootstrap";
import { TaskContext } from "../context/taskContext";
import { Chart } from "react-google-charts";

const Header = ({ handleThemeChange, theme }) => {
  const { tasks } = useContext(TaskContext);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const handleSwitchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    handleThemeChange(newTheme);
  };
  const handleSettingsClick = () => {
    setShowSettingsModal(!showSettingsModal);
  };
  const handleStatusClick = () => {
    setShowStatusModal(!showStatusModal);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=13.08&longitude=80.27&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"
        );
        const data = await response.json();
        setCurrentWeather(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWeatherData();
  }, []);

  const options = {
    title: "My ToDo Tasks",
  };

  const categoryDurations = tasks.reduce((acc, task) => {
    const category = task.category.toLowerCase();
    const existingCategory = Object.keys(acc).find(
      (key) => key.toLowerCase() === category
    );
    if (existingCategory) {
      acc[existingCategory] += task.duration;
    } else {
      acc[category] = task.duration;
    }
    return acc;
  }, []);

  const chartResult = Object.entries(categoryDurations).map(
    ([category, duration]) => [category, duration]
  );
  chartResult.unshift(["Task", "Duration Taken for Task"]);

  return (
    <header>
      <Container className="pt-2">
        <Row>
          <Col>
            {currentWeather && (
              <div>
                <p>
                  Current temperature is{" "}
                  {currentWeather?.current?.temperature_2m}°C in Chennai
                </p>
              </div>
            )}
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              className="mx-2"
              variant="primary"
              onClick={handleStatusClick}>
              Status
            </Button>
            <Modal show={showStatusModal} onHide={handleStatusClick}>
              <Modal.Body>
                <Chart
                  chartType="PieChart"
                  data={chartResult}
                  options={options}
                  width={"100%"}
                  height={"400px"}
                />
              </Modal.Body>
            </Modal>
            <Button
              className="mx-2"
              variant="secondary"
              onClick={handleSettingsClick}>
              Settings
            </Button>
            <Modal show={showSettingsModal} onHide={handleSettingsClick}>
              <Modal.Header closeButton>
                <Modal.Title>Theme Settings</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Button
                  variant={theme === "light" ? "dark" : "light"}
                  onClick={handleSwitchTheme}>
                  {theme === "light"
                    ? "Switch to Dark Mode"
                    : "Switch to Light Mode"}
                </Button>
              </Modal.Body>
            </Modal>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
