import React, { useEffect, useState } from "react";
import ColumnZero from "../components/ColumnZero";
import ColumnZeroTwo from "../components/ColumnZeroTwo";
import ColumnZeroThree from "../components/ColumnZeroThree";
import Footer from "../components/footer";
import { CopyToClipboard } from "react-copy-to-clipboard";
import defaultImg from "../../assets/images/default.png";
// import { useSelector } from "react-redux";
import UserNfts from "./UserNft/UserNfts";
import OnSaleUserNfts from "./UserNft/OnSaleUserNfts";
import UserFavNft from "./UserNft/UserFavNft";
import { useDispatch, useSelector } from "react-redux";
import http from "../../Redux/Api/http";
import { PulseLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { createGlobalStyle } from "styled-components";
import { conforms } from "lodash";
import { useHistory } from "react-router-dom";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: transparent;
  }
`;

const UserProfile = function () {
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;
  const [userData, setUserData] = useState();
  const [itemsCounter, setItemsCounter] = useState();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const isConnected = useSelector(
    (state) => state.Login?.authResponse?.data?.token
  );
  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );


  useEffect(async () => {
    let params = window.location.pathname;
    setAddress(params.split("/")[2]);
    await http
      .get(
        httpUrl +
        `/api/v1/Account/GetUserAccount?address=${params.split("/")[2]}&logedinWalletAddress=${WalletAddress}`
      )
      .then((res) => {
        console.log(res.data);
        setItemsCounter(res.data.data.nftRequestModelList.length);
        setUserData(res.data.data.accountViewModel);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    setOpenMenu2(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu2(false);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
    setOpenMenu(false);
    setOpenMenu1(false);
    document.getElementById("Mainbtn2").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  const handleUnFollow = async (id) => {


    if (isConnected) {
      let data = new FormData()
      data.append("AccountFollowerToId", parseInt(id))
      await http
        .put(
          httpUrl + `/api/v1/Post/UnFollow`, data
        )
        .then((res) => {
          console.log("unFollow success", res.data)
          toast.warn(`Account unfollowed successfully!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });


          let params = window.location.pathname;
          setAddress(params.split("/")[2]);
          http.get(
            httpUrl +
            `/api/v1/Account/GetUserAccount?address=${params.split("/")[2]}&logedinWalletAddress=${WalletAddress}`
          )
            .then((res) => {
              console.log(res.data);
              setItemsCounter(res.data.data.nftRequestModelList.length);
              setUserData(res.data.data.accountViewModel);
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });

        }).catch((error) => (
          console.log("errrrrrrror", error)
        ))
    }
    else {
      console.log("connect wallet first")
      toast.warning(`Please connect to wallet first`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }


  }

  const handleFollow = async (id) => {

    if (isConnected) {
      let data = new FormData()
      data.append("AccountFollowerToId", parseInt(id))
      await http
        .post(
          httpUrl + `/api/v1/Post/AddFollower`, data
        )
        .then((res) => {
          console.log("follow success", res.data)
          toast.success(`Account followed successfully!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          let params = window.location.pathname;
          setAddress(params.split("/")[2]);
          http.get(
            httpUrl +
            `/api/v1/Account/GetUserAccount?address=${params.split("/")[2]}&logedinWalletAddress=${WalletAddress}`
          )
            .then((res) => {
              console.log(res.data);
              setItemsCounter(res.data.data.nftRequestModelList.length);
              setUserData(res.data.data.accountViewModel);
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });
        }).catch((error) => (
          console.log("errrrrrrror", error)
        ))
    }
    else {
      console.log("connect wallet first")
      toast.warning(`Please connect to wallet first`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }


  }
  // const copyAddress = async () => {
  //   await navigator.clipboard.writeText(address);
  //   toast.success("Address copied successfully", {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: false,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };

  return (
    <div>
      {loading ? (
        <PulseLoader color="white" size="11" />
      ) : (
        <>
          <GlobalStyles />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
          />

          <section className="container no-bottom">
            <div className="spacer-double"></div>
            <div className="row">
              <div className="col-md-12 ">
                <div className="userprofile_logo_header other-prfle">
                  <div className="profile_avatar" style={{ marginTop: "60px" }}>
                    <div className="d_userprofile_img">
                      <img
                        src={
                          userData?.profileImage
                            ? httpUrl + "/" + userData?.profileImage
                            : defaultImg
                        }
                        alt=""
                        style={{ height: 150, width: 150 }}
                      />
                    </div>

                    <div className="profile_name" style={{ display: "block", marginTop: "25px" }}>

                      <h4>
                        <span>{userData?.username ? userData?.username.length > 15 ? userData?.username.slice(0, 14) : userData?.username : 'Unnamed'}</span>
                        {/* <span style={{ fontSize: 14, verticalAlign: "bottom" }}>
                          <i
                            className="fa fa-check fa-xs"
                            style={{
                              position: "unset",
                              margin: 0,
                              display: "unset",
                              marginLeft: 4,
                            }}
                          ></i>
                        </span> */}

                        <div className="clearfix"></div>
                      </h4>
                      {/* <span id="wallet" className="profile_wallet" style={{color:"#fff"}}> */}
                      <div style={{ color: "white" }}>{address}
                        <CopyToClipboard
                          text={address}
                          onCopy={() => {
                            toast.success("Address copied successfully", {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: false,
                              draggable: true,
                              progress: undefined,
                            });
                          }}
                        >
                          <button id="btn_copy" title="Copy Address">
                            Copy
                          </button>
                        </CopyToClipboard>

                        <br /><br />
                        {userData.isFollowed ? (
                          <a href="javascript:void(0);" onClick={() => {
                            handleUnFollow(userData.id)
                          }} className="white-btn">Unfollow</a>
                        ) : (
                          <a href="javascript:void(0);" onClick={() => {
                            handleFollow(userData.id)
                          }} className="white-btn">Follow</a>
                        )}


                        <span className="profile_username text-dark">

                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="spacer-double"></div>
              </div>
            </div>
            <span className="d-flex justify-content-center">
              <span style={{ color: "#fff" }}>Total Items: {itemsCounter ? itemsCounter : 0}</span>
            </span>
            <br></br>
          </section>

          <section className="container no-top">
            <div className="row">
              <div className="col-lg-12">
                <div className="items_filter">
                  <ul className="d-flex justify-content-center de_nav text-left">
                    <li id="Mainbtn" className="active">
                      <span onClick={handleBtnClick}>On Sale</span>
                    </li>
                    <li id="Mainbtn1" className="">
                      <span onClick={handleBtnClick1}>NFTs</span>
                    </li>
                    <li id="Mainbtn2" className="">
                      <span onClick={handleBtnClick2}>FAVOURITE</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {openMenu && (
              <div id="zero1" className="onStep fadeIn">
                <OnSaleUserNfts />
              </div>
            )}
            {openMenu1 && (
              <div id="zero2" className="onStep fadeIn">
                <UserNfts />
              </div>
            )}
            {openMenu2 && (
              <div id="zero3" className="onStep fadeIn">
                <UserFavNft />
              </div>
            )}
          </section>

          <Footer />
        </>
      )}
    </div>
  );
};
export default UserProfile;
