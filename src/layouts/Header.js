import React, { Component } from 'react';
import styled from 'styled-components';
import { ContextMenu, theme, AngleIcon, Badge, StarOutlineIcon, StarIcon, SearchIcon, XIcon} from 'cs-reusable-component-library-exporter';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Sidebar from './Sidebar.js';
import Home from './TransportationRatesHome.js';
import CreditMemosHome from './CreditMemosHome.js';

const layoutNav = {
  groups: [
      {
      header: '',
      listItems: [
        { 
          value: 'Transportation Rates Home',
          onClick: function showClick() {
              window.location.assign(window.location.pathname = "/");
          }
        }        
      ]
      },
      {
        header: '',
        listItems: [
          { 
            value: 'Credit Memos',
            onClick: function showClick() {
                window.location.assign(window.location.pathname = "/credit-memos-home");
            }
          }        
        ]
      }
  ]
};

const Window = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const Header = styled.div`
  height: 72px;
  border-bottom: 1px solid ${props => props.theme.grey};
  display: flex;
  align-items: center;
  padding: 0 40px;
  position: fixed;
  z-index: 1000;
  width: ${props => props.sidePanelOpened ? 'calc(100% - 430px)' : 'calc(100% - 80px)' };
  transition: width 0.5s;
  background: ${props => props.theme.white};
`

const StarContainer = styled.div`
  display: flex;
`

const AlignRight = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`

const ExtendAngle = styled(AngleIcon)`
  cursor: pointer;
  margin-right: 16px;
`

const ExtendBadge = styled(Badge)`
  margin-left: 24px;
`
const ExtendStarUnfilled = styled(StarOutlineIcon)`
cursor: pointer;
margin-left: 24px;
  &:hover {
    fill: ${props => props.theme.yellow};
  }
`

const ExtendStarFilled = styled(StarIcon)`
cursor: pointer;
margin-left: 24px;
`

const Subheader = styled.p`
  color: ${props => props.theme.darkGrey};
  margin: 0 48px 0 0;
`

const ExtendX = styled(XIcon)`
  margin-right: 40px;
  cursor: pointer;
`

const ExtendContextMenu = styled(ContextMenu)`
  margin-right: 40px;
`

export default class extends Component {
  constructor (props) {
    super(props);
    this.state = {
      starFilled: false,
      sidePanelOpened: false
    };
    this.resizeMainHeader = this.resizeMainHeader.bind(this);
  }

  resizeMainHeader = opened => {
    this.setState({sidePanelOpened: opened});
  };

  onClick = (e) => {
    this.setState( {
      starFilled: !this.state.starFilled
    }, (e)=> console.log(this.state));
  };

  render() {
    return <Window>
      <Header sidePanelOpened = {this.state.sidePanelOpened}>
        {this.props.exit ? <ExtendX fill={theme.black}/> : null }
        <ExtendContextMenu menuOptions={layoutNav}/>
        {this.props.backAngle ? <ExtendAngle rotate={'90'}/>: null }
        <h2>{this.props.header}</h2>
        {this.props.star ?
          <StarContainer onClick={this.onClick}>
            {this.state.starFilled === false ? <ExtendStarUnfilled/> : this.state.starFilled === true ? <ExtendStarFilled fill={theme.yellow}/> : null }
          </StarContainer>
        : null }
        <AlignRight>
          <Subheader>{this.props.subheader}</Subheader>
          {this.props.search ? <SearchIcon/>: null }
          <ExtendBadge baseColor = {theme.green} fontColor={theme.white} dims={40}>CS</ExtendBadge>
        </AlignRight>
      </Header>

      <Router>
        <React.Fragment>                
          <Route exact path="/" component={() => <Home/>} />
          <Route path="/sidebar" component={() => <Sidebar/>} />          
          <Route path="/credit-memos-home" component={() => <CreditMemosHome resizeMainHeader = {this.resizeMainHeader}/>} />                 
        </React.Fragment>                
      </Router>
    </Window>
  }
}
