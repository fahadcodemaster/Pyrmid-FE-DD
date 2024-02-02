// import React from "react";
import SliderCarousel from "../components/SliderCarouselsingle";
import FeatureBox from "../components/FeatureBox";
import CarouselCollection from "../components/CarouselCollection";
import MarketNfts from "./MarketPlace/MarketPlaceProducts";
import AuthorList from "../components/authorList";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
// import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import marketplace from "../../assets/images/market-place-icon.png";
import heroimage from "../../assets/images/hero-image.png";
import user from "../../assets/images/user.png";
import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import http from "../../Redux/Api/http";
import { FaUser } from "react-icons/fa";
import { PropagateLoader, RingLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import defaultImg from "../../assets/images/default.png";
import bannerimg from "../../assets/images/banner-img.jpg";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import { NavLink } from "react-router-dom";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: white;
    border-bottom: 0;
    box-shadow: 0 4px 20px 0 rgba(10,10,10, .8);
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn-custom, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: #fff;
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: none !important;
  }
  header#myHeader .logo .d-3{
    display: block !important;
  }
  .jumbotron.no-bg{
    background: center bottom;
    background-size: cover;
    height: 100vh;
  }
  footer.footer-light .subfooter span img.d-1{
    display: none !important;
  }
  footer.footer-light .subfooter span img.d-3{
    display: inline-block !important;
  }
  .de_countdown{
    right: 10px;
    color: #fff;
  }
  .author_list_pp{
    margin-left:0;
  }
  // footer.footer-light .subfooter{
  //   border-top: 1px solid rgba(255,255,255,.1);
  // }
`;

const Homethree = () => {

  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );
  const [topSeller, setTopSeller] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const profileSelector = useSelector(state => state?.MyProfile?.MyProfileResponse?.data)
  const walletData = useSelector(state => state?.WalletConnction?.WalletResponse?.accounts)

  useEffect(() => {

    getTopSeller()
  }, [walletData]);

  const getTopSeller = () => {
    setLoading(true);
    const wallet = walletData ? walletData : "nill"
    http
      .get(httpUrl + `/api/v1/Nft/GetTopSeller?walletAddress=${wallet}`)
      .then(async (res) => {
        setTopSeller(res.data.data.accountList);
        setLoading(false);
        console.log("Top Sellers", res.data.data);
      })
      .catch((error) => {

      });
  }


  return (
    <div>
      <GlobalStyles />
      <section className="conatienr-fluid landing-header">
        <div className="table-cell">
          <div className="table-cell-center">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <img src={heroimage} alt='image' />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h1>
                    Discover, Collect &
                    Sell Extraordinary NFTs
                  </h1>
                  <p>
                    The Crypto Monkey is a high-quality collection of 100 unique monkeys on the NFTMart marketplace.
                  </p>
                  <ul className="social-list">
                    <li><a href="/Marketplace" className="reg-btn">DISCOVER</a></li>
                    <li><a href="javascript:void(0);" target="_blank"><i className="fa fa-facebook-square"></i></a></li>
                    <li><a href="javascript:void(0);" target="_blank"><i className="fa fa-instagram"></i></a></li>
                    <li><a href="javascript:void(0);" target="_blank"><i className="fa fa-twitter-square"></i></a></li>
                    <li><a href="javascript:void(0);" target="_blank"><i className="fa fa-linkedin-square"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarketNfts />

      <section className="container-fluid top-sellers-panel">
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <h2>TOP SELLERS</h2>
                <h3 class="style-brder">Fine art sellers are in a upward this week</h3>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <ul className="seller-list">
                  {topSeller.map((item, ind) => {
                    return(
                    <li key={ind}>
                      <div className="seller-post">
                        <div className="img-pnl">
                          {/* <i className="fa fa-check"></i> */}
                          {item?.profileImage ? (
                            <img className="lazy" src={httpUrl + "/" + item?.profileImage} alt="user.png" />
                          ) : (
                            <>

                              <img src={user} />
                            </>
                          )}
                        </div>
                        <div className="text-pnl">
                          <h6>
                            {item?.username}
                            <span>7 items</span>
                          </h6>
                          <span className="number-span">{ind+1}</span>
                        </div>
                      </div>
                    </li>
                    )
                  })
                  }
                  {/* <li>
                  <div className="seller-post">
                    <div className="img-pnl">
                      <i className="fa fa-check"></i>
                      <img src={user} />
                    </div>
                    <div className="text-pnl">
                      <h6>
                        akmiStudio
                        <span>7 items</span>
                      </h6>
                      <span className="number-span">1</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="seller-post">
                    <a href="javascript:void(0);" className="img-pnl">
                      <i className="fa fa-check"></i>
                      <img src={user} />
                    </a>
                    <div className="text-pnl">
                      <h6>
                        akmiStudio
                        <span>7 items</span>
                      </h6>
                      <span className="number-span">2</span>
                    </div>
                  </div>
                </li>
                <li>
                  <a href="javascript:void(0);" className="seller-post">
                    <div className="img-pnl">
                      <i className="fa fa-check"></i>
                      <img src={user} />
                    </div>
                    <div className="text-pnl">
                      <h6>
                        akmiStudio
                        <span>7 items</span>
                      </h6>
                      <span className="number-span">3</span>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="seller-post">
                    <div className="img-pnl">
                      <i className="fa fa-check"></i>
                      <img src={user} />
                    </div>
                    <div className="text-pnl">
                      <h6>
                        akmiStudio
                        <span>7 items</span>
                      </h6>
                      <span className="number-span">4</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="seller-post">
                    <div className="img-pnl">
                      <i className="fa fa-check"></i>
                      <img src={user} />
                    </div>
                    <div className="text-pnl">
                      <h6>
                        akmiStudio
                        <span>7 items</span>
                      </h6>
                      <span className="number-span">5</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="seller-post">
                    <div className="img-pnl">
                      <i className="fa fa-check"></i>
                      <img src={user} />
                    </div>
                    <div className="text-pnl">
                      <h6>
                        akmiStudio
                        <span>7 items</span>
                      </h6>
                      <span className="number-span">6</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="seller-post">
                    <div className="img-pnl">
                      <i className="fa fa-check"></i>
                      <img src={user} />
                    </div>
                    <div className="text-pnl">
                      <h6>
                        akmiStudio
                        <span>7 items</span>
                      </h6>
                      <span className="number-span">7</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="seller-post">
                    <div className="img-pnl">
                      <i className="fa fa-check"></i>
                      <img src={user} />
                    </div>
                    <div className="text-pnl">
                      <h6>
                        akmiStudio
                        <span>7 items</span>
                      </h6>
                      <span className="number-span">8</span>
                    </div>
                  </div>
                </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default Homethree;
