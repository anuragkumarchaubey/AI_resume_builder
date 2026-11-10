
import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import ResumeCardItem from './components/ResumeCardItem'
import GlobalApi from './../../service/GlobalApi'
import { useUser } from '@clerk/clerk-react'

function Dashboard() {

  const { user } = useUser()
  const [resumeList, setResumeList] = useState([])

  useEffect(() => {
    if (user) {
      GetResumesList()
    }
  }, [user])

  // Get user's resume list
  const GetResumesList = () => {
    GlobalApi.GetUserResumes(
      user?.primaryEmailAddress?.emailAddress
    )
      .then(resp => {
        console.log("API Response:", resp.data)
        setResumeList(resp.data.data || [])
      })
      .catch(error => {
        console.error("Error fetching resumes:", error)
        setResumeList([])
      })
  }

  return (
    <div className='p-10 md:px-20 lg:px-32'>

      <h2 className='font-bold text-3xl'>My Resume</h2>

      <p>Start Creating AI resume to your next job role</p>

      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>

        <AddResume />

        {Array.isArray(resumeList) && resumeList.length > 0 ? (
          resumeList.map((resume) => (
            <ResumeCardItem
              resume={resume}
              key={resume.id}
            />
          ))
        ) : (
          <p className="text-gray-400">
            No resumes found. Create your first resume!
          </p>
        )}

      </div>
    </div>
  )
}

export default Dashboard
