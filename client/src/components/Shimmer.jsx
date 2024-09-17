import { Card } from "@/components/ui/card";

const Shimmer = ({ numberOfBlogs }) => {
  return (
    <>
      {Array(numberOfBlogs)
        ?.fill(0)
        ?.map((_, index) => (
          <div key={index}>
            <Card className="h-[210px] w-[405px] bg-[#09090b] text-[#fafafa] rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="animate-pulse p-8">
                <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              </div>
            </Card>
          </div>
        ))}
    </>
  );
};

export default Shimmer;
