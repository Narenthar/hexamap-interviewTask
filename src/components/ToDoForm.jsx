import React, { useState, useContext } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { TaskContext } from "../context/taskContext";

const ToDoForm = ({ onAddTask }) => {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const { tasks } = useContext(TaskContext);
  const existingCategories = [
    ...new Set(tasks.map((task) => task.category.toLowerCase())),
  ];
  const handleAddTask = () => {
    if (task && category) {
      const newTaskObj = {
        id: Date.now(),
        name: task,
        category: category,
        duration: 0,
        isActive: true,
      };
      onAddTask(newTaskObj);
      setTask("");
      setCategory("");
    }
  };
  return (
    <Row>
      <Col md={12}>
        <Form className="d-flex justify-content-center">
          <Form.Group className="mx-2">
            <Form.Control
              type="text"
              value={task}
              placeholder="Task Name"
              onChange={(e) => setTask(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mx-2">
            <Form.Control
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              list="categoryList"
            />
            <datalist id="categoryList">
              {existingCategories.map((existingCategory, index) => (
                <option key={index} value={existingCategory} />
              ))}
            </datalist>
          </Form.Group>
          <Button className="mx-2" variant="primary" onClick={handleAddTask}>
            Add Task
          </Button>
        </Form>
      </Col>
    </Row>
  );
};
export default ToDoForm;
