"use client"

import { Plus, Play, Edit, Trash2, Zap } from "lucide-react"
import { Button } from "@//components/ui/button"
import { Input } from "@//components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@//components/ui/card"
import TopNav from "@//components/topnav/TopNav"
// import TopNav from "@//components/topnav/TopNav"
import { useSession } from "next-auth/react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@//store"
import { ProjectModal } from "@//components/project/ProjectModal"
import { toggleModal } from "@//store/ProjectSlice"
import ProjectList from "@//components/project/ProjectList"


const workflows = [
    {
        id: 1,
        name: 'Welcome Email Automation',
        status: "Active",
        updatedAt: "2h ago",
        trigger: 'New User Signup',
    },
    {
        id: 2,
        name: "Slack Notification Bot",
        status: "Draft",
        updatedAt: '1d ago',
        trigger: "Webhook Trigger",
    },
    {
        id: 3,
        name: "Google Sheet Sync",
        status: "Active",
        updatedAt: "5d ago",
        trigger: "Scheduled",
    },
]

const WorkflowsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: session } = useSession()
  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-gray-900">
      <TopNav />
      <ProjectModal session={session}/>
      <main className="flex-1 p-15 overflow-y-auto">
        {/* toolbar */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            My Workflows : {session?.user?.email}
          </h1>
          <div className="flex gap-3">
            <Input
              placeholder="Search workflows..."
              className="w-56 rounded-lg border-gray-300 dark:border-gray-700"
            />
            <Button
              onClick={() => dispatch(toggleModal())}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              New Workflow
            </Button>
          </div>
        </div>

        {/* grid of workflow cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
         <ProjectList workflows={workflows}/>
        </div>
      </main>
    </div>
  );
}

export default WorkflowsPage