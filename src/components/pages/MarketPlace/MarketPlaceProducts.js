import React, { useEffect, useState, useRef, Component, useLayoutEffect } from "react";
import BuyNft from "../../components/BuyNft";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import swal from "sweetalert";

import { createGlobalStyle } from "styled-components";
import Select from "react-select";
import { getToken } from "../../../utils";
import { Link } from "react-router-dom";
import { PropagateLoader, RingLoader } from "react-spinners";
import Slider from "react-slick";
import AccordionFilter from "../accordionFilter";
import AuthorList from "../../components/authorList";
import heart from "../../../assets/images/heart-icon.png";
import cryptocurrency from "../../../assets/images/cryptocurrency-icon.png";
import placebid from "../../../assets/images/placebid-icon.png";
import marketplacebanner from "../../../assets/images/marketplace-banner.png";
import verified from "../../../assets/images/verified-icon.png";
import defaultImg from "../../../assets/images/default.png";
import footerlogo from "../../../assets/images/footer-logo.png";
import { useLocation, useHistory } from "react-router-dom";
import GetNftMarketAction from "../../../Redux/Actions/NftActions/GetNftMarketAction";
import GetNftMarketByIdAction from "../../../Redux/Actions/NftActions/GetNftMarketById";
import { toast, ToastContainer } from "react-toastify";
import GetFavouriteNftAction from "../../../Redux/Actions/NftActions/GetFavouriteNftAction";
import marketplacebg from "../../../assets/images/market-place-banner.png";
import RemoveFavouriteNftAction from "../../../Redux/Actions/NftActions/RemoveFavouriteNftAction";
import { Accordion, Button, Card, Form, NavLink } from "react-bootstrap";
import http from "../../../Redux/Api/http";
import { Redirect } from "@reach/router";
import NftItem from "../../Shared/NFT";
const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: transparent;
  }
