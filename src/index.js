import React from 'react';
import App from './App';
    
import { render } from 'react-dom'
// import  configureStore from './store'
// import { connect, dispatch, Provider } from 'react-redux'


render(    
    <App/>, document.getElementById('app')
)

if (module.hot) {
    // Reload components
    module.hot.accept('./src/App', () => {
        render()
    });      
    //Reload reducers
    // module.hot.accept('./reducers/combiner', () => {
    //     store.replaceReducer(connectRouter(history)(rootReducer))
    // })
}  
