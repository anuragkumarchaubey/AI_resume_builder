import { Loader2Icon, MoreVertical } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import GlobalApi from './../../../service/GlobalApi'
import { toast } from 'sonner'

const DEFAULT_COLOR = '#7c3aed'

function ResumeCardItem({ resume, refreshData }) {

  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const color = resume?.themeColor || DEFAULT_COLOR;

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(
      () => {
        toast('Resume Deleted!');
        refreshData?.();
        setLoading(false);
        setOpenAlert(false);
      },
      (error) => {
        console.error(error);
        toast.error('Delete failed, please try again!');
        setLoading(false);
      }
    )
  }

  return (
    <div>
      <Link to={'/dashboard/resume/' + resume.documentId + '/edit'}>
        <div
          className='bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200
                     h-[280px] rounded-t-lg border-t-4
                     flex items-center justify-center'
          style={{ borderColor: color }}
        >
          <img src="/cv.png" alt="resume" className="w-20 h-20 object-contain" />
        </div>
      </Link>

      <div
        className='border p-3 h-[52px] flex justify-between items-center text-white rounded-b-lg shadow-lg'
        style={{ background: color }}
      >
        <h2 className='text-sm truncate'>{resume.title}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className='h-4 w-4 cursor-pointer' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigation('/dashboard/resume/' + resume.documentId + '/edit')}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation('/my-resume/' + resume.documentId + '/view')}>View</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation('/my-resume/' + resume.documentId + '/view')}>Download</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this resume. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className='animate-spin' /> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default ResumeCardItem