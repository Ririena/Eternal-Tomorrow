import { Snippet } from "@nextui-org/react";
import { Card, CardContent, CardFooter, CardHeader } from "../card";
import { cn } from "@/lib/utils";
import { Button } from "../button";
type CardProps = React.ComponentProps<typeof Card>;
export default function MainMeSecCard({ className, ...props }: CardProps) {
  return (
    <>
      <section className="pb-28 font-montserrat">
        <div className="mt-4">
          <section className="flex justify-center items-center">
            <div className="max-w-md  lg:max-w-lg xl:max-w-lg w-full">
              <Card className={cn("", className)} {...props}>
                <CardHeader>
                  <section className="mx-auto font-bold">
                    <h1>Step 1: Copy Your Link</h1>
                  </section>
                </CardHeader>
                <CardContent>
                  <div className="mx-auto text-md text-center">
                    <section>https://l4tomo.vercel.app</section>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="mx-auto">
                    <Snippet size="sm">https://l4tomo.vercel.app</Snippet>
                  </div>
                </CardFooter>
              </Card>

              <div className="mt-4">
                <Card className={cn("", className)} {...props}>
                  <CardHeader>
                    <section className="mx-auto font-bold">
                      <h1>Step 2: Share Link On Your Story</h1>
                    </section>
                  </CardHeader>
                  <CardContent>
                    <div className="items-center flex justify-center">
                      <Button>Share On WhatsApp</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
