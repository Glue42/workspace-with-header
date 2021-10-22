import React, { useContext, useEffect, useState } from 'react';
import Workspaces, { getFrameId } from "@glue42/workspaces-ui-react";
import "@glue42/workspaces-ui-react/dist/styles/popups.css";
import "@glue42/workspaces-ui-react/dist/styles/goldenlayout-base.css";
import "@glue42/workspaces-ui-react/dist/styles/glue42-theme.css";
import "@glue42/workspaces-ui-react/dist/styles/t42bootstrap.bundle.css";
import "./index.css";
import { GlueContext } from '@glue42/react-hooks';
import CustomFrameHeader from './components/CustomFrameHeader';
import { Glue42 } from '@glue42/desktop';
import { Glue42Workspaces } from '@glue42/workspaces-api';
import "@glue42/theme/dist/components/icons.css"

const App = () => {
	(window as any).glue = useContext(GlueContext);
	const [homeWorkspace, setHomeWorkspace] = useState<Glue42Workspaces.Workspace | undefined>(undefined);
	const [docsWorkspace, setDocsWorkspace] = useState<Glue42Workspaces.Workspace | undefined>(undefined);
	const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | undefined>("");

	const waitForMyFrame = (glue: Glue42.Glue) => {
		const myFrameId = getFrameId();
		return new Promise<Glue42Workspaces.Frame>((res, rej) => {
			let unsub = () => { };
			glue.workspaces!.onFrameOpened((f) => {
				if (f.id === myFrameId) {
					res(f);
					unsub();
				}
			}).then((u) => {
				unsub = u;
				return glue.workspaces!.getAllFrames()
			}).then((frames) => {
				const myFrame = frames.find((f) => f.id === myFrameId);
				if (myFrame) {
					res(myFrame);
					unsub();
				}
			}).catch(rej);
		});
	};

	// Getting the workspace if it has been opened from the workspaces.json
	// or restoring the layout
	const findOrOpenPinnedWorkspace = (layoutName: string, myFrame: Glue42Workspaces.Frame) => {
		return myFrame.workspaces().then((workspaces) => {
			const homeWsps = workspaces.find(w => w.layoutName === layoutName);
			if (homeWsps) {
				return homeWsps;
			}

			return homeWsps || myFrame.restoreWorkspace(layoutName, { noTabHeader: true });
		});
	}

	useEffect(() => {
		const glue = (window as any).glue;
		let myFrame: Glue42Workspaces.Frame | undefined = undefined;
		let onWorkspaceSelectedUnsub = () => { };
		// The frame can be opened, but not yet in the API collections, because it is been made in the pool
		// and will be loaded only when a workspace is dragged out, so we must wait indefinitely 
		waitForMyFrame(glue).then((mf) => {
			myFrame = mf;
			return findOrOpenPinnedWorkspace("Home", myFrame);
		}).then((hwsp) => {
			setHomeWorkspace(hwsp);
			return findOrOpenPinnedWorkspace("Docs", myFrame!);
		}).then((docs) => {
			setDocsWorkspace(docs);
		}).then(() => {
			return myFrame?.onWorkspaceSelected((w) => {
				setActiveWorkspaceId(w.id);
			});
		}).then((unsub) => {
			onWorkspaceSelectedUnsub = unsub!;
			return myFrame?.workspaces();
		}).then((workspaces) => {
			const activeWorkspace = workspaces!.find(w => w.isSelected);

			setActiveWorkspaceId((activeId) => {
				console.log("activeId when setting", activeId);
				console.log("activeWorkspace", activeWorkspace);
				return activeId || activeWorkspace?.id; // making sure that an event hasn't come before we get the active workspace
			});
		}).catch(console.log);

		return () => {
			onWorkspaceSelectedUnsub();
		}
	}, []);

	const onHomeClicked = () => {
		homeWorkspace?.focus().catch(console.log);
	};

	const onDocsClicked = () => {
		docsWorkspace?.focus().catch(console.log);
	};

	return (
		<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
			<CustomFrameHeader />
			<Workspaces components={{
				header: {
					LogoComponent: () => <>
					<span className={"align-items-center d-flex icon-size-24 mx-2" + (activeWorkspaceId === homeWorkspace?.id ? " icon-active" : "")} onClick={onHomeClicked} >
						<i className="icon-home"/>
					</span>	
					<span className={"align-items-center d-flex icon-size-24 mx-2 d-flex" + (activeWorkspaceId === docsWorkspace?.id ? " icon-active" : "")} onClick={onDocsClicked} >
						<i className="icon-globe"/>
					</span>											
					</>,
					SystemButtonsComponent: () => <></>
				}
			}} />
		</div >
	);
}


export default App;
