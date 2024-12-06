import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Link, Image, Divider } from "@nextui-org/react";

// Define the interface for props
interface QueryProp {
  title: string;
  link: string;
  description: string;
  imageSrc: string;
  footerLink?: string; // Optional footer link
}

// React functional component with QueryProp interface
const QueryCard: React.FC<QueryProp> = ({ title, link, description, imageSrc, footerLink }) => {
  return (
    <Card className="bg-darkGray hover:bg-gray-800 transform transition-all duration-300 shadow-lg hover:shadow-xl">
      <CardHeader className="flex gap-3">
        <Image
          alt="thumbnail"
          height={40}
          radius="sm"
          className="hover:brightness-125 transition-all duration-300"
          src={imageSrc}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md font-bold text-white">{title}</p>
          <p className="text-small text-default-500">
            <Link
              isExternal
              href={link}
              className="text-red-600 text-xs hover:text-red-400 transition-colors duration-300"
            >
              {link}
            </Link>
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="text-white">
        <p>{description}</p>
      </CardBody>
      {footerLink && (
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href={footerLink}
            className="text-blue-500 hover:text-blue-300 transition-colors duration-300"
          >
            Visit source
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default QueryCard;
