import { useState, useEffect, type FormEvent } from 'react';
import { getPersonalInfo, getAllExperience, getAllEducation, getAllSkills, getProjects, sendContactMessage } from '../services/api';
import type { PersonalInfo, Experience, Education, Skill, Project } from '../types';

const Home = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [infoData, expData, eduData, skillsData, projectsData] = await Promise.all([
          getPersonalInfo(),
          getAllExperience(),
          getAllEducation(),
          getAllSkills(),
          getProjects(),
        ]);
        setPersonalInfo(infoData);
        setExperiences(expData);
        setEducation(eduData);
        setSkills(skillsData);
        setProjects(projectsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      await sendContactMessage(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again or email me directly.');
      console.error('Error sending message:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!personalInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Failed to load content</div>
      </div>
    );
  }

  return (
    <div>
      {/* Home Section */}
      <section id="home" className="py-20 pl-8 pr-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Welcome
        </h2>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            {personalInfo.bio.split('\n\n')[0]}
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 pl-8 pr-12 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          About Me
        </h2>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          {personalInfo.bio.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="space-y-10">
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
              Experience
            </h3>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp._id} className="border-l-2 border-blue-500 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {exp.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {exp.company} · {exp.period}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mt-2 leading-relaxed text-sm">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu._id} className="border-l-2 border-blue-500 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {edu.degree}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {edu.institution} · {edu.year}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mt-2 leading-relaxed text-sm">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 pl-8 pr-12 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Skills
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12">
          Technologies and tools I work with
        </p>

        <div className="space-y-8">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <span
                    key={skill._id}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-[#1e293b] text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 pl-8 pr-12 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Projects
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12">
          A showcase of my recent work
        </p>

        {projects.length === 0 ? (
          <div className="py-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No projects yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden hover:border-blue-500 dark:hover:border-blue-500 transition-colors group"
              >
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6 bg-white dark:bg-[#1e293b]">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 bg-gray-100 dark:bg-[#0f172a] text-gray-700 dark:text-gray-200 rounded border border-gray-200 dark:border-gray-600 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-2">
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                      >
                        Live Demo →
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                      >
                        GitHub →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 pl-8 pr-12 border-t border-gray-200 dark:border-gray-700 mb-20">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Contact
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12">
          Get in touch—I'd love to hear from you
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-[#1e293b] text-gray-900 dark:text-white text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-[#1e293b] text-gray-900 dark:text-white text-sm"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-[#1e293b] text-gray-900 dark:text-white text-sm"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-[#1e293b] text-gray-900 dark:text-white resize-none text-sm"
            ></textarea>
          </div>

          {status === 'success' && (
            <div className="p-3 border border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-sm">
              Message sent successfully! I'll get back to you soon.
            </div>
          )}

          {status === 'error' && (
            <div className="p-3 border border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Home;
