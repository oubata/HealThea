import {
  Hero,
  TeaHouseFeature,
  TeaAssortment,
  PopularProducts,
  StatsCta,
  ImageGallery,
  ClientLogos,
  BlogPreview,
} from "@/components/home";

export default function Home() {
  return (
    <>
      <Hero />
      <TeaHouseFeature />
      <TeaAssortment />
      <PopularProducts />
      <StatsCta />
      <ImageGallery />
      <ClientLogos />
      <BlogPreview />
    </>
  );
}
