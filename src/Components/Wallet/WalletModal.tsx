import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { Action } from "../../Redux/action";
// @ts-ignore
import { WalletType } from "./walletType";
// @ts-ignore
import Aos from "aos";
import "aos/dist/aos.css";

interface Props {
  data: WalletType;
}

export default function WalletModal(props: Props) {
  const dispatch = useDispatch();
  // @ts-ignore
  const isOpen = useSelector((state) => state.ModelReducer.isOpen);
  console.log(isOpen);
  const closeModal = (): void => {
    dispatch({ type: Action.CLOSE_MODAL });
  };
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  function setBadgeColor(data: string) {
    if (data === "Pending") {
      return "badge bg-orange-400";
    } else if (data === "Completed") {
      return "badge bg-green-500";
    } else {
      return "badge bg-red-500";
    }
  }

  return (
    <div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal modal-open">
        <div
          data-aos="fade-up"
          className="modal-box md:relative max-w-full md:max-w-2xl"
        >
          <label
            onClick={() => closeModal()}
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className={"text-center text-sm mb-16"}>
            <p>History</p>
            <p className={"mb-2 opacity-60"}>{props.data.date}</p>
            <span className={setBadgeColor(props.data.status)}>
              {props.data.status}
            </span>
          </div>

          <h3
            className={
              props.data.trans === "CR"
                ? "text-green-500 text-4xl text-md text-center mb-4"
                : "text-red-500 text-4xl text-center mb-4"
            }
          >
            {props.data.trans === "CR" ? "+ " : "- "}
            HKD {props.data.amount}
          </h3>
          <div className={"text-center mb-6"}>
            <p className={"text-xl"}>{props.data.name}</p>
            <p className={"text-sm opacity-50"}>{props.data.ref}</p>
          </div>
          <hr />
          <div className={"mt-8 flex"}>
            <div>
              <h3 className={"mb-4"}>
                <span className={"opacity-50"}>Bank Name: </span>HSBC
              </h3>
              <h3 className={"mb-4"}>
                <span className={"opacity-50"}>Account Number: </span>12344223
              </h3>
              <h3 className={"mb-4"}>
                <span className={"opacity-50"}>Start Date: </span>13/04/22
              </h3>
            </div>
            <div className={"ml-auto"}>
              <h3 className={"mb-4"}>
                <span className={"opacity-50"}>Address: </span>Hong Kong
              </h3>
              <h3 className={"mb-4"}>
                <span className={"opacity-50"}>Phone Number: </span>12345364
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
