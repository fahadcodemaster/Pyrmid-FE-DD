import React, { useEffect, useState, Component } from "react";
import { useHistory } from "react-router-dom";
import heart from "../../assets/images/heart-icon.png";
// import verified from "../../assets/images/orange.png";
import defaultImg from "../../assets/images/default.png";
import { useDispatch, useSelector } from "react-redux";
import GetFavouriteNftAction from "../../Redux/Actions/NftActions/GetFavouriteNftAction";
import GetNftMarketAction from "../../Redux/Actions/NftActions/GetNftMarketAction";
import { toast } from "react-toastify";
import http from "../../Redux/Api/http";

class CustomSlide extends Component {
  render() {
    const { index, ...props } = this.props;
    return <div {...props}></div>;
  }
}

const NftItem = ({ nft, likeAndDisLikeCallback, index }) => {
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

  const history = useHistory();
  const dispatch = useDispatch();
  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );
  const isConnected = useSelector((state) => state.Login?.authResponse?.data);
  const myFouritesNFTs = useSelector(
    (state) => state.GetFavouriteNft?.GetFavouriteNftResponse?.data
  );
  const [buttonclicked, setbuttonclicked] = useState(false);
  const [countoffav, setcountoffav] = useState(0);
  const [favnft, setfavnft] = useState(false);
  useEffect(() => {
    if (myFouritesNFTs?.some((data) => data.id === nft?.id)) {
      console.log("fav");
      setfavnft(true);
    } else {
      console.log("defav");
      setfavnft(false);
    }
    setcountoffav(nft?.nftFavouritesCount);
  }, []);

  const removeFromLike = () => {
    setbuttonclicked(true);
    if (!isConnected) {
      toast.error(`Please connect to wallet first`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setbuttonclicked(false);
      return;
    }
    http
      .put(httpUrl + "/api/v1/Nft/RemoveFavouriteNft", {
        nftId: nft?.id,
        nftAddress: nft?.ownerAddress,
      })
      .then((resp) => {
        toast.success(`Removed from favourite`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(GetFavouriteNftAction())
          .then((resp) => {
            likeAndDisLikeCallback();
            setbuttonclicked(false);
            setfavnft(false);
            setcountoffav(countoffav - 1);
          })
          .catch((error) => {
            setbuttonclicked(false);
          });
      })
      .catch((error) => {
        setbuttonclicked(false);
      });
  };

  const addToLike = () => {
    setbuttonclicked(true);
    if (!isConnected) {
      toast.warn(`Please connect to wallet first`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setbuttonclicked(false);
      return;
    }
    http
      .post(httpUrl + "/api/v1/Nft/AddFavouriteNft", {
        nftId: nft?.id,
        nftAddress: nft?.ownerAddress,
      })
      .then((resp) => {
        toast.success(`Added to favourite`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        dispatch(GetFavouriteNftAction())
          .then((resp) => {
            likeAndDisLikeCallback();
            setfavnft(true);
            setcountoffav(countoffav + 1);
            setbuttonclicked(false);
          })
          .catch((error) => {
            setbuttonclicked(false);
          });
      })
      .catch((error) => {
        setbuttonclicked(false);
      });
  };

  return (
    <div key={index} className=" nft-div">
      <div className="nft nft-payen">
        <div className="nft_coll">
          <div className="nft_coll_info">
            <span
              onClick={() => {
                history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
              }}
            >
              <h4>
                {" "}
                {nft?.name?.length > 15
                  ? nft?.name?.slice(0, 14) + "..."
                  : nft?.name}
              </h4>
            </span>

            <div
              className="full-div"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <p>
                {nft?.collectionName?.length > 15
                  ? nft?.collectionName?.slice(0, 14) + "..."
                  : nft?.collectionName}
              </p>

              <div
                className="text-right"
                style={{ cursor: "pointer" }}
                onClick={
                  buttonclicked ? <></> : favnft ? removeFromLike : addToLike
                }
              >
                {myFouritesNFTs?.some((data) => data.id === nft?.id) ? (
                  <img src={heart} />
                ) : (
                  <i className="fa fa-heart mr-1"></i>
                )}
                {nft?.nftFavouritesCount}
              </div>
            </div>
          </div>
          <div className="nft_wrap">
            <div className="table-cell">
              <div
                className="table-cell-center"
                onClick={() => {
                  history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                }}
              >
{
nft?.image.split(".")[1]=="mp4"?
<video src={httpUrl + "/" + nft?.image} width="100%"  />:
 <img
 src={httpUrl + "/" + nft?.image}
 className="lazy img-fluid"
 alt=""
/>
}
              </div>
            </div>
            <div className="nft_coll_pp">
              <span
                onClick={() => {
                  history.push(
                    nft.ownerAddress === WalletAddress
                      ? `/myprofile`
                      : `/profile/${nft.ownerAddress}`
                  );
                }}
              >
                <img
                  className="lazy"
                  src={
                    nft?.logoImage ? httpUrl + "/" + nft?.logoImage : defaultImg
                  }
                  alt=""
                />
                {/* <i className="fa fa-check"></i> */}
              </span>
            </div>
          </div>
          <ul className="flex-div itm-lst">
            <li>
              {" "}
              price{" "}
              {" " + nft?.sellPrice == 0
                ? nft?.buyPrice
                : nft?.sellPrice + " "}{" "}
              BNB{" "}
            </li>
            <li>
              <span
                onClick={() => {
                  history.push(
                    nft.ownerAddress === WalletAddress
                      ? `/myprofile`
                      : `/profile/${nft.ownerAddress}`
                  );
                }}
              >
                {nft?.ownerName}{" "}
              </span>
            </li>
          </ul>
        </div>
      </div>
      {/*
                                <div className="nft market-nft">
                                  <CustomSlide className="itm" index={1}>
                                    <div className="nft_coll">
                                      <div className="info-text flex-div">
                                        <div className="text-left">
                                          <span
                                            onClick={() => {
                                              history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                                            }}
                                          >
                                            <h4> {nft?.name}</h4>
                                          </span>
                                          <p className="color-txt">
                                            {nft?.collectionName}
                                          </p>

                                        </div>
                                        <div className="text-right"  style={{cursor:'pointer'}}  onClick={buttonclicked?<></>:favnft ?  removeFromLike : addToLike  }    >
                                          <i className="fa fa-heart-o"></i> {" "}
                                          {nft?.nftFavouritesCount}
                                        </div>
                                      </div>
                                     <div className="author-banner-img">
                                      <img
                                                src={httpUrl + "/" + nft?.image}
                                                className="lazy img-fluid"
                                                alt=""
                                              />
                                        <i className="fa fa-share-alt"></i>
                                        <a href="javascript:void(0);">NFT Details</a>
                                      </div> 

                                      <div style={{ margin: `10px 0 00px` }} className="nft_wrap">
                                        <span
                                          className=" pic-demo"
                                          onClick={() => {
                                            history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                                          }}>
                                          <div className="table-cell">
                                            <div className="table-cell-center">
                                              <img
                                                src={httpUrl + "/" + nft?.image}
                                                className="lazy img-fluid"
                                                alt=""
                                              />
                                            </div>
                                          </div>

                                        </span>
                                      </div>
                                      <div className="nft_coll_pp">
                                        <span
                                          onClick={() => {
                                            history.push(
                                              nft.ownerAddress === WalletAddress
                                                ? `/myprofile`
                                                : `/profile/${nft.ownerAddress}`
                                            );
                                          }}
                                        >
                                          <img
                                            className="lazy"
                                            src={
                                              nft?.ownerImage
                                                ? httpUrl + "/" + nft?.ownerImage
                                                : defaultImg
                                            }
                                            alt=""
                                          />
                                        </span>
                                     <i className="fa fa-check"></i>
                                      </div>
                                      <div className="nft_coll_info">

                                        <span
                                          onClick={() => {
                                            history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                                          }}
                                        >
                                          <b>  </b><br></br>
                                          Price {" " + nft?.sellPrice + " "}BNB
                                        </span>
                                        <div className="full-div">
                                          <a
                                            onClick={() => {
                                              history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                                            }}
                                            className="view-all-btn"
                                          >
                                            NFT Details{" "}
                                            <i
                                              className="fa fa-angle-right"
                                              aria-hidden="true"
                                            ></i>
                                          </a>

                                       <i
                                          onClick={() =>
                                            addToFavourite(
                                              nft?.id,
                                              nft.ownerAddress
                                            )
                                          }
                                          className="fa fa-heart"
                                        ></i> 

                                        </div>
                                      </div>
                                    </div>
                                  </CustomSlide>
                                </div>   */}
    </div>
  );
};

export default NftItem;
