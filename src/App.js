import React, {Component} from "react";
import { GlobalStyles, ThemeProvider, theme, Modal, Snackbar } from 'cs-reusable-component-library-exporter';

import Header from './layouts/Header.js';
// import Sidebar from './layouts/Sidebar';

class App extends Component {  
  constructor(props){
    super(props)
    this.state = {
      modalSettings: false,
      snackbarShow: false
    };    
  }

  render(){ 
    return (
      <ThemeProvider theme = {theme}>
        <React.Fragment>
        <GlobalStyles/>          
          <Header header="Edit Walmart transportation rates" backAngle={true} star={true} search={true} subheader="Atlantic Candy Company"></Header>
          {/* <Sidebar/>           */}
        </React.Fragment>         
      </ThemeProvider>
    );  
  }
};

export default App;
