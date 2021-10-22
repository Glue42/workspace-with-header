import { useWorkspacePopup } from "@glue42/workspaces-ui-react";
import React, { CSSProperties } from "react";

const ConnectToolsPopup = () => {

    const ref = React.createRef<HTMLDivElement>();

    const popupWidth = 200;
    const popupHeight = 200;
    const popupTop = 30;
    const popupLeft = 5;

    const popupStyle: CSSProperties = {
        top: popupTop,
        left: popupLeft,
        width: popupWidth,
        height: popupHeight,
        zIndex: 200,        
    }

    useWorkspacePopup(ref);

    return (<div className="bg-base p-3 position-absolute" ref={ref} style={popupStyle}>
        Sample popup which is not managed by @glue42/workspaces-ui-react.
    </div>)
}

export default ConnectToolsPopup;