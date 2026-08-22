import { useEffect, useRef, useState } from "react";
import "./Intro.css";

const slides = [
    {
        eyebrow: "Welcome to",
        title: "GroWell",
        description:
            "Your AI assistant for the field — soil, weather, yield, and market insight, in plain language.",
        duration: 2400,
        type: "brand",
    },
    {
        eyebrow: "Crop health",
        title: "Diagnose issues instantly",
        description:
            "Snap a photo of any leaf. GroWell flags blight, pests, and nutrient stress before they spread.",
        duration: 3200,
        type: "crop",
    },
    {
        eyebrow: "Weather & irrigation",
        title: "Know exactly when to water",
        description:
            "Hyperlocal forecasts mapped to every field, with irrigation windows that write themselves.",
        duration: 3200,
        type: "weather",
    },
    {
        eyebrow: "Yield forecasting",
        title: "See your harvest before it happens",
        description:
            "Model yield weeks out, updated automatically as conditions on the ground change.",
        duration: 3200,
        type: "yield",
    },
    {
        eyebrow: "Market prices",
        title: "Sell at the right moment",
        description:
            "Track grain and produce prices, and get a nudge the moment it's time to sell.",
        duration: 3200,
        type: "market",
    },
];

function BrandIcon() {
    return (
        <svg className="intro-icon" viewBox="0 0 200 200">
            <defs>
                <linearGradient
                    id="ringGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor="#5B8C4C" />
                    <stop offset="100%" stopColor="#E3A94A" />
                </linearGradient>
            </defs>

            <circle
                className="ring-track"
                cx="100"
                cy="100"
                r="86"
                fill="none"
                strokeWidth="2.5"
            />

            <circle
                className="draw-path"
                data-draw
                cx="100"
                cy="100"
                r="86"
                fill="none"
                strokeWidth="2.5"
                stroke="url(#ringGradient)"
                transform="rotate(-90 100 100)"
            />

            <path
                className="sprout-stem"
                data-draw
                stroke="var(--green)"
                strokeWidth="3"
                d="M100 164 C 97 138, 104 112, 100 86"
            />

            <path
                className="sprout-leaf"
                data-draw
                stroke="var(--gold-soft)"
                strokeWidth="2.6"
                d="M100 118 C 78 114, 60 100, 54 78 C 76 81, 93 96, 100 116"
            />

            <path
                className="sprout-leaf"
                data-draw
                stroke="var(--gold-soft)"
                strokeWidth="2.6"
                d="M100 106 C 122 101, 138 88, 144 66 C 122 69, 106 83, 100 102"
            />
        </svg>
    );
}

