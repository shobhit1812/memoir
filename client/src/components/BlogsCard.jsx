/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BlogsCard = ({ title, description, owner, createdAt, _id }) => {
  const name = owner?.fullName;
  const date = new Date(createdAt).toISOString().split("T")[0];

  const user = useSelector((store) => store?.user);

  return (
    <Card className="w-full h-full shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="cursor-pointer text-xl font-semibold">
          <Link to={`/browse/${user._id}/detailed-blog/${title}/${_id}`}>
            {" "}
            {title.length > 20 ? `${title.substring(0, 20)}...` : title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">
          {description.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
          <span className="text-blue-500 ml-2 cursor-pointer">
            <Link to={`/browse/${user._id}/detailed-blog/${title}/${_id}`}>
              {" "}
              {description.length > 100 && "Read more"}
            </Link>
          </span>
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between text-xs">
        <CardDescription>{date}</CardDescription>
        <CardDescription>{name}</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default BlogsCard;
