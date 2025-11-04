import { useState, useEffect } from 'react';
import { getPersonalInfo, getAllExperience, getAllEducation } from '../services/api';
import type { PersonalInfo, Experience, Education } from '../types';

const About = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [infoData, expData, eduData] = await Promise.all([
          getPersonalInfo(),
          getAllExperience(),
          getAllEducation(),
        ]);
        setPersonalInfo(infoData);
        setExperiences(expData);
        setEducation(eduData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!personalInfo) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-xl">Failed to load content</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-gray-900 dark:text-white">
          About Me
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
          {personalInfo.bio.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Experience
            </h2>
            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp._id} className="border-l-2 border-blue-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {exp.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {exp.company} · {exp.period}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Education
            </h2>
            <div className="space-y-8">
              {education.map((edu) => (
                <div key={edu._id} className="border-l-2 border-blue-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {edu.institution} · {edu.year}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
