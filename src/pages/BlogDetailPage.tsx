import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, ArrowLeft, Eye, Tag, BookOpen } from 'lucide-react';
import { Navigation } from '@/components/sections/Navigation';
import { Footer } from '@/components/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: string;
  published_at: string;
  reading_time: number;
  views_count: number;
  featuredImage: { file_path: string; alt_text: string } | null;
  category: { name: string; slug: string } | null;
  tags: { name: string; slug: string }[];
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function DetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Banner skeleton */}
      <div className="w-full h-[420px] bg-[#141419]" />
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 space-y-6">
        <div className="h-8 w-3/4 bg-[#1f1f26] rounded-lg" />
        <div className="h-8 w-1/2 bg-[#1f1f26] rounded-lg" />
        <div className="flex gap-6">
          <div className="h-4 w-28 bg-[#1f1f26] rounded" />
          <div className="h-4 w-24 bg-[#1f1f26] rounded" />
        </div>
        <div className="space-y-3 mt-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={`h-4 bg-[#1f1f26] rounded ${i % 4 === 3 ? 'w-2/3' : 'w-full'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/content/posts/${slug}`);
        if (res.status === 404) { navigate('/blog', { replace: true }); return; }
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        setPost(data.data || data.post || data);
      } catch (err) {
        console.error('Failed to fetch post:', err);
        setError('Failed to load this article. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug, navigate]);

  // Reading progress bar
  useEffect(() => {
    const el = progressBarRef.current;
    if (!el || !post) return;
    const update = () => {
      const scrolled = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? Math.min(100, (scrolled / docH) * 100) : 0;
      el.style.width = `${pct}%`;
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [post]);

  // Animate in
  useLayoutEffect(() => {
    if (!post) return;
    const ctx = gsap.context(() => {
      if (bannerRef.current) {
        gsap.fromTo(bannerRef.current,
          { scale: 1.04, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }
        );
      }
      if (contentRef.current) {
        gsap.fromTo(contentRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, delay: 0.3, ease: 'power3.out' }
        );
      }
    });
    return () => ctx.revert();
  }, [post]);

  return (
    <div className="relative min-h-screen bg-[#0B0B0D]">
      <div className="grain-overlay" />
      <Navigation />

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[1001] h-[3px] bg-[#1a1a20]">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-[#C9A45C] to-[#A8843D] transition-none"
          style={{ width: '0%' }}
        />
      </div>

      {loading && (
        <div className="pt-16">
          <DetailSkeleton />
        </div>
      )}

      {error && (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-16">
          <BookOpen className="w-12 h-12 text-[#C9A45C]" />
          <p className="text-[#A9A6B0]">{error}</p>
          <Link
            to="/blog"
            className="px-6 py-2 bg-[#C9A45C] hover:bg-[#A8843D] text-[#0B0B0D] font-semibold rounded-xl text-sm transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      )}

      {!loading && !error && post && (
        <>
          {/* Full-width Banner */}
          <div ref={bannerRef} className="relative w-full" style={{ height: 'clamp(320px, 50vh, 560px)' }}>
            {post.featuredImage?.file_path ? (
              <>
                <img
                  src={post.featuredImage.file_path}
                  alt={post.featuredImage.alt_text || post.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/50 to-[#0B0B0D]/20" />
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-b from-[#141419] to-[#0B0B0D] flex items-center justify-center">
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #C9A45C 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                />
                <BookOpen className="w-16 h-16 text-[#C9A45C]/30" />
              </div>
            )}

            {/* Title overlay at bottom of banner */}
            <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-[8vw] pb-10 pt-20">
              <div className="max-w-3xl">
                {post.category && (
                  <span className="inline-block px-3 py-1 bg-[#C9A45C]/20 border border-[#C9A45C]/40 rounded-full text-xs font-medium text-[#C9A45C] backdrop-blur-sm mb-4">
                    {post.category.name}
                  </span>
                )}
                <h1 className="text-[clamp(24px,4vw,46px)] font-bold leading-tight tracking-[-0.02em] text-[#F4F1EC] drop-shadow-lg">
                  {post.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Article body */}
          <div ref={contentRef} className="max-w-3xl mx-auto px-6 lg:px-8">
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-5 py-8 border-b border-[#2a2a30] text-sm text-[#6b6875]">
              {post.published_at && (
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#C9A45C]" />
                  {formatDate(post.published_at)}
                </span>
              )}
              {post.reading_time > 0 && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C9A45C]" />
                  {post.reading_time} min read
                </span>
              )}
              {post.views_count > 0 && (
                <span className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#C9A45C]" />
                  {post.views_count.toLocaleString()} views
                </span>
              )}
            </div>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-lg text-[#A9A6B0] leading-relaxed italic pt-8 pb-2 border-l-2 border-[#C9A45C]/40 pl-5">
                {post.excerpt}
              </p>
            )}

            {/* Content */}
            <div
              className="blog-post-content prose-article py-10"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 py-8 border-t border-[#2a2a30]">
                <Tag className="w-4 h-4 text-[#C9A45C]" />
                {post.tags.map(tag => (
                  <span
                    key={tag.slug}
                    className="px-3 py-1 bg-[#141419] border border-[#2a2a30] rounded-full text-xs text-[#A9A6B0] hover:border-[#C9A45C]/40 hover:text-[#C9A45C] transition-colors cursor-default"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Back link */}
            <div className="py-10 border-t border-[#2a2a30]">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm text-[#A9A6B0] hover:text-[#C9A45C] transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                Back to Blog & Publications
              </Link>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}

export default BlogDetailPage;
