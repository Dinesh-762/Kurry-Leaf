import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ExternalLink, Send, CheckCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';

const GOOGLE_REVIEW_URL = 'https://share.google/NG3pCUeAMgPUBIw8b';
const REVIEW_REDIRECT = 'https://share.google/NG3pCUeAMgPUBIw8b';

export const GoogleReviewPrompt = () => {
  const { config } = useApp();
  const [step, setStep] = useState('rate'); // rate | redirect | feedback | done
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [feedback, setFeedback] = useState({ name: '', message: '' });

  const handleRate = (star) => {
    setRating(star);
    if (star >= 4) {
      setStep('redirect');
    } else {
      setStep('feedback');
    }
  };

  const handleGoogleRedirect = () => {
    setStep('done');
  };

  const handleFeedbackSubmit = () => {
    if (!feedback.name.trim() || !feedback.message.trim()) {
      toast.error('Please fill in your name and feedback');
      return;
    }
    // Store feedback locally
    const existing = JSON.parse(localStorage.getItem('kurryleaf_private_feedback') || '[]');
    existing.push({
      id: Date.now(),
      rating,
      name: feedback.name,
      message: feedback.message,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('kurryleaf_private_feedback', JSON.stringify(existing));
    setStep('done');
    toast.success('Thank you for your feedback!');
  };

  const handleReset = () => {
    setStep('rate');
    setRating(0);
    setHoveredStar(0);
    setFeedback({ name: '', message: '' });
  };

  return (
    <section className="py-12 sm:py-16 bg-warm-gradient" data-testid="google-review-prompt">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          {/* Card */}
          <div className="bg-card rounded-lg shadow-elegant overflow-hidden border border-border/50">
            {/* Header */}
            <div className="bg-primary px-6 py-5 text-center">
              <h3 className="font-elegant text-2xl sm:text-3xl text-primary-foreground font-medium">
                How was your experience?
              </h3>
              <p className="text-primary-foreground/70 text-sm mt-1">
                We'd love to hear from you
              </p>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Star Rating */}
                {step === 'rate' && (
                  <motion.div
                    key="rate"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center"
                    data-testid="review-rate-step"
                  >
                    <p className="text-muted-foreground text-sm mb-6">
                      Tap a star to rate your dining experience at {config.name}
                    </p>
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRate(star)}
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(0)}
                          className="p-1 transition-transform hover:scale-110 active:scale-95"
                          data-testid={`review-star-${star}`}
                        >
                          <Star
                            className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors ${
                              star <= (hoveredStar || rating)
                                ? 'text-accent fill-accent'
                                : 'text-muted-foreground/25'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground/60 mt-2">
                      {hoveredStar === 0 ? 'Select your rating' : 
                       hoveredStar <= 2 ? 'We can do better' :
                       hoveredStar === 3 ? 'It was okay' :
                       hoveredStar === 4 ? 'Great experience!' :
                       'Outstanding!'}
                    </p>
                  </motion.div>
                )}

                {/* Step 2a: Redirect to Google (4-5 stars) */}
                {step === 'redirect' && (
                  <motion.div
                    key="redirect"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center"
                    data-testid="review-redirect-step"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                      <Star className="w-8 h-8 text-accent fill-accent" />
                    </div>
                    <h4 className="font-elegant text-xl sm:text-2xl text-foreground mb-2">
                      Thank you for the {rating}-star rating!
                    </h4>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                      We're thrilled you enjoyed your experience! Would you mind sharing your thoughts on Google? It helps others discover {config.name}.
                    </p>
                    <a
                      href={REVIEW_REDIRECT}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleGoogleRedirect}
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground w-full sm:w-auto min-w-[200px] h-12 text-base px-6 font-medium hover:bg-primary/90 transition-colors"
                      data-testid="review-google-redirect-btn"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Leave a Google Review
                    </a>
                    <button
                      onClick={handleReset}
                      className="block mx-auto mt-3 text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                    >
                      Maybe later
                    </button>
                  </motion.div>
                )}

                {/* Step 2b: Private Feedback Form (1-3 stars) */}
                {step === 'feedback' && (
                  <motion.div
                    key="feedback"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    data-testid="review-feedback-step"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <MessageSquare className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-elegant text-lg text-foreground">
                          We'd love to improve
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Your feedback goes directly to our team
                        </p>
                      </div>
                    </div>

                    {/* Show selected rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= rating ? 'text-accent fill-accent' : 'text-muted-foreground/20'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-2">Your rating</span>
                    </div>

                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={feedback.name}
                        onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                        data-testid="review-feedback-name"
                      />
                      <Textarea
                        placeholder="Tell us what we can improve..."
                        value={feedback.message}
                        onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                        rows={3}
                        className="text-sm resize-none"
                        data-testid="review-feedback-message"
                      />
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={handleReset}
                          className="flex-1 h-11"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleFeedbackSubmit}
                          className="flex-1 h-11 gap-2"
                          data-testid="review-feedback-submit"
                        >
                          <Send className="w-4 h-4" />
                          Send Feedback
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Thank You */}
                {step === 'done' && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                    data-testid="review-done-step"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-elegant text-xl sm:text-2xl text-foreground mb-2">
                      Thank You!
                    </h4>
                    <p className="text-muted-foreground text-sm mb-6">
                      Your feedback means the world to us. We look forward to serving you again!
                    </p>
                    <button
                      onClick={handleReset}
                      className="text-sm text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                      data-testid="review-rate-again"
                    >
                      Rate again
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GoogleReviewPrompt;
