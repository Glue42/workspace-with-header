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
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    };

    return (
        <>
            {showPopup && <ConnectToolsPopup />}
            <div onClick={onClick} style={containerStyle}>
                <span className="icon-size-16 mx-2">
                    <i className="icon-th-large"></i>
                </span>
                <div>Connect Tools</div>
            </div>
        </>);
}

export default ConnectTools;