import { Box } from '@mui/material';
import { useState } from 'react';
import styled from '@emotion/styled'


// const Tabs = styled('div')({
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: 200,
//     height: 40,
//     backgroundColor: '#eee',
//     borderRadius: 50,
//     border: '2px solid #888',
//     padding: '5px 0',
//     cursor: 'pointer',
//     position: 'relative',
// });

// const Tab = styled('div')({
//     flex: 1,
//     textAlign: 'center',
//     color: '#888',
//     fontWeight: 'bold',
//     transition: 'all 0.3s ease',
//     ":active": {
//         color: "#fff",
//         zIndex: 5
//     },
//     zIndex: 3,
// });

const Tabs = styled.div`
  display: flex;
            align-items: center;
            justify-content: space-between;
            width: 200px;
            height: 40px;
            background-color: #eee;
            border-radius: 50px;
            border: 2px solid #888;
            padding: 5px 0px;
            cursor: pointer;
            position: relative;`


const Tab=styled.div`
    flex: 1;
            text-align: center;
            color: #888;
            font-weight: bold;
            transition: all 0.3s ease;
                "&:active": {
            color: "#fff",
             zIndex: 5
        };
    z-index: 3;`



const TabSwitch = () => {
    const [activeTab, setActiveTab] = useState('monthly');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        console.log(tab);
    };

    const Handle = styled('div')({
        width: "50%",
        height: "100%",
        backgroundColor: "#888",
        borderRadius: "50px",
        transition: "all 0.3s ease",
        position: "absolute",
        transform: activeTab === "monthly" ? 'translateX(0%)' : 'translateX(100%)',
    })

    return (
        <Tabs className="tab-switch" onClick={handleTabChange}>
            <Tab
                className={`tab ${activeTab === 'monthly' ? 'active' : ''}`}
                onClick={() => handleTabChange('monthly')}
            >
                Monthly
            </Tab>
            <Tab
                className={`tab ${activeTab === 'yearly' ? 'active' : ''}`}
                onClick={() => handleTabChange('yearly')}
            >
                Yearly
            </Tab>
            <Handle />
        </Tabs>
    );
};

export default TabSwitch;
