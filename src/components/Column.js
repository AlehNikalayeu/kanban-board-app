import React from 'react';
import Card from "./Card";
import {connect} from "react-redux";

const Column = ({status, tasks}) => {
    return (
        <div className="column">
            <h2>{status.status}</h2>
            {tasks
                .filter((task) => task.status === status.status)
                .sort((a, b) => a.priority < b.priority ? 1 : -1)
                .map((task) =>
                    <Card
                        key={task.id}
                        task={task}
                    />)}
        </div>
    );
};

const mapStateToProps = (state) => ({
    tasks: state.tasks
})

export default connect(mapStateToProps)(Column);