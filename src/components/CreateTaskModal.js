import React, {useState} from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {connect} from "react-redux";

const CreateTaskModal = (props) => {
    const [modal, setModal] = useState(false);

    const initialState = {
        name: '',
        description: '',
        status: props.statuses[0].status,
        priority: props.priorities[0]
    }

    const resetModal = () => {
        setNewTask(initialState)
    }

    const toggle = () => {
        resetModal()
        setModal(!modal)
    }

    const [newTask, setNewTask] = useState(initialState)

    const onCreate = () => {
        props.createTask({...newTask, id: Date.now()})
        toggle()
    }

    return (
        <>
            <Button color="success" className="mb-2" onClick={toggle}>
                Create New Task
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create New Task</ModalHeader>

                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Input
                                placeholder="Enter task name..."
                                value={newTask.name}
                                onChange={(event) => setNewTask({...newTask, name: event.target.value})}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="createStatus">Status</Label>
                            <Input
                                type="select"
                                value={newTask.status}
                                onChange={(event) => setNewTask({...newTask, status: event.target.value})}
                            >
                                {props.statuses.map((el) =>
                                    <option key={el.id}>{el.status}</option>
                                )}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="createPriority">Priority</Label>
                            <Input
                                type="select"
                                value={newTask.priority}
                                onChange={(event) => setNewTask({...newTask, priority: +event.target.value})}
                            >
                                {props.priorities.map((el, index) =>
                                    <option key={index}>{el}</option>
                                )}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="createDescription">Description</Label>
                            <Input
                                value={newTask.description}
                                onChange={(event) => setNewTask({...newTask, description: event.target.value})}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>

                <ModalFooter>
                    <Button color="success" onClick={onCreate}>Create</Button>
                    <Button color="danger" onClick={toggle}>Cancel</Button>
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
    createTask: (newTask) => dispatch({
        type: 'CREATE_TASK',
        payload: newTask
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskModal);