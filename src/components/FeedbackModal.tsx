
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal = ({ isOpen, onClose }: FeedbackModalProps) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [satisfaction, setSatisfaction] = useState<'good' | 'bad' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!satisfaction && rating === 0) {
      toast.error("Please provide at least a rating or satisfaction level");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('feedback')
        .insert({
          rating: rating > 0 ? rating : null,
          satisfaction: satisfaction,
          feedback_text: feedback.trim() || null
        });

      if (error) {
        throw error;
      }

      toast.success("Thank you for your feedback! It helps us improve our AI resume builder.");
      
      // Reset form
      setRating(0);
      setFeedback('');
      setSatisfaction(null);
      onClose();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setRating(0);
    setFeedback('');
    setSatisfaction(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-w-[90vw] mx-auto">
        <DialogHeader>
          <DialogTitle>How was your experience?</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 p-4">
          {/* Satisfaction */}
          <div>
            <p className="text-sm font-medium mb-3">Were you satisfied with the AI resume builder?</p>
            <div className="flex gap-3 justify-center">
              <Button
                variant={satisfaction === 'good' ? 'default' : 'outline'}
                onClick={() => setSatisfaction('good')}
                className="flex items-center gap-2"
                disabled={isSubmitting}
              >
                <ThumbsUp className="w-4 h-4" />
                Yes
              </Button>
              <Button
                variant={satisfaction === 'bad' ? 'default' : 'outline'}
                onClick={() => setSatisfaction('bad')}
                className="flex items-center gap-2"
                disabled={isSubmitting}
              >
                <ThumbsDown className="w-4 h-4" />
                No
              </Button>
            </div>
          </div>

          {/* Star Rating */}
          <div>
            <p className="text-sm font-medium mb-3">Rate your experience</p>
            <div className="flex gap-1 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                  disabled={isSubmitting}
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300 hover:text-yellow-400'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Text Feedback */}
          <div>
            <label className="text-sm font-medium block mb-2">
              Any additional feedback? (Optional)
            </label>
            <Textarea
              placeholder="Tell us how we can improve our AI resume builder..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[80px] resize-none"
              disabled={isSubmitting}
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-2">
            <Button 
              variant="outline" 
              onClick={handleClose} 
              className="flex-1"
              disabled={isSubmitting}
            >
              Skip
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={(!satisfaction && rating === 0) || isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
