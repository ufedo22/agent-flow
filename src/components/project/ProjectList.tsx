"use client"

import { ProjectTypeProps } from "@//services/project/ProjectService";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Edit, Play, Trash2, Zap } from "lucide-react";
import { Button } from "../ui/button";


type projectListProps = ProjectTypeProps & {id: string, updatedAt: string}
const ProjectList = ({workflows}:{workflows: projectListProps[]}) => {
  return (
    <>
      {workflows.map((wf) => (
        <Card
          key={wf.id}
          className="rounded-2xl shadow-sm border border-gray-200 dark:border-gray-600"
        >
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between items-center">
              <span className="truncate font-medium">{wf.name}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${wf.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
              >
                {wf.status}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-blue-500" />
                {wf.trigger}
              </span>
              <span>{wf.updatedAt}</span>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" size="sm">
                <Play className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default ProjectList