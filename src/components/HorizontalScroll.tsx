import React from 'react';

export interface HorizontalScrollProps<T> {
  sectionRef: React.Ref<HTMLElement>;
  trackRef: React.Ref<HTMLDivElement>;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  sectionId: string;
  activeIndex: number;
  goToCard: (index: number) => void;
}

export function HorizontalScroll<T>({
  sectionRef,
  trackRef,
  items,
  renderItem,
  sectionId,
  activeIndex,
  goToCard,
}: HorizontalScrollProps<T>) {
  return (
    <section ref={sectionRef} id={sectionId} className="h-screen relative overflow-hidden">
      <div ref={trackRef} className="flex items-center h-full gap-10 lg:gap-20 px-[5vw] sm:px-[10vw] md:px-[15vw]">
        {items.map((item, index) => renderItem(item, index))}
      </div>

      {/* Indicador de progreso lateral para escritorio */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-3 z-20">
        {items.map((_, index: number) => (
          <button
            key={index}
            onClick={() => goToCard(index)}
            className={`w-2 h-8 rounded-full transition-all duration-500 ${
              index === activeIndex
                ? 'bg-accent-light shadow-lg shadow-accent-light/30'
                : 'bg-surface/40 hover:bg-surface/60'
            }`}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>

      {/* Indicador de progreso inferior para móvil */}
      <div className="lg:hidden absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {items.map((_, index: number) => (
          <button
            key={index}
            onClick={() => goToCard(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === index ? 'bg-accent w-8' : 'bg-gray-500/50 w-6'
            }`}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
} 