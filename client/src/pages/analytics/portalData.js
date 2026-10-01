/*
 * =====================================================
 * GROWell AI — MARKET INTELLIGENCE
 * =====================================================
 *
 * Reads the portal payload and prepares it for the charts.
 *
 * Kept apart from the page component on purpose. The portal sends
 * one response covering twelve crops with every mandi, district
 * and price band inside it, which is a few hundred kilobytes of
 * nested objects. Turning that into flat series, sorting it, and
 * picking the top and bottom of it is arithmetic, not rendering,
 * and keeping it here means the page only has to describe what it
 * is showing.
 *
 * Two rules run through all of it:
 *
 *   - Nothing is invented. A crop with no rows produces empty
 *     series, never a zeroed line, because a zero is a claim
 *     that the price was nothing.
 *   - Coverage travels with the numbers. Mandi counts, state
 *     counts and contributing-report counts are carried into every
 *     chart so a figure drawn from four mandis is never read the
 *     same as one drawn from four hundred.
 */

export function rupees(value) {

    if (value === null || value === undefined) {
        return "—";
    }

    return `₹${Number(value).toLocaleString("en-IN")}`;
}


export function rupeesShort(value) {

    if (value === null || value === undefined) {
        return "—";
    }

    const number = Number(value);

    if (Math.abs(number) >= 100000) {
        return `₹${(number / 100000).toFixed(2)}L`;
    }

    if (Math.abs(number) >= 1000) {
        return `₹${(number / 1000).toFixed(1)}k`;
    }

    return `₹${number}`;
}


export function tonnes(value) {

    if (!value) {
        return "—";
    }

    const number = Number(value);

    if (number >= 1000) {
        return `${(number / 1000).toFixed(1)}k t`;
    }

    return `${number.toFixed(number < 10 ? 1 : 0)} t`;
}


export function prettyDate(iso) {

    if (!iso) {
        return "—";
    }

    const date = new Date(`${iso}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
        return iso;
    }

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}


export function shortDate(iso) {

    if (!iso) {
        return "";
    }

    const date = new Date(`${iso}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
        return iso;
    }

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short"
    });
}


/** Crops that carry a usable national figure, most covered first. */
export function rankedCrops(crops = []) {

    return crops
        .filter((crop) => crop.available && crop.summary)
        .sort(
            (a, b) =>
                b.summary.mandis - a.summary.mandis
        );
}


/**
 * Price line for one crop.
 *
 * The mandis count rides along as a second series so a reader can
 * see a day that moved because three more mandis started reporting
 * rather than because the market did.
 */
export function historySeries(history = []) {

    return history.map((point) => ({
        date: point.date,
        label: shortDate(point.date),
        average: point.average,
        low: point.low,
        high: point.high,
        mandis: point.mandis
    }));
}


/** State averages, biggest coverage first so bars stay readable. */
export function stateSeries(states = [], limit = 12) {

    return states.slice(0, limit).map((state) => ({
        name: state.name,
        average: state.average,
        low: state.low,
        high: state.high,
        mandis: state.mandis,
        dispersion: state.dispersion,
        arrivals: state.arrivals || null
    }));
}


/** Arrivals by state, largest volume first. */
export function arrivalsSeries(arrivals = []) {

    return [...arrivals]
        .sort((a, b) => b.arrivals - a.arrivals)
        .map((entry) => ({
            state: entry.state,
            arrivals: entry.arrivals
        }));
}


/**
 * Price bands across the mandis.
 *
 * The bands come from the data's own low and high, which is why
 * onion and chilli can be shown on the same page: neither is being
 * forced into a rupee step that means nothing for the other.
 */
export function distributionSeries(bands = []) {

    return bands.map((band) => ({
        label: `${rupeesShort(band.from)}`,
        from: band.from,
        to: band.to,
        records: band.records,
        band: `${rupeesShort(band.from)}–${rupeesShort(band.to)}`
    }));
}


/** Mandis matching the current filters, highest first. */
export function filterMandis(mandis = [], { state, district, search }) {

    const needle = String(search || "")
        .trim()
        .toLowerCase();

    return mandis.filter((mandi) => {

        if (state && mandi.state !== state) {
            return false;
        }

        if (
            district &&
            mandi.district !== district
        ) {
            return false;
        }

        if (!needle) {
            return true;
        }

        return (
            mandi.market.toLowerCase().includes(needle) ||
            String(mandi.district || "")
                .toLowerCase()
                .includes(needle) ||
            String(mandi.state || "")
                .toLowerCase()
                .includes(needle) ||
            String(mandi.variety || "")
                .toLowerCase()
                .includes(needle)
        );
    });
}


/** The districts present in a mandi list, for the filter. */
export function districtOptions(mandis = []) {

    return [
        ...new Set(
            mandis
                .map((mandi) => mandi.district)
                .filter(Boolean)
        )
    ].sort();
}


export function stateOptions(mandis = []) {

    return [
        ...new Set(
            mandis
                .map((mandi) => mandi.state)
                .filter(Boolean)
        )
    ].sort();
}


/** Varieties ranked by the price they fetched. */
export function varietySeries(varieties = [], limit = 12) {

    return varieties.slice(0, limit).map((variety) => ({
        name: variety.name,
        average: variety.average,
        mandis: variety.mandis,
        low: variety.low,
        high: variety.high
    }));
}


/** Warns when a single figure rests on very little. */
export function isThin(summary) {

    return Boolean(summary && summary.mandis < 5);
}