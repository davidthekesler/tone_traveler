const presetReducer = (state = {}, action) => {
    if (action.type === 'SEND_PRESETS') {
      return [...state, action.payload ]
    }
    return state;
  }
  

export default presetReducer;