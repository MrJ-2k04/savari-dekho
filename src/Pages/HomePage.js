import Payment from "Components/Payment";
import TabSwitch from "Components/TabSwitch";
import Layout from "Layout";

function HomePage() {
    return ( 
        <Layout>
            This is Home Page
            <Payment />
            <TabSwitch />
        </Layout>
     );
}

export default HomePage;