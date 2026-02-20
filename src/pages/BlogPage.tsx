import { useEffect, useRef, useLayoutEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, ChevronRight, ChevronLeft, Search, BookOpen } from 'lucide-react';
import { Navigation } from '@/components/sections/Navigation';
import { Footer } from '@/components/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: string;
  published_at: string;
  reading_time: number;
  views_count: number;
  featuredImage: { file_path: string; alt_text: string } | null;
  category: { name: string; slug: string } | null;
  tags: { name: string; slug: string }[];
}

interface ApiResponse {
  success: boolean;
  data: BlogPost[];
  pagination: { current_page: number; total_pages: number; total_items: number; items_per_page: number };
}

const PAGE_SIZE = 9;

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function PostCardSkeleton() {
  return (
    <div className="bg-[#141419] border border-[#2a2a30] rounded-2xl overflow-hidden animate-pulse">
      <div className="w-full h-52 bg-[#1f1f26]" />
      <div className="p-6 space-y-3">
        <div className="h-4 w-24 bg-[#1f1f26] rounded-full" />
        <div className="h-6 w-full bg-[#1f1f26] rounded-lg" />
        <div className="h-6 w-3/4 bg-[#1f1f26] rounded-lg" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-[#1f1f26] rounded" />
          <div className="h-4 w-5/6 bg-[#1f1f26] rounded" />
        </div>
        <div className="flex gap-4 pt-2">
          <div className="h-3 w-20 bg-[#1f1f26] rounded" />
          <div className="h-3 w-20 bg-[#1f1f26] rounded" />
        </div>
      </div>
    </div>
  );
}

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6,
          delay: (index % 3) * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' }
        }
      );
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={cardRef}>
      <Link to={`/blog/${post.slug || post.id}`} className="group block h-full">
        <article className="h-full bg-[#141419] border border-[#2a2a30] rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-[#C9A45C]/40 group-hover:shadow-[0_0_30px_rgba(201,164,92,0.08)]">
          {/* Cover image */}
          <div className="relative w-full h-52 overflow-hidden bg-[#1a1a20]">
            {post.featuredImage?.file_path ? (
              <img
                src={post.featuredImage.file_path}
                alt={post.featuredImage.alt_text || post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-[#2a2a30]" />
              </div>
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141419]/60 to-transparent" />
            {/* Category badge */}
            {post.category && (
              <div className="absolute top-4 left-4">
                <span className="inline-block px-3 py-1 bg-[#C9A45C]/20 border border-[#C9A45C]/40 rounded-full text-xs font-medium text-[#C9A45C] backdrop-blur-sm">
                  {post.category.name}
                </span>
              </div>
            )}
          </div>

          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-lg font-semibold text-[#F4F1EC] leading-snug line-clamp-2 mb-3 group-hover:text-[#C9A45C] transition-colors duration-200">
              {post.title}
            </h3>

            {post.excerpt && (
              <p className="text-sm text-[#A9A6B0] leading-relaxed line-clamp-3 mb-4 flex-1">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#2a2a30]">
              <div className="flex items-center gap-4 text-xs text-[#6b6875]">
                {post.published_at && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(post.published_at)}
                  </span>
                )}
                {post.reading_time > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {post.reading_time} min read
                  </span>
                )}
              </div>
              <span className="text-xs text-[#C9A45C] flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                Read <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}

export function BlogPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const filteredPosts = useMemo(() => {
    let result = allPosts;
    if (activeCategory) result = result.filter(p => p.category?.name === activeCategory);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.excerpt || '').toLowerCase().includes(q)
      );
    }
    return result;
  }, [allPosts, activeCategory, search]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const posts = filteredPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ status: 'published', limit: '50' });
        const res = await fetch(`${API_BASE}/api/content/posts?${params.toString()}`);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data: ApiResponse = await res.json();
        const list: BlogPost[] = data.data || [];
        setAllPosts(list);
        const cats = Array.from(
          new Set(list.map(p => p.category?.name).filter(Boolean) as string[])
        );
        setCategories(cats);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError('Failed to load posts. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  };

  const handleCategory = (cat: string) => {
    setActiveCategory(prev => prev === cat ? '' : cat);
    setPage(1);
  };

  const goToPage = (n: number) => {
    setPage(n);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#0B0B0D]">
      <div className="grain-overlay" />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 lg:px-[8vw] overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img src="/blog.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D]/60 via-[#0B0B0D]/75 to-[#0B0B0D]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0D]/40 to-[#0B0B0D]/40" />
        </div>

        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-[#C9A45C]/10 border border-[#C9A45C]/30 rounded-full text-sm text-[#C9A45C] mb-6">
            Knowledge & Insights
          </span>
          <h1 className="text-[clamp(32px,5vw,60px)] font-bold leading-tight tracking-[-0.03em] text-[#F4F1EC] mb-5">
            Blog & Publications
          </h1>
          <p className="text-lg text-[#A9A6B0] leading-relaxed max-w-2xl mx-auto mb-10">
            Expert perspectives on payments, fintech, and the African digital economy — straight from the GCA Pay team.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex items-center max-w-lg mx-auto gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6875]" />
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-11 pr-4 py-3 bg-[#141419] border border-[#2a2a30] rounded-xl text-sm text-[#F4F1EC] placeholder:text-[#6b6875] focus:outline-none focus:border-[#C9A45C]/50 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 bg-[#C9A45C] hover:bg-[#A8843D] text-[#0B0B0D] font-semibold text-sm rounded-xl transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Category Filters */}
      {categories.length > 0 && (
        <section className="px-6 lg:px-[8vw] pb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => handleCategory('')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === ''
                  ? 'bg-[#C9A45C] text-[#0B0B0D] border-[#C9A45C]'
                  : 'bg-[#141419] text-[#A9A6B0] border-[#2a2a30] hover:border-[#C9A45C]/40 hover:text-[#F4F1EC]'
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeCategory === cat
                    ? 'bg-[#C9A45C] text-[#0B0B0D] border-[#C9A45C]'
                    : 'bg-[#141419] text-[#A9A6B0] border-[#2a2a30] hover:border-[#C9A45C]/40 hover:text-[#F4F1EC]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="px-6 lg:px-[8vw] pb-24">
        {error && (
          <div className="text-center py-20">
            <p className="text-[#A9A6B0] mb-4">{error}</p>
            <button
              onClick={() => { setPage(1); setError(null); }}
              className="px-6 py-2 bg-[#C9A45C] hover:bg-[#A8843D] text-[#0B0B0D] font-semibold rounded-xl text-sm transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => <PostCardSkeleton key={i} />)}
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-28">
            <div className="w-20 h-20 mx-auto mb-6 bg-[#141419] border border-[#2a2a30] rounded-2xl flex items-center justify-center">
              <BookOpen className="w-9 h-9 text-[#C9A45C]" />
            </div>
            <h3 className="text-xl font-semibold text-[#F4F1EC] mb-2">No articles found</h3>
            <p className="text-[#A9A6B0]">
              {search ? `No results for "${search}"` : activeCategory ? `No posts in "${activeCategory}"` : 'Check back soon for new content.'}
            </p>
            {(search || activeCategory) && (
              <button
                onClick={() => { setSearch(''); setSearchInput(''); setActiveCategory(''); setPage(1); }}
                className="mt-6 px-6 py-2 border border-[#2a2a30] rounded-xl text-sm text-[#A9A6B0] hover:text-[#F4F1EC] hover:border-[#C9A45C]/40 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-14">
                <button
                  disabled={page === 1}
                  onClick={() => goToPage(Math.max(1, page - 1))}
                  className="flex items-center gap-2 px-4 py-2 bg-[#141419] border border-[#2a2a30] rounded-xl text-sm text-[#A9A6B0] hover:text-[#F4F1EC] hover:border-[#C9A45C]/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i + 1)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
                        page === i + 1
                          ? 'bg-[#C9A45C] text-[#0B0B0D]'
                          : 'text-[#A9A6B0] hover:text-[#F4F1EC] hover:bg-[#1a1a20]'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  disabled={page === totalPages}
                  onClick={() => goToPage(Math.min(totalPages, page + 1))}
                  className="flex items-center gap-2 px-4 py-2 bg-[#141419] border border-[#2a2a30] rounded-xl text-sm text-[#A9A6B0] hover:text-[#F4F1EC] hover:border-[#C9A45C]/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default BlogPage;
