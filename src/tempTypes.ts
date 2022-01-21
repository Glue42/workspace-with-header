import { Glue42Workspaces } from "@glue42/workspaces-api";
import { FrameInitializationContext, FrameInitializationConfig } from "@glue42/workspaces-api/temp";

// Temporary types which can be used until the proper typings are released

export interface Frame extends Glue42Workspaces.Frame {
    isInitialized: boolean;
    onInitializationRequested: (cb: (ic: FrameInitializationContext) => Promise<void>) => void;
    init: (config: FrameInitializationConfig) => Promise<void>;
}

export interface WorkspaceDefinition extends Glue42Workspaces.WorkspaceDefinition {
    config?: Glue42Workspaces.WorkspaceDefinition["config"] & { isPinned?: boolean; icon?: string; }
}