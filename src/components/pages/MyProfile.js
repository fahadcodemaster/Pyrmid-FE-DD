
import React, { useEffect, useState, useReducer } from "react";
import { useHistory } from "react-router-dom";
import MyNft from "./MyNfts/MyNfts";
import Footer from "../components/footer";
import bannerimg from '../../assets/images/profile-banner.jpg';
import agreeIcon from '../../assets/images/agree.png';
import disagreeIcon from '../../assets/images/disagree.png';
import collectionicon from '../../assets/images/collection-icon.png';
import nfticon from '../../assets/images/nft-icon.png';
import photoicon from '../../assets/images/photo-icon.png';
import gifficon from '../../assets/images/giff-icon.png';
import bg from '../../assets/images/big-img1.png';
import videoicon from '../../assets/images/video-icon.png';
import gificon from '../../assets/images/gif-icon.png';
import awatar from '../../assets/images/default.png';
import filtericon from '../../assets/images/filter-icon.png';
import bigimg from '../../assets/images/big-img.png';
import { createGlobalStyle } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaGlobe, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import MyCollections from "./MyCollections";
import GetMyAllCollectionsAction from "../../Redux/Actions/CollectionAction/GetMyAllCollections";
import AllFavourite from "./AllFavorite/AllFavourite";
import { WalletDisconnect } from "../../Redux/Actions/WalletActions/WalletAction";
import { AuthConnectRequest } from "../../Redux/Actions/AuthActions/AuthConnectAction";
import { LogoutAction } from "../../Redux/Actions/AuthActions/LogoutAction";
import { ValidateSignatureRequest } from "../../Redux/Actions/AuthActions/ValidateSignatureAction";
import { Dropdown, DropdownButton, Modal } from "react-bootstrap";
import http from "../../Redux/Api/http";
import { Avatar } from "antd";

const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;
const initialState = { isDisable: false };
const reducer = (state, action) => {
  switch (action.type) {
    case 'clicked':
      return { isDisable: true };
    case 'notClicked':
      return { isDisable: false };
  }
}
const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: transparent;
  }
