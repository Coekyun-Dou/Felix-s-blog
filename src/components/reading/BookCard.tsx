"use client"

import { BookType } from '@/config/books'
import { BookOpen } from 'lucide-react'
import Image from 'next/image'
import { useState, useMemo } from 'react'
import { useTheme } from 'next-themes'
import { BookDetailModal } from './BookDetailModal'

export function BookCard({ book }: { book: BookType }) {
  const [isOpen, setIsOpen] = useState(false)
  const { resolvedTheme } = useTheme()
  
  // 根据主题选择封面
  const coverImage = resolvedTheme === 'dark' ? book.coverDark : book.coverLight
  
  // 为每本书生成一个固定的随机样式（基于ID保持一致性）
  const cardStyle = useMemo(() => {
    // 使用书籍ID作为随机种子，确保每次渲染样式一致
    const seed = book.id
    const random = (min: number, max: number) => {
      const x = Math.sin(seed * 12.9898) * 43758.5453
      return min + (x - Math.floor(x)) * (max - min)
    }
    
    // 随机高宽比，让卡片高度不一致
    const aspectRatios = ['3/4', '2/3', '4/5', '3/5', '5/7']
    const aspectRatio = aspectRatios[Math.floor(random(0, aspectRatios.length))]
    
    // 随机旋转角度
    const rotation = random(-2, 2)
    
    // 随机边距
    const marginBottom = random(0.5, 1.5)
    
    return {
      aspectRatio,
      rotation,
      marginBottom
    }
  }, [book.id])

  return (
    <>
      <div 
        className="group relative flex flex-col break-inside-avoid cursor-pointer"
        style={{ 
          marginBottom: `${cardStyle.marginBottom}rem`,
          transform: `rotate(${cardStyle.rotation}deg)`,
          transition: 'transform 0.3s ease'
        }}
        onClick={() => setIsOpen(true)}
      >
        <div 
          className="relative w-full rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:scale-[1.05] group-hover:shadow-2xl group-hover:rotate-0 border border-muted-foreground/20 group-hover:border-primary/40 dark:border-muted-foreground/10"
          style={{
            aspectRatio: cardStyle.aspectRatio
          }}
        >
          {/* 书籍封面 */}
          {coverImage ? (
            <Image
              src={coverImage}
              alt={book.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority={book.id <= 6}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/10 via-muted/20 to-primary/5">
              <BookOpen size={48} className="text-primary/30" />
            </div>
          )}
          
          {/* Hover遮罩层显示标题 - 深色模式 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end dark:from-black/90 dark:via-black/60">
            <div className="p-3 w-full">
              <h3 className="text-white text-sm font-semibold line-clamp-2 drop-shadow-lg">
                {book.title}
              </h3>
              {book.author && (
                <p className="text-white/90 text-xs mt-1 drop-shadow-md">{book.author}</p>
              )}
            </div>
          </div>
          
          {/* 装饰性光晕效果 */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-primary/20 via-transparent to-primary/30" />
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

