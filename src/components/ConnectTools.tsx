import { useWorkspaceWindowClicked } from "@glue42/workspaces-ui-react";
import React, { CSSProperties, useEffect, useState } from "react";
import ConnectToolsPopup from "./ConnectToolsPopup";

const ConnectTools = () => {
    const [showPopup, setShowPopup] = useState(false);

    useWorkspaceWindowClicked(() => {
        setShowPopup(false);
    });

    useEffect(() => {
        const onClick = () => {
            setShowPopup(false);
        }
        document.addEventListener("click", onClick);

        return () => {
            document.removeEventListener("click", onClick);
        };
    }, []);

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setShowPopup(true);
    };

    const containerStyle: CSSProperties = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    };

    const iconStyle: CSSProperties = {
        width: "24px",
        height: "24px",
        backgroundImage: "url(./apps_white_24dp.svg)"
    };

    return (
        <>
            {showPopup && <ConnectToolsPopup />}
            <div onClick={onClick} style={containerStyle}>
                <span style={iconStyle}></span>
                <div>Connect Tools</div>
            </div>
        </>);
}

export default ConnectTools;