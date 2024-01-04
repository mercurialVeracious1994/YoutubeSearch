import React, { useState, useCallback, useEffect } from "react";
import "./style.scss";
import useSearchVideos from "../../hooks/useSearchVideos";
import SearchResults from "../searchResults/searchResults";
import { debounce } from "../../utils/helper";

function SearchInput() {
    const [query, setQuery] = useState("");
    const [pageNum, setPageNum] = useState(1);
    const { isLoading, error, videos } = useSearchVideos(query, pageNum);

    const handleScroll = async () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight 
        ) {
            setPageNum((prev) => prev + 1);
        }
    };
    const debouncedhandleScroll = useCallback(debounce(handleScroll, 500), [handleScroll]);

    useEffect(() => {
        window.addEventListener("scroll", debouncedhandleScroll);
        return () => window.removeEventListener("scroll", debouncedhandleScroll);
    }, [debouncedhandleScroll]);

    const handleChange = (e) => {
        setQuery(e.target.value);
        setPageNum(1);
    };

    const debouncedChangeHandler = useCallback(debounce(handleChange, 300), [handleChange]);

    return (
        <section className="container">
            <input
                type="text"
                onChange={debouncedChangeHandler}
                placeholder="Search youtube videos"
                className="search-input"
                data-testid = "search-input"
            />
            <SearchResults videos={videos} />
            {isLoading && <p>Loading search results...</p>}
            {error && <p>Results can not be shown due to some Error</p>}
        </section>
    );
}
export default SearchInput;
