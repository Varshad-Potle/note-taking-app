import React, { useContext, useEffect, useRef, useState } from "react";
import NoteItem from "./Noteitem";
import NoteContext from "../Context/notes/noteContext";
import AddNotes from "./addNotes"; 
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  const navigate = useNavigate();
  
  useEffect(() => {
    if(localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
    originalNote: {},
  });

  const updateNote = (currentNote) => {
    if (ref.current) {
      ref.current.click(); // open modal
    }
    // Set current note values for modal form
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
      originalNote: {
        title: currentNote.title,
        description: currentNote.description,
        tag: currentNote.tag,
      },
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const isChanged =
      note.etitle !== note.originalNote.title ||
      note.edescription !== note.originalNote.description ||
      note.etag !== note.originalNote.tag;

    if (!isChanged) return;

    editNote(note.id, note.etitle, note.edescription, note.etag);

    // Programmatically close modal using Bootstrap's Modal API
    const modalElement = document.getElementById("staticBackdrop");
    const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) modalInstance.hide();
    
    props.showAlert("Updated successfully", "success");

  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // Check if any field has changed
  const isNoteChanged =
    note.etitle !== note.originalNote.title ||
    note.edescription !== note.originalNote.description ||
    note.etag !== note.originalNote.tag;

  return (
    <>
      <AddNotes showAlert = {props.showAlert}/>

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
                disabled={!isNoteChanged}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3 container mx-auto">
        <h2>Your Notes</h2>
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <NoteItem
              note={note}
              key={note._id || note.id}
              updateNote={updateNote}
              showAlert = {props.showAlert}
            />
          ))
        ) : (
          <p>No notes to display.</p>
        )}
      </div>
    </>
  );
};
export default Notes;
