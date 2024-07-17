import {legacy_createStore as createStore} from "redux";
import kanban from "./reducer";

const store = createStore(kanban)

export default store