`;
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

class CustomSlide extends Component {
  render() {
    const { index, ...props } = this.props;
    return <div {...props}></div>;
  }
}

function MarketNfts() {
  const Marketplaceprodu = useSelector(
    (state) => state.GetNftMarket?.GetNftMarketResponse?.data
  );
  const location = useLocation();
  const history = useHistory();

  const [isloading, setIsloading] = useState(true);
  const [favouriteInProgress, setFavouriteInProgress] = useState(false);
  const [routee, setRoute] = useState(true);
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [filter, setfilter] = useState([]);
  const [hotcollection, setHotCollection] = useState();
  const [filterTrigger, setFilterTrigger] = useState(false);
  const [colLoading, setColLoading] = useState(true);
  const [buyNow, setBuyNow] = useState(false);
  const [auction, setAuction] = useState(false);
  const [pathname, setPathname] = useState();
  const [favcount, setFavCount] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [priceEnteries, setPriceEnteries] = useState();
  const [priceCheck, setPriceCheck] = useState(false);
  const [hasbids, setHasOffers] = useState(false);

  const [checkTrueItem, setCheckTrueItem] = useState("");
  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );
  const Token = useSelector((state) => state.Login?.authResponse?.data?.token);
  const isConnected = useSelector((state) => state.Login?.authResponse?.data);

  const dispatch = useDispatch();
  const GetFavouriteNft = useSelector(
    (state) => state.GetFavouriteNft?.GetFavouriteNftResponse?.data
  );
  const [marketNfts, SetMarketNfts] = useState(Marketplaceprodu?.slice(0, 4));
  const [height, Setheight] = useState(270);
  const searchRef = useRef();
  const GetNftCollectionCategories = useSelector(
    (state) =>
      state?.GetNftCollectionCategories?.GetNftCollectionCategoriesResponse
        ?.data
  );

  const collectionOption = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "fruit", label: "fruit" },
  ];

  const customStyles = {
    option: (base, state) => ({
      ...base,
      background: "#212428",
      color: "#fff",
      borderRadius: state.isFocused ? "0" : 0,
      "&:hover": {
        background: "#16181b",
      },
    }),
    menu: (base) => ({
      ...base,
      background: "#212428 !important",
      borderRadius: 0,
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
    }),
    control: (base, state) => ({
      ...base,
      padding: 2,
    }),
  };

  const apisCall = () => {
    dispatch(GetNftMarketAction());
  }

  const loadMore = () => {
    let marketNftstate = marketNfts;
    let start = marketNftstate?.length;
    let end = marketNftstate?.length + 3;
    if (filterData.length) {
      SetMarketNfts([...marketNftstate, ...filterData?.slice(start, end)]);
    } else {
      SetMarketNfts([
        ...marketNftstate,
        ...Marketplaceprodu?.slice(start, end),
      ]);
    }
  };

  const activeRemove = (e) => {
    const parentCls = e.target.parentNode.parentNode.parentNode.classList
    document.getElementById("SidefilterMenu").classList.remove(parentCls[1]);
  };

  const activeAdd = (e) => {
    // const parentCls = e.target.parentNode.parentNode.parentNode.classList
    const ress = document.getElementById("SidefilterMenu")
    console.log(ress);
    document.getElementById("SidefilterMenu").classList.add("active");
  };

  const priceFilter = async () => {
    const payload = {
      search: "",
      min: minPrice,
      max: maxPrice,
      collectionId: [
        0
      ],
      sortBy: 'string',
      sortIndex: 0
    }
    console.log("heeheheh", payload);
    if (minPrice && maxPrice) {
      await http
        .post(httpUrl + "/api/v1/Nft/GetMarketPlaceNftSearch", payload)
        .then((res) => {
          console.log("filtered dataaaaaaaaaaaaaa", res.data.data);
          setPriceEnteries(res.data.data)
          setBuyNow(false)
          setAuction(false)
          setPriceCheck(true)
        })
        .catch((error) => {
          console.log(error?.message);
        });
    }

  };

  useEffect(async () => {
    var params = window.location.pathname;
    setPathname(params.split("/")[1]);
    setTimeout(async () => {
      await http
        .get(httpUrl + "/api/v1/Nft/GetHotCollections")
        .then((res) => {
          console.log("HOT COLLECTION", res.data.data);
          setHotCollection(res.data.data);
          setColLoading(false);
          // setGetMasterAddress(res?.data?.data?.address);
        })
        .catch((error) => {
          console.log(error?.message);
        });

      await dispatch(GetNftMarketAction())
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
      if (isConnected) {
        await dispatch(GetFavouriteNftAction());
      }
    }, 3000);
  }, []);

  const removeToFavourite = async (nftId, OwnerAddress, favCount) => {
    if (!favouriteInProgress) {
      const payload = {
        nftId: nftId,
        nftAddress: OwnerAddress,
      };

      await dispatch(RemoveFavouriteNftAction(payload))
        .then(async (resp) => {
          setFavouriteInProgress(false);

          if (resp?.isSuccess === true) {
            toast.error(`${resp?.data}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            console.log("favcount --", favCount);
            await dispatch(GetFavouriteNftAction());
            // setFavCount((favcount) => favcount - 1);
            // setTimeout(() => window.location.reload(), 2000);
          } else if (resp?.isSuccess === false) {
            toast.error(`${resp?.data}`, {
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
          setFavouriteInProgress(false);
          toast.error(`${error?.data?.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  useEffect(() => {
    // console.log("Marketplaceprodu", Marketplaceprodu);
    SetMarketNfts(Marketplaceprodu?.slice(0, 3));
    setAllData(Marketplaceprodu);

  }, [Marketplaceprodu]);


  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      Setheight({
        height: img?.offsetHeight,
      });
    }
  };

  const addToFavourite = async (nftID, OwnerAddress) => {
    if (!isConnected) {
      toast.success(`Please connect to wallet first`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!favouriteInProgress) {
      await axios
        .post(
          httpUrl + "/api/v1/Nft/AddFavouriteNft",
          {
            nftId: nftID,
            nftAddress: OwnerAddress,
          },
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        )
        .then(async (resp) => {
          setFavouriteInProgress(false);
          if (resp?.data?.isSuccess === true) {
            toast.success(`${resp?.data?.data}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            console.log("favcount", favcount);
            // setFavCount((favcount) => favcount + 1);
            // setFavCount(...favCount, favCount)
            const result = await dispatch(GetFavouriteNftAction());
            console.log("resultttttttttttttttttt", result);
            // setTimeout(() => window.location.reload(), 2000);
          } else if (resp?.data?.isSuccess === false) {
            toast.error(`NFT already liked`, {
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
          setFavouriteInProgress(false);
          toast.error(`${error?.data?.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setfilter(
      allData?.filter((item) => {
        return item.name.toLowerCase().includes(value.toLowerCase());
      })
    );
  };

  const routeToMP = (e) => {
    setRoute(true);
    // window.open('/marketplace')
  };

  const setBuyNowFunc = (e) => {
    setAuction(false);
    setPriceCheck(false);
    setHasOffers(false);
    setBuyNow(true);
  };

  const setAuctionFunc = (e) => {
    setBuyNow(false);
    setPriceCheck(false);
    setHasOffers(false);
    setAuction(true);
  };

  const setHasOffersFunc = (e) => {
    setBuyNow(false);
    setPriceCheck(false);
    setAuction(false);
    setHasOffers(true);
  };

  const resetFilter = () => {

    setBuyNow(false);
    setPriceCheck(false);
    setHasOffers(false);
    setAuction(false);

    // SetMarketNfts(allData);
    // setfilter([]);
     setFilterTrigger(false);

    // console.log(marketNfts);
   searchRef.current.value = "";
  };

  const handlerSearchSubmit = (e) => {
    e.preventDefault();
    setFilterTrigger(true);
    SetMarketNfts(filter?.slice(0, 4));
    setFilterData(filter);
  };

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };
  return (
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

      {location.pathname !== "/" && (
        <section className="jumbotron breadcumb no-bg">
          <div className="mainbreadcumb markert-banner bg-dots-pnl">
            <div className="container">
              <div className="row">
                <div className="col-12 text-center">
                  <img src={marketplacebanner} />

                  <ul className="arrange-list">
                    <li>
                      <a onClick={resetFilter}>All</a>
                    </li>
                    <li>
                      <a onClick={setBuyNowFunc}>On Sale</a>
                    </li>
                    <li>
                      <a onClick={setAuctionFunc}>On Bid</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    <div className="container">  
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
    </div>

      {pathname === "marketplace" ? (
        <>
          <section className="container">
            <div className="row">
              {isloading ? (
                <>
                  <div className="col-sm-12 d-flex justify-content-center">
                    <RingLoader color="white" size="60" />
                  </div>
                </>
              ) : (
                <>
                  {Marketplaceprodu?.length == 0 ? (
                    <div className="col-sm-12 text-center" style={{ color: "#fff" }}>
                      No NFT Record Found
                    </div>
                  ) : (
                    ""
                  )}

                  <>
                    {isloading ? (
                      <div className="col-sm-12 d-flex justify-content-center">
                        <RingLoader color="white" size="60" />
                      </div>
                    ) : (
                      <>

                        {marketNfts?.map((nft, index) => (
                          <>
                            {buyNow ? (
                              <>
                                {!nft.isBidOpen && (

                                  <NftItem nft={nft} likeAndDisLikeCallback={apisCall} />

                                )}
                              </>
                            ) : auction ? (
                              <>
                                {nft.isBidOpen && (
                                  <>
                                    <NftItem nft={nft} likeAndDisLikeCallback={apisCall} />

                                  </>
                                )}
                              </>
                            ) : priceCheck ? (
                              <>
                                {priceEnteries.map((nft1, index1) => (
                                  <>
                                    <NftItem nft={nft1} likeAndDisLikeCallback={apisCall} />
                                  </>
                                ))}
                              </>
                            ) : hasbids ? (
                              <>
                                {nft?.hasBids && (
                                  <>
                                    <NftItem nft={nft} likeAndDisLikeCallback={apisCall} />
                                  </>
                                )}
                              </>
                            ) : (
                              <NftItem nft={nft} likeAndDisLikeCallback={apisCall}
                              />
                            )}

                          </>
                        ))}
                      </>
                    )}
                    {marketNfts?.length < Marketplaceprodu?.length &&
                      !filterTrigger && (
                        <div className="col-lg-12">
                          <div className="spacer-single"></div>
                          <span
                            onClick={loadMore}
                            className="btn-main lead m-auto"
                          >
                            Load More
                          </span>
                        </div>
                      )}
                  </>

                  {filterData?.length && filterTrigger ? (
                    <>
                      {marketNfts?.length < filterData?.length && (
                        <div className="col-lg-12">
                          <div className="spacer-single"></div>
                          <span
                            onClick={loadMore}
                            className="btn-main lead m-auto"
                          >
                            Load More Filter
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {/* {marketNfts?.length < Marketplaceprodu?.length &&
                    !filterTrigger && (
                      <div className="col-lg-12">
                        <div className="spacer-single"></div>
                        <span
                          onClick={loadMore}
                          className="btn-main lead m-auto"
                        >
                          Load More
                        </span>
                      </div>
                    )} */}
                    </>
                  )}
                </>
              )}
            </div>
          </section>


        </>
      ) : (
        <>
          <section className="container">
            <div className="row">
              <div className="col-lg-12 col-xl-12 col-sm-12 col-sm-12 onStep css-keef6k">
                <h2>FEATURED ARTWORKS</h2>
              </div>
              <div className="col-lg-12">

                {isloading ? (
                  <>
                    <div className="col-sm-12 d-flex justify-content-center">
                      <RingLoader color="white" size="60" />
                    </div>
                  </>
                ) : (
                  <>
                    {Marketplaceprodu?.length == 0 ? (
                      <div className="col-sm-12 text-center" style={{ color: "#fff" }}>
                        No NFT Record Found
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="row">{marketNfts?.map((nft, index) =>
                      <NftItem nft={nft} likeAndDisLikeCallback={apisCall} />
                    )}
                    </div>

                    <div className="spacer-30"></div>

                    <div className="row">
                      <div className="col-lg-12 col-xl-12 col-sm-12 col-sm-12 onStep css-keef6k">
                        <h2>New Arrivals</h2>
                        {Marketplaceprodu?.length == 0 ? (
                          <div className="col-sm-12 text-center" style={{ color: "#fff" }}>
                            No NFT Record Found
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="row">
                          {marketNfts?.map((nft, index) =>
                            <NftItem nft={nft} likeAndDisLikeCallback={apisCall} />
                          )}
                        </div>
                      </div>

                    </div>
                    <div class="spacer-single"></div>
                    <div className="row">
                      <div className="col-lg-12 col-xl-12 col-sm-12 col-sm-12 onStep css-keef6k">
                        <h2>Hot Collections</h2>
                      </div>
                      <div className="sapcer-10"></div>
                    </div>

                    {colLoading ? (
                      <div className="col-sm-12 d-flex justify-content-center">
                        <RingLoader color="white" size="60" />
                      </div>
                    ) : (
                      <>
                        {/* hoty */}
                        <Slider {...settings}>
                          {hotcollection?.map((nft, index) => (
                            <div className="nft nft-payen">
                              <CustomSlide className="itm" index={1}>
                                <div className="nft_coll" style={{ cursor: "pointer" }}>
                                  <div className="nft_coll_info">
                                    <span
                                      onClick={() =>
                                        history.push(
                                          `/nftsbycollections/${nft?.id}`
                                        )
                                      }
                                    >
                                      <h4> {nft?.collectionName?.length > 15 ? nft?.collectionName?.slice(0, 14) + '...' : nft?.collectionName}</h4>
                                    </span>

                                    <div className="full-div">
                                      <p>
                                        {
                                          nft?.name
                                        }   </p>
                                    </div>
                                  </div>
                                  <div className="nft_wrap" onClick={() => history.push(`/nftsbycollections/${nft?.id}`)}>
                                    <div className="table-cell">
                                      <div className="table-cell-center">
                                        <img src={httpUrl + "/" + nft?.bannerImage} className="lazy img-fluid" alt="" />
                                      </div>
                                    </div>
                                    <div className="nft_coll_pp">
                                      <span
                                        onClick={() =>
                                          history.push(
                                            `/nftsbycollections/${nft?.id}`
                                          )
                                        }
                                      >
                                        <img className="lazy" src={nft?.logoImage ? httpUrl + "/" + nft?.logoImage : defaultImg} alt="" />
                                        {/* <i className="fa fa-check"></i> */}
                                      </span>
                                    </div>
                                  </div>
                                  <ul className="flex-div itm-lst">
                                    <li>Items ({nft?.totalNft}+)</li>
                                    <li><a href="javascript:void(0);">{nft?.nftCollectionCreaterName === "" ? "No Name" : nft?.nftCollectionCreaterName}</a></li>
                                  </ul>

                                </div>
                              </CustomSlide>
                            </div>

                            // );
                          ))}
                        </Slider>
                      </>
                    )}


                    {filterData?.length && filterTrigger ? (
                      <>
                        {marketNfts?.length < filterData?.length && (
                          <div className="col-lg-12">
                            <div className="spacer-single"></div>
                            <span
                              onClick={loadMore}
                              className="btn-main lead m-auto"
                            >
                              Load More Filter
                            </span>
                          </div>
                        )}
                      </>
                    ) : (
                      <>

                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </section>

        </>
      )}

    </>
  );
}

export default MarketNfts;
