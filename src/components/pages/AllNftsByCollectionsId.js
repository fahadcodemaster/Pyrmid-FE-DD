import React, { useEffect, useState, useRef } from "react";
import ColumnZero from "../components/ColumnZero";
import ColumnZeroTwo from "../components/ColumnZeroTwo";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import GetAllNftsByCollectionIdAction, {
  GetAllNftsByCollectionIdRequest,
} from "../../Redux/Actions/NftActions/GetAllNftsByCollectionIdAction";
import axios from "axios";
import GetNftCollectionByIdAction from "../../Redux/Actions/CollectionAction/GetNftCollectionByIdAction";
import defaultImg from "../../assets/images/default.png";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useHistory, useParams } from "react-router";
import heart from "../../assets/images/heart-icon.png";
import { PropagateLoader, RingLoader } from "react-spinners";
import { Link } from "react-router-dom";
import GetFavouriteNftAction from "../../Redux/Actions/NftActions/GetFavouriteNftAction";
import RemoveFavouriteNftAction from "../../Redux/Actions/NftActions/RemoveFavouriteNftAction";
import swal from "sweetalert";
import AddFavouriteNftAction from "../../Redux/Actions/NftActions/AddFavouriteNftAction";
import GetNftCollectionByIdWithOutAccountAction from "../../Redux/Actions/NftActions/GetNftCollectionByIdWithOutAccountAction";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { concat } from "lodash";
import NftItem from "../Shared/NFT";
import "../../assets/custom.css"

import GetNftMarketAction from "../../Redux/Actions/NftActions/GetNftMarketAction";
const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: transparent;
  }
