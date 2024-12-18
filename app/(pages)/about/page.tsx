import MaxWidthWrapper from "@/components/maxWidthWrapper";
import React from "react";

export default function page() {
  return (
    <MaxWidthWrapper>
      <div className="my-5">
        <h2 className="font-semibold text-4xl">About us</h2>
      </div>
      <div className="flex flex-col space-y-8">
        <p className="text-muted-foreground text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
          ullam quisquam aliquid eum quasi architecto consequatur error! Commodi
          quia repudiandae asperiores animi vel modi expedita dicta. Perferendis
          deserunt cumque quo dolorem eligendi, quia quasi eveniet velit
          adipisci deleniti odit nisi quas laborum veritatis soluta ea ut quidem
          rerum aliquam quaerat doloremque commodi culpa sunt quibusdam? Cumque
          voluptatibus animi neque quae fuga totam eligendi quibusdam possimus
          dolore incidunt nam odio corrupti nihil, labore quisquam tempore
          accusantium vel corporis sunt numquam impedit.
        </p>
        <p className="text-muted-foreground text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
          ullam quisquam aliquid eum quasi architecto consequatur error! Commodi
          quia repudiandae asperiores animi vel modi expedita dicta. Perferendis
          deserunt cumque quo dolorem eligendi, quia quasi eveniet velit
          adipisci deleniti odit nisi quas laborum veritatis soluta ea ut quidem
          rerum aliquam quaerat doloremque commodi culpa sunt quibusdam? Cumque
          voluptatibus animi neque quae fuga totam eligendi quibusdam possimus
          dolore incidunt nam odio corrupti nihil, labore quisquam tempore
          accusantium vel corporis sunt numquam impedit.
        </p>
      </div>
    </MaxWidthWrapper>
  );
}
