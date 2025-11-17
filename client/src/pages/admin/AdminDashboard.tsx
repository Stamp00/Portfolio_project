import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api, {
  getHeroInfo,
  updateHeroInfo,
  getAboutInfo,
  updateAboutInfo,
  getContactInfo,
  updateContactInfo,
  getAllSkills,
  createSkill,
  deleteSkill,
  seedDatabase,
} from '../../services/api';
import type { HeroInfo, AboutInfo, ContactInfo, Skill } from '../../types';
import { deviconIcons } from '../../utils/deviconIcons';
import SpeechBubble from '../../components/SpeechBubble';
import './AdminDashboard.css';

interface Message {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

type Tab = 'hero' | 'about' | 'contact' | 'skills' | 'projects' | 'messages';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('hero');
  const [loading, setLoading] = useState(true);

  // Hero Info
  const [heroInfo, setHeroInfo] = useState<HeroInfo | null>(null);
  const [heroFormData, setHeroFormData] = useState({ header: '', subheader: '', text: '' });

  // About Info
  const [aboutInfo, setAboutInfo] = useState<AboutInfo | null>(null);
  const [aboutFormData, setAboutFormData] = useState({ text: '' });

  // Contact Info
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [contactFormData, setContactFormData] = useState({
    email: '',
    phone: '',
    location: '',
    githubUrl: '',
    linkedinUrl: '',
    twitterUrl: '',
  });

