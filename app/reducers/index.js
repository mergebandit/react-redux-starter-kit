function root(state = false, action) {
  if (action.type === 'CONNECT_TO_REDUX') {
    return true;
  }

  return state;
}

export default root;
