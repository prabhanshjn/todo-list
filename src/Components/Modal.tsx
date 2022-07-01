import React from "react";
// @ts-ignore
import { Action } from "../Redux/action";
import { useDispatch } from "react-redux";

interface Props {
  id: number;
  fid: string;
}

export default function Modal(props: Props) {
  const dispatch = useDispatch();
  const redux_deleteTodo = (id: number, fid: string) => {
    dispatch({
      type: Action.DELETE_TODO,
      data: {
        id,
        fid,
      },
    });
  };
  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Deleting Todo</h3>
          <p className="py-4">Are you sure you want to delete your todo?</p>
          <div className="modal-action">
            <label
              onClick={() => redux_deleteTodo(props.id, props.fid)}
              htmlFor="my-modal"
              className="btn"
            >
              Delete
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
