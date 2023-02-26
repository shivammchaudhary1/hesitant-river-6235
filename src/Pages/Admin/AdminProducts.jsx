import React, { useEffect, useState } from "react";
import "../../styles/adminProduct.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  DeleteFlightProducts,
  fetchFlightProducts,
} from "../../Redux/AdminFlights/action";

export const AdminProducts = () => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(5);
  const [show, setShow] = useState(false);
  const { isLoading, data, isError } = useSelector((store) => {
    return {
      isLoading: store.FlightReducer.isLoading,
      data: store.FlightReducer.data,
    };
  }, shallowEqual);

  const handleDeleteFlights = (deleteId) => {
    dispatch(DeleteFlightProducts(deleteId));
    toast.success("Flight Removed", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleLoadMore = () => {
    if (data.length >= limit) {
      setLimit((prev) => prev + 5);
    }
  };

  //   console.log(limit);
  useEffect(() => {
    dispatch(fetchFlightProducts(limit));
  }, [limit]);

  return (
    <>
      <ToastContainer />
      <div className="adminProductMain">
        <div className="adminSideBr">
          <Link to={"/admin"}>Home</Link>
          <Link to={"/admin/adminflight"}>Add Flight</Link>
          <Link to={"/admin/adminhotel"}>Add Hotel</Link>
          <Link to={"/admin/products"}>All Flights</Link>
          <Link to={"/admin/hotels"}>All Hotels</Link>
        </div>
        <div className="adminProductbox">
          <div className="filterProdcut">
            <input placeholder="Search Flight" type="text" />
            <button>Search</button>
            {limit > data.length ? (
              ""
            ) : (
              <button onClick={handleLoadMore}>Load More</button>
            )}
          </div>
          {/*  */}
          {isLoading ? <h1>Please wait...</h1> : ""}
          {data.map((ele, i) => (
            <div key={i} className="adminProductlist">
              <span>{ele.airline}</span>
              <span>{ele.from}</span>
              <span>{ele.to}</span>
              <span>{ele.price}</span>
              <span>{ele.number}</span>
              <span>
                <button onClick={() => handleDeleteFlights(ele.id)}>
                  Delete <i className="fa fa-trash"></i>
                </button>
                <button>
                  Edit <i className="fa fa-pencil"></i>
                </button>
              </span>
            </div>
          ))}
          {/*  */}
        </div>
      </div>
    </>
  );
};
