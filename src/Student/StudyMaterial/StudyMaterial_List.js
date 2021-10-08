import axios from "axios";
import React, { useEffect, useState } from "react";
import Config from "../../config.json";
import dateFormat from "dateformat";
import "./study.css";
import Studentnav from "../studentnav";
import Footer from "../Footer";
import "./study.css";

const StudyMaterial_List = (props) => {
    const [studydata, setStudydata] = useState([]);
    console.log(props.location.state.subject);
    useEffect(() => {
        axios
            .get(
                Config.SERVER_URL +
                `support/get-study-material/?subject_id=${props.location.state.subject.id}&section_id=${props.location.state.sectionid}`
            )
            .then((data) => {
                console.log(data);
                setStudydata(data.data);
            })
            .catch((err) => {
                console.log(err);
                alert(err);
            });
    });
    function onView(pdf) {
        window.open(pdf);
    }
    return (
        <>
            <Studentnav />

            <div className="study-material-container">
                <h2>Study Material List</h2>

                <div className="study-material-content-box">
                    {studydata.map((item) => (
                        <div className="study-material-box">
                            <div className="study-material-svg">
                                <svg
                                    width="270"
                                    height="134"
                                    viewBox="0 0 292 134"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <line
                                        x1="112.5"
                                        y1="78.5"
                                        x2="139.5"
                                        y2="78.5"
                                        stroke="black"
                                        stroke-linecap="round"
                                    />
                                    <line
                                        x1="112.5"
                                        y1="70.5"
                                        x2="142.5"
                                        y2="70.5"
                                        stroke="black"
                                        stroke-linecap="round"
                                    />
                                    <line
                                        x1="112.5"
                                        y1="63.5"
                                        x2="153.5"
                                        y2="63.5"
                                        stroke="black"
                                        stroke-linecap="round"
                                    />
                                    <line
                                        x1="112.5"
                                        y1="56.5"
                                        x2="156.5"
                                        y2="56.5"
                                        stroke="black"
                                        stroke-linecap="round"
                                    />
                                    <line
                                        x1="112.5"
                                        y1="49.5"
                                        x2="161.5"
                                        y2="49.5"
                                        stroke="black"
                                        stroke-linecap="round"
                                    />
                                    <path
                                        d="M0 13C0 5.8203 5.8203 0 13 0H279C286.18 0 292 5.8203 292 13V134H0V13Z"
                                        fill="#883D35"
                                    />
                                    <path
                                        opacity="0.76"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M110 101.5L135.5 134H291.5V60.6467L161.5 37V97L110 101.5Z"
                                        fill="url(#paint0_linear)"
                                    />
                                    <g filter="url(#filter0_d)">
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M98 34.3857C98 33.8335 98.4477 33.3857 99 33.3857H193C193.552 33.3857 194 33.8335 194 34.3857V98.6136C194 99.1659 193.552 99.6136 193 99.6136H99C98.4477 99.6136 98 99.1659 98 98.6136V94.4533C98 93.9304 98.4098 93.509 98.9076 93.3487C100.496 92.8374 101.646 91.3472 101.646 89.5886C101.646 87.83 100.496 86.3399 98.9076 85.8285C98.4098 85.6683 98 85.2468 98 84.7239V82.909C98 82.3861 98.4098 81.9646 98.9076 81.8044C100.496 81.2931 101.646 79.8029 101.646 78.0443C101.646 76.2857 100.496 74.7956 98.9076 74.2842C98.4098 74.124 98 73.7025 98 73.1796V71.3647C98 70.8418 98.4098 70.4203 98.9076 70.2601C100.496 69.7487 101.646 68.2586 101.646 66.5C101.646 64.7414 100.496 63.2513 98.9076 62.7399C98.4098 62.5797 98 62.1582 98 61.6353V59.8204C98 59.2975 98.4098 58.876 98.9076 58.7158C100.496 58.2044 101.646 56.7143 101.646 54.9557C101.646 53.1971 100.496 51.707 98.9076 51.1956C98.4098 51.0354 98 50.6139 98 50.091V48.2761C98 47.7532 98.4098 47.3317 98.9076 47.1715C100.496 46.6601 101.646 45.17 101.646 43.4114C101.646 41.6528 100.496 40.1626 98.9076 39.6513C98.4098 39.4911 98 39.0696 98 38.5467V34.3857ZM112 70.5C112 70.7761 112.224 71 112.5 71H175.5C175.776 71 176 70.7761 176 70.5V70.5C176 70.2239 175.776 70 175.5 70H112.5C112.224 70 112 70.2239 112 70.5V70.5ZM176 63.5C176 63.7761 175.776 64 175.5 64H112.5C112.224 64 112 63.7761 112 63.5V63.5C112 63.2239 112.224 63 112.5 63H175.5C175.776 63 176 63.2239 176 63.5V63.5ZM112 56.5C112 56.7761 112.224 57 112.5 57H175.5C175.776 57 176 56.7761 176 56.5V56.5C176 56.2239 175.776 56 175.5 56H112.5C112.224 56 112 56.2239 112 56.5V56.5ZM176 49.5C176 49.7761 175.776 50 175.5 50H112.5C112.224 50 112 49.7761 112 49.5V49.5C112 49.2239 112.224 49 112.5 49H175.5C175.776 49 176 49.2239 176 49.5V49.5ZM112 78.5C112 78.7761 112.224 79 112.5 79H166.5C166.776 79 167 78.7761 167 78.5V78.5C167 78.2239 166.776 78 166.5 78H112.5C112.224 78 112 78.2239 112 78.5V78.5Z"
                                            fill="#F0E3C1"
                                        />
                                    </g>
                                    <rect
                                        x="148"
                                        y="33"
                                        width="46"
                                        height="67"
                                        rx="1"
                                        fill="#883D3C"
                                        fill-opacity="0.07"
                                    />
                                    <defs>
                                        <filter
                                            id="filter0_d"
                                            x="94"
                                            y="33.3857"
                                            width="104"
                                            height="74.2279"
                                            filterUnits="userSpaceOnUse"
                                            color-interpolation-filters="sRGB"
                                        >
                                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                            <feColorMatrix
                                                in="SourceAlpha"
                                                type="matrix"
                                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                result="hardAlpha"
                                            />
                                            <feOffset dy="4" />
                                            <feGaussianBlur stdDeviation="2" />
                                            <feComposite in2="hardAlpha" operator="out" />
                                            <feColorMatrix
                                                type="matrix"
                                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                            />
                                            <feBlend
                                                mode="normal"
                                                in2="BackgroundImageFix"
                                                result="effect1_dropShadow"
                                            />
                                            <feBlend
                                                mode="normal"
                                                in="SourceGraphic"
                                                in2="effect1_dropShadow"
                                                result="shape"
                                            />
                                        </filter>
                                        <linearGradient
                                            id="paint0_linear"
                                            x1="264.566"
                                            y1="132.067"
                                            x2="214.184"
                                            y2="-15.5785"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stop-color="#6D2F48" stop-opacity="0" />
                                            <stop
                                                offset="0.1026"
                                                stop-color="#5E293E"
                                                stop-opacity="0.1026"
                                            />
                                            <stop
                                                offset="0.2446"
                                                stop-color="#532437"
                                                stop-opacity="0.2446"
                                            />
                                            <stop
                                                offset="0.4447"
                                                stop-color="#4C2132"
                                                stop-opacity="0.4447"
                                            />
                                            <stop offset="1" stop-color="#4A2031" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>

                            <div className="studyName">
                                <div className="study-merger">
                                    <p>{item.publication}</p>
                                    <p style={{ fontSize: "12px" }}>
                                        {dateFormat(item.publication_date, "mm/dd/yyyy")}
                                    </p>
                                </div>
                                <button onClick={() => onView(item.pdf)}>View</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default StudyMaterial_List;
