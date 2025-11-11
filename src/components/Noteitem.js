import React, { useContext } from "react";
import noteContext from "../Context/notes/noteContext";
const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const {note, updateNote} = props;
  const {title, description, tag} = note;
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch">
      <div className="card w-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <div className="d-flex justify-content-end">
            <i
              className="fa-solid fa-trash mx-2 text-danger"
              style={{ cursor: "pointer" }}
              onClick={() => {
                deleteNote(props.note._id);
                props.showAlert("Note deleted successfully", "success");
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2 text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => updateNote(note)}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
