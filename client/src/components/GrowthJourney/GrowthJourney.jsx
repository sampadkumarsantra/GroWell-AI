
import { useEffect, useMemo, useState } from "react";
import "./GrowthJourney.css";

const STORAGE_KEY = "growell-growth";

const MAX_POINTS = 220;

const STAGES = [
    // First 5 stages — gap of 10
    {
        points: 0,
        name: "Seed",
        emoji: "🌰",
        line: "Every great harvest begins with a question."
    },
    {
        points: 10,
        name: "Germination",
        emoji: "🌱",
        line: "Knowledge is beginning to take root."
    },
    {
        points: 20,
        name: "First Shoot",
        emoji: "🌱",
        line: "A little knowledge, a new beginning."
    },
    {
        points: 30,
        name: "Seedling",
        emoji: "🌿",
        line: "Your farming wisdom is taking root."
    },
    {
        points: 40,
        name: "Young Plant",
        emoji: "🌿",
        line: "Keep learning. Keep growing."
    },

    // Next 4 stages — gap of 20
    {
        points: 50,
        name: "Growing Plant",
        emoji: "🌿",
        line: "Every insight makes your farm stronger."
    },
    {
        points: 70,
        name: "Strong Plant",
        emoji: "🌿",
        line: "Your knowledge is becoming your strength."
    },
    {
        points: 90,
        name: "Mature Plant",
        emoji: "🌳",
        line: "Smart decisions grow stronger farms."
    },
    {
        points: 110,
        name: "Budding",
        emoji: "🌿",
        line: "Your efforts are beginning to bear promise."
    },

    // Final stages — gap of 30
    {
        points: 130,
        name: "Flowering",
        emoji: "🌸",
        line: "Knowledge is blooming into possibility."
    },
    {
        points: 160,
        name: "Fruit Formation",
        emoji: "🍎",
        line: "Good decisions are becoming results."
    },
    {
        points: 190,
        name: "Fruit Development",
        emoji: "🍎",
        line: "Your learning is turning into a better harvest."
    },
    {
        points: 220,
        name: "Harvest Ready",
        emoji: "🌳",
        line: "You planted knowledge. Now harvest the possibilities."
    }
];

/* =========================================================
   LOAD GROWTH POINTS
   ========================================================= */

function loadGrowthPoints() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return 0;
        }

        const data = JSON.parse(saved);

        return Math.min(
            Number(data.searches) || 0,
            MAX_POINTS
        );
    } catch (error) {
        console.error(
            "GROWTH LOAD ERROR:",
            error
        );

        return 0;
    }
}

/* =========================================================
   GROWTH JOURNEY
   ========================================================= */

function GrowthJourney() {

    const [points, setPoints] = useState(
        loadGrowthPoints
    );

    /* =====================================================
       FIND CURRENT STAGE
       ===================================================== */

    const stageIndex = useMemo(() => {

        let index = 0;

        STAGES.forEach((stage, i) => {

            if (points >= stage.points) {
                index = i;
            }

        });

        return index;

    }, [points]);

    const currentStage = STAGES[stageIndex];

    const nextStage =
        STAGES[stageIndex + 1];

    /* =====================================================
       LISTEN FOR REAL-TIME GROWTH UPDATES
       ===================================================== */

    useEffect(() => {

        function handleGrowthUpdate(event) {

            const updatedSearches =
                Number(event.detail?.searches);

            if (
                Number.isFinite(
                    updatedSearches
                )
            ) {

                setPoints(
                    Math.min(
                        updatedSearches,
                        MAX_POINTS
                    )
                );

            } else {

                setPoints(
                    loadGrowthPoints()
                );

            }

        }

        window.addEventListener(
            "growell:growth-update",
            handleGrowthUpdate
        );

        /* =================================================
           LOCAL STORAGE SYNCHRONIZATION
           ================================================= */

        function handleStorageChange(event) {

            if (
                event.key === STORAGE_KEY
            ) {

                setPoints(
                    loadGrowthPoints()
                );

            }

        }

        window.addEventListener(
            "storage",
            handleStorageChange
        );

        return () => {

            window.removeEventListener(
                "growell:growth-update",
                handleGrowthUpdate
            );

            window.removeEventListener(
                "storage",
                handleStorageChange
            );

        };

    }, []);

    /* =====================================================
       CALCULATE PROGRESS
       ===================================================== */

    const progress = nextStage
        ? Math.min(
              100,
              Math.max(
                  0,
                  (
                      (points -
                          currentStage.points) /
                      (
                          nextStage.points -
                          currentStage.points
                      )
                  ) * 100
              )
          )
        : 100;

    /* =====================================================
       ACTIONS NEEDED
       ===================================================== */

    const actionsNeeded = nextStage
        ? Math.max(
              0,
              nextStage.points - points
          )
        : 0;

    /* =====================================================
       RENDER
       ===================================================== */

    return (
        <div className="growth-journey">

            {/* =================================================
                HEADER
               ================================================= */}

            <div className="growth-header">

                <div>

                    <span className="growth-kicker">
                        GROWELL JOURNEY
                    </span>

                    <h3>
                        Grow your farm tree
                    </h3>

                </div>

                <span className="growth-points">
                    {points}
                </span>

            </div>


            {/* =================================================
                PLANT + MOTIVATIONAL MESSAGE
               ================================================= */}

            <div className="plant-stage">

                {/* Motivational line ABOVE plant */}

                <div
                    className="growth-line"
                    key={`line-${stageIndex}`}
                >
                    {currentStage.line}
                </div>


                {/* Plant glow */}

                <div className="plant-glow"></div>


                {/* Growing plant */}

                <div
                    className={`plant-visual stage-${stageIndex}`}
                    key={`plant-${stageIndex}`}
                >
                    {currentStage.emoji}
                </div>

            </div>


            {/* =================================================
                CURRENT STAGE
               ================================================= */}

            <div className="growth-info">

                <strong className="growth-stage-name">
                    {currentStage.name}
                </strong>


                {nextStage ? (

                    <span className="growth-actions">

                        {actionsNeeded === 1
                            ? "1 more action"
                            : `${actionsNeeded} more actions`
                        }

                    </span>

                ) : (

                    <span className="growth-actions">
                        Journey complete 🎉
                    </span>

                )}

            </div>


            {/* =================================================
                PROGRESS BAR
               ================================================= */}

            <div className="growth-progress">

                <div
                    className="growth-progress-fill"
                    style={{
                        width: `${progress}%`
                    }}
                />

            </div>


            {/* =================================================
                FOOTER
               ================================================= */}

            <div className="growth-footer">

                <span>
                    {points} / {MAX_POINTS}
                </span>

                <span>

                    {nextStage
                        ? nextStage.name
                        : "Harvest Ready"
                    }

                </span>

            </div>

        </div>
    );
}

export default GrowthJourney;
