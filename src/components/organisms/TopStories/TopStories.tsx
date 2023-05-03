import React from "react";
import "./TopStories.scss";
import gunsImg from "../../../img/guns.png";
import peopleImg from "../../../img/people.png";
import strikeImg from "../../../img/strike.png";
import vaccineImg from "../../../img/vaccine.jpg";
import tiktokeImg from "../../../img/tiktok.png";
import NewsContainer from "../../molecules/NewsContainer/NewsContainer";

const TopStories: React.FC = () => {
  return (
    <div className="top-stories">
      <div className="top-stories__title">
        <div className="top-stories__title__line"></div>
        <h3>TOP STORIES</h3>
        <div className="top-stories__title__line"></div>
      </div>
      <div className="top-stories__content">
        <NewsContainer
          news={[
            {
              id: 90,
              img: gunsImg,
              alt: "guns",
              title:
                "America isn’t protecting its kids and teens from gun violence",
              desc: "A shooting at a Texas prom party highlights the huge toll of gun violence on kids and teens in the US.",
              author: "test",
            },
            {
              id: 91,
              img: peopleImg,
              alt: "people",
              title: "How to find your people",
              desc: "An adapted excerpt from Lane Moore’s You Will Find Your People: How to Make Meaningful Friendships as an Adult.",
              author: "test",
            },
          ]}
          className="double"
          type="primary"
        />
        <NewsContainer
          news={[
            {
              id: 92,
              img: vaccineImg,
              alt: "vaccine",
              title:
                "How new vaccine technologies could reduce the massive death toll from malaria",
              desc: "There’s still a long way to go, but RNA vaccines might help in the fight against malaria.",
              author: "test",
            },
          ]}
          className="single"
          type="primary"
        />
        <NewsContainer
          news={[
            {
              id: 93,
              img: strikeImg,
              alt: "strike",
              title: "What happens if there’s a Hollywood writers strike?",
              desc: "It’s been 15 years since the last WGA strike, and the stakes are far greater.",
              author: "test",
            },
            {
              id: 94,
              img: tiktokeImg,
              alt: "tiktok",
              title: "How TikTok dances trained an AI to see",
              desc: "And remember the Mannequin Challenge? Yep, they used that too.",
              author: "test",
            },
          ]}
          className="double"
          type="primary"
        />
      </div>
    </div>
  );
};

export default TopStories;