`;
const changeImage = (event) => {
  var image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
};
const MyProfile = function () {
  const [route, setRoute] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [postCommentID, setPostCommentID] = useState();
  const [commentbody, setCommentBody] = useState("");
  const [ProfileData, setprofiledata] = useState(false);
  const [postSubCommentID, setSubPostCommentID] = useState();
  const [subCommentbody, setSubCommentBody] = useState();
  const history = useHistory();
  const [state, disableDispatch] = useReducer(reducer, initialState)
  const location = useLocation()
  const isConnected = useSelector(
    (state) => state.Login?.authResponse?.data?.token
  );
  useEffect(() => {
    if (location.state?.center) {
      handleBtnClick1()
    }
  }, [location.state])
  const dispatch = useDispatch();
  const User = useSelector((state) => state.Login);
  const Logoutt = async () => {
    await dispatch(WalletDisconnect());
    await dispatch(AuthConnectRequest());
    await dispatch(LogoutAction());
    await dispatch(ValidateSignatureRequest());
  };
  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );
  const MyProfile = useSelector(
    (state) => state.MyProfile?.MyProfileResponse?.data
  );
  useEffect(() => {
    setprofiledata(MyProfile)
    console.log("my pp", MyProfile)
  }, [MyProfile])
  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [openMenu3, setOpenMenu3] = React.useState(false);
  const handleBtnClick = () => {
    setOpenMenu(true);
    setOpenMenu1(false);
    setOpenMenu2(false);
    setOpenMenu3(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(true);
    setOpenMenu2(false);
    setOpenMenu(false);
    setOpenMenu3(false);

    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(true);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu3(false);

    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.add("active");
    document.getElementById("Mainbtn3").classList.remove("active");
  };
  const GetNftCollectionByIdWithOutAccount = useSelector(
    (state) =>
      console.log(state?.GetNftCollectionByIdWithOutAccount
        ?.GetNftCollectionByIdWithOutAccountResponse?.data, "ponka"),
    state?.GetNftCollectionByIdWithOutAccount
      ?.GetNftCollectionByIdWithOutAccountResponse?.data
  );
  const handleBtnClick3 = () => {
    setOpenMenu2(false);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu3(true);
    document.getElementById("Mainbtn3").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };
  const [files, SetFiles] = useState([]);
  const [FileError, SetFileError] = useState("");
  const fileschange = (e) => {
    const file = e.target.files[0];
    console.log(file.type)
    console.log("filesssssss", file)
    if (
      file?.type === "image/jpeg" ||
      file?.type === "image/png" ||
      file?.type === "image/jpg" ||
      file?.type === "image/gif" ||
      file?.type === "video/mp4" ||
      file?.type === "video/ogg" ||
      file?.type === "video/avi"

    ) {
      console.log("file accepted")
      SetFileError(null);
      SetFiles(file);
      // setErrorMessage((prev) => {
      //   return { ...prev, image: "" };
      // });
    } else {
      console.log("file rejected")
      SetFileError("Invalid File Format ");
      SetFiles(null);
      // setErrorMessage((prev) => {
      //   return { ...prev, image: "Please select" };
      // });
    }
  };
  const [postDesc, setPostDesc] = useState("nil");
  const [PostDescErr, setpostDescErr] = useState(false);
  const [postTitle, setPostTitle] = useState();
  const [subCommentBox, setSubCommentBox] = useState(false);
  const [subComm, setSubComm] = useState();
  //e const setPostTitle(e.target.value)=()=>{

  //   setTimelineModalDec(true)
  // }



  const subComment = async (commentid, postid) => {
    console.log("id is here for comment", commentid)
    await http
      .get(
        //   httpUrl + `/api/v1/Post/GetCommentByPostId?postId=${id}`
        httpUrl + `/api/v1/Post/GetSubCommentByPostId?postId=${postid}&CommentId=${commentid}&AccountId=${MyProfile.id}`
      ).then((res) => {
        console.log("get sub comment", res.data.data)
        setSubComm(res?.data?.data)

      }).catch((error) => {
        console.log("errrrrror", error)
      })
  }



  const handleSubComment = async (postid, commentid) => {
    setSubCommentBody('')
    console.log("postiddddddd", postid + "commet id", commentid)
    if (isConnected) {
      const payload = {
        postId: postid,
        commentBody: subCommentbody,
        isHTML: true,
        parentCommentId: commentid
      }

      if(subCommentbody?.split(" ")[0]){
      await http
        .post(
          httpUrl + "/api/v1/Post/PostComment", payload
        ).then((res) => {
          console.log("post added", res.data)
          subComment(commentid, postid);

        }).catch((error) => {
          console.log("error", error)
        })
      }

    }
    else {
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


  const handleCommentsLike = async (id, postId) => {
    console.log(id)
    await http
      .post(
        httpUrl + `/api/v1/Post/PostCommentLikeUnlike?CommentId=${id}&IsLike=true`,
      )
      .then((res) => {
        console.log("comment likes success", res.data)
        // handleAllPost()
        handleGetComment(postId)
      }).catch((error) => (
        console.log("errrrrrrror", error)
      ))
  }
  const handleSubCommentsLike = async (id, parentId, postId) => {
    console.log(id)
    await http
      .post(
        httpUrl + `/api/v1/Post/PostCommentLikeUnlike?CommentId=${id}&IsLike=true`,
      )
      .then((res) => {
        console.log("comment likes success", res.data)
        // handleAllPost()
        //   handleGetComment(postId)
        subComment(parentId, postId)
      }).catch((error) => (
        console.log("errrrrrrror", error)
      ))
  }
  const handleCommentsUnLike = async (id, postId) => {
    await http
      .post(
        httpUrl + `/api/v1/Post/PostCommentLikeUnlike?CommentId=${id}&IsLike=false`,
      )
      .then((res) => {
        console.log("comment likes success", res.data)
        // handleAllPost()
        handleGetComment(postId)
      }).catch((error) => (
        console.log("errrrrrrror", error)
      ))
  }
  const handleSubCommentsUnLike = async (id, parentId, postId) => {
    await http
      .post(
        httpUrl + `/api/v1/Post/PostCommentLikeUnlike?CommentId=${id}&IsLike=false`,
      )
      .then((res) => {
        console.log("comment likes success", res.data)
        // handleAllPost()
        // handleGetComment(postId)
        subComment(parentId, postId)

      }).catch((error) => (
        console.log("errrrrrrror", error)
      ))
  }
  const handleComment = async (id) => {
    setCommentBody('')
    if (isConnected) {
      const payload = {
        postId: id,
        commentBody: commentbody,
        isHTML: true,
      }
     if(commentbody.split(" ")[0]){
  
      await http
      .post(
        httpUrl + "/api/v1/Post/PostComment", payload
      ).then((res) => {
        console.log("post added", res.data)
        handleGetComment(id)


      }).catch((error) => {
        console.log("error", error)
      })
     }
     else{
     
     }
    }
    else {
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
  const handleDescription = (e) => {
    const value = e.target.value;
    if (value) {
      setPostDesc(value)
      setpostDescErr(false)
    }
    else {
      setPostDesc("nil");
      setpostDescErr(true)
    }
  }
  const handleLikePost = async (id) => {
    if (isConnected) {
      await http
        .post(
          httpUrl + `/api/v1/Post/PostLikeUnlike?postId=${id}&IsLike=true`,
        )
        .then((res) => {
          console.log("like success", res.data)
          // handleAllPost();
          handleGetUserPost();

          toast.success(`Post Liked!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }).catch((error) => (
          console.log("errrrrrrror", error)
        ))
    }
  }
  const handleUnlikePost = async (id) => {
    if (isConnected) {
      await http
        .post(
          httpUrl + `/api/v1/Post/PostLikeUnlike?postId=${id}&IsLike=false`,
        )
        .then((res) => {
          console.log("unlike success", res.data)
          // handleAllPost()
          handleGetUserPost();

          toast.warn(`Post UnLiked!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
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
  const handleAddPostDec = async () => {
    console.log("filessssss", files)
    console.log("post descriptoin", postDesc)
    if (!postDesc) {
      console.log("fill post correctly ")
    }
    else {
      var bodyFormData = new FormData();
      bodyFormData.append("TextBody", postDesc);
      bodyFormData.append("Tittle", postTitle);
      bodyFormData.append("MediaLink", files)
      await http
        .post(
          httpUrl +
          `/api/v1/Post/AddPost`, bodyFormData
        ).then((res) => {
          console.log("add post response", res.data)

          setTimeout(() => {
            handleGetUserPost();
          }, 1000);
          setTimelineModal(false)
          setTimelineModalVideo(false)
          setTimelineModalGif(false)
          setTimelineModalDec(false)
        }).catch((error) => {
          console.log("errrrrrrrrror", error)
        })
    }
  }
  const handleAddPostVideo = async () => {
    if (!files) {
      alert("fill post correctly")
    }
    else {
      var bodyFormData = new FormData();
      bodyFormData.append("TextBody", postDesc);
      bodyFormData.append("Tittle", postTitle);
      bodyFormData.append("MediaLink", files)
      await http
        .post(
          httpUrl +
          `/api/v1/Post/AddPost`, bodyFormData
        ).then((res) => {
          console.log(res.data, "add post response")
          setTimeout(() => {
            handleGetUserPost();
          }, 1000);
          setTimelineModal(false)
          setTimelineModalVideo(false)
          setTimelineModalGif(false)
          setImages("")
        }).catch((error) => {
          console.log("errrrrrrrrror", error)
        })
    }
  }
  const handleAddPost = async () => {
    if (!files) {
      alert("fill post correctly")
    }
    else {
      var bodyFormData = new FormData();
      bodyFormData.append("TextBody", postDesc);
      bodyFormData.append("Tittle", postTitle);
      for (let i = 0; i < files.length; i++) {
        bodyFormData.append("MediaLink", files[i])
      }
      await http
        .post(
          httpUrl +
          `/api/v1/Post/AddPost`, bodyFormData
        ).then((res) => {
          console.log(res.data, "add post response")
          setTimeout(() => {
            handleGetUserPost();
          }, 1000);
          setTimelineModal(false)
          setTimelineModalVideo(false)
          setTimelineModalGif(false)
          setImages("")
        }).catch((error) => {
          console.log("errrrrrrrrror", error)
        })
    }
  }
  const [images, setImages] = useState(null)
  const handleMultipleVideo = (evnt) => {
    const selectedFIles = [];
    const targetFiles = evnt.target.files;
    const targetFilesObject = [...targetFiles]
    console.log(targetFilesObject, "this is what --=====================");
    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file))
    })
    setImages(selectedFIles);
    const file = evnt.target.files[0];
    if (
      file?.type === "video/mp4" ||
      file?.type === "video/ogg" ||
      file?.type === "video/avi"
    ) {
      SetFileError(null);
      SetFiles(file);
      // setErrorMessage((prev) => {
      //   return { ...prev, image: "" };
      // });
    } else {
      console.log("file rejected")
      SetFileError("Invalid File Format ");
      SetFiles(null);
      // setErrorMessage((prev) => {
      //   return { ...prev, image: "Please select" };
      // });
    }


    // setTimelineModal(false)
  }






  const handleMultiplePhoto = (evnt) => {
    const selectedFIles = [];
    const targetFiles = evnt.target.files;
    const targetFilesObject = [...targetFiles]
    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file))
    })
    setImages(selectedFIles);
    const file = evnt.target.files[0];
    console.log(evnt.target.files, "files")
    if (
      file?.type === "image/jpeg" ||
      file?.type === "image/png" ||
      file?.type === "image/jpg"
    ) {
      console.log("file accepted")
      SetFileError(null);
      SetFiles(evnt.target.files);
    } else {
      console.log("file rejected")
      SetFileError("Invalid File Format ");
      SetFiles(null);
    }
  }
  const handleMultipleGif = (evnt) => {
    const selectedFIles = [];
    const targetFiles = evnt.target.files;
    const targetFilesObject = [...targetFiles]
    console.log(targetFilesObject, "this is what --=====================");
    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file))
    })
    setImages(selectedFIles);
    const file = evnt.target.files[0];
    console.log(file?.type)
    console.log("filesssssss", file)
    if (
      file?.type === "image/gif"
    ) {
      console.log("file accepted", file)
      SetFileError(null);
      SetFiles(file);
      // setErrorMessage((prev) => {
      //   return { ...prev, image: "" };
      // });
    } else {
      console.log("file rejected")
      SetFileError("Invalid File Format ");
      SetFiles(null);
      // setErrorMessage((prev) => {
      //   return { ...prev, image: "Please select" };
      // });
    }


    // setTimelineModal(false)
  }













  // const handleMultipleImages = (evnt) => {
  //   const selectedFIles = [];
  //   const targetFiles = evnt.target.files;
  //   const targetFilesObject = [...targetFiles]
  //   console.log(targetFilesObject, "this is what --=====================");
  //   targetFilesObject.map((file) => {
  //     return selectedFIles.push(URL.createObjectURL(file))
  //   })
  //   setImages(selectedFIles);
  //   const file = evnt.target.files[0];
  //   console.log(file?.type)
  //   console.log("filesssssss", file)
  //   if (
  //     file?.type === "image/jpeg" ||
  //     file?.type === "image/png" ||
  //     file?.type === "image/jpg" ||
  //     file?.type === "image/gif" ||
  //     file?.type === "video/mp4" ||
  //     file?.type === "video/ogg" ||
  //     file?.type === "video/avi"

  //   ) {
  //     console.log("file accepted")
  //     SetFileError(null);
  //     SetFiles(file);

  //   } else {
  //     console.log("file rejected")
  //     SetFileError("Invalid File Format ");
  //     SetFiles(null);

  //   }
  // }








  useEffect(() => {
    handleGetUserPost();
    handleGetFollowers();
    handleGetFollowing();
  }, []);

  const [userPostRes, setUserPostRes] = useState();
  const [myFollower, setMyFollower] = useState();
  const [myFollowing, setMyFollowing] = useState();
  const [followModal, setFollowModal] = useState(false);
  const [timelineModal, setTimelineModal] = useState(false);
  const [timelineModalVideo, setTimelineModalVideo] = useState(false)
  const [timelineModalGif, setTimelineModalGif] = useState(false)
  const [timelineModalDec, setTimelineModalDec] = useState(false)


  const [followingModal, setFollowingModal] = useState(false);
  const [commentBox, setCommentBox] = useState(false);
  const [totalFollowers, setTotalFollowers] = useState();
  const [totalFollowing, setTotalFollowing] = useState();
  const [postID, setPostID] = useState();

  const handleGetUserPost = async () => {
    await http
      .get(
        httpUrl + "/api/v1/Post/GetAllPostByUser"
      ).then((res) => {
        console.log("user Response results", res.data.data)

        setUserPostRes(res.data.data)
      }).catch((error) => {
        console.log("errrrrrrrrrror", error)
      })
  }
  const handleGetFollowers = async () => {
    await http
      .get(
        httpUrl + "/api/v1/Post/GetMyAllFollowers"

      ).then((res) => {
        console.log("My Follower Response results", res.data.data)

        setMyFollower(res.data.data)
        setTotalFollowers(res.data.totalItems)
      }).catch((error) => {
        console.log("errrrrrrrrrror", error)
      })

  }
  const handleGetFollowing = async () => {
    await http
      .get(
        httpUrl + "/api/v1/Post/GetMyAllFollowing"
      ).then((res) => {
        console.log("My following Response results", res.data.data)

        setMyFollowing(res.data.data)
        setTotalFollowing(res.data.totalItems)
      }).catch((error) => {
        console.log("errrrrrrrrrror", error)
      })

  }
  const [comments, setComments] = useState();

  const [commentRes, setCommentRes] = useState([]);

  const handleGetComment = async (id) => {

    await http
      .get(
        httpUrl + `/api/v1/Post/GetCommentByPostId?postId=${id}&AccountId=${MyProfile.id}`
      ).then((res) => {
        console.log("get Comment", res.data.data.commentResponse)
        setCommentRes(res.data.data.commentResponse)

      }).catch((error) => {
        console.log("errrrrror", error)
      })
  }


  const handleDelete = async (id) => {
    await http
      .delete(
        httpUrl + `/api/v1/Post/DeletePost?postId=${id}`
      ).then((res) => {
        console.log("Deleted succussfully")
        handleGetUserPost()


      }).catch((error) => {
        console.log("errrrrror", error)
      })
  }

  const closeModel = () => {
    setTimelineModal(false)
    SetFiles("")
    setImages(null)
    setPostDesc("nil")
    SetFileError(null)
  }

  const closeModelDec = () => {
    setTimelineModalDec(false)
    SetFiles("")
    setImages(null)
    setPostDesc("nil")
    SetFileError(null)
  }
  const closeModelVideo = () => {
    setTimelineModalVideo(false)
    SetFiles("")
    setImages(null)
    setPostDesc("nil")
    SetFileError(null)
  }

  const closeModelGif = () => {
    setTimelineModalGif(false)
    SetFiles("")
    setImages(null)
    setPostDesc("nil")
    SetFileError(null)
  }

  const text = MyProfile?.bio ? MyProfile?.bio?.toString() : '';
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
        <div className="full-div banner" style={{ backgroundImage: `url(${bannerimg})` }}></div>
      </section >
      <section className="container myprofile-container">
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
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="profile-info-container">
              <div className="d_profile profile-container">
                {/* Profile Picture */}
                <div className="profile-pic-cntnr">

                  {ProfileData?.profileImage ? (
                    // <div
                    //   style={{
                    //     width: 200,
                    //     height: "auto",
                    //     // backgroundColor: "#02AAB0",
                    //     borderRadius: "100%",
                    //   }}
                    // >
                    <div htmlFor="imagee" className="">
                      <img
                        src={httpUrl + "/" + ProfileData?.profileImage}
                        alt="profile.png"
                        style={{
                          width: 200,
                          height: 200,
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ) : (
                    <div htmlFor="imagee" className="">
                      <FaUserCircle size="2x" />
                    </div>
                  )}
                </div>

                {/* Profile Picture */}
                <div className="Profile-txt" style={{ paddingTop: "80px" }}>
                  <h4>
                    {ProfileData?.username ? ProfileData?.username : "Unnamed"}
                    <span className="email-span" style={{ wordWrap: 'break-word' }}>{ProfileData?.email}</span>
                    <span id="wallet" className="profile_wallet hover-blue" style={{ marginRight: "-5px", maxWidth: "100%" }} >
                      {WalletAddress}</span>
                    <CopyToClipboard
                      text={WalletAddress}
                      onCopy={() => {
                        disableDispatch({ type: 'clicked' })
                        toast.success("Address copied successfully", {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: true,
                          progress: undefined,
                        });
                        setTimeout(() => {
                          disableDispatch({ type: 'notClicked' })
                        }, 5000);
                      }}
                    >
                      <span
                        id="btn_copy"
                        title="Copy Address"
                        disabled={state.isDisable}
                        style={{ marginTop: "43px", marginRight: "181px " }}

                      >
                        <i className="fa fa-files-o" style={{ cursor: "pointer" }}></i>
                      </span>
                    </CopyToClipboard>
                  </h4>
                </div>
              </div>

              <div>
                <DropdownButton id="dropdown-basic-button" className="social--btn" style={{
                  backgroundColor: "transparent !important",
                  border: "hidden",
                  boxShadow: "none !important",
                  display: "inline-block",
                  width: "2%",
                  // height: "100%",
                  position: "absolute",
                  // left: "15%", 
                  top: "8%",
                  right: "0",
                  // backgroundColor:"red"
                }}>
                  {(!GetNftCollectionByIdWithOutAccount?.websiteLink &&
                    !GetNftCollectionByIdWithOutAccount?.kdiscordLink &&
                    !GetNftCollectionByIdWithOutAccount?.twitterLink &&
                    !GetNftCollectionByIdWithOutAccount?.instagramLink &&
                    !GetNftCollectionByIdWithOutAccount?.mediumLink &&
                    !GetNftCollectionByIdWithOutAccount?.tLink) && (
                      <> <span style={{ color: "black" }} > {" "}{" "} No links found </span></>
                    )}
                  {GetNftCollectionByIdWithOutAccount?.websiteLink && (
                    <Dropdown.Item title="website" onClick={() => { window.open(GetNftCollectionByIdWithOutAccount?.websiteLink) }}><i class="fa fa-globe web-color"  ></i> Website</Dropdown.Item>
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
              <div>
                <ul className="de_nav de_nav">
                  <li id="Mainbtn" className="">
                    <span onClick={() => setFollowModal(true)} >{totalFollowers} Follower</span>
                  </li>
                  <li id="Mainbtn1" className="">
                    <span onClick={() => setFollowingModal(true)}>{totalFollowing} Following</span>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container no-top">
        <div className="row">
          <div className="col-lg-12">
            <div className="items_filter">
              <ul className="de_nav de_nav">

                <li id="Mainbtn" className="active">
                  <span onClick={handleBtnClick}><i className="fa fa-edit"></i> Timeline</span>
                </li>
                <li id="Mainbtn1" className="">
                  <span onClick={handleBtnClick1}><img src={collectionicon} /> Collection</span>
                </li>
                <li id="Mainbtn2" className="">
                  <span onClick={handleBtnClick2}><img src={nfticon} /> NFTs</span>
                </li>
                <li id="Mainbtn3" className="">
                  <span onClick={handleBtnClick3}><i className="fa fa-heart"></i> Favourites</span>

                </li>
                <li>
                  {/* className="SideDrop" */}
                  <Link to="/settings">
                    Edit profile
                  </Link>
                </li>
                <li id="Mainbtn4" className="">
                  <span onClick={Logoutt}>Logout</span>
                </li>

              </ul>
            </div>
          </div>
        </div>
        {/* Followers modal */}
        <Modal size="sm" scrollable={true} centered show={followModal} onHide={() => setFollowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm" style={{ color: "black" }}>
              Followers
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {myFollower?.map((data, index) => (
              <>
                <img className="follower-img" src={data.profileImage ? httpUrl + "/" + data.profileImage : awatar} />
                <span className="follower-name">{data?.username ? data.username : "Unnamed"}</span>
                <p></p>
              </>
            ))}

          </Modal.Body>
        </Modal>



        <Modal size="md" className="create-post-modal" scrollable={true} centered show={timelineModalVideo} onHide={() => closeModelVideo()}>
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-md" style={{ color: "white" }}>
              Create post
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="flex">
              <div className="modal-profile-upload">
                {ProfileData?.profileImage ? (

                  <div htmlFor="imagee" className="pf-img">
                    <img
                      src={httpUrl + "/" + ProfileData?.profileImage}
                      alt="profile.png"
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ) : (
                  <div htmlFor="imagee" className="pf-img">
                    <FaUserCircle size="2x" />
                  </div>
                )}
              </div>
              <div className="modal-text-panel">
                <h4>
                  {ProfileData?.username ? ProfileData?.username : "Unnamed"}
                </h4>
                {/* <p>Tell Me</p> */}
              </div>
            </div>
            <div className="full-div">
              <input type="text" className="form-control search-bar-color brd-no"
                data-autoresize
                onChange={(e) => {
                  handleDescription(e);
                }}
                autoComplete="off" placeholder="Whats On Your Mind?" />
            </div>
            <div className="full-div">
              <div className="d-create-file filecreator">
                {/* <button className="close-btn"><i className="fa fa-close"></i></button> */}

                <div>
                  <div className="full-div">
                    {/* <img src={bg} /> */}
                  </div>
                  <p
                    id="file_name" style={{ color: 'white', textAlign: "center" }}
                    className={FileError ? "text-danger" : ""}
                  >
                    {FileError && FileError}

                    {/* {files
                      &&
                      files?.name || files
                    } */}
                  </p>

                  <div className="browse">
                    {
                      files && images ? <video src={images} width="300px" height="300px" /> : ""
                    }
                    <input
                      type="button"
                      id="get_file"
                      name="fileupload"
                      className="btn-main whiter"
                      value="Add Video"
                    />
                    <input
                      id="upload_file"
                      type="file"
                      name="fileupload"
                      accept="video/*"
                      onChange={(e) => {
                        handleMultipleVideo(e)
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="full-div">
              <a href="javascript:void(0);" className="post-btn" onClick={handleAddPostVideo}>
                Post
              </a>

            </div>

          </Modal.Body>
        </Modal>




        <Modal size="md" className="create-post-modal" scrollable={true} centered show={timelineModalGif} onHide={() => closeModelGif()}>
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-md" style={{ color: "white" }}>
              Create post
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="flex">
              <div className="modal-profile-upload">
                {ProfileData?.profileImage ? (

                  <div htmlFor="imagee" className="pf-img">
                    <img
                      src={httpUrl + "/" + ProfileData?.profileImage}
                      alt="profile.png"
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ) : (
                  <div htmlFor="imagee" className="pf-img">
                    <FaUserCircle size="2x" />
                  </div>
                )}
              </div>
              <div className="modal-text-panel">
                <h4>
                  {ProfileData?.username ? ProfileData?.username : "Unnamed"}
                </h4>
                {/* <p>Tell Me</p> */}
              </div>
            </div>
            <div className="full-div">
              <input type="text" className="form-control search-bar-color brd-no"
                data-autoresize
                onChange={(e) => {
                  handleDescription(e);
                }}
                autoComplete="off" placeholder="Whats On Your Mind?" />
            </div>
            <div className="full-div">
              <div className="d-create-file filecreator">
                {/* <button className="close-btn"><i className="fa fa-close"></i></button> */}

                <div>
                  <div className="full-div">
                    {/* <img src={bg} /> */}
                  </div>
                  <p
                    id="file_name" style={{ color: 'white', textAlign: "center" }}
                    className={FileError ? "text-danger" : ""}
                  >
                    {FileError && FileError}

                    {/* {files
                      &&
                      files?.name || files
                    } */}
                  </p>

                  <div className="browse">
                    {/* <img src={files} /> */}
                    {files ? <img src={images} /> : ""}
                    <input
                      type="button"
                      id="get_file"
                      name="fileupload"
                      className="btn-main whiter"
                      value="Add gif"
                    />
                    <input
                      id="upload_file"
                      type="file"
                      name="fileupload"
                      accept="image/gif"
                      onChange={(e) => {
                        handleMultipleGif(e)
                      }}


                    // onChange={(e) => {
                    //   fileschange(e);
                    // }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="full-div">
              <a href="javascript:void(0);" className="post-btn" onClick={handleAddPostVideo}>
                Post
              </a>

            </div>

          </Modal.Body>
        </Modal>







        <Modal size="md" className="create-post-modal" scrollable={true} centered show={timelineModalDec} onHide={() => closeModelDec()}>
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-md" style={{ color: "white" }}>
              Create post
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="flex">
              <div className="modal-profile-upload">
                {ProfileData?.profileImage ? (

                  <div htmlFor="imagee" className="pf-img">
                    <img
                      src={httpUrl + "/" + ProfileData?.profileImage}
                      alt="profile.png"
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ) : (
                  <div htmlFor="imagee" className="pf-img">
                    <FaUserCircle size="2x" />
                  </div>
                )}
              </div>
              <div className="modal-text-panel">
                <h4>
                  {ProfileData?.username ? ProfileData?.username : "Unnamed"}
                </h4>
                {/* <p>Tell Me</p> */}
              </div>
            </div>
            <div className="full-div">
              <input type="text" className="form-control search-bar-color brd-no"
                data-autoresize
                onChange={(e) => {
                  handleDescription(e);
                }}
                autoComplete="off" placeholder="Whats On Your Mind?" />
            </div>

            <div className="full-div">
              <a href="javascript:void(0);" className="post-btn" onClick={handleAddPostDec}>
                Post
              </a>

            </div>

          </Modal.Body>
        </Modal>







        {/* Followers modal */}
        <Modal size="md" className="create-post-modal" scrollable={true} centered show={timelineModal} onHide={() => closeModel()}>
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-md" style={{ color: "white" }}>
              Create post
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="flex">
              <div className="modal-profile-upload">
                {ProfileData?.profileImage ? (

                  <div htmlFor="imagee" className="pf-img">
                    <img
                      src={httpUrl + "/" + ProfileData?.profileImage}
                      alt="profile.png"
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ) : (
                  <div htmlFor="imagee" className="pf-img">
                    <FaUserCircle size="2x" />
                  </div>
                )}
              </div>
              <div className="modal-text-panel">
                <h4>
                  {ProfileData?.username ? ProfileData?.username : "Unnamed"}
                </h4>
                {/* <p>Tell Me</p> */}
              </div>
            </div>
            <div className="full-div">
              <input type="text" className="form-control search-bar-color brd-no"
                data-autoresize
                onChange={(e) => {
                  handleDescription(e);
                }}
                autoComplete="off" placeholder="Whats On Your Mind?" />
            </div>
            <div className="full-div">
              <div className="d-create-file filecreator">
                {/* <button className="close-btn"><i className="fa fa-close"></i></button> */}

                <div>
                  <div className="full-div">
                    {/* <img src={bg} /> */}
                  </div>
                  <p
                    id="file_name" style={{ color: 'white', textAlign: "center" }}
                    className={FileError ? "text-danger" : ""}
                  >
                    {FileError && FileError}

                    {/* {files
                      &&
                      files?.name || files
                    } */}
                  </p>

                  <div className="browse">
                    {files && images ?
                      images.map((image) => {
                        return (
                          <img src={image} width="80%" style={{ padding: "20px" }} />
                        )
                      })
                      : null}
                    <input
                      type="button"
                      id="get_file"
                      name="fileupload"
                      className="btn-main whiter"
                      value="Add Photo"
                    // onChange={(e)=>{
                    //   handleMultipleImages(e)
                    // }}
                    />
                    <input
                      id="upload_file"
                      type="file"
                      name="fileupload"
                      accept="image/*"
                      onChange={(e) => {
                        handleMultiplePhoto(e)
                      }}
                      // onChange={(e) => {
                      //   fileschange(e);
                      // }}
                      multiple
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="full-div">
              <a href="javascript:void(0);" className="post-btn" onClick={handleAddPost}>
                Post
              </a>

            </div>

          </Modal.Body>
        </Modal>
        {/* Following modal */}
        <Modal size="sm" scrollable={true} centered show={followingModal} onHide={() => setFollowingModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm" style={{ color: "black" }}>
              Following
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {myFollowing?.map((data, index) => (
              <>

                <img style={{ cursor: "pointer" }} onClick={() => {
                  history.push(`/profile/${data?.address}`);
                }} className="follower-img" src={data.profileImage ? httpUrl + "/" + data.profileImage : awatar} />
                <span className="follower-name">{data?.username ? data.username : "Unnamed"}</span>
                <span className="follower-name mt-2" style={{ float: "right" }}>following</span>
                <p></p>
              </>
            ))}

          </Modal.Body>
        </Modal>
        {openMenu && (




          <div id="zero1" className="onStep fadeIn">
            <div className="full-div space-20"></div>
            <div className="full-div upload-panl">
              <div className="flex-div brdr-b">
                <div className="profile-pic-small">
                  {ProfileData?.profileImage ? (

                    <div htmlFor="imagee" className="">
                      <img
                        src={httpUrl + "/" + ProfileData?.profileImage}
                        alt="profile.png"
                        style={{
                          width: 50,
                          height: 50,
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ) : (
                    <div htmlFor="imagee" className="">
                      <FaUserCircle size="2x" />
                    </div>
                  )}
                </div>
                <div className="input-div">
                  <input type="text" className="form-control search-bar-color" onClick={() => { setTimelineModalDec(true) }} autoComplete="off" placeholder="Whats On Your Mind?" />
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <ul className="photo-upload-list">
                  <li>
                    <a href="javascript:void(0);" onClick={() => setTimelineModalVideo(true)}><img src={videoicon} /> Video</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);" onClick={() => setTimelineModal(true)}><img src={photoicon} /> Photo</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);" onClick={() => setTimelineModalGif(true)}><img src={gifficon} /> GIF</a>
                  </li>
                  <li className="mobile">
                    <a href="javascript:void(0);" onClick={() => setTimelineModal(true)}><img src={photoicon} /> Photo/Video/Gif</a>
                  </li>

                  {/* <li>
                    <div className="d-create-file">
                      <p
                        id="file_name" style={{ color: 'black', textAlign: "center" }}
                        className={FileError ? "text-danger" : ""}
                      >
                        {FileError && FileError}
                    
                        {files
                          && 
                          files?.name || files
                        }
                      </p>

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
                          accept="image/*,video/*"
                          onChange={(e) => {
                            fileschange(e);
                          }}
                        />
                      </div>
                    </div>

                  </li> */}


                  {/* <li><a href="javascript:void(0);"><img src={gificon} /> GIF</a></li> */}
                </ul>

                {/* <textarea
                  data-autoresize
                  onChange={(e) => {
                    handleDescription(e);
                  }}

                  className="form-control"
                  placeholder="Description"
                ></textarea>
                {PostDescErr && (<span className="text-danger">Description Required</span>)}
                { } */}
                {/* <a href="javascript:void(0);" className="edit-post-btn" onClick={handleAddPost}><i className="fa fa-edit"></i> Post</a> */}
              </div>
            </div>

            <div className="full-div upload-panl">
              <div className="flex-div">
                <h5>Posts</h5>
                <a href="javascript:void(0);" className="edit-post-btn grey"><img src={filtericon} /> Filters</a>
              </div>
            </div>


            {userPostRes?.map((data, index) => (<>
              {/* Big Post */}
              <div className="full-div upload-panl">
                <div className="flex-div">
                  <div className="comment-pnl">
                    <div className="profile-pic-small">
                      {ProfileData?.profileImage ? (

                        <div htmlFor="imagee" className="">
                          <img
                            src={httpUrl + "/" + ProfileData?.profileImage}
                            alt="profile.png"
                            style={{
                              width: 50,
                              height: 50,
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      ) : (
                        <div htmlFor="imagee" className="">
                          <FaUserCircle size="2x" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4>{data?.name ? data?.name : "unnamed"}</h4>
                      <h6>{data?.postTime?.split("T")[0]}</h6>
                    </div>
                  </div>
                  <a href="javascript:void(0);" className="dot-menu"><i class="fa fa-list-ul"></i></a>
                </div>
                <div className="full-div space-20"></div>
                <div className="full-div">
                  <p>{data.textBody && data.textBody != "nil" ? data.textBody : null}</p>
                </div>
                {/* {data?.fileList.split(".")[1]=="mp4" ? (
                  <>
                    <video width="100%" controls>
                      <source src={httpUrl + "/" + data?.mediaLink} />
                      Your browser does not support HTML video.
                    </video>
                  </>)
                  : (<> */}
                {
                  data?.fileList ? <>
                    {
                      data?.fileList.map((image) => {
                        return (
                          <div className="full-div big-img">
                            {
                              (image?.url?.split(".")[1] == "mp4") ? <video width="100%" controls>
                                <source src={httpUrl + "/" + image?.url} />
                                Your browser does not support HTML video.
                              </video> :
                                <img src={httpUrl + "/" + image?.url} />
                            }


                          </div>
                        )
                      })
                    }
                  </> : ""
                }
                {/* </>)} */}
                {/* <div className="flex-div like-cmnt">
                  <a href="javascript:void(0);">
                    <i class="fa fa-thumbs-up"></i>
                    26
                  </a>
                  <a href="javascript:void(0);">1 comment</a>
                </div> */}
                <ul className="like-list">

                  {
                    data.isPostLiked ? (<li><a href="javascript:void(0);" onClick={() => {
                      handleUnlikePost(data.id)
                    }}><img src={agreeIcon} width="20px" />{" "} Like {data?.likePostCount}</a></li>) : (<li><a href="javascript:void(0);" onClick={() => {
                      handleLikePost(data.id)
                    }}><img src={disagreeIcon} width="20px" />{" "} Like {data?.likePostCount}</a></li>)
                  }

                  {/* <li><a href="javascript:void(0);"><i class="fa fa-thumbs-up"></i> Like {data?.likePostCount}</a></li> */}
                  <li><a href="javascript:void(0);" onClick={() => {
                    setCommentBox(!commentBox)

                    handleGetComment(data.id)
                    setPostCommentID(data.id);
                  }}    ><i class="fa fa-comment-o"></i> Comment {data?.totalComment}</a></li>
                </ul>
                {postCommentID == data.id && (<>

                  {commentBox && (<>

                    <div className="flex-div">
                      <div className="profile-pic-small">
                        {data?.profileImage ? (

                          <div htmlFor="imagee" className="">
                            <img
                              src={httpUrl + "/" + data?.profileImage}
                              alt="profile.png"
                              style={{
                                width: 50,
                                height: 50,
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        ) : (
                          <div htmlFor="imagee" className="">
                            <FaUserCircle size="2x" />
                          </div>
                        )}
                      </div>
                      <div className="full-div p-o">
                        <div className="search-input btn">
                          <input style={{ color: "#fff", border: "none" }} autoComplete="off" onKeyPress={(e) => { if (e.code == "Enter") { handleComment(data?.id) } }} value={commentbody} onChange={(e) => { setCommentBody(e.target.value) }} type="text" placeholder="comment" />
                          <button className="send-btn" onClick={() => { handleComment(data.id) }}>Send</button>

                        </div>
                      </div>
                    </div>

                    <div className="full-div">
                      <div className="comment-pnl mid">
                        <div className="flexy">

                          <div className="general-comment">

                            {commentRes.map((value, index) => (<>
                              <div className="full-div">
                                <div className="smnbg">
                                  <h4 className="comment-box">

                                    {value?.profileImage ? (

                                      <img
                                        src={httpUrl + "/" + value?.profileImage}
                                        alt="profile.png"
                                        style={{
                                          width: 30,
                                          height: 30,
                                          objectFit: "cover",
                                          borderRadius: "50%",
                                          marginRight: "10px"
                                        }}
                                      />
                                    ) : (

                                      <FaUserCircle size="2x" style={{
                                        width: 30,
                                        height: 30,
                                        objectFit: "cover",
                                        marginRight: "10px"
                                      }} />

                                    )}
                                    {" "}
                                    {value.name}
                                    <br />
                                    <br />
                                    <span style={{marginLeft:"45px"}}>{value?.comment}</span>
                                    </h4>
                                  { }
                                  <h6 style={{marginLeft:"45px"}}>{(value.commentTime).split(" ")[0]}</h6>
                                </div>
                              </div>
                              {console.log("postcomment dssssssssssid", postCommentID)}
                              {console.log("sub commentsssssssss", value)}
                              <ul className="comment-like-list">
                                <li><a href="javascript:void(0);">{value?.likeCommentCount}</a></li>
                                <li><a href="javascript:void(0);" onClick={() => { (!value.isLiked) && handleCommentsLike(value.id, value.postId) }}>{value.isLiked ? <i class="fa fa-thumbs-o-up" style={{ color: "green" }}></i> : <i class="fa fa-thumbs-o-up"></i>}</a></li>
                                <li><a href="javascript:void(0);">{value?.unLikeCommentCount}</a></li>
                                <li><a href="javascript:void(0);" onClick={() => { (!value.isUnLiked) && handleCommentsUnLike(value.id, value.postId) }}>{value.isUnLiked ? <i class="fa fa-thumbs-o-down" style={{ color: "red" }}></i> : <i class="fa fa-thumbs-o-down"></i>}</a></li>
                                <li><a href="javascript:void(0);" onClick={() => {
                                  setSubCommentBox(!subCommentBox);
                                  setSubPostCommentID(value.id);
                                  subComment(value.id, value.postId)
                                }}>{value?.replyCount}{" "}Reply</a></li>
                                {/* <li><a href="javascript:void(0);">Share</a></li> */}
                                {console.log(subCommentBox)}
                              </ul>
                              {console.log("post sub commentid", postSubCommentID + " value.id", value.id)}
                              {postSubCommentID == value.id && subCommentBox &&(
                                <>
                                  {subComm?.map((subValue, index3) => (<>
                                    {console.log("sub comments like unlikes", subValue)}
                                    <div className="sub-comment-box">
                                      <div className="bgnh">
                                        <h4>

                                          {subValue?.profileImage ? (
                                            <img
                                              src={httpUrl + "/" + subValue?.profileImage}
                                              alt="profile.png"
                                              style={{
                                                width: 30,
                                                height: 30,
                                                objectFit: "cover",
                                                borderRadius: "50%",
                                                marginRight: "10px"
                                              }}
                                            />

                                          ) : (

                                            <FaUserCircle size="2x" style={{
                                              width: 30,
                                              height: 30,
                                              objectFit: "cover",
                                              marginRight: "10px"
                                            }} />
                                          )}
                                          {" "}
                                          {subValue?.name}
                                          <br />
                                          <br />
                                          <span style={{marginLeft:"45px"}}>{subValue?.comment}</span></h4>
                                        <h6 style={{marginLeft:"45px"}}>{(subValue.commentTime).split(" ")[0]}</h6>
                                      </div>
                                      <ul className="comment-like-list">
                                        <li><a href="javascript:void(0);">{subValue?.likeCommentCount}</a></li>
                                        <li><a href="javascript:void(0);" onClick={() => { (!subValue.isLiked) && handleSubCommentsLike(subValue.id, subValue.parentId, subValue.postId) }}>{subValue.isLiked ? <i class="fa fa-thumbs-o-up" style={{ color: "green" }}></i> : <i class="fa fa-thumbs-o-up"></i>}</a></li>
                                        <li><a href="javascript:void(0);">{subValue?.unLikeCommentCount}</a></li> {" "}
                                        <li><a href="javascript:void(0);" onClick={() => { (!subValue.isUnLiked) && handleSubCommentsUnLike(subValue.id, subValue.parentId, subValue.postId) }}>{subValue.isUnLiked ? <i class="fa fa-thumbs-o-down" style={{ color: "red" }}></i> : <i class="fa fa-thumbs-o-down"></i>}</a></li>
                                      </ul>
                                    </div>
                                  </>))}
                                  <div className="full-div p-o">
                                    <div className="search-input btn">
                                      <input style={{ color: "#fff" }} onKeyPress={(e) => { if (e.code == "Enter") { handleSubComment(value.postId, value.id) } }} autoComplete="off" value={subCommentbody} onChange={(e) => { setSubCommentBody(e.target.value) }} type="text" placeholder="comment" />
                                      <button className="send-btn" onClick={() => { handleSubComment(value.postId, value.id) }}>Send</button>

                                    </div>
                                  </div>

                                </>
                              )}
                            </>))}
                          </div>
                        </div>

                      </div>

                    </div>
                  </>)}
                </>)}



























                {/* <div className="flex-div">
                  <div className="profile-pic-small">
                    {ProfileData?.profileImage ? (
                      <div htmlFor="imagee" className="">
                        <img
                          src={httpUrl + "/" + ProfileData?.profileImage}
                          alt="profile.png"
                          style={{
                            width: 50,
                            height: 50,
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ) : (
                      <div htmlFor="imagee" className="">
                        <FaUserCircle size="2x" />
                      </div>
                    )}
                  </div>
                  <div className="input-div">
                    <input className="form-control" autoComplete="off" placeholder="Write sa Comment" />
                  </div>
                </div> */}

                {/* <div className="flex-div">
                  <div className="comment-pnl mid">
                    <div className="profile-pic-small">
                      {ProfileData?.profileImage ? (

                        <div htmlFor="imagee" className="">
                          <img
                            src={httpUrl + "/" + ProfileData?.profileImage}
                            alt="profile.png"
                            style={{
                              width: 50,
                              height: 50,
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      ) : (
                        <div htmlFor="imagee" className="">
                          <FaUserCircle size="2x" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4>Looks Great.</h4>
                      <h6>November 16, 2021</h6>
                    </div>
                  </div>
                </div> */}
              </div>

            </>))}



            {/* Big Post */}
            {/* Big Post */}
            {/* <div className="full-div upload-panl">
              <div className="flex-div">
                <div className="comment-pnl">
                  <div className="profile-pic-small">
                    {ProfileData?.profileImage ? (

                      <div htmlFor="imagee" className="">
                        <img
                          src={httpUrl + "/" + ProfileData?.profileImage}
                          alt="profile.png"
                          style={{
                            width: 50,
                            height: 50,
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ) : (
                      <div htmlFor="imagee" className="">
                        <FaUserCircle size="2x" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4>Tariq Lamptey</h4>
                    <h6>November 16, 2021</h6>
                  </div>
                </div>
                <a href="javascript:void(0);" className="dot-menu"><i class="fa fa-list-ul"></i></a>
              </div>
              <div className="full-div space-20"></div>
              <div className="full-div">
                <p>Nunc scelerisque tincidunt elit. Vestibulum non mi ipsum. Cras pretium suscipit tellus sit amet aliquet. Vestibulum maximus lacinia massa non porttitor.</p>
              </div>
              <div className="full-div big-img">
                <img src={bigimg} />
              </div>
              <div className="flex-div like-cmnt">
                <a href="javascript:void(0);">
                  <i class="fa fa-thumbs-up"></i>
                  26
                </a>
                <a href="javascript:void(0);">1 comment</a>
              </div>
              <ul className="like-list">
                <li><a href="javascript:void(0);"><i class="fa fa-thumbs-up"></i> Like</a></li>
                <li><a href="javascript:void(0);"><i class="fa fa-comment-o"></i> Comment</a></li>
              </ul>
              <div className="flex-div">
                <div className="profile-pic-small">
                  {ProfileData?.profileImage ? (

                    <div htmlFor="imagee" className="">
                      <img
                        src={httpUrl + "/" + ProfileData?.profileImage}
                        alt="profile.png"
                        style={{
                          width: 50,
                          height: 50,
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ) : (
                    <div htmlFor="imagee" className="">
                      <FaUserCircle size="2x" />
                    </div>
                  )}
                </div>
                <div className="input-div">
                  <input className="form-control" autoComplete="off" placeholder="Write sa Comment" />
                </div>
              </div>


              <div className="flex-div">
                <div className="comment-pnl mid">
                  <div className="profile-pic-small">
                    {ProfileData?.profileImage ? (

                      <div htmlFor="imagee" className="">
                        <img
                          src={httpUrl + "/" + ProfileData?.profileImage}
                          alt="profile.png"
                          style={{
                            width: 50,
                            height: 50,
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ) : (
                      <div htmlFor="imagee" className="">
                        <FaUserCircle size="2x" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4>Looks Great.</h4>
                    <h6>November 16, 2021</h6>
                  </div>
                </div>
              </div>

            </div> */}
            {/* Big Post */}
          </div>
        )}
        {openMenu1 && (
          <div id="zero2" className="onStep fadeIn">
            <MyCollections />
          </div>
        )}
        {openMenu2 && (
          <div id="zero3" className="onStep fadeIn">
            <MyNft />
          </div>
        )}
        {openMenu3 && (
          <div id="zero3" className="onStep fadeIn">
            <AllFavourite />
          </div>
        )}
      </section>
      <div className="spacer-single"></div>
      <Footer />
    </div >
  );
};
export default MyProfile;
