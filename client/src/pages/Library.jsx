
import { useMemo, useState } from "react";

import {
    Search,
    BookOpen,
    Bug,
    Leaf,
    FlaskConical,
    X,
    ChevronRight,
    Sprout,
    CloudRain,
    ShieldCheck,
    AlertTriangle,
    Microscope,
    RotateCcw,
    CheckCircle2
} from "lucide-react";

import libraryData from "../data/libraryData";

import "./Library.css";


export default function Library() {

    /* =========================================
       STATE
    ========================================= */

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("All");

    const [selectedCrop, setSelectedCrop] = useState("All");

    const [selectedEntry, setSelectedEntry] = useState(null);


    /* =========================================
       TYPE FILTER
    ========================================= */

    const categories = [
        "All",
        "Disease",
        "Pest",
        "Nutrient Disorder"
    ];


    /* =========================================
       AUTOMATIC CROP LIST
    ========================================= */

    const crops = useMemo(() => {

        const uniqueCrops = [
            ...new Set(
                libraryData
                    .map(entry => entry.crop)
                    .filter(Boolean)
            )
        ];

        return [
            "All",
            ...uniqueCrops.sort((a, b) =>
                a.localeCompare(b)
            )
        ];

    }, []);


    /* =========================================
       FILTER DATA
    ========================================= */

    const filteredData = useMemo(() => {

        const query =
            search.trim().toLowerCase();

        return libraryData.filter(entry => {

            const cropMatch =
                selectedCrop === "All" ||
                entry.crop === selectedCrop;


            const categoryMatch =
                category === "All" ||
                entry.category === category;


            if (!query) {

                return (
                    cropMatch &&
                    categoryMatch
                );

            }


            const searchableText = [

                entry.name,

                entry.crop,

                entry.category,

                entry.scientificName,

                ...(entry.aliases || []),

                ...(entry.affectedParts || []),

                ...(entry.symptoms || []),

                ...(entry.fieldIdentification || []),

                ...(entry.favourableConditions || []),

                ...(entry.keywords || [])

            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();


            const searchMatch =
                searchableText.includes(query);


            return (
                cropMatch &&
                categoryMatch &&
                searchMatch
            );

        });

    }, [
        search,
        category,
        selectedCrop
    ]);


    /* =========================================
       ICON
    ========================================= */

    function getIcon(type) {

        if (type === "Pest") {

            return (
                <Bug size={21} />
            );

        }


        if (type === "Nutrient Disorder") {

            return (
                <FlaskConical size={21} />
            );

        }


        return (
            <Leaf size={21} />
        );

    }


    /* =========================================
       SAFE ARRAY
    ========================================= */

    function safeArray(value) {

        if (!value) {
            return [];
        }

        if (Array.isArray(value)) {
            return value;
        }

        return [];

    }


    /* =========================================
       DETAIL SECTION
    ========================================= */

    function DetailSection({
        icon,
        title,
        children
    }) {

        return (

            <section className="library-detail-section">

                <div className="library-detail-title">

                    <div className="library-detail-title-icon">
                        {icon}
                    </div>

                    <h3>
                        {title}
                    </h3>

                </div>

                {children}

            </section>

        );

    }


    /* =========================================
       DETAIL LIST
    ========================================= */

    function DetailList({ items }) {

        const list = safeArray(items);

        if (list.length === 0) {
            return null;
        }

        return (

            <ul className="library-detail-list">

                {list.map((item, index) => (

                    <li key={index}>

                        <span className="library-list-dot">
                            •
                        </span>

                        <span>
                            {item}
                        </span>

                    </li>

                ))}

            </ul>

        );

    }


    /* =========================================
       MANAGEMENT SECTION
    ========================================= */

    function ManagementSection({
        title,
        icon,
        items
    }) {

        const list = safeArray(items);

        if (list.length === 0) {
            return null;
        }

        return (

            <div className="library-management-block">

                <div className="library-management-heading">

                    {icon}

                    <span>
                        {title}
                    </span>

                </div>

                <DetailList items={list} />

            </div>

        );

    }


    /* =========================================
       CLOSE MODAL
    ========================================= */

    function closeModal() {

        setSelectedEntry(null);

    }


    /* =========================================
       MAIN UI
    ========================================= */

    return (

        <div className="library-page">


            {/* =====================================
                HEADER
            ===================================== */}

            <header className="library-header">

                <div>

                    <span className="library-eyebrow">
                        GROWELL KNOWLEDGE
                    </span>

                    <h1>
                        Field Library
                    </h1>

                    <p>
                        Agricultural knowledge for
                        crop diseases, pests and disorders.
                    </p>

                </div>


                <div className="library-offline">

                    <span className="offline-dot"></span>

                    OFFLINE LIBRARY

                </div>

            </header>


            {/* =====================================
                SEARCH & FILTERS
            ===================================== */}

            <section className="library-search-area">


                {/* SEARCH */}

                <div className="library-search">

                    <Search size={20} />

                    <input
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }

                        placeholder="Search crop, disease, pest or disorder..."
                    />


                    {search && (

                        <button
                            onClick={() =>
                                setSearch("")
                            }
                        >

                            <X size={18} />

                        </button>

                    )}

                </div>


                {/* =================================
                    CROP FILTER
                ================================= */}

                <div className="library-filter-section">

                    <div className="library-filter-label">

                        <Sprout size={14} />

                        <span>
                            CROP
                        </span>

                    </div>


                    <div className="library-filters">

                        {crops.map(crop => (

                            <button
                                key={crop}

                                className={
                                    selectedCrop === crop
                                        ? "library-filter active"
                                        : "library-filter"
                                }

                                onClick={() =>
                                    setSelectedCrop(crop)
                                }
                            >

                                {crop}

                            </button>

                        ))}

                    </div>

                </div>


                {/* =================================
                    TYPE FILTER
                ================================= */}

                <div className="library-filter-section">

                    <div className="library-filter-label">

                        <Leaf size={14} />

                        <span>
                            TYPE
                        </span>

                    </div>


                    <div className="library-filters">

                        {categories.map(item => (

                            <button
                                key={item}

                                className={
                                    category === item
                                        ? "library-filter active"
                                        : "library-filter"
                                }

                                onClick={() =>
                                    setCategory(item)
                                }
                            >

                                {item}

                            </button>

                        ))}

                    </div>

                </div>

            </section>


            {/* =====================================
                STATISTICS
            ===================================== */}

            <div className="library-stats">


                {/* ENTRIES */}

                <div className="library-stat">

                    <BookOpen size={20} />

                    <div>

                        <strong>
                            {libraryData.length}
                        </strong>

                        <span>
                            Knowledge Entries
                        </span>

                    </div>

                </div>


                {/* CROPS */}

                <div className="library-stat">

                    <Sprout size={20} />

                    <div>

                        <strong>
                            {
                                new Set(
                                    libraryData.map(
                                        item => item.crop
                                    )
                                ).size
                            }
                        </strong>

                        <span>
                            Crop Groups
                        </span>

                    </div>

                </div>


                {/* OFFLINE */}

                <div className="library-stat">

                    <ShieldCheck size={20} />

                    <div>

                        <strong>
                            Offline
                        </strong>

                        <span>
                            No internet required
                        </span>

                    </div>

                </div>

            </div>


            {/* =====================================
                RESULTS
            ===================================== */}

            <section className="library-results">


                <div className="library-results-heading">

                    <div>

                        <span>
                            KNOWLEDGE BASE
                        </span>

                        <h2>
                            Agricultural Field Guide
                        </h2>

                    </div>


                    <span>
                        {filteredData.length} results
                    </span>

                </div>


                {/* NO RESULTS */}

                {filteredData.length === 0 ? (

                    <div className="library-empty">

                        <Search size={34} />

                        <h3>
                            No knowledge entry found
                        </h3>

                        <p>
                            Try another crop, disease,
                            pest or disorder.
                        </p>

                    </div>

                ) : (


                    /* =================================
                       CARDS
                    ================================= */

                    <div className="library-grid">

                        {filteredData.map(entry => (

                            <button
                                className="library-card"

                                key={entry.id}

                                onClick={() =>
                                    setSelectedEntry(entry)
                                }
                            >


                                {/* CARD TOP */}

                                <div className="library-card-top">

                                    <div className="library-card-icon">

                                        {getIcon(
                                            entry.category
                                        )}

                                    </div>

                                    <span>
                                        {entry.category}
                                    </span>

                                </div>


                                {/* CARD CONTENT */}

                                <div className="library-card-content">

                                    <small>
                                        {entry.crop}
                                    </small>

                                    <h3>
                                        {entry.name}
                                    </h3>


                                    {entry.scientificName && (

                                        <p className="scientific-name">

                                            {entry.scientificName}

                                        </p>

                                    )}

                                </div>


                                {/* CARD FOOTER */}

                                <div className="library-card-footer">

                                    <span>
                                        View field guide
                                    </span>

                                    <ChevronRight size={17} />

                                </div>

                            </button>

                        ))}

                    </div>

                )}

            </section>


            {/* =====================================
                DETAIL MODAL
            ===================================== */}

            {selectedEntry && (

                <div
                    className="library-modal-backdrop"

                    onClick={closeModal}
                >


                    <div
                        className="library-modal"

                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >


                        {/* CLOSE */}

                        <button
                            className="library-modal-close"

                            onClick={closeModal}
                        >

                            <X size={20} />

                        </button>


                        {/* =================================
                            MODAL HEADER
                        ================================= */}

                        <div className="library-modal-header">


                            <div className="library-modal-icon">

                                {getIcon(
                                    selectedEntry.category
                                )}

                            </div>


                            <div>

                                <span>
                                    {selectedEntry.category}
                                </span>

                                <h2>
                                    {selectedEntry.name}
                                </h2>

                                <p>
                                    {selectedEntry.crop}
                                </p>

                            </div>

                        </div>


                        {/* =================================
                            SCIENTIFIC NAME
                        ================================= */}

                        {selectedEntry.scientificName && (

                            <div className="library-scientific">

                                <span>
                                    Scientific name
                                </span>

                                <strong>
                                    {selectedEntry.scientificName}
                                </strong>

                            </div>

                        )}


                        {/* =================================
                            ALIASES
                        ================================= */}

                        {safeArray(
                            selectedEntry.aliases
                        ).length > 0 && (

                            <div className="library-aliases">

                                <span>
                                    Also known as
                                </span>


                                <div>

                                    {selectedEntry.aliases.map(
                                        (alias, index) => (

                                            <span
                                                key={index}
                                                className="library-alias"
                                            >
                                                {alias}
                                            </span>

                                        )
                                    )}

                                </div>

                            </div>

                        )}


                        {/* =================================
                            AFFECTED PARTS
                        ================================= */}

                        {safeArray(
                            selectedEntry.affectedParts
                        ).length > 0 && (

                            <DetailSection
                                icon={
                                    <Sprout size={17} />
                                }

                                title="Affected Plant Parts"
                            >

                                <div className="library-tag-list">

                                    {selectedEntry.affectedParts.map(
                                        (part, index) => (

                                            <span key={index}>
                                                {part}
                                            </span>

                                        )
                                    )}

                                </div>

                            </DetailSection>

                        )}


                        {/* =================================
                            SYMPTOMS
                        ================================= */}

                        <DetailSection
                            icon={
                                <AlertTriangle size={17} />
                            }

                            title="Symptoms"
                        >

                            <DetailList
                                items={
                                    selectedEntry.symptoms
                                }
                            />

                        </DetailSection>


                        {/* =================================
                            FIELD IDENTIFICATION
                        ================================= */}

                        <DetailSection
                            icon={
                                <Microscope size={17} />
                            }

                            title="Field Identification"
                        >

                            <DetailList
                                items={
                                    selectedEntry.fieldIdentification
                                }
                            />

                        </DetailSection>


                        {/* =================================
                            CONDITIONS
                        ================================= */}

                        <DetailSection
                            icon={
                                <CloudRain size={17} />
                            }

                            title="Favourable Conditions"
                        >

                            <DetailList
                                items={
                                    selectedEntry.favourableConditions
                                }
                            />

                        </DetailSection>


                        {/* =================================
                            SPREAD
                        ================================= */}

                        <DetailSection
                            icon={
                                <RotateCcw size={17} />
                            }

                            title="Spread & Transmission"
                        >

                            <DetailList
                                items={
                                    selectedEntry.spread
                                }
                            />

                        </DetailSection>


                        {/* =================================
                            RISK FACTORS
                        ================================= */}

                        <DetailSection
                            icon={
                                <AlertTriangle size={17} />
                            }

                            title="Risk Factors"
                        >

                            <DetailList
                                items={
                                    selectedEntry.riskFactors
                                }
                            />

                        </DetailSection>


                        {/* =================================
                            SIMILAR PROBLEMS
                        ================================= */}

                        <DetailSection
                            icon={
                                <Search size={17} />
                            }

                            title="Similar Problems"
                        >

                            <DetailList
                                items={
                                    selectedEntry.similarProblems
                                }
                            />

                        </DetailSection>


                        {/* =================================
                            MANAGEMENT
                        ================================= */}

                        {selectedEntry.management && (

                            <DetailSection
                                icon={
                                    <ShieldCheck size={17} />
                                }

                                title="Management"
                            >


                                <ManagementSection
                                    title="Cultural Management"

                                    icon={
                                        <Sprout size={16} />
                                    }

                                    items={
                                        selectedEntry.management.cultural
                                    }
                                />


                                <ManagementSection
                                    title="Biological Management"

                                    icon={
                                        <Leaf size={16} />
                                    }

                                    items={
                                        selectedEntry.management.biological
                                    }
                                />


                                <ManagementSection
                                    title="Chemical Management"

                                    icon={
                                        <FlaskConical size={16} />
                                    }

                                    items={
                                        selectedEntry.management.chemical
                                    }
                                />

                            </DetailSection>

                        )}


                        {/* =================================
                            PREVENTION
                        ================================= */}

                        <DetailSection
                            icon={
                                <CheckCircle2 size={17} />
                            }

                            title="Prevention"
                        >

                            <DetailList
                                items={
                                    selectedEntry.prevention
                                }
                            />

                        </DetailSection>


                        {/* =================================
                            FIELD NOTES
                        ================================= */}

                        <DetailSection
                            icon={
                                <BookOpen size={17} />
                            }

                            title="Important Field Notes"
                        >

                            <DetailList
                                items={
                                    selectedEntry.fieldNotes
                                }
                            />

                        </DetailSection>


                        {/* =================================
                            REFERENCES
                        ================================= */}

                        <DetailSection
                            icon={
                                <BookOpen size={17} />
                            }

                            title="References"
                        >

                            <DetailList
                                items={
                                    selectedEntry.references
                                }
                            />

                        </DetailSection>


                    </div>

                </div>

            )}

        </div>

    );

}

