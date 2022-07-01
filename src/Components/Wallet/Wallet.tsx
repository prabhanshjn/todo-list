import React, { useEffect } from "react";
// @ts-ignore
import ProfilePic from "../../p-icon.png";
// @ts-ignore
import History from "./History";
import { Transaction_1 } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "../../Redux/action";
// @ts-ignore
import Aos from "aos";
import "aos/dist/aos.css";

interface Props {
  data: {
    name: string;
    avail_balance: string;
  };
}

export default function Wallet(props: Props) {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  const dispatch = useDispatch();
  const init_money = () => {
    dispatch({
      type: Action.SET_MONEY,
      data: props.data.avail_balance,
    });
  };
  init_money();

  // @ts-ignore
  const money = useSelector((state) => state.BankReducer.Balance);
  // @ts-ignore
  const isOpen = useSelector((state) => state.ModelReducer.isOpen);
  return (
    <div className={"min-h-screen rounded-md"}>
      <div className={"md:px-12 px-4"}>
        <div className={isOpen ? "blur-xl" : ""}>
          <div
            data-aos="zoom-in"
            className={"p-12 bg-base-200 rounded-xl border-2 mb-8"}
          >
            <div className={"flex items-center justify-center  mb-10"}>
              <img
                className={
                  "bg-rose-200 w-14 rounded-full border border-grey-300 shadow-sm p-2 mr-8"
                }
                src={ProfilePic}
              />
              <h1 className={"font-sans md:text-5xl text-3xl"}>
                <span className={"text-rose-400"}>{props.data.name}</span>'s
                Wallet
              </h1>
            </div>
            <div className={"text-center"}>
              <h2 className={"mb-16 md:text-xl text-lg"}>
                Hello {props.data.name}!
              </h2>
            </div>
            <div className={"md:flex md:mx-20 mb-20 md:px-20"}>
              <div className={"text-center"}>
                <p className={"text-xl font-light mb-2"}>Account Balance</p>
                <h2 className={"md:text-4xl text-2xl mb-8"}>
                  HKD{" "}
                  <span>
                    {/*@ts-ignore*/}
                    {money.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </h2>
                <p className={"text-green-400"}>HKD 1,000.00</p>
                <p className={"text-lg md:mb-0 mb-12"}>incoming credit</p>
              </div>
              <div className={"ml-auto self-center mb-14 text-center"}>
                <button className="btn btn-wide md:text-xl text-lg bg-gradient-to-r from-red-100 to-red-200 border-0 text-rose-400 hover:text-rose-800">
                  Withdraw
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div data-aos="fade-right" className={"mt-12"}>
            <h1 className={"text-3xl"}>History</h1>
          </div>
        </div>
      </div>

      <History />
    </div>
  );
}
