import { withErrorHandler } from "@//lib/mongodb/withErrorHandler";
import { ProjectService, ProjectTypeProps } from "@//services/project/ProjectService";
import { NextResponse } from "next/server";


export async function Post(req: Request) {

    const body = (await req.json()) as ProjectTypeProps
    const {name, userId} = body
    withErrorHandler(async () => {
        const projectService = ProjectService.getInstance()
        const project = await projectService.createProject({name,userId})
        return NextResponse.json({message: "Project created", project})
    })()
}