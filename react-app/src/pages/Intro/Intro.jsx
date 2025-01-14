import React, { useState } from "react";
import back from "../../material/intro.mp4";
import styles from "./Intro.module.scss";
import Info from "./Info"
import Team from './Team'

const Intro = () => {
  const [isStart, setIsStart] = useState(false);
  const [isTeam, setIsTeam] = useState(false);
  const [isPlayer, setIsPlayer] = useState(false);
  const [isinfo,setIsinfo] = useState(false);

  return (
    <div className={styles.videoContainer}>
      <video autoPlay loop muted className={styles.backgroundVideo}>
        <source src={back} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className={styles.content}>
        {/* Show the content based on the state */}
        {isTeam  && setIsinfo && <Team/>}
        {isPlayer  && setIsinfo && <Info/>}
 
        {!isTeam && !isPlayer && (
          <>
            {isStart ? (
              <>
                <h1>Searching... for</h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10%",
                  }}
                >
                  <button
                    className={styles.button49}
                    role="button"
                    onClick={() => {
                      setIsTeam(true);
                      setIsinfo(true);
                      setIsStart(false);
                    }}
                  >
                    Team
                  </button>
                  <button
                    className={styles.button49}
                    role="button"
                    onClick={() => {
                      setIsPlayer(true);
                      setIsinfo(true);
                      setIsStart(false);
                    }}
                  >
                    Players
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1>Welcome to Valorant Player Finder</h1>
                <button
                  className={styles.button49}
                  role="button"
                  onClick={() => setIsStart(true)}
                >
                  Click to Start
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Intro;
