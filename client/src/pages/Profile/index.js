import React from "react";
import { Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import PageTitle from "../../components/PageTitle";
import VenuesList from "./VenuesList";
import Bookings from "./Bookings";
function Profile() {
    return (
        <div>
            {/* <PageTitle title="Profile" /> */}<br></br>

            <Tabs centered defaultActiveKey="1">
                <Tabs.TabPane tab="Bookings" key="1">
                    
                    <Bookings />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Venues" key="2">
                    <VenuesList />
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
}

export default Profile;
