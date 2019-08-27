import React, { Component } from 'react';
import styled from 'styled-components';
import { opacify, theme, Label, InProgressIcon, MoneyIcon, DocumentIcon, TruckIcon, WarehouseIcon, ContactIcon, GearIcon } from 'cs-reusable-component-library-exporter';


const ExtendLabel = styled(Label)`
  margin-bottom: 8px;  
`;

const SidebarWrapper = styled.div`
  grid-area: sidebar;
  width: 222px;
  height: 100vh;
  position: fixed;
  top: 73px;

  *{
    box-sizing: border-box;
  }
`;

const Sidebar = styled.div`
  margin-top: 40px;
`;

const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`
//might want to do svg through logic in the JSX instead of in styled componenets "CSS"
const SectionListing = styled.div`
  display: flex;
  align-items: center;
  height: 32px;  
  margin-bottom: 8px;
  padding: 8px;
  line-height: 32px;
  border-radius: 4px;
  background-color: ${props => props.selected ? props.tabColor ? props.tabColor : props.theme.grey : 'unset'};
  color: ${ props => props.selected ? props.theme.black : props.theme.darkGrey};
  cursor: pointer;

  svg{
    fill: ${props => props.selected ? props.theme.black: props.theme.darkGrey}
  }

  &:hover{
    background-color: ${props => props.selected ? 'unset' : props.tabColor ? props.tabColor : opacify(props.theme.grey, 0.5)};
    color: ${props => props.theme.black};
    svg{
      fill: ${props => props.theme.black}
    }
  }
`;

const SectionListingLabel = styled.span`  
  font-weight: 600;
  margin-left: 8px;  
`;

const SectinListingCount = styled.span`
  color: ${props => props.theme.black};
  margin-left: auto;
`;

export default class extends Component {

  render() {
    return (
      <SidebarWrapper>
        <Sidebar>
          <SidebarSection>
            <ExtendLabel>Invoices</ExtendLabel>
            <SectionListing tabColor = {opacify(theme.red, 0.2)} selected = {false}>
              <InProgressIcon/>
              <SectionListingLabel>Open</SectionListingLabel>
              { false ? <SectinListingCount>###</SectinListingCount>: null}
            </SectionListing>
            <SectionListing  selected = {true}>
              <MoneyIcon/>
              <SectionListingLabel>Closed</SectionListingLabel>
              { true ? <SectinListingCount>###</SectinListingCount>: null}
            </SectionListing>
            <SectionListing  selected = {false}>
              <DocumentIcon/>
              <SectionListingLabel>All</SectionListingLabel>
              { false ? <SectinListingCount>###</SectinListingCount>: null}
            </SectionListing>
          </SidebarSection>
          <SidebarSection>
            <ExtendLabel>Rates</ExtendLabel>
            <SectionListing  selected = {false}>
              <TruckIcon/>
              <SectionListingLabel>Transportation</SectionListingLabel>
            </SectionListing>
            <SectionListing  selected = {false}>
              <WarehouseIcon/>
              <SectionListingLabel>Wareheouse</SectionListingLabel>
            </SectionListing>
          </SidebarSection>
          <SidebarSection>
            <ExtendLabel>Settings</ExtendLabel>
            <SectionListing  selected = {false}>
              <ContactIcon/>
              <SectionListingLabel>Contacts</SectionListingLabel>
            </SectionListing>
            <SectionListing  selected = {false}>
              <GearIcon/>
              <SectionListingLabel>Invoicing</SectionListingLabel>
            </SectionListing>
          </SidebarSection>
        </Sidebar>
      </SidebarWrapper>
    )
  }
}