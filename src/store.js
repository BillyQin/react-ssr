// import { createStore, applyMiddleware } from 'redux'
// import createSagaMiddleware from 'redux-saga'
// import reducer from './reducers'
// import saga from './sagas'

// // export default () => {
// //   const sagaMiddleware = createSagaMiddleware()
// //   const store = createStore(
// //     reducer,
// //     applyMiddleware(sagaMiddleware)
// //   )
// //   sagaMiddleware.run(saga)
// //   return store
// // }

// export const creatClientStore = () => {
//   const sagaMiddleware = createSagaMiddleware()
//   const initialState = window.__INITIAL_STATE__?JSON.parse(window.__INITIAL_STATE__):{}
//   const store = createStore(
//     reducer,
//     initialState,
//     applyMiddleware(sagaMiddleware)
//   )
//   sagaMiddleware.run(saga)
//   return store
// }

// export const creatServerStore = () => {
//   const sagaMiddleware = createSagaMiddleware()
//   const store = createStore(
//     reducer,
//     applyMiddleware(sagaMiddleware)
//   )
//   sagaMiddleware.run(saga)
//   return store
// }


