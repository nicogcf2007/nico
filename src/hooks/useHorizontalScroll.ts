import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface HorizontalScrollOptions {
  itemSelector: string;
}

export const useHorizontalScroll = ({ itemSelector }: HorizontalScrollOptions) => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRefObj = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(activeIndex);
  const timelineRef = useRef<gsap.core.Timeline>();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateActiveIndex = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>(itemSelector, sectionRef.current ?? undefined);
    cardsRefObj.current = cards;
    
    const track = trackRef.current;
    const section = sectionRef.current;

    if (!track || !section || cards.length === 0) return;
    
    gsap.set(cards, { willChange: 'transform, opacity' });

    const ctx = gsap.context(() => {
      const firstCard = cards[0];
      const lastCard = cards[cards.length - 1];
      if (!firstCard || !lastCard) return;

      const getStartX = () => window.innerWidth / 2 - (firstCard.offsetLeft + firstCard.offsetWidth / 2);
      const getEndX = () => window.innerWidth / 2 - (lastCard.offsetLeft + lastCard.offsetWidth / 2);

      const startX = getStartX();
      const endX = getEndX();
      const totalScrollDistance = Math.abs(endX - startX);

      gsap.set(track, { x: startX });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.2,
          start: 'center center',
          end: () => `+=${totalScrollDistance}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const currentX = gsap.getProperty(track, 'x') as number;
            
            let closestIndex = -1;
            let minDistance = Infinity;
            const viewportCenter = window.innerWidth / 2;

            cards.forEach((card, index) => {
              if (card) {
                const cardCenter = card.offsetLeft + card.offsetWidth / 2 + currentX;
                const distance = Math.abs(cardCenter - viewportCenter);
                if (distance < minDistance) {
                  minDistance = distance;
                  closestIndex = index;
                }
              }
            });

            if (closestIndex !== -1 && activeIndexRef.current !== closestIndex) {
              updateActiveIndex(closestIndex);
            }
          }
        }
      });
      timelineRef.current = timeline;

      timeline.to(track, { x: endX, ease: 'none' });
    }, section);

    return () => {
      gsap.set(cards, { willChange: 'auto' });
      ctx.revert();
    }
  }, [itemSelector, updateActiveIndex]);

  useEffect(() => {
      cardsRefObj.current.forEach((card, index) => {
          if (card) {
              const isActive = index === activeIndex;
              gsap.to(card, {
                  scale: isActive ? 1 : 0.9,
                  opacity: isActive ? 1 : 0.6,
                  duration: 0.5,
                  ease: 'power3.out'
              });
          }
      });
  }, [activeIndex]);

  const goToCard = (index: number) => {
    const scrollTrigger = timelineRef.current?.scrollTrigger;
    const track = trackRef.current;
    const cards = cardsRefObj.current;

    const firstCard = cards[0];
    const lastCard = cards[cards.length-1];
    const targetCard = cards[index];

    if (!scrollTrigger || !track || !targetCard || !firstCard || !lastCard) return;

    const startX = window.innerWidth / 2 - (firstCard.offsetLeft + firstCard.offsetWidth / 2);
    const endX = window.innerWidth / 2 - (lastCard.offsetLeft + lastCard.offsetWidth / 2);
    const targetX = window.innerWidth / 2 - (targetCard.offsetLeft + targetCard.offsetWidth / 2);

    const clampedTargetX = gsap.utils.clamp(Math.min(startX, endX), Math.max(startX, endX), targetX);
    const progress = gsap.utils.mapRange(startX, endX, 0, 1, clampedTargetX);
    
    const y = scrollTrigger.start + progress * (scrollTrigger.end - scrollTrigger.start);

    gsap.to(window, {
      scrollTo: { y: y, autoKill: false },
      duration: 1,
      ease: 'power2.inOut',
    });
  };

  return { sectionRef, trackRef, activeIndex, goToCard };
}; 