function CropIcon() {
    return (
        <svg className="intro-icon" viewBox="0 0 160 160">
            <path
                data-draw
                fill="none"
                stroke="var(--green)"
                strokeWidth="2.4"
                strokeLinejoin="round"
                d="M80 132 C 40 129, 21 96, 26 59 C 63 63, 97 90, 101 128 C 95 131, 87 132, 80 132 Z"
            />

            <path
                data-draw
                fill="none"
                stroke="var(--gold-soft)"
                strokeWidth="1.8"
                strokeLinecap="round"
                d="M39 69 C 55 85, 76 106, 96 123"
            />

            <line
                data-draw
                x1="24"
                y1="52"
                x2="112"
                y2="52"
                stroke="var(--teal)"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

function WeatherIcon() {
    return (
        <svg className="intro-icon" viewBox="0 0 160 160">
            <path
                data-draw
                fill="none"
                stroke="var(--parchment)"
                strokeWidth="2.2"
                strokeLinejoin="round"
                d="M40 96 C 26 96, 16 86, 16 74 C 16 62, 26 54, 37 54 C 40 40, 54 30, 70 30 C 88 30, 102 42, 104 58 C 118 60, 128 70, 128 84 C 128 96, 118 106, 104 106 L 46 106 C 42 106, 40 101, 40 96 Z"
            />

            <path
                data-draw
                fill="none"
                stroke="var(--teal)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M80 112 C 88 122, 94 130, 94 138 A 14 14 0 1 1 66 138 C 66 130, 72 122, 80 112 Z"
            />
        </svg>
    );
}

function YieldIcon() {
    return (
        <svg className="intro-icon" viewBox="0 0 160 160">
            <line
                x1="20"
                y1="130"
                x2="140"
                y2="130"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1.6"
            />

            <rect
                data-grow
                x="30"
                y="90"
                width="16"
                height="40"
                rx="3"
                fill="var(--green)"
            />

            <rect
                data-grow
                x="58"
                y="70"
                width="16"
                height="60"
                rx="3"
                fill="var(--gold)"
            />

            <rect
                data-grow
                x="86"
                y="50"
                width="16"
                height="80"
                rx="3"
                fill="var(--green)"
            />

            <rect
                data-grow
                x="114"
                y="34"
                width="16"
                height="96"
                rx="3"
                fill="var(--gold-soft)"
            />
        </svg>
    );
}

function MarketIcon() {
    return (
        <svg className="intro-icon" viewBox="0 0 160 160">
            <path
                data-draw
                fill="none"
                stroke="var(--gold-soft)"
                strokeWidth="2.4"
                strokeLinejoin="round"
                strokeLinecap="round"
                d="M30 42 L30 76 L98 130 L130 98 L78 32 Z"
            />

            <circle
                data-draw
                cx="46"
                cy="48"
                r="7"
                fill="none"
                stroke="var(--gold-soft)"
                strokeWidth="2"
            />

            <path
                data-draw
                fill="none"
                stroke="var(--green)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M50 100 L70 80 L92 92 L114 60"
            />

            <path
                data-draw
                fill="none"
                stroke="var(--green)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M100 60 L114 60 L114 74"
            />
        </svg>
    );
}

function SlideIcon({ type }) {
    if (type === "brand") return <BrandIcon />;
    if (type === "crop") return <CropIcon />;
    if (type === "weather") return <WeatherIcon />;
    if (type === "yield") return <YieldIcon />;
    return <MarketIcon />;
}

function Intro({ onFinish }) {
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);
    const [finished, setFinished] = useState(false);

    const startTimeRef = useRef(null);
    const animationFrameRef = useRef(null);

    const prefersReducedMotion = useRef(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    const finishIntro = () => {
        if (finished) return;

        setFinished(true);

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        localStorage.setItem("growell_intro_seen", "true");

        setTimeout(() => {
            onFinish();
        }, 700);
    };

    const activateSlide = (index) => {
        const safeIndex = Math.max(
            0,
            Math.min(index, slides.length - 1)
        );

        setCurrent(safeIndex);
        setProgress(0);
        startTimeRef.current = null;
    };

    const goNext = () => {
        if (current < slides.length - 1) {
            activateSlide(current + 1);
        } else {
            finishIntro();
        }
    };

    const goPrevious = () => {
        if (current > 0) {
            activateSlide(current - 1);
        }
    };

    useEffect(() => {
        if (finished) return;

        const duration = prefersReducedMotion.current
            ? 450
            : slides[current].duration;

        const tick = (timestamp) => {
            if (!startTimeRef.current) {
                startTimeRef.current = timestamp;
            }

            const elapsed =
                timestamp - startTimeRef.current;

            const percentage = Math.min(
                elapsed / duration,
                1
            );

            setProgress(percentage * 100);

            if (percentage >= 1) {
                if (current < slides.length - 1) {
                    activateSlide(current + 1);
                } else {
                    finishIntro();
                }

                return;
            }

            animationFrameRef.current =
                requestAnimationFrame(tick);
        };

        animationFrameRef.current =
            requestAnimationFrame(tick);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(
                    animationFrameRef.current
                );
            }
        };
    }, [current, finished]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (finished) return;

            if (
                event.key === "ArrowRight" ||
                event.key === " "
            ) {
                event.preventDefault();
                goNext();
            }

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                goPrevious();
            }

            if (event.key === "Escape") {
                event.preventDefault();
                finishIntro();
            }
        };

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [current, finished]);

    useEffect(() => {
        const slide = document.querySelector(
            `.intro-slide[data-slide="${current}"]`
        );

        if (!slide) return;

        const icon = slide.querySelector(
            ".intro-icon"
        );

        if (!icon) return;

        const drawables = [
            ...icon.querySelectorAll("[data-draw]"),
        ];

        drawables.forEach((element, index) => {
            let length = 0;

            try {
                length = element.getTotalLength();
            } catch {
                length = 0;
            }

            element.style.strokeDasharray = length;
            element.style.strokeDashoffset = length;

            if (
                prefersReducedMotion.current ||
                !element.animate
            ) {
                element.style.strokeDashoffset = 0;
                return;
            }

            element.animate(
                [
                    {
                        strokeDashoffset: length,
                    },
                    {
                        strokeDashoffset: 0,
                    },
                ],
                {
                    duration: 820,
                    delay: index * 100,
                    easing:
                        "cubic-bezier(.22,.61,.36,1)",
                    fill: "forwards",
                }
            );
        });

        const growables = [
            ...icon.querySelectorAll("[data-grow]"),
        ];

        growables.forEach((element, index) => {
            element.style.transform = "scaleY(0)";
            element.style.transformOrigin =
                "50% 100%";

            if (
                prefersReducedMotion.current ||
                !element.animate
            ) {
                element.style.transform = "scaleY(1)";
                return;
            }

            element.animate(
                [
                    {
                        transform: "scaleY(0)",
                    },
                    {
                        transform: "scaleY(1)",
                    },
                ],
                {
                    duration: 620,
                    delay: 200 + index * 120,
                    easing:
                        "cubic-bezier(.22,.61,.36,1)",
                    fill: "forwards",
                }
            );
        });
    }, [current]);

    return (
        <div
            className={`growell-intro ${
                finished ? "intro--done" : ""
            }`}
        >
            <div className="intro-grain" />

            <div className="intro-ambient">
                <div className="intro-blob intro-blob-1" />
                <div className="intro-blob intro-blob-2" />
                <div className="intro-blob intro-blob-3" />
            </div>

            <div className="intro-topbar">
                <div className="intro-progress">
                    {slides.map((_, index) => (
                        <div
                            className="intro-segment"
                            key={index}
                        >
                            <span
                                className="intro-segment-fill"
                                style={{
                                    width:
                                        index < current
                                            ? "100%"
                                            : index === current
                                            ? `${progress}%`
                                            : "0%",
                                }}
                            />
                        </div>
                    ))}
                </div>

                <div className="intro-topbar-row">
                    <span className="intro-counter">
                        {String(current + 1).padStart(2, "0")}{" "}
                        /{" "}
                        {String(slides.length).padStart(
                            2,
                            "0"
                        )}
                    </span>

                    <button
                        className="intro-skip"
                        onClick={finishIntro}
                    >
                        Skip intro
                    </button>
                </div>
            </div>

            <button
                className="intro-tap-zone intro-tap-left"
                onClick={goPrevious}
                aria-label="Previous slide"
            />

            <button
                className="intro-tap-zone intro-tap-right"
                onClick={goNext}
                aria-label="Next slide"
            />

            <div className="intro-slides">
                {slides.map((slide, index) => (
                    <div
                        key={slide.type}
                        className={`intro-slide ${
                            index === current
                                ? "is-active"
                                : ""
                        } ${
                            slide.type === "brand"
                                ? "intro-slide--brand"
                                : ""
                        }`}
                        data-slide={index}
                    >
                        <div
                            className={`intro-icon-wrap ${
                                slide.type === "brand"
                                    ? "intro-icon-wrap--lg"
                                    : ""
                            }`}
                        >
                            <SlideIcon
                                type={slide.type}
                            />
                        </div>

                        <div className="intro-eyebrow">
                            {slide.eyebrow}
                        </div>

                        <h2 className="intro-title">
                            {slide.title}
                        </h2>

                        <p className="intro-desc">
                            {slide.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Intro;