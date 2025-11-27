"use client"

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BookType } from '@/config/books'
import { BookOpen, Calendar, Star, X } from 'lucide-react'
import Image from 'next/image'

interface BookDetailModalProps {
  book: BookType
  isOpen: boolean
  onClose: () => void
}

export function BookDetailModal({ book, isOpen, onClose }: BookDetailModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-background border border-muted-foreground/20 shadow-2xl transition-all">
                {/* 关闭按钮 */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-muted transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col md:flex-row gap-6 p-6">
                  {/* 左侧：书籍封面 */}
                  <div className="flex-shrink-0 w-full md:w-48">
                    <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
                      {book.cover ? (
                        <Image
                          src={book.cover}
                          alt={book.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/10 via-muted/20 to-primary/5">
                          <BookOpen size={64} className="text-primary/30" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 右侧：书籍详情 */}
                  <div className="flex-1 flex flex-col gap-4">
                    {/* 标题 */}
                    <div>
                      <Dialog.Title
                        as="h2"
                        className="text-2xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
                      >
                        {book.title}
                      </Dialog.Title>
                      {book.author && (
                        <p className="text-base text-muted-foreground mt-2">
                          {book.author}
                        </p>
                      )}
                    </div>

                    {/* 评分和日期 */}
                    <div className="flex items-center gap-4 flex-wrap">
                      {book.rating && (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                          <Star size={16} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-semibold">{book.rating} / 5</span>
                        </div>
                      )}
                      {book.readDate && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar size={16} />
                          <span>阅读于 {book.readDate}</span>
                        </div>
                      )}
                    </div>

                    {/* 标签 */}
                    {book.tags && book.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {book.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors duration-300"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* 书评 */}
                    {book.review && (
                      <div className="mt-2">
                        <h3 className="text-sm font-semibold mb-2 text-muted-foreground">我的书评</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {book.review}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

