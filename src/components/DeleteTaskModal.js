import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';
import {connect} from "react-redux";

function DeleteTaskModal(props) {
    const [modal, setModal] = useState(false);
    const [inputText, setInputText] = useState('')

    const toggle = () => setModal(!modal);

    const handleCancel = () => {
        setInputText('')
        toggle()
    }

    const onDelete = () => {
        props.deleteTask(props.task.id)
        toggle()
    }

    return (
        <>
            <Button color="outline-danger" size="sm" onClick={toggle}>
                Delete
            </Button>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> Are you sure you want to delete the task?</ModalHeader>
                <ModalBody>
                    <h2> {props.task.name} </h2>
                    <Input
                        placeholder="Enter task name to delete"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="danger"
                            onClick={onDelete}
                            disabled={props.task.name.toLowerCase() !== inputText.toLowerCase()}
                    >
                        Delete
                    </Button>{' '}
                    <Button color="success" onClick={handleCancel}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

const mapDispatchToProps = (dispatch) => ({
    deleteTask: (taskId) => dispatch({
        type: 'DELETE_TASK',
        payload: taskId
    })
})

export default connect(null, mapDispatchToProps)(DeleteTaskModal);