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

class CustomSlide extends Component {
  render() {
    const { index, ...props } = this.props;
    return <div {...props}></div>;
  }
}
const AuthorList = () => {
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    http
      .get(httpUrl + "/api/v1/Nft/GetTopSeller")
      .then(async (res) => {
        console.log(
          "Responseeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          res.data.data.accountList
        );
        setData(res.data.data.accountList);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error?.message);
      });
  }, []);

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
        breakpoint: 1199,
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
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {loading ? (
        <div className="col-sm-12 d-flex justify-content-center">
          <RingLoader color="white" size="60" />
        </div>
      ) : (
        <>
          <div className="nft author_list ol-styling">
            <Slider {...settings}>
              {data?.map((payload, index) => (
                <>
                  <CustomSlide className="itm" index={1}>
                    <li>
                      <div className="info-text flex-div">
                        <div className="text-left">
                          <h4 onClick={() => window.open("", "_self")}>
                            {payload.username}
                          </h4>
                          <p>Owner : akmiArt-C192</p>
                        </div>
                        <div className="text-right">
                          <span className="heart-span">
                            <i className="fa fa-heart-o"></i> 301
                          </span>
                        </div>
                      </div>
                      <div className="author-banner-img"
                      // style={{ backgroundImage: `url(${bannerimg})` }}
                      >
                        <img src={bannerimg} />
                        <i className="fa fa-share-alt"></i>
                        <a href="javascript:void(0);">NFT Details</a>
                      </div>
                      <div className="flex-div">

                        <div className="author_list_info">
                          <b>Current</b>
                          <span className="bot">
                            {payload?.nftSellPrice + " BNB"}
                          </span>
                        </div>
                        <div className="author_list_pp" style={{ height: 70 }}>
                          <span onClick={() => history.push(`/profile/${payload.address}`)}>
                            <img className="lazy" src={payload?.profileImage ? httpUrl + "/" + payload?.profileImage : defaultImg} alt="" />
                            <i className="fa fa-check"></i>
                          </span>
                          <h6>GigsStudio</h6>
                        </div>
                      </div>
                    </li>
                  </CustomSlide>
                </>
              ))}
            </Slider>
          </div>
        </>
      )}

      <div></div>
    </>
  );
};
export default AuthorList;
