import keyMirror from 'keymirror'

module.exports = {
  ActionTypes: keyMirror({
      EXECUTE_QUERY: null
  }),
  PayloadSources: keyMirror({
      SERVER_ACTION: null,
      VIEW_ACTION: null
  })
};
