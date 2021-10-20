import React from "react";
import { WorkspacePopup } from "@glue42/workspaces-ui-react";
import SearchBar from "./SearchBar";

class SearchBarPopup extends React.Component {
    render() {
        const popupRef = React.createRef() as React.RefObject<any>;
        return <WorkspacePopup innerContentStyle={{ height: 300 }} arrow={false} popupRef={popupRef} trigger={SearchBar}>
            <div style={{ backgroundColor: "white", width:"140px" }}>This is a dropdown</div>
        </WorkspacePopup>
    }
};

export default SearchBarPopup;