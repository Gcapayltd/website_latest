// SlideText — wraps button/link text in a slide-up-on-hover animation.
// The parent element must have the class `slide-trigger`.
export function SlideText({ children }: { children: React.ReactNode }) {
  return (
    <span className="slide-text-wrap">
      <span className="slide-text-a">{children}</span>
      <span className="slide-text-b" aria-hidden="true">{children}</span>
    </span>
  );
}

export default SlideText;
