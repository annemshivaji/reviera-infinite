import { message } from "antd";
import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import Footer from './Footer';


function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetCurrentUser();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        dispatch(SetUser(null));
        message.error(response.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      dispatch(HideLoading());
      dispatch(SetUser(null));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);

  const iconStyle = {
    color: 'white'
 

    
  };

  const iconStyle2 = {
    fontSize: '24px'
  };

  const combinedStyle = { ...iconStyle, ...iconStyle2};

  return (
    user && (
      <div className="content layout p-1">
        <div className="header bg-primary flex justify-between p-1">
          <div>
            <h1 className="text-4xl text-white cursor-pointer"
              onClick={() => navigate("/")}
            >R E V I E R A</h1>
          </div>
          


          <div className=" flex gap-1">
          <div className=" flex gap-1">
          <i class="flex ri-map-pin-2-fill pt-05 pr-05 justify-center" style={combinedStyle} onClick={() => {
              navigate("/map");
            }}></i>
            </div>
            <div className="bg-white p-1 flex gap-1">
              <i className="ri-user-fill"></i>
              <h1
                className="text-sm underline"
                onClick={() => {
                  if (user.isAdmin) {
                    navigate("/admin");
                  } else {
                    navigate("/profile");
                  }
                }}
              >
                {user.name}
              </h1>
            </div>


            <div className="bg-white p-1 flex gap-1">
              <i class="ri-logout-circle-r-fill"></i>
              <h1
                className="text-sm flex underline"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}>

                logout</h1></div>

          </div>
        </div>
        <div className="content mt-1 p-1">{children}</div>
        <Footer />
      </div>
    )
  );
}

export default ProtectedRoute;
