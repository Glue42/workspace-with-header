import React from "react";
import { WorkspacePopup } from "@glue42/workspaces-ui-react";
import SearchBar from "./SearchBar";

class SearchBarPopup extends React.Component {
    render() {
        const popupRef = React.createRef() as React.RefObject<any>;
        return <WorkspacePopup innerContentStyle={{ height: 300 }} arrow={false} popupRef={popupRef} trigger={SearchBar}>
            <div className="bg-base p-1 py-3" style={{ width: "140px", height:"200px" }}>
                This is a dropdown
            </div>
        </WorkspacePopup>
    }
};

export default SearchBarPopup;