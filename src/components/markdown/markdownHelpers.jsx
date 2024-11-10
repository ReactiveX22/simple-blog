export const generateIdFromText = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace spaces and special characters with a hyphen
    .replace(/^-/, ''); // Remove any leading hyphen (in case the first character is non-alphanumeric)
};

export const renderHeading = (line, level) => {
  const headingText = line.slice(level + 1);
  const id = generateIdFromText(headingText);
  let fontType = '';
  switch (level) {
    case 1:
      fontType = 'bold';
      break;
    case 2:
      fontType = 'semibold';
      break;
    case 3:
      fontType = 'medium';
      break;

    default:
      break;
  }

  return (
    <h1
      key={id}
      id={id}
      className={`mb-4 font-${fontType} text-${4 - level === 1 ? '' : 4 - level}xl`}
    >
      <a href={`#${id}`}>
        <span className='text-gray-800'># </span>
        {headingText}
      </a>
    </h1>
  );
};

export const renderBoldText = (line) => {
  const parts = line.split('**');
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={`bold-${i}`} className='font-bold'>
        {part}
      </strong>
    ) : (
      part
    ),
  );
};

export const renderItalicText = (line) => {
  const parts = line.split('*');
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <em key={`italic-${i}`} className='italic'>
        {part}
      </em>
    ) : (
      part
    ),
  );
};

export const renderCode = (line, index) => {
  const parts = line.split('`');
  return (
    <p key={index} className='mb-2'>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <code key={i} className='rounded bg-zinc-900 p-1 font-mono text-sm'>
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </p>
  );
};

export const renderHorizontalRule = (index) => {
  return <hr key={index} className='my-4 border-zinc-800' />;
};

export const renderLink = (line, index) => {
  const regex = /\[(.*?)\]\((.*?)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(line)) !== null) {
    parts.push(line.slice(lastIndex, match.index));
    parts.push(
      <a
        key={`${index}-${match.index}`}
        href={match[2]}
        className='text-blue-500 underline'
      >
        {match[1]}
      </a>,
    );
    lastIndex = regex.lastIndex;
  }
  parts.push(line.slice(lastIndex));

  return (
    <p key={index} className='mb-2'>
      {parts}
    </p>
  );
};

export const renderImage = (line, key) => {
  const imageRegex = /!\[(.*?)\]\((.*?)\s+(\d+)x(\d+)\)/;
  const match = line.match(imageRegex);
  if (match) {
    const altText = match[1];
    const url = match[2];
    const width = match[3];
    const height = match[4];
    return (
      <img
        key={key}
        src={url}
        alt={altText}
        width={width}
        height={height}
        className='mx-auto my-4 max-w-full cursor-pointer rounded'
      />
    );
  }
  return null;
};
