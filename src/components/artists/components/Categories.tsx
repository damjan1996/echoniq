"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/router"
import React from "react"

import { cn } from "@/lib/utils"

interface Category {
  id: string
  name: string
  slug: string
  count?: number
}

interface CategoriesProps {
  categories: Category[]
  selectedCategory?: string
  onCategoryChange?: (categorySlug: string) => void
  className?: string
}

export const Categories: React.FC<CategoriesProps> = ({
                                                        categories,
                                                        selectedCategory,
                                                        onCategoryChange,
                                                        className,
                                                      }) => {
  const router = useRouter()

  // If no selectedCategory is provided, try to get it from the URL
  const activeCategory = selectedCategory || (router.query.genre as string)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  // Handle category selection
  const handleCategoryClick = (categorySlug: string) => {
    if (onCategoryChange) {
      onCategoryChange(categorySlug)
    } else {
      // If no handler is provided, update the URL
      const query = { ...router.query }

      if (categorySlug === "all") {
        // Remove genre filter if 'all' is selected
        delete query.genre
      } else {
        // Add or update genre filter
        query.genre = categorySlug
      }

      router.push(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { scroll: false },
      )
    }
  }

  return (
    <div className={cn("mb-8", className)}>
      <motion.div
        className="flex flex-wrap gap-2 md:gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* "All" category */}
        <motion.div variants={itemVariants}>
          <button
            onClick={() => handleCategoryClick("all")}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              !activeCategory
                ? "bg-white text-black dark:bg-white dark:text-black"
                : "bg-[#1A1A1A] text-gray-300 hover:bg-[#2A2A2A] hover:text-white",
            )}
          >
            All
          </button>
        </motion.div>

        {/* Genre categories */}
        {categories.map((category) => (
          <motion.div key={category.id} variants={itemVariants}>
            <button
              onClick={() => handleCategoryClick(category.slug)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeCategory === category.slug
                  ? "bg-white text-black"
                  : "bg-[#1A1A1A] text-gray-300 hover:bg-[#2A2A2A] hover:text-white",
              )}
            >
              {category.name}
              {category.count !== undefined && <span className="ml-1 text-xs opacity-70">({category.count})</span>}
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// Alternative design for horizontal scrolling categories
export const ScrollingCategories: React.FC<CategoriesProps> = ({
                                                                 categories,
                                                                 selectedCategory,
                                                                 onCategoryChange,
                                                                 className,
                                                               }) => {
  const router = useRouter()
  const scrollRef = React.useRef<HTMLDivElement>(null)

  // If no selectedCategory is provided, try to get it from the URL
  const activeCategory = selectedCategory || (router.query.genre as string)

  // Handle scrolling for mobile
  React.useEffect(() => {
    if (scrollRef.current && activeCategory) {
      const activeElement = scrollRef.current.querySelector(`[data-category="${activeCategory}"]`)
      if (activeElement) {
        // Scroll the active category into view
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        })
      }
    }
  }, [activeCategory])

  // Handle category selection
  const handleCategoryClick = (categorySlug: string) => {
    if (onCategoryChange) {
      onCategoryChange(categorySlug)
    } else {
      // If no handler is provided, update the URL
      const query = { ...router.query }

      if (categorySlug === "all") {
        // Remove genre filter if 'all' is selected
        delete query.genre
      } else {
        // Add or update genre filter
        query.genre = categorySlug
      }

      router.push(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { scroll: false },
      )
    }
  }

  return (
    <div className={cn("relative", className)}>
      {/* Fade indicators for horizontal scrolling */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Scrollable container */}
      <div ref={scrollRef} className="flex overflow-x-auto py-2 scrollbar-hide -mx-4 px-4">
        <div className="flex space-x-2 md:space-x-3">
          {/* "All" category */}
          <button
            onClick={() => handleCategoryClick("all")}
            data-category="all"
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
              !activeCategory
                ? "bg-white text-black"
                : "bg-[#1A1A1A] text-gray-300 hover:bg-[#2A2A2A] hover:text-white",
            )}
          >
            All
          </button>

          {/* Genre categories */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.slug)}
              data-category={category.slug}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                activeCategory === category.slug
                  ? "bg-white text-black"
                  : "bg-[#1A1A1A] text-gray-300 hover:bg-[#2A2A2A] hover:text-white",
              )}
            >
              {category.name}
              {category.count !== undefined && <span className="ml-1 text-xs opacity-70">({category.count})</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Categories
