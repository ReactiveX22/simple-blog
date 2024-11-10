import PropTypes from 'prop-types';
import { useState } from 'react';

// fenced code blocks
export const RenderCodeBlock = ({ codeContent, language = '' }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(codeContent)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className='relative gap-1'>
      {language && (
        <div
          className='absolute right-2 top-2 cursor-pointer rounded bg-zinc-700/30 p-1.5 text-center text-sm'
          onClick={copyToClipboard}
        >
          <p>{language}</p>
        </div>
      )}

      {copied && (
        <div className='absolute right-2 top-12 rounded bg-zinc-700/30 p-1 text-center text-xs'>
          <p>✔️ Copied!</p>
        </div>
      )}

      <pre className={`rounded bg-zinc-800/50 p-4 ${language ? 'mt-6' : ''}`}>
        <code className='selection:bg-zinc-700/50'>{codeContent}</code>
      </pre>
    </div>
  );
};

RenderCodeBlock.propTypes = {
  codeContent: PropTypes.string,
  language: PropTypes.string,
};
