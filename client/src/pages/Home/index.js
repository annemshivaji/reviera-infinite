import React, { useEffect } from "react";
import { Col, message, Row, Table } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetAllEvents } from "../../apicalls/events";
import { useNavigate } from "react-router-dom";
import moment from "moment";


function Home() {
    const [searchText = "", setSearchText] = React.useState("");
    const [events, setEvents] = React.useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetAllEvents();
            if (response.success) {
                setEvents(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
        <div><center><input
        type="text"
        className="search-input"
        placeholder="Search for events"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
    /></center><br></br></div>
        <div className="card card2 p-3">


            <Row gutter={[24]} className="mt-2">
                {events
                    .filter((event) => event.title.toLowerCase().includes(searchText.toLowerCase()))
                    .map((event) => (
                        <Col span={6}>
                            <div
                                className="card  flex flex-col cursor-pointer"
                                onClick={() =>
                                    navigate(
                                        `/event/${event._id}?date=${moment().format("YYYY-MM-DD")}`
                                    )
                                }
                            >
                                <img src={event.poster} alt="" height={258} />

                                <div className="flex justify-center p-2">
                                    <h1 className="text-md uppercase">{event.title}</h1>
                                </div>
                            </div>
                        </Col>
                    ))}
            </Row>
        </div>
        </div>
    );
}

export default Home;
