# Workspaces with header example
The project demonstrates a basic Workspaces react app which has pinned tabs, a custom header and illustrates the two approaches of adding Windows 7 compatible popups.
## Prerequisites
- Glue42 Desktop **3.14** or newer
- `@glue42/workspaces-ui-react` **1.7.3** or newer
- A workspace layout named **"Home"**
- A workspace layout named **"Start of day"**

## Setup
To save the two layouts mentioned in the prerequisites:
- Start Glue42 Desktop and open **Workspaces UI**
- Add your desired apps for **"Home"**
- Click on the save icon located in the workspace tab
- Save the layout with the name **"Home"**
- Repeat for **"Docs"**

To use the custom frame in Glue42 Desktop:
- Start by cloning the repository - `git clone https://github.com/Glue42/workspace-with-header.git`
- Install the dependencies - `npm install`
- Start the development server - `npm start`
- Go to the installation folder of Glue42 Desktop and find `workspaces.json`
- Replace the workspaces-demo definition with the one in the repository - **./workspaces.json**
- Start Glue42 Desktop and start the Workspaces UI application

## Components of the frame
The application consists of <Workspaces/> and a custom header which contains a popup that is not managed by `@glue42/workspaces-ui-react` and uses the `useWorkspacePopup()` hook to achieve Windows 7 compatibility. Also the header has a `<MoveArea/>` component which enables the user to change the area with which you can drag your frame and a <SearchBar/> which uses the second approach for a Windows 7 compatible popup in Workspaces (it uses  the `<WorkspacesPopup/>` component).

As well as the customized elements the frame also has an example for pinned tabs. On the left side you will be able to see two icons which represent two pinned workspaces - `"Home"` and `"Docs"`.
