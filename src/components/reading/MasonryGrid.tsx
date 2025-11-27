"use client"

import { ReactNode } from 'react'

interface MasonryGridProps {
  children: ReactNode
  columns?: number
}

export function MasonryGrid({ children, columns = 5 }: MasonryGridProps) {
  return (
    <>
      <style jsx>{`
        .masonry-grid {
          column-count: ${columns};
          column-gap: 1rem;
        }
        
        @media (max-width: 640px) {
          .masonry-grid {
            column-count: 2;
            column-gap: 0.75rem;
          }
        }
        
        @media (min-width: 641px) and (max-width: 1024px) {
          .masonry-grid {
            column-count: 3;
            column-gap: 0.875rem;
          }
        }
        
        @media (min-width: 1025px) and (max-width: 1280px) {
          .masonry-grid {
            column-count: 4;
            column-gap: 1rem;
          }
        }
      `}</style>
      <div className="w-full masonry-grid">
        {children}
      </div>
    </>
  )
}

