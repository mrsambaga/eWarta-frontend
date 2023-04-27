import React from "react";
import "./TopStories.scss";
import gunsImg from "../../../img/guns.png";
import peopleImg from "../../../img/people.png";
import strikeImg from "../../../img/strike.png";
import vaccineImg from "../../../img/vaccine.jpg";
import tiktokeImg from "../../../img/tiktok.png";

const TopStories: React.FC = () => {
  return (
    <div className="top-stories">
      <div className="top-stories__title">
        <div className="top-stories__title__line"></div>
        <h3>Top Stories</h3>
        <div className="top-stories__title__line"></div>
      </div>
      <div className="top-stories__content">
        <div className="first-column">
          <div>
            <img src={gunsImg} alt="guns" />
            <h3>
              America isn’t protecting its kids and teens from gun violence
            </h3>
            <p>
              A shooting at a Texas prom party highlights the huge toll of gun
              violence on kids and teens in the US.
            </p>
          </div>
          <div>
            <img src={peopleImg} alt="people" />
            <h3>How to find your people</h3>
            <p>
              An adapted excerpt from Lane Moore’s You Will Find Your People:
              How to Make Meaningful Friendships as an Adult.
            </p>
          </div>
        </div>
        <div className="second-column">
          <div>
            <img src={vaccineImg} alt="vaccine" />
            <h3>
              How new vaccine technologies could reduce the massive death toll
              from malaria
            </h3>
            <p>
              There’s still a long way to go, but RNA vaccines might help in the
              fight against malaria.
            </p>
          </div>
        </div>
        <div className="third-column">
          <div>
            <img src={strikeImg} alt="strike" />
            <h3>What happens if there’s a Hollywood writers strike?</h3>
            <p>
              It’s been 15 years since the last WGA strike, and the stakes are
              far greater.
            </p>
          </div>
          <div>
            <img src={tiktokeImg} alt="tiktok" />
            <h3>How TikTok dances trained an AI to see</h3>
            <p>
              And remember the Mannequin Challenge? Yep, they used that too.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopStories;
