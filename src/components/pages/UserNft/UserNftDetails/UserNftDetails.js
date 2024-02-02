import React, { useEffect, useState, useRef } from "react";
import Footer from "../../../components/footer";
import { createGlobalStyle } from "styled-components";

import heartBlack from "../../../../assets/images/heart_black.png";
import { Link, useHistory, useParams, Redirect } from "react-router-dom";
import BuyUserNft from "./BuyUserNftdet";
import { useDispatch, useSelector } from "react-redux";
import GetNftMarketByIdAction from "../../../../Redux/Actions/NftActions/GetNftMarketById";
import clockicon from "../../../../assets/images/clockicon-big.png";
import heart from "../../../../assets/images/heart-icon.png";
import verified from "../../../../assets/images/verified-icon.png";
import cryptocurrency from "../../../../assets/images/bnb.png";
import placebid from "../../../../assets/images/placebid-icon.png";
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  Form,
  FormCheck,
  Dropdown,
  DropdownButton,
  OverlayTrigger,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { PulseLoader, RingLoader } from "react-spinners";
import swal from "sweetalert";
import axios from "axios";
import DatePicker from "react-datepicker";
import BuyNftMarketAction from "../../../../Redux/Actions/NftActions/BuyNftMarketActions";
import MyItemDetails from "../../MyNfts/MyNftDetail/MyItemDetails";
import {
  sendTransection,
  signMessage,
  approveNft,
  buyNftMarket,
  cancelNft,
  openForAuction,
  approveContract,
  acceptBid,
  Donation,
  DonationtoOwner,
  checkWBNB,
} from "../../../../metamask";
import Web3 from "web3";
import moment from "moment";
import GetFavouriteNftAction from "../../../../Redux/Actions/NftActions/GetFavouriteNftAction";
import RemoveFavouriteNftAction from "../../../../Redux/Actions/NftActions/RemoveFavouriteNftAction";
import defaultImg from "../../../../assets/images/default.png";
import dateFormat from "dateformat";
import { PropagateLoader } from "react-spinners";
import http from "../../../../Redux/Api/http";
import https from "https";

import GetAllNftsByCollectionIdAction, {
  GetAllNftsByCollectionIdRequest,
} from "../../../../Redux/Actions/NftActions/GetAllNftsByCollectionIdAction";
import { GetMyNftByIdRequest } from "../../../../Redux/Actions/NftActions/GetMyNftByIdAction";
import { slice } from "lodash";
import { Value } from "sass";
import { setDefaultWidth } from "react-socks";
import { FaUserCircle } from "react-icons/fa";
import Table from "react-bootstrap/Table";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: transparent;
  }
