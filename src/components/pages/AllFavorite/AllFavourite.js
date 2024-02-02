import React, { useEffect, useState, useRef } from "react";

import { Link, useHistory } from "react-router-dom";
import { PropagateLoader, RingLoader } from "react-spinners";

import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import GetFavouriteNftAction from "../../../Redux/Actions/NftActions/GetFavouriteNftAction";
import axios from "axios";
import http from "../../../Redux/Api/http";
import RemoveFavouriteNftAction from "../../../Redux/Actions/NftActions/RemoveFavouriteNftAction";
import swal from "sweetalert";
import defaultImg from "../../../assets/images/default.png";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

function AllFavourite() {
  const history = useHistory();
  const [isloading, setIsloading] = useState(true);

  const dispatch = useDispatch();
  const searchRef = useRef();
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterTrigger, setFilterTrigger] = useState(false);

  const [filter, setfilter] = useState([]);
  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );

  const GetFavouriteNft = useSelector(
    (state) => state.GetFavouriteNft?.GetFavouriteNftResponse?.data
  );

  const [favourites, SetFavourites] = useState(GetFavouriteNft?.slice(0, 8));
  const [height, Setheight] = useState(270);

  useEffect(() => {
    SetFavourites(GetFavouriteNft?.slice(0, 8));
    setAllData(GetFavouriteNft);
  }, [GetFavouriteNft]);

  useEffect(async () => {
    await dispatch(GetFavouriteNftAction())
      .then((res) => {
        setIsloading(false);
      })
      .catch((error) => {
        setIsloading(false);
        toast.success(`${error?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }, []);

  const loadMore = () => {
    let nftState = favourites;
    let start = nftState?.length;
    let end = nftState?.length + 8;

    if (filterData?.length) {
      SetFavourites([...nftState, ...filterData?.slice(start, end)]);
    } else {
      SetFavourites([...nftState, ...GetFavouriteNft?.slice(start, end)]);
    }
  };
  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      Setheight({
        height: img?.offsetHeight,
      });
    }
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;

    setfilter(
      allData?.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const resetFilter = () => {
    SetFavourites(allData?.slice(0, 8));
    setfilter([]);
    setFilterTrigger(false);

    searchRef.current.value = "";
  };
  const handlerSearchSubmit = (e) => {
    e.preventDefault();
    setFilterTrigger(true);

    SetFavourites(filter?.slice(0, 8));
    setFilterData(filter);
  };

  const removeToFavourite = async (nftId, OwnerAddress) => {
    const payload = {
      nftId: nftId,
      nftAddress: OwnerAddress,
    };

    await dispatch(RemoveFavouriteNftAction(payload))
      .then(async (resp) => {
        if (resp?.isSuccess === true) {
          toast.success(`${resp?.data}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          await dispatch(GetFavouriteNftAction());
          // setTimeout(() => window.location.reload(), 2000);
        } else if (resp?.data?.isSuccess === false) {
          toast.error(`${resp?.data?.data}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        swal({
          icon: "error",
          title: error?.data?.message,
        });
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-12">
          <div className="items_filter w-100">
            <form
              className="row form-dark w-100"
              id="form_quick_search"
              name="form_quick_search"
              onReset={() => {
                resetFilter();
              }}
              onSubmit={handlerSearchSubmit}
            >
              <div className="col-sm-12 d-flex align-items-start justify-content-center">
                <input
                  className="form-control"
                  id="name_1"
                  name="name_1"
                  ref={searchRef}
                  placeholder="search item here..."
                  type="text"
                  onChange={(e) => handleSearchChange(e)}
                  style={{ width: "100%" }}
                />
                <button id="btn-submit">
                  <i className="fa fa-search bg-color-secondary"></i>
                </button>
                {/* <div> */}
                {filterTrigger && (
                  <button id="btn-submit" type="reset">
                    <i class="fas fa-sync bg-danger m-l-1"></i>
                  </button>
                )}
                {/* </div> */}
                <div className="clearfix"></div>
              </div>
            </form>
            {/* <div className="dropdownSelect one">
                <Select
                  className="select1"
                  styles={customStyles}
                  menuContainerStyle={{ zIndex: 999 }}
                  defaultValue={options[0]}
                  options={options}
                />
              </div>
              <div className="dropdownSelect two">
                <Select
                  className="select1"
                  styles={customStyles}
                  defaultValue={options1[0]}
                  options={options1}
                />
              </div>
              <div className="dropdownSelect three">
                <Select
                  className="select1"
                  styles={customStyles}
                  defaultValue={options2[0]}
                  options={options2}
                />
              </div> */}
          </div>
        </div>
      </div>
      <div className="row">
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
        {isloading ? (
          <>
            <div className="col-sm-12 d-flex justify-content-center">
              <RingLoader color="white" size="60" />
            </div>
          </>
        ) : (
          <>
            {GetFavouriteNft?.length == 0 ? (
              <div className="col-sm-12 text-center" style={{ color: "#fff" }}>
                No NFT Record Found
              </div>
            ) : (
              ""
            )}

            {favourites?.map((favourite, index) => (
              <>
                {console.log("favourite nfts", favourite)}
                <div
                  key={index}
                  className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
                >
                  <div className="nft__item m-0">
                    <div class="info-text flex-div">
                      <div class="text-left">
                        <h4>{favourite?.name}</h4>
                        <p
                          style={{ fontSize: 13 }}
                          onClick={() => {
                            history.push(
                              `/nftsbycollections/${favourite?.collectionId}`
                            );
                          }}
                        >
                          {favourite?.collectionName.length > 20
                          ? favourite?.collectionName.slice(0, 19) + "..."
                          : favourite?.collectionName}

                          {/* {favourite?.collectionName} */}
                        </p>
                      </div>
                      <div class="text-right">
                        <div
                          onClick={() =>
                            removeToFavourite(
                              favourite?.id,
                              favourite?.ownerAddress
                            )
                          }
                        >
                          <i
                            style={{ color: "red" }}
                            className="fa fa-heart"
                          ></i>
                          <span style={{ marginLeft: "5px" }}>
                            {favourite?.nftFavouritesCount}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="nft__item_wrap"
                      onClick={() => {
                        history.push(
                          `/usernftdetail/${favourite?.id}/${favourite?.userFvrtAccountId}`
                        );
                      }}
                    >
                      <span>
                        <img
                          onLoad={onImgLoad}
                          src={httpUrl + "/" + favourite?.image}
                          className="lazy "
                          alt="NFT Pic"
                          style={{
                            width: "100%",
                            height: 200,
                            borderRadius: 8,
                            objectFit: "contain",
                          }}
                        />
                      </span>
                    </div>
                    {/* <div className="nft__item_info">
                    <span
                      onClick={() => window.open(nft.nftLink, "_self")}
                    >
                      <h4>{nft.name}</h4>
                    </span>
                    <div className="nft__item_price">
                      <span>Price: {nft?.sellPrice}</span>
                      <span> {nft?.blockChainName}</span>
                    </div>

                    <div
                      className="nft__item_like"
                      onClick={() =>
                        addToFavourite(nft.id, nft.ownerAddress)
                      }
                    >
                      <i
                        style={{ color: "red" }}
                        className="fa fa-heart"
                      ></i>
                      <span>{nft.likes}</span>
                    </div>
                  </div> */}
                    <div className="flex-div">
                      <div>
                        <p>{favourite?.blockChainName}</p>
                        <b style={{ whiteSpace: "nowrap" }}>
                          Price:{" "}
                          {favourite?.sellPrice
                            ? favourite?.sellPrice
                            : favourite?.buyPrice}
                        </b>
                      </div>
                      <div className="author_list_pp none">
                        <Link
                          to={
                            favourite?.ownerAddress === WalletAddress
                              ? "/myprofile"
                              : "/profile"
                          }
                        >
                          <img
                            className="lazy"
                            src={
                              favourite?.userProfileImageInFavrt
                                ? httpUrl +
                                  "/" +
                                  favourite?.userProfileImageInFavrt
                                : defaultImg
                            }
                            alt=""
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}

            {filterData?.length && filterTrigger ? (
              <>
                {favourites?.length < filterData?.length && (
                  <div className="col-lg-12">
                    <div className="spacer-single"></div>
                    <span onClick={loadMore} className="btn-main lead m-auto">
                      Load More Filter
                    </span>
                  </div>
                )}
              </>
            ) : (
              <>
                {favourites?.length < GetFavouriteNft?.length &&
                  !filterTrigger && (
                    <div className="col-lg-12">
                      <div className="spacer-single"></div>
                      <span onClick={loadMore} className="btn-main lead m-auto">
                        Load More
                      </span>
                    </div>
                  )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default AllFavourite;
