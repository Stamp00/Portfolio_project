import SpeechBubble from '../SpeechBubble';
import FullBodyCharacter from '../illustrations/FullBodyCharacter';
import './AboutSection.css';

interface AboutSectionProps {
  bio: string;
}

const AboutSection = ({ bio }: AboutSectionProps) => {
  // Function to parse bio text with formatting
  const formatBioText = (text: string) => {
    const paragraphs = text.split('\n\n');

    return paragraphs.map((paragraph, pIndex) => {
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

      // Check if paragraph starts with a header (# prefix)
      if (paragraph.trim().startsWith('# ')) {
        // This is a header
        const textAfterHash = paragraph.trim().substring(2); // Remove '# '
        const endHashIndex = textAfterHash.indexOf(' #');

        let headerText = textAfterHash;
        let content = '';

        if (endHashIndex > 0) {
          // Found end marker ' #'
          headerText = textAfterHash.substring(0, endHashIndex);
          content = textAfterHash.substring(endHashIndex + 2).trim(); // Skip ' #'
        }

        return (
          <p key={pIndex} style={{ lineHeight: '1.5', marginBottom: '16px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#66635B' }}>
              {parseInlineFormatting(headerText)}
            </span>
            {content && (
              <span style={{ fontSize: '16px', color: '#66635B' }}>
                {' '}{parseInlineFormatting(content)}
              </span>
            )}
          </p>
        );
      } else if (paragraph.trim() === '') {
        // Empty paragraph for spacing
        return <p key={pIndex} style={{ lineHeight: '1.5', marginBottom: '16px', fontSize: '16px' }}>&nbsp;</p>;
      } else {
        // Regular paragraph
        return (
          <p key={pIndex} style={{ lineHeight: '1.5', marginBottom: '16px', fontSize: '16px', color: '#66635B' }}>
            {parseInlineFormatting(paragraph)}
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
