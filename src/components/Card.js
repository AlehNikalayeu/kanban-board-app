import React from 'react';
import DeleteModal from "./DeleteTaskModal";
import {connect} from "react-redux";
import UpdateTaskModal from "./UpdateTaskModal";
import { Button } from 'reactstrap';

const Card = (props) => {
    const {task, changePriority, priorities, moveTask, statuses} = props

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">{task.name}</h5>
                <p className="card-text">{task.description}</p>
            </div>

            <ul className="list-group list-group-flush p-2">
                <li className="list-group-item d-flex justify-content-center align-items-center">
                    <Button color="outline-info" size="sm"
                            onClick={() => changePriority(task.id, 'down')}
                            disabled={task.priority === priorities[0]}
                    >
                        ↓
                    </Button>
                    <span className="mx-2">Priority: {task.priority}</span>
                    <Button color="outline-info" size="sm"
                            onClick={() => changePriority(task.id, 'up')}
                            disabled={task.priority === priorities[priorities.length - 1]}
                    >
                        ↑
                    </Button>
                </li>

                <li className="list-group-item text-center">{task.status}</li>
            </ul>

            <div className="card-body d-flex justify-content-center align-items-center">
                <Button color="outline-secondary" size="sm"
                        onClick={() => moveTask('left', task.status, task.id)}
                        disabled={task.status === statuses[0].status}
                >
                    ←
                </Button>

                <DeleteModal task={task} />

                <UpdateTaskModal task={task} />

                <Button color="outline-secondary" size="sm"
                        onClick={() => moveTask('right', task.status, task.id)}
                        disabled={task.status === statuses[statuses.length - 1].status}
                >
                    →
                </Button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    priorities: state.priorities,
    statuses: state.boardStatuses
})

const mapDispatchToProps = (dispatch) => ({
    changePriority: (taskId, direction) => dispatch({
        type: 'CHANGE_PRIORITY',
        payload: {id: taskId, direction}
    }),

    moveTask: (direction, taskStatus, taskId) => dispatch({
        type: 'MOVE_TASK',
        payload: {
            direction: direction,
            status: taskStatus,
            id: taskId
        }
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(Card);