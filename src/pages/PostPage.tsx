import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { marked } from "marked";
import xss from "xss";

const PostPage = () => {
  return (
    <Carousel className="bg-blue-200 max-w-md">
      <CarouselContent>
        <CarouselItem className="bg-gray-200 h-full">
          {marked
            .parse(
              xss(
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione sed"
              ),
              { breaks: true }
            )
            .toString()}
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default PostPage;
