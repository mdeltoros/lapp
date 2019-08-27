import React, { Component } from 'react';
import styled from 'styled-components';
import { 
    theme, Label, HorizontalTab, FlatButton, TextInput, PaperPlaneIcon, Badge,
    XIcon, CalendarIcon, PulseIcon, MoneyIcon, DocumentIcon, OrderIcon, ContactIcon, HeadsetIcon, ClipboardIcon, XCircledIcon, CheckCircledIcon, CommentIcon, DocumentDraftIcon, DownloadIcon, ArrowShareIcon
} from 'cs-reusable-component-library-exporter';

const SidePanel = styled.div`    
    height: 100vh;
    width: 350px;
    max-width: 350px;
    /* padding: 16px 32px 0 32px; */
    position: fixed;    
    top: 0;
    right: ${props => props.open ? '0' : '-350px' };
    z-index: 1000;
    background-color: ${props => props.theme.white};
    box-shadow: -1px 0 4px 0 ${props => props.theme.shadow};
    /* overflow-y: scroll; */
    /* transition: right 0.3s; */
    box-sizing: border-box;
`;

const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    border-bottom: solid 1px ${props => props.theme.grey};
    padding: 16px 32px;
    width: calc(350px - 64px);
    position: fixed;
    background: ${props => props.theme.white};
    z-index: 10;
`;

const Invoice = styled.div`
    display: flex;
    flex-direction: column;
`;

const XWrapper = styled.span`
    cursor: pointer;
    margin-left: auto;    
    height: 12px;
`;

const TabWrapper = styled.div`
    display: flex;
    top: 73px; /* height of header + border */
    border-bottom: solid 1px ${props => props.theme.grey};
    padding: 24px 32px 0 32px;
    width: calc(350px - 64px);
    position: fixed;
    background: ${props => props.theme.white};
    z-index: 10;
    div:not(:first-child){
        margin-left: 32px;
    }
`;

const SidePanelContent = styled.div`
    position: relative;
    top: calc(73px + 73px); /* height of header + tabs + borders */
    overflow-y: auto;
    height: calc(100% - 73px - 73px - 76px); /* height of (header + tabs + borders) + footer*/

    &.activity {
        height: calc(100% - 73px - 73px); /* height of (header + tabs + borders) - footer*/
    }
`;

const DetailsWrapper = styled.div``;

const DetailsGrid = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 32px 24px 32px;
    border-bottom: solid 1px ${props => props.theme.grey};
`;

const FilesWrapper = styled.div`
    margin: 24px 0;
    padding: 0 32px;
    /* max-height: 140px; */
    /* overflow-y: auto; */
    /* margin-right: 8px; */
    .files-upload {
        margin-top: 0;
        align-items: center;
    }
`;

const Files = styled.div`
    margin-left: calc(32px + 84px + 24px);
    width: calc(350px - 140px - 64px);
    &.activity-files {
        width: auto;
        margin: 0;
    }
    p {
        padding-top: 8px;
        color: ${props => props.theme.blue};
        font-weight: 600;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        cursor: pointer;
    }
`

const DetailsRow = styled.div`
    display: flex;
    svg{ margin-right: 16px; }
    margin-top: 24px;

    div svg {
        margin-right: 8px; 
    }
`;


const GreyP = styled.p`
    color: ${props => props.theme.darkGrey};
`;

const DetailsLabel = styled.p`
    color: ${props => props.theme.darkGrey};
    width: 84px;
    margin-right: 24px;
    white-space: nowrap;
`;

const DetailsValue = styled.p`
    width: calc(350px - 140px - 64px);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`

const ApprovalContainer = styled.div`
    display: flex;
    padding: 24px 32px;
    border-top: solid 1px ${props => props.theme.grey};
    position: fixed;
    bottom: 0;
    background: ${props => props.theme.white};
    width: calc(350px - 64px);
    div:first-child{
        margin-right: 24px;
    }
    /* div:last-child{
        margin-right: auto;
    } */
`;

const ActivityWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const ReplyBox = styled.div`
    display: flex;
    cursor: pointer;
    padding: 32px;
    border-bottom: solid 1px ${props => props.theme.grey};
`;

const ReplyInputContainer = styled.div`
    display: flex;
    flex-direction: column;  
    border-bottom: solid 1px ${props => props.theme.grey};
    padding: 32px;
`;

const ReplyInputButtons = styled.div`
    display: flex;
    padding-top: 8px;
    div:first-child{
        margin-left: auto;
    }
    div:last-child{
        margin-left: 32px;
    }
`;

const RepliesContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ReplyContainer = styled.div`
    display: flex;
    margin-top: 32px;
    padding: 0 32px 24px 32px;
    border-bottom: solid 1px ${props => props.theme.grey};
`;

const ExtendBadge = styled(Badge)`
    margin-top: 20px;
`

const ReplyInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - 40px - 16px); /* subtract width of badge and margin */
    margin-left: 16px;
`;

const Reply = styled.p`    
    width: 200px;    
