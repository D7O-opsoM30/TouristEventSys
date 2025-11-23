
import React from 'react';
import { useForm } from 'react-hook-form';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

interface ReviewFormProps {
  eventId: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface ReviewFormValues {
  rating: number;
  title: string;
  text: string;
}

const ReviewForm = ({ eventId, onSuccess, onCancel }: ReviewFormProps) => {
  const { toast } = useToast();
  const [hoveredRating, setHoveredRating] = React.useState(0);
  
  const form = useForm<ReviewFormValues>({
    defaultValues: {
      rating: 0,
      title: '',
      text: '',
    },
  });

  const selectedRating = form.watch('rating');

  const handleSubmit = (data: ReviewFormValues) => {
    if (data.rating === 0) {
      toast({
        title: "تقييم مطلوب",
        description: "يرجى اختيار تقييم من 1 إلى 5 نجوم",
        variant: "destructive",
      });
      return;
    }
    
    console.log('Submitting review for event', eventId, data);
    
    // Here you would typically send this data to your API
    // For now, we'll just show a success message
    toast({
      title: "تم إرسال التقييم",
      description: "شكراً على مشاركة رأيك حول هذه الفعالية",
    });
    
    if (onSuccess) {
      onSuccess();
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">شارك تجربتك</h2>
      <p className="text-gray-600 mb-6">قم بتقييم ومشاركة رأيك حول هذه الفعالية</p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Star Rating */}
          <div className="mb-6">
            <FormLabel className="block mb-2">التقييم</FormLabel>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => form.setValue('rating', star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="text-2xl focus:outline-none"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star 
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || selectedRating) 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-300'
                    } transition-colors`}
                  />
                </button>
              ))}
              <span className="ml-2 text-gray-600">
                {selectedRating > 0 ? `${selectedRating}/5` : ""}
              </span>
            </div>
          </div>
          
          {/* Review Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عنوان المراجعة</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="ملخص تجربتك في عنوان قصير" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Review Text */}
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>المراجعة</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="شارك تفاصيل تجربتك في هذه الفعالية" 
                    className="min-h-32" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
              >
                إلغاء
              </Button>
            )}
            <Button 
              type="submit" 
              className="bg-[#9b87f5] hover:bg-[#7E69AB]"
            >
              إرسال المراجعة
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ReviewForm;
