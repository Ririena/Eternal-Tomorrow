import React from "react";
import { Image } from "@nextui-org/react";
import { Card, CardHeader} from "../ui/card";
export default function HomePage() {
  return (
    <>
      <div className="container">
        <section className="flex justify-center items-center mt-4">
          <Card>
            <CardHeader>
              <Image
                src="/violetP.jpg"
                width={300}
                className="object-contain"
              />
            </CardHeader>
          </Card>
        </section>
      </div>
    </>
  );
}
