import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Quote, ExternalLink, RefreshCw } from 'lucide-react';

const REVIEW_REDIRECT = 'https://share.google/NG3pCUeAMgPUBIw8b';
const API_URL = process.env.REACT_APP_BACKEND_URL;

const RatingStars = ({ rating }) => (
  <div className="flex items-center gap-0.5" data-testid="rating-stars">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-4 h-4 ${
          star <= Math.round(rating) ? 'text-accent fill-accent' : 'text-white/20'
        }`}
      />
    ))}
  </div>
);

const ReviewCard = ({ review, index }) => {
  const timeAgo = (dateStr) => {
    const d = new Date(dateStr);
    const now = new Date();
    const days = Math.floor((now - d) / (1000 * 60 * 60 * 24));
    if (days < 1) return 'Today';
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (days < 30) return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? 's' : ''} ago`;
    if (days < 365) return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? 's' : ''} ago`;
    return `${Math.floor(days / 365)} year${Math.floor(days / 365) > 1 ? 's' : ''} ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="h-full"
      data-testid={`review-card-${index}`}
    >
      <Card className="h-full border-0 shadow-soft hover:shadow-medium transition-all duration-300">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm shrink-0">
                {review.author_name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm" data-testid="review-author">{review.author_name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? 'text-accent fill-accent' : 'text-muted-foreground/20'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{timeAgo(review.time)}</span>
                </div>
              </div>
            </div>
            <Quote className="w-6 h-6 text-primary/15 shrink-0" />
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">"{review.text}"</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const ReviewsSection = () => {
  const [reviewData, setReviewData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/reviews/google`);
      if (res.ok) {
        const data = await res.json();
        setReviewData(data);
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
    // Auto-refresh every 30 minutes
    const interval = setInterval(fetchReviews, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchReviews]);

  const rating = reviewData?.rating || 4.0;
  const totalReviews = reviewData?.total_reviews || 108;
  const reviews = reviewData?.reviews || [];

  return (
    <section id="reviews" className="section-spacing bg-foreground text-white" data-testid="reviews-section">
      <div className="section-container">
        {/* Rating Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-4 mb-4" data-testid="rating-summary">
            <span className="text-5xl sm:text-6xl font-elegant font-medium">{rating}</span>
            <div className="text-left">
              <RatingStars rating={rating} />
              <p className="text-white/60 text-sm mt-1">{totalReviews} Google Reviews</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-white/40 text-xs">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Synced from Google</span>
            {loading && <RefreshCw className="w-3 h-3 animate-spin" />}
          </div>
        </motion.div>

        <SectionTitle
          subtitle="Testimonials"
          title="What Our Guests Say"
          description="Real reviews from our valued customers on Google"
          light
        />

        {/* Reviews Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10" data-testid="reviews-grid">
          {reviews.slice(0, 6).map((review, index) => (
            <ReviewCard key={index} review={review} index={index} />
          ))}
        </div>

        {/* Leave a Review CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href={REVIEW_REDIRECT}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/30 text-white px-6 py-3 text-sm font-medium transition-colors hover:bg-white/10"
            data-testid="leave-google-review-btn"
          >
            <ExternalLink className="w-4 h-4" />
            Leave a Review on Google
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
