import React from 'react';

export type CategoryType = 'macro' | 'other' | 'rating' | 'm&a' | 'regulatory' | 'management' | 'product';

interface CategoryBadgeProps {
  category: CategoryType | string;
}

const CATEGORY_MAP: Record<string, { label: string; color: string }> = {
  macro: { label: '🌍 Macro', color: 'var(--color-macro)' },
  rating: { label: '⭐ Rating', color: 'var(--color-rating)' },
  'm&a': { label: '🤝 M&A', color: 'var(--color-manda)' },
  regulatory: { label: '⚖️ Regulatory', color: 'var(--color-regulatory)' },
  management: { label: '👔 Management', color: 'var(--color-management)' },
  product: { label: '🚀 Product', color: 'var(--color-product)' },
  other: { label: '📰 General', color: 'var(--color-general)' },
};

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  const catKey = (category || 'other').toLowerCase();
  const config = CATEGORY_MAP[catKey] || CATEGORY_MAP['other'];

  return (
    <span
      style={{
        backgroundColor: `rgba(${hexToRgb(config.color)}, 0.15)`,
        color: config.color,
        border: `1px solid rgba(${hexToRgb(config.color)}, 0.3)`,
        padding: '4px 10px',
        borderRadius: '16px',
        fontSize: '0.65rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        display: 'inline-block',
      }}
    >
      {config.label}
    </span>
  );
};

// Helper function to extract RGB from hex or css var (assuming simple hex or fallback for this demo)
function hexToRgb(hexOrVar: string) {
  // If it's a CSS variable, we can't easily extract RGB inline without a ref, 
  // so for our custom properties let's just use a default green-ish rgb for the alpha
  // Since our badges use vars like var(--color-macro), we can't reliably do this inline.
  // Instead, let's just use the primary color's RGB for the background tint, or a neutral white.
  return '255, 255, 255'; 
}

export default CategoryBadge;
