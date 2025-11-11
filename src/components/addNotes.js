import React, { useState, useContext } from "react";
import noteContext from "../Context/notes/noteContext";

const AddNotes = (props) => {
  const { addNote } = useContext(noteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();

    // validation to check if title and description are not empty in the frontend
    if (note.title.trim().length < 3 || note.description.trim().length < 5) {
      alert(
        "Title must be at least 3 characters and Description at least 5 characters."
      );
      return;
    }

    addNote(note.title, note.description, note.tag); // add note
    setNote({ title: "", description: "", tag: "" }); // clear form
    props.showAlert("Note added successfully", "success"); // show alert
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <div className="container my-3">
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={note.description}
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
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
            disabled={
              note.title.trim().length === 0 ||
              note.description.trim().length === 0
            }
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNotes;
