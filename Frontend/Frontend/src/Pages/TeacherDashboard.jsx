import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import API from '../Services'

const TeacherDashboard = () => {
  const navigate = useNavigate()
  const id = localStorage.getItem("id")
  const token = localStorage.getItem("token")
  const [data, setData] = useState({})
  const [allProjects, setAllProjects] = useState([])
  const [approvedProjects, setApprovedProjects] = useState([])
  const [rejectedProjects, setRejectedProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchUser = async () => {
    try {
      const user = await axios.get(`${API}/dashboard/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setData(user.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchProjects = async () => {
    try {
      const projects = await axios.get(`${API}/teacher/projects`, {
        headers: {
          teacherid: `${id}`
        }
      })
      setAllProjects(projects.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchApproveProjects = async () => {
    try {
      const projects = await axios.get(`${API}/teacher/projects`, {
        headers: {
          teacherid: `${id}`
        }
      })
      const approveProjects = projects.data.filter(project => project.status === "approved" || project.status === "Approved")
      setApprovedProjects(approveProjects)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchRejectProjects = async () => {
    try {
      const projects = await axios.get(`${API}/teacher/projects`, {
        headers: {
          teacherid: `${id}`
        }
      })
      const rejectProjects = projects.data.filter(project => project.status === "rejected" || project.status === "Rejected")
      setRejectedProjects(rejectProjects)
    } catch (error) {
      console.log(error)
    }
  }

  const approved = async (pid) => {
    try {
      await axios.patch(`${API}/project/${pid}/approve`)
      toast.success("Project Approved")
      fetchProjects()
      fetchApproveProjects()
      fetchRejectProjects()
    } catch (error) {
      console.log(error)
    }
  }

  const Rejected = async (pid) => {
    try {
      await axios.patch(`${API}/project/${pid}/reject`)
      fetchProjects()
      fetchApproveProjects()
      fetchRejectProjects()
      toast.warn("Project Rejected")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      await fetchUser()
      await fetchProjects()
      await fetchApproveProjects()
      await fetchRejectProjects()
    }
    loadData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const logout = () => {
    localStorage.clear()
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-blue-700 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-5">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome, {data.name}
            </h1>
            <p className="text-blue-100">
              Teacher Dashboard
            </p>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8">
        {/* All Projects */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Pending Projects ({allProjects.filter(p => p.status === 'pending' || p.status === 'Pending').length})
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {isLoading && <p>Loading projects...</p>}
          
          {allProjects.filter(project => project.status === 'pending' || project.status === 'Pending').map((project) => (
            <div key={project._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">{project.project}</h3>
              {project.description && <p className="text-gray-600 mb-4">{project.description}</p>}
              
              <div className="mb-4">
                <p><strong>Student:</strong> {project.studentId?.name || 'Unknown'}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-yellow-500 text-white rounded-full text-sm">
                  {project.status}
                </span>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => approved(project._id)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => Rejected(project._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
          {allProjects.filter(p => p.status === 'pending' || p.status === 'Pending').length === 0 && !isLoading && (
            <p className="text-gray-500">No pending projects.</p>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Approved Projects */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-green-600">
              Approved Projects
            </h2>
            <div className="space-y-4">
              {approvedProjects.map((project) => (
                <div key={project._id} className="border-l-4 border-green-500 bg-gray-50 p-4 rounded-r-lg shadow-sm">
                  <h3 className="font-semibold text-lg">{project.project}</h3>
                  <p className="text-gray-600 text-sm mt-1">By: {project.studentId?.name || 'Unknown'}</p>
                </div>
              ))}
              {approvedProjects.length === 0 && (
                <p className="text-gray-500">No approved projects yet.</p>
              )}
            </div>
          </div>

          {/* Rejected Projects */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-red-600">
              Rejected Projects
            </h2>
            <div className="space-y-4">
              {rejectedProjects.map((project) => (
                <div key={project._id} className="border-l-4 border-red-500 bg-gray-50 p-4 rounded-r-lg shadow-sm">
                  <h3 className="font-semibold text-lg">{project.project}</h3>
                  <p className="text-gray-600 text-sm mt-1">By: {project.studentId?.name || 'Unknown'}</p>
                </div>
              ))}
              {rejectedProjects.length === 0 && (
                <p className="text-gray-500">No rejected projects yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default TeacherDashboard