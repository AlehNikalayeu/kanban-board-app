import React, {useState} from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {connect} from "react-redux";

const UpdateTaskModal = (props) => {
    const [modal, setModal] = useState(false);

    const initialState = {
        name: props.task.name,
        description: props.task.description,
        status: props.task.status,
        priority: props.task.priority,
        id: props.task.id
    }

    const [updatedTask, setUpdatedTask] = useState(initialState)

    const toggle = () => {
        setModal(!modal)
    }

    const onUpdate = () => {
        props.updateTask(updatedTask)
        toggle()
    }

    const onCancel = () => {
        setUpdatedTask(initialState)
        toggle()
    }

    return (
        <>
            <Button color="outline-info" size="sm" onClick={toggle}>
                Update
            </Button>
            <Modal isOpen={modal}>
                <ModalHeader>Update</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Input
                                placeholder="Enter task name..."
                                value={updatedTask.name}
                                onChange={(event) => setUpdatedTask({...updatedTask, name: event.target.value})}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="updateStatus">Status</Label>
                            <Input
                                type="select"
                                value={updatedTask.status}
                                onChange={(event) => setUpdatedTask({...updatedTask, status: event.target.value})}
                            >
                                {props.statuses.map((el) =>
                                    <option key={el.id}>{el.status}</option>
                                )}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="updatePriority">Priority</Label>
                            <Input
                                type="select"
                                value={updatedTask.priority}
                                onChange={(event) => setUpdatedTask({...updatedTask, priority: +event.target.value})}
                            >
                                {props.priorities.map((el, index) =>
                                    <option key={index}>{el}</option>
                                )}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="updateDescription">Description</Label>
                            <Input
                                value={updatedTask.description}
                                onChange={(event) => setUpdatedTask({...updatedTask, description: event.target.value})}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={onUpdate}>
                        Update
                    </Button>{' '}
                    <Button color="danger" onClick={onCancel}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

const mapStateToProps = (state) => ({
    statuses: state.boardStatuses,
    priorities: state.priorities
})

const mapDispatchToProps = (dispatch) => ({
    updateTask: (editTask) => dispatch({
        type: 'UPDATE_TASK',
        payload: editTask
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTaskModal);