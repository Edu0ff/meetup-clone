import React, { useState, useEffect } from "react";
import "./style.css";
import EventCard from "../EventCard";
import Loading from "../Loading";
import CustomLeftArrow from "../CustomLeftArrow/index.jsx";
import CustomRightArrow from "../CustomRightArrow/index.jsx";
import { searchMeetups } from "../../services/index.js";
import { Link } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function NextEvents() {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeetups = async () => {
      try {
        const meetupsData = await searchMeetups();
        setMeetups(meetupsData);
      } catch (error) {
        console.error("Error fetching meetups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetups();
  }, []);

  const now = new Date();
  const filteredAndSortedMeetups = meetups
    .filter((meetup) => new Date(meetup.date) > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="next-events">
      <div className="green-banner" id="nextevents-banner">
        <p>Next Events!</p>
      </div>
      {loading ? (
        <Loading />
      ) : filteredAndSortedMeetups.length > 0 ? (
        <div className="event-cards-container">
           <Carousel
              additionalTransfrom={0}
              arrows
              autoPlay={true}
              autoPlaySpeed={2000}
              centerMode={false}
              className=""
              containerClass="container-with-dots"
              customLeftArrow={<CustomLeftArrow />}
              customRightArrow={<CustomRightArrow />}
              customTransition="all 1s linear"
              dotListClass=""
              draggable
              focusOnSelect={false}
              infinite={true}
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              pauseOnHover
              partialVisible={true}
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024
                  },
                  items: 3,
                  partialVisibilityGutter: 40
                },
                mobile: {
                  breakpoint: {
                    max: 464,
                    min: 0
                  },
                  items: 1,
                  partialVisibilityGutter: 30
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464
                  },
                  items: 2,
                  partialVisibilityGutter: 30
                }
              }}
              rewind={true}
              rewindWithAnimation={true}
              rtl={false}
              shouldResetAutoplay
              showDots={true}
              sliderClass=""
              slidesToSlide={3}
              swipeable
              transitionDuration={2000}
            >
              {filteredAndSortedMeetups.map((meetup) => (
                <EventCard key={meetup.id} meetup={meetup} />
              ))}
            </Carousel>
        </div>
      ) : (
        <p>No hay eventos disponibles.</p>
      )}
    </div>
  );
}

export default NextEvents;