`;

const ReplyTimestamp = styled.div`
    display: flex;
    p:first-child{
        margin-right: auto;
    }
`;

const TimestampText = styled.p`
    color: ${props => props.theme.darkGrey};
`;

const IconWrapper = styled.span`
    margin: 0 8px;
`;

const details = <DetailsWrapper>
    <DetailsGrid>
        <DetailsRow>
            <ArrowShareIcon dims = {16}/>
            <DetailsLabel>Submitted By</DetailsLabel>
            <DetailsValue>Annie Archibald test long name</DetailsValue>
        </DetailsRow>
        <DetailsRow>
            <CalendarIcon dims = {16}/>
            <DetailsLabel>Date</DetailsLabel>
            <DetailsValue>Jul 1, 2019</DetailsValue>
        </DetailsRow>
        <DetailsRow>
            <PulseIcon dims = {16}/>
            <DetailsLabel>Status</DetailsLabel>
            <DetailsValue>Pending Approval</DetailsValue>
        </DetailsRow>
        <DetailsRow>
            <MoneyIcon dims = {16}/>
            <DetailsLabel>Credit</DetailsLabel>
            <DetailsValue>$2500.00</DetailsValue>
        </DetailsRow>
        <DetailsRow>
            <DocumentIcon dims = {16}/>
            <DetailsLabel>Reason</DetailsLabel>
            <DetailsValue>Customer Courtesy</DetailsValue>
        </DetailsRow>
        <DetailsRow>
            <OrderIcon dims = {16}/>
            <DetailsLabel>Order</DetailsLabel>
            <DetailsValue>8877665</DetailsValue>
        </DetailsRow>
        <DetailsRow>
            <ContactIcon dims = {16}/>
            <DetailsLabel>Customer</DetailsLabel>
            <DetailsValue>Acme Food Sales</DetailsValue>
        </DetailsRow>
        <DetailsRow>
            <HeadsetIcon dims = {16}/>
            <DetailsLabel>SCA</DetailsLabel>
            <DetailsValue>Juan Mendoza</DetailsValue>
        </DetailsRow>
        <DetailsRow>
            <ClipboardIcon dims = {16}/>
            <DetailsLabel>CDM</DetailsLabel>
            <DetailsValue>Annie Archibald</DetailsValue>
        </DetailsRow>        
    </DetailsGrid>
    <FilesWrapper>
        <DetailsRow className="files-upload">
            <DocumentDraftIcon dims = {16}/>
            <DetailsLabel>Attachments</DetailsLabel>
            <FlatButton left = {<DownloadIcon rotate={180}/>}>Upload</FlatButton>
        </DetailsRow>
        <Files>
            <p>emails.pdf</p>
            <p>invoice.pdf</p>
            <p>long-file-name-test.pdf</p>
            <p>long-file-name-test.pdf</p>
            <p>long-file-name-test.pdf</p>
            <p>invoice.pdf</p>
            <p>invoice.pdf</p>
        </Files>
    </FilesWrapper>
    <ApprovalContainer>
        <FlatButton left = {<XCircledIcon/>}>Decline</FlatButton>
        <FlatButton left = {<CheckCircledIcon/>}>Approve</FlatButton>
    </ApprovalContainer>
</DetailsWrapper>;

const activity = (editMode, replyClicked, cancelReply, postReply, ref) => {
    return <ActivityWrapper>        
        {
            editMode ?     
            <ReplyInputContainer>
                <TextInput value = '' inputRef = {ref} placeholder='Reply' onEnter = {postReply}></TextInput>
                <ReplyInputButtons>
                    <FlatButton onClick = {cancelReply}>Cancel</FlatButton>
                    <FlatButton left = {<PaperPlaneIcon/>} onClick = {() => postReply('input value')}>Post</FlatButton>{/*Update With Reference To Input Value*/}
                </ReplyInputButtons>
            </ReplyInputContainer>
            :
            <ReplyBox onClick = {replyClicked}>
                <IconWrapper><CommentIcon dims={20}/></IconWrapper>
                <GreyP>Reply...</GreyP>
            </ReplyBox>
        }
        <RepliesContainer>
            <ReplyContainer>
                <ExtendBadge icon = {<DocumentDraftIcon/>} baseColor = {theme.blue} dims = {40}></ExtendBadge>                
                <ReplyInfo>                    
                    <GreyP>Annie Archibald</GreyP>
                    <Reply>Uploaded attachments</Reply>
                    <Files className="activity-files">
                        <p>emails.pdf</p>
                        <p>invoice.pdf</p>
                        <p>long-file-name-test.pdf</p>
                        <p>long-file-name-test.pdf</p>
                        <p>long-file-name-test.pdf</p>
                        <p>invoice.pdf</p>
                        <p>invoice.pdf</p>
                    </Files>
                    <ReplyTimestamp>
                        <TimestampText>7/22/2019</TimestampText>
                        <TimestampText>5 seconds ago</TimestampText>
                </ReplyTimestamp>
                </ReplyInfo>                
            </ReplyContainer>
            <ReplyContainer>
                <ExtendBadge icon = {<CommentIcon/>} baseColor = {theme.blue} dims = {40}></ExtendBadge>                
                <ReplyInfo>                    
                    <GreyP>Max Moss</GreyP>
                    <Reply>This is too much money, but I'll approve it just this once.</Reply>
                    <ReplyTimestamp>
                        <TimestampText>7/22/2019</TimestampText>
                        <TimestampText>5 seconds ago</TimestampText>
                </ReplyTimestamp>
                </ReplyInfo>                
            </ReplyContainer>
            <ReplyContainer>
                <ExtendBadge icon = {<CommentIcon/>} baseColor = {theme.blue} dims = {40}></ExtendBadge>                
                <ReplyInfo>                    
                    <GreyP>Max Moss</GreyP>
                    <Reply>This is too much money, but I'll approve it just this once.</Reply>
                    <ReplyTimestamp>
                        <TimestampText>7/22/2019</TimestampText>
                        <TimestampText>5 seconds ago</TimestampText>
                </ReplyTimestamp>
                </ReplyInfo>                
            </ReplyContainer>
            <ReplyContainer>
                <ExtendBadge icon = {<CommentIcon/>} baseColor = {theme.blue} dims = {40}></ExtendBadge>                
                <ReplyInfo>                    
                    <GreyP>Max Moss</GreyP>
                    <Reply>This is too much money, but I'll approve it just this once.</Reply>
                    <ReplyTimestamp>
                        <TimestampText>7/22/2019</TimestampText>
                        <TimestampText>5 seconds ago</TimestampText>
                </ReplyTimestamp>
                </ReplyInfo>                
            </ReplyContainer>
            <ReplyContainer>
                <ExtendBadge icon = {<CommentIcon/>} baseColor = {theme.blue} dims = {40}></ExtendBadge>                
                <ReplyInfo>                    
                    <GreyP>Max Moss</GreyP>
                    <Reply>This is too much money, but I'll approve it just this once.</Reply>
                    <ReplyTimestamp>
                        <TimestampText>7/22/2019</TimestampText>
                        <TimestampText>5 seconds ago</TimestampText>
                </ReplyTimestamp>
                </ReplyInfo>                
            </ReplyContainer>
            <ReplyContainer>
                <ExtendBadge icon = {<CommentIcon/>} baseColor = {theme.blue} dims = {40}></ExtendBadge>                
                <ReplyInfo>                    
                    <GreyP>Max Moss</GreyP>
                    <Reply>This is too much money, but I'll approve it just this once.</Reply>
                    <ReplyTimestamp>
                        <TimestampText>7/22/2019</TimestampText>
                        <TimestampText>5 seconds ago</TimestampText>
                </ReplyTimestamp>
                </ReplyInfo>                
            </ReplyContainer>
        </RepliesContainer>
    </ActivityWrapper>;
};

export default class extends Component {

    constructor(props){
        super(props);
        this.replyInputRef = React.createRef();
        this.tabs = ['details', 'activity'];
        this.state = {
            credit: null,
            currentTab: this.tabs[0],
            editMode: false,
            focusReply: false
        };
        this.selectTab = this.selectTab.bind(this);
        this.renderTabContent = this.renderTabContent.bind(this);
        this.cancelReply = this.cancelReply.bind(this);
        this.replyClicked = this.replyClicked.bind(this);
        this.postReply = this.postReply.bind(this);        
    }    

    renderTabContent(tab){
        switch(tab){
            case 'details': return details;
            case 'activity': return activity(this.state.editMode, this.replyClicked, this.cancelReply, this.postReply, this.replyInputRef);
            default: return null;
        }
    }

    selectTab(tab){
        this.setState({currentTab: tab});
    }    

    replyClicked(){
        this.setState({
            editMode: true,
            focusReply: true
        });
    }

    cancelReply(){
        this.setState({editMode: false});
    }

    postReply(reply){
        console.log(reply);
        this.setState({editMode: false});
        //if this is reused for post button only blur if text input is focused
        this.replyInputRef.current.blur();        
    }

    componentDidUpdate(){
        if(this.state.editMode && this.state.focusReply){
            this.replyInputRef.current.focus();
            this.setState({focusReply: false});
        }
    }

    render() {        
        return <SidePanel open = {this.props.credit}>
            <HeaderWrapper>
                <Invoice>
                    <Label>Invoice</Label>
                    <h3>T12345</h3>
                </Invoice>
                <XWrapper onClick = {this.props.closeSidePanel}><XIcon dims = {12}/></XWrapper>
            </HeaderWrapper>
            <TabWrapper>
            {this.tabs.map(t => {
                return <HorizontalTab key = {t} onClick = {() => this.selectTab(t)} active = {t===this.state.currentTab}>{t}</HorizontalTab>
            })}
            </TabWrapper>   
            <SidePanelContent className={this.state.currentTab}>
                {this.renderTabContent(this.state.currentTab)}                            
            </SidePanelContent>
        </SidePanel>
    }
};