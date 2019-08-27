import React, { Component } from 'react';
import styled from 'styled-components';
import { ContextMenu, theme, PrimaryButton, CheckCircledIcon, XCircledIcon, PencilIcon, PlusCircledIcon, Modal, Checkbox, AngleIcon, Tooltip } from 'cs-reusable-component-library-exporter';
import SidePanel from './SidePanel';

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
    position: relative;
    top: 72px;
    background-color:  ${props => props.theme.white};
    height: calc(100vh - 72px - 80px);
`

const MemoHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px; 
  width: auto;
  position: fixed;
  z-index: 100;
  width: ${props =>
    Number.isInteger(props.selectedCredit) ?
    'calc(100% - 80px - 350px)' 
    : 'calc(100% - 80px)'
  };
`

const Title = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  p {
    color: ${props => props.theme.darkGrey};
  }
`
const Selected = styled.p`
  color: ${props => props.theme.darkGrey};
  font-style: italic;
  margin-right: 24px;
`

const ExtendCreateButton = styled(PrimaryButton)`
  margin-left: 16px;
`

const Main = styled.div`
  position: relative;
`

const ExtendMenu = styled(ContextMenu)`
 margin-right: 16px;
  + div {
    left: -98px !important;
  }
`

const TableContainer = styled.div`
    top: 84px; /* height of totals header + margin bottom */
    position: relative;
`

const ExtendCheckbox = styled(Checkbox)`
  margin-right: 24px;
`
const TableHeaderRow = styled.div`
  display: grid;
  grid-template-columns: ${props =>
    Number.isInteger(props.selectedCredit) ?
    '204px 88px 88px 147px 80px 75px 32px' 
    : '204px 88px 88px 147px 80px 75px 160px 147px'
  };
  width: ${props => Number.isInteger(props.selectedCredit) ? 'calc(100vw - 128px - 350px)' : 'calc(100% - 128px)' };
  grid-column-gap: 24px;
  color: ${props => props.theme.darkGrey};
  border-bottom: 1px solid ${props => props.theme.mediumGrey};
  padding: 0 24px;
  grid-template-rows: 32px;
  align-items: start;
  justify-content: space-between;
  position: fixed;
  overflow: hidden;
   p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
    padding-right: 8px;
    user-select: none;
   }
   div {
    display: flex;
    align-items: center;
    white-space: nowrap;
      label span {
        top: 0;
      }
      &:nth-child(7) {
        visibility: ${ props =>
          Number.isInteger(props.selectedCredit) ?  
          'hidden'
          : 'visible'
        }
      }
      &:nth-child(8) {
        display: ${ props =>
          Number.isInteger(props.selectedCredit) ?  
          'none'
          : 'flex'
        }
      }
   }
   svg {
    position: relative;
    padding-top: 8px;
    cursor: pointer;
    height: 20px;
    box-sizing: border-box;
   }
   div:nth-child(3) {
    justify-content: flex-end;
   }
`

const Header = styled.div`
  &:hover {
    cursor: pointer;
    p {
      color: ${props => props.theme.black};
    }
    svg {
      fill: ${props => props.theme.black};
    }
  }
  .angle-up {
    padding-top: 0;
  }
`

const TableContent = styled.div`
  position: relative;
  top: 33px; /* 32px from fixed header + 1px for header border */
  height: calc(100vh - 72px - 40px - 84px - 33px - 40px);
  overflow: hidden auto; /* horizontal scroll hidden, need to confirm with ux */
  margin: 0 -40px 0 -8px;
  padding: 0 32px 0 8px;
  width: ${props => Number.isInteger(props.selectedCredit) ? 'calc(100vw - 72px - 350px)' : 'calc(100vw - 72px)' };
`

const TableRow = styled.div`
  display: grid;
  grid-template-columns: ${props =>
    Number.isInteger(props.selectedCredit) ?
    '204px 88px 88px 147px 80px 75px 32px' 
    : '204px 88px 88px 147px 80px 75px 160px 147px'
  };
  grid-column-gap: 24px;
  border-bottom: 1px solid ${props => props.theme.mediumGrey};
  padding: 0 24px;
  grid-template-rows: 56px;
  align-items: center;
  justify-content: space-between;
  /* overflow: hidden; */ /* hides context menu */

   &.selected{
     background-color: ${props => props.theme.lightGrey};
     .hover-show {
      display: block;
    }
   }
   .flex-align,
   .text-right + div {
    display: flex;
    align-items: center;
    white-space: nowrap;
   }

  p {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  }
  .text-right {
    text-align: right;
  }
  label span {
    top: 0;
  }

  .hover-show {
    display: none;
    justify-self: flex-end;
  }

  &:hover {
    box-shadow: 0 2px 4px 0 #0000004c;
    cursor: pointer;
    .hover-hide {
      display: none;
    }
    .hover-show {
      display: block;
      justify-self: flex-end;
    }
    .tooltip {
      overflow: visible;
    }
  }
