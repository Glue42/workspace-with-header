import React, { useState } from "react";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const style = {
        width: "140px",
        height:"25px"
    };

    return <input style={style} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type={"text"} />
};

export default SearchBar;