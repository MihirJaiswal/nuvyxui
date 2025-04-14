import { ImageSlider, ImageLayer, Divider } from '../components/ImageComparison';

export const ImageComparisonDemo = () => {
  return (
    <div className="space-y-4 w-full flex flex-col items-center justify-center">
    <h2 className="text-2xl font-semibold mb-6">Image Comparison</h2>
    
    <ImageSlider 
      className="h-96 border rounded-xl overflow-hidden"
    >
      <ImageLayer 
        src="/assets/images/image-comparison/2.jpg" 
        alt="Original Image" 
        layer="first" 
      />
      <ImageLayer 
        src="/assets/images/image-comparison/1.jpg" 
        alt="Processed Image" 
        layer="second" 
      />
      <Divider width={4} handleSize={32} />
    </ImageSlider>
  </div>
  );
}