import { Action } from "../action";

export interface stateType {
  isOpen: boolean;
}

const initialData: stateType = {
  isOpen: false,
};

const ModelReducer = (state = initialData, action: any) => {
  switch (action.type) {
    case Action.SET_MODAL:
      return {
        ...state,
        isOpen: true,
      };
    case Action.CLOSE_MODAL:
      return {
        isOpen: false,
      };
    default:
      return state;
  }
};

export default ModelReducer;
