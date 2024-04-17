import React, {useState} from 'react';
import { Row, Col, Button, Form  } from 'react-bootstrap';

function ToDoList({
tasks,
activeTask,
onStopEdit,
onUpdateTask,
onPauseTask,
onResumeTask,
onDeleteTask,
}) {

    const handleTaskNameChange = (task, e) => {
        const updatedTask = { ...task, name: e.target.value };
        onUpdateTask(updatedTask);
    };

    return (
        <Row className="mt-4">
          <Col xs={12}>
            {tasks.map((task) => (
              <Row className="my-2" key={task.id}>
                <Col xs={12} md={6}>
                  <Form.Control
                    type="text"
                    value={task.name}
                    onChange={(e) => handleTaskNameChange(task, e)}
                    onBlur={onStopEdit}
                  />
                </Col>
                <Col xs={6} md={3} className="d-flex align-items-center">
                  {task.category}
                </Col>
                <Col xs={6} md={3} className="d-flex justify-content-end align-items-center">
                  <span className="mx-2">{task.duration} s</span>
                  {activeTask && activeTask.id === task.id ? (
                    activeTask.isActive ? (
                      <Button className="mx-2" variant="secondary" onClick={onPauseTask} style={{ width: '80px' }}>
                        Pause
                      </Button>
                    ) : (
                      <Button className="mx-2" variant="success" onClick={() => onResumeTask(task)}>
                        Resume
                      </Button>
                    )
                  ) : (
                    <Button className="mx-2" variant="success" onClick={() => onResumeTask(task)}>
                      Resume
                    </Button>
                  )}
                  <Button variant="danger" onClick={() => onDeleteTask(task.id)}>
                    Delete
                  </Button>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
      );
}

export default ToDoList;
