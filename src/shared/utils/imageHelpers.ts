export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>): void => {
  const target = e.target as HTMLImageElement;
  target.style.display = 'none';
};

