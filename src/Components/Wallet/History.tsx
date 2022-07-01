import React, { useEffect } from "react";
// @ts-ignore
import { Transaction_1 } from "./data";
// @ts-ignore
import WalletModal from "./WalletModal";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "../../Redux/action";
// @ts-ignore
import { WalletType } from "./walletType";
// @ts-ignore
import Aos from "aos";
import "aos/dist/aos.css";

export default function History() {
  const [modeldata, setModelData] = React.useState({});
  const dispatch = useDispatch();
  const openModel = (): void => {
    dispatch({ type: Action.SET_MODAL });
  };
  // @ts-ignore
  const isOpen = useSelector((state) => state.ModelReducer.isOpen);

  // @ts-ignore
  const money = useSelector((state) => state.BankReducer.Balance);
  //
  // function setMoney(stat: string, balance: number, curbalance: number) {
  //   if (stat === "CR") {
  //     curbalance = curbalance + balance;
  //     dispatch({
  //       type: Action.SET_MONEY,
  //       data: curbalance,
  //     });
  //   } else if (stat === "DR") {
  //     curbalance = curbalance - balance;
  //     dispatch({
  //       type: Action.SET_MONEY,
  //       data: curbalance,
  //     });
  //   }
  // }

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

  let width = window.innerWidth;
  React.useEffect(() => {}, [width]);
  if (width > 600) {
    return (
      <div className="overflow-x-auto w-full p-12">
        <div className={isOpen ? "blur-xl" : ""}>
          <table className="table w-full hover">
            <thead>
              <tr>
                <th>Ref No.</th>
                <th>Amount Cr/Dr</th>
                <th>Date</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {/*@ts-ignore*/}
              {Transaction_1.map((data: WalletType) => {
                // setMoney(data.trans, data.amount, money);
                return (
                  <tr
                    data-aos="zoom-in"
                    className={"hover cursor-pointer"}
                    onClick={() => {
                      setModelData(data);
                      openModel();
                    }}
                  >
                    <td>
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-bold">{data.name}</div>
                          <div className="text-sm opacity-50">{data.ref}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={
                          data.trans === "CR"
                            ? "text-green-500 text-xl text-md"
                            : "text-red-500 text-xl"
                        }
                      >
                        {data.trans === "CR" ? "+ " : "- "}
                        {/*@ts-ignore*/}
                        {data.amount.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                      <br />
                      <span className={setBadgeColor(data.status)}>
                        {data.status}
                      </span>
                    </td>
                    <td>{data.date}</td>
                    <th>HKD {money.toLocaleString()}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/*@ts-ignore*/}
        {isOpen ? <WalletModal data={modeldata} /> : null}
      </div>
    );
  } else {
    return (
      <div className="overflow-x-auto w-full">
        <div className={isOpen ? "blur-xl" : ""}>
          <table className="mt-12 table w-full hover mb-12">
            <thead>
              <tr>
                <th>Ref No.</th>
                <th>Date & Time</th>
                <th>Amount Cr/Dr</th>
              </tr>
            </thead>
            <tbody>
              {Transaction_1.map((data) => {
                return (
                  <tr
                    data-aos="zoom-in"
                    className={"hover cursor-pointer"}
                    onClick={() => {
                      setModelData(data);
                      openModel();
                    }}
                  >
                    <td>
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-bold w-24">{data.name}</div>
                          <div className="text-sm opacity-50">{data.ref}</div>
                        </div>
                      </div>
                    </td>
                    <td className={"text-sm"}>{data.date}</td>
                    <td>
                      <span
                        className={
                          data.trans === "CR"
                            ? "text-green-500 text-xl text-md"
                            : "text-red-500 text-xl"
                        }
                      >
                        {data.trans === "CR" ? "+" : "-"}
                        {data.amount}
                      </span>
                      <br />
                      <span className={setBadgeColor(data.status)}>
                        {data.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/*@ts-ignore*/}
        {isOpen ? <WalletModal data={modeldata} /> : null}
      </div>
    );
  }
}
