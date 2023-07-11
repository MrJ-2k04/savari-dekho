import { Box } from '@mui/material';
import { useState } from 'react';
import styled from '@emotion/styled'
import { ROLES } from 'Store/constants';

const backgroundColor = "#FFA629";
const activeColor = "#FFFFFF";

const TabsContainer = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Tabs = styled.div`
    display: flex;
    position: relative;
    background-color: #fff;
    box-shadow: 0 0 1px 0 rgba(24, 94, 224, 0.15), 0 6px 12px 0 rgba(24, 94, 224, 0.15);
    border: 8px solid ${backgroundColor};
    border-radius: 99px;
`

const Glider = styled.span`
    position: absolute;
    display: flex;
    height: 100%;
    width: 50%;
    background-color: ${backgroundColor};
    z-index: 1;
    border-radius: 99px;
    transition: 0.25s ease-out;
    transform: ${({ translateX }) => (`translateX(${translateX})`)};
    box-shadow: 0px 0px 0px 1px ${backgroundColor};
`

const Tab = styled.input`
    display: none;
`

const TabLabel = styled.label`
    color: ${({ active }) => (active ? activeColor : backgroundColor)};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 54px;
    width: 200px;
    font-size: 1.5rem;
    font-weight: bolder;
    border-radius: 99px;
    cursor: pointer;
    transition: color 0.15s ease-in;
    z-index: 3;
`



const TabSwitch = () => {
    const [activeTab, setActiveTab] = useState(ROLES.USER);

    const handleTabChange = (event) => {
        setActiveTab(event.target.id);
    };

    return (
        <TabsContainer>
            <Tabs className="tab-switch">
                <Tab type='radio'
                    id={ROLES.USER}
                    checked={activeTab === ROLES.USER}
                    onChange={handleTabChange}
                />
                <TabLabel htmlFor={ROLES.USER} active={activeTab === ROLES.USER}>User</TabLabel>

                <Tab type='radio'
                    id={ROLES.RIDER}
                    onChange={handleTabChange}
                    checked={activeTab === ROLES.RIDER}
                />
                <TabLabel htmlFor={ROLES.RIDER} active={activeTab === ROLES.RIDER}>Rider</TabLabel>
                <Glider translateX={activeTab === ROLES.USER ? "0%" : "100%"} />
            </Tabs>
        </TabsContainer>
    );
};

export default TabSwitch;
