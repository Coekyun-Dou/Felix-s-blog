"use client"

import { BookType } from '@/config/books'
import { BookOpen } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { BookDetailModal } from './BookDetailModal'

export function BookCard({ book }: { book: BookType }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div 
        className="group relative flex flex-col break-inside-avoid mb-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden border border-muted-foreground/20 shadow-md transition-all duration-300 group-hover:scale-[1.05] group-hover:shadow-2xl group-hover:border-primary/40">
          {/* 书籍封面 */}
          {book.cover ? (
            <Image
              src={book.cover}
              alt={book.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/10 via-muted/20 to-primary/5">
              <BookOpen size={48} className="text-primary/30" />
            </div>
          )}
          
          {/* Hover遮罩层显示标题 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-3 w-full">
              <h3 className="text-white text-sm font-semibold line-clamp-2">
                {book.title}
              </h3>
              {book.author && (
                <p className="text-white/80 text-xs mt-1">{book.author}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 详情弹窗 */}
      <BookDetailModal 
        book={book} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  )
}