`

class CellToolTip extends Component{
  constructor(props){
    super(props);
    this.textWidth = React.createRef();
    this.state = {
      overflown: false
    };
  }

  componentDidMount(){
    if(this.textWidth.current.scrollWidth > 147){
      this.setState({overflown: true});
    }
  }

  render(){
    return <React.Fragment>      
      {this.state.overflown ? <Tooltip 
          placement="top" 
          hoverElement={<p><span>{this.props.row.Customer}</span></p>} 
          text={this.props.row.Customer} 
          hoverArea={this.props.hoverArea}>
      </Tooltip> : <p ref={this.textWidth} ><span>{this.props.row.Customer}</span></p>}        
    </React.Fragment>
  }
}

export default class extends Component {
  constructor (props) {
    const MemoCount = 5; //test value
    super(props);
    this.textWidth = React.createRef();
    this.state = {      
      sortColumn: false,
      snackbarShow: false,
      selectedCredit: false,
      supplyModalProps : {
        declineModal: 
          {  
            size: 'small',
            clear: true,  
            content: <ModalContent><p>You are about to decline this credit memo.</p></ModalContent>,
            header: 'Are you sure?',
            text: 'Decline',
            func: this.closeModal,
            textFlat: 'Cancel',
            funcFlat: this.closeModal
          },
        approveModal: 
          {
            size: 'small',
            clear: true,  
            content: 
              <ModalContent>
                <p>You are about to approve this credit memo.</p>
              </ModalContent>,
            header: 'Are you sure?',
            text: 'Approve',
            func: this.closeModal,
            textFlat: 'Cancel',
            funcFlat: this.closeModal
          },
        batchDeclineModal: 
          {  
            size: 'small',
            clear: true,  
            content: 
              <ModalContent>
                <p>You are about to decline {MemoCount} credit memo{MemoCount > 1 ? 's' : ''}.</p>
              </ModalContent>,
            header: 'Are you sure?',
            text: 'Decline',
            func: this.closeModal,
            textFlat: 'Cancel',
            funcFlat: this.closeModal
          },
        batchApproveModal: 
          {
            size: 'small',
            clear: true,  
            content: 
              <ModalContent>
                <p>You are about to approve {MemoCount} credit memo{MemoCount > 1 ? 's' : ''}.</p>
              </ModalContent>,
            header: 'Are you sure?',
            text: 'Approve',
            func: this.closeModal,
            textFlat: 'Cancel',
            funcFlat: this.closeModal
          }
      },
      batchMemoMenu: {
        groups: [
          {
            header: '',
            listItems: [
              { 
                icon: <CheckCircledIcon />,
                value: 'Approve',
                onClick: this.onBatchMenuApproveClick
              },
              { 
                icon: <XCircledIcon />,
                value: 'Decline',
                type: 'destructive',
                onClick: this.onBatchMenuDeclineClick
              },
              { 
                icon: <PencilIcon />,
                value: 'Edit'
              }
            ]
          }
        ]
      },
      memoMenu: {
        groups: [
          {
            header: '',
            listItems: [
              { 
                icon: <CheckCircledIcon />,
                value: 'Approve',
                onClick: this.onMenuApproveClick
              },
              { 
                icon: <XCircledIcon />,
                value: 'Decline',
                type: 'destructive',
                onClick: this.onMenuDeclineClick
              },
              { 
                icon: <PencilIcon />,
                value: 'Edit'
              }
            ]
          }
        ]
      },
      memosRow: [
        {
          'Submitted By': 'David Stewart',
          Date: 'Jul 10, 2019',
          Credit: '$5000.00',
          Customer: 'PopChips',
          'Invoice #': '1234567',
          'Order #': '8877665',
          Status: 'Awaiting Finance',
          Reason: 'CaseStack Error'
        },
        {
          'Submitted By': 'Annie Archibald test long nameeeee',
          Date: 'Jul 10, 2019',
          Credit: '$99,999.00',
          Customer: 'PopChips',
          'Invoice #': '1234567',
          'Order #': '8877665',
          Status: 'Awaiting Finance',
          Reason: 'CaseStack Error'
        },
        {
          'Submitted By': 'Malia Smith',
          Date: 'Jul 10, 2019',
          Credit: '$5000.00',
          Customer: 'PopChips test long Customer',
          'Invoice #': '1234567',
          'Order #': '8877665',
          Status: 'Awaiting FinanceOOOOOOOOOOOOOO',
          Reason: 'CaseStack ErrorOOOOOOOOOOOOOOO'
        },
        {
          'Submitted By': 'David Stewart',
          Date: 'Jul 10, 2019',
          Credit: '$5000.00',
          Customer: 'PopChips',
          'Invoice #': '1234567',
          'Order #': '8877665',
          Status: 'Awaiting Finance',
          Reason: 'CaseStack Error'
        },
        {
          'Submitted By': 'Annie Archibald test long nameeeee',
          Date: 'Jul 10, 2019',
          Credit: '$99,999.00',
          Customer: 'PopChips',
          'Invoice #': '1234567',
          'Order #': '8877665',
          Status: 'Awaiting Finance',
          Reason: 'CaseStack Error'
        },
        {
          'Submitted By': 'Malia Smith',
          Date: 'Jul 10, 2019',
          Credit: '$5000.00',
          Customer: 'PopChips test long Customer',
          'Invoice #': '1234567',
          'Order #': '8877665',
          Status: 'Awaiting FinanceOOOOOOOOOOOOOO',
          Reason: 'CaseStack ErrorOOOOOOOOOOOOOOO'
        },
        {
          'Submitted By': 'David Stewart',
          Date: 'Jul 10, 2019',
          Credit: '$5000.00',
          Customer: 'PopChips',
          'Invoice #': '1234567',
          'Order #': '8877665',
          Status: 'Awaiting Finance',
          Reason: 'CaseStack Error'
        },
        {
          'Submitted By': 'Annie Archibald test long nameeeee',
          Date: 'Jul 10, 2019',
          Credit: '$99,999.00',
          Customer: 'PopChips',
          'Invoice #': '1234567',
          'Order #': '8877665',
          Status: 'Awaiting Finance',
          Reason: 'CaseStack Error'
        },
        {
          'Submitted By': 'Malia Smith',
          Date: 'Jul 10, 2019',
          Credit: '$5000.00',
          Customer: 'PopChips test long Customer',
          'Invoice #': '1234567',
          'Order #': '8877665',
          Status: 'Awaiting FinanceOOOOOOOOOOOOOO',
          Reason: 'CaseStack ErrorOOOOOOOOOOOOOOO'
        },
        {
          'Submitted By': 'David Stewart',
          Date: 'Jul 10, 2019',
          Credit: '$5000.00',
          Customer: 'PopChips',
          'Invoice #': '1234567',
          'Order #': '8877665',
          Status: 'Awaiting Finance',
          Reason: 'CaseStack Error'
        },
        {
          'Submitted By': 'Annie Archibald test long nameeeee',
          Date: 'Jul 10, 2019',
          Credit: '$99,999.00',
          Customer: 'PopChips',
          'Invoice #': '1234567',
          'Order #': '8877665',
          Status: 'Awaiting Finance',
          Reason: 'CaseStack Error'
        },
        {
          'Submitted By': 'Malia Smith',
          Date: 'Jul 10, 2019',
          Credit: '$5000.00',
          Customer: 'PopChips test long Customer',
          'Invoice #': '1234567',
          'Order #': '8877665',
          Status: 'Awaiting FinanceOOOOOOOOOOOOOO',
          Reason: 'CaseStack ErrorOOOOOOOOOOOOOOO'
        },
        {
          'Submitted By': 'David Stewart',
          Date: 'Jul 10, 2019',
          Credit: '$5000.00',
          Customer: 'PopChips',
          'Invoice #': '1234567',
          'Order #': '8877665',
          Status: 'Awaiting Finance',
          Reason: 'CaseStack Error'
        },
        {
          'Submitted By': 'Annie Archibald test long nameeeee',
          Date: 'Jul 10, 2019',
          Credit: '$99,999.00',
          Customer: 'PopChips',
          'Invoice #': '1234567',
          'Order #': '8877665',
          Status: 'Awaiting Finance',
          Reason: 'CaseStack Error'
        },
        {
          'Submitted By': 'Last Malia Smith',
          Date: 'Jul 10, 2019',
          Credit: '$5000.00',
          Customer: 'PopChips test long Customer',
          'Invoice #': '1234567',
          'Order #': '8877665',
          Status: 'Awaiting FinanceOOOOOOOOOOOOOO',
          Reason: 'CaseStack ErrorOOOOOOOOOOOOOOO'
        }
      ],
      hoverArea: {
        height: '100%',
        width: 'auto'
      }
    };
    this.setModal = this.setModal.bind(this);    
    this.closeModal = this.closeModal.bind(this);
  }

  onSortClick = (e) => {
    this.setState( {
      sortColumn: !this.state.sortColumn
    }, (e)=> console.log(this.state));
  }

  setModal = (modalKey) =>{    
    this.setState((prevState)=>{      
        return {currentModal: prevState.supplyModalProps[modalKey]};
      }      
    )
  };

  onMenuApproveClick = () => { // open approve modal
    this.setModal('approveModal');        
  };
  
  onMenuDeclineClick = () => { // open decline modal
    this.setModal('declineModal');    
  };

  onBatchMenuApproveClick = () => { // open batch approve modal
    this.setModal('batchApproveModal');        
  };
  
  onBatchMenuDeclineClick = () => { // open batch decline modal
    this.setModal('batchDeclineModal');    
  };

  closeModal = (e) => { // change state to close modal
    this.setState({currentModal: false});
    this.props.resizeMainHeader(false);
  };

  selectCredit = (credit) =>{
    this.setState({
      selectedCredit: credit
    });
    //this.props.resizeMainHeader(true);//uncommenting this will allow the header to shrink properly but the side panel won't update
  };

  closeSidePanel = () => {
    this.setState({selectedCredit: null})
  };

  render() {
    return <Home>        
        <Main>
          <MemoHeader selectedCredit = {this.state.selectedCredit}>
            <Title>
              <h3>Open credit memos</h3>
              <p>$7650.00 total</p>
            </Title>
            <Selected>3 selected</Selected>
            <ExtendMenu menuOptions={this.state.batchMemoMenu} menuPlacement={"left"}/>
            <ExtendCreateButton left = {<PlusCircledIcon />} disabled = {false}>Create</ExtendCreateButton>
          </MemoHeader>
          <TableContainer>
            <TableHeaderRow selectedCredit = {this.state.selectedCredit}>
              <Header>
                <ExtendCheckbox />
                <p>{Object.keys(this.state.memosRow[0])[0]}</p>
                {
                    this.state.sortColumn === false ? 
                    <AngleIcon dims = {'10'}/> 
                    : this.state.sortColumn === true ? 
                    <AngleIcon className="angle-up" dims = {'10'} rotate = {'180'} /> 
                    : null 
                }
              </Header>
              { Object.keys(this.state.memosRow[0]).slice(1, Object.keys(this.state.memosRow[0]).length).map((header, index) => {
                return <Header onClick={this.onSortClick} className = {this.state.selectedCredit === index ? 'selected' : ''}>
                  <p>{header}</p>
                  {
                    this.state.sortColumn === false ? 
                    <AngleIcon dims = {'10'}/> 
                    : this.state.sortColumn === true ? 
                    <AngleIcon className="angle-up" dims = {'10'} rotate = {'180'} /> 
                    : null 
                  }
                </Header>
              })}
            </TableHeaderRow>
            <TableContent selectedCredit = {this.state.selectedCredit}>
              { this.state.memosRow.map((row, index) => {
                return <TableRow className = {this.state.selectedCredit === index ? 'selected' : ''} onClick = {() => {this.selectCredit(index)}} selectedCredit = {this.state.selectedCredit}>
                  <div className="flex-align">
                    <ExtendCheckbox onChange={this.handleChange}/>
                    <p>{row[Object.keys(row)[0]]}</p>
                  </div>
                  <p>{row.Date}</p>  
                  <p className="text-right">{row.Credit}</p>                    
                  <CellToolTip row = {row} hoverArea = {this.state.hoverArea}></CellToolTip>                  
                  <p>{row[Object.keys(row)[4]]}</p>                
                  <p>{row[Object.keys(row)[5]]}</p> 
                  {
                    Number.isInteger(this.state.selectedCredit) ? 
                    null 
                    : <p>{row.Status}</p>  
                  }
                  {
                    Number.isInteger(this.state.selectedCredit) ? 
                    null 
                    : <p className="hover-hide">{row.Reason}</p> 
                  }
                  <ExtendMenu className="hover-show" menuOptions={this.state.memoMenu} menuPlacement={"left"} onClick={this.handleChange}/>
                </TableRow>
              })}
            </TableContent>
            <SidePanel credit = {Number.isInteger(this.state.selectedCredit)} closeSidePanel = {this.closeSidePanel}/>
          </TableContainer>
        </Main>        
        {this.state.currentModal ? <Modal rootID = 'app' size = {this.state.currentModal.size} clear = {this.state.currentModal.clear} content = {this.state.currentModal.content} modalOpened = {this.state.currentModal} header = {this.state.currentModal.header} flatButton =  {{text: this.state.currentModal.textFlat, func: this.state.currentModal.funcFlat}} primaryButton = {{text: this.state.currentModal.text, func: this.state.currentModal.func}} closeHook = {this.closeModal}></Modal>: null}
    </Home>
  }
}