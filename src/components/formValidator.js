const ErrorMessages = {
  MustTenWords: 'Post must be at least 3 words.',
};

export function checkPostContent(content) {
  if (!content || content.trim().split(/\s+/).length < 3) {
    return ErrorMessages.MustTenWords;
  }
  return true;
}
