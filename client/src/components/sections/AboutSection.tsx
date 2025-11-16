import SpeechBubble from '../SpeechBubble';
import FullBodyCharacter from '../illustrations/FullBodyCharacter';
import './AboutSection.css';

interface AboutSectionProps {
  bio: string;
}

const AboutSection = ({ bio }: AboutSectionProps) => {
  // Function to parse bio text and format with bold headers
  const formatBioText = (text: string) => {
    const paragraphs = text.split('\n\n');

    return paragraphs.map((paragraph, index) => {
      // Check if paragraph starts with a bold header (ends with :)
      const colonIndex = paragraph.indexOf(':');

      if (colonIndex > 0 && colonIndex < 50) {
        // This is likely a header
        const header = paragraph.substring(0, colonIndex + 1);
        const content = paragraph.substring(colonIndex + 1).trim();

        return (
          <p key={index} style={{ lineHeight: '1.5', marginBottom: '16px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#66635B' }}>
              {header}
            </span>
            {content && (
              <span style={{ fontSize: '16px', color: '#66635B' }}>
                {' '}{content}
              </span>
            )}
          </p>
        );
      } else if (paragraph.trim() === '') {
        // Empty paragraph for spacing
        return <p key={index} style={{ lineHeight: '1.5', marginBottom: '16px', fontSize: '16px' }}>&nbsp;</p>;
      } else {
        // Regular paragraph
        return (
          <p key={index} style={{ lineHeight: '1.5', marginBottom: '16px', fontSize: '16px', color: '#66635B' }}>
            {paragraph}
          </p>
        );
      }
    });
  };

  return (
    <section id="about" className="about-section">
      {/* <div className="about-container"> */}
        <div className="about-grid">
          {/* Left: Title + Character Illustration */}
          <div className="about-left-column">
            {/* Section Title */}
            <h2 className="h2 about-title">
              About Me
            </h2>

            {/* Character Illustration */}
            <div className="about-character">
                <FullBodyCharacter />
            </div>
          </div>

          {/* Right: Speech Bubble */}
          <div className='about-speech-column'>
          <div className="about-speech-wrapper">
            <SpeechBubble>
              {formatBioText(bio)}
            </SpeechBubble>
          </div>
          </div>
        </div>
      {/* </div> */}
    </section>
  );
};

export default AboutSection;