`;

const UserNftDetails = function () {
  const dispatch = useDispatch();
  const { id, accountId } = useParams();
  const history = useHistory();
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

  const GetNftMarketById = useSelector(
    (state) => state.myData?.GetNftMarketByIdResponse?.data
  );

  const AuthConnectState = useSelector(
    (state) => state.AuthConnect.AuthConnectResponse?.data
  );

  const myNftById = useSelector(
    (state) => state.GetMyNftById?.GetMyNftByIdResponse?.data
  );

  const GetFavouriteNft = useSelector(
    (state) => state.GetFavouriteNft?.GetFavouriteNftResponse?.data
  );

  const isConnected = useSelector(
    (state) => state.Login?.authResponse?.data?.token
  );

  const MyProfile = useSelector(
    (state) => state.MyProfile?.MyProfileResponse?.data
  );

  const [show, setShow] = useState(false);
  const [value, onChange] = useState(new Date());
  const searchRef = useRef();
  // const GetAllNftsByCollectionId = useSelector(
  //   (state) =>
  //     state.GetAllNftsByCollectionId?.GetAllNftsByCollectionIdResponse.data
  // );
  const [favouriteInProgress, setFavouriteInProgress] = useState(false);
  const [inputAmount, setInputAmount] = useState("");
  const [maxInputAmount, setMaxInputAmount] = useState("");
  const [nftId, setNftId] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [biddingLoading, setIsBiddingLoading] = useState(true);
  const [modalStatus, setModalStatus] = useState(false);
  const [emptyBids, setEmptyBids] = useState(false);
  const [filterTrigger, setFilterTrigger] = useState(false);
  const [rating, setRating] = useState(0);
  const [biddings, setBiddings] = useState();
  const [donationmodal, setdonationmodal] = useState(false);
  const [donatemodal, setdonatemodal] = useState(false);
  const [myData, setMyData] = useState();
  const [filterData, setFilterData] = useState([]);

  const [countoffav, setcountoffav] = useState(0);
  const [buttonclicked, setbuttonclicked] = useState(false);
  const [filter, setfilter] = useState([]);
  const [allData, setAllData] = useState([]);
  const [bidTrigger, setBidtrigger] = useState(false);
  const [isInterval, setIsInterval] = useState(false);
  const [collectionLoading, setCollectionLoading] = useState(false);

  const [paramsCheck, setParams] = useState();
  const [paramsLoading, setParamsLoading] = useState(true);
  const [imageShow, setImageShow] = useState(false);
  const [timer, setTimer] = useState(false);
  const [bidInProgress, setBidInProgress] = useState(false);
  const [isOfferInProgress, setIsOfferInProgress] = useState(false);
  const [favnft, setfavnft] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [bidError, setBidError] = useState(false);
  const [bidError1, setBidError1] = useState(false);
  const [bidError2, setBidError2] = useState(false);
  const [expiryError, setExpiryError] = useState(false);
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [myDataLoader, setmyDataLoader] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [isStacked, setIsStacked] = useState(false);
  const [stakeLoading, setStakeLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [collectionData, setCollectionData] = useState();
  const [numItems, setNumItems] = useState(4);
  const [editmycomment, Seteditmycomment] = useState(false);
  const [editmycommentid, Seteditmycommentid] = useState(0);
  const [isTransactionSuccess, setIsTransactionSuccess] = useState(false);
  const [height, Setheight] = useState(270);

  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);

  const [getMasterAddress, setGetMasterAddress] = useState();
  const [loader, setLoader] = useState(true);
  const [openBid, setOpenBid] = useState(false);
  const [comment1, setcommect1] = useState("");
  const [comments, setcommect] = useState([]);
  const [sellingIsLoading, setSellingIsLoading] = useState(false);

  const [Allcomments, SetAllcomments] = useState([]);
  const [commentloading, setcommentloading] = useState(false);
  const [updatedcomment, setupdatedcomment] = useState("");
  const [Acceptloader, setAcceptloader] = useState(false);

  const [NewPrice, SetNewPrice] = useState("");
  const [sellingError, setSellingError] = useState(false);
  const [sellingBtn, setSellingBtn] = useState(true);


  const [donationamount, setdonationamount] = useState(0);
  const [donationError, setDonationError] = useState(true);

  const [amountCheck, setAmounCheck] = useState(false);
  const [amountCheck1, setAmounCheck1] = useState(false);
  const [amountCheck2, setAmounCheck2] = useState(false);
  const [amountCheck3, setAmounCheck3] = useState(false);
  const [amountCheck4, setAmounCheck4] = useState(false);

  const [balance, setBalance] = useState();

  const [openBidCheck, setOpenBidCheck] = useState(false);
  const [openBidCheck1, setOpenBidCheck1] = useState(false);

  const [donationStat, setDonationStat] = useState([]);

  const [offerBidBtn, setOfferBidBtn] = useState(true);
  const [doantionClick, setdoantionClick] = useState(false);
  const [isFav, setisFav] = useState(false);

  const [errs, seterrs] = useState({});
  const [wBNB, setWBNB] = useState(0);

  const handleImageShow = () => setImageShow(true);
  const handleImageClose = () => setImageShow(false);
  const handleClose1 = () => {
    if (!bidInProgress) {


      // Min amount
      setInputAmount("");
      setOpenBid(false);
      setOfferBidBtn(true);
      setAmounCheck2(false);
      setOpenBidCheck(false);
      setAmounCheck(false);

      // Max amount
      setMaxInputAmount("");
      setAmounCheck1(false);
      setAmounCheck3(false);
      setOpenBidCheck1(false);
      setAmounCheck(false);

      // Start Date
      setBidError(false);
      setStartDate(new Date());

      // End Date
      setBidError1(false);
      setEndDate(new Date());

      // Switch
      setIsSwitchOn(false)

    }
  }

  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );
  const Token = useSelector((state) => state.Login?.authResponse?.data?.token);

  const WalletBalance = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.balance
  );

  const sellingModal = () => {
    if (!sellingIsLoading) {
      setFilterTrigger(false);
      setSellingError(false);
      setSellingBtn(true);
    }
  };

  const handleDonation = (e) => {
    const reg = /^(?!00)[0-9]\d{0,8}(\.|\d+)?(\d{0,5})$/;
    const mat = reg.test(e);
    if (mat || e === "") {
      setdonationamount(e);
      if (e === "") {
        setDonationError(true);
        return;
      }
      setDonationError(false);
    } else {
      setDonationError(false);
      setdonationamount(donationamount + "");
    }
  };

  const doationhandler = () => {
    setdonationmodal(false);
    setDonationError(true);
    setdonationamount("");
  };
  const doatehandler = () => {
    setdonatemodal(false);
    setDonationError(true);
    setdonationamount("");
  };

  const handleBtnClick = () => {
    setOpenMenu(true);
    setOpenMenu1(false);
    setOpenMenu2(false);
    document.getElementById("Mainbtn").classList.add("active");
    // document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };

  const handleBtnClick1 = () => {
    setOpenMenu1(true);
    setOpenMenu2(false);
    setOpenMenu(false);

    // document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };

  const handleBtnClick2 = () => {
    setOpenMenu2(true);
    setOpenMenu(false);
    setOpenMenu1(false);

    document.getElementById("Mainbtn").classList.remove("active");
    // document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.add("active");
  };

  // const loadMore = () => {
  //   let collectionDataState = collectionData;
  //   let start = collectionDataState?.length;
  //   let end = collectionDataState?.length + 4;
  //   if (filterData.length) {
  //     setCollectionData([...collectionDataState, ...filterData?.slice(start, end)]);
  //   } else {
  //     setCollectionData([
  //       ...collectionDataState,
  //       ...collectionData?.slice(start, end),
  //     ]);
  //   }
  // };

  const loadMore = () => {
    if (collectionData?.length > numItems) {
      // console.log(numItems);
      // console.log(collectionData?.length);
      setNumItems((prev) => prev + 3);
    }
  };

  const handleClose = () => {
    setShow(false);
    setAmounCheck1(false);
    setAmounCheck(false);
    setInputAmount(null);
    setIsSwitchOn(false);
    setExpiryError(false);
    setAmounCheck4(false)
    setExpiryDate(new Date());
  };

  const handleShow = () => {
    if (!isConnected || isConnected === undefined) {
      return history.push("/connectwallet");
    } else {
      setShow(true);
    }
  };

  const SUBMIT = async (Blogid, comment) => {
    setcommentloading(true);
    await http
      .post(
        httpUrl +
        "/api/v1/Nft/AddComment?nftId=" +
        Blogid +
        "&comment=" +
        comment
      )
      .then(async (res) => {
        getallcoments();
      })
      .catch((error) => {
        setcommentloading(false);
      });
  };

  const Editcomment = async (Nftid, commentid) => {
    setcommentloading(true);
    await http
      .put(
        httpUrl +
        "/api/v1/Nft/UpdateComment?nftId=" +
        Nftid +
        "&commentId=" +
        commentid,
        { comments: updatedcomment }
      )
      .then(async (res) => {
        getallcoments();
      })
      .catch((error) => {
        setcommentloading(false);
      });
  };

  const getallcoments = async () => {
    let params = window.location.pathname;
    setParams(params.split("/")[1]);
    await http
      .get(httpUrl + `/api/v1/Nft/GetAllComment?nftId=${params.split("/")[2]}`)
      .then(async (res) => {
        SetAllcomments(res.data.data);
      })
      .catch((error) => {
        setcommentloading(false);
      });
  };

  useEffect(() => {
    getallcoments();

    // console.log("WBNB...........", WalletAddress);
    checkWBNB("0x6cfB4Daf6b2AbbfE7c0db97F0013bfB76E43D276", WalletAddress).then(resp => {
      // console.log("WBNB...........", resp);
      setWBNB(Web3.utils.fromWei(resp))

    }).catch(error => {
      console.log("this is error  ::  ", error)
    })
    // checkBalance()

  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, [myData]);

  useEffect(() => {
    getMarketByid();
  }, [id, accountId]);

  // useEffect(async () => {
  //   if (myData && myData.collectionId) {
  //     getNftCollection();
  //   }
  // }, [myData]);

  // const getNftCollection = async () => {
  //   setCollectionLoading(true);
  //   // viewsCount()
  //   console.log(myData);
  //   await http
  //     .get(
  //       httpUrl +
  //       `/api/v1/Nft/GetAllNftsByCollectionId?collectionId=${myData.collectionId}&PageSize=9999&CurrentPage=1`
  //     )
  //     .then(async (res) => {
  //       console.log("object", res.data.data);
  //       setCollectionData(res.data.data);
  //       setCollectionLoading(false);
  //     })
  //     .catch((error) => {
  //       getNftCollection();
  //       console.log(error);
  //     });
  // };

  useEffect(async () => {
    if (WalletBalance) {
      const amount = Web3.utils.fromWei(WalletBalance.toString(), "ether");
      setBalance(amount);
      const payload = {
        nftId: id,
        accountId: accountId,
      };
    } else {
      setBalance("0");
      const payload = {
        nftId: id,
        accountId: accountId,
      };
    }
  }, [id, accountId]);

  useEffect(() => {
    if (myData) {
      // console.log(MyProfile);
      profileData();
    }
  }, [myData]);

  useEffect(() => {
    // setTimer(true)
    let params = window.location.pathname;
    setParams(params.split("/")[1]);
    setParamsLoading(false);
    if (myData && !isInterval) {
      const eventTime = moment(myData?.bidEndDate).unix();
      const currentTime = moment().unix();
      const diffTime = eventTime - currentTime;
      let duration = moment.duration(diffTime * 1000, "milliseconds");
      const interval = 1000;
      var timerID = setInterval(() => {
        setIsInterval(true);
        if (duration._milliseconds <= 0) {
          setDays("0");
          setHours("0");
          setMinutes("0");
          setSeconds("0");
          setTimer(true);
        } else {
          duration = moment.duration(duration - interval, "milliseconds");
          setDays(duration.days());
          setHours(duration.hours());
          setMinutes(duration.minutes());
          setSeconds(duration.seconds());
          setTimer(true);
        }
      }, interval);
      return () => clearInterval(timerID);
    }
  }, [myData?.bidEndDate]);

  useEffect(() => {
    if (myData) {
      AllBids();
    }
  }, [myData]);

  useEffect(async () => {
    if (isConnected) {
      await dispatch(GetFavouriteNftAction());
    }
    donationStats();
  }, []);

  const AllBids = async () => {
    let params = window.location.pathname;
    setParams(params.split("/")[1]);
    setParamsLoading(false);
    if (WalletBalance) {
      const amount = await Web3.utils.fromWei(
        WalletBalance.toString(),
        "ether"
      );
      setBalance(amount);
      http
        .get(httpUrl + `/api/v1/Nft/GetNftBids?NftId=${params.split("/")[2]}`)
        .then(async (res) => {
          if (!res.data.data || res.data.data === null) {
            setEmptyBids(true);
            setIsLoading(false);
            setShow(false);
            setIsBiddingLoading(false);
          } else {
            setEmptyBids(false);
            setBiddings(res.data.data);
            setIsBiddingLoading(false);
            setShow(false);
            setIsLoading(false);
          }
        })
        .catch(() => {
          AllBids();
        });
    } else {
      http
        .get(httpUrl + `/api/v1/Nft/GetNftBids?NftId=${params.split("/")[2]}`)
        .then(async (res) => {
          if (!res.data.data || res.data.data === null) {
            setEmptyBids(true);
            setIsLoading(false);
            setShow(false);
            setIsBiddingLoading(false);
          } else {
            setBiddings(res.data.data);
            setIsBiddingLoading(false);
            setShow(false);
            setIsLoading(false);
          }
        })
        .catch(() => {
          AllBids();
        });
    }
  };

  useEffect(() => {
    if (myData) {
      viewsCount();
    }
  }, [myData]);

  useEffect(() => {
    if (myData) {
      MasterAddressFunc();
    }
  }, [myData]);
  useEffect(() => {
    if (donatemodal == false) {
      setdoantionClick(false)
    }
  }, [donatemodal]);

  const MasterAddressFunc = async () => {
    http
      .get(httpUrl + "/api/v1/Nft/GetMasterAddress")
      .then(async (res) => {
        if (WalletBalance) {
          const amount = await Web3.utils.fromWei(
            WalletBalance.toString(),
            "ether"
          );
          setBalance(amount);
          setGetMasterAddress(res?.data?.data?.address);
        } else {
          setBalance("0");
          setGetMasterAddress(res?.data?.data?.address);
        }
      })
      .catch((error) => {
        // MasterAddressFunc()
        console.log(error);
      });
  };

  const viewsCount = async (e) => {
    await http
      .post(httpUrl + `/api/v1/Nft/AddViewNft?NftId=${myData?.id}`)
      .then((res) => {
        // console.log("view added", res);
      })
      .catch((e) => {
        console.log("er", e);
      });
  };

  const profileData = async (e) => {
    if (WalletAddress) {
      await http
        .get(httpUrl + `/api/v1/Account/GetAccount?address=${WalletAddress}`)
        .then((res) => {
          setIsStacked(res.data.data.isStacked);
          setStakeLoading(false);
        })
        .catch((e) => {
          profileData();
          console.log("er stackingggg", e);
        });
    } else {
      setStakeLoading(false);
    }
  };

  const handleSelling = (e) => {
    const reg = /^(?!00)[0-9]\d{0,8}(\.|\d+)?(\d{0,5})$/;
    const mat = reg.test(e);
    if (mat || e === "") {
      if (e === "") {
        setSellingBtn(true)
        return
      }
      SetNewPrice(e);
      setSellingBtn(false)
    } else {
      SetNewPrice(NewPrice + "");
      setSellingBtn(true)

    }
  };

  const sellingSubmit = (e) => {
    e.preventDefault();
    if (NewPrice == "" || NewPrice == null) {
      setSellingError(true);
    } else if (parseFloat(NewPrice) == 0) {
      setSellingError(true);
    } else {
      setSellingError(false);
      sellingHandler();
    }
  };

  const sellingHandler = async () => {
    setSellingIsLoading(true);
    const address = {
      address: myData.ownerAddress,
    };
    await http
      .post(httpUrl + "/api/v1/auth/connect", address)
      .then(async (res) => {
        toast.success(`Selling in process`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        await http
          .get(httpUrl + "/api/v1/Nft/GetMarketNftAddress")
          .then(async (res) => {
            const payload = {
              approved: res?.data,
              tokenId: myData?.nftTokenId,
            };
            const payloadMarket = {
              nftContractId: myData?.contractAddress,
              tokenId: myData?.nftTokenId,
              price: NewPrice,
              // orgnizationPercentage: myData?.organizationPercentAmount ? (myData?.organizationPercentAmount) : '0',
              // marketAddress: resAddress
            };
            dispatch(
              approveContract(payload, myData?.contractAddress, payloadMarket)
                .then(async (r) => {
                  toast.success(`Contract approved, wait for the last step`, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  let body = {
                    nftId: myData?.id,
                    price: NewPrice,
                    approvalTransactionHash: r.res.hash,
                    openOrderTransactionHash: r.response.hash,
                  };
                  delay(12000).then(async () => {
                    await http
                      .post(httpUrl + "/api/v1/Nft/SellNftMarket", body)
                      .then(async (res) => {
                        toast.success(
                          `NFT Selling in process, you will be redirected shortly`,
                          {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          }
                        );

                        setTimeout(() => {
                          history.push("/marketplace");
                        }, 3000);
                      });
                  });
                })
                .catch((e) => {
                  setSellingIsLoading(false);
                  console.log("error in approve", e);
                })
            );
            marketFunction();
            setSellingIsLoading(false);
          });
      })
      .catch((error) => { });
  };

  const marketFunction = (e) => {
    const payloadMarket = {
      nftContractId: myData?.contractAddress,
      tokenId: myData?.nftTokenId,
      price: NewPrice,
    };
    dispatch(
      approveContract(payloadMarket, myData?.contractAddress).then((ress) => {
        // console.log(ress);
      })
    ).catch((e) => {
      console.log("error in market", e);
    });
  };
  async function getMarketByid() {
    await http
      .get(
        httpUrl +
        `/api/v1/Nft/GetNftMarketById?nftId=${id}&accountId=${accountId}`
      )
      .then(async (res) => {
        if (res.data.message === "NFTMarket not found") {
          history.push("/marketplace");
        }
        setMyData(res.data.data);
        if (GetFavouriteNft?.some((data) => data.id === res.data.data?.id)) {
          setfavnft(true);
        } else {
          setfavnft(false);
        }
        setcountoffav(res.data.data?.nftFavouritesCount);
        //  collectionimage(res?.data.data.collectionId)

        setmyDataLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const acceptBidOffer = async (id, price, buyerAddress, contractAddress) => {
    await http
      .get(httpUrl + `/api/v1/Nft/GetMarketNftAddress`)
      .then(async (res) => {
        const payload = {
          contractAddress: res.data.data,
          tokenId: myData?.nftTokenId,
          price: price,
          buyerAddress: buyerAddress,
          nftContractAddress: contractAddress,
        };
        dispatch(acceptBid(payload))
          .then((res) => {
            delay(5000).then(async () => {
              setAcceptloader(false);
              toast.success(`Bid has been accepted!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

              await http
                .put(
                  httpUrl +
                  `/api/v1/Nft/bidAccepted?bidId=${id}&TransactionHash=${res.hash}`
                )
                .then(async (res) => {
                  setAcceptloader(false);
                  delay(2000).then(async () => {
                    history.push("/marketplace");
                  });
                });
            });
          })
          .catch(() => {
            setAcceptloader(false);
            toast.error(`Transaction rejected`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      });
  };

  const AmountOffer = (value) => {
    const reg = /^(?!00)[0-9]\d{0,8}(\.|\d+)?(\d{0,4})$/;
    const mat = reg.test(value);

    if (mat || value === "") {
      setInputAmount(value);

      if (value == "") {
        setOfferBidBtn(true)
        return
      }
      setOfferBidBtn(false)

    } else {
      setInputAmount(inputAmount + "");
    }
    if (parseFloat(value) <= myData?.bidInitialMinimumAmount) {
      setAmounCheck4(true);
      setAmounCheck(false);
      setOfferBidBtn(true)

    } else {
      setAmounCheck4(false)
      setAmounCheck(false);
      setOfferBidBtn(false)

    }
  };

  const amountStatus = (value) => {
    const reg = /^(?!00)[0-9]\d{0,8}(\.|\d+)?(\d{0,5})$/;
    const mat = reg.test(value);
    if (mat || value === "") {
      setInputAmount(value);
      if (value === "" || parseFloat(value) === 0) {
        setOfferBidBtn(true)
      } else {
        setOfferBidBtn(false)
      }

    } else {
      setInputAmount(inputAmount + "");
    }

    if (parseFloat(value) > parseFloat(maxInputAmount)) {
      setAmounCheck2(true);
      setOpenBidCheck(false);
      setOfferBidBtn(true);
    } else if (parseFloat(value) < 0.00001) {
      seterrs({
        ...errs,
        minPriceErr: "minimum price in 'min' should be 0.00001"
      })
    }
    else if (parseFloat(value) > 999999999.99999) {
      seterrs({
        ...errs,
        minPriceErr: "maximum price in 'min' should be 999999999.99999"
      })
    }
    else {
      setOfferBidBtn(false)
      setOpenBidCheck(true);
      setAmounCheck2(false);
      setAmounCheck(false);
      seterrs({
        ...errs,
        minPriceErr: false
      })
    }
  };

  const amountStatus1 = (value) => {
    const reg = /^(?!_-)(?!00)[0-9]\d{0,8}(\.|\d+)?(\d{0,4})$/;
    // const mat = reg.test(value);
    const mat = value.match(reg);

    if (mat || value === "") {
      setMaxInputAmount(value);
      if (parseFloat(value) === 0) {
        setOpenBidCheck(false)
      } else {
        setOpenBidCheck(true)
      }
    } else {
      setMaxInputAmount(maxInputAmount + "");
    }
    if (parseFloat(value) < parseFloat(inputAmount)) {
      setAmounCheck1(true);
      setAmounCheck2(true);

      setOpenBidCheck1(false);
    } else if (parseFloat(value) < 0.00001) {
      seterrs({
        ...errs,
        maxPriceErr: "minimum price in 'max' should be 0.00001"
      })
    }
    else if (parseFloat(value) > 999999999.99999) {
      seterrs({
        ...errs,
        maxPriceErr: "maximum price in 'max' should be 999999999.99999"
      })
    }
    else if (parseFloat(value) === parseFloat(inputAmount)) {
      setAmounCheck3(true);
      setOpenBidCheck1(false);
    } else {
      setAmounCheck2(false);
      setAmounCheck1(false);
      setAmounCheck3(false);
      setOpenBidCheck1(true);
      setAmounCheck(false);
      seterrs({
        ...errs,
        maxPriceErr: false
      })
    }
  };

  const openBidding = async () => {
    setBidInProgress(true);

    let params = window.location.pathname;
    // console.log("nftid", params.split("/")[2]);
    // console.log("accountid", params.split("/")[3]);
    await http
      .get(httpUrl + "/api/v1/Nft/GetMarketNftAddress")
      .then(async (res) => {
        const contractPayload = {
          nftContractId: myData?.contractAddress,
          tokenId: myData?.nftTokenId,
          price: inputAmount,
          maxPrice: maxInputAmount,
          contractAddress: res.data.data,
        };
        dispatch(openForAuction(contractPayload))
          .then(async (approvedHashes) => {
            let params = window.location.pathname;
            const payload = {
              nftId: params.split("/")[2],
              isBidOpen: true,
              minimumAmount: inputAmount,
              maximumAmount: maxInputAmount,
              bidStartDate: startDate,
              bidEndDate: endDate,
            };
            await http
              .post(httpUrl + "/api/v1/Nft/OpenBid", payload)
              .then(async (res) => {
                let body = {
                  nftId: params.split("/")[2],
                  price: maxInputAmount,
                  approvalTransactionHash: approvedHashes.res.hash,
                  openOrderTransactionHash: approvedHashes.response.hash,
                };
                setShow(false);
                setBidtrigger(true);
                delay(5000).then(async () => {
                  await http
                    .post(httpUrl + "/api/v1/Nft/SellNftMarket", body)
                    .then(async (res) => {
                      setBidInProgress(false);
                      toast.success(
                        `NFT Bidding has been opened, you will be redirected shortly`,
                        {
                          position: "top-right",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        }
                      );
                      setTimeout(() => {
                        history.push("/marketplace");
                      }, 3000);
                    })
                    .catch((err) => {
                      setBidInProgress(false);
                    });
                });
              })
              .catch((err) => {
                console.log("OpenBid" + err);
                setBidInProgress(false);
              });
          })
          .catch((err) => {
            toast.error(`Transaction Rejected`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setBidInProgress(false);
          });
      })
      .catch((err) => {
        console.log("GetMarketNftAddress" + err);
        setBidInProgress(false);
      });
  };

  const cancelListing = async () => {
    setCancelLoading(true);
    await http
      .get(httpUrl + "/api/v1/Nft/GetMarketNftAddress")
      .then(async (res) => {
        const contractPayload = {
          contractAddress: res.data.data,
          nftContractId: myData?.contractAddress,
          tokenId: myData?.nftTokenId,
        };
        dispatch(cancelNft(contractPayload))
          .then(async (approvedHash) => {
            const hashPayload = {
              nftId: myData?.id,
              cancelTransactionHash: approvedHash.hash,
            };
            delay(8000).then(async () => {
              await http
                .post(httpUrl + "/api/v1/Nft/NftCancelStatus", hashPayload)
                .then(async (res) => {
                  toast.success(`NFT has been unlisted from marketplace`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  setCancelLoading(false);
                  setTimeout(() => {
                    history.push("/myprofile");
                  }, 3000);
                });
            });
          })
          .catch(() => {
            toast.error(`Transaction Rejected`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setCancelLoading(false);
          });
      });
  };

  const donationSubmit = () => {
    Donationset();
  };

  const Donationset = async () => {
    setSellingIsLoading(true);
    // setCancelLoading(true)
    setdoantionClick(true)
    await http
      .get(httpUrl + "/api/v1/Nft/GetMarketNftAddress")
      .then(async (res) => {
        const contractPayload = {
          contractAddress: res.data.data,
          nftContractId: myData?.contractAddress,
          tokenId: myData?.nftTokenId,
        };
        dispatch(Donation(contractPayload))
          .then(async (approvedHash) => {
            const hashPayload = {
              hash: approvedHash.hash,
              amount: parseFloat(donationamount),
              nftId: parseInt(myData?.id),
            };
            const data = {
              "nftId": myData?.id,
              "tranHash": approvedHash.hash,
              "amount": hashPayload.amount
            }
            delay(8000).then(async () => {
              await http
                .post(
                  httpUrl +
                  "/api/v1/Nft/AddDonation",
                  data, { headers: { 'Accept': 'text/plain' } }
                )
                .then(async (res) => {
                  setSellingIsLoading(false);
                  setdoantionClick(false)
                  console.log("back to hold", res);
                  if (res.data.isSuccess) {
                    toast.success(`NFT has been add for Donation`, {
                      position: "top-right",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                    setCancelLoading(false);
                    setTimeout(() => {
                      history.push("/marketplace");
                    }, 3000);
                  } else {
                    setdoantionClick(false)
                    toast.error(`${res.data.message}`, {
                      position: "top-right",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                    setCancelLoading(false);
                  }
                })
                .catch((err) => {
                  console.log(err);
                  alert("something went wrong!!");
                });
            });
          })
          .catch(() => {
            toast.error(`Transaction Rejected`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setCancelLoading(false)
          });
      });
  };

  const expiryDateFunc = (date) => {
    let dateNow = new Date();
    dateNow = moment(dateNow).unix();
    let dateEntered = moment(date).unix();
    if (dateEntered <= dateNow) {
      setExpiryError(true);
    } else {
      setExpiryError(false);
      setExpiryDate(date);
    }
  };

  const startDateFunc = (date) => {
    // let dateNow = new Date();
    // dateNow = moment(dateNow).unix();
    // let dateEntered = moment(date).unix();
    // if (dateEntered <= dateNow) {
    //   console.log("errer");
    //   setBidError(true);
    // } else {
    //   setBidError(false);
    //   console.log(date);
    //   setStartDate(date);
    // }
    let dateNow = new Date();
    dateNow = moment(dateNow).format('YYYY-MM-DD');
    let dateEntered = moment(date).format('YYYY-MM-DD');
    let edDate = moment(endDate).format('YYYY-MM-DD');

    if (dateEntered < dateNow || date === null) {
      setBidInProgress(true);
      setBidError(true);
      setBidError2(false);
      setStartDate(date);
    } else if (dateEntered > edDate) {
      setBidInProgress(true);
      setBidError(false);
      setBidError2(true);
      setStartDate(date);
    } else {
      setBidInProgress(false);
      setBidError2(false);
      setBidError(false);
      setStartDate(date);
    }
  };

  const endDateFunc = (date) => {
    // let dateNow = new Date();
    // dateNow = moment(dateNow).unix();
    // let dateEntered = moment(date).unix();
    // if (dateEntered <= dateNow) {
    //   console.log("errer");
    //   setBidError1(true);
    // } else {
    //   setBidError1(false);
    //   console.log(date);
    //   setEndDate(date);
    // }
    let dateNow = new Date();
    dateNow = moment(dateNow).format('YYYY-MM-DD');
    let dateEntered = moment(date).format('YYYY-MM-DD');
    let stDate = moment(startDate).format('YYYY-MM-DD');

    if (dateEntered < dateNow || dateEntered < stDate || date === null) {
      setBidInProgress(true);
      setBidError1(true);
      setEndDate(date);
    } else {
      setBidInProgress(false);
      setBidError1(false);
      setBidError2(false);
      setEndDate(date);
    }
  };

  const switchStatus = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const postBidding = async () => {
    setIsOfferInProgress(true);
    if (inputAmount == undefined) {
      setIsOfferInProgress(false);
      return;
    }
    let params = window.location.pathname;
    const amount = Web3.utils.fromWei(WalletBalance.toString(), "ether");
    setBalance(amount);
    await http
      .get(httpUrl + "/api/v1/Nft/GetWBNBAddress")
      .then(async (response) => {
        await http
          .get(httpUrl + `/api/v1/Nft/GetMarketNftAddress`)
          .then(async (res) => {
            const contractPayload = {
              marketPlaceContract: res.data.data,
              ownerAddress: myData?.ownerAddress,
              contractAddress: response?.data?.data,
              id: myData?.nftTokenId,
              price: inputAmount,
            };
            setBidtrigger(false);
            dispatch(approveNft(contractPayload))
              .then((res) => {
                toast.success(`Bidding is in process!`, {
                  position: "top-right",
                  autoClose: 10000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                delay(15000).then(async () => {
                  biddingPosting(res.hash);
                });
              })
              .catch(() => {
                toast.error(`Transaction rejected`, {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                setIsOfferInProgress(false);
              });
          });
      });
  };

  const biddingPosting = async (hash) => {
    let params = window.location.pathname;
    let expp = moment(expiryDate).unix();
    let current = moment(expiryDate).unix();
    let diff = expp - current;
    let duration = moment.duration(diff * 1000, "milliseconds");
    const payload = {
      nftId: params.split("/")[2],
      price: inputAmount,
      bidApprovalHash: hash,
      expiryDate: expiryDate,
    };
    await http
      .post(httpUrl + "/api/v1/Nft/AddNftBid", payload)
      .then(async (res) => {
        toast.success(`Bid has been added!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIsOfferInProgress(false);
        getBiddings(payload);
      })
      .catch((error) => {
        biddingPosting();
        setIsOfferInProgress(false);
      });
  };

  const getBiddings = async (payload) => {
    await http
      .get(httpUrl + `/api/v1/Nft/GetNftBids?NftId=${payload.nftId}`)
      .then(async (res) => {
        if (!res.data.data || res.data.data === null) {
          setEmptyBids(true);
        }
        setEmptyBids(false);
        setBiddings(res.data.data);
        setIsLoading(false);
        setIsBiddingLoading(false);
        setShow(false);
        setBidtrigger(true);
      })
      .catch(() => {
        getBiddings(payload);
      });
  };

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    if (window.ethereum) {
      if (!isConnected || isConnected == undefined) {
        return history.push("/connectwallet");
      }

      setIsLoading(false);
      dispatch(signMessage(AuthConnectState?.message))
        .then(async (res) => {
          const amount = parseInt(
            Web3.utils.toWei(String(myData?.sellPrice))
          ).toString(16);

          setIsLoading(false);
          const payload = [
            {
              from: WalletAddress,
              to: getMasterAddress,
              value: amount,
            },
          ];
          await dispatch(sendTransection(payload))
            .then(async (res) => {
              const payload = {
                nftId: myData.id,
                address: WalletAddress,
                transactionHash: res,
              };
              await dispatch(BuyNftMarketAction(payload))
                .then((res) => {
                  setIsTransactionSuccess(true);
                  toast.success(`${res.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              setIsLoading(false);
              toast.error(`${error?.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              console.log(error);
            });
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error, "Signature Error");
        });
    } else {
      toast.error(`Please Install Metamask Extension`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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

  const inputhandler = (e) => {
    const { value } = e.target;
    SetNewPrice(value);
  };

  const buyNft = async () => {
    if (!isConnected || isConnected == undefined) {
      return history.push("/connectwallet");
    } else {
      setBidInProgress(true);
      await http
        .get(httpUrl + `/api/v1/Nft/GetMarketNftAddress`)
        .then(async (res) => {
          const payload = {
            contractAddress: res.data.data,
            nftContractId: myData?.contractAddress,
            tokenId: myData?.nftTokenId,
            price: myData?.sellPrice,
          };
          dispatch(buyNftMarket(payload))
            .then((res) => {
              toast.success(`NFT purchasing in process. Please wait.`, {
                position: "top-right",
                autoClose: 15000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              delay(22000).then(async () => {
                toast.success(`NFT bought!`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                const payload1 = {
                  address: "",
                  transactionHash: res.hash,
                  nftId: myData?.id,
                };
                buyNftMarketFunc(payload1);
              });
            })
            .catch((err) => {
              toast.error(`Transaction rejected`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setBidInProgress(false);
            });
        });
    }
  };

  const DonateToNFT = async () => {
    if (!isConnected || isConnected == undefined) {
      return history.push("/connectwallet");
    } else {
      setSellingIsLoading(true);
      await http
        .get(httpUrl + `/api/v1/Nft/GetMarketNftAddress`)
        .then(async (res) => {
          const payload = {
            contractAddress: res.data.data,
            nftContractId: myData?.contractAddress,
            tokenId: myData?.nftTokenId,
            price: myData?.donationPrice,
          };
          dispatch(DonationtoOwner(payload))
            .then(async (res) => {
              toast.success(`Donation is in process. Please wait.`, {
                position: "top-right",
                autoClose: 15000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              const data = {
                "tranHash": res.hash,
                "amount": parseFloat(donationamount),
                "nftId": myData?.id,
                "ownerAccountId": parseInt(accountId),
              }
              await axios
                .post(
                  httpUrl + "/api/v1/Nft/AddAmountDonation",
                  {
                    tranHash: res.hash,
                    amount: parseFloat(donationamount),
                    nftId: myData?.id,
                    ownerAccountId: parseInt(accountId),
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${Token}`,
                    },
                  }
                )
                .then(async (res) => {
                  console.log(res.data, "bought nft");
                  if (res.data.isSuccess) {
                    setSellingIsLoading(false);
                    setdoantionClick(false)
                    toast.success(`Donated!`, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  } else {
                    setdoantionClick(false)
                    toast.error(res.data.message, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                    setTimeout(() => {
                      toast.error("try again!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                      setTimeout(() => {
                        window.location.reload()
                      }, 2000);
                    }, 3000);
                  }
                });
            })
            .catch((err) => {
              toast.error(`Transaction rejected`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            });
        });
    }
  };

  const buyNftMarketFunc = async (payload) => {
    await http
      .post(httpUrl + "/api/v1/Nft/BuyNftMarket", payload)
      .then(async (response) => {
        setBidInProgress(false);
        setTimeout(() => {
          history.push("/myprofile");
        }, 1000);
      })
      .catch((err) => {
        buyNftMarketFunc(payload);
        // setBidInProgress(false);
      });
  };
  const removeToFavourite = async (e, nftId, OwnerAddress) => {
    e.preventDefault()
    if (!favouriteInProgress) {
      const payload = {
        nftId: nftId,
        nftAddress: OwnerAddress,
      };
      await dispatch(RemoveFavouriteNftAction(payload))
        .then(async (resp) => {
          console.log(resp, "khdwqhdio");
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

            await dispatch(GetFavouriteNftAction());
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
  const addToFavourite = async (e, nftID, OwnerAddress) => {
    e.preventDefault()
    setisFav(true)
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
        console.log(resp.data, "resp fav");
        if (resp?.data?.isSuccess === true) {
          getMarketByid()
          toast.success(`${resp.data?.data ? resp.data?.data : "Favourite NFT successfully added"}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            setisFav(false)
          }, 5000);
          await dispatch(GetFavouriteNftAction());
          // setTimeout(() => window.location.reload(), 2000);
        } else if (resp?.data?.isSuccess === false) {
          toast.error(`NFT Already Liked`, {
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

  const removeFromLike = (id, owner) => {
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
        nftId: id,
        nftAddress: owner,
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
            // likeAndDisLikeCallback()
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

  const addToLike = (id, owner) => {
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
        nftId: id,
        nftAddress: owner,
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
            // likeAndDisLikeCallback()
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

  const likeUnlikeComment = (id, nftId, bool) => {
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

      return;
    }
    http
      .post(
        httpUrl +
        `/api/v1/Nft/AddLikeAndUnLikeComment?nftId=${nftId}&commentId=${id}&like=${bool}`
      )
      .then((resp) => {
        // var mess = `Comment Liked`
        // if(!bool){
        //   mess = `Comment Disliked`
        // }
        if (resp.data.isSuccess) {
          getallcoments();
          if (bool) {
            toast.success(resp.data.data, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error(resp.data.data, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        } else {
          toast.danger(resp.data.message, {
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
        console.log(error, "comments mess err");

        toast.error(`Something went wrong`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const donationStats = () => {
    setLoader(true);
    setmyDataLoader(true);
    let params = window.location.pathname;
    setParams(params.split("/")[1]);
    http
      .get(
        httpUrl + `/api/v1/Nft/NftDonationStats?nftId=${params.split("/")[2]}`
      )
      .then((resp) => {
        if (resp.data.isSuccess) {
          setDonationStat(resp.data.data);
          setTimeout(() => {
            setLoader(false);
            setmyDataLoader(false);
          }, 5000);
        } else {
          setLoader(false);
          setmyDataLoader(false);
        }
      })
      .catch((error) => {
        setLoader(false);
        setmyDataLoader(false);
      });
  };
  function getHeart() {
    let i = ""
    if (myData?.isFavourite == true) {
      if (isFav == true) {
        i = <li>
          <a href="#" style={{ background: 'grey', cursor: 'no-drop' }}>
            <i className="fa fa-heart-o"></i>
          </a>
        </li>
      } else {
        i = <li onClick={(e) => addToFavourite(e, myData.id, myData.ownerAddress)}>
          <a href="" style={{
            background: 'red',
            borderColor: 'red'
          }}>
            <i className="fa fa-heart-o" style={{ color: '#fff' }}></i>
          </a>
        </li>
      }
    }
    else if (myData?.isFavourite == false) {
      if (isFav == true) {
        i = <li>
          <a href="#" style={{ background: 'grey', cursor: 'no-drop' }}>
            <i className="fa fa-heart-o"></i>
          </a>
        </li>
      } else {
        i = <li onClick={(e) => addToFavourite(e, myData.id, myData.ownerAddress)}>
          <a href="">
            <i className="fa fa-heart-o"></i>
          </a>
        </li>
      }
    }
    return i
  }

  return (
    <div>
      <GlobalStyles />
      {loader && myDataLoader ? (
        <>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="col-sm-12 d-flex justify-content-center margin-top-150">
            <RingLoader color="white" size="60" />
          </div>
        </>
      ) : (
        <>
          <section className="container user-nft-head">
            <div className="row  pt-md-4">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <h1>{myData?.name}</h1>

                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb ">
                    <li class="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">
                      {myData?.ownerAddress === WalletAddress
                        ? "MyNftDetails"
                        : "Nftdetails"}
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      {myData?.ownerName ? myData?.ownerName : "Unnamed"}
                    </li>
                  </ol>
                </nav>
              </div>

              <div className="col-lg-6 col-md-12 col-sm-12">
                <div
                  className="my-profile-Img-pnl full-div"
                  style={{
                    background: `url(${httpUrl + "/" + myData?.image.replaceAll("\\", "/")
                      }) no-repeat`,
                  }}
                >
                  {
                    myData?.image.split(".")[1] == "mp4" ?

                      <video width="100%" controls>
                        <source src={`${httpUrl}/${myData?.image}`} />
                        Your browser does not support HTML video.
                      </video> :
                      <img
                        src={`${httpUrl}/${myData?.image}`}
                        className="img-fluid img-rounded mb-sm-30"
                        alt="NFT.png"
                      />
                  }
                  {/* <span
                    className="heart-span hanging"
                    style={{ cursor: "pointer" }}
                  >
                    {favnft ? (
                      <i
                        className="fa fa-heart-o"
                        style={{ color: "red" }}
                        onClick={() => {
                          buttonclicked ? (
                            <></>
                          ) : (
                            removeFromLike(myData?.id, myData?.ownerAddress)
                          );
                        }}
                      >
                        {" "}
                        {countoffav}{" "}
                      </i>
                    ) : (
                      <i
                        className="fa fa-heart-o"
                        onClick={() => {
                          buttonclicked ? (
                            <></>
                          ) : (
                            addToLike(myData?.id, myData?.ownerAddress)
                          );
                        }}
                      >
                        {" "}
                        {countoffav}{" "}
                      </i>
                    )}
                    { }{" "}
                  </span> */}

                  {/* <span>      

                    {favnft? 
                       <img
                        src={heart} style={{cursor:"pointer"}} onClick={() => {
                          buttonclicked?<></>:removeFromLike(myData?.id, myData?.ownerAddress);
                         }} /> 
                        :
                       <img
                        src={heartBlack} style={{ width: "15px",cursor:"pointer" }} onClick={() => {
                          buttonclicked?<></>: addToLike(myData?.id, myData?.ownerAddress);
                        }} />
                    }

                    {
                     countoffav  
                    }
                    </span>  */}

                  {/* <span className="heart-span1 hanging"  style={{cursor:"pointer",color:"orange",fontSize:'15px'}}  onClick={() =>
                    history.push(
                        `/nftsbycollections/${myData?.collectionId}`
                    )
                }>
                       {myData?.collectionName}                    </span> */}
                </div>

                <div className="spacer-single"></div>
                <div className="time-pnl">
                  {/* <h6>Sale ends Apri 10, 2022 at 10:54am PDT</h6> */}
                  {
                    <>
                      {myData?.isBidOpen && (
                        <>
                          <h6>
                            Sale ends on{" "}
                            {myData?.bidEndDate && moment(
                              myData?.bidEndDate
                            ).format('YYYY-MM-DD').toString()}{" "}
                            at{" "}
                            {myData?.bidEndDate && moment(myData?.bidEndDate).format('HH:MM A').toString()}{" "}
                          </h6>
                          <ul className="timer">
                            <>
                              <li>
                                <p>
                                  {days ? (
                                    days
                                  ) : days === 0 ? (
                                    0
                                  ) : (
                                    <RingLoader
                                      color="white"
                                      size="20"
                                      width="10"
                                    />
                                  )}
                                </p>
                                <span>Days</span>
                              </li>

                              <li>
                                <p>
                                  {hours ? (
                                    hours
                                  ) : hours === 0 ? (
                                    0
                                  ) : (
                                    <RingLoader
                                      color="white"
                                      size="20"
                                      width="10"
                                    />
                                  )}
                                </p>
                                <span>Hours</span>
                              </li>

                              <li>
                                <p>
                                  {minutes ? (
                                    minutes
                                  ) : minutes === 0 ? (
                                    0
                                  ) : (
                                    <RingLoader
                                      color="white"
                                      size="20"
                                      width="10"
                                    />
                                  )}
                                </p>
                                <span>Min</span>
                              </li>

                              <li>
                                <p>
                                  {seconds ? (
                                    seconds
                                  ) : seconds === 0 ? (
                                    0
                                  ) : (
                                    <RingLoader
                                      color="white"
                                      size="20"
                                      width="10"
                                    />
                                  )}
                                </p>
                                <span>Sec</span>
                              </li>
                            </>
                          </ul>
                        </>
                      )}
                    </>
                  }
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="flex-div">
                  <h3 className="info-name">
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        history.push(
                          `/nftsbycollections/${myData?.collectionId}`
                        );
                      }}
                    >
                      {myData?.collectionName}
                    </span>{" "}
                    <br></br> By{" "}
                    <span
                      style={{ cursor: "pointer" }}

                      onClick={() => {
                        history.push(`/profile/${myData?.creatorAddress}`);
                      }}
                    >
                      {myData?.creatorName ? myData?.creatorName : "Unnamed"}
                    </span>

                    {/* <span>{myData?.collectionName}</span> <br></br> By{" "}
                    {myData?.name} */}
                  </h3>

                  <ul className="share-info-list">
                    <li>
                      <span style={{
                        color: '#d7cccc',
                        margin: '6px 2px',
                        display: 'inline-block',
                        fontSize: '18px',
                        fontWeight: '400'
                      }}>{myData?.viewCount}</span>
                    </li>
                    {getHeart()}
                    <li
                      title="Refresh"
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      <a href="#">
                        <i class="fa fa-refresh"></i>
                      </a>
                    </li>
                    <li title="Copy">
                      <a
                        href="#"
                        onClick={async () => {
                          await navigator.clipboard.writeText(
                            window.location.href
                          );
                          toast.success("Link copied successfully", {
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
                        <i class="fa fa-link"></i>
                      </a>
                    </li>
                    {myData?.externalLink && (
                      <li
                        onClick={() => {
                          window.open(myData?.externalLink);
                        }}
                        title="Open NFT"
                      >
                        <a href="#">
                          <i class="fa fa-external-link"></i>
                        </a>
                      </li>
                    )}
                  </ul>
                </div>

                <div className="full-div">
                  <h1>{myData?.name}</h1>

                  <h3>
                    Owned by{" "}
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        history.push(`/profile/${myData?.ownerAddress}`);
                      }}
                    >
                      {myData?.ownerName ? myData?.ownerName : "Unnamed"}
                    </span>
                  </h3>
                </div>

                <div className="full-div">
                  <div className="description-details-text w-100">
                    {myData?.isBidOpen && (
                      <>
                        <span>
                          Min price --{" "}
                          {myData?.bidInitialMinimumAmount
                            ? myData?.bidInitialMinimumAmount
                            : "Min price not set."}
                        </span>
                        <span style={{ marginLeft: "10px" }}>
                          Max price --{" "}
                          {myData?.bidInitialMaximumAmount
                            ? myData?.bidInitialMaximumAmount
                            : "Max price not set."}
                        </span>
                      </>
                    )}

                    <p>
                      <i title="BNB" class="fa fa-coins"></i>{" "}
                      {myData?.sellPrice ? myData?.sellPrice : myData?.buyPrice}{" "}
                      <span>
                        [$
                        {myData?.sellPrice
                          ? (myData?.sellPrice * 530).toString().slice(0, 5)
                          : (myData?.buyPrice * 530).toString().slice(0, 5)}
                        ]
                      </span>
                    </p>
                  </div>
                </div>

                <div className="row">
                  {/* <div className="col-md-12 profiler-info">
                    <h2>
                      <h2
                        className="contract-hover"
                        onClick={() => {
                          history.push(
                            `/nftsbycollections/${myData.collectionId}`
                          );
                        }}
                      >
                        {myData?.collectionName}
                      </h2>{" "}
                      {"by"}{" "}
                      <h4
                        className="contract-hover"
                        onClick={() => {
                          history.push(
                            myData?.creatorAddress === WalletAddress ?
                              `/myprofile` :
                              `/profile/${myData.creatorAddress}`
                          );
                        }}
                      >
                        {myData?.creatorName
                          ? myData?.creatorName
                          : "Unnamed"}
                      </h4>
                    </h2>
                    <h3>
                      {myData?.name} {"#"}
                      {myData?.id}
                    </h3>
                    <h4>
                      Owned by{" "}
                      <span
                        className="contract-hover"
                        onClick={() => {
                          history.push(
                            `/profile/${myData.ownerAddress}`
                          );
                        }}
                      >
                        {myData?.ownerName
                          ? myData?.ownerName
                          : "Unnamed"}
                      </span>
                    </h4>
                    <div style={{ paddsingLeft: "10px" }}>
                      <i class="fa fa-eye"></i> {myData?.viewCount + " "}

                      {GetFavouriteNft?.some(
                        (item, index) => {
                          return (
                            item.nftTokenId === myData?.nftTokenId
                          );
                        }
                      ) ? (
                        <>
                          <i
                            onClick={() => addToFavourite(myData?.id, myData.ownerAddress)}
                            className="fa fa-heart"
                            style={{ color: "red" }}
                          ></i>{" " + myData?.nftFavouritesCount}
                        </>
                      ) : (
                        <>
                          <i
                            onClick={() => addToFavourite(myData?.id, myData.ownerAddress)}
                            className="fa fa-heart"
                          ></i>{" " + myData?.nftFavouritesCount}
                        </>
                      )}
                    </div>
                  </div> */}
                </div>
                <div className="full-div">
                  {isConnected ? (
                    <>
                      {myData?.ownerAddress != WalletAddress &&
                        !myData?.isBidOpen &&
                        myData?.staus !== "Hold" && (
                          <>
                            {!bidInProgress ? (
                              <button
                                onClick={buyNft}
                                id="btnBuy"
                                type="submit"
                                class="reg-btn"
                              >
                                BUY
                              </button>
                            ) : (
                              <button id="btnBuy" class="reg-btn" disabled>
                                <PulseLoader color="white" size="15" />
                              </button>
                            )}
                          </>
                        )}
                    </>
                  ) : (
                    <></>
                  )}
                  {isConnected ? (
                    <>
                      {myData?.ownerAddress != WalletAddress &&
                        myData?.isBidOpen && (
                          <button
                            onClick={handleShow}
                            id="btnBuy"
                            type="submit"
                            className="reg-btn"
                          >
                            <i className="fa fa-shopping-cart"></i> Place Bid
                          </button>
                        )}
                    </>
                  ) : (
                    <></>
                  )}
                  {isConnected ? (
                    <>
                      {myData?.ownerAddress != WalletAddress &&
                        myData?.isDonatedNft ?
                        <>
                          {doantionClick ?
                            <button
                              disabled
                              id="btnBuy"
                              type="submit"
                              class="reg-btn"
                            >
                              <PulseLoader color="white" size="11" />
                            </button>
                            :
                            <button
                              onClick={() => {
                                setdonatemodal(true)
                                setdoantionClick(true)
                              }}
                              id="btnBuy"
                              type="submit"
                              className="reg-btn"
                            >
                              <i className="fa fa-shopping-cart"></i> Donate
                            </button>

                          }
                        </>
                        : null}
                    </>
                  ) : (
                    <></>
                  )}
                  {/* </form> */}
                </div>

                <div className="description-details-pnl full-div">
                  <div
                    style={{ position: "relative" }}
                    className="description-details-head full-div"
                  >
                    {(myData?.staus === "ReadyForSell" ||
                      myData?.isDonatedNft ||
                      myData?.isBidOpen === true) &&
                      myData?.ownerAddress === WalletAddress &&
                      (cancelLoading ? (
                        <button
                          disabled
                          id="btnBuy"
                          type="submit"
                          class="reg-btn"
                        >
                          <PulseLoader color="white" size="11" />
                        </button>
                      ) : (
                        <button
                          onClick={() => cancelListing()}
                          id="btnBuy"
                          type="submit"
                          class="reg-btn"
                        >
                          Cancel listing
                        </button>
                      ))}
                    {myData?.staus != "ReadyForSell" &&
                      myData?.isMinted === true &&
                      myData?.ownerAddress === WalletAddress &&
                      !myData?.isDonatedNft && (
                        <>
                          <button
                            onClick={() => setFilterTrigger(true)}
                            id="btnBuy"
                            type="submit"
                            class="reg-btn"
                          >
                            Sell NFT
                          </button>
                        </>
                      )}
                    {myData?.staus != "ReadyForSell" &&
                      myData?.isMinted === true &&
                      myData?.ownerAddress === WalletAddress &&
                      !myData?.isDonatedNft && (
                        <>
                          {doantionClick ?
                            <button
                              disabled
                              id="btnBuy"
                              class="reg-btn"
                              style={{ width: 120 }}
                            >
                              <PulseLoader color="white" size="11" />
                            </button>
                            :
                            <button
                              onClick={() => donationSubmit()}
                              id="btnBuy"
                              type="submit"
                              class="reg-btn"
                            >
                              Donation
                            </button>
                          }
                        </>
                      )}
                    {myData?.ownerAddress === WalletAddress &&
                      !myData?.isBidOpen &&
                      myData?.freezeData &&
                      myData.staus != "ReadyForSell" &&
                      !myData?.isDonatedNft && (
                        <button
                          onClick={() => setOpenBid(true)}
                          id="btnBuy"
                          type="submit"
                          class="reg-btn"
                        >
                          Open bid
                        </button>
                      )}
                    {!myData?.freezeData &&
                      myData?.ownerAddress === WalletAddress && (
                        <button
                          onClick={() =>
                            history.push(
                              `/createnft/${myData?.ownerAddress}/${myData?.id}/${myData?.accountId}`
                            )
                          }
                          id="btnBuy"
                          type="submit"
                          class="reg-btn"
                        >
                          Update NFT
                        </button>
                      )}

                    {/* {isConnected ? (
                      <>
                        {!isStacked && !stakeLoading && (
                          <>
                            <span className="des-col-red">Need to stake first in order to mint and sell NFT.</span>

                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <span className="des-col-red">Need to login first in order to buy/sell.</span>

                      </>
                    )} */}
                  </div>

                  {/* <div className="description-details-bottom full-div">
                    <div className="head full-div">
                      <p>Description</p>
                    </div>
                    <div className="description full-div">
                      <p>
                        {showMore ? myData?.description : `${myData?.description?.substring(0, 300)}`}
                        {myData?.description?.length > 300 ? (
                          <span className="btn-more-less" onClick={() => setShowMore(!showMore)}>
                            {showMore ? " view less" : "...view more"}
                          </span>
                        ) : null
                        }
                      </p>
                      <a
                        className="contract-hover"
                        onClick={() =>
                          history.push(
                            myData?.creatorAddress === WalletAddress
                              ? `/myprofile`
                              : `/profile/${myData?.creatorAddress}`
                          )}>
                        Created By {myData?.creatorName ? myData?.creatorName : "Unnamed"}
                      </a>
                    </div>
                  </div> */}
                </div>

                <section className="container no-top">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="items_filter">
                        <ul className="de_nav de_nav left-align">
                          <li id="Mainbtn" className="active">
                            <span onClick={handleBtnClick}>Offers</span>
                          </li>
                          <li id="Mainbtn">
                            <span onClick={handleBtnClick1}> Description</span>
                          </li>
                          <li id="Mainbtn2" className="">
                            <span onClick={handleBtnClick2}>
                              Additional Info
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {openMenu1 && (
                    <div id="zero1" className="onStep fadeIn">
                      <p>
                        {" "}
                        {myData?.description === null ||
                          myData?.description === "" ||
                          myData?.description === "null" ? (
                          <>No description found...</>
                        ) : (
                          <>{myData?.description}</>
                        )}
                      </p>
                    </div>
                  )}
                  {openMenu && (
                    <ul className="user-visitor-list">
                      {emptyBids ? (
                        <>Nothing found...</>
                      ) : (
                        <>
                          {biddings?.map((nft, index) => (
                            <>
                              <li>
                                <div>
                                  <div className="img-pnl">
                                    <img
                                      src={
                                        nft?.accountViewModel.profileImage
                                          ? `${httpUrl}/${nft?.accountViewModel.profileImage}`
                                          : defaultImg
                                      }
                                      alt="Eth"
                                    />
                                  </div>
                                  <div className="txt-pnl">
                                    <h5 style={{ color: "#fff" }}>
                                      {nft?.accountViewModel?.username
                                        ? nft?.accountViewModel?.username.length > 10 ? nft?.accountViewModel?.username.substring(0, 10) + "..." : nft?.accountViewModel?.username
                                        : "Unnamed"}
                                    </h5>
                                    <p style={{ marginTop: "4px" }}>
                                      <span style={{ marginLeft: "0px" }}>
                                        {nft.expiryDate.split("T")[0]}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                                <div className="price-eth">
                                  <p>
                                    <img
                                      style={{ width: "30px" }}
                                      src={cryptocurrency}
                                      alt="Eth"
                                    />
                                    <b>{nft.price + "BNB"}</b>
                                    $
                                    {nft.nftResponseModel.buyPriceRateInUSD}
                                  </p>
                                </div>
                                {myData?.ownerAddress === WalletAddress && (
                                  <div className="col-md-3 col-lg-3 col-sm-3 col-3">
                                    {Acceptloader ? (
                                      <button
                                        id="btnBuy1"
                                        type="submit"
                                        class="reg-btn"
                                      >
                                        <PulseLoader size="11" color="black" />
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => {
                                          setAcceptloader(true);
                                          acceptBidOffer(
                                            nft.id,
                                            nft.price,
                                            nft.accountViewModel.address,
                                            nft.nftResponseModel.contractAddress
                                          );
                                        }}
                                        id="btnBuy1"
                                        type="submit"
                                        class="reg-btn"
                                      >
                                        Accept
                                      </button>
                                    )}
                                  </div>
                                )}
                              </li>
                            </>
                          ))}
                        </>
                      )}

                      {/* <li>
                       <div>
                         <div className="img-pnl">
                           <img src={`${httpUrl}/${myData?.ownerImage}`} alt="Eth" />
                         </div>
                         <div className="txt-pnl">
                           <h5>Richerd Willson SR</h5>
                           <p>
                             Place A Bid
                             <span>15 mins ago</span>
                           </p>
                         </div>
                       </div>
                       <div className="price-eth">
                         <p>
                           <img src={cryptocurrency} alt="Eth" />
                           <b>0.060 ETH</b>
                           ~$98.11
                         </p>
                       </div>
                     </li> */}
                      {/* <li>
                       <div>
                         <div className="img-pnl">
                           <img src={`${httpUrl}/${myData?.ownerImage}`} alt="Eth" />
                         </div>
                         <div className="txt-pnl">
                           <h5>Richerd Willson SR</h5>
                           <p>
                             Place A Bid
                             <span>15 mins ago</span>
                           </p>
                         </div>
                       </div>
                       <div className="price-eth">
                         <p>
                           <img src={cryptocurrency} alt="Eth" />
                           <b>0.060 ETH</b>
                           ~$98.11
                         </p>
                       </div>
                     </li> */}
                      {/* <li>
                       <div>
                         <div className="img-pnl">
                           <img src={`${httpUrl}/${myData?.ownerImage}`} alt="Eth" />
                         </div>
                         <div className="txt-pnl">
                           <h5>Richerd Willson SR</h5>
                           <p>
                             Place A Bid
                             <span>15 mins ago</span>
                           </p>
                         </div>
                       </div>
                       <div className="price-eth">
                         <p>
                           <img src={cryptocurrency} alt="Eth" />
                           <b>0.060 ETH</b>
                           ~$98.11
                         </p>
                       </div>
                     </li> */}
                    </ul>
                  )}
                  {openMenu2 && (
                    <div id="zero3" className="onStep fadeIn">
                      <p className="clrd" >
                        <b  >Contract Address :</b>
                        <span style={{ fontSize: "14px", cursor: "pointer" }} onClick={() => { window.open(`https://testnet.bscscan.com/address/${myData?.contractAddress}`) }}>


                          {myData?.contractAddress}</span>

                      </p>
                      <p>
                        <b>Token ID : </b>
                        {myData?.nftTokenId}
                      </p>
                      <p>
                        <b>Metadata :</b>
                        {myData?.isMinted ? "Not editable" : "Editable"}
                      </p>
                      <p>
                        <b>File Size : </b>
                        2048 x 2048 px.IMAGE(1.27MB)
                      </p>
                    </div>
                  )}
                </section>

                <Modal size="sm" style={{ textAlign: "center" }} centered show={filterTrigger} onHide={sellingModal}>
                  <Modal.Header>
                    <Modal.Title style={{ color: "#000000" }}>
                      Selling Amount
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {" "}
                    <div className="row">
                      <div className="col-md-12">
                        <form
                          name="contactForm"
                          id="contact_form"
                          className="form-border"
                          onSubmit={sellingSubmit}
                        >
                          <div className="row">
                            <div className="col-md-12">
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="field-set">
                                    <label className="black-color">
                                      Selling Amount:
                                    </label>
                                    <input
                                      type="text"
                                      name="NewPrice"
                                      value={NewPrice}
                                      onChange={(e) => {
                                        handleSelling(e.target.value);
                                      }}
                                      id="acceptselling"
                                      placeholder="Enter the sell price"
                                      className="form-control  "
                                      required
                                    />
                                    {sellingError && (
                                      <span style={{ color: "red" }}>
                                        Please enter valid amount
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div id="submit" className="pull-left">
                              {sellingIsLoading ? (
                                <button className="btn-main" disabled>
                                  <PulseLoader color="white" size="11" />
                                </button>
                              ) : (
                                <button
                                  style={{ marginLeft: "50px" }}
                                  type="submit"
                                  id="submit"
                                  className="btn-main"
                                  disabled={sellingBtn}
                                >
                                  Sell NFT
                                </button>
                              )}
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>

                <Modal centered show={openBid} onHide={handleClose1}>
                  <Modal.Header>
                    <Modal.Title style={{ color: "black" }}>
                      Open bid
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Price
                    <InputGroup className="mb-3">
                      <InputGroup.Text
                        style={{
                          width: "60px",
                          height: "38px",
                          marginTop: "0px",
                        }}
                      >
                        Min
                      </InputGroup.Text>
                      <FormControl
                        placeholder="Amount"
                        type="text"
                        value={inputAmount}
                        onChange={(e) => amountStatus(e.target.value)}
                        aria-label="Amount (to the nearest dollar)"
                      />
                      <InputGroup.Text
                        style={{
                          width: "60px",
                          height: "38px",
                          marginTop: "0px",
                        }}
                      >
                        Max
                      </InputGroup.Text>
                      <FormControl
                        placeholder="Amount"
                        type="text"
                        value={maxInputAmount}
                        onChange={(e) => amountStatus1(e.target.value)}
                        aria-label="Amount (to the nearest dollar)"
                      />
                    </InputGroup>
                    <div className="row">
                      <div className="col-md-12">
                        {errs?.minPriceErr ?
                          <span
                            style={{
                              color: "red",
                              display: "inline-block",
                              float: "left",
                              width: "50%",
                            }}
                          >
                            {errs?.minPriceErr}
                          </span>
                          : null}
                        {errs?.maxPriceErr ?
                          <span
                            style={{
                              color: "red",
                              display: "inline-block",
                              float: "left",
                              width: "50%",
                            }}
                          >
                            {errs?.maxPriceErr}
                          </span>
                          : null}
                        {amountCheck && (
                          <span
                            style={{
                              color: "red",
                              display: "inline-block",
                              float: "left",
                              width: "50%",
                            }}
                          >
                            Input value must be lower than available balance
                          </span>
                        )}
                        {amountCheck1 && (
                          <span
                            style={{
                              color: "red",
                              display: "inline-block",
                              float: "left",
                              width: "50%",
                            }}
                          >
                            Max value must be greater than Min value
                          </span>
                        )}
                        {amountCheck2 && (
                          <span
                            style={{
                              color: "red",
                              display: "inline-block",
                              float: "left",
                              width: "50%",
                            }}
                          >
                            Min value must be lower than Max value
                          </span>
                        )}
                        {amountCheck3 && (
                          <span
                            style={{
                              color: "red",
                              display: "inline-block",
                              float: "left",
                              width: "50%",
                            }}
                          >
                            Min value and Max value should not be same
                          </span>
                        )}
                      </div>
                    </div>
                    {bidError2 && (
                      <span style={{ color: 'red', display: 'inline-block', float: 'right', width: '50%' }}>Start date is bigger than end date</span>
                    )}
                    <div className="bidDates row">
                      <div className="bidDat col-md-6">
                        <h6 style={{ color: "#000" }}>Start Date</h6>
                        <DatePicker
                          className="dateInput"
                          selected={startDate}
                          onChange={(date) => startDateFunc(date)}
                          style={{ zIndex: "9999" }}
                        />
                      </div>
                      <div className="bidDat col-md-6">
                        <h6 style={{ color: "#000" }}>End Date</h6>
                        <DatePicker
                          className="dateInput"
                          selected={endDate}
                          onChange={(date) => endDateFunc(date)}
                        />
                      </div>
                      {bidError && (
                        <span
                          style={{
                            color: "red",
                            display: "inline-block",
                            float: "left",
                            width: "50%",
                          }}
                        >
                          Can't use past date for start date.
                        </span>
                      )}
                      {bidError1 && (
                        <span
                          style={{
                            color: "red",
                            display: "inline-block",
                            float: "right",
                            width: "50%",
                          }}
                        >
                          Can't use past date for end date.
                        </span>
                      )}

                    </div>
                    {bidError2 && (
                      <span style={{ color: 'red', display: 'inline-block', float: 'right', width: '50%' }}>Start date is bigger than end date</span>
                    )}

                  </Modal.Body>
                  <Modal.Body>Available balance: {balance} BNB</Modal.Body>

                  <Modal.Body className="d-flex justify-content-center">
                    <Form>
                      {["checkbox"].map((type) => (
                        <div key={`inline-${type}`} className="mb-0">
                          <Form.Check
                            inline
                            label="By checking this, I agree Pyramid city Terms of Service"
                            name="group1"
                            style={{ marginBottom: "0px" }}
                            type={type}
                            checked={isSwitchOn}
                            id={`inline-${type}-1`}
                            onChange={() => {
                              switchStatus();
                            }}
                          />
                        </div>
                      ))}
                    </Form>
                  </Modal.Body>

                  <Modal.Footer>
                    <button
                      className="create-listt"
                      style={{ letterSpacing: "1.3px" }}
                      onClick={handleClose1}
                    >
                      Close
                    </button>

                    {!bidInProgress ? (
                      <>
                        {openBidCheck && openBidCheck1 && maxInputAmount && inputAmount ? (
                          <button
                            // variant="primary"
                            className="btn-main"
                            disabled={!isSwitchOn}
                            onClick={openBidding}
                          >
                            Open bid
                          </button>
                        ) : (
                          <button
                            // variant="primary"

                            className="btn-main"
                            disabled={true}
                          // onClick={ openBidding}
                          >
                            Open bid
                          </button>
                        )}
                      </>
                    ) : (
                      <button className="btn-main" disabled>
                        <PulseLoader color="white" size="11" />
                      </button>
                    )}
                  </Modal.Footer>
                </Modal>

                <Modal centered size="sm" style={{ textAlign: 'center' }} show={donatemodal} onHide={doatehandler}>
                  <Modal.Header>
                    <Modal.Title style={{ color: "#000000" }}>
                      Donation Amount
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {" "}
                    <div className="row">
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="field-set">
                                  <label className="black-color">
                                    Donation Amount:
                                  </label>
                                  <input
                                    type="number"
                                    name="NewPrice"
                                    value={donationamount}
                                    onChange={(e) => {
                                      handleDonation(e.target.value);
                                    }}
                                    id="acceptselling"
                                    placeholder="Enter the donation amount"
                                    className="form-control  "
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div id="submit" className="pull-left">
                            {sellingIsLoading ? (
                              <button className="btn-main" disabled>
                                <PulseLoader color="white" size="11" />
                              </button>
                            ) : (
                              <button
                                style={{ marginLeft: "50px" }}
                                className="btn-main"
                                onClick={() => DonateToNFT()}
                                // onClick={() => donationSubmit()}
                                disabled={donationError}
                              >
                                Submit
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>

                <Modal centered size="sm" style={{ textAlign: 'center' }} show={donationmodal} onHide={doationhandler}>
                  <Modal.Header>
                    <Modal.Title style={{ color: "#000000" }}>
                      Donation Amount
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {" "}
                    <div className="row">
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="field-set">
                                  <label className="black-color">
                                    Donation Amount:
                                  </label>
                                  <input
                                    type="text"
                                    name="NewPrice"
                                    value={donationamount}
                                    onChange={(e) => {
                                      handleDonation(e.target.value);
                                    }}
                                    id="acceptselling"
                                    placeholder="Enter the donation amount"
                                    className="form-control  "
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div id="submit" className="pull-left">
                            {sellingIsLoading ? (
                              <button className="btn-main" disabled>
                                <PulseLoader color="white" size="11" />
                              </button>
                            ) : (
                              <button
                                style={{ marginLeft: "50px" }}
                                className="btn-main"
                                onClick={() => donationSubmit()}
                                disabled={donationError}
                              >
                                Submit
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>

                <Modal centered show={show} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title style={{ color: "black" }}>
                      Make an offer
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Price
                    <InputGroup className="mb-3">
                      <InputGroup.Text className="h-100">WBNB</InputGroup.Text>
                      <FormControl
                        placeholder="Amount"
                        type="text"
                        disabled={wBNB < myData?.bidInitialMinimumAmount ? true : false}
                        value={inputAmount}
                        onChange={(e) => AmountOffer(e.target.value)}
                        aria-label="Amount (to the nearest dollar)"
                      />
                      {

                      }
                    </InputGroup>
                    <div className="">
                      <h6 style={{ color: "#000" }}>Expiry date</h6>
                      <DatePicker
                        selected={expiryDate}
                        onChange={(date) => expiryDateFunc(date)}
                      />
                    </div>
                    {(wBNB < myData?.bidInitialMinimumAmount) && (
                      <p style={{ color: "red" }}>
                        Available balance is less than minimum bidding price
                      </p>
                    )}
                    {expiryError && (
                      <span
                        style={{
                          color: "red",
                          display: "inline-block",
                          float: "left",
                          width: "50%",
                        }}
                      >
                        Can't use past date for expiry date.
                      </span>
                    )}
                    {amountCheck && (
                      <p style={{ color: "red" }}>
                        Input value must be lower than available balance
                      </p>
                    )}
                    {amountCheck4 && (
                      <p style={{ color: "red" }}>
                        Input value must be greater than minimum bid
                        price
                      </p>
                    )}
                    {/* {inputAmount < myData?.bidInitialMinimumAmount && (
                      <p style={{ color: "red" }}>
                        Input value must be greater or equal to minimum bid
                        price
                      </p>
                    )} */}
                  </Modal.Body>
                  <Modal.Body>
                    Min bidding price: {myData?.bidInitialMinimumAmount} WBNB
                  </Modal.Body>
                  <Modal.Body>
                    Max bidding price: {myData?.bidInitialMaximumAmount} WBNB
                  </Modal.Body>

                  <Modal.Body>Available balance: {wBNB} WBNB</Modal.Body>

                  <Modal.Body className="d-flex justify-content-center w-30">
                    <Form>
                      {["checkbox"].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                          <Form.Check
                            inline
                            label="By checking this, I agree Pyramid city Terms of Service "
                            name="group1"
                            type={type}
                            id={`inline-${type}-1`}
                            checked={isSwitchOn}
                            onChange={() => {
                              switchStatus();
                            }}
                          />
                        </div>
                      ))}
                    </Form>
                  </Modal.Body>

                  <Modal.Footer>
                    <button className="create-listt" onClick={handleClose}>
                      Close
                    </button>

                    {expiryError ? (
                      <>
                        <button className="btn-main" disabled={offerBidBtn}>
                          Make Offer
                        </button>
                      </>
                    ) : (
                      <>
                        {!isOfferInProgress ? (
                          <>
                            {inputAmount >= myData?.bidInitialMinimumAmount &&
                              inputAmount <= myData?.bidInitialMaximumAmount &&
                              inputAmount <= wBNB ? (
                              <button
                                className="btn-main"
                                onClick={postBidding}
                                disabled={!isSwitchOn}
                              >
                                Make Offer
                              </button>
                            ) : (
                              <button className="btn-main" disabled={true}>
                                Make Offer
                              </button>
                            )}
                          </>
                        ) : (
                          <button className="btn-main" disabled>
                            <PulseLoader color="white" size="11" />
                          </button>
                        )}
                      </>
                    )}
                  </Modal.Footer>
                </Modal>

                <Modal centered show={imageShow} onHide={handleImageClose}>
                  <Modal.Header>
                    <Modal.Title style={{ color: "black" }}>
                      <img
                        src={`${httpUrl}/${myData?.image}`}
                        className="img-fluid img-rounded mb-sm-30"
                        alt="NFT.png"
                      />
                    </Modal.Title>
                  </Modal.Header>
                </Modal>

                <br></br>
              </div>
              {myData?.isDonatedNft && donationStat.length > 0 ? (
                <>
                  <section>
                    <h3>Donation Stats</h3>
                    <Table striped bordered hover variant="dark">
                      <thead>
                        <tr>
                          <th>Profile</th>
                          <th>Name</th>
                          <th>Amount</th>
                          <th>Sender Address</th>
                          <th>Date</th>
                          <th>Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {donationStat?.map((item) => {
                          return (
                            <tr>
                              <td >
                                {" "}
                                {item?.userProfileImage === null ||
                                  item?.userProfileImage === "" ? (
                                  <div style={{ width: "40px", height: "40px" }}>
                                    <FaUserCircle size="1x" color="#fff" />
                                  </div>
                                ) : (
                                  <>
                                    <img
                                      width="40px"
                                      height="40px"
                                      className="lazy"
                                      style={{ borderRadius: "100%" }}
                                      src={`${httpUrl}/${item?.userProfileImage}`}
                                    />
                                  </>
                                )}
                              </td>
                              <td>
                                {" "}
                                {item?.userName === ""
                                  ? "No Name"
                                  : item?.userName}


                              </td>
                              <td> {item?.nftDonationAmount}</td>
                              <td>
                                {" "}
                                {item?.address == ""
                                  ? "No Address Found"
                                  : item?.address}
                              </td>
                              <td> {item?.createAt.split("T")[0]} </td>
                              <td>
                                {" "}
                                {
                                  item?.createAt.split("T")[1].split(".")[0]
                                }{" "}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </section>
                </>
              ) : (
                <></>
              )}
              <section className="container no-top">
                <div className="row">
                  <div className="col-lg-12">
                    <h3>Leave a Comment</h3>
                    <div className="full-div">
                      <div className="flex-div comment-chat-pnl">
                        <div className="img-pnl">
                          {MyProfile?.profileImage === "" ||
                            MyProfile?.profileImage === null ? (
                            <>
                              <FaUserCircle size="1x" color="#fff" />
                            </>
                          ) : (
                            <img
                              className="lazy"
                              src={`${httpUrl}/${MyProfile?.profileImage}`}
                            />
                          )}
                        </div>
                        <div className="txt-pnl">
                          <form>
                            <textarea
                              data-autoresize
                              onChange={(e) => {
                                setcommect1(e.target.value);
                              }}
                              name="item_desc"
                              value={comment1}
                              maxLength={500}
                              style={{ color: "white" }}
                              id="item_desc"
                              className="form-control"
                            ></textarea>
                          </form>
                          <div className="full-div text-right">
                            {comment1 == "" ?
                              <button className="reg-btn" disabled>Post Comment</button>
                              :
                              <button
                                className="reg-btn"
                                onClick={() => {
                                  SUBMIT(myData?.id, comment1);
                                  setcommect1(" ");
                                }}
                              >
                                Post Comment
                              </button>
                            }
                          </div>
                        </div>
                      </div>
                      {Allcomments?.map((value, index) => {
                        return (
                          <div className="flex-div comment-chat-pnl">
                            <div className="img-pnl">

                              {value?.profileImage === "" ||
                                value?.profileImage === null ? (
                                <span
                                  style={{ width: "300px", minHeight: "40px" }}
                                >
                                  <FaUserCircle size="1x" color="#fff" />
                                </span>
                              ) : (
                                <img
                                  className="lazy"
                                  src={`${httpUrl}/${value?.profileImage}`}
                                />
                              )}
                            </div>
                            <div className="txt-pnl" style={{
                              display: 'flex',
                              justifyContent: 'inherit'
                            }}>
                              <div>
                                <h6> {value?.userName} </h6>
                                <p>{value?.comments}</p>
                                <p>
                                  {" "}
                                  {dateFormat(
                                    value?.createdAt + "z",
                                    "mmm dd, yyyy"
                                  )}{" "}
                                  at{" "}
                                  {dateFormat(value?.createdAt + "z", "HH:MM TT")}{" "}
                                </p>
                                <ul>
                                  <li>
                                    <i
                                      onClick={() => {
                                        likeUnlikeComment(
                                          value?.id,
                                          value?.nftId,
                                          true
                                        );
                                      }}
                                      class="fa fa-thumbs-o-up"
                                      color="green"
                                    >
                                      {" "}
                                    </i>
                                    <span
                                      style={{ marginLeft: "5px", color: "#fff" }}
                                    >
                                      {value?.likeCount}
                                    </span>
                                  </li>
                                  <li>
                                    <i
                                      onClick={() => {
                                        likeUnlikeComment(
                                          value?.id,
                                          value?.nftId,
                                          false
                                        );
                                      }}
                                      class="fa fa-thumbs-o-down"
                                    ></i>
                                    <span
                                      style={{ marginLeft: "5px", color: "#fff" }}
                                    >
                                      {value?.unLikeCount}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div>
                                {MyProfile?.id === value?.accountId ? (
                                  <p
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      editmycomment
                                        ? Seteditmycomment(false)
                                        : Seteditmycomment(true);
                                      Seteditmycommentid(value?.id);
                                      setupdatedcomment(value?.comments);
                                    }}
                                  >
                                    Edit
                                  </p>
                                ) : (
                                  <></>
                                )}
                              </div>
                              {editmycomment &&
                                editmycommentid === value?.id ? (
                                <div className="txt-pnl">
                                  <form>
                                    <textarea
                                      data-autoresize
                                      onChange={(e) => {
                                        setupdatedcomment(e.target.value);
                                      }}
                                      name="item_desc"
                                      value={updatedcomment}
                                      maxLength={500}
                                      style={{ color: "white" }}
                                      id="item_desc"
                                      className="form-control"
                                    ></textarea>
                                  </form>
                                  <div className="full-div text-right">
                                    <button
                                      className="reg-btn"
                                      onClick={() => Seteditmycomment(false)}
                                    >
                                      Cancel
                                    </button>{" "}
                                    <button
                                      className="reg-btn"
                                      onClick={() => {
                                        Editcomment(value?.nftId, value?.id);
                                        Seteditmycomment(false);
                                      }}
                                    >
                                      Update Comment
                                    </button>{" "}
                                  </div>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
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

          <Footer />
        </>
      )}
    </div>
  );
};
export default UserNftDetails;

const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));
