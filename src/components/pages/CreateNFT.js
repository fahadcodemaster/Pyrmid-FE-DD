import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/footer";
import AddNftAction from "../../Redux/Actions/NftActions/AddNftAction";
import defaultImg from "../../assets/images/default.png";
import { Modal, Row, Col, Form as Formm } from "react-bootstrap";
import axios from "axios";
import http from "../../Redux/Api/http";
import moment from "moment";
import { PulseLoader, RingLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import GetMyAllNftsAction from "../../Redux/Actions/NftActions/GetMyAllNftsAction";
import Web3 from "web3";
import "react-datepicker/dist/react-datepicker.css";
import GetNftMarketAction from "../../Redux/Actions/NftActions/GetNftMarketAction";
import { useHistory, useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { mint } from "../../../src/metamask/index";
import GetMyNftByIdAction, {
  GetMyNftByIdRequest,
} from "../../Redux/Actions/NftActions/GetMyNftByIdAction";
import GetAllBlockChainAction from "../../Redux/Actions/Blockchain/GetAllBlockChainAction";
import GetMyAllCollectionsAction from "../../Redux/Actions/CollectionAction/GetMyAllCollections";
import GetAllCurrencyAction from "../../Redux/Actions/CurrencyAction/GetAllCurrencyAction";

function CreateNFT() {
  const [errorMessage, setErrorMessage] = useState({
    NFT_name: "",
    NFT_price: "",
    image: "",
  });
  const [val_err, setval_err] = useState({})

  const { id } = useParams();
  const Token = useSelector((state) => state.Login?.authResponse?.data?.token);

  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );
  const getAllBlockchain = useSelector(
    (state) => state?.GetAllBlockChain?.GetAllBlockChainResponse?.data
  );

  const getAllCollection = useSelector(
    (state) => state?.GetMyAllCollections?.GetAllMyCollectionsResponse?.data
  );

  const getAllCurrency = useSelector(
    (state) => state?.GetAllCurrency?.GetAllCurrencyResponse?.data
  );

  const history = useHistory();
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [isloadingnft, setIsloadingnft] = useState(true);
  const [UnlockAbleContentt, SetUnlockAbleContentt] = useState(false);
  const [SensitiveContentt, SetSensitiveContentt] = useState(false);

  const [collectionLoader, setCollectionLoader] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [finalCreatedProperties, setFinalCreatedProperties] = useState([]);
  const [selectedBlockchain, setSelectedBlockchain] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [currencyId, setCurrencyId] = useState(9);
  const [getAllCollectionData, setGetAllCollection] = useState();
  // const [allBlockchain, setAllBlockchain] = useState([]);
  const [showTokenId, setShowTokenId] = useState(false);
  const [getMasterAddress, setGetMasterAddress] = useState();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const showToastMessage = (msg, type) => {
    return toast(msg, {
      position: "top-right",
      type,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [addPropertiesList, setAddPropertiesList] = useState([
    { name: "", type: "", rarity: "" },
  ]);

  const [addLevelsList, setAddLevelsList] = useState([
    { speed: "", value: 3, of: 5 },
  ]);

  const [addStatsList, setAddStatsList] = useState([
    { speed: "", value: 3, of: 5 },
  ]);

  const [files, SetFiles] = useState("");
  const [FileError, SetFileError] = useState("");
  const fileschange = (e) => {
    const file = e.target.files[0];
    if (
      file?.type === "image/jpeg" ||
      file?.type === "image/png" ||
      file?.type === "image/jpg" ||
      file?.type === "image/gif"
    ) {
      SetFileError(null);
      SetFiles(file);
      setErrorMessage((prev) => {
        return { ...prev, image: "" };
      });
    } else {
      SetFileError("Invalid File Format ");
      SetFiles(null);
      setErrorMessage((prev) => {
        return { ...prev, image: "Please select" };
      });
    }
  };

  const [show, setShow] = useState(false);
  const [levelShow, setLevelShow] = useState(false);
  const [statsShow, setStatsShow] = useState(false);
  const [pageLoader, setPageLoader] = useState(true);
  const [nftImage, setNftImage] = useState("");
  const [params, setParams] = useState();
  const [Updateloader, setUpdateloader] = useState(false);
  const [t_collectionid, sett_collectionid] = useState("0");
  const [t_BlockChianid, Sett_BlockChianid] = useState();

  const [collectionError, setCollectionError] = useState("");

  const [allColl, setAllColl] = useState("");

  useEffect(() => {
    if (getAllCollection) {
      setcollectiondata();
    }
  }, [getAllCollection]);



  useEffect(() => {
    if (getAllCollection) {
      setcollectiondata();
    }
    if (getAllCollection?.length == 0) {
      setTimeout(() => {
        toast.error('No collection found, Redirecting to Add Collection', {
          position: "top-right",
          autoClose: true,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }, 3000);
      setTimeout(() => {
        history.push("/addcollection");
      }, 10000);
    }
  }, [getAllCollection]);

  const setcollectiondata = async (e) => {
    setGetAllCollection(getAllCollection);

    dispatch(GetAllBlockChainAction())
      .then((blockchainApiData) => {
        Sett_BlockChianid(blockchainApiData?.data[0]?.chainID);
      })
      .catch((error) => { });
    setCollectionLoader(false);
  };

  const handleClose = () => setShow(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 3000);
  });

  useEffect(async () => {
    await dispatch(GetMyAllCollectionsAction())
      .then((res) => {
        // setIsloading(false);
        setLoader(false);

        // if (res.data == "" || res.data == []) {
        //   // alert("wgy")
        //   toast.success(
        //     `No collection found, create a collection first in order to create an NFT `,
        //     {
        //       position: "top-right",
        //       autoClose: 5000,
        //       hideProgressBar: false,
        //       closeOnClick: true,
        //       pauseOnHover: true,
        //       draggable: true,
        //       progress: undefined,
        //     }
        //   );
        //   history.push("/addcollection");
        // }
      })
      .catch((error) => {
        // setIsloading(false);
        setLoader(false);

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

  useEffect(() => {
    setTimeout(() => {
      setPageLoader(false);
    }, 2000);
  });

  const [NFTData, SetNFTData] = useState({
    fileupload: "",
    NFT_name: "",
    item_desc: "",
    item_extLink: "",
    NFT_price: "",
    item_supply: 1,
    blockchain: "",
    item_Freezemetadata: "",
    item_UnlockAbleContent: "",
    item_PropertyList: addPropertiesList,
    item_LevelsList: addLevelsList,
    item_StatsList: addStatsList,
    item_contactAddress: "",
    item_tokenId: "",
    collection: "",
    payment_token: 2,
    bidStart: "",
    bidEnd: "",
    Royalty: ""
  });

  useEffect(() => {
    if (getAllCurrency?.length > 0) {
      SetNFTData((prev) => {
        return { ...prev, item_tokenId: getAllCurrency[0].id, currency_name: getAllCurrency[0].name };
      });
    }
    if (getAllBlockchain?.length > 0) {
      SetNFTData((prev) => {
        return { ...prev, blockchain: getAllBlockchain[0].chainID };
      });
    }
  }, [getAllCurrency, getAllBlockchain]);
  const inputhandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "NFT_name":
        if (value.length > 25) {
          setIsLoading(true)
          setErrorMessage((prev) => {
            return { ...prev, NFT_name: "Max 25 characters" };
          });
        } else if (value.trim() == "") {
          setIsLoading(true)
          setErrorMessage((prev) => {
            return { ...prev, NFT_name: "Name field is required." };
          });
        }
        else {
          setIsLoading(false)
          setErrorMessage((prev) => {
            return { ...prev, NFT_name: "" };
          });
        }
        break;
      case "NFT_price":
        if (value && value < 0.00001) {
          setIsLoading(true)
          setErrorMessage((prev) => {
            return {
              ...prev,
              NFT_price: "Price cannot be less than 0.00001",
            };
          });
        } else if (value && value > 999999999.99999) {
          setIsLoading(true)
          setErrorMessage((prev) => {
            return {
              ...prev,
              NFT_price: "Price cannot be greater than 999999999.99999",
            };
          });
        } else if (value == "") {
          setIsLoading(true)
          setErrorMessage((prev) => {
            return {
              ...prev,
              NFT_price: "Price cannot be null.",
            };
          });
        }
        else {
          setIsLoading(false)
          setErrorMessage((prev) => {
            return { ...prev, NFT_price: "" };
          });
        }
        break;
      case "item_desc":
        if (value.length > 200) {
          setIsLoading(true)
          setErrorMessage((prev) => {
            return { ...prev, item_desc: "Max 200 characters" };
          });
        } else {
          setIsLoading(false)
          setErrorMessage((prev) => {
            return { ...prev, item_desc: "" };
          });
        }
        break;
      case "Royalty":
        if (value == "") {
          setIsLoading(true)
          setErrorMessage((prev) => {
            return {
              ...prev,
              NFT_royalty: "Royalty cannot be null.",
            };
          });
        }
        else {
          setIsLoading(false)
          setErrorMessage((prev) => {
            return { ...prev, NFT_royalty: "" };
          });
        }
        break;
    }

    SetNFTData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const addMoreProperty = () => {
    setAddPropertiesList((prev) => {
      return [...prev, { name: "", type: "", rarity: "" }];
    });
  };
  useEffect(() => {
    let params = window.location.pathname;
    setParams(params.split("/")[2]);
    if (id) {
      dispatch(GetAllBlockChainAction()).then((blockchainApiData) => {
        dispatch(GetMyAllCollectionsAction()).then(() => {
          dispatch(GetAllCurrencyAction()).then(() => {
            dispatch(GetMyNftByIdAction(id))
              .then((res) => {
                const data = res.data;
                console.log(data, "data");

                const extractedBlockchain = blockchainApiData?.data?.find(
                  (item, index) => {
                    return item?.shortName == data?.blockChainName;
                  }
                );
                setAddPropertiesList(data?.nftProperties);
                setSelectedBlockchain(extractedBlockchain);
                sett_collectionid(data?.collectionId);
                SetNFTData((prev) => {
                  return {
                    ...prev,
                    fileupload: data.image,
                    NFT_name: data?.name,
                    item_desc:
                      data?.description === "null" || data?.description === null
                        ? null
                        : data?.description,
                    item_extLink: data?.externalLink,
                    NFT_price: data?.buyPrice,
                    Royalty: data?.royalty,
                    item_supply: 1,
                    item_PropertyList: data?.nftProperties,
                    item_LevelsList: addLevelsList,
                    item_StatsList: addStatsList,
                    item_contactAddress: data?.contractAddress,
                    item_tokenId: data?.nftTokenId,
                    collection: data?.collectionId,
                    payment_token: data?.currencyId,
                    bidStartTime: startDate,
                    bidEndTime: endDate,
                    blockchain: extractedBlockchain?.chainID,
                  };
                });
                setCollectionId(data?.collectionId);
                setIsloadingnft(false);
                SetFiles(data?.image);
              })
              .catch((error) => { });
          });
        });
      });
    } else {
      setIsloadingnft(false);
      dispatch(GetMyNftByIdRequest());
    }
  }, [id]);

  const removeProperty = (index) => {
    if (addPropertiesList.length == 0) return;
    else {
      let filteredList = [...addPropertiesList.filter((item, i) => i != index)];
      setAddPropertiesList(filteredList);
    }
  };

  const characterCahngeHandler = (e, index) => {
    const itemToChange = addPropertiesList.find((item, i) => index === i);
    const ind = addPropertiesList.indexOf(itemToChange);
    addPropertiesList[ind].name = e.target.value;
    const data = [...addPropertiesList];
    setAddPropertiesList(data);
  };

  const maleCahngeHandler = (e, index) => {
    const itemToChange = addPropertiesList.find((item, i) => index === i);
    const ind = addPropertiesList.indexOf(itemToChange);
    addPropertiesList[ind].type = e.target.value;
    const data = [...addPropertiesList];

    setAddPropertiesList(data);
  };
  const rarityCahngeHandler = (e, index) => {
    const itemToChange = addPropertiesList.find((item, i) => index === i);
    const ind = addPropertiesList.indexOf(itemToChange);
    addPropertiesList[ind].rarity = e.target.value;
    const data = [...addPropertiesList];

    setAddPropertiesList(data);
  };
  const toggleOnPropertiesModal = () => {
    setShow(true);
  };

  const switchStatus = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const savePropertiesList = () => {
    const filter = addPropertiesList?.filter((item, index) => {
      return item?.name && item?.type && item?.rarity;
    });
    setAddPropertiesList([...filter]);
    setShow(false);
    setFinalCreatedProperties([...filter]);
  };

  const onsubmitHandler = (e) => {
    // console.log("collection submit", t_collectionid);
    if (t_collectionid == "Select Collection") {
      setCollectionError("Please select collection first");
      return;
    }

    if (errorMessage.NFT_name || errorMessage.NFT_price) return;
    if (!files) {
      setErrorMessage((prev) => {
        return { ...prev, image: "NFT image is required" };
      });
      return;
    }
    if (!NFTData.NFT_name) {
      setErrorMessage((prev) => {
        return { ...prev, NFT_name: "NFT name is required" };
      });
      return;
    }
    if (!NFTData.NFT_price) {
      setErrorMessage((prev) => {
        return { ...prev, NFT_price: "NFT price is required" };
      });
      return;
    }

    setUpdateloader(true);

    setIsLoading(true);
    var bodyFormData = new FormData();
    bodyFormData.append("OwnerAddress", WalletAddress);
    bodyFormData.append("Name", NFTData.NFT_name);
    bodyFormData.append(
      "ExternalLink",
      NFTData.item_extLink ? NFTData.item_extLink : " "
    );
    bodyFormData.append("Description", NFTData.item_desc);
    bodyFormData.append("UnlockableContent", UnlockAbleContentt);
    bodyFormData.append("CurrencyId", NFTData?.payment_token);
    bodyFormData.append(
      "UnlockableContentNote",
      NFTData.item_UnlockAbleContent
    );
    bodyFormData.append("ChainId", t_BlockChianid);
    bodyFormData.append("SensitiveContent", SensitiveContentt);
    bodyFormData.append("CollectionId", t_collectionid);

    // usman's changing start
    // bodyFormData.append("BlockChainName", selectedBlockchain?.shortName);
    bodyFormData.append("BlockChainName", "BNB");
    // usman's changing end
    bodyFormData.append(
      "NftProperties",
      JSON.stringify(finalCreatedProperties)
    );
    bodyFormData.append("NftLevels", []);
    bodyFormData.append("NftStats", []);
    if (NFTData.item_contactAddress) {
      bodyFormData.append("ContractAddress", NFTData.item_contactAddress);
      bodyFormData.append("TokenId", NFTData.item_tokenId);
    }
    bodyFormData.append("Image", files);
    bodyFormData.append("Price", NFTData.NFT_price);
    bodyFormData.append("Royalty", NFTData.Royalty);
    // bodyFormData.append("NftProperties",NFTData.item_PropertyList)

    // console.log([...bodyFormData])

    if (id) {
      bodyFormData.append("NftId", id);
      bodyFormData.append("freezeData", isSwitchOn);

      if (isSwitchOn === true) {
        let params = window.location.pathname;
        http
          .get(
            httpUrl + `/api/v1/Nft/GetMyNftById?nftId=${params.split("/")[3]}`
          )
          .then((nftData) => {
            // console.log(NFTData.Royalty, "nftdata");
            var payload = [
              {
                to: nftData.data.data.ownerAddress,
                uri: nftData.data.data.ownerImage
                  ? nftData.data.data.ownerImage
                  : nftData.data.data.ownerAddress,
                tokenId: nftData.data.data.nftTokenId,
                royalty: NFTData.Royalty
              },
            ];
            dispatch(
              mint(payload, nftData.data.data.contractAddress)
                .then((response) => {
                  setIsLoading(true);
                  bodyFormData.append("FeeTransactionHash", response.hash);
                  const str = response.hash;
                  showToastMessage("NFT Updating in process", "success");
                  var postBody = {
                    nftId: id,
                    transactionHash: str,
                  };
                  delay(12000).then(() => {
                    http
                      .put(httpUrl + "/api/v1/Nft/EditNft", bodyFormData)
                      .then(async (res) => {
                        await http
                          .post(
                            httpUrl +
                            `/api/v1/Nft/FreezeNft?NftId=${id.toString()}&TransactionHash=${str}`,
                            postBody
                          )
                          .then((res) => {
                            setIsLoading(false);
                            setTimeout(() => {
                              dispatch(GetMyAllNftsAction()).then(
                                (response) => {
                                  setUpdateloader(false);
                                  return history.push(
                                    `/usernftdetail/${id}/${response?.data[0].accountId}`
                                  );
                                }
                              );
                              dispatch(GetNftMarketAction());
                            }, 2000);
                            showToastMessage(
                              "NFT Updated successfully",
                              "success"
                            );
                          })
                          .catch((err) => {
                            setUpdateloader(false);
                            // setIsLoading(false);
                          });
                      });
                  });
                })
                .catch((err) => {
                  setUpdateloader(false);
                  showToastMessage("Transaction rejected", "error");
                  setIsLoading(false);
                })
            ).catch((e) => {
              setUpdateloader(false);
              setIsLoading(false);
            });
          })
          .catch((error) => {
            //  setUpdateloader(false)
            setIsLoading(false);
          });
      } else if (isSwitchOn === false) {
        http.put(httpUrl + "/api/v1/Nft/EditNft", bodyFormData).then((res) => {
          setTimeout(() => {
            dispatch(GetMyAllNftsAction()).then((response) => {
              return history.push(
                `/usernftdetail/${id}/${response?.data[0].accountId}`
              );
            });
            dispatch(GetNftMarketAction());
          }, 2000);

          showToastMessage("NFT Updated successfully", "success");
          setIsLoading(false);
          //setUpdateloader(false)
        });
      }
    } else {
      http
        .get(httpUrl + "/api/v1/Nft/GetNftMintingFee")
        .then((res) => {
          const amount = parseInt(
            Web3.utils.toWei(String(res?.data?.data.nftFee))
          ).toString(16);
          var payload;
          if (NFTData.item_contactAddress) {
            payload = [
              {
                from: WalletAddress,
                to: NFTData.item_contactAddress,
                value: amount,
              },
            ];
          } else {
            payload = [
              {
                from: WalletAddress,
                to: getMasterAddress,
                value: amount,
              },
            ];
          }
          dispatch(AddNftAction(bodyFormData))
            .then((res) => {
              setIsLoading(false);
              showToastMessage(
                `NFT successfully created you are going to be redirected to created NFT`,
                "success"
              );
              setTimeout(async () => {
                dispatch(GetMyAllNftsAction()).then((response) => {
                  return history.push(
                    `/usernftdetail/${response?.data[0].id}/${response?.data[0].accountId}`
                  );
                });
                dispatch(GetNftMarketAction());
              }, 2000);
            })
            .catch((error) => {
              setIsLoading(false);
              //setUpdateloader(false)
              showToastMessage(`${error?.message}`, "error");
            });
        })
        .catch((error) => {
          //setUpdateloader(false)

          setIsLoading(false);
        });
    }
  };
  return (
    <div>
      {pageLoader ? (
        <div className="spacer-10">
          <br />
          <br />
          <br />
          <br />
          <div className="col-sm-12 d-flex justify-content-center">
            <RingLoader color="white" size="80" />
          </div>
        </div>
      ) : (
        <>
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

          <section className="jumbotron breadcumb no-bg">
            <div className="small-pnl secnd-anime">
              <div className="bg-layer"></div>
              <span className="circle-span anim small yelow position-1"></span>
              <span className="circle-span anim small green position-4"></span>
              <span className="circle-span anim small green position-6"></span>
              <span className="circle-span anim star rotate-anim position-7"></span>
              <span className="circle-span anim star rotate-anim position-8"></span>
              <span className="square-span anim small rotate-anim yelow position-9"></span>
              <span className="square-span anim small rotate-anim green position-10"></span>
              <span className="square-big-span yellow anim translate-anim-1 position-11"></span>
              <span className="square-big-span greeen anim translate-anim-2 position-12"></span>
            </div>
            <div className="mainbreadcumb bg-dots-pnl">
              <div className="container">
                <div className="row m-10-hor">
                  <div className="col-12">
                    <h1 className="text-center">
                      {id ? "Update" : "CREATE"} NFT
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="container">
            <div className="row">
              <div className="col-lg-8 mb-5">
                {/* {id ? setFieldValue(values?.blockchain) : ""} */}
                <div className="field-set">
                  <h5 className="text-dark">Name of the NFT</h5>
                  <input
                    type="text"
                    onChange={(e) => {
                      inputhandler(e);
                    }}
                    value={NFTData?.NFT_name}
                    name="NFT_name"
                    className="form-control"
                    placeholder="NFT Name"
                  />
                  {errorMessage.NFT_name && (
                    <div className="text-red">{errorMessage.NFT_name}</div>
                  )}
                  <div className="spacer-10"></div>
                  <h5 className="text-dark">External Link</h5>
                  <input
                    type="text"
                    onChange={(e) => {
                      inputhandler(e);
                    }}
                    value={NFTData.item_extLink}
                    name="item_extLink"
                    id="item_extLink"
                    className="form-control"
                    placeholder="e.g. 'https://www.yoursite.com/item/123'"
                  />

                  <div className="spacer-10"></div>
                  <h5 className="text-dark">Description</h5>
                  <textarea
                    data-autoresize
                    onChange={(e) => {
                      inputhandler(e);
                    }}
                    value={NFTData.item_desc}
                    MyProfile
                    name="item_desc"
                    id="item_desc"
                    className="form-control"
                    placeholder="e.g. 'This is very limited item'"
                  ></textarea>
                  {errorMessage.item_desc && (
                    <div className="text-red">{errorMessage.item_desc}</div>
                  )}
                  <div className="spacer-10"></div>
                  <h5 className="text-dark">Upload file</h5>
                  <div className="d-create-file">
                    <p
                      id="file_name"
                      className={FileError ? "text-danger" : ""}
                    >
                      {FileError && FileError}
                      {/* @ts-ignore */}
                      {files
                        ? //  @ts-ignore
                        files?.name || files
                        : "Please Select PNG, JPG, JPEG Or GIF"}
                    </p>
                    {/* {files.map((x) => (
                    <p key="{index}">{x.name}</p>
                  ))} */}
                    <div className="browse">
                      <input
                        type="button"
                        id="get_file"
                        name="fileupload"
                        className="btn-main whiter"
                        value="Choose File"
                      />
                      <input
                        id="upload_file"
                        type="file"
                        name="fileupload"
                        onChange={(e) => {
                          fileschange(e);
                        }}
                      />
                    </div>
                  </div>

                  <div className="spacer-single"></div>
                  {/* <h5 className="text-dark">Number Of NFT copies</h5>
                        <input className="form-control" autoComplete="off" placeholder="Number Of NFT copies" />
                        <div className="spacer-10"></div>*/}
                  <h5 className="text-dark">Price</h5>
                  <input
                    type="number"
                    onChange={(e) => {
                      inputhandler(e);
                    }}
                    value={NFTData.NFT_price}
                    name="NFT_price"
                    className="form-control"
                    placeholder="enter price for one item (BNB)"
                  />

                  {errorMessage.NFT_price && (
                    <div className="text-red">{errorMessage.NFT_price}</div>
                  )}

                  <div className="spacer-10"></div>

                  <h5 className="text-dark">Royalty</h5>
                  <input
                    type="number"
                    onChange={(e) => {
                      inputhandler(e);
                    }}
                    value={NFTData.Royalty}
                    name="Royalty"
                    className="form-control"
                    placeholder="enter Royality in Integer"
                  />
                  {errorMessage.NFT_royalty && (
                    <div className="text-red">{errorMessage.NFT_royalty}</div>
                  )}
                  <div className="spacer-10"></div>
                  <h5 className="text-dark">Collection</h5>
                  <span className="span-space">
                    This is the collection where your item will appear.
                  </span>
                  {collectionLoader ? (
                    <>
                      <div>
                        <PulseLoader color="white" size="11" />
                      </div>
                    </>
                  ) : (
                    <>
                      {getAllCollectionData.length == 0 ? (
                        <>
                          <div className="spacer-10"></div>
                          <div className="propChildd">
                            <div className="child">
                              <span className="spann">
                                {" "}
                                <i
                                  onClick={() => history.push("/addcollection")}
                                  className="fa fa-fw"
                                  aria-hidden="true"
                                  title="Properties"
                                >
                                  
                                </i>{" "}
                                <h3
                                  onClick={() => history.push("/addcollection")}
                                  className="text-dark"
                                >
                                  Add a collection
                                </h3>
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <select
                            className="form-select form-control custom-select-1"
                            aria-label="Default select example"
                            onChange={(e) => {
                              sett_collectionid(e.target.value);
                            }}
                            value={t_collectionid}
                            style={{
                              backgroundColor: "rgb(232, 232, 232)",
                              color: "#3d3d3d",
                              border: "solid 1px #3d3d3d",
                            }}
                            name="collection"
                          >
                            <option
                              style={{ border: "1px solid #02AAB0" }}
                              value="0"
                            // selected
                            >
                              Select Collection
                            </option>
                            {getAllCollectionData?.map((item, index) => {
                              return (
                                <>
                                  <option
                                    key={index}
                                    value={item.id}
                                    style={{ border: "1px solid #02AAB0" }}
                                  >
                                    {item.name}
                                  </option>
                                </>
                              );
                            })}
                          </select>
                        </>
                      )}
                      {collectionError !== "" && (
                        <div className="text-red">{collectionError}</div>
                      )}
                    </>

                  )}
                  <div className="spacer-10"></div>
                  <div className="" id="propeerty">
                    {id ? (<>
                      <div className="child">
                        <span className="spann">
                          <h3 className="text-dark" style={{ marginBottom: "0px", marginTop: "25px" }}>Properties</h3>
                        </span>
                      </div>
                      <Row>
                        {addPropertiesList?.map((data, index) => {
                          return (
                            <Col
                              xs={6}
                              sm={4}
                              md={4}
                              lg={4}
                              className={
                                "d-flex justify-content-center flex-column align-items-center mt-3 word-break-breakall"
                              }
                              key={index}
                            >
                              <div
                                className="w-100"
                                style={{
                                  backgroundColor: "rgba(21, 178, 229, 0.06)",
                                  borderRadius: 6,
                                  border: "1px solid rgb(21, 178, 229)",
                                  padding: "5px 5px",
                                  textAlign: "center",
                                  wordBreak: "break",
                                }}
                              >
                                <p style={{ color: "#fff", textAlign: "center" }}>{data.name.length >= 25 ? data.name.substring(0, 22) + "..." : data.name}</p>
                                <h6 className="text-dark" style={{ fontSize: "12px" }}>
                                  {data.type.length >= 23 ? data.type.substring(0, 20) + "..." : data.type}
                                  <strong> </strong>
                                </h6>
                                <h6 className="text-dark" style={{ fontSize: "12px" }}>
                                  {data?.rarity?.length >= 23 ? data?.rarity.substring(0, 20) + "..." : data?.rarity}
                                  <strong> </strong>
                                </h6>
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                    </>) : (
                      <>
                        <div className="bottomBorderRed pb-2">
                          <div className="propChild">
                            <div className="child">
                              <span className="spann">
                                {" "}
                                <i className="fas fa-bars"></i>{" "}
                                <h3 className="text-dark" style={{ marginBottom: "25px" }} >Properties</h3>
                              </span>
                              <span>Textual traits that show up as rectangles</span>
                            </div>
                            <div className="child2">
                              <i
                                onClick={toggleOnPropertiesModal}
                                className="fa fa-fw"
                                aria-hidden="true"
                                title="Properties"
                              >
                                
                              </i>
                            </div>
                          </div>
                          <Row>
                            {finalCreatedProperties &&
                              finalCreatedProperties?.map((data, index) => {
                                return (
                                  <Col
                                    xs={6}
                                    sm={4}
                                    md={4}
                                    lg={4}
                                    className={
                                      "d-flex justify-content-center flex-column align-items-center mt-3 word-break-breakall"
                                    }
                                    key={index}
                                  >
                                    <div
                                      className="w-100"
                                      style={{
                                        backgroundColor: "rgba(21, 178, 229, 0.06)",
                                        borderRadius: 6,
                                        border: "1px solid rgb(21, 178, 229)",
                                        padding: "5px 5px",
                                        textAlign: "center",
                                        wordBreak: "break",
                                      }}
                                    >
                                      <p style={{ color: "#fff", textAlign: "center" }}>{data.name.length >= 25 ? data.name.substring(0, 22) + "..." : data.name}</p>
                                      <h6 className="text-dark" style={{ fontSize: "12px" }}>
                                        {data.type.length >= 23 ? data.type.substring(0, 20) + "..." : data.type}
                                        <strong> </strong>
                                      </h6>
                                      <h6 className="text-dark" style={{ fontSize: "12px" }}>
                                        {data.rarity.length >= 23 ? data.rarity.substring(0, 20) + "..." : data.rarity}
                                        <strong> </strong>
                                      </h6>
                                    </div>
                                  </Col>
                                );
                              })}
                          </Row>
                        </div>
                      </>
                    )}
                    {/* <div className="propChild">
                    <div className="child">
                      <span className="spann">
                        {" "}
                        <i
                          className="fa fa-fw"
                          aria-hidden="true"
                          title="Copy to use star"
                        >
                          
                        </i>{" "}
                        <h3>Levels</h3>
                      </span>
                      <span>Numerical traits that show as a progress bar</span>
                    </div>
                    <div className="child2" onClick={toggleLevelModal}>
                      <i className="fa fa-fw" aria-hidden="true" title="Levels">
                        
                      </i>
                    </div>
                  </div>
                  <div className="propChild">
                    <div className="child">
                      <span className="spann">
                        {" "}
                        <i className="far fa-chart-bar"></i> <h3>Stats</h3>
                      </span>
                      <span>Numerical traits that show as a progress bar</span>
                    </div>
                    <div className="child2" onClick={toggleStatModal}>
                      <i className="fa fa-fw" aria-hidden="true" title="Stats">
                        
                      </i>
                    </div>
                  </div>
                  <div className="propChild">
                    <div className="child">
                      <span className="spann">
                        {" "}
                        <i className="fas fa-unlock-alt"></i>
                        <h3>Unlockable Content</h3>
                      </span>
                      <span>
                        Include unlockable content that can only be revealed by
                        the owner{" "}
                      </span>
                    </div>
                    <div className="child2">
                      <label className="switch">
                        <input type="checkbox" onChange={UnlockAbleContent} />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                  {UnlockAbleContentt && (
                    <textarea
                      style={{ marginTop: "5px" }}
                      data-autoresize
                      onChange={inputhandler}
                      value={NFTData.item_UnlockAbleContent}
                      name="item_UnlockAbleContent"
                      id="item_UnlockAbleContent"
                      className="form-control"
                      placeholder="e.g. 'item  UnlockAbleContent'"
                    ></textarea>
                  )}
                  <div className="propChild">
                    <div className="child">
                      <span className="spann">
                        {" "}
                        <i className="fas fa-exclamation-triangle"></i>{" "}
                        <h3>Explicit & Sensitive Content</h3>
                      </span>
                      <span>
                        Set this item as explicit and sensitive content
                      </span>
                    </div>
                    <div className="child2">
                      <label className="switch">
                        <input type="checkbox" onChange={SensitiveContent} />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div> */}
                  </div>
                  {/* <h5>Supply</h5>
                <input
                  style={{
                    backgroundColor: "none",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  type="text"
                  onChange={inputhandler}
                  value={NFTData.item_supply}
                  name="item_supply"
                  id="item_supply"
                  className="form-control"
                  disabled
                /> */}
                  <div className="spacer-60"></div>
                  <h5 className="text-dark">Blockchain</h5>
                  <select
                    className="form-select form-control custom-select-1"
                    aria-label="Default select example"
                    onChange={inputhandler}
                    value={NFTData.blockchain}
                    style={{
                      backgroundColor: "rgb(255, 255, 255)",
                      color: "#3d3d3d",
                      border: "solid 1px #3d3d3d",
                    }}
                    name="blockchain"
                  >
                    {getAllBlockchain?.map((item, index) => (
                      <option
                        key={index}
                        value={item.chainID}
                        style={{ border: "1px solid #02AAB0" }}
                      >
                        {item.name} ({item.shortName})
                      </option>
                    ))}
                  </select>
                  <div className="my-3"></div>
                  <h5 className="text-dark">Payment tokens</h5>
                  <select
                    className="form-select form-control custom-select-1"
                    aria-label="Default select example"
                    onChange={(e) => {
                      SetNFTData((pre) => {
                        return {
                          ...pre,
                          payment_token: JSON.parse(e.target.value).id,
                          currency_name: JSON.parse(e.target.value).name
                        };
                      });
                    }}
                    value={NFTData.payment_token}
                    name="payment_token"
                    style={{
                      backgroundColor: "rgb(255, 255, 255)",
                      color: "#3d3d3d",
                      border: "solid 1px #3d3d3d",
                    }}
                  >
                    {getAllCurrency?.map((item, index) => (
                      <option
                        value={item}
                        key={index}
                        style={{ border: "1px solid #02AAB0" }}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {WalletAddress === params && (
                    <>
                      <h5 className="text-dark">Freeze metadata?</h5>
                      <Formm>
                        <Formm.Switch
                          type="switch"
                          id="custom-switch"
                          label="Checking it will permanently freeze the metadata and can be sold on marketplace."
                          checked={isSwitchOn}
                          onChange={() => {
                            switchStatus();
                          }}
                        />
                      </Formm>
                    </>
                  )}
                  <div className="spacer-10"></div>
                  <h5 className="text-dark">Contract Address (Optional)</h5>
                  <input
                    placeholder="If already minted"
                    type="text"
                    onChange={(e) => {
                      inputhandler(e);
                      if (e.target.value == "") {
                        setShowTokenId(false);
                      } else {
                        setShowTokenId(true);
                      }
                    }}
                    value={NFTData.item_contactAddress}
                    name="item_contactAddress"
                    id="item_contactAddress"
                    className="form-control"
                    disabled={id}
                  />

                  <div className="spacer-10"></div>

                  {showTokenId ? (
                    <>
                      <h5 className="text-dark">Token Id</h5>
                      <input
                        type="number"
                        onChange={(e) => {
                          inputhandler(e);
                        }}
                        value={NFTData.item_tokenId}
                        name="item_tokenId"
                        id="item_tokenId"
                        className="form-control"
                        placeholder="Enter the Token id "
                      />

                      {NFTData.item_contactAddress.length > 0 &&
                        !NFTData.item_tokenId ? (
                        <div className="text-red">Token Id Required</div>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )}

                  {/* <div className="spacer-10"></div>
                  <h5>Freeze Data</h5>
                  <input
                    type="text"
                    onChange={inputhandler}
                    value={NFTData.item_Freezemetadata}
                    name="item_Freezemetadata"
                    id="item_Freezemetadata"
                    className="form-control"
                    placeholder="suggested: 0, 10%, 20%, 30%. Maximum is 70%"
                  /> */}
                  <div className="spacer-10"></div>
                  <div className="btn-cntnr">
                    {isLoading ? (
                      <button
                        disabled
                        style={{
                          backgroundColor: "#37C3FF",
                          borderRadius: 20,
                          height: 35,
                          width: 130,
                          borderWidth: 0,
                        }}
                      >
                        <PulseLoader color="white" size="11" />
                      </button>
                    ) : NFTData.item_contactAddress == "" ||
                      (NFTData.item_contactAddress.length > 0 &&
                        NFTData.item_tokenId) ? (
                      Updateloader ? (
                        <PulseLoader size="11" color="white" />
                      ) : (

                        files != "" && NFTData.NFT_name != "" && t_collectionid != "0" && t_collectionid != "" && NFTData.NFT_price != "" && NFTData.Royalty != "" ?
                          <input
                            type="submit"
                            id="submit"
                            className="btn-main whiter"
                            value={`${id ? "Update" : "Create"} NFT`}
                            onClick={onsubmitHandler}
                          />
                          :
                          <button
                            disabled
                            style={{
                              backgroundColor: "#37C3FF",
                              borderRadius: 20,
                              height: 35,
                              width: 130,
                              borderWidth: 0,
                              color: "#fff"
                            }}
                          >
                            {(id ? "Update" : "Create") + "NFT"}
                          </button>
                      )
                    ) : (
                      <>
                        <input
                          id="submit"
                          className="btn-secondary text-center"
                          value={`${id ? "Update" : "Create"} NFT`}
                          style={{
                            width: 150,
                            height: 35,
                            borderRadius: 30,
                            borderWidth: 0,
                          }}
                          disabled
                        />
                      </>
                    )}
                    <input
                      style={{
                        width: 150,
                        height: 35,
                        borderRadius: 30,
                        borderWidth: 0,
                      }}
                      value={"Cancel"}
                      className="btn-main whiter"
                      onClick={() => history.goBack()}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-sm-6 col-xs-12 word-break-breakall">
                <h5 className="text-dark">Preview</h5>
                <div className="nft__item m-0 preview-box">
                  <div
                    className="author_list_pp "
                    style={{ background: "none" }}
                  >
                  </div>
                  <div className="nft__item_wrap">
                    <span>
                      {id && NFTData?.fileupload == files ? (
                        <>
                          <img
                            src={`${httpUrl}/${files}`}
                            id="get_file_2"
                            className="lazy nft__item_preview"
                            alt="NFT.png"
                          />
                        </>
                      ) : (
                        <img
                          src={
                            files
                              ? URL.createObjectURL(files)
                              : "./img/collections/def.jpeg"
                          }
                          id="get_file_2"
                          className="lazy nft__item_preview "
                          alt="NFT.png"
                        />
                      )}
                    </span>
                  </div>
                  <div className="nft__item_info nft-item-margin">
                    <span className="Nfttitle break-all-characters">
                      <h4>
                        <span>
                          {NFTData?.item_title
                            ? NFTData.item_title
                            : "Item Title"}
                        </span>
                        <span style={{
                          paddingLeft: '20px',
                          color: '#000000d4',
                          fontSize: '15px',
                          fontWeight: '500'
                        }}>{NFTData?.NFT_name ?
                          (NFTData.NFT_name.length > 25 ? NFTData.NFT_name.substring(0, 25) + "..." : NFTData.NFT_name)
                          : null}</span>
                      </h4>
                    </span>
                    <div className="nft__item_price break-all-characters">
                      <span style={{ color: 'initial', marginLeft: '0' }}>
                        {NFTData?.item_price ? NFTData.item_price : "Item Price"}{" "}
                        {`(${selectedBlockchain?.shortName ? selectedBlockchain?.shortName : NFTData.currency_name })`}
                      </span>
                      <span style={{
                        paddingLeft: '20px',
                        color: '#000000d4',
                        fontSize: '15px',
                        fontWeight: '500'
                      }}>{NFTData?.NFT_name ?
                        (NFTData.NFT_price.length > 12 ? NFTData.NFT_price.toString().substring(0, 10) + "..." : NFTData.NFT_price)
                        : null}</span>
                    </div>
                    {/* <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>50</span>
                </div> */}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Footer />

          <Modal show={show} onHide={handleClose} animation={true} centered>
            <Modal.Header className="modal-header-color">
              <Modal.Title className=" text-black" style={{ color: "black" }}> Add Properties</Modal.Title>

              <button
                aria-label="Hide"
                onClick={handleClose}
                className="btn-close fa fa-close "
              />
            </Modal.Header>
            <Modal.Body className="modal-body-color text-black">
              <p>
                Properties show up underneath your item, are clickable, and can
                be filtered in your collection's sidebar.
              </p>
              <Row style={{ paddingBottom: "5px", marginTop: "15px" }}>
                <Col xs={1}></Col>
                <Col xs={5}>
                  <span
                    className=" text-black"
                    style={{ fontWeight: "bold", color: "black" }}
                  >
                    Name
                  </span>
                </Col>
                <Col xs={3}>
                  <span
                    className=" text-black"
                    style={{ fontWeight: "bold", color: "black" }}
                  >
                    Type
                  </span>
                </Col>
                <Col xs={3}>
                  <span
                    className=" text-black"
                    style={{ fontWeight: "bold", color: "black" }}
                  >
                    rarity
                  </span>
                </Col>

              </Row>

              <div
                style={{
                  maxHeight: "300px",
                  overflowY: "scroll",
                  overflowX: "hidden",
                }}
              >
                {addPropertiesList.map((item, index) => {
                  return (
                    <div
                      style={{
                        border: "1px solid #c7a7a7b9",
                        borderRadius: "4px",
                        // marginTop: "10px",
                      }}
                      key={index}
                    >
                      <Row style={{ height: "40px" }}>
                        <Col xs={1}>
                          <div
                            style={{
                              width: "25px",
                              height: "25px",
                              cursor: "pointer",
                              marginTop: "8px",
                            }}
                            onClick={() => {
                              removeProperty(index);
                            }}
                          >
                            <CrossIcon />
                          </div>
                        </Col>
                        <Col
                          xs={5}
                          style={{
                            borderRight: "1px solid #c7a7a7b9",
                            borderLeft: "1px solid #c7a7a7b9",
                            height: 40,
                          }}
                        >
                          <input
                            placeholder="Character"
                            type="text"
                            className="form-control"
                            value={item.name}
                            maxLength={25}
                            onChange={(e) => {
                              characterCahngeHandler(e, index);
                            }}
                            style={{
                              border: "none",
                              outline: "none",
                            }}
                          />
                        </Col>
                        <Col xs={3} style={{
                          borderRight: "1px solid #c7a7a7b9",
                          borderLeft: "1px solid #c7a7a7b9",
                          height: 40,
                        }}>
                          <input
                            placeholder="Name"
                            onChange={(e) => {
                              maleCahngeHandler(e, index);
                            }}
                            className="form-control"
                            value={item.type}
                            type="text"
                            maxLength={25}
                            style={{
                              border: "none",
                              outline: "none",
                            }}
                          />
                        </Col>
                        <Col xs={3}  >
                          <input

                            placeholder="rarity"
                            onChange={(e) => {
                              rarityCahngeHandler(e, index);
                            }}
                            className="form-control"
                            value={item.rarity}
                            type="number"
                            maxLength={25}
                            style={{
                              border: "none",
                              outline: "none",
                            }}
                          />
                        </Col>
                      </Row>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={addMoreProperty}
                style={{
                  padding: "10px",
                  border: "2px solid #308AFB",
                  color: "#308AFB",
                  fontWeight: "bold",
                  background: "transparent",
                  borderRadius: "6px",
                  marginTop: "12px",
                  cursor: "pointer",
                }}
              >
                Add more
              </button>
            </Modal.Body>
            <Modal.Footer className="modal-footer-color">
              <div style={{ textAlign: "center", width: "100%" }}>
                <button
                  style={{
                    background: "#308AFB",
                    color: "white",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "8px",
                  }}
                  onClick={savePropertiesList}
                >
                  Save
                </button>
              </div>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
}
export default CreateNFT;

function CrossIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));
