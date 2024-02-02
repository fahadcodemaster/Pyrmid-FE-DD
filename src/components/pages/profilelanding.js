
import React, { useEffect, useState, useReducer } from "react";
import { useHistory } from "react-router-dom";
import MyNft from "./MyNfts/MyNfts";
import Footer from "../components/footer";
import nfticon from '../../assets/images/nft-icon.png';
import photoicon from '../../assets/images/photo-icon.png';
import gificon from '../../assets/images/gif-icon.png';
import filtericon from '../../assets/images/filter-icon.png';
import bigimg from '../../assets/images/big-img.png';
import bigimg1 from '../../assets/images/big-img1.png';
import bigimg2 from '../../assets/images/big-img2.png';
import { createGlobalStyle } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import agreeIcon from '../../assets/images/agree.png';
import disagreeIcon from '../../assets/images/disagree.png';
import { FaUserCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import http from "../../Redux/Api/http";
import { useSelector } from "react-redux";

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


const Profilelanding = function () {
    const [route, setRoute] = useState("");
    const [loadmore, setloadmore] = useState(1);
    const [showMore, setShowMore] = useState(false);
    const [ProfileData, setprofiledata] = useState(false);
    const history = useHistory();
    const [state, disableDispatch] = useReducer(reducer, initialState)
    const location = useLocation()
    const MyProfile = useSelector(
        (state) => state.MyProfile?.MyProfileResponse?.data
    );
    const isConnected = useSelector(
        (state) => state.Login?.authResponse?.data?.token
    );


    useEffect(() => {
        setprofiledata(MyProfile)
        handleAllPost();

    }, []);

    const [commentBox, setCommentBox] = useState(false);
    const [allPostRes, setAllPostRes] = useState([]);
    const [newPostRes, setNewPostRes] = useState([]);
    const [trendPostRes, setTrendPostRes] = useState([]);
    const [todayPostRes, setTodayPostRes] = useState([]);
    const [weekPostRes, setweekPostRes] = useState([]);
    const [monthPostRes, setMonthPostRes] = useState([]);
    const [YearPostRes, setYearPostRes] = useState([]);
    const [commentRes, setCommentRes] = useState([]);
    const handleAllPost = async () => {
        if (isConnected) {
            await http
                .get(
                    httpUrl + `/api/v1/Post/GetAllPost?CurrentPage=${loadmore}&FilterType=6&AccountId=${MyProfile?.id}`
                ).then((res) => {
                    console.log("user Response results", res.data.data)
                    setAllPostRes(res.data.data)
                }).catch((error) => {
                    console.log("errrrrrrrrrror", error)
                })

        }
        else {
            await http
                .get(
                    httpUrl + `/api/v1/Post/GetAllPost?CurrentPage=${loadmore}&FilterType=6`
                ).then((res) => {

                    setAllPostRes(res.data.data)
                }).catch((error) => {
                    console.log("errrrrrrrrrror", error)
                })
        }
    }
    const [todayPTriger, setTodayPTriger] = useState(false);
    const [NewPTriger, setNewPTriger] = useState(false);
    const [trendPTriger, setTrendPTriger] = useState(false);
    const [weekPTriger, setweekPTriger] = useState(false);
    const [monthPTriger, setmonthPTriger] = useState(false);
    const [yearPTriger, setYearPTriger] = useState(false);
    const [resetTriger, setResetTriger] = useState(false);
    const handleTodayPost = async () => {
        if (isConnected) {
           
            await http
                .get(
                    httpUrl + `/api/v1/Post/GetAllPost?CurrentPage=${loadmore}&FilterType=2&AccountId=${MyProfile.id}`
                ).then((res) => {
                    setTodayPostRes(res.data.data)
                    setTodayPTriger(true)
                    setTrendPTriger(false)
                    setNewPTriger(false)
                    setmonthPTriger(false)
                    setYearPTriger(false)
                    setweekPTriger(false)
                    setResetTriger(true)

                }).catch((error) => {
                    console.log("errrrrrrrrrror", error)
                })

        }
        else {

            await http
                .get(
                    httpUrl + "/api/v1/Post/GetAllPost?CurrentPage=${loadmore}&FilterType=2"
                ).then((res) => {
                    console.log("today Response results", res.data.data)
                    setTodayPostRes(res.data.data)
                    setTodayPTriger(true)
                    setTrendPTriger(false)
                    setNewPTriger(false)
                    setmonthPTriger(false)
                    setYearPTriger(false)
                    setweekPTriger(false)
                    setResetTriger(true)
                }).catch((error) => {
                    console.log("errrrrrrrrrror", error)
                })
        }
    }
    const handleWeekPost = async () => {
        if (isConnected) {
            await http
                .get(
                    httpUrl + `/api/v1/Post/GetAllPost?CurrentPage=${loadmore}&FilterType=3&AccountId=${MyProfile.id}`
                ).then((res) => {

                    setweekPostRes(res.data.data)
                    setweekPTriger(true)
                    setTodayPTriger(false)
                    setTrendPTriger(false)
                    setNewPTriger(false)
                    setResetTriger(true)

                }).catch((error) => {
                    console.log("errrrrrrrrrror", error)
                })
        }
        else {
            await http
                .get(
                    httpUrl + "/api/v1/Post/GetAllPost?CurrentPage=${loadmore}&FilterType=3"
                ).then((res) => {
                    console.log("week Response results", res.data.data)
                        (res.data.data)
                    setweekPostRes(res.data.data)
                    setweekPTriger(true)
                    setTodayPTriger(false)
                    setTrendPTriger(false)
                    setNewPTriger(false)
                    setResetTriger(true)
                }).catch((error) => {
                    console.log("errrrrrrrrrror", error)
                })
        }
    }
    const handleMonthkPost = async () => {
        if (isConnected) {
            await http
                .get(
                    httpUrl + `/api/v1/Post/GetAllPost?CurrentPage=${loadmore}&FilterType=4&AccountId=${MyProfile.id}`
                ).then((res) => {
                    console.log("monthly results", res.data.data)
                    setMonthPostRes(res.data.data)
                    setmonthPTriger(true)
                    setweekPTriger(false)
                    setYearPTriger(false)
                    setTodayPTriger(false)
                    setTrendPTriger(false)
                    setNewPTriger(false)
                    setResetTriger(true)

                }).catch((error) => {
                    console.log("errrrrrrrrrror", error)
                })
        }
        else {
            await http
                .get(
                    httpUrl + "/api/v1/Post/GetAllPost?CurrentPage=${loadmore}&FilterType=4"
                ).then((res) => {
                    console.log("Monthly Response results", res.data.data)
                        (res.data.data)
                    setMonthPostRes(res.data.data)
                    setmonthPTriger(true)
                    setweekPTriger(false)
                    setYearPTriger(false)
                    setTodayPTriger(false)
                    setTrendPTriger(false)
                    setNewPTriger(false)
                    setResetTriger(true)
                }).catch((error) => {
                    console.log("errrrrrrrrrror", error)
                })
        }
    }

    const handleYearPost = async () => {
        if (isConnected) {
            await http
                .get(
                    httpUrl + `/api/v1/Post/GetAllPost?CurrentPage=${loadmore}&FilterType=5&AccountId=${MyProfile.id}`
                ).then((res) => {
                    console.log("Yearly Response results", res.data.data)
                    setYearPostRes(res.data.data)
                    setmonthPTriger(false)
                    setweekPTriger(false)
                    setYearPTriger(true)
                    setTodayPTriger(false)
                    setTrendPTriger(false)
                    setNewPTriger(false)
                    setResetTriger(true)

                }).catch((error) => {
                    console.log("errrrrrrrrrror", error)
                })
        }
        else {
            await http
                .get(
                    httpUrl + "/api/v1/Post/GetAllPost?CurrentPage=${loadmore}&FilterType=5"
                ).then((res) => {
                    console.log("Yearly Response results", res.data.data)
                        (res.data.data)
                    setYearPostRes(res.data.data)
                    setmonthPTriger(false)
                    setweekPTriger(false)
                    setYearPTriger(true)
                    setTodayPTriger(false)
                    setTrendPTriger(false)
                    setNewPTriger(false)
                    setResetTriger(true)
                }).catch((error) => {
                    console.log("errrrrrrrrrror", error)
                })
        }
    }
    useEffect(() => {
        if (todayPTriger) {
            handleTodayPost()
        }
        else if (NewPTriger) {
            handleNewPost()
        }
        else if (trendPTriger) {
            handleTrendingPost()
        }
        else if (weekPTriger) {
            handleWeekPost()
        }
        else if (monthPTriger) {
            handleMonthkPost()
        }
        else if (yearPTriger) {
            handleYearPost()
        }
        else {
            handleAllPost()
        }
    }, [loadmore])
    const loadPost = () => {
        setloadmore(loadmore + 1)

    }
    const handleNewPost = async () => {
        if (isConnected) {
            await http
                .get(
                    httpUrl + `/api/v1/Post/GetAllPost?CurrentPage=${loadmore}&FilterType=1&AccountId=${MyProfile.id}`
                ).then((res) => {
                    console.log("new Response results", res.data.data)
                    setNewPostRes(res.data.data)
                    setNewPTriger(true);
                    setTodayPTriger(false);
                    setTrendPTriger(false)
                    setweekPTriger(false)
                    setmonthPTriger(false)
                    setYearPTriger(false)
                    setResetTriger(true);
                }).catch((error) => {
                    console.log("errrrrrrrrrror", error)
                })
        }
        else {

            await http
                .get(
                    httpUrl + "/api/v1/Post/GetAllPost?CurrentPage=${loadmore}&FilterType=1"
                ).then((res) => {
                    console.log("new Response results", res.data.data)
                    setNewPostRes(res.data.data)
                    setNewPTriger(true);
                    setTodayPTriger(false);
                    setTrendPTriger(false)
                    setweekPTriger(false)
                    setmonthPTriger(false)
                    setYearPTriger(false)
                    setResetTriger(true);
                }).catch((error) => {
                    console.log("errrrrrrrrrror", error)
                })
        }
    }
    const handleTrendingPost = async () => {
        await http
            .get(
                httpUrl + "/api/v1/Post/GetAllTrendingPost"
            ).then((res) => {
                console.log("Trend Response results", res.data.data)
                setTrendPostRes(res.data.data)
                setTrendPTriger(true);
                setTodayPTriger(false)
                setNewPTriger(false)
                setResetTriger(true)
            }).catch((error) => {
                console.log("errrrrrrrrrror", error)
            })
    }
    const handleReset = () => {
        setNewPTriger(false)
        setTodayPTriger(false)
        setTrendPTriger(false)
        setweekPTriger(false)
        setmonthPTriger(false)
        setYearPTriger(false)
        setResetTriger(false)
    }


    const handleFollow = async (id) => {

        if (isConnected) {
            let data = new FormData()
            data.append("AccountFollowerToId", parseInt(id))
            console.log("my id", MyProfile.id, "uuuu", id)
            if (MyProfile.id == id) {
                toast.warn(`You can't follow the account itself!`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

            else {
                await http
                    .post(
                        httpUrl + `/api/v1/Post/AddFollower`, data
                    )
                    .then((res) => {
                        console.log("follow success", res.data)
                        if (todayPTriger) {
                            handleTodayPost()
                        }
                        else if (NewPTriger) {
                            handleNewPost()
                        }
                        else if (trendPTriger) {
                            handleTrendingPost()
                        }
                        else if (weekPTriger) {
                            handleWeekPost()
                        }
                        else if (monthPTriger) {
                            handleMonthkPost()
                        }
                        else if (yearPTriger) {
                            handleYearPost()
                        }
                        else {
                            handleAllPost()
                        }
                        toast.success(`Account followed successfully!`, {
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
                    if (todayPTriger) {
                        handleTodayPost()
                    }
                    else if (NewPTriger) {
                        handleNewPost()
                    }
                    else if (trendPTriger) {
                        handleTrendingPost()
                    }
                    else if (weekPTriger) {
                        handleWeekPost()
                    }
                    else if (monthPTriger) {
                        handleMonthkPost()
                    }
                    else if (yearPTriger) {
                        handleYearPost()
                    }
                    else {
                        handleAllPost()
                    }
                    toast.warn(`Account unfollowed successfully!`, {
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
    const [commentbody, setCommentBody] = useState();
    const [subCommentbody, setSubCommentBody] = useState();
    const handleComment = async (id) => {
        setCommentBody('')
        if (isConnected) {
            const payload = {
                postId: id,
                commentBody: commentbody,
                isHTML: true,
            }
            if (commentbody.split(" ")[0]) {
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
            if (subCommentbody?.split(" ")[0]) {
                await http
                    .post(
                        httpUrl + "/api/v1/Post/PostComment", payload
                    ).then((res) => {
                        console.log("post added", res.data)
                        subComment(commentid, postid);
                        setSubCommentBody("")
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
    const handleLikePost = async (id) => {
        if (isConnected) {
            await http
                .post(
                    httpUrl + `/api/v1/Post/PostLikeUnlike?postId=${id}&IsLike=true`,
                )
                .then((res) => {
                    // setmonthPTriger(true)
                    // setweekPTriger(false)
                    // setYearPTriger(false)
                    // setTodayPTriger(false)
                    // setTrendPTriger(false)
                    // setNewPTriger(false)
                    // setResetTriger(true)
                    console.log("like success", res.data)
                    if (monthPTriger == true) {

                        handleMonthkPost()
                    }
                    else if (weekPTriger == true) {

                        handleWeekPost()
                    }
                    else if (yearPTriger == true) {

                        handleYearPost()
                    }
                    else if (todayPTriger == true) {
                        handleTodayPost()
                    }
                    else if (trendPTriger == true) {
                        handleTrendingPost()
                    }
                    else {
                        handleAllPost();
                    }
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
                    if (monthPTriger == true) {

                        handleMonthkPost()
                    }
                    else if (weekPTriger == true) {

                        handleWeekPost()
                    }
                    else if (yearPTriger == true) {

                        handleYearPost()
                    }
                    else if (todayPTriger == true) {
                        handleTodayPost()
                    }
                    else if (trendPTriger == true) {
                        handleTrendingPost()
                    }
                    else {
                        handleAllPost();
                    }
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
    const handleSharePost = async (id, createrId) => {
        if (isConnected) {
            if (MyProfile.id == createrId) {
                toast.warn(`You can't shared post itself!`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else {
                await http
                    .post(
                        httpUrl + `/api/v1/Post/PostShare?postId=${id}`,
                    )
                    .then((res) => {
                        console.log("share success", res.data)
                        handleAllPost()
                        toast.success(`Post Shared successfully!`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        setTimeout(() => {
                            history.push("/myprofile")
                        }, 3000);
                    }).catch((error) => (
                        console.log("errrrrrrror", error)
                    ))

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

    const handleGetComment = async (id) => {
        {
            MyProfile?.id ? (
                await http
                    .get(
                        httpUrl + `/api/v1/Post/GetCommentByPostId?postId=${id}&AccountId=${MyProfile?.id}`
                    ).then((res) => {
                        console.log("get Comment", res.data.data.commentResponse)
                        setCommentRes(res.data.data.commentResponse)

                    }).catch((error) => {
                        console.log("errrrrror", error)
                    })
            ) :
                await http
                    .get(
                        httpUrl + `/api/v1/Post/GetCommentByPostId?postId=${id}`
                    ).then((res) => {
                        console.log("get Comment", res.data.data.commentResponse)
                        setCommentRes(res.data.data.commentResponse)

                    }).catch((error) => {
                        console.log("errrrrror", error)
                    })


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
    const [subCommentBox, setSubCommentBox] = useState(false);
    const [subComm, setSubComm] = useState();
    const subComment = async (commentid, postid) => {
        console.log("id is here for comment", commentid)
        {
            MyProfile?.id ? (await http
                .get(
                    //   httpUrl + `/api/v1/Post/GetCommentByPostId?postId=${id}`
                    httpUrl + `/api/v1/Post/GetSubCommentByPostId?postId=${postid}&CommentId=${commentid}&AccountId=${MyProfile?.id}`
                ).then((res) => {
                    console.log("get sub comment", res.data.data)
                    setSubComm(res?.data?.data)

                }).catch((error) => {
                    console.log("errrrrror", error)
                })) : (await http
                    .get(
                        //   httpUrl + `/api/v1/Post/GetCommentByPostId?postId=${id}`
                        httpUrl + `/api/v1/Post/GetSubCommentByPostId?postId=${postid}&CommentId=${commentid}`
                    ).then((res) => {
                        console.log("get sub comment", res.data.data)
                        setSubComm(res?.data?.data)

                    }).catch((error) => {
                        console.log("errrrrror", error)
                    }))

        }
    }
    const [postCommentID, setPostCommentID] = useState();
    const [postSubCommentID, setSubPostCommentID] = useState();

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

            <section className="jumbotron breadcumb  bg-dots-pnl">
                <div className="mainbreadcumb">
                    <div className="search-panel-main">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-12">
                                    <div className="search-input">
                                        <input autoComplete="off" className="search-bar-color" placeholder="search..." />
                                        <button><i className="fa fa-search"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h2>Popular Posts </h2>
                                <div className="new-post-uploader">
                                    <a href="javascript:void(0);" onClick={handleNewPost}>
                                        <i className="fa fa-plus"></i> New Post
                                    </a>
                                    <a href="javascript:void(0);" onClick={handleTrendingPost}>
                                        <i class="fa fa-fire"></i> Trending Post
                                    </a>
                                    <div class="dropdown">
                                        <button class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Select Post <i className="fa fa-angle-down"></i>
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a class="dropdown-item" href="javascript:void(0);" onClick={() =>{ handleTodayPost()}} >Today</a>
                                            <a class="dropdown-item" href="javascript:void(0);" onClick={() => {handleWeekPost()}} >This Week</a>
                                            <a class="dropdown-item" href="javascript:void(0);" onClick={() => {handleMonthkPost()}} >This Month</a>
                                            <a class="dropdown-item" href="javascript:void(0);" onClick={() => {handleMonthkPost()}} >This Year</a>
                                        </div>
                                    </div>
                                    {/* <a href="javascript:void(0);" onClick={handleTodayPost}>
                                        Today <i className="fa fa-angle-down"></i>
                                    </a> */}
                                    {resetTriger && (
                                        <a href="javascript:void(0);" onClick={handleReset}>
                                            <i class="fa fa-refresh" aria-hidden="true"></i>
                                        </a>

                                    )}

                                </div>
                            </div>
                            <div className="col-lg-12">



                                {todayPTriger ? (

                                    <>
                                        {todayPostRes?.length == 0 ? (<>

                                            <span style={{ color: "#ffff" }}>Posts not found</span>

                                        </>) :



                                            (<>
                                                {todayPostRes.map((data, index) => (<>
                                                    {/* Big Post */}
                                                    <div className="full-div upload-panl timeline">
                                                        {/* <ul
                                                        className="likee-list "

                                                    >

                                                        <li><a href="javascript:void(0);" onClick={() => {
                                                            (!data.isPostLiked) && handleLikePost(data.id)
                                                        }}><i className={data?.isPostLiked ? "fa fa-thumbs-up like-color" : "fa fa-thumbs-up"}></i></a></li>
                                                        <li><a href="javascript:void(0);">{data?.likePostCount}</a></li>
                                                        <li><a href="javascript:void(0);" onClick={() => {
                                                            (!data?.isPostUnLiked) && handleUnlikePost(data.id)
                                                        }}><i class="fa fa-thumbs-down"></i></a></li>
                                                    </ul> */}
                                                        <div className="flex-div flf">
                                                            <div className="comment-pnl">
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
                                                                <div>
                                                                    <h4>{data?.name ? data?.name : "Unnamed"}</h4>
                                                                    <h6>{data?.postTime?.split("T")[0] + " " + data?.postTime?.split("T")[1]?.split(".")[0]}</h6>

                                                                </div>
                                                            </div>
                                                            {data.isFollow ? (
                                                                <a href="javascript:void(0);" onClick={() => {
                                                                    handleUnFollow(data.createrId)
                                                                }} className="white-btn">Unfollow</a>
                                                            ) : (
                                                                <a href="javascript:void(0);" onClick={() => {
                                                                    handleFollow(data.createrId)
                                                                }} className="white-btn">Follow</a>
                                                            )}

                                                        </div>
                                                        <div className="full-div space-20"></div>
                                                        <div className="full-div">
                                                            <p>{data?.textBody}</p>
                                                        </div>
                                                        {data.isVideo ? (
                                                            <>
                                                                <video width="100%" controls>
                                                                    <source src={httpUrl + "/" + data?.mediaLink} />

                                                                    Your browser does not support HTML video.
                                                                </video>

                                                            </>)
                                                            : (<>
                                                                {
                                                                    data?.mediaLink ? <>
                                                                        <div className="full-div big-img">
                                                                            <img src={httpUrl + "/" + data?.mediaLink} />
                                                                        </div>
                                                                    </> : ""
                                                                }
                                                            </>)}
                                                        <div className="full-div cment-share">

                                                            {
                                                                data.isPostLiked ? (<li><a href="javascript:void(0);" onClick={() => {
                                                                    handleUnlikePost(data.id)
                                                                }}><img src={agreeIcon} width="20px" />{" "} Like {data?.likePostCount}</a></li>) : (<li><a href="javascript:void(0);" onClick={() => {
                                                                    handleLikePost(data.id)
                                                                }}><img src={disagreeIcon} width="20px" />{" "} Like {data?.likePostCount}</a></li>)
                                                            }

                                                            {/* {
                                                            data.isPostLiked?( <li><a href="javascript:void(0);" onClick={() => {
                                                                handleLikePost(data.id)
                                                           }}><i className={data?.isPostLiked ? "fa fa-thumbs-up" : "fa fa-thumbs-up"}></i> Likee {data?.likePostCount}</a></li>):( <li><a href="javascript:void(0);" onClick={() => {
                                                                handleLikePost(data.id)
                                                           }}><i className={data?.isPostLiked ? "fa fa-thumbs-up like-color" : "fa fa-thumbs-up"}></i>{" "} Like {data?.likePostCount}</a></li>)
                                                        } */}


                                                            <li>
                                                                <a href="javascript:void(0);" onClick={() => {
                                                                    setCommentBox(!commentBox)
                                                                    handleGetComment(data.id)
                                                                    setPostCommentID(data.id);
                                                                }}><i class="fa fa-comment-o"></i> comments {data?.totalComment} </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void(0);" onClick={() => {
                                                                    handleSharePost(data.id, data.createrId)
                                                                }}>
                                                                    <i class="fa fa-share" ></i> Share {data.sharedCount}
                                                                </a>
                                                            </li>
                                                        </div>


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
                                                                                                <span style={{ marginLeft: "45px" }}>{value?.comment}</span></h4>
                                                                                            { }
                                                                                            <h6 style={{ marginLeft: "45px" }}>{(value.commentTime).split(" ")[0]}</h6>
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
                                                                                    {postSubCommentID == value.id && subCommentBox && (<>

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
                                                                                                                    borderRadius: "50%"
                                                                                                                }}
                                                                                                            />

                                                                                                        ) : (
                                                                                                            <FaUserCircle size="2x" style={{
                                                                                                                width: 30,
                                                                                                                height: 30,
                                                                                                                objectFit: "cover",
                                                                                                            }} />
                                                                                                        )}
                                                                                                        {" "}
                                                                                                        {subValue?.name}
                                                                                                        <br />
                                                                                                        <br />
                                                                                                        <span style={{ marginLeft: "45px" }}>{subValue?.comment}</span>
                                                                                                        <h6 style={{ marginLeft: "45px" }}>{(subValue.commentTime).split(" ")[0]}</h6>
                                                                                                    </h4>
                                                                                                </div>
                                                                                                <ul className="comment-like-list">
                                                                                                    <li><a href="javascript:void(0);">{subValue?.likeCommentCount}</a></li>
                                                                                                    <li><a href="javascript:void(0);" onClick={() => { (!subValue.isLiked) && handleSubCommentsLike(subValue.id, subValue.parentId, subValue.postId) }}>{subValue.isLiked ? <i class="fa fa-thumbs-o-up" style={{ color: "green" }}></i> : <i class="fa fa-thumbs-o-up"></i>}</a></li>
                                                                                                    <li><a href="javascript:void(0);">{subValue?.unLikeCommentCount}</a></li>
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

                                                                                    </>)}

                                                                                </>))}
                                                                            </div>
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            </>)}
                                                        </>)}
                                                    </div>
                                                </>))}
                                            </>)}
                                    </>
                                ) : NewPTriger ? (<>

                                    {newPostRes.map((data, index) => (<>
                                        {/* Big Post */}
                                        <div className="full-div upload-panl timeline">
                                            {/* <ul
                                                        className="likee-list "

                                                    >

                                                        <li><a href="javascript:void(0);" onClick={() => {
                                                            (!data.isPostLiked) && handleLikePost(data.id)
                                                        }}><i className={data?.isPostLiked ? "fa fa-thumbs-up like-color" : "fa fa-thumbs-up"}></i></a></li>
                                                        <li><a href="javascript:void(0);">{data?.likePostCount}</a></li>
                                                        <li><a href="javascript:void(0);" onClick={() => {
                                                            (!data?.isPostUnLiked) && handleUnlikePost(data.id)
                                                        }}><i class="fa fa-thumbs-down"></i></a></li>
                                                    </ul> */}
                                            <div className="flex-div flf">
                                                <div className="comment-pnl">
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
                                                    <div>
                                                        <h4>{data?.name ? data?.name : "Unnamed"}</h4>
                                                        <h6>{data?.postTime?.split("T")[0] + " " + data?.postTime?.split("T")[1]?.split(".")[0]}</h6>

                                                    </div>
                                                </div>
                                                {data.isFollow ? (
                                                    <a href="javascript:void(0);" onClick={() => {
                                                        handleUnFollow(data.createrId)
                                                    }} className="white-btn">Unfollow</a>
                                                ) : (
                                                    <a href="javascript:void(0);" onClick={() => {
                                                        handleFollow(data.createrId)
                                                    }} className="white-btn">Follow</a>
                                                )}

                                            </div>
                                            <div className="full-div space-20"></div>
                                            <div className="full-div">
                                                <p>{data?.textBody}</p>
                                            </div>
                                            {data.isVideo ? (
                                                <>
                                                    <video width="100%" controls>
                                                        <source src={httpUrl + "/" + data?.mediaLink} />

                                                        Your browser does not support HTML video.
                                                    </video>

                                                </>)
                                                : (<>
                                                    {
                                                        data?.mediaLink ? <>
                                                            <div className="full-div big-img">
                                                                <img src={httpUrl + "/" + data?.mediaLink} />
                                                            </div>
                                                        </> : ""
                                                    }
                                                </>)}
                                            <div className="full-div cment-share">

                                                {
                                                    data.isPostLiked ? (<li><a href="javascript:void(0);" onClick={() => {
                                                        handleUnlikePost(data.id)
                                                    }}><img src={agreeIcon} width="20px" />{" "} Like {data?.likePostCount}</a></li>) : (<li><a href="javascript:void(0);" onClick={() => {
                                                        handleLikePost(data.id)
                                                    }}><img src={disagreeIcon} width="20px" />{" "} Like {data?.likePostCount}</a></li>)
                                                }

                                                {/* {
                                                            data.isPostLiked?( <li><a href="javascript:void(0);" onClick={() => {
                                                                handleLikePost(data.id)
                                                           }}><i className={data?.isPostLiked ? "fa fa-thumbs-up" : "fa fa-thumbs-up"}></i> Likee {data?.likePostCount}</a></li>):( <li><a href="javascript:void(0);" onClick={() => {
                                                                handleLikePost(data.id)
                                                           }}><i className={data?.isPostLiked ? "fa fa-thumbs-up like-color" : "fa fa-thumbs-up"}></i>{" "} Like {data?.likePostCount}</a></li>)
                                                        } */}


                                                <li>
                                                    <a href="javascript:void(0);" onClick={() => {
                                                        setCommentBox(!commentBox)

                                                        handleGetComment(data.id)
                                                        setPostCommentID(data.id);
                                                    }}><i class="fa fa-comment-o"></i> comments {data?.totalComment} </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);" onClick={() => {
                                                        handleSharePost(data.id, data.createrId)
                                                    }}>
                                                        <i class="fa fa-share" ></i> Share {data.sharedCount}
                                                    </a>
                                                </li>
                                            </div>


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
                                                                                                borderRadius: "50%"
                                                                                            }}
                                                                                        />
                                                                                    ) : (

                                                                                        <FaUserCircle size="2x" style={{
                                                                                            width: 30,
                                                                                            height: 30,
                                                                                            objectFit: "cover",
                                                                                        }} />

                                                                                    )}
                                                                                    {" "}
                                                                                    {value.name}
                                                                                    <br />
                                                                                    <br />
                                                                                    <span style={{ marginLeft: "45px" }}>{value?.comment}</span></h4>
                                                                                { }
                                                                                <h6 style={{ marginLeft: "45px" }}>{(value.commentTime).split(" ")[0]}</h6>
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
                                                                        {postSubCommentID == value.id && subCommentBox && (<>
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
                                                                                                        borderRadius: "50%"
                                                                                                    }}
                                                                                                />
                                                                                            ) : (
                                                                                                <FaUserCircle size="2x" style={{
                                                                                                    width: 30,
                                                                                                    height: 30,
                                                                                                    objectFit: "cover",
                                                                                                }} />
                                                                                            )}
                                                                                            {" "}
                                                                                            {subValue?.name}
                                                                                            <br />
                                                                                            <br />
                                                                                            <span style={{ marginLeft: "45px" }}>{subValue?.comment}</span>
                                                                                            <h6 style={{ marginLeft: "45px" }}>{(subValue.commentTime).split(" ")[0]}</h6>
                                                                                        </h4>
                                                                                    </div>
                                                                                    <ul className="comment-like-list">
                                                                                        <li><a href="javascript:void(0);">{subValue?.likeCommentCount}</a></li>
                                                                                        <li><a href="javascript:void(0);" onClick={() => { (!subValue.isLiked) && handleSubCommentsLike(subValue.id, subValue.parentId, subValue.postId) }}>{subValue.isLiked ? <i class="fa fa-thumbs-o-up" style={{ color: "green" }}></i> : <i class="fa fa-thumbs-o-up"></i>}</a></li>
                                                                                        <li><a href="javascript:void(0);">{subValue?.unLikeCommentCount}</a></li>
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
                                                                        </>)}
                                                                    </>))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>)}
                                            </>)}
                                        </div>
                                    </>))}

                                </>) : trendPTriger ? (


                                    <>
                                        {trendPostRes?.length == 0 ? (<>

                                            <span style={{ color: "#ffff" }}>Posts not found</span>
                                        </>)




                                            : (<>
                                                {trendPostRes.map((data, index) => (<>
                                                    {/* Big Post */}
                                                    <div className="full-div upload-panl timeline">
                                                        {/* <ul
                                                        className="likee-list "

                                                    >

                                                        <li><a href="javascript:void(0);" onClick={() => {
                                                            (!data.isPostLiked) && handleLikePost(data.id)
                                                        }}><i className={data?.isPostLiked ? "fa fa-thumbs-up like-color" : "fa fa-thumbs-up"}></i></a></li>
                                                        <li><a href="javascript:void(0);">{data?.likePostCount}</a></li>
                                                        <li><a href="javascript:void(0);" onClick={() => {
                                                            (!data?.isPostUnLiked) && handleUnlikePost(data.id)
                                                        }}><i class="fa fa-thumbs-down"></i></a></li>
                                                    </ul> */}
                                                        <div className="flex-div flf">
                                                            <div className="comment-pnl">
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
                                                                <div>
                                                                    <h4>{data?.name ? data?.name : "Unnamed"}</h4>
                                                                    <h6>{data?.postTime?.split("T")[0] + " " + data?.postTime?.split("T")[1]?.split(".")[0]}</h6>

                                                                </div>
                                                            </div>
                                                            {data.isFollow ? (
                                                                <a href="javascript:void(0);" onClick={() => {
                                                                    handleUnFollow(data.createrId)
                                                                }} className="white-btn">Unfollow</a>
                                                            ) : (
                                                                <a href="javascript:void(0);" onClick={() => {
                                                                    handleFollow(data.createrId)
                                                                }} className="white-btn">Follow</a>
                                                            )}

                                                        </div>
                                                        <div className="full-div space-20"></div>
                                                        <div className="full-div">
                                                            <p>{data?.textBody}</p>
                                                        </div>
                                                        {data.isVideo ? (
                                                            <>
                                                                <video width="100%" controls>
                                                                    <source src={httpUrl + "/" + data?.mediaLink} />

                                                                    Your browser does not support HTML video.
                                                                </video>

                                                            </>)
                                                            : (<>
                                                                {
                                                                    data?.mediaLink ? <>
                                                                        <div className="full-div big-img">
                                                                            <img src={httpUrl + "/" + data?.mediaLink} />
                                                                        </div>
                                                                    </> : ""
                                                                }
                                                            </>)}
                                                        <div className="full-div cment-share">

                                                            {
                                                                data.isPostLiked ? (<li><a href="javascript:void(0);" onClick={() => {
                                                                    handleUnlikePost(data.id)
                                                                }}><img src={agreeIcon} width="20px" />{" "} Like {data?.likePostCount}</a></li>) : (<li><a href="javascript:void(0);" onClick={() => {
                                                                    handleLikePost(data.id)
                                                                }}><img src={disagreeIcon} width="20px" />{" "} Like {data?.likePostCount}</a></li>)
                                                            }

                                                            {/* {
                                                            data.isPostLiked?( <li><a href="javascript:void(0);" onClick={() => {
                                                                handleLikePost(data.id)
                                                           }}><i className={data?.isPostLiked ? "fa fa-thumbs-up" : "fa fa-thumbs-up"}></i> Likee {data?.likePostCount}</a></li>):( <li><a href="javascript:void(0);" onClick={() => {
                                                                handleLikePost(data.id)
                                                           }}><i className={data?.isPostLiked ? "fa fa-thumbs-up like-color" : "fa fa-thumbs-up"}></i>{" "} Like {data?.likePostCount}</a></li>)
                                                        } */}


                                                            <li>
                                                                <a href="javascript:void(0);" onClick={() => {
                                                                    setCommentBox(!commentBox)

                                                                    handleGetComment(data.id)
                                                                    setPostCommentID(data.id);
                                                                }}><i class="fa fa-comment-o"></i> comments {data?.totalComment} </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void(0);" onClick={() => {
                                                                    handleSharePost(data.id, data.createrId)
                                                                }}>
                                                                    <i class="fa fa-share" ></i> Share {data.sharedCount}
                                                                </a>
                                                            </li>
                                                        </div>


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
                                                                                                            borderRadius: "50%"
                                                                                                        }}
                                                                                                    />
                                                                                                ) : (

                                                                                                    <FaUserCircle size="2x" style={{
                                                                                                        width: 30,
                                                                                                        height: 30,
                                                                                                        objectFit: "cover",
                                                                                                    }} />

                                                                                                )}
                                                                                                {" "}
                                                                                                {value.name}
                                                                                                <br />
                                                                                                <br />
                                                                                                <span style={{ marginLeft: "45px" }}>{value?.comment}</span></h4>
                                                                                            { }
                                                                                            <h6 style={{ marginLeft: "45px" }}>{(value.commentTime).split(" ")[0]}</h6>
                                                                                        </div>
                                                                                    </div>
                                                                                    {console.log("postcomment dssssssssssid", postCommentID)}
                                                                                    {console.log("sub commentsssssssss", value)}
                                                                                    <ul className="comment-like-list">
                                                                                        <li><a href="javascript:void(0);">{value?.likeCommentCount}</a></li>
                                                                                        <li><a href="javascript:void(0);" onClick={() => { (!value.isLiked) && handleCommentsLike(value.id, value.postId) }}>{value.isLiked ? <i class="fa fa-thumbs-o-up" style={{ color: "green" }}></i> : <i class="fa fa-thumbs-o-up"></i>}</a></li>
                                                                                        <li><a href="javascript:void(0);">{value?.unLikeCommentCount}</a></li>{" "}
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
                                                                                    {postSubCommentID == value.id && subCommentBox && (<>

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
                                                                                                                    borderRadius: "50%"
                                                                                                                }}
                                                                                                            />

                                                                                                        ) : (

                                                                                                            <FaUserCircle size="2x" style={{
                                                                                                                width: 30,
                                                                                                                height: 30,
                                                                                                                objectFit: "cover",
                                                                                                            }} />
                                                                                                        )}
                                                                                                        {" "}
                                                                                                        {subValue?.name}
                                                                                                        <br />
                                                                                                        <br />
                                                                                                        <span style={{ marginLeft: "45px" }}>{subValue?.comment}</span>
                                                                                                        <h6 style={{ marginLeft: "45px" }}>{(subValue.commentTime).split(" ")[0]}</h6>
                                                                                                    </h4>
                                                                                                </div>
                                                                                                <ul className="comment-like-list">
                                                                                                    <li><a href="javascript:void(0);">{subValue?.likeCommentCount}</a></li>
                                                                                                    <li><a href="javascript:void(0);" onClick={() => { (!subValue.isLiked) && handleSubCommentsLike(subValue.id, subValue.parentId, subValue.postId) }}>{subValue.isLiked ? <i class="fa fa-thumbs-o-up" style={{ color: "green" }}></i> : <i class="fa fa-thumbs-o-up"></i>}</a></li>
                                                                                                    <li><a href="javascript:void(0);">{subValue?.unLikeCommentCount}</a></li>
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

                                                                                    </>)}

                                                                                </>))}
                                                                            </div>
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            </>)}
                                                        </>)}
                                                    </div>
                                                </>))}


                                            </>)}




                                    </>) : weekPTriger ? (
                                        <>
                                            {weekPostRes.map((data, index) => (

                                                <div className="full-div upload-panl timeline">
                                                    {/* <ul
    className="likee-list "

>

    <li><a href="javascript:void(0);" onClick={() => {
        (!data.isPostLiked) && handleLikePost(data.id)
    }}><i className={data?.isPostLiked ? "fa fa-thumbs-up like-color" : "fa fa-thumbs-up"}></i></a></li>
    <li><a href="javascript:void(0);">{data?.likePostCount}</a></li>
    <li><a href="javascript:void(0);" onClick={() => {
        (!data?.isPostUnLiked) && handleUnlikePost(data.id)
    }}><i class="fa fa-thumbs-down"></i></a></li>
</ul> */}
                                                    <div className="flex-div flf">
                                                        <div className="comment-pnl">
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
                                                            <div>
                                                                <h4>{data?.name ? data?.name : "Unnamed"}</h4>
                                                                <h6>{data?.postTime?.split("T")[0] + " " + data?.postTime?.split("T")[1]?.split(".")[0]}</h6>

                                                            </div>
                                                        </div>
                                                        {data.isFollow ? (
                                                            <a href="javascript:void(0);" onClick={() => {
                                                                handleUnFollow(data.createrId)
                                                            }} className="white-btn">Unfollow</a>
                                                        ) : (
                                                            <a href="javascript:void(0);" onClick={() => {
                                                                handleFollow(data.createrId)
                                                            }} className="white-btn">Follow</a>
                                                        )}

                                                    </div>
                                                    <div className="full-div space-20"></div>
                                                    <div className="full-div">
                                                        <p>{data?.textBody}</p>
                                                    </div>
                                                    {data.isVideo ? (
                                                        <>
                                                            <video width="100%" controls>
                                                                <source src={httpUrl + "/" + data?.mediaLink} />

                                                                Your browser does not support HTML video.
                                                            </video>

                                                        </>)
                                                        : (<>
                                                            {
                                                                data?.mediaLink ? <>
                                                                    <div className="full-div big-img">
                                                                        <img src={httpUrl + "/" + data?.mediaLink} />
                                                                    </div>
                                                                </> : ""
                                                            }
                                                        </>)}
                                                    <div className="full-div cment-share">

                                                        {
                                                            data.isPostLiked ? (<li><a href="javascript:void(0);" onClick={() => {
                                                                handleUnlikePost(data.id)
                                                            }}><img src={agreeIcon} width="20px" />{" "} Like {data?.likePostCount}</a></li>) : (<li><a href="javascript:void(0);" onClick={() => {
                                                                handleLikePost(data.id)
                                                            }}><img src={disagreeIcon} width="20px" />{" "} Like {data?.likePostCount}</a></li>)
                                                        }

                                                        {/* {
        data.isPostLiked?( <li><a href="javascript:void(0);" onClick={() => {
            handleLikePost(data.id)
       }}><i className={data?.isPostLiked ? "fa fa-thumbs-up" : "fa fa-thumbs-up"}></i> Likee {data?.likePostCount}</a></li>):( <li><a href="javascript:void(0);" onClick={() => {
            handleLikePost(data.id)
       }}><i className={data?.isPostLiked ? "fa fa-thumbs-up like-color" : "fa fa-thumbs-up"}></i>{" "} Like {data?.likePostCount}</a></li>)
    } */}


                                                        <li>
                                                            <a href="javascript:void(0);" onClick={() => {
                                                                setCommentBox(!commentBox)

                                                                handleGetComment(data.id)
                                                                setPostCommentID(data.id);
                                                            }}><i class="fa fa-comment-o"></i> comments {data?.totalComment} </a>
                                                        </li>
                                                        <li>
                                                            <a href="javascript:void(0);" onClick={() => {
                                                                handleSharePost(data.id, data.createrId)
                                                            }}>
                                                                <i class="fa fa-share" ></i> Share {data.sharedCount}
                                                            </a>
                                                        </li>
                                                    </div>


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
                                                                                                        borderRadius: "50%"
                                                                                                    }}
                                                                                                />
                                                                                            ) : (

                                                                                                <FaUserCircle size="2x" style={{
                                                                                                    width: 30,
                                                                                                    height: 30,
                                                                                                    objectFit: "cover",
                                                                                                }} />

                                                                                            )}
                                                                                            {" "}
                                                                                            {value.name}
                                                                                            <br />
                                                                                            <br />
                                                                                            <span style={{ marginLeft: "45px" }}>{value?.comment}</span></h4>
                                                                                        { }
                                                                                        <h6 style={{ marginLeft: "45px" }}>{(value.commentTime).split(" ")[0]}</h6>
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
                                                                                {postSubCommentID == value.id && subCommentBox && (<>

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
                                                                                                                borderRadius: "50%"
                                                                                                            }}
                                                                                                        />

                                                                                                    ) : (

                                                                                                        <FaUserCircle size="2x" style={{
                                                                                                            width: 30,
                                                                                                            height: 30,
                                                                                                            objectFit: "cover",
                                                                                                        }} />
                                                                                                    )}
                                                                                                    {" "}
                                                                                                    {subValue?.name}
                                                                                                    <br />
                                                                                                    <br />
                                                                                                    <span style={{ marginLeft: "45px" }}>{subValue?.comment}</span>
                                                                                                    <h6 style={{ marginLeft: "45px" }}>{(subValue.commentTime).split(" ")[0]}</h6>
                                                                                                </h4>
                                                                                            </div>
                                                                                            <ul className="comment-like-list">
                                                                                                <li><a href="javascript:void(0);">{subValue?.likeCommentCount}</a></li>
                                                                                                <li><a href="javascript:void(0);" onClick={() => { (!subValue.isLiked) && handleSubCommentsLike(subValue.id, subValue.parentId, subValue.postId) }}>{subValue.isLiked ? <i class="fa fa-thumbs-o-up" style={{ color: "green" }}></i> : <i class="fa fa-thumbs-o-up"></i>}</a></li>
                                                                                                <li><a href="javascript:void(0);">{subValue?.unLikeCommentCount}</a></li>
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

                                                                                </>)}

                                                                            </>))}
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                            </div>
                                                        </>)}
                                                    </>)}
                                                </div>

                                            ))}

                                        </>
                                    ) : monthPTriger ? (
                                        <>
                                            {monthPostRes.map((data, index) => (

                                                <div className="full-div upload-panl timeline">
                                                    {/* <ul
    className="likee-list "

>

    <li><a href="javascript:void(0);" onClick={() => {
        (!data.isPostLiked) && handleLikePost(data.id)
    }}><i className={data?.isPostLiked ? "fa fa-thumbs-up like-color" : "fa fa-thumbs-up"}></i></a></li>
    <li><a href="javascript:void(0);">{data?.likePostCount}</a></li>
    <li><a href="javascript:void(0);" onClick={() => {
        (!data?.isPostUnLiked) && handleUnlikePost(data.id)
    }}><i class="fa fa-thumbs-down"></i></a></li>
</ul> */}
                                                    <div className="flex-div flf">
                                                        <div className="comment-pnl">
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
                                                            <div>
                                                                <h4>{data?.name ? data?.name : "Unnamed"}</h4>
                                                                <h6>{data?.postTime?.split("T")[0] + " " + data?.postTime?.split("T")[1]?.split(".")[0]}</h6>

                                                            </div>
                                                        </div>
                                                        {data.isFollow ? (
                                                            <a href="javascript:void(0);" onClick={() => {
                                                                handleUnFollow(data.createrId)
                                                            }} className="white-btn">Unfollow</a>
                                                        ) : (
                                                            <a href="javascript:void(0);" onClick={() => {
                                                                handleFollow(data.createrId)
                                                            }} className="white-btn">Follow</a>
                                                        )}

                                                    </div>
                                                    <div className="full-div space-20"></div>
                                                    <div className="full-div">
                                                        <p>{data?.textBody}</p>
                                                    </div>
                                                    {data.isVideo ? (
                                                        <>
                                                            <video width="100%" controls>
                                                                <source src={httpUrl + "/" + data?.mediaLink} />

                                                                Your browser does not support HTML video.
                                                            </video>

                                                        </>)
                                                        : (<>
                                                            {
                                                                data?.mediaLink ? <>
                                                                    <div className="full-div big-img">
                                                                        <img src={httpUrl + "/" + data?.mediaLink} />
                                                                    </div>
                                                                </> : ""
                                                            }
                                                        </>)}
                                                    <div className="full-div cment-share">

                                                        {
                                                            data.isPostLiked ? (<li><a href="javascript:void(0);" onClick={() => {
                                                                handleUnlikePost(data.id)
                                                            }}><img src={agreeIcon} width="20px" />{" "} Like {data?.likePostCount}</a></li>) : (<li><a href="javascript:void(0);" onClick={() => {
                                                                handleLikePost(data.id)
                                                            }}><img src={disagreeIcon} width="20px" />{" "} Like {data?.likePostCount}</a></li>)
                                                        }

                                                        {/* {
        data.isPostLiked?( <li><a href="javascript:void(0);" onClick={() => {
            handleLikePost(data.id)
       }}><i className={data?.isPostLiked ? "fa fa-thumbs-up" : "fa fa-thumbs-up"}></i> Likee {data?.likePostCount}</a></li>):( <li><a href="javascript:void(0);" onClick={() => {
            handleLikePost(data.id)
       }}><i className={data?.isPostLiked ? "fa fa-thumbs-up like-color" : "fa fa-thumbs-up"}></i>{" "} Like {data?.likePostCount}</a></li>)
    } */}


                                                        <li>
                                                            <a href="javascript:void(0);" onClick={() => {
                                                                setCommentBox(!commentBox)

                                                                handleGetComment(data.id)
                                                                setPostCommentID(data.id);
                                                            }}><i class="fa fa-comment-o"></i> comments {data?.totalComment} </a>
                                                        </li>
                                                        <li>
                                                            <a href="javascript:void(0);" onClick={() => {
                                                                handleSharePost(data.id, data.createrId)
                                                            }}>
                                                                <i class="fa fa-share" ></i> Share {data.sharedCount}
                                                            </a>
                                                        </li>
                                                    </div>


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
                                                                                                        borderRadius: "50%"
                                                                                                    }}
                                                                                                />
                                                                                            ) : (

                                                                                                <FaUserCircle size="2x" style={{
                                                                                                    width: 30,
                                                                                                    height: 30,
                                                                                                    objectFit: "cover",
                                                                                                }} />

                                                                                            )}
                                                                                            {" "}
                                                                                            {value.name}
                                                                                            <br />
                                                                                            <br />
                                                                                            <span style={{ marginLeft: "45px" }}>{value?.comment}</span></h4>
                                                                                        { }
                                                                                        <h6 style={{ marginLeft: "45px" }}>{(value.commentTime).split(" ")[0]}</h6>
                                                                                    </div>
                                                                                </div>
                                                                                {console.log("postcomment dssssssssssid", postCommentID)}
                                                                                {console.log("sub commentsssssssss", value)}
                                                                                <ul className="comment-like-list">
                                                                                    <li><a href="javascript:void(0);">{value?.likeCommentCount}</a></li>
                                                                                    <li><a href="javascript:void(0);" onClick={() => { (!value.isLiked) && handleCommentsLike(value.id, value.postId) }}>{value.isLiked ? <i class="fa fa-thumbs-o-up" style={{ color: "green" }}></i> : <i class="fa fa-thumbs-o-up"></i>}</a></li>
                                                                                    <li><a href="javascript:void(0);">{value?.unLikeCommentCount}</a></li>{" "}
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
                                                                                {postSubCommentID == value.id && subCommentBox && (<>

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
                                                                                                                borderRadius: "50%"
                                                                                                            }}
                                                                                                        />

                                                                                                    ) : (

                                                                                                        <FaUserCircle size="2x" style={{
                                                                                                            width: 30,
                                                                                                            height: 30,
                                                                                                            objectFit: "cover",
                                                                                                        }} />
                                                                                                    )}
                                                                                                    {" "}
                                                                                                    {subValue?.name}
                                                                                                    <br />
                                                                                                    <br />
                                                                                                    <span style={{ marginLeft: "45px" }}>{subValue?.comment}</span>
                                                                                                    <h6 style={{ marginLeft: "45px" }}>{(subValue.commentTime).split(" ")[0]}</h6>
                                                                                                </h4>
                                                                                            </div>
                                                                                            <ul className="comment-like-list">
                                                                                                <li><a href="javascript:void(0);">{subValue?.likeCommentCount}</a></li>
                                                                                                <li><a href="javascript:void(0);" onClick={() => { (!subValue.isLiked) && handleSubCommentsLike(subValue.id, subValue.parentId, subValue.postId) }}>{subValue.isLiked ? <i class="fa fa-thumbs-o-up" style={{ color: "green" }}></i> : <i class="fa fa-thumbs-o-up"></i>}</a></li>
                                                                                                <li><a href="javascript:void(0);">{subValue?.unLikeCommentCount}</a></li>
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

                                                                                </>)}

                                                                            </>))}
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                            </div>
                                                        </>)}
                                                    </>)}
                                                </div>

                                            ))}

                                        </>
                                    ) : yearPTriger ? (
                                        <>
                                            {YearPostRes.map((data, index) => (

                                                <div className="full-div upload-panl timeline">
                                                    {/* <ul
    className="likee-list "

>

    <li><a href="javascript:void(0);" onClick={() => {
        (!data.isPostLiked) && handleLikePost(data.id)
    }}><i className={data?.isPostLiked ? "fa fa-thumbs-up like-color" : "fa fa-thumbs-up"}></i></a></li>
    <li><a href="javascript:void(0);">{data?.likePostCount}</a></li>
    <li><a href="javascript:void(0);" onClick={() => {
        (!data?.isPostUnLiked) && handleUnlikePost(data.id)
    }}><i class="fa fa-thumbs-down"></i></a></li>
</ul> */}
                                                    <div className="flex-div flf">
                                                        <div className="comment-pnl">
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
                                                            <div>
                                                                <h4>{data?.name ? data?.name : "Unnamed"}</h4>
                                                                <h6>{data?.postTime?.split("T")[0] + " " + data?.postTime?.split("T")[1]?.split(".")[0]}</h6>

                                                            </div>
                                                        </div>
                                                        {data.isFollow ? (
                                                            <a href="javascript:void(0);" onClick={() => {
                                                                handleUnFollow(data.createrId)
                                                            }} className="white-btn">Unfollow</a>
                                                        ) : (
                                                            <a href="javascript:void(0);" onClick={() => {
                                                                handleFollow(data.createrId)
                                                            }} className="white-btn">Follow</a>
                                                        )}

                                                    </div>
                                                    <div className="full-div space-20"></div>
                                                    <div className="full-div">
                                                        <p>{data?.textBody}</p>
                                                    </div>
                                                    {data.isVideo ? (
                                                        <>
                                                            <video width="100%" controls>
                                                                <source src={httpUrl + "/" + data?.mediaLink} />

                                                                Your browser does not support HTML video.
                                                            </video>

                                                        </>)
                                                        : (<>
                                                            {
                                                                data?.mediaLink ? <>
                                                                    <div className="full-div big-img">
                                                                        <img src={httpUrl + "/" + data?.mediaLink} />
                                                                    </div>
                                                                </> : ""
                                                            }
                                                        </>)}
                                                    <div className="full-div cment-share">

                                                        {
                                                            data.isPostLiked ? (<li><a href="javascript:void(0);" onClick={() => {
                                                                handleUnlikePost(data.id)
                                                            }}><img src={agreeIcon} width="20px" />{" "} Like {data?.likePostCount}</a></li>) : (<li><a href="javascript:void(0);" onClick={() => {
                                                                handleLikePost(data.id)
                                                            }}><img src={disagreeIcon} width="20px" />{" "} Like {data?.likePostCount}</a></li>)
                                                        }

                                                        {/* {
        data.isPostLiked?( <li><a href="javascript:void(0);" onClick={() => {
            handleLikePost(data.id)
       }}><i className={data?.isPostLiked ? "fa fa-thumbs-up" : "fa fa-thumbs-up"}></i> Likee {data?.likePostCount}</a></li>):( <li><a href="javascript:void(0);" onClick={() => {
            handleLikePost(data.id)
       }}><i className={data?.isPostLiked ? "fa fa-thumbs-up like-color" : "fa fa-thumbs-up"}></i>{" "} Like {data?.likePostCount}</a></li>)
    } */}


                                                        <li>
                                                            <a href="javascript:void(0);" onClick={() => {
                                                                setCommentBox(!commentBox)

                                                                handleGetComment(data.id)
                                                                setPostCommentID(data.id);
                                                            }}><i class="fa fa-comment-o"></i> comments {data?.totalComment} </a>
                                                        </li>
                                                        <li>
                                                            <a href="javascript:void(0);" onClick={() => {
                                                                handleSharePost(data.id, data.createrId)
                                                            }}>
                                                                <i class="fa fa-share" ></i> Share {data.sharedCount}
                                                            </a>
                                                        </li>
                                                    </div>


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
                                                                                                        borderRadius: "50%"
                                                                                                    }}
                                                                                                />
                                                                                            ) : (

                                                                                                <FaUserCircle size="2x" style={{
                                                                                                    width: 30,
                                                                                                    height: 30,
                                                                                                    objectFit: "cover",
                                                                                                }} />

                                                                                            )}
                                                                                            {" "}
                                                                                            {value.name}
                                                                                            <br />
                                                                                            <br />
                                                                                            <span style={{ marginLeft: "45px" }}>{value?.comment}</span></h4>
                                                                                        { }
                                                                                        <h6 style={{ marginLeft: "45px" }}>{(value.commentTime).split(" ")[0]}</h6>
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
                                                                                {postSubCommentID == value.id && subCommentBox && (<>

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
                                                                                                                borderRadius: "50%"
                                                                                                            }}
                                                                                                        />

                                                                                                    ) : (

                                                                                                        <FaUserCircle size="2x" style={{
                                                                                                            width: 30,
                                                                                                            height: 30,
                                                                                                            objectFit: "cover",
                                                                                                        }} />
                                                                                                    )}
                                                                                                    {" "}
                                                                                                    {subValue?.name}
                                                                                                    <br />
                                                                                                    <br />
                                                                                                    <span style={{ marginLeft: "45px" }}>{subValue?.comment}</span>
                                                                                                    <h6 style={{ marginLeft: "45px" }}>{(subValue.commentTime).split(" ")[0]}</h6>
                                                                                                </h4>
                                                                                            </div>
                                                                                            <ul className="comment-like-list">
                                                                                                <li><a href="javascript:void(0);">{subValue?.likeCommentCount}</a></li>
                                                                                                <li><a href="javascript:void(0);" onClick={() => { (!subValue.isLiked) && handleSubCommentsLike(subValue.id, subValue.parentId, subValue.postId) }}>{subValue.isLiked ? <i class="fa fa-thumbs-o-up" style={{ color: "green" }}></i> : <i class="fa fa-thumbs-o-up"></i>}</a></li>
                                                                                                <li><a href="javascript:void(0);">{subValue?.unLikeCommentCount}</a></li>
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

                                                                                </>)}

                                                                            </>))}
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                            </div>
                                                        </>)}
                                                    </>)}
                                                </div>

                                            ))}
                                        </>
                                    ) :



                                    (

                                        <>

                                            {allPostRes?.map((data, index) => (

                                                <div className="full-div upload-panl timeline">
                                                    {/* <ul
                                                        className="likee-list "

                                                    >

                                                        <li><a href="javascript:void(0);" onClick={() => {
                                                            (!data.isPostLiked) && handleLikePost(data.id)
                                                        }}><i className={data?.isPostLiked ? "fa fa-thumbs-up like-color" : "fa fa-thumbs-up"}></i></a></li>
                                                        <li><a href="javascript:void(0);">{data?.likePostCount}</a></li>
                                                        <li><a href="javascript:void(0);" onClick={() => {
                                                            (!data?.isPostUnLiked) && handleUnlikePost(data.id)
                                                        }}><i class="fa fa-thumbs-down"></i></a></li>
                                                    </ul> */}
                                                    <div className="flex-div flf">
                                                        <div className="comment-pnl">
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
                                                            <div>
                                                                <h4>{data?.name ? data?.name : "Unnamed"}</h4>
                                                                <h6>{data?.postTime?.split("T")[0] + " " + data?.postTime?.split("T")[1]?.split(".")[0]}</h6>

                                                            </div>
                                                        </div>
                                                        {data.isFollow ? (
                                                            <a href="javascript:void(0);" onClick={() => {
                                                                handleUnFollow(data.createrId)
                                                            }} className="white-btn">Unfollow</a>
                                                        ) : (
                                                            <a href="javascript:void(0);" onClick={() => {
                                                                handleFollow(data.createrId)
                                                            }} className="white-btn">Follow</a>
                                                        )}

                                                    </div>
                                                    <div className="full-div space-20"></div>
                                                    <div className="full-div">
                                                        <p>{data?.textBody}</p>
                                                    </div>
                                                    {data.isVideo ? (
                                                        <>
                                                            <video width="100%" controls>
                                                                <source src={httpUrl + "/" + data?.mediaLink} />

                                                                Your browser does not support HTML video.
                                                            </video>

                                                        </>)
                                                        : (<>
                                                            {
                                                                data?.fileList ? <>
                                                                    {
                                                                        data?.fileList?.map((image) => {
                                                                            return (
                                                                                <div className="full-div big-img">
                                                                                    <img src={httpUrl + "/" + image.url} />
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </> : ""
                                                            }
                                                        </>)}
                                                    <div className="full-div cment-share">

                                                        {
                                                            data.isPostLiked ? (<li><a href="javascript:void(0);" onClick={() => {
                                                                handleUnlikePost(data.id)
                                                            }}><img src={agreeIcon} width="20px" />{" "} Like {data?.likePostCount}</a></li>) : (<li><a href="javascript:void(0);" onClick={() => {
                                                                handleLikePost(data.id)
                                                            }}><img src={disagreeIcon} width="20px" />{" "} Like {data?.likePostCount}</a></li>)
                                                        }

                                                        {/* {
                                                            data.isPostLiked?( <li><a href="javascript:void(0);" onClick={() => {
                                                                handleLikePost(data.id)
                                                           }}><i className={data?.isPostLiked ? "fa fa-thumbs-up" : "fa fa-thumbs-up"}></i> Likee {data?.likePostCount}</a></li>):( <li><a href="javascript:void(0);" onClick={() => {
                                                                handleLikePost(data.id)
                                                           }}><i className={data?.isPostLiked ? "fa fa-thumbs-up like-color" : "fa fa-thumbs-up"}></i>{" "} Like {data?.likePostCount}</a></li>)
                                                        } */}


                                                        <li>
                                                            <a href="javascript:void(0);" onClick={() => {
                                                                setCommentBox(!commentBox)

                                                                handleGetComment(data.id)
                                                                setPostCommentID(data.id);
                                                            }}><i class="fa fa-comment-o"></i> comments {data?.totalComment} </a>
                                                        </li>
                                                        <li>
                                                            <a href="javascript:void(0);" onClick={() => {
                                                                handleSharePost(data.id, data.createrId)
                                                            }}>
                                                                <i class="fa fa-share" ></i> Share {data.sharedCount}
                                                            </a>
                                                        </li>
                                                    </div>


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
                                                                                            <span style={{ marginLeft: "45px" }}>{value?.comment}</span></h4>
                                                                                        { }
                                                                                        <h6 style={{ marginLeft: "45px" }}>{(value.commentTime).split(" ")[0]}</h6>
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
                                                                                {postSubCommentID == value.id && subCommentBox && (<>
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
                                                                                                                borderRadius: "50%", marginRight: "10px"
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
                                                                                                    <span style={{ marginLeft: "45px" }}>{subValue?.comment}</span>
                                                                                                    <h6 style={{ marginLeft: "45px" }}>{(subValue.commentTime).split(" ")[0]}</h6>
                                                                                                </h4>
                                                                                            </div>
                                                                                            <ul className="comment-like-list">
                                                                                                <li><a href="javascript:void(0);">{subValue?.likeCommentCount}</a></li>
                                                                                                <li><a href="javascript:void(0);" onClick={() => { (!subValue.isLiked) && handleSubCommentsLike(subValue.id, subValue.parentId, subValue.postId) }}>{subValue.isLiked ? <i class="fa fa-thumbs-o-up" style={{ color: "green" }}></i> : <i class="fa fa-thumbs-o-up"></i>}</a></li>
                                                                                                <li><a href="javascript:void(0);">{subValue?.unLikeCommentCount}</a></li>
                                                                                                <li><a href="javascript:void(0);" onClick={() => { (!subValue.isUnLiked) && handleSubCommentsUnLike(subValue.id, subValue.parentId, subValue.postId) }}>{subValue.isUnLiked ? <i class="fa fa-thumbs-o-down" style={{ color: "red" }}></i> : <i class="fa fa-thumbs-o-down"></i>}</a></li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </>))}
                                                                                    <div className="full-div p-o">
                                                                                        <div className="search-input btn">
                                                                                            <input style={{ color: "#fff" }} autoComplete="off" onChange={(e) => { setSubCommentBody(e.target.value) }}
                                                                                                onKeyPress={(e) => { if (e.code == "Enter") { handleSubComment(value.postId, value.id) } }}
                                                                                                type="text" placeholder="comment" />
                                                                                            <button className="send-btn" onClick={() => { handleSubComment(value.postId, value.id) }}>Send</button>

                                                                                        </div>
                                                                                    </div>

                                                                                </>)}

                                                                            </>))}
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                            </div>
                                                        </>)}
                                                    </>)}
                                                </div>
                                            ))}
                                        </>)}
                                {/* Big Post */}
                                <div onClick={() => { loadPost() }} style={{ display: "flex", justifyContent: "center" }}>
                                    <button className="white-btn">Load More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div >
    );
};
export default Profilelanding;
