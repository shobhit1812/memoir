/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BlogsCard = ({ title, description, owner, createdAt }) => {
  const name = owner?.fullName;
  const date = new Date(createdAt).toISOString().split("T")[0];

  return (
    <Card className="w-full md:w-[410px] my-4 mx-auto md:mx-2">
      <CardHeader>
        <CardTitle className="cursor-pointer">
          {title.length > 20 ? `${title.substring(0, 20)}...` : title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          {description.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
          <span className="text-blue-500 ml-2 cursor-pointer">
            {description.length > 100 && "Read more"}
          </span>
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <CardDescription>{date}</CardDescription>
        <CardDescription>{name}</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default BlogsCard;
