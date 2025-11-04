import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api, {
  getPersonalInfo,
  updatePersonalInfo,
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  getAllExperience,
  createExperience,
  updateExperience,
  deleteExperience,
  getAllEducation,
  createEducation,
  updateEducation,
  deleteEducation,
  seedDatabase,
} from '../../services/api';
import type { PersonalInfo, Skill, Experience, Education } from '../../types';

interface Message {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

type Tab = 'personal' | 'skills' | 'experience' | 'education' | 'messages';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('personal');
  const [loading, setLoading] = useState(true);

  // Personal Info
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [personalFormData, setPersonalFormData] = useState({
    name: '',
    title: '',
    email: '',
    location: '',
    bio: '',
    githubUrl: '',
    linkedinUrl: '',
  });

  // Skills
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState({ name: '', category: '', order: 0 });
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);

  // Experience
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [newExperience, setNewExperience] = useState({ title: '', company: '', period: '', description: '', order: 0 });
  const [editingExpId, setEditingExpId] = useState<string | null>(null);

  // Education
  const [education, setEducation] = useState<Education[]>([]);
  const [newEducation, setNewEducation] = useState({ degree: '', institution: '', year: '', description: '', order: 0 });
  const [editingEduId, setEditingEduId] = useState<string | null>(null);

  // Messages
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [personalData, skillsData, experienceData, educationData] = await Promise.all([
        getPersonalInfo(),
        getAllSkills(),
        getAllExperience(),
        getAllEducation(),
      ]);

      setPersonalInfo(personalData);
      setPersonalFormData(personalData);
      setSkills(skillsData);
      setExperiences(experienceData);
      setEducation(educationData);

      await fetchMessages();
    } catch (error) {
      console.error('Failed to fetch data:', error);
      if ((error as any).response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await api.get('/admin/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  // Seed Database
  const handleSeedDatabase = async () => {
    if (!window.confirm('This will replace all content with default data. Continue?')) return;

    try {
      await seedDatabase();
      alert('Database seeded successfully!');
      await fetchAllData();
    } catch (error) {
      console.error('Failed to seed database:', error);
      alert('Failed to seed database');
    }
  };

  // Personal Info Handlers
  const handleUpdatePersonalInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await updatePersonalInfo(personalFormData);
      setPersonalInfo(updated);
      alert('Personal info updated successfully!');
    } catch (error) {
      console.error('Failed to update personal info:', error);
      alert('Failed to update personal info');
    }
  };

  // Skill Handlers
  const handleCreateSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await createSkill(newSkill);
      setSkills([...skills, created]);
      setNewSkill({ name: '', category: '', order: 0 });
      alert('Skill added successfully!');
    } catch (error) {
      console.error('Failed to create skill:', error);
      alert('Failed to add skill');
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;

    try {
      await deleteSkill(id);
      setSkills(skills.filter(s => s._id !== id));
    } catch (error) {
      console.error('Failed to delete skill:', error);
      alert('Failed to delete skill');
    }
  };

  // Experience Handlers
  const handleCreateExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await createExperience(newExperience);
      setExperiences([...experiences, created]);
      setNewExperience({ title: '', company: '', period: '', description: '', order: 0 });
      alert('Experience added successfully!');
    } catch (error) {
      console.error('Failed to create experience:', error);
      alert('Failed to add experience');
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) return;

    try {
      await deleteExperience(id);
      setExperiences(experiences.filter(e => e._id !== id));
    } catch (error) {
      console.error('Failed to delete experience:', error);
      alert('Failed to delete experience');
    }
  };

  // Education Handlers
  const handleCreateEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await createEducation(newEducation);
      setEducation([...education, created]);
      setNewEducation({ degree: '', institution: '', year: '', description: '', order: 0 });
      alert('Education added successfully!');
    } catch (error) {
      console.error('Failed to create education:', error);
      alert('Failed to add education');
    }
  };

  const handleDeleteEducation = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this education?')) return;

    try {
      await deleteEducation(id);
      setEducation(education.filter(e => e._id !== id));
    } catch (error) {
      console.error('Failed to delete education:', error);
      alert('Failed to delete education');
    }
  };

  // Message Handlers
  const handleMarkAsRead = async (id: string) => {
    try {
      await api.patch(`/admin/messages/${id}/read`);
      setMessages(messages.map(msg =>
        msg._id === id ? { ...msg, read: true } : msg
      ));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      await api.delete(`/admin/messages/${id}`);
      setMessages(messages.filter(msg => msg._id !== id));
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'personal' as Tab, label: 'Personal Info' },
    { id: 'skills' as Tab, label: 'Skills' },
    { id: 'experience' as Tab, label: 'Experience' },
    { id: 'education' as Tab, label: 'Education' },
    { id: 'messages' as Tab, label: `Messages (${messages.length})` },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <div className="flex gap-4">
            <button
              onClick={handleSeedDatabase}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Seed Database
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Personal Info Tab */}
        {activeTab === 'personal' && personalInfo && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Personal Information
            </h2>
            <form onSubmit={handleUpdatePersonalInfo} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={personalFormData.name}
                    onChange={(e) => setPersonalFormData({ ...personalFormData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={personalFormData.title}
                    onChange={(e) => setPersonalFormData({ ...personalFormData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={personalFormData.email}
                    onChange={(e) => setPersonalFormData({ ...personalFormData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    value={personalFormData.location}
                    onChange={(e) => setPersonalFormData({ ...personalFormData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  value={personalFormData.bio}
                  onChange={(e) => setPersonalFormData({ ...personalFormData, bio: e.target.value })}
                  rows={10}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">GitHub URL</label>
                  <input
                    type="url"
                    value={personalFormData.githubUrl}
                    onChange={(e) => setPersonalFormData({ ...personalFormData, githubUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                  <input
                    type="url"
                    value={personalFormData.linkedinUrl}
                    onChange={(e) => setPersonalFormData({ ...personalFormData, linkedinUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Update Personal Info
              </button>
            </form>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Add New Skill</h2>
              <form onSubmit={handleCreateSkill} className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <input
                      type="text"
                      value={newSkill.category}
                      onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., Frontend, Backend"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Order</label>
                    <input
                      type="number"
                      value={newSkill.order}
                      onChange={(e) => setNewSkill({ ...newSkill, order: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add Skill
                </button>
              </form>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Current Skills ({skills.length})
              </h2>
              <div className="space-y-2">
                {Object.entries(
                  skills.reduce((acc, skill) => {
                    if (!acc[skill.category]) acc[skill.category] = [];
                    acc[skill.category].push(skill);
                    return acc;
                  }, {} as Record<string, Skill[]>)
                ).map(([category, categorySkills]) => (
                  <div key={category} className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                    <h3 className="font-bold text-lg mb-2">{category}</h3>
                    <div className="space-y-2">
                      {categorySkills.map((skill) => (
                        <div key={skill._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                          <span>{skill.name} (Order: {skill.order})</span>
                          <button
                            onClick={() => handleDeleteSkill(skill._id)}
                            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Add New Experience</h2>
              <form onSubmit={handleCreateExperience} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={newExperience.title}
                      onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      value={newExperience.company}
                      onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Period</label>
                    <input
                      type="text"
                      value={newExperience.period}
                      onChange={(e) => setNewExperience({ ...newExperience, period: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., May 2025 - Present"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Order</label>
                    <input
                      type="number"
                      value={newExperience.order}
                      onChange={(e) => setNewExperience({ ...newExperience, order: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={newExperience.description}
                    onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add Experience
                </button>
              </form>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Current Experience ({experiences.length})
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp._id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{exp.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{exp.company} • {exp.period}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteExperience(exp._id)}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
                    <p className="text-sm text-gray-500 mt-2">Order: {exp.order}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Add New Education</h2>
              <form onSubmit={handleCreateEducation} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Degree</label>
                    <input
                      type="text"
                      value={newEducation.degree}
                      onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Institution</label>
                    <input
                      type="text"
                      value={newEducation.institution}
                      onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Year</label>
                    <input
                      type="text"
                      value={newEducation.year}
                      onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., 2020 - 2026"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Order</label>
                    <input
                      type="number"
                      value={newEducation.order}
                      onChange={(e) => setNewEducation({ ...newEducation, order: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={newEducation.description}
                    onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add Education
                </button>
              </form>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Current Education ({education.length})
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu._id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{edu.degree}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{edu.institution} • {edu.year}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteEducation(edu._id)}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{edu.description}</p>
                    <p className="text-sm text-gray-500 mt-2">Order: {edu.order}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Contact Messages ({messages.length})
              </h2>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700">
              {messages.length === 0 ? (
                <p className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  No messages yet.
                </p>
              ) : (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {messages.map((message) => (
                    <li
                      key={message._id}
                      className={`px-4 py-4 ${
                        message.read ? 'bg-gray-50 dark:bg-gray-700/50' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                {message.name}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {message.email}
                              </p>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(message.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          {message.subject && (
                            <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                              Subject: {message.subject}
                            </p>
                          )}
                          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                            {message.message}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        {!message.read && (
                          <button
                            onClick={() => handleMarkAsRead(message._id)}
                            className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                          >
                            Mark as Read
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteMessage(message._id)}
                          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
