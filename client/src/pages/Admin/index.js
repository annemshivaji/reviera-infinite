import React from "react";
import PageTitle from "../../components/PageTitle";
import { Tabs } from "antd";
import EventsList from "./EventsList";
import VenuesList from "./VenuesList";


function Admin() {
    return (
        
            <div>
                <PageTitle title="Administrator" />

                <Tabs centered defaultActiveKey="1">
                    <Tabs.TabPane tab="Events" key="1">
                        <EventsList />
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="Venues" key="2">
                        <VenuesList />
                    </Tabs.TabPane>
                </Tabs>
            </div>
    );
}

export default Admin;
