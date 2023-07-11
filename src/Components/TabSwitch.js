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

// const Tabs = styled.div`
//   display: flex;
//             align-items: center;
//             justify-content: space-between;
//             width: 200px;
//             height: 40px;
//             background-color: #eee;
//             border-radius: 50px;
//             border: 2px solid #888;
//             padding: 5px 0px;
//             cursor: pointer;
//             position: relative;`


// const Tab=styled.div`
//     flex: 1;
//             text-align: center;
//             color: #888;
//             font-weight: bold;
//             transition: all 0.3s ease;
//                 "&:active": {
//             color: "#fff",
//              zIndex: 5
//         };
//     z-index: 3;`

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
            border: 10px solid #e6eef9;
            border-radius: 99px;
`

const Glider = styled.span`
 position: absolute;
            display: flex;
            height: 54px;
            width: 200px;
            background-color: #e6eef9;
            z-index: 1;
            border-radius: 99px;
            transition: 0.25s ease-out;
`

const Tab = styled.input`
    display: none;
`

const TabLabel = styled.label`
        display: flex;
        align-items: center;
        justify-content: center;
        height: 54px;
        width: 200px;
        font-size: 1.25rem;
        font-weight: 500;
        border-radius: 99px;
        cursor: pointer;
        transition: color 0.15s ease-in;
        z-index: 3;
`



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
        <TabsContainer>
            <Tabs className="tab-switch" onClick={handleTabChange}>
                <Tab type='radio' id='radio-1' />
                <TabLabel htmlFor='radio-1'>Monthly</TabLabel>
                <Tab type='radio' id='radio-2' />
                <TabLabel htmlFor='radio-2'>Yearly</TabLabel>
                <Glider className='glider' />
            </Tabs>
        </TabsContainer>
    );
};

export default TabSwitch;
