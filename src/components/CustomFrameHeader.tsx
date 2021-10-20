import { CloseFrameButton, MaximizeFrameButton, MinimizeFrameButton, MoveArea } from "@glue42/workspaces-ui-react";
import React, { CSSProperties } from "react";
import ConnectTools from "./ConnectTools";
import SearchBarPopup from "./SearchBarPopup";

const CustomFrameHeader = () => {
    const headerStyle: CSSProperties = {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems:"center"
    };

    const moveAreaStyle = {
        height: "100%",
        flexGrow: 1
    };

    return <div style={headerStyle}>
        <ConnectTools />
        <MoveArea style={moveAreaStyle} />
        <SearchBarPopup />
        <ul className="lm_controls">
            <MinimizeFrameButton />
            <MaximizeFrameButton />
            <CloseFrameButton />
        </ul>

    </div>;
}

export default CustomFrameHeader;