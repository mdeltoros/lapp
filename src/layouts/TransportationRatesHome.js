import React, { Component } from 'react';
import styled from 'styled-components';
import { ContextMenu, Badge, theme, PrimaryButton, FlatButton, ClockIcon, Modal, Snackbar } from 'cs-reusable-component-library-exporter';
import Sidebar from './Sidebar';

const ratesMenu = {
  groups: [
      {
      header: '',
      listItems: [
        { 
          value: 'option 1'
        },
        { 
          value: 'option 2'
        }
      ]
      }
  ]
};

const retailers = ["Walmart", "Sam's Club"];

const ModalContent = styled.div`
  a {
    color: ${props => props.theme.blue};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

const Home = styled.div`
    padding: 40px;
    display: grid;
    grid-template-columns: 222px 1fr;
    grid-template-areas: "sidebar main";
    grid-column-gap: 40px;
    height: 100%;
    position: relative;
    top: 72px;
`

const RatesHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 56px; 
  width: calc(100vw - 80px - 40px - 222px); /* page padding + grid column gap + sidebar */
  position: relative;
`

const Title = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  p {
    color: ${props => props.theme.darkGrey};
  }
`

const ExtendBlanketIncButton = styled(PrimaryButton)`
  margin-left: 16px;
`

const Main = styled.div`
  grid-area: main;
  position: relative;
`

const RetailerCards = styled.div`
`

const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  
`

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  `

const CardActive = styled.div`
  padding: 0 24px;
  height: 76px;
  box-shadow: 0 1px 4px 0 #9b9b9b80;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:last-child{
    margin-bottom: 56px;
  }
  &:hover {
    .subheader {
      text-decoration: underline;
    }
  }
`

const CardPending = styled(CardActive)``

const CardEmpty = styled.p`
  color: ${props => props.theme.darkGrey};
  margin-bottom: 56px;
`

const Desc = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-template-rows: 24px 20px;
  grid-template-areas: "icon title"
                       "icon update";
  grid-row-gap: 2px;
  grid-column-gap: 24px;
  margin-right: auto;
  align-items: center;
  .subheader {
    grid-area: title;
  }
  .last-updated {
    grid-area: update;
    color: ${props => props.theme.darkGrey}
  }
`
const ExtendBadge = styled(Badge)`
  grid-area: icon;
`

const ExtendMenu = styled(ContextMenu)`
 margin-right: 16px;
  + div {
    left: -98px !important;
  }
`


export default class extends Component {
  constructor (props) {
    super(props);
    this.state = {      
      snackbarShow: false,
      supplyModalProps : {
        cancelModal: 
          {  
            size: 'small',
            clear: true,  
            content: <ModalContent><p>Are you sure?</p></ModalContent>,
            header: 'Cancel pending Walmart increase',
            text: 'Cancel Increase',
            func: this.closeModal,
            textFlat: 'Close',
            funcFlat: this.closeModal
          },
        editModal: 
          {
            size: 'small',
            clear: true,  
            content: 
              <ModalContent>
                <p>There's already an <a href="/">existing pending Walmart edit</a>. If you continue, we'll cancel it.</p>
              </ModalContent>,
            header: 'Existing pending Walmart Edit',
            text: 'Cancel Existing and Continue',
            func: this.closeModal,
            textFlat: 'Close',
            funcFlat: this.closeModal
          }
      },
      cardMenu: {
        groups: [
          {
          header: '',
          listItems: [
            { 
              value: 'Cancel',
              type: 'destructive',
              onClick: this.onMenuCancelClick
            }
          ]
          }
        ]
      }
    };
    this.setModal = this.setModal.bind(this);    
    this.closeModal = this.closeModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  setModal = (modalKey) =>{    
    this.setState((prevState)=>{      
        return {currentModal: prevState.supplyModalProps[modalKey]};
      }      
    )
  }

  onEditClick = () => { // open edit modal
    this.setModal('editModal');        
  }
  
  onMenuCancelClick = () => { // open cancel modal
    this.setModal('cancelModal');    
  }

  closeModal = (e) => { // change state to close modal
    this.setState({
      currentModal: false
    }, (e)=> console.log(this.state));    
  }

  handleClick = (content) =>{    
    this.setState({snackbarShow: true, snackbarContent: content});    
    setTimeout(() => this.setState({snackbarShow: false}), 3000);
  }

  render() {
    return <Home>   
        <Sidebar/>     
        <Main>
          <RatesHeader>
            <Title>
              <h3>Transportation Rates</h3>
              <p>{`1`} active program</p>
            </Title>
            <ExtendMenu menuOptions={ratesMenu} menuPlacement={"left"}/>
            <ExtendBlanketIncButton disabled = {false} onClick={() => this.handleClick('Blanketting')}>Blanket Increase</ExtendBlanketIncButton>
          </RatesHeader>
          <RetailerCards>
            {retailers.map(i => {
              return <CardSection>
                <SectionHeader>
                  <p className="subheader">{i}</p>
                  <FlatButton onClick = {this.onEditClick}>Edit</FlatButton>
                </SectionHeader>
                <CardActive>
                  <Desc>
                    <ExtendBadge baseColor = {theme.grey} fontColor={theme.darkGrey} dims={40}>WA</ExtendBadge>
                    <p className="subheader">Active rates</p>
                    <p className="last-updated">last updated {`94`} days ago</p>
                  </Desc>
                  <ContextMenu menuOptions={this.state.cardMenu} menuPlacement={"left"}/>
                </CardActive>
                { true ? 
                  <CardPending>
                    <Desc>
                      <ExtendBadge icon={<ClockIcon/>} baseColor = {theme.darkGrey} dims={40}>WA</ExtendBadge>
                      <p className="subheader">Pending {`4.65%`} increase</p>
                      <p className="last-updated">on {`Jul 3, 2019`}</p>
                    </Desc>
                    <ContextMenu menuOptions={this.state.cardMenu} menuPlacement={"left"}/>
                  </CardPending>
                : "" }
                { false ?
                  <CardEmpty>no rates</CardEmpty> 
                : "" }
              </CardSection>
            })}
          </RetailerCards>
        </Main>        
        {this.state.currentModal ? <Modal rootID = 'app' size = {this.state.currentModal.size} clear = {this.state.currentModal.clear} content = {this.state.currentModal.content} modalOpened = {this.state.currentModal} header = {this.state.currentModal.header} flatButton =  {{text: this.state.currentModal.textFlat, func: this.state.currentModal.funcFlat}} primaryButton = {{text: this.state.currentModal.text, func: this.state.currentModal.func}} closeHook = {this.closeModal}></Modal>: null}
        <Snackbar rootID = 'app' spinner={true} showSnackbar = {this.state.snackbarShow}>{this.state.snackbarContent}</Snackbar>
    </Home>
  }
}