  // Skills
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'Frontend' as 'Frontend' | 'Backend' | 'DevOps' | 'UI/UX' | 'AI',
    icon: '',
    order: 0,
  });
  const [iconSearch, setIconSearch] = useState('');
  const [showIconGrid, setShowIconGrid] = useState(false);

  // Messages
  const [messages, setMessages] = useState<Message[]>([]);

  const availableIcons = deviconIcons.map((icon) => ({
    value: icon.url,
    label: icon.displayName,
  }));

  const filteredIcons = availableIcons.filter((icon) =>
    icon.label.toLowerCase().includes(iconSearch.toLowerCase())
  );

  const categories: Array<'Frontend' | 'Backend' | 'DevOps' | 'UI/UX' | 'AI'> = [
    'Frontend',
    'Backend',
    'DevOps',
    'UI/UX',
    'AI',
  ];

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchAllData();
  }, [navigate]);

  const fetchAllData = async () => {
    try {
      const [
        heroData,
        aboutData,
        contactData,
        skillsData,
      ] = await Promise.all([
        getHeroInfo(),
        getAboutInfo(),
        getContactInfo(),
        getAllSkills(),
      ]);

      setHeroInfo(heroData);
      setHeroFormData(heroData);
      setAboutInfo(aboutData);
      setAboutFormData(aboutData);
      setContactInfo(contactData);
      setContactFormData(contactData);
      setSkills(skillsData);

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

  // Hero Info Handlers
  const handleUpdateHeroInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await updateHeroInfo(heroFormData);
      setHeroInfo(updated);
      alert('Hero info updated successfully!');
    } catch (error) {
      console.error('Failed to update hero info:', error);
      alert('Failed to update hero info');
    }
  };

  // About Info Handlers
  const handleUpdateAboutInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await updateAboutInfo(aboutFormData);
      setAboutInfo(updated);
      alert('About info updated successfully!');
    } catch (error) {
      console.error('Failed to update about info:', error);
      alert('Failed to update about info');
    }
  };

  // Contact Info Handlers
  const handleUpdateContactInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await updateContactInfo(contactFormData);
      setContactInfo(updated);
      alert('Contact info updated successfully!');
    } catch (error) {
      console.error('Failed to update contact info:', error);
      alert('Failed to update contact info');
    }
  };

  // Seed Database
  const handleSeedDatabase = async () => {
    if (!window.confirm('This will replace all content with default data. Continue?'))
      return;

    try {
      await seedDatabase();
      alert('Database seeded successfully!');
      await fetchAllData();
    } catch (error) {
      console.error('Failed to seed database:', error);
      alert('Failed to seed database');
    }
  };

  // Skill Handlers
  const handleCreateSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await createSkill(newSkill);
      setSkills([...skills, created]);
      setNewSkill({ name: '', category: 'Frontend', icon: '', order: 0 });
      setIconSearch('');
      setShowIconGrid(false);
      alert('Skill added successfully!');
    } catch (error) {
      console.error('Failed to create skill:', error);
      alert('Failed to add skill');
    }
  };

  const handleSelectIcon = (iconUrl: string, iconName: string) => {
    setNewSkill({
      ...newSkill,
      icon: iconUrl,
      name: iconName,
    });
    setShowIconGrid(false);
    setIconSearch('');
  };

  const handleDeleteSkill = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;

    try {
      console.log('Deleting skill with ID:', id);
      await deleteSkill(id);
      setSkills(skills.filter((s) => s._id !== id));
      alert('Skill deleted successfully!');
    } catch (error: any) {
      console.error('Failed to delete skill:', error);
      const errorMessage =
        error?.response?.data?.error || error?.message || 'Failed to delete skill';
      alert(`Error: ${errorMessage}`);
    }
  };

  // Message Handlers
  const handleMarkAsRead = async (id: string) => {
    try {
      await api.patch(`/admin/messages/${id}/read`);
      setMessages(messages.map((msg) => (msg._id === id ? { ...msg, read: true } : msg)));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      await api.delete(`/admin/messages/${id}`);
      setMessages(messages.filter((msg) => msg._id !== id));
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Don't render anything if not authenticated or still loading
  if (loading || !localStorage.getItem('adminToken')) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'hero' as Tab, label: 'Hero Section' },
    { id: 'about' as Tab, label: 'About Me' },
    { id: 'contact' as Tab, label: 'Contact Info' },
    { id: 'skills' as Tab, label: 'Skills' },
    { id: 'projects' as Tab, label: 'Projects & Certificates' },
    { id: 'messages' as Tab, label: `Messages (${messages.length})` },
  ];

  return (
    <div className="admin-container">
      <div className="admin-wrapper">
        {/* Header */}
        <div className="admin-header">
          <h1 className="admin-title">Admin Dashboard</h1>
          <div className="admin-header-buttons">
            <button onClick={handleSeedDatabase} className="btn btn-seed">
              Seed Database
            </button>
            <button onClick={handleLogout} className="btn btn-logout">
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <nav className="tabs-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Hero Section Tab */}
        {activeTab === 'hero' && heroInfo && (
          <div className="card">
            <h2 className="card-title">Hero Section</h2>
            <form onSubmit={handleUpdateHeroInfo} className="form">
              <div className="form-group">
                <label className="form-label">Header</label>
                <input
                  type="text"
                  value={heroFormData.header}
                  onChange={(e) => setHeroFormData({ ...heroFormData, header: e.target.value })}
                  className="form-input"
                  placeholder="Main heading"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Subheader</label>
                <input
                  type="text"
                  value={heroFormData.subheader}
                  onChange={(e) => setHeroFormData({ ...heroFormData, subheader: e.target.value })}
                  className="form-input"
                  placeholder="Subtitle or job title"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Text</label>
                <textarea
                  value={heroFormData.text}
                  onChange={(e) => setHeroFormData({ ...heroFormData, text: e.target.value })}
                  rows={4}
                  className="form-textarea"
                  placeholder="Hero section description"
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Update Hero Section
              </button>
            </form>
          </div>
        )}

        {/* About Me Tab */}
        {activeTab === 'about' && aboutInfo && (
          <div className="card">
            <h2 className="card-title">About Me</h2>

            {/* Formatting Help */}
            <div className="about-help">
              <p className="about-help-title">Formatting Guide:</p>
              <div className="about-help-grid">
                <div className="about-help-item">
                  <code>**bold text**</code> → <strong>bold text</strong>
                </div>
                <div className="about-help-item">
                  <code>*italic text*</code> → <em>italic text</em>
                </div>
                <div className="about-help-item">
                  <code>Header:</code> → <strong style={{fontSize: '18px'}}>Header:</strong>
                </div>
                <div className="about-help-item">
                  <code>[link text](url)</code> → link
                </div>
                <div className="about-help-item">
                  <code>- List item</code> → • List item
                </div>
                <div className="about-help-item">
                  Double line break → New paragraph
                </div>
              </div>
            </div>

            <form onSubmit={handleUpdateAboutInfo} className="form">
              <div className="about-editor-container">
                {/* Left: Text Editor */}
                <div className="about-editor-panel">
                  <label className="form-label">Edit Your Story</label>

                  {/* Formatting Toolbar */}
                  <div className="editor-toolbar">
                    <button
                      type="button"
                      className="toolbar-btn"
                      onClick={() => {
                        const textarea = document.querySelector('.about-textarea') as HTMLTextAreaElement;
                        const start = textarea.selectionStart;
                        const end = textarea.selectionEnd;
                        const selectedText = aboutFormData.text.substring(start, end);
                        const newText = aboutFormData.text.substring(0, start) + `**${selectedText || 'bold text'}**` + aboutFormData.text.substring(end);
                        setAboutFormData({ ...aboutFormData, text: newText });
                        setTimeout(() => textarea.focus(), 0);
                      }}
                      title="Bold"
                    >
                      <strong>B</strong>
                    </button>
                    <button
                      type="button"
                      className="toolbar-btn"
                      onClick={() => {
                        const textarea = document.querySelector('.about-textarea') as HTMLTextAreaElement;
                        const start = textarea.selectionStart;
                        const end = textarea.selectionEnd;
                        const selectedText = aboutFormData.text.substring(start, end);
                        const newText = aboutFormData.text.substring(0, start) + `*${selectedText || 'italic text'}*` + aboutFormData.text.substring(end);
                        setAboutFormData({ ...aboutFormData, text: newText });
                        setTimeout(() => textarea.focus(), 0);
                      }}
                      title="Italic"
                    >
                      <em>I</em>
                    </button>
                    <div className="toolbar-divider"></div>
                    <button
                      type="button"
                      className="toolbar-btn"
                      onClick={() => {
                        const textarea = document.querySelector('.about-textarea') as HTMLTextAreaElement;
                        const start = textarea.selectionStart;
                        const selectedText = aboutFormData.text.substring(start, textarea.selectionEnd);
                        const newText = aboutFormData.text.substring(0, start) + `${selectedText || 'Header'}:` + aboutFormData.text.substring(textarea.selectionEnd);
                        setAboutFormData({ ...aboutFormData, text: newText });
                        setTimeout(() => textarea.focus(), 0);
                      }}
                      title="Header"
                    >
                      H
                    </button>
                    <button
                      type="button"
                      className="toolbar-btn"
                      onClick={() => {
                        const textarea = document.querySelector('.about-textarea') as HTMLTextAreaElement;
                        const start = textarea.selectionStart;
                        const newText = aboutFormData.text.substring(0, start) + `[link text](https://example.com)` + aboutFormData.text.substring(start);
                        setAboutFormData({ ...aboutFormData, text: newText });
                        setTimeout(() => textarea.focus(), 0);
                      }}
                      title="Link"
                    >
                      🔗
                    </button>
                    <div className="toolbar-divider"></div>
                    <button
                      type="button"
                      className="toolbar-btn"
                      onClick={() => {
                        const textarea = document.querySelector('.about-textarea') as HTMLTextAreaElement;
                        const start = textarea.selectionStart;
                        const newText = aboutFormData.text.substring(0, start) + `- List item\n` + aboutFormData.text.substring(start);
                        setAboutFormData({ ...aboutFormData, text: newText });
                        setTimeout(() => textarea.focus(), 0);
                      }}
                      title="Bullet List"
                    >
                      •
                    </button>
                    <button
                      type="button"
                      className="toolbar-btn"
                      onClick={() => {
                        const textarea = document.querySelector('.about-textarea') as HTMLTextAreaElement;
                        const start = textarea.selectionStart;
                        const newText = aboutFormData.text.substring(0, start) + `\n\n` + aboutFormData.text.substring(start);
                        setAboutFormData({ ...aboutFormData, text: newText });
                        setTimeout(() => textarea.focus(), 0);
                      }}
                      title="New Paragraph"
                    >
                      ¶
                    </button>
                  </div>

                  <textarea
                    value={aboutFormData.text}
                    onChange={(e) => setAboutFormData({ ...aboutFormData, text: e.target.value })}
                    rows={20}
                    className="form-textarea about-textarea"
                    placeholder="Tell your story...

Example:
Introduction: This is a **bold** header paragraph.

This is a regular paragraph with *italic* text and a [link](https://example.com).

- Bullet point one
- Bullet point two"
                    required
                  />
                </div>

                {/* Right: Live Preview */}
                <div className="about-preview-panel">
                  <label className="form-label">Live Preview</label>
                  <div className="about-preview-wrapper">
                    <SpeechBubble>
                      {aboutFormData.text.split('\n\n').map((paragraph, pIndex) => {
                        const colonIndex = paragraph.indexOf(':');

                        // Helper function to parse inline formatting
                        const parseInlineFormatting = (text: string) => {
                          const parts: React.ReactNode[] = [];
                          let lastIndex = 0;

                          // Combined regex for bold, italic, and links
                          const regex = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
                          let match;

                          while ((match = regex.exec(text)) !== null) {
                            // Add text before match
                            if (match.index > lastIndex) {
                              parts.push(text.substring(lastIndex, match.index));
                            }

                            if (match[1]) {
                              // Bold: **text**
                              parts.push(<strong key={match.index}>{match[2]}</strong>);
                            } else if (match[3]) {
                              // Italic: *text*
                              parts.push(<em key={match.index}>{match[4]}</em>);
                            } else if (match[5]) {
                              // Link: [text](url)
                              parts.push(<a key={match.index} href={match[7]} target="_blank" rel="noopener noreferrer" style={{color: '#ED6A5A', textDecoration: 'underline'}}>{match[6]}</a>);
                            }

                            lastIndex = match.index + match[0].length;
                          }

                          // Add remaining text
                          if (lastIndex < text.length) {
                            parts.push(text.substring(lastIndex));
                          }

                          return parts.length > 0 ? parts : text;
                        };

                        // Check if paragraph is a list
                        if (paragraph.trim().startsWith('- ')) {
                          const listItems = paragraph.split('\n').filter(line => line.trim().startsWith('- '));
                          return (
                            <ul key={pIndex} style={{ lineHeight: '1.5', marginBottom: '16px', marginLeft: '20px', fontSize: '16px', color: '#66635B' }}>
                              {listItems.map((item, i) => (
                                <li key={i}>{parseInlineFormatting(item.substring(2).trim())}</li>
                              ))}
                            </ul>
                          );
                        }

                        // Header paragraph (ends with :)
                        if (colonIndex > 0 && colonIndex < 50) {
                          const header = paragraph.substring(0, colonIndex + 1);
                          const content = paragraph.substring(colonIndex + 1).trim();

                          return (
                            <p key={pIndex} style={{ lineHeight: '1.5', marginBottom: '16px' }}>
                              <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#66635B' }}>
                                {parseInlineFormatting(header)}
                              </span>
                              {content && (
                                <span style={{ fontSize: '16px', color: '#66635B' }}>
                                  {' '}{parseInlineFormatting(content)}
                                </span>
                              )}
                            </p>
                          );
                        } else if (paragraph.trim() === '') {
                          return <p key={pIndex} style={{ lineHeight: '1.5', marginBottom: '16px' }}>&nbsp;</p>;
                        } else {
                          // Regular paragraph
                          return (
                            <p key={pIndex} style={{ lineHeight: '1.5', marginBottom: '16px', fontSize: '16px', color: '#66635B' }}>
                              {parseInlineFormatting(paragraph)}
                            </p>
                          );
                        }
                      })}
                    </SpeechBubble>
                  </div>
                </div>
              </div>

              <button type="submit" className="submit-button">
                Update About Me
              </button>
            </form>
          </div>
        )}

        {/* Contact Info Tab */}
        {activeTab === 'contact' && contactInfo && (
          <div className="card">
            <h2 className="card-title">Contact Information</h2>
            <form onSubmit={handleUpdateContactInfo} className="form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    value={contactFormData.email}
                    onChange={(e) =>
                      setContactFormData({ ...contactFormData, email: e.target.value })
                    }
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    value={contactFormData.phone}
                    onChange={(e) =>
                      setContactFormData({ ...contactFormData, phone: e.target.value })
                    }
                    className="form-input"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  value={contactFormData.location}
                  onChange={(e) =>
                    setContactFormData({ ...contactFormData, location: e.target.value })
                  }
                  className="form-input"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">GitHub URL</label>
                  <input
                    type="url"
                    value={contactFormData.githubUrl}
                    onChange={(e) =>
                      setContactFormData({ ...contactFormData, githubUrl: e.target.value })
                    }
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">LinkedIn URL</label>
                  <input
                    type="url"
                    value={contactFormData.linkedinUrl}
                    onChange={(e) =>
                      setContactFormData({ ...contactFormData, linkedinUrl: e.target.value })
                    }
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Twitter URL (optional)</label>
                <input
                  type="url"
                  value={contactFormData.twitterUrl}
                  onChange={(e) =>
                    setContactFormData({ ...contactFormData, twitterUrl: e.target.value })
                  }
                  className="form-input"
                />
              </div>
              <button type="submit" className="submit-button">
                Update Contact Info
              </button>
            </form>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div>
            <div className="card">
              <h2 className="card-title">Add New Skill</h2>
              <form onSubmit={handleCreateSkill} className="form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      value={newSkill.category}
                      onChange={(e) => {
                        const selectedCategory = e.target.value as any;
                        const categorySkills = skills.filter((s) => s.category === selectedCategory);
                        const maxOrder =
                          categorySkills.length > 0
                            ? Math.max(...categorySkills.map((s) => s.order))
                            : -1;
                        setNewSkill({
                          ...newSkill,
                          category: selectedCategory,
                          order: maxOrder + 1,
                        });
                      }}
                      className="form-select"
                      required
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Icon</label>
                  <div className="icon-selector-container">
                    {newSkill.icon && (
                      <div className="icon-preview">
                        <img src={newSkill.icon} alt="Selected icon" />
                      </div>
                    )}

                    <input
                      type="text"
                      placeholder="Search icons..."
                      value={iconSearch}
                      onChange={(e) => setIconSearch(e.target.value)}
                      onFocus={() => setShowIconGrid(true)}
                      className="icon-search-input"
                    />

                    {showIconGrid && (
                      <div className="icon-grid">
                        {filteredIcons.map((icon) => (
                          <div
                            key={icon.value}
                            className={`icon-grid-item ${
                              newSkill.icon === icon.value ? 'selected' : ''
                            }`}
                            onClick={() => handleSelectIcon(icon.value, icon.label)}
                          >
                            <img src={icon.value} alt={icon.label} />
                            <span className="icon-grid-item-label">{icon.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Order</label>
                  <input
                    type="number"
                    value={newSkill.order}
                    onChange={(e) => setNewSkill({ ...newSkill, order: parseInt(e.target.value) })}
                    className="form-input"
                    required
                  />
                  <p className="form-hint">Auto-set to next available. Lower numbers appear first.</p>
                </div>

                <button type="submit" className="submit-button">
                  Add Skill
                </button>
              </form>
            </div>

            <div className="card">
              <h2 className="card-title">Current Skills ({skills.length})</h2>
              <div>
                {Object.entries(
                  skills.reduce((acc, skill) => {
                    if (!acc[skill.category]) acc[skill.category] = [];
                    acc[skill.category].push(skill);
                    return acc;
                  }, {} as Record<string, Skill[]>)
                ).map(([category, categorySkills]) => (
                  <div key={category} className="skills-category">
                    <h3 className="skills-category-title">
                      {category} ({categorySkills.length} skills)
                    </h3>
                    <div>
                      {categorySkills
                        .sort((a, b) => a.order - b.order)
                        .map((skill) => (
                          <div key={skill._id} className="skill-item">
                            <div className="skill-item-content">
                              {skill.icon && (
                                <div className="skill-icon">
                                  <img src={skill.icon} alt={skill.name} />
                                </div>
                              )}
                              <span className="skill-name">
                                {skill.name}{' '}
                                <span className="skill-order">(Order: {skill.order})</span>
                              </span>
                            </div>

                            <button
                              onClick={() => handleDeleteSkill(skill._id)}
                              className="btn btn-danger"
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

        {/* Projects & Certificates Tab */}
        {activeTab === 'projects' && (
          <div className="card">
            <h2 className="card-title">Projects & Certificates</h2>
            <p className="empty-state">Coming soon... This section will let you manage your projects and certificates.</p>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="card">
            <h2 className="card-title">Contact Messages ({messages.length})</h2>
            <div className="messages-list">
              {messages.length === 0 ? (
                <p className="empty-state">No messages yet.</p>
              ) : (
                <div>
                  {messages.map((message) => (
                    <div key={message._id} className={`message-item ${message.read ? 'read' : ''}`}>
                      <div className="message-header">
                        <div>
                          <p className="message-sender">{message.name}</p>
                          <p className="message-email">{message.email}</p>
                        </div>
                        <div className="message-date">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      {message.subject && (
                        <p className="message-subject">Subject: {message.subject}</p>
                      )}
                      <p className="message-content">{message.message}</p>
                      <div className="message-actions">
                        {!message.read && (
                          <button
                            onClick={() => handleMarkAsRead(message._id)}
                            className="btn btn-primary"
                          >
                            Mark as Read
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteMessage(message._id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
