import { useReducer, useCallback } from 'react';

const ACTIONS = {
  SET_DATA: 'SET_DATA',
  TOGGLE_QUOTA: 'TOGGLE_QUOTA',
  SET_CREDIT: 'SET_CREDIT',
  SET_VIABILITY: 'SET_VIABILITY',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
  TOGGLE_POLICIES: 'TOGGLE_POLICIES',
  SET_FINANCIED: 'SET_FINANCIED',
  SET_FINANCIED_AMOUNT: 'SET_FINANCIED_AMOUNT',
  SET_PROFILES: 'SET_PROFILES',
  SET_PROFILE: 'SET_PROFILE',
  SET_PROPERTY: "SET_PROPERTY"
};

const initialState = {
  quota: false,
  modal: false,
  acceptPolicies: false,
  financied: "Cupo máximo"
};

const reducer = (state, action) => {
  switch (action.type) {

    case ACTIONS.TOGGLE_QUOTA:
      return { ...state, quota: action.payload };
    case ACTIONS.TOGGLE_MODAL:
      return { ...state, modal: !state.modal };
    case ACTIONS.TOGGLE_POLICIES:
      return {
        ...state,
        acceptPolicies: !state.acceptPolicies,
        modal: !state.modal, 
      };

    default:
      return state;
  }
};

const useData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);


  const toggleQuota = useCallback((quota) => {
    dispatch({ type: ACTIONS.TOGGLE_QUOTA, payload: quota });
  }, []);

  
  const toggleModal = useCallback(() => {
    dispatch({ type: ACTIONS.TOGGLE_MODAL });
  }, []);

  const togglePolicies = useCallback(() => {
    dispatch({ type: ACTIONS.TOGGLE_POLICIES });
  }, []);





  return {
    ...state, 
    toggleQuota,
    toggleModal,
    togglePolicies
  };
};





export default useData;
