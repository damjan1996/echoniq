import { BlogList, FeaturedBlogList } from './BlogList';
import { Categories, ScrollingCategories } from './Categories';
import { Hero, FeaturedPostHero } from './Hero';
import { Pagination } from './Pagination';
import { PostCard } from './PostCard';
import { Search } from './Search';
import { Sidebar } from './Sidebar';

export {
  BlogList,
  FeaturedBlogList,
  Categories,
  ScrollingCategories,
  Hero,
  FeaturedPostHero,
  Pagination,
  PostCard,
  Search,
  Sidebar,
};

// Sicherer Default-Export, der keine Daten benötigt
export default function BlogComponentsIndex() {
  if (typeof window === 'undefined') {
    // Beim Server-Side Rendering: Zeige eine einfache Platzhalterseite
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Blog Components</h1>
          <p className="mb-6">
            Diese URL enthält Blog-Komponenten und ist keine eigenständige Seite.
          </p>
        </div>
      </div>
    );
  }

  // Im Browser: Leite zur Hauptseite um
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }

  return null;
}
