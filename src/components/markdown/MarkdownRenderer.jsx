import PropTypes from 'prop-types';
import {
  renderBoldText,
  renderCode,
  renderHeading,
  renderHorizontalRule,
  renderImage,
  renderItalicText,
  renderLink,
} from './markdownHelpers';
import { RenderCodeBlock } from './RenderCodeBlock';

const parseMarkdown = (content) => {
  const lines = content.split('\n');
  const elements = [];
  let currentUnorderedList = [];
  let currentOrderedList = [];
  let isInCodeBlock = false;
  let codeLines = [];
  let codeLanguage = '';

  lines.forEach((line, index) => {
    // Fenced Code Block
    if (line.trim().startsWith('```')) {
      if (isInCodeBlock) {
        elements.push(
          <RenderCodeBlock
            key={`codeBlock-${index}`}
            codeContent={codeLines.join('\n')}
            language={codeLanguage}
          />,
        );
        codeLines = [];
      }
      isInCodeBlock = !isInCodeBlock;

      if (line.trim().length > 3) {
        codeLanguage = line.trim().slice(3).trim();
      } else {
        codeLanguage = '';
      }
    } else if (isInCodeBlock) {
      codeLines.push(line);
    }
    // Horizontal Rule
    else if (line.trim() === '---') {
      elements.push(renderHorizontalRule(index));
    }
    // Heading 1, 2, 3
    else if (line.startsWith('# '))
      elements.push(renderHeading(line, 1, index));
    else if (line.startsWith('## '))
      elements.push(renderHeading(line, 2, index));
    else if (line.startsWith('### '))
      elements.push(renderHeading(line, 3, index));
    // Bold text
    else if (line.includes('**')) elements.push(renderBoldText(line, index));
    // Italic text
    else if (line.includes('*') && !line.includes('**'))
      elements.push(renderItalicText(line, index));
    // Inline Code
    else if (line.includes('`')) elements.push(renderCode(line, index));
    // Image
    else if (/!\[(.*?)\]\((.*?)\s+(\d+)x(\d+)\)/.test(line)) {
      elements.push(renderImage(line, index));
    }
    // Link
    else if (/\[.*?\]\(.*?\)/.test(line)) {
      elements.push(renderLink(line, index));
    }
    // Unordered list
    else if (line.startsWith('- ')) {
      currentUnorderedList.push(<li key={index}>{line.slice(2)}</li>);
    }
    // Ordered list
    else if (/^\d+\.\s/.test(line)) {
      currentOrderedList.push(
        <li key={index}>{line.slice(line.indexOf('.') + 2)}</li>,
      );
    } else {
      // Push unordered list if it exists
      if (currentUnorderedList.length > 0) {
        elements.push(
          <ul key={`ul-${index}`} className='mb-4 ml-6 list-disc pl-4'>
            {currentUnorderedList}
          </ul>,
        );
        currentUnorderedList = [];
      }
      // Push ordered list if it exists
      if (currentOrderedList.length > 0) {
        elements.push(
          <ol key={`ol-${index}`} className='mb-4 ml-6 list-decimal pl-4'>
            {currentOrderedList}
          </ol>,
        );
        currentOrderedList = [];
      }
      // Regular paragraph (with preserved line breaks)
      if (line.trim() !== '') {
        const paragraphContent = line.split('\n').map((subLine, subIndex) => (
          <p key={`${index}-${subIndex}`} className='mb-2'>
            {subLine}
          </p>
        ));
        elements.push(...paragraphContent);
      }
    }
  });

  // Push any remaining lists
  if (currentUnorderedList.length > 0) {
    elements.push(
      <ul key={`ul-final`} className='mb-4 ml-6 list-disc pl-4'>
        {currentUnorderedList}
      </ul>,
    );
  }
  if (currentOrderedList.length > 0) {
    elements.push(
      <ol key={`ol-final`} className='mb-4 ml-6 list-decimal pl-4'>
        {currentOrderedList}
      </ol>,
    );
  }

  return elements;
};

const MarkdownRenderer = ({ content }) => {
  const parsedContent = parseMarkdown(content);
  return <div className='leading-relaxed'>{parsedContent}</div>;
};

MarkdownRenderer.propTypes = {
  content: PropTypes.string.isRequired,
};

export default MarkdownRenderer;