`;

const AllNftsByCollectionsId = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  console.log(id);
  const GetAllNftsByCollectionId = useSelector(
    (state) =>
      state.GetAllNftsByCollectionId?.GetAllNftsByCollectionIdResponse?.data
  );
  const isConnected = useSelector((state) => state.Login?.authResponse?.data);

  const GetNftCollectionByIdWithOutAccount = useSelector(
    (state) =>
      state?.GetNftCollectionByIdWithOutAccount
        ?.GetNftCollectionByIdWithOutAccountResponse?.data
  );
  const apisCall=()=>{
    dispatch(GetNftMarketAction());
  }
  const MyProfile = useSelector(
    (state) => state.MyProfile?.MyProfileResponse?.data
  );

  const GetNftCollectionById = useSelector(
    (state) => state.GetNftCollectionById?.GetNftCollectionByIdResponse?.data
  );
  const GetFavouriteNft = useSelector(
    (state) => state.GetFavouriteNft?.GetFavouriteNftResponse?.data
  );

  const Token = useSelector((state) => state.Login?.authResponse?.data?.token);

  const searchRef = useRef();
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterTrigger, setFilterTrigger] = useState(false);
  const [favcount, setFavCount] = useState();

  const [filter, setfilter] = useState([]);
  const [getAllNftsByCollectionIdState, setGetAllNftsByCollectionIdState] = useState([]);
  const [height, Setheight] = useState(270);
  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;
  const [isloading, setIsloading] = useState(true);
  const [favouriteInProgress, setFavouriteInProgress] = useState(false);
  const loadMore = () => {
    let collectionsState = getAllNftsByCollectionIdState;
    let start = collectionsState?.length;
    let end = collectionsState?.length + 4;
    setGetAllNftsByCollectionIdState([
      ...collectionsState,
      ...GetAllNftsByCollectionId?.slice(start, end),
    ]);
  };
  const [showMore, setShowMore] = useState(true);
  const [showMoreN, setShowMoreN] = useState(true);

  useEffect(() => {
    setGetAllNftsByCollectionIdState(GetAllNftsByCollectionId?.slice(0, 8));
    setAllData(GetAllNftsByCollectionId);
  }, [GetAllNftsByCollectionId]);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      Setheight({
        height: img.offsetHeight,
      });
    }
  };
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



  useEffect(async () => {
    console.log("GetNftCollectionByIdWithOutAccount", GetNftCollectionByIdWithOutAccount);
    // await dispatch(GetNftCollectionByIdAction(id));

    await dispatch(GetNftCollectionByIdWithOutAccountAction(id));

    await dispatch(GetAllNftsByCollectionIdAction(id))
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
    return () => {
      dispatch(GetAllNftsByCollectionIdRequest());
    };
  }, []);

  const handleSearchChange = (e) => {
    const { value } = e.target;

    setfilter(
      allData?.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    );
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

  const resetFilter = () => {
    setGetAllNftsByCollectionIdState(allData?.slice(0, 8));
    setfilter([]);
    setFilterTrigger(false);

    searchRef.current.value = "";
  };
  const handlerSearchSubmit = (e) => {
    e.preventDefault();
    setFilterTrigger(true);

    setGetAllNftsByCollectionIdState(filter?.slice(0, 8));
    setFilterData(filter);
  };


  return (
    <div>
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
 
      <section className="profile-banner">
        <div className="full-div banner" style={{ backgroundImage: `url(${httpUrl}/${GetNftCollectionByIdWithOutAccount?.bannerImage?.replaceAll(
            "\\",
            "/"
          )})`,
        }}></div>
      </section >


      <section className="container d_coll no-top no-bottom">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="collection_logo_header d_profile cntr">
              <div style={{ float: "right" }} className="my-2">
                <DropdownButton id="dropdown-basic-button" className="social--btn" >
                  {console.log(GetNftCollectionByIdWithOutAccount?.url)}
                  {(!GetNftCollectionByIdWithOutAccount?.websiteLink &&
                    !GetNftCollectionByIdWithOutAccount?.kdiscordLink &&
                    !GetNftCollectionByIdWithOutAccount?.url &&
                    !GetNftCollectionByIdWithOutAccount?.twitterLink &&
                    !GetNftCollectionByIdWithOutAccount?.instagramLink &&
                    !GetNftCollectionByIdWithOutAccount?.mediumLink &&
                    !GetNftCollectionByIdWithOutAccount?.tLink) && (
                      <> <span className="text-center collection-social" > {""} No links found </span></>
                    )}
                  {GetNftCollectionByIdWithOutAccount?.websiteLink && (
                    <Dropdown.Item title="website" onClick={() => { window.open(GetNftCollectionByIdWithOutAccount?.websiteLink) }}><i class="fa fa-globe web-color"  ></i> Website</Dropdown.Item>
                  )}
                  {GetNftCollectionByIdWithOutAccount?.url && (
                    <Dropdown.Item title="website" onClick={() => { window.open(GetNftCollectionByIdWithOutAccount?.url) }}><i class="fa fa-globe web-color"  ></i> Website</Dropdown.Item>
                  )}

                  {GetNftCollectionByIdWithOutAccount?.discordLink && (
                    <Dropdown.Item title="discord" onClick={() => { window.open(GetNftCollectionByIdWithOutAccount?.discordLink) }} > <i class="fab fa-discord discord-color"></i> Discord </Dropdown.Item>
                  )}

                  {GetNftCollectionByIdWithOutAccount?.twitterLink && (
                    <Dropdown.Item title="twitter" onClick={() => { window.open(GetNftCollectionByIdWithOutAccount?.twitterLink) }}> <i className="fa fa-twitter twitter-color"></i> Twitter </Dropdown.Item>
                  )}

                  {GetNftCollectionByIdWithOutAccount?.instagramLink && (
                    <Dropdown.Item title="instagram" onClick={() => { window.open(GetNftCollectionByIdWithOutAccount?.instagramLink) }} ><i className="fa fa-instagram insta-color"></i> Instagram</Dropdown.Item>
                  )}
                  {GetNftCollectionByIdWithOutAccount?.mediumLink && (
                    <Dropdown.Item title="medium" onClick={() => { window.open(GetNftCollectionByIdWithOutAccount?.mediumLink) }}> <i className="fa fa-medium medium-color"></i> Medium </Dropdown.Item>
                  )}
                  {GetNftCollectionByIdWithOutAccount?.tLink && (
                    <Dropdown.Item title="telegram" onClick={() => { window.open(GetNftCollectionByIdWithOutAccount?.tLink) }}> <i className="fa fa-telegram telegram-color"></i> Telegram </Dropdown.Item>
                  )}



                </DropdownButton>

              </div>
              <div className="profile_avatar">
                <div className="d_profile_img">
                  <img
                    src={
                      httpUrl +
                      "/" +
                      GetNftCollectionByIdWithOutAccount?.logoImage
                    }
                    alt=""
                    style={{ height: 150, width: 150 }}
                  />
                  {/* <i className="fa fa-check"></i> */}
                </div>

                <div className="profile_name collection-desc">

                  <h4>
                    { GetNftCollectionByIdWithOutAccount?.name.length > 18 && showMoreN ? GetNftCollectionByIdWithOutAccount?.name.substring(0,18) : GetNftCollectionByIdWithOutAccount?.name }
                    <span style={{fontSize:"14px", 
                    marginLeft:"5px", 
                    color:"white",
                    cursor:"pointer", 
                    // padding:"3px",
                    borderRadius:"3px",
                    backgroundColor:"#37c3ff"
                    // border:"1px solid White"
                    


                    }} onClick={()=>{
                      setShowMoreN(!showMoreN)
                    }}>
                      {GetNftCollectionByIdWithOutAccount?.name.length < 18 ? "":
                        showMoreN? (<>Show More</>):(<>Show less</>)
                      }
                    </span>

                  </h4>

                  <div style={{color:"white", maxWidth:"99%", wordWrap:"break-word"}}>
                    { GetNftCollectionByIdWithOutAccount?.description.length > 60 && showMore ? GetNftCollectionByIdWithOutAccount?.description.substring(0,60) : GetNftCollectionByIdWithOutAccount?.description }
                    <span style={{fontSize:"14px", marginLeft:"5px", color:"white", cursor:"pointer", borderRadius:"3px", backgroundColor:"#37c3ff"}} onClick={()=>{
                      setShowMore(!showMore)
                    }}>
                      {GetNftCollectionByIdWithOutAccount?.description.length < 60 ? "":
                        showMore? (<>Show More</>):(<>Show less</>)
                      }
                    </span>
                  </div>

                  {GetNftCollectionByIdWithOutAccount?.address ==
                    WalletAddress && (
                      <button
                        onClick={() => {
                          history.push(`/addcollection/${id}`);
                        }}
                        className="btn btn-main mx-auto"
                      >
                        Update Collection
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container mb-cntr">
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
                    style={{ width: "100%", }}
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
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="row">
              {isloading ? (
                <>
                  <div className="col-sm-12 d-flex justify-content-center">
                    <RingLoader color="white" size="60" />
                  </div>
                </>
              ) : (
                <>
                  {GetAllNftsByCollectionId?.length == 0 ? (
                    <div className="col-sm-12 text-center" style={{color:"#fff"}}>
                      No NFT Record Found
                    </div>
                  ) : (
                    ""
                  )}
                  {getAllNftsByCollectionIdState?.map((item, index) => (
               
             
             <NftItem nft={item} likeAndDisLikeCallback={apisCall} index={index}/>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="dull-div">
            {!isloading && (
              <>
                {filterData?.length && filterTrigger ? (
                  <>
                    {getAllNftsByCollectionIdState?.length <
                      filterData?.length && (
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
                ) : (
                  <>
                    {getAllNftsByCollectionIdState?.length <
                      GetAllNftsByCollectionId?.length &&
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
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default AllNftsByCollectionsId;
