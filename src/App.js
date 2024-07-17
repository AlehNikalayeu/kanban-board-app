import './App.css';
import {connect} from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import Column from "./components/Column";
import CreateModalTask from "./components/CreateTaskModal";

function App(props) {
  return (
      <div className="App">
        <h1 className="header">{props.appName}</h1>
        <CreateModalTask />
        <div className="container text-center">
          <div className="row align-items-start status-container">
            {props.statuses.map(status =>
                <div key={status.id} className="col-lg-3 p-2">
                  <Column status={status} />
                </div>
            )}
          </div>
        </div>
        <div className="footer">
          Created by <span className="creator">Aleh Nikalayeu</span>
        </div>
      </div>
  );
}

const mapStateToProps = (state) => ({
  appName: state.appName,
  statuses: state.boardStatuses
});

export default connect(mapStateToProps)(App);