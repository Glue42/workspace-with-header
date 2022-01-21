import React, { useContext } from 'react';
import Workspaces, { getFrameId } from "@glue42/workspaces-ui-react";
import "@glue42/workspaces-ui-react/dist/styles/popups.css";
import "@glue42/workspaces-ui-react/dist/styles/goldenlayout-base.css";
import "@glue42/workspaces-ui-react/dist/styles/glue42-theme.css";
import "@glue42/workspaces-ui-react/dist/styles/t42bootstrap.bundle.css";
import "./index.css";
import { GlueContext, useGlue } from '@glue42/react-hooks';
import CustomFrameHeader from './components/CustomFrameHeader';
import { Glue42 } from '@glue42/desktop';
import { FrameInitializationContext, RestoreWorkspaceDefinition } from '@glue42/workspaces-api/temp';
import "@glue42/theme/dist/components/icons.css"
import { Frame, WorkspaceDefinition } from './tempTypes';

const App = () => {
	(window as any).glue = useContext(GlueContext);
	const homeIcon = `data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 512 512'%3E%3Cpath d='M224 448v-96h64v96l-32 64zM336 224v-160c48 0 80-32 80-64v0 0h-320c0 32 32 64 80 64v160c-73.6 22.4-112 64-112 128h384c0-64-38.4-105.6-112-128z'%3E%3C/path%3E%3C/svg%3E%0A`;
	const docsIcon = `http://localhost:3000/docsIcon.svg`;
	const genericPinnedIcon = `data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 512 512'%3E%3Cpath d='M224 448v-96h64v96l-32 64zM336 224v-160c48 0 80-32 80-64v0 0h-320c0 32 32 64 80 64v160c-73.6 22.4-112 64-112 128h384c0-64-38.4-105.6-112-128z'%3E%3C/path%3E%3C/svg%3E%0A`;

	const homeWorkspaceLayoutDefinition: RestoreWorkspaceDefinition = {
		name: "Home",
		restoreOptions: {
			isPinned: true,
			icon: homeIcon // Pinning without an icon will result in an error
		}
	};

	const docsWorkspaceDefinition: WorkspaceDefinition = {
		children: [
			{
				type: "group",
				children: [
					{
						type: "window",
						appName: "clientportfolio"
					}
				]
			}
		],
		config: {
			isPinned: true,
			icon: docsIcon // Pinning without an icon will result in an error
		}
	}

	const createClientDefinition = (clientId: string) => {
		return {
			name: "Start of day",
			restoreOptions: {
				icon: genericPinnedIcon,
				title: clientId,
				isSelected:true
			}
		}
	}

	useGlue((glue: Glue42.Glue) => {
		// The frame can be opened, but not yet in the API collections, because it is been made in the pool
		// and will be loaded only when a workspace is dragged out, so we must wait indefinitely 
		glue.workspaces!.waitForFrame(getFrameId()).then((mf) => {
			// The context can be passed from
			// glue.workspaces.createEmptyFrame({context:{clientId:"ClientA"}})
			(mf as Frame).onInitializationRequested(async (ic: FrameInitializationContext) => { // The need for casting will be removed ones the typings are released in the workspaces API
				const context = ic?.context as any;
				(mf as Frame).init({ workspaces: [homeWorkspaceLayoutDefinition, docsWorkspaceDefinition, createClientDefinition(context?.clientId)] });
			});
		}).catch(console.log);
	}, []);

	return (
		<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
			<CustomFrameHeader />
			<Workspaces components={{
				header: {
					SystemButtonsComponent: () => <></>
				}
			}} />
		</div >
	);
}

export default App;
