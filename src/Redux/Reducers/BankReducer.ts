// @ts-ignore
import { Action } from "../action";

export interface stateType {
  Balance: number;
}

const initialData: stateType = {
  Balance: 0,
};

const BankReducer = (state = initialData, action: any) => {
  switch (action.type) {
    case Action.SET_MONEY:
      return {
        ...state,
        Balance: action.data,
      };
    default:
      return state;
  }
};

export default BankReducer;
