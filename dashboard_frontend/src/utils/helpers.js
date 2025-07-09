// Date formatting utility
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Status color mapping
export const getStatusColor = (status) => {
  switch (status) {
    case 'Minimum reached':
      return 'text-green-600 bg-green-50';
    case 'In progress':
      return 'text-blue-600 bg-blue-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

// Over target color mapping
export const getOverTargetColor = (allowOverTarget) => {
  switch (allowOverTarget) {
    case 'Always':
      return 'text-green-600 bg-green-50';
    case 'Never':
      return 'text-red-600 bg-red-50';
    case 'Agent decides':
      return 'text-yellow-600 bg-yellow-50';
    case 'Survey routing':
      return 'text-blue-600 bg-blue-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

// Progress percentage calculation
export const getProgressPercentage = (completed, maxTarget) => {
  if (maxTarget === 0) return 0;
  return Math.min((completed / maxTarget) * 100, 100);
};