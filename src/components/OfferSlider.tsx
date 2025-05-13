import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Tag, Zap, Gift, Truck } from 'lucide-react';

const offers = [
  {
    icon: Tag,
    title: 'Extra 10% Off',
    description: 'Use code EXTRA10'
  },
  {
    icon: Zap,
    title: 'Flash Sale',
    description: 'Up to 50% off'
  },
  {
    icon: Gift,
    title: 'Free Gift',
    description: 'On orders over $100'
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Worldwide delivery'
  }
];

const OfferSlider: React.FC = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false
      }}
      loop={true}
      slidesPerView={1}
      className="bg-gradient-to-r from-[#FF2E93] to-[#00D2C3] text-white rounded-xl p-4"
    >
      {offers.map((offer, index) => (
        <SwiperSlide key={index}>
          <div className="flex items-center justify-center gap-3">
            <offer.icon size={20} />
            <span className="font-medium">{offer.title}</span>
            <span className="text-white/80">|</span>
            <span className="text-white/80">{offer.description}</span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default OfferSlider;